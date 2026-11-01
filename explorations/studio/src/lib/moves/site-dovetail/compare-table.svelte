<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import Info from '@lucide/svelte/icons/info';
	import { cn } from '$brand/utils.js';

	type Cell = boolean | string;
	type Row = { name: string; hint: string; v: Cell[] };
	type Group = { title: string; lede?: string; badges?: string[]; rows: Row[] };
	type Plan = { name: string; price: string; cta: string; href: string };

	let { groups, plans, hot = plans.length - 1, class: className }: { groups: Group[]; plans: Plan[]; hot?: number; class?: string } = $props();

	let col = $state(0);
	$effect.pre(() => {
		col = hot;
	});
	const cols = $derived(`minmax(0,1.5fr) repeat(${plans.length}, minmax(0,1fr))`);
</script>

{#snippet cell(v: Cell, on: boolean)}
	{#if v === true}
		<span class={cn('grid size-6 place-items-center rounded-full', on ? 'bg-[var(--on-orange)] text-white' : 'bg-orange text-[var(--on-orange)]')}><Check class="lucide size-3.5" /></span><span class="sr-only">Included</span>
	{:else if v === false}
		<Minus class="lucide size-4 opacity-30" /><span class="sr-only">Not included</span>
	{:else}
		<span class="text-[0.98rem] font-medium">{v}</span>
	{/if}
{/snippet}

<section class={cn('w-full px-4 sm:px-6 lg:px-10', className)}>
	<div class="mb-4 flex gap-1 rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] p-1 md:hidden" role="radiogroup" aria-label="Plan to compare">
		{#each plans as p, i (p.name)}
			<button type="button" role="radio" aria-checked={col === i} onclick={() => (col = i)} class={cn('flex-1 rounded-full py-2 text-[0.9rem]', col === i ? 'bg-foreground text-background' : 'text-foreground')}>{p.name}</button>
		{/each}
	</div>

	<div class="sticky top-16 z-20 grid items-end bg-background pt-4 [grid-template-columns:minmax(0,1.3fr)_minmax(0,1fr)] md:[grid-template-columns:var(--cols)]" style:--cols={cols}>
		<div class="pr-4 pb-4">
			<p class="text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none font-medium tracking-[-0.035em] text-foreground">Compare plans</p>
		</div>
		{#each plans as p, i (p.name)}
			<div class={cn('flex-col gap-3 rounded-t-2xl px-3 pt-4 pb-4 sm:px-4 md:flex', col === i ? 'flex' : 'hidden', i === hot ? 'band-orange' : 'text-foreground')}>
				<div>
					<p class="text-[1.3rem] leading-none font-medium tracking-[-0.025em]">{p.name}</p>
					<p class="mt-1.5 font-mono text-[0.66rem] tracking-[0.1em] uppercase opacity-80">{p.price}</p>
				</div>
				<a href={p.href} class={cn('inline-flex h-9 items-center justify-center rounded-md px-3 text-[0.85rem] font-medium transition-colors', i === hot ? 'bg-[var(--on-orange)] text-white hover:opacity-90' : 'border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]')}>{p.cta}</a>
			</div>
		{/each}
		<span class="col-span-full h-px bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]"></span>
	</div>

	{#each groups as g, gi (g.title)}
		<div class="grid [grid-template-columns:minmax(0,1.3fr)_minmax(0,1fr)] md:[grid-template-columns:var(--cols)]" style:--cols={cols}>
			<div class="col-span-full flex flex-wrap items-end justify-between gap-4 pt-14 pb-5 md:col-span-1 md:block">
				<h3 class="text-[1.45rem] leading-tight font-medium tracking-[-0.025em] text-foreground">{g.title}</h3>
				{#if g.lede}<p class="mt-2 max-w-[24rem] text-[1rem] leading-snug text-foreground">{g.lede}</p>{/if}
				{#if g.badges}
					<div class="mt-4 flex flex-wrap gap-1.5">
						{#each g.badges as b (b)}<span class="rounded-full border border-[color-mix(in_oklab,var(--foreground)_22%,transparent)] px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.1em] text-foreground uppercase">{b}</span>{/each}
					</div>
				{/if}
			</div>
			{#each plans as p, i (p.name)}
				<div aria-hidden="true" class={cn('hidden md:block', i === hot && 'bg-[color-mix(in_oklab,var(--orange)_9%,transparent)]', i === hot && gi === 0 && '')}></div>
			{/each}
		</div>
		<div role="table" aria-label={g.title}>
			{#each g.rows as r (r.name)}
				<div role="row" class="group grid [grid-template-columns:minmax(0,1.3fr)_minmax(0,1fr)] md:[grid-template-columns:var(--cols)]" style:--cols={cols}>
					<span role="rowheader" class="relative flex items-center gap-2 border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] py-3.5 pr-3 text-[1rem] text-foreground">
						{r.name}
						<span class="relative inline-flex">
							<Info class="lucide size-3.5 opacity-40 transition-opacity group-hover:opacity-90" />
							<span role="tooltip" class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden w-60 -translate-x-1/2 rounded-lg bg-foreground p-3 text-[0.82rem] leading-snug text-background shadow-lg group-hover:block">{r.hint}</span>
						</span>
					</span>
					{#each r.v as v, i (i)}
						<span role="cell" class={cn('items-center justify-start border-t px-3 py-3.5 sm:px-4 md:flex', col === i ? 'flex' : 'hidden', i === hot ? 'border-[color-mix(in_oklab,var(--orange)_22%,transparent)] bg-[color-mix(in_oklab,var(--orange)_9%,transparent)] text-foreground' : 'border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] text-foreground')}>
							{@render cell(v, false)}
						</span>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
	<div class="grid [grid-template-columns:minmax(0,1.3fr)_minmax(0,1fr)] md:[grid-template-columns:var(--cols)]" style:--cols={cols}>
		<span class="border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)]"></span>
		{#each plans as p, i (p.name)}
			<span class={cn('h-6 border-t md:block', col === i ? 'block' : 'hidden', i === hot ? 'rounded-b-2xl border-[color-mix(in_oklab,var(--orange)_22%,transparent)] bg-[color-mix(in_oklab,var(--orange)_9%,transparent)]' : 'border-[color-mix(in_oklab,var(--foreground)_10%,transparent)]')}></span>
		{/each}
	</div>
</section>
