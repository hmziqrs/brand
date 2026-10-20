<!-- A backdrop shader canvas: one of the ten scenes in backdrops.ts, drawn full-bleed behind a
     section. Starts when mounted, freezes to its first frame under reduced motion, pauses
     through `paused`, and goes quiet (the section's own background shows) without WebGL. -->
<script lang="ts">
	import { untrack } from "svelte";
	import { MediaQuery } from "svelte/reactivity";
	import { backdropPalettes, backdrops, commonDials, fragmentFor, type BackdropColors, type BackdropKind } from "./backdrops.js";

	let {
		kind = "aurora",
		animated = true,
		paused = $bindable(false),
		/** Dial values by key; any left out use the scene's defaults. */
		values = {},
		/** Hex colors; any left out come from the oxide palette. */
		colors = backdropPalettes.oxide,
		class: className,
	}: {
		kind?: BackdropKind;
		animated?: boolean;
		paused?: boolean;
		values?: Record<string, number>;
		colors?: Partial<BackdropColors>;
		class?: string;
	} = $props();

	const VERTEX = "attribute vec2 a_position;\nvoid main() { gl_Position = vec4(a_position, 0.0, 1.0); }";
	const rgb = (hex: string | undefined, fallback: string) => {
		const value = hex && /^#[0-9a-f]{6}$/i.test(hex) ? hex : fallback;
		return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
	};

	const scene = $derived(backdrops[kind] ?? backdrops.aurora);
	const numbers = $derived(Object.fromEntries([...commonDials, ...scene.dials].map((d) => [d.key, values[d.key] ?? d.start])));
	const palette = $derived(Object.fromEntries((Object.keys(backdropPalettes.oxide) as (keyof BackdropColors)[]).map((k) => [k, rgb(colors[k], backdropPalettes.oxide[k])])));

	let canvas: HTMLCanvasElement | undefined = $state();
	let quiet = $state(false);
	let startLoop = $state.raw<(() => void) | undefined>();
	let stopLoop = $state.raw<(() => void) | undefined>();
	let repaint = $state.raw<((n: Record<string, number>, c: Record<string, number[]>) => void) | undefined>();
	const reduced = new MediaQuery("prefers-reduced-motion: reduce");

	$effect(() => {
		if (!canvas || quiet) return;
		const element = canvas;
		const source = fragmentFor(scene);
		const controller = new AbortController();
		const gl = element.getContext("webgl", { antialias: true, premultipliedAlpha: false });
		if (!gl) {
			quiet = true;
			return;
		}
		const compile = (type: number, text: string) => {
			const shader = gl.createShader(type);
			if (!shader) return null;
			gl.shaderSource(shader, text);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		};
		const vertex = compile(gl.VERTEX_SHADER, VERTEX);
		const fragment = compile(gl.FRAGMENT_SHADER, source);
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
			for (const [name, value] of Object.entries(n)) if (name !== "speed") gl.uniform1f(at(name), value);
			for (const [name, value] of Object.entries(c)) gl.uniform3fv(at(name), value);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};
		let raf = 0;
		let running = false;
		let last = 0;
		const frame = () => {
			if (!running || controller.signal.aborted) return;
			resize();
			const now = performance.now();
			clock += (now - last) * numbers.speed;
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
		if (animated && !paused && !reduced.current) startLoop();
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
