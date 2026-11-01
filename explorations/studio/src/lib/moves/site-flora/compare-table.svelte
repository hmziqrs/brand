<script lang="ts" module>
	export type Cell = boolean | string;
	export type Group = { title: string; rows: [string, ...Cell[]][] };
	export type Column = { name: string; price: string; unit?: string; line?: string; cta?: string; href?: string; preset?: string };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';

	let {
		columns,
		groups,
		star = -1,
		top = 64,
		class: className
	}: {
		columns: Column[];
		groups: Group[];
		star?: number;
		top?: number;
		class?: string;
	} = $props();

	let pick = $state(Math.max(0, star));
	let only = $state(false);
	let hot = $state(-1);
	const differs = (cells: Cell[]) => new Set(cells.map(String)).size > 1;
	const cols = $derived(`minmax(0,1.5fr) repeat(${columns.length}, minmax(0,1fr))`);
	const show = (i: number) => (i === pick ? '' : 'max-md:hidden');
</script>

<div data-slot="flora-compare" class={cn('text-foreground', className)}>
	<div class="mb-6 flex flex-wrap items-center justify-between gap-3">
		<div class="flex gap-1 rounded-full border p-1 md:hidden" role="group" aria-label="Plan to compare">
			{#each columns as c, i (c.name)}
				<button type="button" aria-pressed={pick === i} onclick={() => (pick = i)} class="h-8 rounded-full px-3 text-[13px] font-medium text-muted-foreground aria-pressed:bg-foreground aria-pressed:text-background">{c.name}</button>
			{/each}
		</div>
		<label class="ml-auto inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 text-[14px] has-checked:border-primary">
			<input type="checkbox" bind:checked={only} class="size-4 accent-[var(--primary)]" />Only differences
		</label>
	</div>

	<div role="table" aria-label="Plan comparison" class="text-[15px]">
		<div role="rowgroup" class="sticky z-20 -mx-2 bg-background px-2 pt-3 pb-3" style:top="{top}px">
			<div role="row" class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-2 md:grid-cols-(--cols) md:gap-3" style:--cols={cols}>
				<div role="columnheader" class="flex flex-col justify-end pb-2">
					<span class="text-[13px] text-muted-foreground">Plans</span>
					<span class="text-[15px] font-medium">{only ? 'Showing differences' : 'Everything, side by side'}</span>
				</div>
				{#each columns as c, i (c.name)}
					<div role="columnheader" class={cn('group/t relative isolate flex flex-col overflow-hidden rounded-2xl border p-3.5 sm:p-4', show(i), i === star ? 'border-primary bg-primary text-primary-foreground' : 'bg-card')}>
						{#if c.preset && i !== star}
							<div class="relative -mx-4 -mt-4 mb-3 h-9 overflow-hidden max-sm:-mx-3.5 max-sm:-mt-3.5" aria-hidden="true">
								<ShaderMaterial preset={c.preset} rendering="image" controls={false} sizes="240px" class="absolute inset-0 h-full w-full transition-transform duration-700 group-hover/t:scale-110 motion-reduce:transition-none" />
							</div>
						{/if}
						{#if i === star}<div class="-mx-4 -mt-4 mb-3 flex h-9 items-center border-b border-primary-foreground/20 px-4 text-[12px] font-medium max-sm:-mx-3.5 max-sm:-mt-3.5 max-sm:px-3.5"><span class="mr-2 size-1.5 rounded-full bg-primary-foreground"></span>Most popular</div>{/if}
						<span class="text-[17px] font-medium tracking-[-0.01em]">{c.name}</span>
						<span class="mt-1 flex items-baseline gap-1"><span class="text-[clamp(22px,2.2vw,30px)] leading-none font-medium tracking-[-0.03em] tabular-nums">{c.price}</span>{#if c.unit}<span class={cn('text-[12px]', i === star ? 'opacity-80' : 'text-muted-foreground')}>{c.unit}</span>{/if}</span>
						{#if c.line}<span class={cn('mt-2 hidden text-[13px] leading-snug lg:block', i === star ? 'opacity-90' : 'text-foreground/75')}>{c.line}</span>{/if}
						{#if c.cta && c.href}
							<a href={c.href} class={cn('mt-3 inline-flex h-9 items-center justify-center rounded-full px-3 text-[13px] font-medium transition-colors', i === star ? 'bg-background text-foreground hover:opacity-90' : 'border hover:border-foreground hover:bg-foreground hover:text-background')}>{c.cta}</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		{#each groups as g (g.title)}
			{@const rows = g.rows.filter(([, ...cells]) => !only || differs(cells))}
			{#if rows.length}
				<div role="rowgroup" class="mt-8">
					<div role="row" class="flex items-center gap-2.5 pb-3 text-[13px] font-medium tracking-[0.02em]"><span role="rowheader" class="inline-flex items-center gap-2.5"><span class="size-2 rounded-full bg-primary"></span>{g.title}<span class="text-muted-foreground">{rows.length}</span></span></div>
					{#each rows as [label, ...cells] (label)}
						<div role="row" class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-2 border-t transition-colors hover:bg-foreground/[0.03] md:grid-cols-(--cols) md:gap-3" style:--cols={cols}>
							<span role="rowheader" class="py-3.5 pr-2">{label}</span>
							{#each cells as v, i (i)}
								<span role="cell" class={cn('flex items-center justify-center px-2 py-3.5 text-center', show(i), i === star && 'bg-primary/8')} onpointerenter={() => (hot = i)} onpointerleave={() => (hot = -1)}>
									{#if v === true}<Check class={cn('lucide size-4', i === star || hot === i ? 'text-primary' : 'text-foreground')} aria-label="Included" />
									{:else if v === false}<Minus class="lucide size-4 text-muted-foreground/60" aria-label="Not included" />
									{:else}<span class="text-[13.5px]">{v}</span>{/if}
								</span>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

