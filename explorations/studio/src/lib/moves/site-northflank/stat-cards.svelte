<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Counter } from '$moves/northflank/big-counters.svelte';

	let { items, class: className }: { items: (Counter & { fill?: number })[]; class?: string } = $props();
</script>

<dl data-slot="stat-cards" class={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
	{#each items as c, n (c.label)}
		<div class={cn('flex min-w-0 flex-col rounded-2xl border p-6 sm:p-7', n === 0 ? 'border-orange bg-orange text-(--on-orange)' : 'bg-card text-foreground')}>
			<dt class={cn('font-mono text-[11px] tracking-[0.14em] uppercase', n === 0 ? 'opacity-80' : 'text-muted-foreground')}>{c.label}</dt>
			<dd class="mt-10 text-[clamp(56px,6.4vw,96px)] leading-[0.9] font-medium tracking-[-0.05em]">
				{c.value}<span class={cn('ml-1 text-[0.36em] tracking-normal', n === 0 ? '' : 'text-orange')}>{c.unit}</span>
			</dd>
			<div class="mt-6 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]" aria-hidden="true">
				{#each Array(20) as _, k (k)}
					<i class={cn('h-2 rounded-[1px]', k < Math.round((c.fill ?? 0.6) * 20) ? (n === 0 ? 'bg-(--on-orange)' : 'bg-orange') : n === 0 ? 'bg-(--on-orange)/20' : 'bg-foreground/10')}></i>
				{/each}
			</div>
		</div>
	{/each}
</dl>
