<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SpotDefs from './spot-defs.svelte';
	import { box, iso } from './iso';

	let {
		cols = 12,
		rows = 9,
		u = 22,
		lift = 3.2,
		label = 'An isometric field of data blocks; blocks near the cursor rise into a hill with one oxide column at the peak',
		class: className
	}: { cols?: number; rows?: number; u?: number; lift?: number; label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `tr-${uid}`;
	const C = Math.cos(Math.PI / 6);

	const base = (i: number, j: number) => 0.35 + 0.9 * (0.5 + 0.5 * Math.sin(i * 0.7 + j * 0.35) * Math.cos(j * 0.55 - i * 0.2));

	let hx = $state(cols * 0.62);
	let hy = $state(rows * 0.45);
	let tx = cols * 0.62;
	let ty = rows * 0.45;
	let svg: SVGSVGElement | undefined = $state();

	const cells = $derived.by(() => {
		const out: { b: ReturnType<typeof box>; hot: boolean; tall: number }[] = [];
		let best = 0;
		let bi = -1;
		for (let j = 0; j < rows; j++)
			for (let i = 0; i < cols; i++) {
				const d = Math.hypot(i + 0.5 - hx, j + 0.5 - hy);
				const h = base(i, j) + lift * Math.exp(-(d * d) / 6);
				if (h > best) ((best = h), (bi = out.length));
				out.push({ b: box(i, j, 0, 0.86, 0.86, h, u), hot: false, tall: h });
			}
		if (bi >= 0) out[bi].hot = true;
		return out.sort((a, b) => a.b.key - b.b.key);
	});

	const [ox] = iso(0, rows, 0, u);
	const [rx] = iso(cols, 0, 0, u);
	const minX = ox - 10;
	const width = rx - ox + 20;
	const top = -(lift + 1.4) * u - 10;
	const height = iso(cols, rows, 0, u)[1] - top + 10;

	$effect(() => {
		if (!svg) return;
		const el = svg;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let raf = 0;
		const tick = () => {
			hx += (tx - hx) * 0.12;
			hy += (ty - hy) * 0.12;
			raf = Math.abs(tx - hx) + Math.abs(ty - hy) > 0.01 ? requestAnimationFrame(tick) : 0;
		};
		const move = (e: PointerEvent) => {
			if (reduce) return;
			const m = el.getScreenCTM();
			if (!m) return;
			const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
			const a = p.x / (C * u);
			const b = (2 * (p.y + u * 1.2)) / u;
			tx = Math.max(-1, Math.min(cols + 1, (a + b) / 2));
			ty = Math.max(-1, Math.min(rows + 1, (b - a) / 2));
			if (!raf) raf = requestAnimationFrame(tick);
		};
		window.addEventListener('pointermove', move, { passive: true });
		return () => (cancelAnimationFrame(raf), window.removeEventListener('pointermove', move));
	});
</script>

<svg bind:this={svg} viewBox="{minX} {top} {width} {height}" role="img" aria-label={label} class={cn('h-auto w-full', className)} fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round">
	<SpotDefs {id} />
	{#each cells as c, k (k)}
		<path d={c.b.left} fill={c.hot ? `url(#${id}-rust)` : `url(#${id}-hatch)`} />
		<path d={c.b.right} fill="var(--background)" />
		<path d={c.b.top} fill={c.hot ? 'var(--orange)' : 'var(--background)'} />
	{/each}
</svg>
