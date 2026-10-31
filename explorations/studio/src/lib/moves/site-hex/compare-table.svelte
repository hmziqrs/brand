<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';

	type Cell = boolean | string;
	let {
		plans,
		groups,
		class: className
	}: { plans: string[]; groups: { name: string; rows: [string, ...Cell[]][] }[]; class?: string } = $props();

	let only = $state(false);
	const differs = (cells: Cell[]) => new Set(cells.map(String)).size > 1;
</script>

<div class={cn('w-full', className)}>
	<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
		<h2 class="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">Compare every plan</h2>
		<label class="inline-flex cursor-pointer items-center gap-3 text-[15px] text-foreground">
			<input type="checkbox" bind:checked={only} class="size-4 accent-[var(--orange)]" />Only show differences
		</label>
	</div>
	<div class="overflow-x-auto border border-border">
		<table class="w-full min-w-[720px] border-collapse text-left text-[15px] text-foreground">
			<thead>
				<tr class="border-b border-foreground">
					<th class="w-[34%] p-4 font-mono text-xs font-normal tracking-[0.12em] text-muted-foreground uppercase">Feature</th>
					{#each plans as p, i (p)}
						<th class={cn('p-4 text-lg font-semibold', i === 2 && 'bg-[var(--orange)] text-[var(--on-orange)]')}>{p}</th>
					{/each}
				</tr>
			</thead>
			{#each groups as g (g.name)}
				<tbody>
					<tr><th colspan={plans.length + 1} class="border-b border-border px-4 pt-8 pb-3 font-mono text-xs font-normal tracking-[0.14em] uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>{g.name}</th></tr>
					{#each g.rows as [label, ...cells] (label)}
						{#if !only || differs(cells)}
							<tr class="border-b border-border transition-colors hover:bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)]">
								<td class="p-4">{label}</td>
								{#each cells as c, i (i)}
									<td class="p-4">
										{#if c === true}<Check class="lucide size-4" aria-label="Included" />
										{:else if c === false}<Minus class="lucide size-4 opacity-40" aria-label="Not included" />
										{:else}<span class="font-mono text-[13px]">{c}</span>{/if}
									</td>
								{/each}
							</tr>
						{/if}
					{/each}
				</tbody>
			{/each}
		</table>
	</div>
</div>
