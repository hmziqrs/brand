<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';

	type Row = { name: string; hint: string; v: (string | boolean)[] };
	type Group = { title: string; intro?: string; rows: Row[] };
	type Plan = { name: string; price: string; cta: string; href: string };
	let {
		plans = [
			{ name: 'Basic', price: '$10 / mo', cta: 'Start', href: '#/p/site-framer/home' },
			{ name: 'Pro', price: '$30 / mo', cta: 'Start', href: '#/p/site-framer/home' },
			{ name: 'Enterprise', price: 'Custom', cta: 'Talk to us', href: '#/p/site-framer/enterprise' }
		],
		groups,
		hot = 1,
		class: className
	}: { plans?: Plan[]; groups: Group[]; hot?: number; class?: string } = $props();

	let only = $state(1);
	const cols = 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]';
	const show = (i: number) => (i === only ? '' : 'max-md:hidden');
</script>

<div class={cn('min-w-0', className)}>
	<div class="mb-4 flex gap-1 rounded-full border border-border bg-card p-1 md:hidden" role="tablist" aria-label="Plan to compare">
		{#each plans as p, i (p.name)}
			<button type="button" role="tab" aria-selected={only === i} onclick={() => (only = i)} class={cn('flex-1 rounded-full py-2 text-sm', only === i ? 'bg-foreground text-background' : '')}>{p.name}</button>
		{/each}
	</div>
	<div class={cn('sticky top-16 z-10 grid gap-3 bg-background/90 py-4 backdrop-blur-xl', cols)}>
		<span class="self-end pb-1 font-mono text-[0.6875rem] tracking-[0.14em] text-foreground/70 uppercase">Plan</span>
		{#each plans as p, i (p.name)}
			<div class={cn('flex flex-col gap-3 rounded-2xl border p-4', i === hot ? 'band-orange border-transparent' : 'border-border bg-card', show(i))}>
				<span class="flex items-baseline justify-between gap-2"><span class="text-lg font-semibold tracking-[-0.02em]">{p.name}</span><span class="text-sm tabular-nums">{p.price}</span></span>
				<a href={p.href} class={cn('rounded-full py-2 text-center text-sm font-medium transition-opacity hover:opacity-85', i === hot ? 'bg-(--on-orange) text-(--orange)' : 'bg-foreground text-background')}>{p.cta}</a>
			</div>
		{/each}
	</div>
	{#each groups as g (g.title)}
		<section class="pt-16">
			<div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-foreground pb-4">
				<h3 class="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.035em]">{g.title}</h3>
				{#if g.intro}<p class="text-lg text-foreground">{g.intro}</p>{/if}
			</div>
			{#each g.rows as r (r.name)}
				<div class={cn('relative isolate grid items-center gap-3 border-b border-border py-5', cols)}>
					<div class="pr-3">
						<p class="text-lg font-medium tracking-[-0.01em]">{r.name}</p>
						<p class="mt-0.5 text-[0.9375rem] leading-snug text-foreground/70">{r.hint}</p>
					</div>
					{#each r.v as v, i (i)}
						<div class={cn('relative px-4 text-[1.0625rem] tabular-nums', show(i), i === hot && 'before:absolute before:inset-x-0 before:-inset-y-5 before:-z-10 before:bg-primary/[0.07]')}>
							{#if v === true}<span class="inline-grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check class="lucide size-3.5" /></span>{:else if v === false}<Minus class="lucide inline size-4 text-foreground/35" /><span class="sr-only">Not included</span>{:else}{v}{/if}
						</div>
					{/each}
				</div>
			{/each}
		</section>
	{/each}
</div>
