<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import SpotMini from './spot-mini.svelte';

	type Cell = boolean | string;
	type Tier = { name: string; price: string; unit?: string; cta: string; href: string; kind: 'cube' | 'stack' | 'branch' | 'lock'; hot?: boolean };
	let {
		plans,
		groups,
		top = 0,
		class: className
	}: { plans: readonly Tier[]; groups: { name: string; rows: [string, ...Cell[]][] }[]; top?: number; class?: string } = $props();

	let only = $state(false);
	const differs = (cells: Cell[]) => new Set(cells.map(String)).size > 1;
	const cols = $derived(`minmax(200px,1.3fr) repeat(${plans.length}, minmax(130px,1fr))`);
</script>

<div class={cn('w-full', className)}>
	<div class="mb-8 flex flex-wrap items-end justify-between gap-4">
		<h2 class="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">Compare every plan</h2>
		<label class="inline-flex cursor-pointer items-center gap-3 border border-border px-4 py-2.5 text-[15px] text-foreground has-checked:border-foreground">
			<input type="checkbox" bind:checked={only} class="size-4 accent-[var(--orange)]" />Only show differences
		</label>
	</div>
	<div class="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:overflow-visible">
		<div role="table" aria-label="Plan comparison" class="min-w-[760px] text-[15px] text-foreground">
			<div role="rowgroup" class="sticky z-20 bg-background pt-3 pb-3" style:top="{top}px">
				<div role="row" class="grid gap-3" style:grid-template-columns={cols}>
					<div role="columnheader" class="flex items-end pb-2 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">Feature</div>
					{#each plans as p (p.name)}
						<div role="columnheader" class={cn('relative flex flex-col overflow-hidden border p-4', p.hot ? 'border-[var(--orange)] bg-[var(--orange)] text-[var(--on-orange)]' : 'border-border bg-background')}>
							{#if p.hot}<span aria-hidden="true" class="absolute top-4 right-4 size-3 bg-[var(--on-orange)]"></span>{:else}<SpotMini kind={p.kind} class="pointer-events-none absolute top-2 right-2 w-[60px]" />{/if}
							<span class="relative font-mono text-[11px] tracking-[0.14em] uppercase">{p.hot ? 'Most teams' : 'Plan'}</span>
							<span class="relative mt-1 text-xl font-semibold tracking-tight">{p.name}</span>
							<span class="relative mt-3 flex items-baseline gap-1.5"><span class="text-2xl font-semibold tracking-tight tabular-nums">{p.price}</span>{#if p.unit}<span class="font-mono text-[11px] opacity-75">{p.unit}</span>{/if}</span>
							<a href={p.href} class={cn('relative mt-4 inline-flex h-9 items-center justify-center border px-3 text-[13px] font-medium transition-colors', p.hot ? 'border-[var(--on-orange)] bg-[var(--on-orange)] text-[var(--orange)] hover:opacity-85' : 'border-foreground hover:bg-foreground hover:text-background')}>{p.cta}</a>
						</div>
					{/each}
				</div>
			</div>
			{#each groups as g (g.name)}
				<div role="rowgroup" class="mt-8">
					<div role="row" class="border-b border-foreground pb-3 font-mono text-xs tracking-[0.14em] uppercase"><span role="rowheader"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>{g.name}</span></div>
					{#each g.rows as [label, ...cells] (label)}
						{#if !only || differs(cells)}
							<div role="row" class="grid gap-3 border-b border-border transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)]" style:grid-template-columns={cols}>
								<span role="rowheader" class="py-3.5 pr-2">{label}</span>
								{#each cells as c, i (i)}
									<span role="cell" class={cn('flex items-center px-4 py-3.5', plans[i]?.hot && 'bg-[color-mix(in_oklab,var(--orange)_9%,transparent)]')}>
										{#if c === true}<Check class="lucide size-4" aria-label="Included" />
										{:else if c === false}<Minus class="lucide size-4 opacity-40" aria-label="Not included" />
										{:else}<span class="font-mono text-[13px]">{c}</span>{/if}
									</span>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
