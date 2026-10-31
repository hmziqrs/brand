<script lang="ts">
	import { mountCanvas, readColor, rgba, bayer8 } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { pixel = 4, fx = 0.82, fy = 0.78 }: { pixel?: number; fx?: number; fy?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.oxide;
		void prefs.dark;
		const host = canvas.parentElement!;
		const ox = readColor(host, 'var(--orange)');
		const deep = readColor(host, 'var(--oxide-deep)');
		const m = mountCanvas(canvas, {
			animate: false,
			dpr: 1,
			draw: ({ ctx, w, h }) => {
				ctx.clearRect(0, 0, w, h);
				const cols = Math.ceil(w / pixel);
				const rows = Math.ceil(h / pixel);
				const reach = Math.hypot(w, h) * 0.62;
				for (let y = 0; y < rows; y++)
					for (let x = 0; x < cols; x++) {
						const d = Math.hypot(x * pixel - w * fx, (y * pixel - h * fy) * 1.25) / reach;
						const wave = Math.sin(x * pixel * 0.012 + y * pixel * 0.02) * 0.06;
						const v = Math.max(0, Math.min(1, 1 - d + wave)) * 2;
						const level = Math.floor(v);
						const frac = v - level;
						const lv = frac > bayer8(x, y) ? level + 1 : level;
						if (lv <= 0) continue;
						ctx.fillStyle = lv === 1 ? rgba(deep, 0.85) : rgba(ox, 1);
						ctx.fillRect(x * pixel, y * pixel, pixel, pixel);
					}
			}
		});
		return () => m.destroy();
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full [image-rendering:pixelated]"></canvas>
