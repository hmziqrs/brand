import { shaderUniforms, type ShaderRecipe } from "./catalog.js";
import { shaderSource } from "./source.js";

export type ShaderRenderOptions = { recipe: ShaderRecipe; animated: boolean; quality: number; output: number; compare: number };
export type ShaderHandle = {
  update: (options: ShaderRenderOptions) => void;
  png: (width: number) => Promise<Blob>;
  dispose: () => void;
};

export async function mountShader(
  canvas: HTMLCanvasElement,
  initial: ShaderRenderOptions,
  signal: AbortSignal,
  onFailure: (message: string) => void,
  onTime?: (time: number) => void,
): Promise<ShaderHandle> {
  if (!navigator.gpu) throw new Error("WebGPU unavailable. Showing the preset snapshot.");
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "low-power" });
  if (!adapter) throw new Error("No GPU adapter. Showing the preset snapshot.");
  const device = await adapter.requestDevice();
  let disposed = false;
  let uniform: GPUBuffer | undefined;
  const context = canvas.getContext("webgpu");
  let frameId = 0;
  let resizeObserver: ResizeObserver | undefined;
  let intersection: IntersectionObserver | undefined;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let options = initial;
  let activeTime = initial.recipe.time;
  let lastFrame = 0;
  let lastReport = 0;
  let visible = false;
  let dirty = true;
  let drawFrame: FrameRequestCallback | undefined;

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frameId);
    resizeObserver?.disconnect();
    intersection?.disconnect();
    reduced.removeEventListener("change", schedule);
    document.removeEventListener("visibilitychange", schedule);
    signal.removeEventListener("abort", dispose);
    uniform?.destroy();
    context?.unconfigure();
    device.destroy();
  }
  signal.addEventListener("abort", dispose, { once: true });
  device.lost.then(info => {
    if (!disposed) { dispose(); onFailure(`GPU connection lost: ${info.message || "showing the preset snapshot."}`); }
  });
  device.addEventListener("uncapturederror", event => {
    if (!disposed) { dispose(); onFailure(event.error.message); }
  });
  try {
    if (signal.aborted) throw new Error("Shader mount cancelled.");
    if (!context) throw new Error("GPU canvas unavailable. Showing the preset snapshot.");
    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({ device, format, alphaMode: "opaque" });
    uniform = device.createBuffer({ size: 256, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const module = device.createShaderModule({ code: shaderSource });
    const info = await module.getCompilationInfo();
    const errors = info.messages.filter(message => message.type === "error");
    if (errors.length) throw new Error(errors.map(message => `Line ${message.lineNum}: ${message.message}`).join("\n"));
    const pipelines = new Map<GPUTextureFormat, { pipeline: GPURenderPipeline; bind: GPUBindGroup }>();
    for (const target of new Set<GPUTextureFormat>([format, "rgba8unorm"])) {
      if (signal.aborted) throw new Error("Shader mount cancelled.");
      const pipeline = await device.createRenderPipelineAsync({
        layout: "auto", vertex: { module, entryPoint: "vs_main" },
        fragment: { module, entryPoint: "fs_main", targets: [{ format: target }] },
        primitive: { topology: "triangle-list" },
      });
      if (signal.aborted || disposed) throw new Error("Shader mount cancelled.");
      const bind = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: uniform } }] });
      pipelines.set(target, { pipeline, bind });
    }

    function render(width: number, height: number, target: GPUTexture, targetFormat: GPUTextureFormat, compare: number, readback?: { buffer: GPUBuffer; stride: number }) {
      if (disposed) throw new Error("Shader renderer is unavailable.");
      device.queue.writeBuffer(uniform, 0, shaderUniforms({ ...options.recipe, time: activeTime }, width, height, options.output, compare));
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({ colorAttachments: [{ view: target.createView(), loadOp: "clear", storeOp: "store", clearValue: [0, 0, 0, 1] }] });
      const { pipeline, bind } = pipelines.get(targetFormat)!;
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bind);
      pass.draw(3);
      pass.end();
      if (readback) encoder.copyTextureToBuffer({ texture: target }, { buffer: readback.buffer, bytesPerRow: readback.stride, rowsPerImage: height }, [width, height]);
      device.queue.submit([encoder.finish()]);
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 1.5) * Math.max(.25, Math.min(1, options.quality));
      const limit = device.limits.maxTextureDimension2D;
      canvas.width = Math.max(1, Math.min(limit, Math.round(rect.width * ratio)));
      canvas.height = Math.max(1, Math.min(limit, Math.round(rect.height * ratio)));
      schedule();
    }

    function frame(now: number) {
      frameId = 0;
      if (disposed || !visible || document.hidden) { lastFrame = 0; return; }
      const moving = options.animated && !reduced.matches;
      if (moving) {
        if (lastFrame) activeTime = (activeTime + Math.min((now - lastFrame) / 1000, .12) * options.recipe.speed) % 60;
        lastFrame = now;
      } else lastFrame = 0;
      if (dirty || moving) {
        try { render(canvas.width, canvas.height, context.getCurrentTexture(), format, options.compare); }
        catch (error) { dispose(); onFailure(error instanceof Error ? error.message : "GPU rendering failed."); return; }
        dirty = false;
      }
      if (moving) {
        if (now - lastReport > 100) { lastReport = now; onTime?.(activeTime); }
        frameId = requestAnimationFrame(frame);
      }
    }

    drawFrame = frame;
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      lastFrame = 0;
      schedule();
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", schedule);
    resize();

    return {
      update(next) {
        if (disposed) return;
        if (next.recipe.time !== options.recipe.time) activeTime = next.recipe.time;
        const qualityChanged = next.quality !== options.quality;
        options = next;
        if (qualityChanged) resize();
        else schedule();
      },
      async png(requestedWidth) {
        if (disposed) throw new Error("PNG export needs a live GPU renderer.");
        const width = Math.round(Math.max(64, Math.min(4096, Number.isFinite(requestedWidth) ? requestedWidth : 2048, device.limits.maxTextureDimension2D)));
        const rect = canvas.getBoundingClientRect();
        const aspect = rect.width > 0 ? rect.height / rect.width : canvas.height / canvas.width;
        const height = Math.max(1, Math.round(width * aspect));
        if (height > device.limits.maxTextureDimension2D) throw new Error("Export height exceeds the GPU limit. Choose a smaller width.");
        const stride = Math.ceil(width * 4 / 256) * 256;
        const texture = device.createTexture({ size: [width, height], format: "rgba8unorm", usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC });
        const buffer = device.createBuffer({ size: stride * height, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
        try {
          render(width, height, texture, "rgba8unorm", -1, { buffer, stride });
          await buffer.mapAsync(GPUMapMode.READ);
          const source = new Uint8Array(buffer.getMappedRange());
          const pixels = new Uint8ClampedArray(width * height * 4);
          for (let y = 0; y < height; y++) pixels.set(source.subarray(y * stride, y * stride + width * 4), y * width * 4);
          const image = document.createElement("canvas");
          image.width = width; image.height = height;
          const ctx = image.getContext("2d");
          if (!ctx) throw new Error("PNG canvas unavailable.");
          ctx.putImageData(new ImageData(pixels, width, height), 0, 0);
          return await new Promise<Blob>((resolve, reject) => image.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG encoding failed.")), "image/png"));
        } finally { buffer.unmap(); buffer.destroy(); texture.destroy(); }
      },
      dispose,
    };
  } catch (error) { dispose(); throw error; }

  function schedule() {
    dirty = true;
    if (document.hidden || !visible) lastFrame = 0;
    if (drawFrame && !frameId && !disposed) frameId = requestAnimationFrame(drawFrame);
  }
}
