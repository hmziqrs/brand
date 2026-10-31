<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, bayer8, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let {
		text = 'hmziq',
		look = 'dots',
		pitch = 8,
		label = 'hmziq',
		interactive = true,
		reach = 120,
		class: className = 'aspect-[3.6/1]'
	}: { text?: string; look?: 'dots' | 'dither' | 'glyphs'; pitch?: number; label?: string; interactive?: boolean; reach?: number; class?: string } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();
	const glyphs = ['■', '□', '▪', '○', '◎', '●'];

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		void prefs.sans;
		const el = canvas;
		const host = el.parentElement!;
		let m: ReturnType<typeof mountCanvas> | undefined;
		let ptr: ReturnType<typeof trackPointer> | undefined;
		let dead = false;
		document.fonts.ready.then(() => {
			if (dead) return;
			const fg = readColor(host, 'var(--foreground)');
			const ox = readColor(host, 'var(--mark-square)');
			let mask = new Float32Array(0);
			let sq = new Uint8Array(0);
			let cols = 0;
			let rows = 0;
			if (interactive) ptr = trackPointer(el, () => m?.still && (ptr!.snap(), m.redraw()));
			m = mountCanvas(el, {
				animate: interactive,
				setup: ({ w, h }) => {
					cols = Math.ceil(w / pitch);
					rows = Math.ceil(h / pitch);
					const c = document.createElement('canvas');
					c.width = w;
					c.height = h;
					const x = c.getContext('2d', { willReadFrequently: true })!;
					const face = getComputedStyle(host).getPropertyValue('--font-sans').trim() || '"Onest Variable", sans-serif';
					let size = h * 1.25;
					x.font = `600 ${size}px ${face}`;
					const tw = x.measureText(text).width + size * 0.43;
					size = Math.min(size, (size * w * 0.97) / tw);
					x.font = `600 ${size}px ${face}`;
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
				draw: ({ ctx, w, h, t, dt }) => {
					ptr?.step(dt, w, h, t, false, 9);
					const p = ptr?.p;
					const live = !!p && (p.inside || !dt);
					const px = p?.x ?? -1e4;
					const py = p?.y ?? -1e4;
					const R2 = reach * reach;
					ctx.clearRect(0, 0, w, h);
					if (look === 'glyphs') {
						ctx.font = `${Math.round(pitch * 0.95)}px "JetBrains Mono Variable", ui-monospace, monospace`;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
					}
					for (let j = 0; j < rows; j++)
						for (let i = 0; i < cols; i++) {
							const k = i + j * cols;
							let cx = i * pitch + pitch / 2;
							let cy = j * pitch + pitch / 2;
							const on = mask[k] > 0.5;
							let f = 0;
							if (live) {
								const vx = cx - px;
								const vy = cy - py;
								const d2 = vx * vx + vy * vy;
								f = Math.exp(-d2 / R2);
								if (look === 'glyphs' && on && f > 0.01) {
									const d = Math.sqrt(d2) || 1;
									const push = f * reach * 0.55;
									cx += (vx / d) * push;
									cy += (vy / d) * push;
								}
							}
							const col = sq[k] ? ox : f > 0.05 ? mix(fg, ox, Math.min(1, f * 1.5)) : fg;
							if (look === 'dots') {
								ctx.beginPath();
								ctx.fillStyle = on ? rgba(col, 1) : rgba(f > 0.05 ? mix(fg, ox, f) : fg, 0.1 + f * 0.5);
								ctx.arc(cx, cy, (on ? pitch * 0.36 : pitch * 0.13) * (1 + f * 0.45), 0, Math.PI * 2);
								ctx.fill();
							} else if (look === 'glyphs') {
								if (!on) {
									if ((i + j) % 4 === 0) {
										ctx.fillStyle = rgba(fg, 0.08 + f * 0.3);
										ctx.fillText('·', cx, cy);
									}
									continue;
								}
								ctx.fillStyle = rgba(col, 1);
								ctx.fillText(sq[k] || f > 0.35 ? '■' : glyphs[(i * 7 + j * 13) % glyphs.length], cx, cy);
							} else {
								if (!on) continue;
								const fade = Math.pow(1 - j / rows, 1.4);
								const v = 0.12 + fade * 0.95 + f * 0.8;
								if (v > bayer8(i, j)) {
									ctx.fillStyle = rgba(f > 0.2 ? mix(col, ox, f) : col, 1);
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
			ptr?.destroy();
		};
	});
</script>

<div class={`relative w-full ${className}`} role="img" aria-label={label}>
	<canvas bind:this={canvas} aria-hidden="true" class="block h-full w-full"></canvas>
</div>
