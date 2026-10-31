<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { cn } from '$brand/utils.js';
	import InlineRing from './inline-ring.svelte';

	type Plan = { name: string; price: string; per?: string; blurb: string; features: string[]; cta: string; pick?: boolean };

	let { plans, seed = 'plans', class: className }: { plans: Plan[]; seed?: string; class?: string } = $props();
</script>

<div class={cn('grid gap-4', plans.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3', className)}>
	{#each plans as plan (plan.name)}
		<article class={cn('relative isolate flex flex-col overflow-hidden rounded-2xl p-7 sm:p-8', plan.pick ? 'pick' : 'border border-border bg-card')}>
			{#if plan.pick}
				<InlineRing seed={`${seed}-${plan.name}`} rings={10} class="pick-ring pointer-events-none absolute -top-28 -right-28 -z-10 size-80" />
			{/if}
			<header class="flex items-center justify-between gap-3">
				<h3 class="font-mono text-xs uppercase tracking-[0.2em]">{plan.name}</h3>
				{#if plan.pick}<span class="tag-on-pick rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest">Most pick this</span>{/if}
			</header>
			<p class="mt-8 flex items-baseline gap-2">
				<span class="text-[4.5rem] leading-none font-medium tracking-[-0.05em] tabular-nums">{plan.price}</span>
				{#if plan.per}<span class={cn('text-sm', plan.pick ? 'opacity-75' : 'text-muted-foreground')}>{plan.per}</span>{/if}
			</p>
			<p class="mt-4 text-lg leading-snug">{plan.blurb}</p>
			<ul class="mt-7 flex flex-1 flex-col gap-2.5 text-[0.95rem]">
				{#each plan.features as f (f)}
					<li class="flex gap-2.5"><Check class={cn('lucide mt-0.5 size-4 shrink-0', plan.pick ? '' : 'text-primary')} />{f}</li>
				{/each}
			</ul>
			<a href="#/p/new/{seed}" class={cn('mt-8 inline-flex h-11 items-center justify-center rounded-lg text-sm font-medium', plan.pick ? 'cta-on-pick' : 'border border-border')}>{plan.cta}</a>
		</article>
	{/each}
</div>

<style>
	.pick {
		background: var(--pa-fill, var(--primary));
		color: var(--on-pa, var(--primary-foreground));
	}
	.pick :global(.pick-ring) {
		--pa: var(--on-pa, var(--primary-foreground));
		--foreground: var(--on-pa, var(--primary-foreground));
		opacity: 0.5;
	}
	.tag-on-pick {
		background: var(--on-pa, var(--primary-foreground));
		color: var(--pa-fill, var(--primary));
	}
	.cta-on-pick {
		background: var(--on-pa, var(--primary-foreground));
		color: var(--pa-fill, var(--primary));
	}
</style>
