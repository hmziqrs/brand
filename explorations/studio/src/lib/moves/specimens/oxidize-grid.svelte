<script lang="ts">
	import { mountCanvas, readColor, rgba, reducedMotion } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { cell = 34, radius = 120, ghost = true }: { cell?: number; radius?: number; ghost?: boolean } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.oxide;
		void prefs.dark;
		const el = canvas;
		const host = el.parentElement!;
		const target = (el.closest('.spec-pane') as HTMLElement) ?? host;
		const line = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const deep = readColor(host, 'var(--oxide-deep)');
		let cols = 0;
		let rows = 0;
		let heat = new Float32Array(0);
		let stain = new Float32Array(0);
		let px = -1e4;
		let py = -1e4;
		let inside = false;
		const still = reducedMotion();

		const warm = (x: number, y: number) => {
			const r = radius / cell;
			const cx = x / cell;
			const cy = y / cell;
			for (let j = Math.max(0, Math.floor(cy - r)); j <= Math.min(rows - 1, Math.ceil(cy + r)); j++)
				for (let i = Math.max(0, Math.floor(cx - r)); i <= Math.min(cols - 1, Math.ceil(cx + r)); i++) {
					const d = Math.hypot(i + 0.5 - cx, j + 0.5 - cy) / r;
					if (d < 1) {
						const k = i + j * cols;
						heat[k] = Math.max(heat[k], 1 - d);
						stain[k] = Math.max(stain[k], (1 - d) * 0.32);
					}
				}
		};

		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			px = e.clientX - r.left;
			py = e.clientY - r.top;
			inside = true;
			if (still) {
				heat.fill(0);
				warm(px, py);
				m.redraw();
			}
		};
		const leave = () => (inside = false);
		target.addEventListener('pointermove', move);
		target.addEventListener('pointerleave', leave);

		const m = mountCanvas(el, {
			animate: true,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / cell);
				rows = Math.ceil(h / cell);
				heat = new Float32Array(cols * rows);
				stain = new Float32Array(cols * rows);
				if (still && ghost) for (let a = 0; a < 6.2; a += 0.08) warm(w * (0.62 + 0.26 * Math.cos(a)), h * (0.42 + 0.3 * Math.sin(a * 2)));
				if (still) heat.fill(0);
			},
			draw: ({ ctx, w, h, t, dt }) => {
				if (dt) {
					const k = Math.exp(-dt * 1.6);
					const s = Math.exp(-dt * 0.04);
					for (let i = 0; i < heat.length; i++) {
						heat[i] *= k;
						stain[i] *= s;
					}
					if (inside) warm(px, py);
					else if (ghost) warm(w * (0.62 + 0.28 * Math.cos(t * 0.45)), h * (0.45 + 0.32 * Math.sin(t * 0.9)));
				}
				ctx.clearRect(0, 0, w, h);
				for (let j = 0; j < rows; j++)
					for (let i = 0; i < cols; i++) {
						const k = i + j * cols;
						const x = i * cell;
						const y = j * cell;
						if (stain[k] > 0.01) {
							ctx.fillStyle = rgba(deep, stain[k]);
							ctx.fillRect(x, y, cell, cell);
						}
						if (heat[k] > 0.02) {
							ctx.fillStyle = rgba(ox, Math.min(1, heat[k] * 1.1));
							ctx.fillRect(x + 1, y + 1, cell - 1, cell - 1);
						}
					}
				ctx.strokeStyle = rgba(line, 0.09);
				ctx.lineWidth = 1;
				ctx.beginPath();
				for (let i = 0; i <= cols; i++) {
					ctx.moveTo(i * cell + 0.5, 0);
					ctx.lineTo(i * cell + 0.5, h);
				}
				for (let j = 0; j <= rows; j++) {
					ctx.moveTo(0, j * cell + 0.5);
					ctx.lineTo(w, j * cell + 0.5);
				}
				ctx.stroke();
			}
		});
		return () => {
			m.destroy();
			target.removeEventListener('pointermove', move);
			target.removeEventListener('pointerleave', leave);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
