<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SpotDefs from './spot-defs.svelte';
	import { box, cylinder, iso, layer, line } from './iso';

	let {
		label = 'Three stacked isometric plates: raw tables at the bottom, a governed model in the middle, a checked answer card on top',
		class: className
	}: { label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `ly-${uid}`;
	const u = 22;
	const levels = [0, 4.2, 8.4];
	const plate = (z: number) => box(0, 0, z, 8, 8, 0.35, u);
	const dbs = [
		[2, 2.2, 1.8],
		[4.6, 2.4, 2.6],
		[3, 5.2, 1.4]
	].map(([x, y, h]) => cylinder(x, y, 0.35, 0.9, h, u));
	const cubes = [] as { b: ReturnType<typeof box>; hot: boolean }[];
	for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) cubes.push({ b: box(1.4 + i * 1.9, 1.4 + j * 1.9, 4.55, 1.1, 1.1, 0.9, u), hot: i === 2 && j === 1 });
	const card = box(1.6, 2.2, 8.75, 4.8, 3.4, 0.3, u);
	const corners = [
		[0, 8],
		[8, 8],
		[8, 0]
	];
	const lines = (z1: number, z2: number) => corners.map(([x, y]) => line([iso(x, y, z1, u), iso(x, y, z2, u)]));
	const [bx, by] = iso(6.6, 2.4, 9.2, u);
	const textRow = (k: number, w: number) => line([iso(2.2, 3 + k * 0.7, 9.06, u), iso(2.2 + w, 3 + k * 0.7, 9.06, u)]);
</script>

<svg viewBox="-200 -250 400 450" role="img" aria-label={label} class={cn('h-auto w-full overflow-visible', className)} fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">
	<SpotDefs {id} />
	<g style={layer(2)}>
		<path d={plate(levels[0]).left} fill="url(#{id}-hatch)" />
		<path d={plate(levels[0]).right} fill="var(--background)" />
		<path d={plate(levels[0]).top} fill="var(--background)" />
		{#each dbs as c, i (i)}
			<path d={c.body} fill="var(--background)" />
			<ellipse cx={c.cx} cy={c.bottom} rx={c.rx} ry={c.ry} opacity="0" />
			<ellipse cx={c.cx} cy={c.top} rx={c.rx} ry={c.ry} fill="var(--background)" />
			<path d="M{c.cx - c.rx} {c.top + (c.bottom - c.top) / 2}A{c.rx} {c.ry} 0 0 0 {c.cx + c.rx} {c.top + (c.bottom - c.top) / 2}" opacity="0.5" />
		{/each}
	</g>
	<g style={layer(6)}>
		<g stroke-dasharray="2 4" opacity="0.6">
			{#each lines(0.35, levels[1]) as d (d)}<path {d} />{/each}
		</g>
		<path d={plate(levels[1]).left} fill="url(#{id}-hatch)" />
		<path d={plate(levels[1]).right} fill="var(--background)" />
		<path d={plate(levels[1]).top} fill="var(--background)" />
		{#each cubes as c, i (i)}
			<path d={c.b.left} fill={c.hot ? `url(#${id}-rust)` : `url(#${id}-hatch)`} />
			<path d={c.b.right} fill="var(--background)" />
			<path d={c.b.top} fill={c.hot ? 'var(--orange)' : 'var(--background)'} />
		{/each}
	</g>
	<g style={layer(11)}>
		<g stroke-dasharray="2 4" opacity="0.6">
			{#each lines(levels[1] + 0.35, levels[2]) as d (d)}<path {d} />{/each}
		</g>
		<path d={plate(levels[2]).left} fill="url(#{id}-hatch)" />
		<path d={plate(levels[2]).right} fill="var(--background)" />
		<path d={plate(levels[2]).top} fill="var(--background)" />
		<path d={card.left} fill="var(--background)" />
		<path d={card.right} fill="var(--background)" />
		<path d={card.top} fill="var(--background)" />
		<path d={textRow(0, 2.6)} stroke-width="2" />
		<path d={textRow(1, 3.4)} opacity="0.5" />
		<path d={textRow(2, 2)} opacity="0.5" />
		<circle cx={bx} cy={by - 18} r="13" fill="var(--orange)" stroke="none" />
		<path d="M{bx - 6} {by - 18}l4 4 8 -9" stroke="var(--on-orange)" stroke-width="2" />
	</g>
	<g style={layer(16)}>
		<rect x="118" y="-150" width="9" height="9" fill="var(--orange)" stroke="none" />
		<rect x="-170" y="-60" width="8" height="8" />
		<circle cx="150" cy="40" r="4" />
	</g>
</svg>
