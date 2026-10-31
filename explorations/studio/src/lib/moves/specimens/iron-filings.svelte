<script lang="ts">
	import { mountCanvas, readColor, rgba, mix, rng, trackPointer, valueNoise } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { pitch = 13, length = 9, reach = 260 }: { pitch?: number; length?: number; reach?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		const noise = valueNoise(3);
		const rand = rng(41);
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		let n = 0;
		let fx = new Float32Array(0);
		let fy = new Float32Array(0);
		let ang = new Float32Array(0);
		let rest = new Float32Array(0);
		let len = new Float32Array(0);

		m = mountCanvas(canvas, {
			animate: true,
			setup: ({ w, h }) => {
				const cols = Math.ceil(w / pitch);
				const rows = Math.ceil(h / pitch);
				n = cols * rows;
				fx = new Float32Array(n);
				fy = new Float32Array(n);
				ang = new Float32Array(n);
				rest = new Float32Array(n);
				len = new Float32Array(n);
				for (let j = 0; j < rows; j++)
					for (let i = 0; i < cols; i++) {
						const k = i + j * cols;
						fx[k] = (i + 0.5 + (rand() - 0.5) * 0.7) * pitch;
						fy[k] = (j + 0.5 + (rand() - 0.5) * 0.7) * pitch;
						rest[k] = noise(fx[k] * 0.004, fy[k] * 0.004, 3) * Math.PI * 4;
						ang[k] = rest[k];
						len[k] = length * (0.55 + rand() * 0.7);
					}
			},
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 5);
				const { x: px, y: py } = ptr.p;
				const k = dt ? 1 - Math.exp(-dt * 6) : 1;
				ctx.clearRect(0, 0, w, h);
				ctx.lineCap = 'round';
				ctx.lineWidth = 1.25;
				const quiet = new Path2D();
				const R2 = reach * reach;
				const pole = 34;
				for (let i = 0; i < n; i++) {
					const ax = fx[i] - (px - pole);
					const ay = fy[i] - py;
					const bxv = fx[i] - (px + pole);
					const byv = fy[i] - py;
					const a2 = ax * ax + ay * ay + 40;
					const b2 = bxv * bxv + byv * byv + 40;
					const Bx = ax / a2 - bxv / b2;
					const By = ay / a2 - byv / b2;
					const d2 = (fx[i] - px) ** 2 + (fy[i] - py) ** 2;
					const f = Math.exp(-d2 / R2);
					const target = f > 0.02 ? Math.atan2(By, Bx) : rest[i];
					let diff = target - ang[i];
					diff = Math.atan2(Math.sin(diff * 2), Math.cos(diff * 2)) / 2;
					ang[i] += diff * k * (0.25 + f * 0.75);
					const L = len[i] * (1 + f * 0.5);
					const c = Math.cos(ang[i]) * L * 0.5;
					const s = Math.sin(ang[i]) * L * 0.5;
					if (f < 0.12) {
						quiet.moveTo(fx[i] - c, fy[i] - s);
						quiet.lineTo(fx[i] + c, fy[i] + s);
					} else {
						ctx.strokeStyle = rgba(mix(fg, ox, Math.min(1, f * 1.3)), 0.3 + f * 0.7);
						ctx.beginPath();
						ctx.moveTo(fx[i] - c, fy[i] - s);
						ctx.lineTo(fx[i] + c, fy[i] + s);
						ctx.stroke();
					}
				}
				ctx.strokeStyle = rgba(fg, 0.2);
				ctx.stroke(quiet);
			}
		});
		return () => {
			m?.destroy();
			ptr.destroy();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
