<script lang="ts">
	import { mountCanvas, readColor, rgba, trackPointer, valueNoise } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let {
		spacing = 8,
		angle = -38,
		from = 'bottom-right',
		reach = 170,
		bend = 0.34
	}: { spacing?: number; angle?: number; from?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left'; reach?: number; bend?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const ink = readColor(host, 'var(--mark-square)');
		const noise = valueNoise(11);
		const corner = { 'top-right': [1, 0], 'bottom-right': [1, 1], 'bottom-left': [0, 1], 'top-left': [0, 0] }[from];
		const a = ((angle - 90) * Math.PI) / 180;
		const ux = Math.cos(a);
		const uy = Math.sin(a);
		const nx = -uy;
		const ny = ux;
		const step = 7;
		const buckets = 7;
		let mask = new Float32Array(0);
		let mcols = 0;
		const mcell = 8;
		let mrows = 0;
		const sample = (x: number, y: number) => {
			const fx = Math.max(0, Math.min(mcols - 1.001, x / mcell));
			const fy = Math.max(0, Math.min(mrows - 1.001, y / mcell));
			const i = Math.floor(fx);
			const j = Math.floor(fy);
			const u = fx - i;
			const v = fy - j;
			const a = mask[i + j * mcols];
			const b = mask[i + 1 + j * mcols];
			const c = mask[i + (j + 1) * mcols];
			const d = mask[i + 1 + (j + 1) * mcols];
			return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
		};
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				mcols = Math.ceil(w / mcell) + 1;
				mrows = Math.ceil(h / mcell) + 1;
				mask = new Float32Array(mcols * mrows);
				const diag = Math.hypot(w, h);
				for (let j = 0; j < mrows; j++)
					for (let i = 0; i < mcols; i++) {
						const x = i * mcell;
						const y = j * mcell;
						const r = Math.hypot(x - corner[0] * w, y - corner[1] * h) / (diag * 0.95);
						const g = r < 0.45 ? 1 - r * 0.55 : Math.max(0, 0.75 * (1 - (r - 0.45) / 0.55));
						const n = noise(x * 0.012, y * 0.012, 4);
						mask[i + j * mcols] = Math.max(0, Math.min(1, (g + n - 0.62) * 2.4));
					}
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 5);
				const { x: px, y: py, live } = ptr.p;
				ctx.clearRect(0, 0, w, h);
				ctx.lineWidth = 1.5;
				ctx.lineCap = 'butt';
				const paths = Array.from({ length: buckets }, () => new Path2D());
				const diag = Math.hypot(w, h);
				const cx = w / 2;
				const cy = h / 2;
				const R2 = reach * reach;
				for (let o = -diag / 2; o <= diag / 2; o += spacing) {
					const bx = cx + nx * o;
					const by = cy + ny * o;
					let prev = -1;
					for (let s = -diag / 2; s <= diag / 2; s += step) {
						let x = bx + ux * s;
						let y = by + uy * s;
						if (x < -20 || y < -20 || x > w + 20 || y > h + 20) {
							prev = -1;
							continue;
						}
						let lift = 0;
						if (live) {
							const vx = px - x;
							const vy = py - y;
							const f = Math.exp(-(vx * vx + vy * vy) / R2);
							x += vx * f * bend;
							y += vy * f * bend;
							lift = f;
						}
						const mv = Math.min(1, sample(x, y) + lift * 0.9);
						const b = Math.min(buckets - 1, Math.floor(mv * buckets));
						if (b > 0 && prev === b) paths[b].lineTo(x, y);
						else {
							if (prev > 0) paths[prev].lineTo(x, y);
							if (b > 0) paths[b].moveTo(x, y);
						}
						prev = b;
					}
				}
				for (let b = 1; b < buckets; b++) {
					ctx.strokeStyle = rgba(ink, (b / (buckets - 1)) * 0.78);
					ctx.stroke(paths[b]);
				}
			}
		});
		return () => {
			m?.destroy();
			ptr.destroy();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
