<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { pitch = 18, reach = 150, pull = 0.42 }: { pitch?: number; reach?: number; pull?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let cols = 0;
		let rows = 0;
		let ox0 = 0;
		let oy0 = 0;
		let dx = new Float32Array(0);
		let dy = new Float32Array(0);

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				cols = Math.ceil(w / pitch) + 1;
				rows = Math.ceil(h / pitch) + 1;
				ox0 = (w - (cols - 1) * pitch) / 2;
				oy0 = (h - (rows - 1) * pitch) / 2;
				dx = new Float32Array(cols * rows);
				dy = new Float32Array(cols * rows);
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t);
				const { x: px, y: py } = ptr.p;
				const k = dt ? 1 - Math.exp(-dt * 7) : 1;
				ctx.clearRect(0, 0, w, h);
				for (let j = 0; j < rows; j++)
					for (let i = 0; i < cols; i++) {
						const n = i + j * cols;
						const bx = ox0 + i * pitch;
						const by = oy0 + j * pitch;
						const vx = px - bx;
						const vy = py - by;
						const d = Math.hypot(vx, vy);
						const f = Math.exp(-(d * d) / (reach * reach));
						const s = d > 1 ? Math.min(d * pull * f, pitch * 2.2) / d : 0;
						dx[n] += (vx * s - dx[n]) * k;
						dy[n] += (vy * s - dy[n]) * k;
						const near = Math.min(1, Math.hypot(dx[n], dy[n]) / (pitch * 1.4));
						const r = 1.1 + near * 2.6;
						ctx.fillStyle = near > 0.08 ? rgba(mix(fg, ox, Math.min(1, near * 1.6)), 0.3 + near * 0.7) : rgba(fg, 0.26);
						ctx.beginPath();
						ctx.arc(bx + dx[n], by + dy[n], r, 0, Math.PI * 2);
						ctx.fill();
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
