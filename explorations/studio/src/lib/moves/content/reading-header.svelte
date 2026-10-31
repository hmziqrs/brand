<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Link = { label: string; href: string; current?: boolean };

	let {
		site,
		maker,
		links = [],
		wide = false,
		class: className
	}: { site: string; maker?: string; links?: Link[]; wide?: boolean; class?: string } = $props();
</script>

<header class={cn('sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70', className)}>
	<div class={cn('mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6', wide ? 'max-w-[90rem]' : 'max-w-[82rem]')}>
		<a href="#/p/content/blog-index-1" class="flex min-w-0 items-baseline gap-1.5 text-foreground no-underline">
			<span class="text-lg leading-none font-semibold tracking-[-0.02em] whitespace-nowrap">{site}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.36em] bg-primary"></i></span>
			{#if maker}<span class={cn("hidden text-[0.78rem] whitespace-nowrap text-muted-foreground", site.length > 8 ? "sm:inline" : "min-[380px]:inline")}>{maker}</span>{/if}
		</a>
		<nav aria-label="Main" class="flex items-center gap-0.5 sm:gap-1">
			{#each links as l (l.label)}
				<a
					href={l.href}
					aria-current={l.current ? 'page' : undefined}
					class="rounded-md px-2 py-1.5 text-[0.8125rem] text-muted-foreground no-underline transition-colors hover:text-foreground aria-[current=page]:text-foreground sm:px-2.5 sm:text-sm"
				>{l.label}</a>
			{/each}
		</nav>
	</div>
</header>
