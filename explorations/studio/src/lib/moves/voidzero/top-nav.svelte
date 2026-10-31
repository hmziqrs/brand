<script lang="ts">
	import X from '@lucide/svelte/icons/x';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	let {
		variant = 'bar',
		announce,
		announcePreset = 'copper-sweep',
		links = ['Tools', 'How we finish', 'Writing'],
		cta = 'Browse the tools',
		class: className
	}: {
		variant?: 'bar' | 'floating';
		announce?: string;
		announcePreset?: string;
		links?: string[];
		cta?: string;
		class?: string;
	} = $props();

	let closed = $state(false);
	const poster = $derived((shaderPosters[announcePreset] ?? shaderPosters['copper-sweep']).src);
</script>

<div class={cn('top-nav relative z-20', variant === 'floating' && 'absolute inset-x-0 top-0', className)}>
	{#if announce && !closed}
		<div class="relative flex h-10 items-center justify-center bg-cover bg-center px-10" style:background-image={`url(${poster})`}>
			<a href="#/p/voidzero/freeoxide-1" class="dark inline-flex max-w-full items-center gap-2 truncate rounded-full bg-background/85 px-3 py-1 text-xs backdrop-blur-md hover:underline">
				<span aria-hidden="true" class="size-1.5 shrink-0 bg-mark-square"></span><span class="truncate">{announce}</span><ArrowRight class="lucide size-3.5 shrink-0" />
			</a>
			<button type="button" aria-label="Close the announcement" onclick={() => (closed = true)} class="dark absolute right-2 grid size-7 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur-md"><X class="lucide size-3.5" /></button>
		</div>
	{/if}
	<header class={cn('mx-auto flex w-full max-w-[1280px] items-center gap-6', variant === 'bar' ? 'h-19 px-6 sm:px-10' : 'mt-4 h-14 max-w-[calc(100%-2rem)] rounded-full border border-border bg-background/70 px-5 backdrop-blur-xl lg:max-w-[1240px]')}>
		<a href="#/p/voidzero/freeoxide-1" class="shrink-0 text-lg font-semibold tracking-[-0.02em]">freeoxide<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.36em] bg-primary"></i> <span class="text-[0.78em] font-normal text-muted-foreground">by hmziq</span></a>
		<nav aria-label="Main" class="hidden items-center gap-1 md:flex">
			{#each links as l (l)}<Button href="#/p/voidzero/freeoxide-1" variant="ghost" size="sm" class="text-muted-foreground">{l}</Button>{/each}
		</nav>
		<div class="ml-auto flex items-center gap-2">
			<a href="https://github.com/freeoxide" aria-label="freeoxide on GitHub" class="hidden size-9 place-items-center rounded-md text-muted-foreground hover:text-foreground sm:grid"><BrandIcon icon={siGithub} class="size-4" /></a>
			<Button href="#/p/voidzero/freeoxide-1" size="sm" class={variant === 'floating' ? 'rounded-full' : ''}>{cta}</Button>
		</div>
	</header>
</div>
