<script lang="ts">
	import { mountCanvas, readColor, rgba, trackPointer, valueNoise } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { cell = 10, levels = 14, reach = 150, rise = 0.42 }: { cell?: number; levels?: number; reach?: number; rise?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const noise = valueNoise(9);
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let cols = 0;
		let rows = 0;
		let base = new Float32Array(0);
		let field = new Float32Array(0);

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / cell) + 1;
				rows = Math.ceil(h / cell) + 1;
				base = new Float32Array(cols * rows);
				field = new Float32Array(cols * rows);
				for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) base[i + j * cols] = noise(i * cell * 0.0042, j * cell * 0.0042, 4);
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 3);
				const { x: px, y: py } = ptr.p;
				const R2 = reach * reach;
				const drift = Math.sin(t * 0.25) * 0.03;
				for (let j = 0; j < rows; j++)
					for (let i = 0; i < cols; i++) {
						const dx = i * cell - px;
						const dy = j * cell - py;
						field[i + j * cols] = base[i + j * cols] + drift * Math.sin(i * 0.05 + j * 0.04 + t * 0.3) + rise * Math.exp(-(dx * dx + dy * dy) / R2);
					}
				ctx.clearRect(0, 0, w, h);
				ctx.lineWidth = 1.1;
				ctx.lineJoin = 'round';
				const quiet = new Path2D();
				const accent = new Path2D();
				const lo = 0.2;
				const hi = 1.0;
				const gap = (hi - lo) / levels;
				const edge = (a: number, b: number, v: number) => (v - a) / (b - a || 1e-6);
				for (let j = 0; j < rows - 1; j++)
					for (let i = 0; i < cols - 1; i++) {
						const a = field[i + j * cols];
						const b = field[i + 1 + j * cols];
						const c = field[i + 1 + (j + 1) * cols];
						const d = field[i + (j + 1) * cols];
						const mn = Math.min(a, b, c, d);
						const mx = Math.max(a, b, c, d);
						const x0 = i * cell;
						const y0 = j * cell;
						for (let l = Math.ceil((mn - lo) / gap); lo + l * gap <= mx; l++) {
							const v = lo + l * gap;
							const pts: number[] = [];
							if ((a < v) !== (b < v)) pts.push(x0 + edge(a, b, v) * cell, y0);
							if ((b < v) !== (c < v)) pts.push(x0 + cell, y0 + edge(b, c, v) * cell);
							if ((d < v) !== (c < v)) pts.push(x0 + edge(d, c, v) * cell, y0 + cell);
							if ((a < v) !== (d < v)) pts.push(x0, y0 + edge(a, d, v) * cell);
							const path = l % 5 === 0 ? accent : quiet;
							for (let q = 0; q + 3 < pts.length; q += 4) {
								path.moveTo(pts[q], pts[q + 1]);
								path.lineTo(pts[q + 2], pts[q + 3]);
							}
						}
					}
				ctx.strokeStyle = rgba(fg, 0.2);
				ctx.stroke(quiet);
				ctx.strokeStyle = rgba(ox, 0.85);
				ctx.stroke(accent);
				ctx.fillStyle = rgba(ox, 1);
				ctx.fillRect(px - 3, py - 3, 6, 6);
			}
		});
		return () => {
			m?.destroy();
			ptr.destroy();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
