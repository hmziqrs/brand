<!-- The wave hero's backdrop: a WebGL canvas of stacked audio waves, like a voice waveform
     resting on dark water. At its defaults: a calm voice line in
     the oxide palette. Starts when it enters the view, freezes to its first frame under
     reduced motion, pauses through `paused`, and goes quiet (the section's own background
     shows) without WebGL. Every number in the shader is a prop: the waves' count, packing,
     height, pace, blend and warp, the line's core and halo, the reflection, the background,
     the vignette, the grade, the five colors, and a surface texture drawn in the shader
     itself (scanlines, grain, dither, halftone, pixels, hatching, VHS, water) with film grain
     on top. The wave tweaker owns all of them. -->
<script lang="ts" module>
	import palettes from "./wave-palettes.json";

	export const waveSurfaces = ["none", "scan", "grain", "dither", "halftone", "pixel", "hatch", "vhs", "water"] as const;
	export type WaveSurface = (typeof waveSurfaces)[number];
	export type WaveColors = { bright: string; muted: string; dark: string; top: string; bottom: string };
	export const wavePalettes: Record<"oxide" | "ember" | "harbor", WaveColors> = palettes;

	const VERTEX = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

	const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_waves;
uniform float u_density;
uniform float u_amplitude;
uniform float u_spread;
uniform float u_phase;
uniform float u_pulse;
uniform float u_blend;
uniform float u_warp;
uniform float u_taper;
uniform float u_thickness;
uniform float u_centering;
uniform float u_offset;
uniform float u_angle;
uniform float u_mirror;
uniform float u_mirrorDepth;
uniform float u_mirrorWidth;
uniform float u_glow;
uniform float u_core;
uniform float u_halo;
uniform float u_haloSize;
uniform float u_flatten;
uniform float u_gradient;
uniform float u_vignette;
uniform float u_vignetteSize;
uniform float u_exposure;
uniform float u_saturation;
uniform float u_gamma;
uniform float u_surface;
uniform float u_surfaceAmount;
uniform float u_surfaceScale;
uniform float u_grain;
uniform vec3 u_bright;
uniform vec3 u_muted;
uniform vec3 u_dark;
uniform vec3 u_top;
uniform vec3 u_bottom;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float pace(float base) {
  return 0.8 + (base - 0.8) * u_spread;
}

float wave(vec2 uv, float freq, float amp, float speed, float phase) {
  return sin(uv.x * freq + u_time * speed + phase) * amp;
}

vec3 scene(vec2 frag) {
  vec2 uv = (frag - 0.5 * u_resolution) / u_resolution.y;

  float s = sin(u_angle);
  float c = cos(u_angle);
  vec2 p = mat2(c, -s, s, c) * uv;
  p.y -= u_offset;
  p.y += u_warp * 0.08 * (noise(p * 2.5 + vec2(u_time * 0.25, 0.0)) - 0.5);

  vec3 col = mix(u_bottom, u_top, clamp(smoothstep(-0.5, 0.5, uv.y) * u_gradient, 0.0, 1.0));
  col = mix(col, u_dark, u_flatten);

  float band = smoothstep(0.8 / u_centering, 0.0, abs(p.y));

  float amp = u_amplitude * (1.0 + u_pulse * (0.6 * sin(u_time * 1.3) + 0.4 * sin(u_time * 3.7 + 1.1)));
  float halfW = 0.5 * u_resolution.x / u_resolution.y;
  amp *= 1.0 - u_taper * smoothstep(0.0, halfW, abs(p.x));
  float d = u_density;
  float k = max(u_blend, 0.0001);

  float w1 = wave(p, 2.3 * d, 0.12 * amp, pace(0.8), u_phase);
  float w2 = wave(p, 5.5 * d, 0.06 * amp, pace(1.2), 1.5 + u_phase * 1.7);
  float w3 = wave(p, 11.0 * d, 0.03 * amp, pace(1.6), 3.0 + u_phase * 2.3);
  float w4 = wave(p, 23.0 * d, 0.015 * amp, pace(2.0), 0.7 + u_phase * 3.1);
  float w5 = wave(p, 47.0 * d, 0.007 * amp, pace(2.6), 1.1 + u_phase * 4.3);
  float w6 = wave(p, 1.15 * d, 0.18 * amp, pace(0.5), 2.2 + u_phase * 0.6);

  float combined = w1;
  if (u_waves > 1.5) combined = smin(combined, w2, 0.05 * k);
  if (u_waves > 2.5) combined = smin(combined, w3, 0.03 * k);
  if (u_waves > 3.5) combined += w4;
  if (u_waves > 4.5) combined = smin(combined, w5, 0.02 * k);
  if (u_waves > 5.5) combined = smin(combined, w6, 0.08 * k);

  float waveDist = abs(p.y - combined);
  float waveGlow = smoothstep(0.15 * u_thickness, 0.0, waveDist);

  float mirrorDist = abs(p.y + combined * u_mirrorDepth);
  float mirrorGlow = smoothstep(0.25 * u_mirrorWidth, 0.0, mirrorDist) * 0.3 * u_mirror;

  vec3 waveCol = mix(u_muted, u_bright, clamp(waveGlow * u_core, 0.0, 1.0));
  float halo = smoothstep(0.4 * u_haloSize, 0.0, waveDist) * 0.15 * u_halo;
  waveCol += u_bright * halo;

  col = mix(col, waveCol, clamp(waveGlow * band * u_glow, 0.0, 1.0));
  col = mix(col, waveCol * 0.5, clamp(mirrorGlow * band * u_glow, 0.0, 1.0));

  float vignette = smoothstep(1.2 * u_vignetteSize, 0.3 * u_vignetteSize, length(uv));
  col *= mix(1.0, vignette, u_vignette);

  return col;
}

void main() {
  float kind = u_surface;
  float amount = u_surfaceAmount;
  float scale = max(u_surfaceScale, 0.05);
  vec2 frag = gl_FragCoord.xy;

  if (kind > 4.5 && kind < 5.5) {
    float size = max(1.0, floor(6.0 * scale * amount));
    frag = (floor(frag / size) + 0.5) * size;
  }

  vec3 col;
  if (kind > 6.5 && kind < 7.5) {
    float row = floor(frag.y / (6.0 * scale));
    float tear = step(0.97, hash(vec2(row, floor(u_time * 10.0))));
    float shift = (2.0 + tear * 6.0) * amount * scale;
    vec3 mid = scene(frag);
    col = vec3(scene(frag + vec2(shift, 0.0)).r, mid.g, scene(frag - vec2(shift, 0.0)).b);
  } else {
    col = scene(frag);
  }

  col *= u_exposure;
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(lum), col, u_saturation);

  float scanY = (gl_FragCoord.y - 0.5 * u_resolution.y) * 0.5 / scale;
  if ((kind > 0.5 && kind < 1.5) || (kind > 6.5 && kind < 7.5)) {
    col += sin(scanY) * 0.008 * amount;
  } else if (kind > 1.5 && kind < 2.5) {
    col += (hash(floor(gl_FragCoord.xy / scale) + fract(u_time) * vec2(97.0, 31.0)) - 0.5) * 0.08 * amount;
  } else if (kind > 2.5 && kind < 3.5) {
    float levels = max(2.0, 24.0 / max(amount, 0.05));
    col = floor(col * levels + bayer4(gl_FragCoord.xy / scale)) / levels;
  } else if (kind > 3.5 && kind < 4.5) {
    float cell = 6.0 * scale;
    vec2 r = mat2(0.7071, -0.7071, 0.7071, 0.7071) * gl_FragCoord.xy;
    vec2 g = fract(r / cell) - 0.5;
    float radius = 0.5 * sqrt(clamp(lum * 4.0, 0.0, 1.0));
    float aa = 1.0 / cell;
    float ink = smoothstep(radius + aa, radius - aa, length(g));
    col = mix(col, col * ink * 1.6, clamp(amount, 0.0, 1.0));
  } else if (kind > 4.5 && kind < 5.5) {
    vec2 cellPos = fract(gl_FragCoord.xy / max(1.0, floor(6.0 * scale * amount)));
    float edge = step(0.92, max(cellPos.x, cellPos.y));
    col *= 1.0 - 0.2 * edge * clamp(amount, 0.0, 1.0);
  } else if (kind > 5.5 && kind < 6.5) {
    float spacing = 6.0 * scale;
    float a = abs(fract((gl_FragCoord.x + gl_FragCoord.y) / spacing) - 0.5);
    float b = abs(fract((gl_FragCoord.x - gl_FragCoord.y) / spacing) - 0.5);
    float shade = 1.0 - clamp(lum * 5.0, 0.0, 1.0);
    float lines = smoothstep(0.12, 0.0, a) + smoothstep(0.12, 0.0, b) * step(0.5, shade);
    col *= 1.0 - clamp(amount, 0.0, 2.0) * 0.3 * lines * (0.4 + 0.6 * shade);
  } else if (kind > 7.5) {
    vec2 q = gl_FragCoord.xy / u_resolution.y * 4.0 / scale;
    float t = u_time * 0.6;
    float caustic = abs(sin(q.x * 3.0 + sin(q.y * 2.0 + t) + t * 0.5) * sin(q.y * 3.0 + sin(q.x * 2.3 - t * 0.7)));
    col *= 1.0 + amount * 0.3 * (sqrt(caustic) - 0.5);
  }

  col += (hash(gl_FragCoord.xy + fract(u_time * 0.37) * vec2(113.0, 57.0)) - 0.5) * 0.12 * u_grain;

  col = pow(max(col, vec3(0.0)), vec3(u_gamma));

  gl_FragColor = vec4(col, 1.0);
}
`;
</script>

<script lang="ts">
	import { untrack } from "svelte";
	import { MediaQuery } from "svelte/reactivity";

	let {
		animated = true,
		paused = $bindable(false),
		/** How many stacked sine layers make the wave, one to six. */
		waves = 4,
		/** Multiplier on the waves' frequency: how packed they run. */
		density = 1,
		/** Multiplier on the waves' height. */
		amplitude = 1,
		/** Multiplier on the pace the waves move at; negative runs them the other way. */
		speed = 1,
		/** How far apart the layers' paces sit: 0 moves them as one, 1 is the default. */
		spread = 1,
		/** Shifts every layer's phase, a seed for a different wave shape. */
		phase = 0,
		/** Breathing of the height over time, like a voice getting louder and softer. */
		pulse = 0,
		/** Softness where the layers meet; 0 is sharp creases. */
		blend = 1,
		/** Noise bending the waves off their sine path. */
		warp = 0,
		/** Flattens the waves toward the sides, 0 to 1. */
		taper = 0,
		/** Multiplier on the glowing line's width. */
		thickness = 1,
		/** How tightly the waves hug their line: higher squeezes them toward the center. */
		centering = 1,
		/** Moves the wave line up or down. */
		offset = 0,
		/** The angle the waves travel at, radians. A corner, when it is not level. */
		angle = 0,
		/** The reflection's strength, 0 up. */
		mirror = 1,
		/** How far the reflection echoes the wave's height; negative flips it. */
		mirrorDepth = 0.5,
		/** Multiplier on the reflection's width. */
		mirrorWidth = 1,
		/** How strongly the wave band lights the canvas. */
		glow = 1,
		/** How far the line's core reaches the bright color. */
		core = 1,
		/** Strength of the halo around the line. */
		halo = 1,
		/** Multiplier on the halo's reach. */
		haloSize = 1,
		/** How much the dark color flattens the background gradient, 0 to 1. */
		flatten = 0.5,
		/** How far the background climbs from the bottom color to the top one. */
		gradient = 1,
		/** Strength of the darkening at the corners. */
		vignette = 1,
		/** Multiplier on the vignette's reach. */
		vignetteSize = 1,
		exposure = 1,
		saturation = 1,
		/** The final curve; below 1 lifts the darks. */
		gamma = 0.95,
		/** The texture drawn in the shader itself. "scan" is the default. */
		surface = "scan",
		surfaceAmount = 1,
		/** Multiplier on the surface texture's pixel size. */
		surfaceScale = 1,
		/** Moving film grain over everything, 0 to 1. */
		grain = 0,
		/** Hex colors; any left out come from the oxide palette. */
		colors = wavePalettes.oxide,
		class: className,
	}: {
		animated?: boolean;
		paused?: boolean;
		waves?: number;
		density?: number;
		amplitude?: number;
		speed?: number;
		spread?: number;
		phase?: number;
		pulse?: number;
		blend?: number;
		warp?: number;
		taper?: number;
		thickness?: number;
		centering?: number;
		offset?: number;
		angle?: number;
		mirror?: number;
		mirrorDepth?: number;
		mirrorWidth?: number;
		glow?: number;
		core?: number;
		halo?: number;
		haloSize?: number;
		flatten?: number;
		gradient?: number;
		vignette?: number;
		vignetteSize?: number;
		exposure?: number;
		saturation?: number;
		gamma?: number;
		surface?: WaveSurface;
		surfaceAmount?: number;
		surfaceScale?: number;
		grain?: number;
		colors?: Partial<WaveColors>;
		class?: string;
	} = $props();

	const rgb = (hex: string | undefined, fallback: string) => {
		const value = hex && /^#[0-9a-f]{6}$/i.test(hex) ? hex : fallback;
		return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
	};

	const numbers = $derived({
		waves: Math.round(waves),
		density,
		amplitude,
		spread,
		phase,
		pulse,
		blend,
		warp,
		taper,
		thickness,
		centering,
		offset,
		angle,
		mirror,
		mirrorDepth,
		mirrorWidth,
		glow,
		core,
		halo,
		haloSize,
		flatten,
		gradient,
		vignette,
		vignetteSize,
		exposure,
		saturation,
		gamma,
		surface: Math.max(0, waveSurfaces.indexOf(surface)),
		surfaceAmount,
		surfaceScale,
		grain,
	});
	const palette = $derived(
		Object.fromEntries((Object.keys(wavePalettes.oxide) as (keyof WaveColors)[]).map((key) => [key, rgb(colors[key], wavePalettes.oxide[key])])),
	);

	let canvas: HTMLCanvasElement | undefined = $state();
	let quiet = $state(false);
	let startLoop = $state.raw<(() => void) | undefined>();
	let stopLoop = $state.raw<(() => void) | undefined>();
	let repaint = $state.raw<((n: Record<string, number>, c: Record<string, number[]>) => void) | undefined>();
	const reduced = new MediaQuery("prefers-reduced-motion: reduce");

	$effect(() => {
		if (!canvas || quiet) return;
		const element = canvas;
		const controller = new AbortController();
		const gl = element.getContext("webgl", { antialias: true, premultipliedAlpha: false });
		if (!gl) {
			quiet = true;
			return;
		}
		const compile = (type: number, source: string) => {
			const shader = gl.createShader(type);
			if (!shader) return null;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		};
		const vertex = compile(gl.VERTEX_SHADER, VERTEX);
		const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
		const program = vertex && fragment ? gl.createProgram() : null;
		if (!vertex || !fragment || !program) {
			quiet = true;
			return;
		}
		gl.attachShader(program, vertex);
		gl.attachShader(program, fragment);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			quiet = true;
			return;
		}
		gl.useProgram(program);
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
		const position = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
		const locations = new Map<string, WebGLUniformLocation | null>();
		const at = (name: string) => {
			if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program, `u_${name}`));
			return locations.get(name) ?? null;
		};
		const apply = (n: Record<string, number>, c: Record<string, number[]>) => {
			for (const [name, value] of Object.entries(n)) gl.uniform1f(at(name), value);
			for (const [name, value] of Object.entries(c)) gl.uniform3fv(at(name), value);
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio, 2);
			const width = Math.round(element.clientWidth * dpr);
			const height = Math.round(element.clientHeight * dpr);
			if (element.width !== width || element.height !== height) {
				element.width = width;
				element.height = height;
				gl.viewport(0, 0, width, height);
			}
		};
		let clock = 0;
		const draw = (n: Record<string, number>, c: Record<string, number[]>) => {
			gl.uniform2f(at("resolution"), element.width, element.height);
			gl.uniform1f(at("time"), clock / 1000);
			apply(n, c);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};
		let raf = 0;
		let running = false;
		let last = 0;
		const frame = () => {
			if (!running || controller.signal.aborted) return;
			resize();
			const now = performance.now();
			clock += (now - last) * speed;
			last = now;
			draw(numbers, palette);
			raf = requestAnimationFrame(frame);
		};
		const start = () => {
			if (running || controller.signal.aborted) return;
			running = true;
			last = performance.now();
			raf = requestAnimationFrame(frame);
		};
		const stop = () => {
			if (!running) return;
			running = false;
			cancelAnimationFrame(raf);
		};
		repaint = (n, c) => {
			if (running || controller.signal.aborted) return;
			resize();
			draw(n, c);
		};
		resize();
		untrack(() => draw(numbers, palette));
		untrack(() => {
			if (animated && !paused && !reduced.current) start();
		});
		startLoop = start;
		stopLoop = stop;
		return () => {
			running = false;
			cancelAnimationFrame(raf);
			startLoop = undefined;
			stopLoop = undefined;
			repaint = undefined;
			controller.abort();
			gl.deleteProgram(program);
			gl.deleteShader(vertex);
			gl.deleteShader(fragment);
			gl.deleteBuffer(buffer);
		};
	});

	$effect(() => {
		if (!startLoop || !stopLoop) return;
		const wanted = animated && !paused && !reduced.current;
		if (wanted) startLoop();
		else stopLoop();
	});

	$effect(() => {
		repaint?.(numbers, palette);
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full {className ?? ''}"></canvas>
{#if quiet}
	<div class="pointer-events-none absolute inset-0 quiet" aria-hidden="true"></div>
{/if}

<style>
	.quiet {
		background:
			radial-gradient(120% 60% at 50% 55%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%),
			var(--background);
	}
</style>
