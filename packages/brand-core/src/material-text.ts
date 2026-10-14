import { shaderLooks } from "./shaders/catalog.ts";
import type { ShaderHandle, ShaderRenderOptions } from "./shaders/renderer.ts";
import { normalizeShaderRecipe } from "./shaders/catalog.ts";
import { logoColors, paint } from "./logo.ts";

export type MaterialTextLook = {
  text: string;
  material: string;
  font: "sans" | "mono";
  align: "left" | "center" | "right";
  size: number;
  weight: number;
  tracking: number;
  lineHeight: number;
  zoom: number;
  offsetX: number;
  offsetY: number;
  amount: number;
  tint: string;
  tintAmount: number;
  stroke: number;
  speed: number;
  time: number;
  seed: number;
  animated: boolean;

};
export const materialTextMaterials = shaderLooks.map(({ id, name }) => ({ value: id, label: name }));
export const materialTextRanges = {
  size: { min: 16, max: 240, step: 1 },
  weight: { min: 300, max: 900, step: 100 },
  tracking: { min: -.12, max: .12, step: .005 },
  lineHeight: { min: .8, max: 1.8, step: .01 },
  zoom: { min: .25, max: 3, step: .01 },
  offsetX: { min: 0, max: 100, step: 1 },
  offsetY: { min: 0, max: 100, step: 1 },
  amount: { min: 0, max: 1, step: .01 },
  tintAmount: { min: 0, max: 1, step: .01 },
  stroke: { min: 0, max: 2, step: .05 },
  speed: { min: .25, max: 2, step: .05 },
  time: { min: 0, max: 60, step: .1 },
  seed: { min: -1, max: 9999, step: 1 },
} as const;
export type MaterialTextNumber = keyof typeof materialTextRanges;
export const materialTextDefaults: MaterialTextLook = {
  text: "Make it\nmaterial.", material: "copper-sweep", font: "sans", align: "left",
  size: 112, weight: 800, tracking: -.05, lineHeight: .96, zoom: 1,
  offsetX: 50, offsetY: 50, amount: 1, tint: "foreground", tintAmount: 0,
  stroke: 0, speed: 1, time: 0, seed: -1, animated: true,
};

export function normalizeMaterialText(value: unknown, base: MaterialTextLook = materialTextDefaults): MaterialTextLook {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Paste material text settings.");
  const source = ("materialText" in value ? value.materialText : value) as Record<string, unknown>;
  if (!source || typeof source !== "object" || Array.isArray(source)) throw new Error("Paste material text settings.");
  const next = { ...base };
  let found = false;
  for (const key of Object.keys(materialTextRanges) as MaterialTextNumber[]) {
    const number = source[key];
    if (typeof number !== "number" || !Number.isFinite(number)) continue;
    const { min, max } = materialTextRanges[key];
    next[key] = Math.min(max, Math.max(min, number));
    found = true;
  }
  if (typeof source.text === "string") { next.text = source.text.slice(0, 512); found = true; }
  if (typeof source.material === "string" && materialTextMaterials.some(item => item.value === source.material)) { next.material = source.material; found = true; }
  if (source.font === "sans" || source.font === "mono") { next.font = source.font; found = true; }
  if (source.align === "left" || source.align === "center" || source.align === "right") { next.align = source.align; found = true; }
  if (typeof source.animated === "boolean") { next.animated = source.animated; found = true; }
  if (typeof source.tint === "string" && ((logoColors as readonly string[]).includes(source.tint) || /^#(?:[a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(source.tint) || (typeof CSS !== "undefined" ? CSS.supports("color", source.tint) : /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([a-z0-9.,%/ +\-]*\)$/i.test(source.tint)))) { next.tint = source.tint; found = true; }
  if (!found) throw new Error("No recognized material text settings. Copy from the Settings tab.");
  return next;
}

export function materialTextStyle(look: MaterialTextLook, src: string) {
  return [
    `--mt-image:url(${JSON.stringify(src)})`, `--mt-font:var(--font-${look.font})`,
    `--mt-size:${look.size}px`, `--mt-weight:${look.weight}`, `--mt-tracking:${look.tracking}em`,
    `--mt-line:${look.lineHeight}`, `--mt-align:${look.align}`, `--mt-zoom:${look.zoom * 100}%`,
    `--mt-x:${look.offsetX}%`, `--mt-y:${look.offsetY}%`, `--mt-solid:${(1 - look.amount) * 100}%`,
    `--mt-tint:${paint(look.tint)}`, `--mt-tint-amount:${look.tintAmount * 100}%`,
    `--mt-stroke:${look.stroke}px`, `--mt-amount:${look.amount}`,
  ].join(";");
}

export function materialTextRecipe(look: MaterialTextLook) {
  const preset = shaderLooks.find(item => item.id === look.material) ?? shaderLooks[0];
  return normalizeShaderRecipe({ ...preset, zoom: preset.zoom * look.zoom, offsetX: (look.offsetX - 50) * 2, offsetY: (look.offsetY - 50) * 2, speed: look.speed, time: look.time,
    a: { ...preset.a, ...(look.seed >= 0 ? { seed: look.seed } : {}) },
    b: { ...preset.b, ...(look.seed >= 0 ? { seed: look.seed + 1 } : {}) },
  });
}

export function mountMaterialText(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>(".material-text-label")!;
  const surface = root.querySelector<HTMLElement>(".material-text-surface")!;
  const canvas = root.querySelector<HTMLCanvasElement>("canvas")!;
  const mask = document.createElement("canvas");
  const context = mask.getContext("2d")!;
  const controller = new AbortController();
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let handle: ShaderHandle | undefined;
  let started = false;
  let visible = false;
  let look = normalizeMaterialText(JSON.parse(root.dataset.look!));
  let maskFrame = 0;
  function options(): ShaderRenderOptions {
    return { recipe: materialTextRecipe(look), animated: look.animated && root.dataset.paused !== "true", quality: 1, output: 0, compare: -1 };
  }
  function report(status: string, message: string) {
    root.dataset.status = status;
    root.dispatchEvent(new CustomEvent("material-text:status", { detail: { status, message } }));
  }
  function drawMask() {
    maskFrame = 0;
    if (controller.signal.aborted) return;
    const bounds = surface.getBoundingClientRect();
    if (!bounds.width || !bounds.height || !label.firstChild) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    mask.width = Math.ceil(bounds.width * ratio);
    mask.height = Math.ceil(bounds.height * ratio);
    context.scale(ratio, ratio);
    const style = getComputedStyle(label);
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    context.textBaseline = "alphabetic";
    const metrics = context.measureText("Hg");
    const descent = metrics.fontBoundingBoxDescent;
    const node = label.firstChild;
    const text = node.textContent ?? "";
    const range = document.createRange();
    const lines: { text: string; x: number; top: number; baseline: number }[] = [];
    for (let i = 0; i < text.length;) {
      const character = String.fromCodePoint(text.codePointAt(i)!);
      range.setStart(node, i); range.setEnd(node, i + character.length);
      const rect = range.getBoundingClientRect();
      i += character.length;
      if (character === "\n" || !rect.height) continue;
      const line = lines.find(item => Math.abs(item.top - rect.top) < 1);
      if (line) { line.text += character; line.x = Math.min(line.x, rect.left - bounds.left); }
      else lines.push({ text: character, x: rect.left - bounds.left, top: rect.top, baseline: rect.bottom - bounds.top - descent });
    }
    if (typeof (context as Partial<CanvasRenderingContext2D>).letterSpacing === "string") {
      context.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
      for (const line of lines) context.fillText(line.text, line.x, line.baseline);
    } else {
      for (let i = 0; i < text.length; i++) {
        range.setStart(node, i); range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (text[i] !== "\n") context.fillText(text[i], rect.left - bounds.left, rect.bottom - bounds.top - descent);
      }
    }
    surface.style.maskImage = `url(${mask.toDataURL()})`;
    root.dataset.mask = "ready";
  }
  function queueMask() {
    if (controller.signal.aborted) return;
    cancelAnimationFrame(maskFrame);
    maskFrame = requestAnimationFrame(drawMask);
  }
  async function start() {
    if (started || controller.signal.aborted) return;
    started = true;
    report("loading", "Starting the live material renderer.");
    try {
      const { mountShader } = await import("./shaders/renderer.js");
      if (controller.signal.aborted) return;
      handle = await mountShader(canvas, options(), controller.signal, message => report("fallback", message), time => {
        root.dataset.time = String(time);
        root.dispatchEvent(new CustomEvent("material-text:time", { detail: time }));
      });
      if (controller.signal.aborted) { handle.dispose(); return; }
      handle.update(options());
      report("ready", "Live shader material.");
    } catch (error) {
      if (!controller.signal.aborted) report("fallback", error instanceof Error ? error.message : "Live renderer unavailable. Showing one continuous poster.");
    }
  }
  function update() {
    root.dataset.active = String(visible && !document.hidden && !media.matches && root.dataset.paused !== "true" && look.animated);
    handle?.update(options());
    if (visible) void start();
  }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
  const resize = new ResizeObserver(queueMask);
  const mutations = new MutationObserver(records => {
    if (records.some(record => record.attributeName === "data-look")) {
      const next = normalizeMaterialText(JSON.parse(root.dataset.look!));
      if (["text", "font", "size", "weight", "tracking", "lineHeight", "align"].some(key => next[key] !== look[key])) queueMask();
      look = next;
    }
    update();
  });
  observer.observe(root);
  resize.observe(label);
  mutations.observe(root, { attributes: true, attributeFilter: ["data-paused", "data-look"] });
  document.addEventListener("visibilitychange", update);
  media.addEventListener("change", update);
  document.fonts.addEventListener("loadingdone", queueMask);
  void document.fonts.ready.then(queueMask);
  queueMask();
  return () => {
    controller.abort(); handle?.dispose(); cancelAnimationFrame(maskFrame);
    observer.disconnect(); resize.disconnect(); mutations.disconnect();
    document.removeEventListener("visibilitychange", update); media.removeEventListener("change", update);
    document.fonts.removeEventListener("loadingdone", queueMask);
  };
}
