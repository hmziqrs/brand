<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { step = 22, class: className }: { step?: number; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!host || !canvas) return;
		const el = host;
		const cv = canvas;
		const ctx = cv.getContext('2d');
		if (!ctx) return;
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let w = 0;
		let h = 0;
		let px = -9999;
		let py = -9999;
		let raf = 0;
		let grow = still ? 1 : 0;
		let col = { dot: '', fg: '', ox: '' };

		const read = () => {
			const cs = getComputedStyle(el);
			col = { dot: cs.getPropertyValue('--foreground'), fg: cs.getPropertyValue('--foreground'), ox: cs.getPropertyValue('--orange') };
		};
		const size = () => {
			const r = el.getBoundingClientRect();
			const d = Math.min(2, devicePixelRatio || 1);
			w = r.width;
			h = r.height;
			cv.width = Math.round(w * d);
			cv.height = Math.round(h * d);
			ctx.setTransform(d, 0, 0, d, 0, 0);
			read();
		};
		const draw = () => {
			ctx.clearRect(0, 0, w, h);
			const cols = Math.ceil(w / step);
			const rows = Math.ceil(h / step);
			for (let x = 0; x < cols; x++) {
				const t = x / Math.max(1, cols - 1);
				const edge = Math.min(t, 1 - t);
				const height = Math.round((Math.pow(Math.max(0, (t - 0.04) / 0.96), 1.8) * 0.42 + (edge < 0.18 ? 0.04 : 0)) * rows * grow);
				for (let y = 0; y < rows; y++) {
					const cx = x * step + step / 2;
					const cy = y * step + step / 2;
					const d = Math.hypot(cx - px, cy - py);
					const near = Math.max(0, 1 - d / 160);
					const inBar = rows - y <= height && (x < cols * 0.22 || x > cols * 0.78);
					if (inBar) {
						const top = rows - y === height;
						ctx.globalAlpha = top ? 0.95 : 0.22 + near * 0.5;
						ctx.fillStyle = top ? col.ox : col.fg;
						const s = step * 0.5;
						ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
					} else {
						ctx.globalAlpha = 0.16 + near * 0.6;
						ctx.fillStyle = near > 0.55 ? col.ox : col.dot;
						const r = 1 + near * 2.4;
						ctx.beginPath();
						ctx.arc(cx, cy, r, 0, Math.PI * 2);
						ctx.fill();
					}
				}
			}
			ctx.globalAlpha = 1;
		};
		const loop = () => {
			if (grow < 1) grow = Math.min(1, grow + 0.025);
			draw();
			raf = grow < 1 ? requestAnimationFrame(loop) : 0;
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(loop);
		};
		const on = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			px = e.clientX - r.left;
			py = e.clientY - r.top;
			kick();
		};
		const off = () => {
			px = py = -9999;
			kick();
		};
		size();
		kick();
		const ro = new ResizeObserver(() => (size(), kick()));
		ro.observe(el);
		const mo = new MutationObserver(() => (read(), kick()));
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
		const parent = el.parentElement ?? el;
		parent.addEventListener('pointermove', on, { passive: true });
		parent.addEventListener('pointerleave', off);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			mo.disconnect();
			parent.removeEventListener('pointermove', on);
			parent.removeEventListener('pointerleave', off);
		};
	});
</script>

<div bind:this={host} aria-hidden="true" class={cn('pointer-events-none absolute inset-0', className)}>
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
</div>
