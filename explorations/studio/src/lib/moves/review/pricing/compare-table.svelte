<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import { cn } from '$brand/utils.js';
	import { Switch } from '$brand/ui/switch/index.js';
	import Segmented from '$brand/components/segmented.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import type { Cell, Pricing } from './content';

	let { content, alt = false, href = '#', class: className }: { content: Pricing; alt?: boolean; href?: string; class?: string } = $props();

	const tiers = $derived(content.tiers);
	const pick = $derived(Math.max(0, tiers.findIndex((t) => t.pick)));
	const at = $derived(alt ? 1 : 0);
	const uid = $props.id();

	let only = $state(false);
	let chosen = $state<number | null>(null);
	let hover = $state(-1);

	const col = $derived(chosen ?? pick);
	const differs = (cells: Cell[]) => new Set(cells.map(String)).size > 1;
	const cols = $derived(`minmax(0,1.45fr) repeat(${tiers.length}, minmax(0,1fr))`);
	const over = (e: PointerEvent) => {
		const cell = (e.target as HTMLElement).closest<HTMLElement>('[data-col]');
		hover = cell ? Number(cell.dataset.col) : -1;
	};
	const lit = (i: number) => (hover === -1 ? i === pick : i === hover);
</script>

<section data-slot="compare-table" class={className}>
	<SectionHead kicker="Compare" title={content.compare.title} accent={content.compare.accent} lede={content.compare.lede}>
		{#snippet aside()}
			<label for={`${uid}-only`} class="inline-flex cursor-pointer items-center gap-3 text-[0.95rem] text-foreground">
				<Switch id={`${uid}-only`} bind:checked={only} />
				Only show differences
			</label>
		{/snippet}
	</SectionHead>

	<div role="table" aria-label={content.compare.title} class="mt-10 text-[0.9375rem] md:mt-14" style:--cols={cols} onpointerover={over} onpointerleave={() => (hover = -1)}>
		<div role="rowgroup" class="sticky z-20 -mx-1 bg-background px-1 pt-3 pb-3 shadow-[0_1px_0_var(--border)]" style:top="var(--pricing-top, 0px)">
			<Segmented
				label="Plan to compare"
				class="mb-3 w-full md:hidden [&>button]:flex-1"
				value={String(col)}
				onValueChange={(v) => (chosen = Number(v))}
				options={tiers.map((t, i) => ({ value: String(i), label: t.tab }))}
			/>
			<div role="row" class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-x-2 md:grid-cols-(--cols) md:gap-x-3">
				<div role="columnheader" class="hidden items-end pb-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase md:flex">{content.compare.corner}</div>
				{#each tiers as t, i (t.name)}
					<div
						role="columnheader"
						class={cn('col-span-2 min-w-0 items-center gap-x-3 rounded-xl p-3 sm:p-3.5 md:col-span-1 md:flex md:flex-col md:items-stretch', i === col ? 'flex' : 'hidden', t.pick ? 'band-orange' : 'ring-1 ring-foreground/10')}
					>
						<div class="min-w-0 flex-1 md:flex-none">
							<span class="block truncate text-[0.95rem] font-medium">{t.name}</span>
							<span class="mt-1.5 flex min-w-0 items-baseline gap-2 md:block">
								<span class="text-2xl leading-none font-medium tracking-[-0.03em] tabular-nums">{t.amount[at]}</span>
								<span class="truncate text-xs text-muted-foreground md:mt-1 md:block">{t.short[at]}</span>
							</span>
						</div>
						<ButtonLink {href} size="sm" variant={t.pick ? 'default' : 'outline'} class="shrink-0 md:mt-3 md:w-full">{t.act}</ButtonLink>
					</div>
				{/each}
			</div>
		</div>

		{#each content.compare.groups as g (g.name)}
			{@const rows = g.rows.filter(([, ...cells]) => !only || differs(cells))}
			{#if rows.length}
				<div role="rowgroup" class="mt-10">
					<div role="row" class="flex items-center gap-2.5 border-b border-foreground/70 pb-3 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">
						<span role="rowheader" class="flex items-center gap-2.5"><span aria-hidden="true" class="size-2 bg-primary"></span>{g.name}</span>
					</div>
					{#each rows as [label, ...cells] (label)}
						<div role="row" class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-x-2 border-b border-border md:grid-cols-(--cols) md:gap-x-3">
							<span role="rowheader" class="py-3.5 pr-2 leading-snug text-foreground">{label}</span>
							{#each cells as c, i (i)}
								<span
									role="cell"
									data-col={i}
									class={cn('min-w-0 items-center gap-2 px-3 py-3.5 leading-snug sm:px-3.5 transition-colors duration-150 motion-reduce:transition-none md:flex', i === col ? 'flex' : 'hidden', lit(i) && 'bg-primary/7')}
								>
									{#if c === true}
										<Check class="lucide size-4 shrink-0 text-primary" /><span class="sr-only">Included</span>
									{:else if c === false}
										<Minus class="lucide size-4 shrink-0 text-foreground/30" /><span class="sr-only">Not included</span>
									{:else}
										<span class="text-foreground">{c}</span>
									{/if}
								</span>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		{/each}
		<p class="mt-6 text-sm text-muted-foreground">{content.compare.foot}</p>
	</div>
</section>
