<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Glass from '$brand/components/glass.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	let {
		name = 'oxlabs',
		maker = 'studio',
		links = [],
		cta = 'Start a project',
		href = '#contact',
		variant = 'glass',
		class: className
	}: {
		name?: string;
		maker?: string;
		links?: { label: string; href: string }[];
		cta?: string;
		href?: string;
		variant?: 'glass' | 'bar';
		class?: string;
	} = $props();
</script>

{#snippet inner()}
	<a href="#/" class="flex items-baseline gap-1.5 text-lg text-foreground">
		<Wordmark {name} />
		{#if maker}<span class="text-sm text-foreground/85">{maker}</span>{/if}
	</a>
	<nav aria-label="Main" class="hidden items-center gap-1 md:flex">
		{#each links as l (l.label)}
			<a href={l.href} class="rounded-md px-3 py-1.5 text-sm text-foreground hover:bg-foreground/10">{l.label}</a>
		{/each}
	</nav>
	<Button {href} size="sm" class="gap-1 rounded-full px-3.5">{cta}<ArrowUpRight class="lucide" /></Button>
{/snippet}

{#if variant === 'glass'}
	<div class={cn('sticky top-3 z-40 px-3', className)}>
		<Glass variant="clear" class="mx-auto flex max-w-[1080px] items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5">
			{@render inner()}
		</Glass>
	</div>
{:else}
	<header class={cn('sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md', className)}>
		<div class="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8">
			{@render inner()}
		</div>
	</header>
{/if}
