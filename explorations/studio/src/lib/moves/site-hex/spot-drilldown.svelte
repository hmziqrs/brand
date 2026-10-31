<script lang="ts">
	import { cn } from '$brand/utils.js';
	import SpotDefs from './spot-defs.svelte';
	import { box, floor, iso, layer } from './iso';

	let {
		label = 'Isometric bar chart on a grid floor; a magnifying lens hovers over the tallest bar and shows the branching cause behind it',
		class: className
	}: { label?: string; class?: string } = $props();

	const uid = $props.id();
	const id = `dd-${uid}`;
	const u = 26;
	const heights = [2.2, 3.4, 1.6, 5, 2.8];
	const bars = heights.map((h, i) => ({ ...box(1 + i * 1.6, 2, 0, 1, 1.2, h, u), hot: i === 3 }));
	const grid = floor(9, 6, u);
	const [tx, ty] = iso(6.3, 2.6, 5, u);
	const lens = { x: 330 - 200, y: 84 - 190, r: 50 };
</script>

<svg viewBox="0 0 480 400" role="img" aria-label={label} class={cn('h-auto w-full overflow-visible', className)} fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">
	<SpotDefs {id} />
	<g transform="translate(200 190)">
		<g mask="url(#{id}-floormask)" opacity="0.35" stroke-width="0.8">
			{#each grid as d (d)}<path {d} />{/each}
		</g>
		<path d="M{iso(0, 7.4, 0, u).join(' ')}L{iso(9, 7.4, 0, u).join(' ')}" stroke-dasharray="2 4" opacity="0.5" />

		<g style={layer(4)}>
			{#each bars as b, i (i)}
				<path d={b.left} fill={b.hot ? `url(#${id}-rust)` : `url(#${id}-hatch)`} />
				<path d={b.right} fill="var(--background)" />
				<path d={b.top} fill={b.hot ? 'var(--orange)' : 'var(--background)'} />
			{/each}
		</g>

		<g style={layer(10)}>
			<path d="M{tx} {ty - 2}L{lens.x - lens.r * 0.62} {lens.y + lens.r * 0.78}" stroke-dasharray="3 3" opacity="0.7" />
			<circle cx={tx} cy={ty - 2} r="3" fill="var(--orange)" stroke="none" />
			<circle cx={lens.x} cy={lens.y} r={lens.r + 6} fill="var(--background)" />
			<circle cx={lens.x} cy={lens.y} r={lens.r} />
			<circle cx={lens.x} cy={lens.y} r={lens.r + 6} opacity="0.5" />
			<path d="M{lens.x + 40} {lens.y + 40}l26 26" stroke-width="4" />
			<g transform="translate({lens.x} {lens.y})">
				<rect x="-6" y="-32" width="12" height="12" fill="var(--background)" />
				<path d="M0 -20V-8M0 -8H-20V6M0 -8H20V6M20 18V26" />
				<rect x="-26" y="6" width="12" height="12" fill="var(--background)" />
				<rect x="14" y="6" width="12" height="12" fill="var(--orange)" stroke="none" />
				<path d="M20 18V24" />
				<circle cx="20" cy="28" r="4" fill="var(--background)" />
			</g>
		</g>

		<g style={layer(14)}>
			<rect x="-170" y="-150" width="92" height="40" rx="3" fill="var(--background)" />
			<path d="M-160 -136h40" opacity="0.5" />
			<text x="-160" y="-118" font-family="var(--font-mono)" font-size="12" fill="currentColor" stroke="none">churn −18%</text>
			<rect x="-90" y="-60" width="8" height="8" fill="var(--orange)" stroke="none" transform="rotate(12 -86 -56)" />
			<rect x="170" y="40" width="7" height="7" />
		</g>
	</g>
</svg>
