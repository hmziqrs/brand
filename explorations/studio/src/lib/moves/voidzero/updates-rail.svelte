<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import CardCarousel from '$brand/components/card-carousel.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { Update } from './freeoxide';

	let {
		items,
		title = 'Featured updates',
		intro,
		layout = 'split',
		cover = 'mark',
		class: className
	}: {
		items: Update[];
		title?: string;
		intro?: string;
		layout?: 'split' | 'full';
		cover?: 'mark' | 'headline';
		class?: string;
	} = $props();
</script>

{#snippet headBlock(inline: boolean)}
	<div class={cn('flex flex-col gap-4', inline ? '' : 'p-6 sm:p-10')}>
		<h2 class="max-w-[14ch] text-4xl leading-[1.04] font-medium tracking-[-0.035em] sm:text-5xl">{title}</h2>
		{#if intro}<p class="max-w-[38ch] text-lg text-foreground/85">{intro}</p>{/if}
		<div><Button href="#/p/voidzero/freeoxide-1" variant="outline">All posts<ArrowRight class="lucide" data-icon="inline-end" /></Button></div>
	</div>
{/snippet}

{#snippet updateCard(u: Update)}
	<a href="#/p/voidzero/freeoxide-1" class="group/update relative flex w-full flex-col overflow-hidden rounded-xl bg-card outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
		<span aria-hidden="true" class="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-foreground/10 transition-[box-shadow] ring-inset group-hover/update:ring-2 group-hover/update:ring-primary/60"></span>
		<div class="relative isolate aspect-[16/10] overflow-hidden">
			<ShaderMaterial preset={u.preset} rendering="image" loading="eager" controls={false} sizes="(min-width: 1024px) 30vw, 85vw" class="absolute inset-0 -z-10 transition-transform duration-700 group-hover/update:scale-105 motion-reduce:transition-none motion-reduce:group-hover/update:scale-100" />
			{#if cover === 'mark'}
				<div class="absolute inset-0 grid place-items-center">
					<span class="inline-flex items-baseline rounded-[22%] bg-background px-4 py-3 text-3xl leading-none font-semibold tracking-[-0.02em] text-foreground shadow-xl">{u.symbol}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.3em] bg-mark-square"></i></span>
				</div>
			{:else}
				<div class="absolute inset-x-3 bottom-3 rounded-lg bg-background/90 p-4 backdrop-blur-md">
					<p class="line-clamp-2 text-xl leading-tight font-medium tracking-[-0.02em]">{u.title}</p>
				</div>
			{/if}
		</div>
		<div class="flex flex-1 flex-col gap-3 border-t border-border p-5">
			<p class="font-mono text-xs text-muted-foreground"><span class="text-foreground">{u.kind}</span> · {u.date} · example post</p>
			{#if cover === 'mark'}<p class="text-lg leading-snug font-medium tracking-[-0.01em] text-balance group-hover/update:underline group-hover/update:underline-offset-4">{u.title}</p>{/if}
		</div>
	</a>
{/snippet}

<div class={cn('updates-rail', layout === 'split' ? 'grid border-y border-border lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]' : 'flex flex-col gap-8', className)}>
	{#if layout === 'split'}
		{@render headBlock(false)}
		<div class="min-w-0 overflow-hidden border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
			<CardCarousel items={items} label={title} per={{ sm: 1.1, md: 2.1, lg: 2.25 }}>
				{#snippet heading()}<span class="font-mono text-xs text-muted-foreground">{items.length} posts</span>{/snippet}
				{#snippet card(item)}{@render updateCard(item)}{/snippet}
			</CardCarousel>
		</div>
	{:else}
		<CardCarousel items={items} label={title} per={{ sm: 1.1, md: 2.2, lg: 3.2 }}>
			{#snippet heading()}{@render headBlock(true)}{/snippet}
			{#snippet card(item)}{@render updateCard(item)}{/snippet}
		</CardCarousel>
	{/if}
</div>

