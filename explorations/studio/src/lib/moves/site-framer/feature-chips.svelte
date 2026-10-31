<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$brand/utils.js';

	let { items, cols = 5, class: className }: { items: { icon: Component; label: string; href?: string }[]; cols?: 3 | 4 | 5; class?: string } = $props();
	const grid = { 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-3 lg:grid-cols-5' };
</script>

<ul class={cn('grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-border bg-border', grid[cols], className)}>
	{#each items as it (it.label)}
		<li class="group bg-background">
			<svelte:element this={it.href ? 'a' : 'div'} href={it.href} class="flex items-center gap-3 px-4 py-4 text-[0.9375rem] transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:px-5">
				<it.icon class="lucide size-4 shrink-0 text-primary transition-colors group-hover:text-primary-foreground" />
				{it.label}
			</svelte:element>
		</li>
	{/each}
</ul>
