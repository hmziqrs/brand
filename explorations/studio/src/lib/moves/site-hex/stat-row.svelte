<script lang="ts">
	import { cn } from '$brand/utils.js';
	let { stats, class: className }: { stats: { value: string; label: string }[]; class?: string } = $props();
</script>

<dl class={cn('grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4', className)}>
	{#each stats as s, i (s.label)}
		<div class="flex flex-col bg-background p-6 sm:p-8">
			<dt class="order-2 mt-2 text-lg text-foreground">{s.label}</dt>
			<dd class="text-5xl font-semibold tracking-[-0.04em] text-foreground tabular-nums sm:text-7xl">{s.value}{#if i === 0}<i aria-hidden="true" class="ml-1 inline-block size-[0.22em] bg-[var(--orange)]"></i>{/if}</dd>
		</div>
	{/each}
</dl>
