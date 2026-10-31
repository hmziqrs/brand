<script lang="ts">
	import { mountCanvas, readColor, rgba, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { cell = 32, reach = 150, swell = 0.5 }: { cell?: number; reach?: number; swell?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const fg = readColor(host, 'var(--foreground)');
		const ox = readColor(host, 'var(--orange)');
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && m.redraw());
		const seg = 8;

		m = mountCanvas(canvas, {
			animate: true,
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, true, 6);
				const { x: px, y: py } = ptr.p;
				const R2 = reach * reach;
				const warp = (x: number, y: number): [number, number, number] => {
					const vx = x - px;
					const vy = y - py;
					const f = Math.exp(-(vx * vx + vy * vy) / R2);
					const s = 1 + swell * f;
					return [px + vx * s, py + vy * s, f];
				};
				ctx.clearRect(0, 0, w, h);
				ctx.lineWidth = 1;
				const ox0 = ((w / 2) % cell) - cell;
				const oy0 = ((h / 2) % cell) - cell;
				const quiet = new Path2D();
				const hot = new Path2D();
				for (let gx = ox0; gx <= w + cell; gx += cell) {
					let started = false;
					let wasHot = false;
					for (let y = -cell; y <= h + cell; y += seg) {
						const [x2, y2, f] = warp(gx, y);
						const isHot = f > 0.42;
						const path = isHot ? hot : quiet;
						if (!started || isHot !== wasHot) {
							if (started) (wasHot ? hot : quiet).lineTo(x2, y2);
							path.moveTo(x2, y2);
							started = true;
						} else path.lineTo(x2, y2);
						wasHot = isHot;
					}
				}
				for (let gy = oy0; gy <= h + cell; gy += cell) {
					let started = false;
					let wasHot = false;
					for (let x = -cell; x <= w + cell; x += seg) {
						const [x2, y2, f] = warp(x, gy);
						const isHot = f > 0.42;
						const path = isHot ? hot : quiet;
						if (!started || isHot !== wasHot) {
							if (started) (wasHot ? hot : quiet).lineTo(x2, y2);
							path.moveTo(x2, y2);
							started = true;
						} else path.lineTo(x2, y2);
						wasHot = isHot;
					}
				}
				ctx.strokeStyle = rgba(fg, 0.12);
				ctx.stroke(quiet);
				ctx.strokeStyle = rgba(ox, 0.75);
				ctx.stroke(hot);
				for (let gx = ox0; gx <= w + cell; gx += cell)
					for (let gy = oy0; gy <= h + cell; gy += cell) {
						const [x2, y2, f] = warp(gx, gy);
						if (f < 0.2) continue;
						const s = 2 + f * 5;
						ctx.fillStyle = rgba(ox, Math.min(1, f * 1.4));
						ctx.fillRect(x2 - s / 2, y2 - s / 2, s, s);
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
