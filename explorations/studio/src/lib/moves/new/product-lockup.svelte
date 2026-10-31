<script lang="ts">
	import { cn } from '$brand/utils.js';
	import InlineRing from './inline-ring.svelte';

	let {
		name,
		kind,
		links = [],
		cta,
		secondary,
		class: className
	}: {
		name: string;
		kind?: string;
		links?: { label: string; href: string }[];
		cta?: { label: string; href: string };
		secondary?: { label: string; href: string };
		class?: string;
	} = $props();
</script>

<header class={cn('sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl', className)}>
	<div class="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-4 sm:px-8">
		<a href="#/p/new/{name}" class="flex min-w-0 items-center gap-2.5">
			<InlineRing seed={name} rings={4} weight={4} class="size-7" />
			<span class="text-[1.15rem] font-semibold tracking-tight">{name}<span class="ml-px inline-block size-[0.42em] bg-orange align-baseline"></span></span>
			<span class="hidden border-l border-border pl-2.5 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground sm:inline">
				{kind ? `${kind} · ` : ''}by hmziq
			</span>
		</a>
		<nav class="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
			{#each links as l (l.label)}
				<a href={l.href} class="rounded-md px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:text-foreground">{l.label}</a>
			{/each}
		</nav>
		<div class="ml-auto flex items-center gap-2 lg:ml-0">
			{#if secondary}
				<a href={secondary.href} class="hidden h-9 items-center rounded-md border border-border px-3.5 text-sm sm:inline-flex">{secondary.label}</a>
			{/if}
			{#if cta}
				<a href={cta.href} class="inline-flex h-9 items-center rounded-md bg-primary px-3.5 text-sm font-medium whitespace-nowrap text-primary-foreground">{cta.label}</a>
			{/if}
		</div>
	</div>
</header>
