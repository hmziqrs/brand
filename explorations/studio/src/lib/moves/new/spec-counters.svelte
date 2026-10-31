<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		items,
		variant = 'band',
		kicker,
		class: className
	}: {
		items: { value: string; unit?: string; label: string; note?: string }[];
		variant?: 'band' | 'invert' | 'plain';
		kicker?: string;
		class?: string;
	} = $props();
</script>

<section class={cn(variant === 'band' && 'bg-band', variant === 'invert' && 'invert-band', 'border-y border-border', className)}>
	<div class="mx-auto max-w-[1320px] px-4 sm:px-8">
		{#if kicker}<p class="border-b border-current/15 py-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] opacity-70">{kicker}</p>{/if}
		<div class={cn('grid grid-cols-1', items.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
			{#each items as it, i (it.label)}
				<div class={cn('flex flex-col gap-3 border-current/15 py-9 lg:py-12', i > 0 && 'border-t lg:border-t-0 lg:border-l lg:pl-8')}>
					<p class="flex items-baseline gap-2 leading-none">
						<span class="text-[clamp(3.5rem,7vw,6.5rem)] font-medium tracking-[-0.05em] tabular-nums">{it.value}</span>
						{#if it.unit}<span class="font-mono text-sm uppercase tracking-widest text-primary">{it.unit}</span>{/if}
					</p>
					<p class="max-w-[22ch] text-lg leading-snug">{it.label}</p>
					{#if it.note}<p class="font-mono text-xs uppercase tracking-wider opacity-60">{it.note}</p>{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.invert-band {
		background: var(--foreground);
		color: var(--background);
		--border: color-mix(in oklab, var(--background) 18%, transparent);
	}
	:global(:root:not(.dark)) .invert-band.invert-band :global(.text-primary) {
		color: oklch(from var(--pa, var(--primary)) 0.8 c h);
	}
	:global(.dark) .invert-band :global(.text-primary) {
		color: oklch(from var(--pa, var(--primary)) 0.5 c h);
	}
</style>
