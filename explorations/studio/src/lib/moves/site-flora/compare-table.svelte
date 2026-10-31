<script lang="ts" module>
	export type Cell = boolean | string;
	export type Group = { title: string; rows: [string, ...Cell[]][] };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';

	let {
		columns,
		groups,
		star = -1,
		class: className
	}: {
		columns: { name: string; price: string }[];
		groups: Group[];
		star?: number;
		class?: string;
	} = $props();

	let hot = $state(-1);
</script>

<div class={cn('overflow-x-auto', className)}>
	<table class="w-full min-w-[640px] border-collapse text-left text-[14px] text-foreground">
		<thead class="sticky top-16 z-10 bg-background">
			<tr class="border-b border-border">
				<th class="py-4 pr-4 font-medium">Features</th>
				{#each columns as c, i (c.name)}
					<th class={cn('w-[14%] px-2 py-4 text-center font-medium', i === star && 'text-primary')}>
						{c.name}<span class="block font-mono text-[11px] font-normal text-muted-foreground">{c.price}</span>
					</th>
				{/each}
			</tr>
		</thead>
		{#each groups as g (g.title)}
			<tbody>
				<tr><th colspan={columns.length + 1} class="pt-8 pb-3 font-mono text-[11px] font-normal tracking-[0.16em] text-primary uppercase">{g.title}</th></tr>
				{#each g.rows as [label, ...cells] (label)}
					<tr class="border-b border-border transition-colors hover:bg-foreground/4">
						<td class="py-3 pr-4">{label}</td>
						{#each cells as v, i (i)}
							<td class={cn('px-2 py-3 text-center', i === star && 'bg-primary/8')} onpointerenter={() => (hot = i)} onpointerleave={() => (hot = -1)}>
								{#if v === true}<Check class={cn('lucide mx-auto size-4', i === star || hot === i ? 'text-primary' : 'text-foreground')} aria-label="Included" />
								{:else if v === false}<Minus class="lucide mx-auto size-4 text-muted-foreground" aria-label="Not included" />
								{:else}<span class="text-[13px]">{v}</span>{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		{/each}
	</table>
</div>
