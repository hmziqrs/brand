<script lang="ts">
	import { mountCanvas, readColor, rgba, bayer8, trackPointer } from '$moves/specimens/canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let {
		text,
		label,
		look = 'dots',
		pitch = 9,
		min = 5,
		cols = 140,
		reach = 120,
		class: className = 'aspect-[5/1]'
	}: {
		text: string;
		label?: string;
		look?: 'dots' | 'glyphs';
		pitch?: number;
		min?: number;
		cols?: number;
		reach?: number;
		class?: string;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	const glyphs = ['■', '□', '▪', '○', '◎', '●'];

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		void prefs.sans;
		const el = canvas;
		const host = el.parentElement!;
		const word = text;
		const kind = look;
		const most = pitch;
		const least = min;
		const across = cols;
		const R2 = reach * reach;
		const push = reach * 0.55;
		let m: ReturnType<typeof mountCanvas> | undefined;
		let ptr: ReturnType<typeof trackPointer> | undefined;
		let dead = false;

		document.fonts.ready.then(() => {
			if (dead) return;
			const fg = readColor(host, 'var(--foreground)');
			const ox = readColor(host, 'var(--mark-square)');
			const ink = rgba(fg, 1);
			const hot = rgba(ox, 1);
			let mask = new Uint8Array(0);
			let mark = new Uint8Array(0);
			let nx = 0;
			let ny = 0;
			let p = most;
			ptr = trackPointer(el, () => m?.still && (ptr!.snap(), m.redraw()));
			m = mountCanvas(el, {
				animate: true,
				setup: ({ w, h }) => {
					p = Math.max(least, Math.min(most, Math.round(w / across)));
					nx = Math.ceil(w / p);
					ny = Math.ceil(h / p);
					const c = document.createElement('canvas');
					c.width = w;
					c.height = h;
					const x = c.getContext('2d', { willReadFrequently: true })!;
					const face = getComputedStyle(host).getPropertyValue('--font-sans').trim() || '"Onest Variable", sans-serif';
					let size = h * 1.25;
					x.font = `600 ${size}px ${face}`;
					size = Math.min(size, (size * w * 0.97) / (x.measureText(word).width + size * 0.43));
					x.font = `600 ${size}px ${face}`;
					const mt = x.measureText(word);
					const sq = size * 0.36;
					const left = (w - (mt.width + size * 0.07 + sq)) / 2;
					const base = h * 0.5 + mt.actualBoundingBoxAscent * 0.5 - mt.actualBoundingBoxDescent * 0.2;
					x.fillStyle = 'red';
					x.fillText(word, left, base);
					x.fillStyle = 'blue';
					x.fillRect(left + mt.width + size * 0.07, base - sq, sq, sq);
					const d = x.getImageData(0, 0, w, h).data;
					mask = new Uint8Array(nx * ny);
					mark = new Uint8Array(nx * ny);
					for (let j = 0; j < ny; j++)
						for (let i = 0; i < nx; i++) {
							const o = (Math.min(h - 1, Math.round(j * p + p / 2)) * w + Math.min(w - 1, Math.round(i * p + p / 2))) * 4;
							const k = i + j * nx;
							mask[k] = Math.max(d[o], d[o + 2]) > 127 ? 1 : 0;
							mark[k] = d[o + 2] > d[o] ? 1 : 0;
						}
				},
				draw: ({ ctx, w, h, t, dt }) => {
					ptr?.step(dt, w, h, t, false, 9);
					const q = ptr?.p;
					const live = !!q && (q.inside || !dt);
					const px = q?.x ?? -1e4;
					const py = q?.y ?? -1e4;
					ctx.clearRect(0, 0, w, h);
					if (kind === 'glyphs') {
						ctx.font = `${Math.round(p * 0.95)}px "JetBrains Mono Variable", ui-monospace, monospace`;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
					}
					for (let j = 0; j < ny; j++)
						for (let i = 0; i < nx; i++) {
							const k = i + j * nx;
							let cx = i * p + p / 2;
							let cy = j * p + p / 2;
							const on = mask[k] === 1;
							let f = 0;
							if (live) {
								const vx = cx - px;
								const vy = cy - py;
								const d2 = vx * vx + vy * vy;
								f = Math.exp(-d2 / R2);
								if (kind === 'glyphs' && on && f > 0.01) {
									const d = Math.sqrt(d2) || 1;
									cx += (vx / d) * f * push;
									cy += (vy / d) * f * push;
								}
							}
							const heat = mark[k] === 1 || f * 1.6 > bayer8(i, j);
							if (kind === 'dots') {
								ctx.beginPath();
								if (on) {
									ctx.fillStyle = heat ? hot : ink;
									ctx.arc(cx, cy, p * 0.36 * (1 + f * 0.45), 0, Math.PI * 2);
								} else {
									ctx.fillStyle = rgba(heat ? ox : fg, 0.1 + f * 0.45);
									ctx.arc(cx, cy, p * 0.13 * (1 + f * 0.8), 0, Math.PI * 2);
								}
								ctx.fill();
							} else if (on) {
								ctx.fillStyle = heat ? hot : ink;
								ctx.fillText(mark[k] === 1 || f > 0.35 ? '■' : glyphs[(i * 7 + j * 13) % glyphs.length], cx, cy);
							} else if ((i + j) % 4 === 0) {
								ctx.fillStyle = rgba(heat ? ox : fg, 0.08 + f * 0.3);
								ctx.fillText('·', cx, cy);
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

<div class={`relative w-full ${className}`} role="img" aria-label={label ?? text}>
	<canvas bind:this={canvas} aria-hidden="true" class="block h-full w-full"></canvas>
</div>
