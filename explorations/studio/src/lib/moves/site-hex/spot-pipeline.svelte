<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SpotDefs from './spot-defs.svelte';
	import { box, floor, iso, layer, line } from './iso';

	let {
		label = 'Three isometric cards linked by wires on a grid: a query, a code cell and a chart, with an oxide block travelling between them',
		class: className
	}: { label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `pl-${uid}`;
	const u = 20;
	const grid = floor(14, 10, u);
	const cards = [
		{ x: 0.6, y: 1, kind: 'sql' },
		{ x: 5.4, y: 3.2, kind: 'py' },
		{ x: 9.6, y: 5.6, kind: 'chart' }
	] as const;
	const slabs = cards.map((c) => ({ ...c, b: box(c.x, c.y, 0.4, 3.8, 3, 0.35, u) }));
	const row = (c: (typeof cards)[number], k: number, w: number) => line([iso(c.x + 0.5, c.y + 0.7 + k * 0.6, 0.76, u), iso(c.x + 0.5 + w, c.y + 0.7 + k * 0.6, 0.76, u)]);
	const bars = [1.2, 2, 0.8, 1.6].map((h, i) => box(cards[2].x + 0.6 + i * 0.8, cards[2].y + 1.1, 0.75, 0.5, 0.6, h, u));
	const wire = line([iso(4.4, 2.5, 0, u), iso(5.6, 2.5, 0, u), iso(5.6, 4.7, 0, u)]);
	const wire2 = line([iso(9.2, 4.7, 0, u), iso(10.4, 4.7, 0, u), iso(10.4, 7.1, 0, u)]);
	const travel = line([iso(4.4, 2.5, 0, u), iso(5.6, 2.5, 0, u), iso(5.6, 4.7, 0, u), iso(9.2, 4.7, 0, u), iso(10.4, 4.7, 0, u), iso(10.4, 7.1, 0, u)]);
</script>

<svg viewBox="-185 -40 435 290" role="img" aria-label={label} class={cn('h-auto w-full overflow-visible', className)} fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">
	<SpotDefs {id} />
	<g mask="url(#{id}-floormask)" opacity="0.3" stroke-width="0.8">
		{#each grid as d (d)}<path {d} />{/each}
	</g>
	<g style={layer(3)}>
		<path d={wire} stroke-width="1.6" />
		<path d={wire2} stroke-width="1.6" />
		{#each [iso(4.4, 2.5, 0, u), iso(5.6, 4.7, 0, u), iso(9.2, 4.7, 0, u), iso(10.4, 7.1, 0, u)] as [x, y], i (i)}
			<circle cx={x} cy={y} r="3.5" fill="var(--background)" />
		{/each}
		<rect width="8" height="8" x="-4" y="-4" fill="var(--orange)" stroke="none" class="motion-reduce:hidden">
			<animateMotion dur="5s" repeatCount="indefinite" path={travel} />
		</rect>
	</g>
	<g style={layer(8)}>
		{#each slabs as s, i (i)}
			<path d={s.b.left} fill="url(#{id}-hatch)" />
			<path d={s.b.right} fill="var(--background)" />
			<path d={s.b.top} fill="var(--background)" />
			{#if s.kind !== 'chart'}
				<path d={row(s, 0, 1.4)} stroke-width="2.2" stroke={i === 0 ? 'var(--orange)' : 'currentColor'} />
				<path d={row(s, 1, 2.6)} opacity="0.55" />
				<path d={row(s, 2, 2)} opacity="0.55" />
				<path d={row(s, 3, 1.2)} opacity="0.55" />
			{/if}
		{/each}
		{#each bars as b, i (i)}
			<path d={b.left} fill={i === 1 ? `url(#${id}-rust)` : `url(#${id}-hatch)`} />
			<path d={b.right} fill="var(--background)" />
			<path d={b.top} fill={i === 1 ? 'var(--orange)' : 'var(--background)'} />
		{/each}
	</g>
</svg>
