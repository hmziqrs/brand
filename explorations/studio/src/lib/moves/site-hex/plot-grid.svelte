<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		cell = 40,
		trail = true,
		crosshair = true,
		class: className
	}: { cell?: number; trail?: boolean; crosshair?: boolean; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let px = $state(-1);
	let py = $state(-1);
	let inside = $state(false);

	$effect(() => {
		if (!host || !canvas) return;
		const el = host;
		const cv = canvas;
		const ctx = cv.getContext('2d');
		if (!ctx) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const heat = new Map<string, number>();
		let w = 0;
		let h = 0;
		let raf = 0;
		let fg = '#000';
		let ox = '#000';
		let ln = '#000';

		const read = () => {
			const cs = getComputedStyle(el);
			fg = cs.getPropertyValue('--foreground').trim() || 'currentColor';
			ox = cs.getPropertyValue('--orange').trim() || fg;
			ln = cs.getPropertyValue('--line').trim() || fg;
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
			ctx.clearRect(0, 0, w, h);
			ctx.globalAlpha = 1;
			ctx.strokeStyle = ln;
			ctx.lineWidth = 1;
			ctx.beginPath();
			for (let x = 0.5; x < w; x += cell) (ctx.moveTo(x, 0), ctx.lineTo(x, h));
			for (let y = 0.5; y < h; y += cell) (ctx.moveTo(0, y), ctx.lineTo(w, y));
			ctx.stroke();
			for (const [k, v] of heat) {
				const [i, j] = k.split(':').map(Number);
				const hot = (i * 7 + j * 13) % 11 === 0;
				ctx.globalAlpha = Math.min(v, 1) * (hot ? 0.9 : 0.1);
				ctx.fillStyle = hot ? ox : fg;
				ctx.fillRect(i * cell + 1, j * cell + 1, cell - 1, cell - 1);
				const n = v - (reduce ? 1 : 0.025);
				if (n <= 0) heat.delete(k);
				else heat.set(k, n);
			}
			ctx.globalAlpha = 1;
			raf = heat.size ? requestAnimationFrame(draw) : 0;
		};
		const kick = () => {
			if (!raf) raf = requestAnimationFrame(draw);
		};
		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			const x = e.clientX - r.left;
			const y = e.clientY - r.top;
			inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
			if (!inside) return;
			px = x;
			py = y;
			if (trail) heat.set(`${Math.floor(x / cell)}:${Math.floor(y / cell)}`, 1);
			kick();
		};
		const ro = new ResizeObserver(() => (size(), draw()));
		ro.observe(el);
		const mo = new MutationObserver(() => (read(), draw()));
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-oxide', 'data-light', 'style'] });
		window.addEventListener('pointermove', move, { passive: true });
		size();
		draw();
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			mo.disconnect();
			window.removeEventListener('pointermove', move);
		};
	});

	const cx = $derived(Math.floor(px / cell) * cell);
	const cy = $derived(Math.floor(py / cell) * cell);
</script>

<div bind:this={host} aria-hidden="true" class={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_80%_75%_at_50%_40%,black_30%,transparent_100%)]"></canvas>
	{#if crosshair && inside}
		<div class="absolute inset-y-0 w-px bg-foreground/25" style:left="{cx}px"></div>
		<div class="absolute inset-x-0 h-px bg-foreground/25" style:top="{cy}px"></div>
		<span class="absolute bg-background px-1.5 py-0.5 font-mono text-[11px] text-foreground tabular-nums" style:left="{cx + 6}px" style:top="{cy + 6}px">{Math.floor(px / cell)},{Math.floor(py / cell)}</span>
	{/if}
</div>
