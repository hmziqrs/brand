<script lang="ts">
	import { cn } from '$brand/utils.js';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import Minus from '@lucide/svelte/icons/minus';
	import { compare, plans } from './content';

	let { class: className }: { class?: string } = $props();

	let col = $state(2);
	let hover = $state(-1);
	const names = plans.map((p) => p.name);
</script>

<section data-slot="compare-table" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<div class="mb-4 flex gap-1 rounded-xl bg-foreground/[0.05] p-1 md:hidden" role="radiogroup" aria-label="Plan to compare">
		{#each names as n, i (n)}
			<button type="button" role="radio" aria-checked={col === i} onclick={() => (col = i)} class={cn('flex-1 rounded-lg py-2 text-sm', col === i ? 'bg-primary text-primary-foreground' : 'text-foreground')}>{n}</button>
		{/each}
	</div>
	<div class="sticky top-16 z-10 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] border-b border-border bg-background/90 py-4 backdrop-blur-xl md:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
		<p class="text-2xl font-medium tracking-[-0.02em] text-foreground">Features</p>
		{#each names as n, i (n)}
			<p class={cn('text-2xl font-medium tracking-[-0.02em] md:block', col === i ? 'block' : 'hidden', i === 2 || hover === i ? 'text-primary' : 'text-foreground')}>{n}</p>
		{/each}
	</div>
	{#each compare as g (g.title)}
		<h3 class="mt-12 mb-3 text-xl font-medium text-foreground">{g.title}</h3>
		<div role="table" aria-label={g.title}>
			{#each g.rows as row (row[0])}
				<div role="row" class="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center border-b border-border/70 text-[15px] md:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
					<span role="rowheader" class="py-3 pr-4 text-foreground">{row[0]}</span>
					{#each [row[1], row[2], row[3], row[4]] as cell, i (i)}
						<span
							role="cell"
							tabindex="-1"
							onpointerenter={() => (hover = i)}
							onpointerleave={() => (hover = -1)}
							class={cn('h-full items-center gap-2 py-3 pl-3 text-foreground md:flex', col === i ? 'flex' : 'hidden', (hover === i || (hover === -1 && i === 2)) && 'bg-primary/[0.07]')}
						>
							{#if cell === true}
								<CircleCheck class="lucide size-4 text-primary" /><span class="sr-only">Included</span>
							{:else if cell === false}
								<Minus class="lucide size-4 text-foreground/35" /><span class="sr-only">Not included</span>
							{:else}
								<CircleCheck class="lucide size-4 text-primary" />{cell}
							{/if}
						</span>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
	<p class="mt-8 text-sm text-foreground/85">* Uses agent credits. Every plan includes a monthly allowance.</p>
</section>
