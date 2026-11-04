<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import type { DocsSite } from './content';

	let {
		site,
		current,
		go,
		query = '',
		inside,
		class: className
	}: { site: DocsSite; current: string; go: (key: string) => string; query?: string; inside?: Snippet; class?: string } = $props();

	const q = $derived(query.trim().toLowerCase());
	const groups = $derived(site.menu.map((g) => ({ ...g, pages: g.pages.filter((p) => !q || p.title.toLowerCase().includes(q)) })).filter((g) => g.pages.length > 0));
</script>

<nav data-slot="docs-menu" aria-label="Docs" class={cn('flex flex-col gap-6 text-sm', className)}>
	{#each groups as g (g.group ?? 'top')}
		<div class="flex flex-col gap-2">
			{#if g.group}<h2 class="text-xs font-medium text-muted-foreground">{g.group}</h2>{/if}
			<ul class="flex flex-col border-l">
				{#each g.pages as p (p.title)}
					<li>
						{#if p.key}
							<a
								href={go(p.key)}
								aria-current={p.key === current ? 'page' : undefined}
								class="-ml-px flex border-l border-transparent py-1.5 pl-3.5 text-muted-foreground no-underline transition-colors hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:font-medium aria-[current=page]:text-foreground motion-reduce:transition-none"
							>
								{p.title}
							</a>
							{#if p.key === current && inside}{@render inside()}{/if}
						{:else}
							<a href={p.href} target="_blank" rel="noreferrer" class="-ml-px flex items-center gap-1 border-l border-transparent py-1.5 pl-3.5 text-muted-foreground no-underline transition-colors hover:text-foreground motion-reduce:transition-none">
								{p.title}<ArrowUpRight class="lucide size-3.5 opacity-70" />
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p class="text-sm text-muted-foreground">No page matches “{query}”.</p>
	{/each}
</nav>
