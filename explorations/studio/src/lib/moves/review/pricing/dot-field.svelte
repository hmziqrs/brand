<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { gap = 22, reach = 140, class: className }: { gap?: number; reach?: number; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!host || !canvas) return;
		const el = host;
		const cv = canvas;
		const ctx = cv.getContext('2d');
		if (!ctx) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let w = 0;
		let h = 0;
		let mx = -9999;
		let my = -9999;
		let raf = 0;
		let fg = '';
		let hot = '';
		const read = () => {
			const cs = getComputedStyle(el);
			fg = cs.color;
			hot = cs.getPropertyValue('--orange').trim() || fg;
		};
		const size = () => {
			const r = el.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = r.width;
			h = r.height;
			cv.width = Math.round(w * dpr);
			cv.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			read();
		};
		const draw = () => {
			raf = 0;
			ctx.clearRect(0, 0, w, h);
			for (let y = gap / 2; y < h; y += gap)
				for (let x = gap / 2; x < w; x += gap) {
					const d = Math.hypot(x - mx, y - my);
					const k = reduce ? 0 : Math.max(0, 1 - d / reach);
					const dx = k ? ((x - mx) / (d || 1)) * k * 8 : 0;
					const dy = k ? ((y - my) / (d || 1)) * k * 8 : 0;
					ctx.globalAlpha = 0.2 + k * 0.6;
					ctx.fillStyle = k > 0.75 ? hot : fg;
					ctx.beginPath();
					ctx.arc(x + dx, y + dy, 1 + k * 1.6, 0, Math.PI * 2);
					ctx.fill();
				}
			ctx.globalAlpha = 1;
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(draw);
		};
		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			mx = e.clientX - r.left;
			my = e.clientY - r.top;
			if (my < -reach || my > h + reach) return;
			kick();
		};
		const ro = new ResizeObserver(() => (size(), kick()));
		ro.observe(el);
		const mo = new MutationObserver(() => (read(), kick()));
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-oxide', 'data-light'] });
		window.addEventListener('pointermove', move, { passive: true });
		size();
		kick();
		return () => (cancelAnimationFrame(raf), ro.disconnect(), mo.disconnect(), window.removeEventListener('pointermove', move));
	});
</script>

<div bind:this={host} data-slot="dot-field" aria-hidden="true" class={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden text-foreground', className)}>
	<canvas bind:this={canvas} class="h-full w-full"></canvas>
</div>
