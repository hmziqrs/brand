<script lang="ts">
	import { arcs, hash, rng } from '@hmziq/brand-core/motion/rings';
	import { cn } from '$brand/utils.js';

	let {
		seed,
		color = 'var(--primary)',
		count = 6,
		weight = 1,
		filled = false,
		spin = false,
		label,
		class: className
	}: {
		seed: string;
		color?: string;
		count?: number;
		weight?: number;
		filled?: boolean;
		spin?: boolean;
		label?: string;
		class?: string;
	} = $props();

	const list = $derived.by(() => {
		const r = rng(hash(seed) + 41);
		const step = 44 / count;
		return arcs(r, {
			cx: 50,
			cy: 50,
			radii: Array.from({ length: count }, (_, i) => 6 + i * step),
			accent: Math.min(count - 1, 1 + (hash(seed) % Math.max(1, count - 2))),
			accentGap: 0.45,
			gap: [0.08, 0.34]
		});
	});
</script>

<svg
	viewBox="0 0 100 100"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	class={cn('fp shrink-0 overflow-visible', spin && 'spin', className)}
>
	{#if filled}<circle cx="50" cy="50" r="3.2" fill={color} />{/if}
	{#each list as a (a.r)}
		<g class={a.accent ? 'accent' : undefined}>
			<circle
				cx="50"
				cy="50"
				r={a.r}
				fill="none"
				stroke={a.accent ? color : 'var(--line)'}
				stroke-width={1.3 * weight}
				stroke-linecap="round"
				stroke-dasharray={a.dash}
				transform={`rotate(${a.rotate} 50 50)`}
			/>
			{#if a.end}<circle cx={a.end[0]} cy={a.end[1]} r={3 * weight} fill={color} />{/if}
		</g>
	{/each}
</svg>

<style>
	.fp .accent {
		transform-box: view-box;
		transform-origin: 50% 50%;
	}
	.spin .accent {
		transition: rotate 900ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	:global(.group:hover) .spin .accent,
	:global(.group:focus-visible) .spin .accent {
		rotate: 120deg;
	}
	@media (prefers-reduced-motion: reduce) {
		.spin .accent {
			transition: none;
		}
		:global(.group:hover) .spin .accent {
			rotate: 0deg;
		}
	}
</style>
