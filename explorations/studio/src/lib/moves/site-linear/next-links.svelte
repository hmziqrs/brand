<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	type Item = { title: string; label: string; href: string; current?: boolean };

	let { items, class: className }: { items: Item[]; class?: string } = $props();
</script>

<nav data-slot="next-links" aria-label="More of the product" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<ul class="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
		{#each items as it (it.title)}
			<li>
				<a href={it.href} aria-current={it.current ? 'page' : undefined} class="group flex h-full min-h-48 flex-col justify-between gap-8 bg-background p-6 transition-colors hover:bg-primary aria-[current=page]:bg-primary/10 motion-reduce:transition-none">
					<span class="max-w-[16ch] text-2xl leading-tight font-medium tracking-[-0.02em] text-foreground group-hover:text-primary-foreground">{it.title}</span>
					<span class="inline-flex items-center gap-1.5 text-[15px] text-primary group-hover:text-primary-foreground">{it.label}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
