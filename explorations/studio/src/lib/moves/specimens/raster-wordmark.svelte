<script lang="ts">
	import { mountCanvas, readColor, rgba, bayer8 } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let {
		text = 'hmziq',
		look = 'dots',
		pitch = 8,
		label = 'hmziq',
		class: className = 'aspect-[3.6/1]'
	}: { text?: string; look?: 'dots' | 'dither'; pitch?: number; label?: string; class?: string } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.oxide;
		void prefs.dark;
		const el = canvas;
		const host = el.parentElement!;
		let m: ReturnType<typeof mountCanvas> | undefined;
		let dead = false;
		document.fonts.ready.then(() => {
			if (dead) return;
			const fg = readColor(host, 'var(--foreground)');
			const ox = readColor(host, 'var(--mark-square)');
			let mask = new Float32Array(0);
			let sq = new Uint8Array(0);
			let cols = 0;
			let rows = 0;
			m = mountCanvas(el, {
				animate: false,
				setup: ({ w, h }) => {
					cols = Math.ceil(w / pitch);
					rows = Math.ceil(h / pitch);
					const c = document.createElement('canvas');
					c.width = w;
					c.height = h;
					const x = c.getContext('2d', { willReadFrequently: true })!;
					let size = h * 1.25;
					x.font = `600 ${size}px "Onest Variable", sans-serif`;
					const tw = x.measureText(text).width + size * 0.43;
					size = Math.min(size, (size * w * 0.97) / tw);
					x.font = `600 ${size}px "Onest Variable", sans-serif`;
					const mt = x.measureText(text);
					const sqSize = size * 0.36;
					const total = mt.width + size * 0.07 + sqSize;
					const left = (w - total) / 2;
					const base = h * 0.5 + mt.actualBoundingBoxAscent * 0.5 - mt.actualBoundingBoxDescent * 0.2;
					x.fillStyle = 'red';
					x.fillText(text, left, base);
					x.fillStyle = 'blue';
					x.fillRect(left + mt.width + size * 0.07, base - sqSize, sqSize, sqSize);
					const d = x.getImageData(0, 0, w, h).data;
					mask = new Float32Array(cols * rows);
					sq = new Uint8Array(cols * rows);
					for (let j = 0; j < rows; j++)
						for (let i = 0; i < cols; i++) {
							const px = Math.min(w - 1, Math.round(i * pitch + pitch / 2));
							const py = Math.min(h - 1, Math.round(j * pitch + pitch / 2));
							const o = (py * w + px) * 4;
							const k = i + j * cols;
							mask[k] = Math.max(d[o], d[o + 2]) / 255;
							sq[k] = d[o + 2] > d[o] ? 1 : 0;
						}
				},
				draw: ({ ctx, w, h }) => {
					ctx.clearRect(0, 0, w, h);
					for (let j = 0; j < rows; j++)
						for (let i = 0; i < cols; i++) {
							const k = i + j * cols;
							const cx = i * pitch + pitch / 2;
							const cy = j * pitch + pitch / 2;
							const on = mask[k] > 0.5;
							const col = sq[k] ? ox : fg;
							if (look === 'dots') {
								ctx.beginPath();
								ctx.fillStyle = on ? rgba(col, 1) : rgba(fg, 0.1);
								ctx.arc(cx, cy, on ? pitch * 0.36 : pitch * 0.13, 0, Math.PI * 2);
								ctx.fill();
							} else {
								if (!on) continue;
								const fade = Math.pow(1 - j / rows, 1.4);
								const v = 0.12 + fade * 0.95;
								if (v > bayer8(i, j)) {
									ctx.fillStyle = rgba(col, 1);
									ctx.fillRect(i * pitch, j * pitch, pitch, pitch);
								}
							}
						}
				}
			});
		});
		return () => {
			dead = true;
			m?.destroy();
		};
	});
</script>

<div class={`relative w-full ${className}`} role="img" aria-label={label}>
	<canvas bind:this={canvas} aria-hidden="true" class="block h-full w-full"></canvas>
</div>
