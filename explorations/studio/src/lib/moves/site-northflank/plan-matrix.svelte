<script lang="ts" module>
	export type MatrixGroup = { group: string; rows: { name: string; line: string; cells: (string | boolean)[] }[] };
</script>

<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';

	let {
		plans,
		groups,
		hot = 1,
		fold = 2,
		class: className
	}: { plans: { name: string; sub: string; cta: string; href: string }[]; groups: MatrixGroup[]; hot?: number; fold?: number; class?: string } = $props();
	let open = $state(false);
	const shown = $derived(open ? groups : groups.slice(0, fold));
	const grid = 'grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]';
</script>

<div data-slot="plan-matrix" class={cn('relative', className)}>
	<div class="{grid} sticky top-16 z-10 border-b bg-background/90 backdrop-blur">
		<span></span>
		{#each plans as p, n (p.name)}
			<div class={cn('px-2 py-4 text-center', n === hot && 'border-t-2 border-orange bg-orange/[0.06]')}>
				<p class="text-[15px] font-medium text-foreground sm:text-[17px]">{p.name}</p>
				<p class="hidden text-[12.5px] text-muted-foreground sm:block">{p.sub}</p>
				<a href={p.href} class="mt-1 inline-flex items-center gap-1 font-mono text-[11.5px] text-orange hover:underline">{p.cta}<ArrowRight class="lucide size-3" /></a>
			</div>
		{/each}
	</div>
	{#each shown as g (g.group)}
		<p class="mt-8 border-b pb-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">{g.group}</p>
		{#each g.rows as r (r.name)}
			<div class="{grid} items-center border-b">
				<div class="py-3 pr-3">
					<p class="text-[14.5px] text-foreground">{r.name}</p>
					<p class="hidden text-[12.5px] text-muted-foreground sm:block">{r.line}</p>
				</div>
				{#each r.cells as c, n (n)}
					<div class={cn('flex h-full items-center justify-center px-2 py-3 text-center text-[13.5px] text-foreground/85', n === hot && 'bg-orange/[0.06]')}>
						{#if c === true}<Check class="lucide size-4 text-orange" />{:else if c === false}<Minus class="lucide size-4 text-muted-foreground/60" />{:else}{c}{/if}
					</div>
				{/each}
			</div>
		{/each}
	{/each}
	{#if groups.length > fold}
		<button type="button" class="mx-auto mt-6 block rounded-md border px-4 py-2 font-mono text-[12px] text-foreground hover:bg-foreground/5" onclick={() => (open = !open)}>{open ? 'Show fewer features' : `Show all ${groups.reduce((a, g) => a + g.rows.length, 0)} features`}</button>
	{/if}
</div>
