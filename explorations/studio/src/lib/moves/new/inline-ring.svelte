<script lang="ts">
	import { arcs, hash, rng } from '@hmziq/brand-core/motion/rings';
	import { cn } from '$brand/utils.js';

	let {
		seed,
		rings = 9,
		spin = false,
		solid = false,
		label,
		weight = 1,
		class: className,
		...rest
	}: { seed: string; rings?: number; spin?: boolean; solid?: boolean; label?: string; weight?: number; class?: string } & Record<string, unknown> = $props();

	const list = $derived.by(() => {
		const random = rng(hash(seed) + 11);
		const accent = Math.floor(rings / 2) + Math.floor(random() * 3) - 1;
		const step = 92 / rings;
		return arcs(random, {
			cx: 100,
			cy: 100,
			radii: Array.from({ length: rings }, (_, i) => 8 + i * step),
			accent,
			accentGap: 0.38,
			gap: [0.05, 0.28]
		});
	});
</script>

<svg
	viewBox="0 0 200 200"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	class={cn('inline-ring inline-block shrink-0 align-middle', spin && 'spin motion-reduce:animate-none', className)}
	{...rest}
>
	{#if solid}<circle cx="100" cy="100" r="99" fill="var(--pa, var(--primary))" />{/if}
	{#each list as arc (arc.r)}
		<circle
			cx="100"
			cy="100"
			r={arc.r}
			fill="none"
			stroke={arc.accent ? (solid ? 'var(--background)' : 'var(--pa, var(--primary))') : solid ? 'color-mix(in oklab, var(--background) 45%, transparent)' : 'color-mix(in oklab, var(--foreground) 34%, transparent)'}
			stroke-width={(arc.accent ? 5 : 2) * weight}
			stroke-linecap="round"
			stroke-dasharray={arc.dash}
			transform={`rotate(${arc.rotate} 100 100)`}
		/>
		{#if arc.end}<circle cx={arc.end[0]} cy={arc.end[1]} r={7 * Math.min(weight, 2)} fill={solid ? 'var(--background)' : 'var(--pa, var(--primary))'} />{/if}
	{/each}
</svg>

<style>
	.spin {
		animation: ring-spin 48s linear infinite;
	}
	@keyframes ring-spin {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.spin {
			animation: none;
		}
	}
</style>
