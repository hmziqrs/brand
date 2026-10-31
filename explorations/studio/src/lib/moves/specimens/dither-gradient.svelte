<script lang="ts">
	import { mountCanvas, readColor, bayer8, trackPointer } from './canvas-kit';
	import { prefs } from '$studio/prefs.svelte';

	let { pixel = 4, fx = 0.82, fy = 0.78 }: { pixel?: number; fx?: number; fy?: number } = $props();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		void prefs.colorKey;
		const host = canvas.parentElement!;
		const ox = readColor(host, 'var(--orange)');
		const deep = readColor(host, 'var(--oxide-deep)');
		const off = document.createElement('canvas');
		const octx = off.getContext('2d')!;
		let img: ImageData | null = null;
		let lx = -1;
		let ly = -1;
		let lw = 0;
		let lh = 0;
		let m: ReturnType<typeof mountCanvas> | undefined;
		const ptr = trackPointer(canvas, () => m?.still && (ptr.snap(), m.redraw()));

		const render = (w: number, h: number, cx: number, cy: number) => {
			const cols = Math.ceil(w / pixel);
			const rows = Math.ceil(h / pixel);
			if (!img || img.width !== cols || img.height !== rows) {
				off.width = cols;
				off.height = rows;
				img = octx.createImageData(cols, rows);
			}
			const d = img.data;
			const reach = Math.hypot(w, h) * 0.62;
			for (let y = 0; y < rows; y++)
				for (let x = 0; x < cols; x++) {
					const dist = Math.hypot(x * pixel - cx, (y * pixel - cy) * 1.25) / reach;
					const wave = Math.sin(x * pixel * 0.012 + y * pixel * 0.02) * 0.06;
					const v = Math.max(0, Math.min(1, 1 - dist + wave)) * 2;
					const level = Math.floor(v);
					const lv = v - level > bayer8(x, y) ? level + 1 : level;
					const o = (x + y * cols) * 4;
					const c = lv === 1 ? deep : ox;
					d[o] = c[0];
					d[o + 1] = c[1];
					d[o + 2] = c[2];
					d[o + 3] = lv <= 0 ? 0 : lv === 1 ? 217 : 255;
				}
			octx.putImageData(img, 0, 0);
		};

		m = mountCanvas(canvas, {
			animate: true,
			dpr: 1,
			draw: ({ ctx, w, h, t, dt }) => {
				ptr.step(dt, w, h, t, false, 4);
				const p = ptr.p;
				const tx = p.inside || (!dt && p.live) ? p.x : w * fx;
				const ty = p.inside || (!dt && p.live) ? p.y : h * fy;
				if (dt && w === lw && h === lh && Math.abs(tx - lx) < 0.5 && Math.abs(ty - ly) < 0.5) return;
				lw = w;
				lh = h;
				lx = lx < 0 || !dt ? tx : lx + (tx - lx) * (1 - Math.exp(-dt * 4));
				ly = ly < 0 || !dt ? ty : ly + (ty - ly) * (1 - Math.exp(-dt * 4));
				render(w, h, lx, ly);
				ctx.clearRect(0, 0, w, h);
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(off, 0, 0, off.width * pixel, off.height * pixel);
			}
		});
		return () => {
			m?.destroy();
			ptr.destroy();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full [image-rendering:pixelated]"></canvas>
