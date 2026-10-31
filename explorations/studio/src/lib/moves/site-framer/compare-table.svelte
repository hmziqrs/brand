<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import Minus from '@lucide/svelte/icons/minus';

	type Row = { name: string; hint: string; v: (string | boolean)[] };
	type Group = { title: string; intro?: string; rows: Row[] };
	let { plans = ['Basic', 'Pro', 'Enterprise'], groups, hot = 1, class: className }: { plans?: string[]; groups: Group[]; hot?: number; class?: string } = $props();

	let open = $state<Record<string, boolean>>({});
</script>

<div class={cn('min-w-0', className)}>
	<div class="sticky top-16 z-10 grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] border-b border-border bg-background/90 py-4 backdrop-blur-xl">
		<span></span>
		{#each plans as p, i (p)}<span class="px-1 text-center text-sm font-medium sm:px-2 sm:text-left sm:text-lg" class:text-primary={i === hot}>{p}</span>{/each}
	</div>
	{#each groups as g (g.title)}
		<section class="pt-12">
			<h3 class="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{g.title}</h3>
			{#if g.intro}<p class="mt-1 text-lg text-foreground/75">{g.intro}</p>{/if}
			<div class="mt-4">
				{#each g.rows as r (r.name)}
					<div class="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] items-center border-t border-border py-3.5">
						<button type="button" class="pr-3 text-left" onclick={() => (open[r.name] = !open[r.name])} aria-expanded={!!open[r.name]}>
							<span class="block text-[0.9375rem] font-medium">{r.name}</span>
							<span class="block text-sm text-foreground/60" class:hidden={!open[r.name]} class:sm:block={true}>{r.hint}</span>
						</button>
						{#each r.v as v, i (i)}
							<span class={cn('px-1 text-center text-sm tabular-nums sm:px-2 sm:text-left sm:text-[0.9375rem]', i === hot && 'relative before:absolute before:inset-y-[-0.875rem] before:inset-x-0 before:-z-10 before:bg-primary/[0.06]')}>
								{#if v === true}<Check class="lucide inline size-4 text-primary" />{:else if v === false}<Minus class="lucide inline size-4 text-foreground/35" />{:else}{v}{/if}
							</span>
						{/each}
					</div>
				{/each}
			</div>
		</section>
	{/each}
</div>
