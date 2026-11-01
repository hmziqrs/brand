<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	type Item = { title: string; label: string; href: string; current?: boolean };

	let { items, class: className }: { items: Item[]; class?: string } = $props();
</script>

<nav data-slot="next-links" aria-label="More of the product" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
		{#each items as it (it.title)}
			<li>
				<a href={it.href} aria-current={it.current ? 'page' : undefined} class="group flex h-full min-h-48 flex-col justify-between gap-8 rounded-2xl bg-background p-6 ring-1 ring-border transition-colors hover:bg-primary hover:ring-primary aria-[current=page]:ring-primary motion-reduce:transition-none">
					<span class="max-w-[16ch] text-2xl leading-tight font-medium tracking-[-0.02em] text-foreground group-hover:text-primary-foreground">{it.title}</span>
					<span class="inline-flex items-center gap-1.5 text-[15px] text-primary group-hover:text-primary-foreground">{it.label}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
