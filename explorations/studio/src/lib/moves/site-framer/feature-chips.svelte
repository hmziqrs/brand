<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$brand/utils.js';

	let { items, class: className }: { items: { icon: Component; label: string; href?: string }[]; cols?: 3 | 4 | 5; class?: string } = $props();
</script>

<ul class={cn('flex flex-wrap gap-2.5', className)}>
	{#each items as it (it.label)}
		<li>
			<svelte:element
				this={it.href ? 'a' : 'span'}
				href={it.href}
				class="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-2 pr-4 pl-2 text-[0.9375rem] text-foreground transition-colors hover:border-transparent hover:bg-primary hover:text-primary-foreground motion-reduce:transition-none"
			>
				<span class="grid size-7 place-items-center rounded-full bg-background text-primary transition-colors group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground">
					<it.icon class="lucide size-3.5" />
				</span>
				{it.label}
			</svelte:element>
		</li>
	{/each}
</ul>
