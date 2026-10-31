<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { values, color = 'var(--primary)', label, bars = false, class: className }: { values: number[]; color?: string; label?: string; bars?: boolean; class?: string } = $props();

	const W = 96;
	const H = 24;
	const max = $derived(Math.max(1, ...values));
	const min = $derived(bars ? 0 : Math.min(...values));
	const span = $derived(Math.max(1, max - min));
	const pts = $derived(values.map((v, i) => [(i / (values.length - 1)) * W, H - 2 - ((v - min) / span) * (H - 4)] as const));
	const line = $derived(pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '));
	const uid = $props.id();
</script>

<svg viewBox="0 0 {W} {H}" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'} class={cn('h-6 w-24 shrink-0 overflow-visible', className)} preserveAspectRatio="none">
	{#if bars}
		{#each values as v, i (i)}
			{@const h = Math.max(v > 0 ? 1.5 : 0.6, (v / max) * (H - 2))}
			<rect x={i * (W / values.length) + 0.6} y={H - h} width={W / values.length - 1.2} height={h} rx="0.6" fill={color} opacity={v > 0 ? 0.9 : 0.25} />
		{/each}
	{:else}
		<defs>
			<linearGradient id="rs-{uid}" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0" stop-color={color} stop-opacity="0.28" />
				<stop offset="1" stop-color={color} stop-opacity="0" />
			</linearGradient>
		</defs>
		<polygon points="0,{H} {line} {W},{H}" fill="url(#rs-{uid})" />
		<polyline points={line} fill="none" stroke={color} stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
		<circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill={color} />
	{/if}
</svg>
