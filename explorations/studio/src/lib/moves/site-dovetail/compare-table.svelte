<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';
	import { cn } from '$brand/utils.js';

	type Row = { name: string; hint: string; free: boolean | string; paid: boolean | string };
	type Group = { title: string; lede?: string; sub?: string; badges?: string[]; rows: Row[] };

	let { groups, plans = ['Free', 'Enterprise'], class: className }: { groups: Group[]; plans?: [string, string] | string[]; class?: string } = $props();
</script>

{#snippet cell(v: boolean | string)}
	{#if v === true}<Check class="lucide mx-auto size-4" aria-label="Included" />{:else if v === false}<Minus class="lucide mx-auto size-4 opacity-25" aria-label="Not included" />{:else}<span class="text-[0.9rem]">{v}</span>{/if}
{/snippet}

<div class={cn('mx-auto w-full max-w-[82rem] px-4 sm:px-6', className)}>
	<div class="sticky top-16 z-10 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background py-4">
		<span class="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">Compare plans</span>
		<span class="text-center text-[1rem] font-medium text-foreground">{plans[0]}</span>
		<span class="text-center text-[1rem] font-medium text-foreground"><span class="mr-1.5 inline-block size-2 bg-primary align-middle"></span>{plans[1]}</span>
	</div>
	{#each groups as g (g.title + (g.sub ?? ''))}
		<div class="pt-20 pb-6">
			{#if g.sub}
				<div class="flex flex-wrap items-end justify-between gap-4">
					<h3 class="text-[1.4rem] font-medium tracking-[-0.02em] text-foreground">{g.sub}</h3>
					{#if g.badges}
						<div class="flex gap-2">
							{#each g.badges as b (b)}<span class="grid size-14 place-items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_35%,transparent)] text-center font-mono text-[0.52rem] leading-tight tracking-[0.06em] text-foreground uppercase">{b}</span>{/each}
						</div>
					{/if}
				</div>
			{:else}
				<h2 class="max-w-[14ch] text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1] font-medium tracking-[-0.045em] text-foreground">{g.title}</h2>
				{#if g.lede}<p class="mt-5 max-w-[34rem] text-[1.15rem] leading-relaxed text-foreground">{g.lede}</p>{/if}
			{/if}
		</div>
		<div role="table" aria-label={g.sub ?? g.title}>
			{#each g.rows as r (r.name)}
				<div role="row" class="group grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] border-t border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] last:border-b">
					<span role="rowheader" class="relative py-3.5 pr-3 text-[0.98rem] text-foreground">
						<span class="cursor-help underline decoration-[color-mix(in_oklab,var(--foreground)_40%,transparent)] decoration-dotted underline-offset-4" title={r.hint}>{r.name}</span>
						<span class="pointer-events-none absolute top-full left-0 z-20 hidden w-64 rounded-lg bg-foreground p-3 text-[0.82rem] leading-snug text-background shadow-lg group-hover:block">{r.hint}</span>
					</span>
					<span role="cell" class="grid place-items-center py-3.5 text-foreground">{@render cell(r.free)}</span>
					<span role="cell" class="grid place-items-center bg-[color-mix(in_oklab,var(--orange)_10%,transparent)] py-3.5 text-foreground">{@render cell(r.paid)}</span>
				</div>
			{/each}
		</div>
	{/each}
</div>
