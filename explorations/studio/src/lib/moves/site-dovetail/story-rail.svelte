<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import StoryCard from './story-card.svelte';
	import { cn } from '$brand/utils.js';
	import { to } from './site';
	import type { Story } from './stories';

	let { stories, heading, class: className }: { stories: Story[]; heading: Snippet; class?: string } = $props();

	let rail: HTMLDivElement | undefined = $state();
	const go = (d: number) => rail?.scrollBy({ left: d * rail.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
</script>

<section class={cn('py-24 sm:py-32', className)}>
	<div class="mx-auto flex w-full max-w-[82rem] flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
		{@render heading()}
		<div class="flex items-center gap-2">
			<Button variant="outline" size="icon" onclick={() => go(-1)} aria-label="Previous stories"><ArrowLeft class="lucide" /></Button>
			<Button variant="outline" size="icon" onclick={() => go(1)} aria-label="Next stories"><ArrowRight class="lucide" /></Button>
			<Button href={to('customers')} class="ml-2">See all stories</Button>
		</div>
	</div>
	<div bind:this={rail} class="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:px-[max(1.5rem,calc((100vw-82rem)/2+1.5rem))]">
		{#each stories as s (s.title)}
			<StoryCard story={s} class="w-[78vw] shrink-0 snap-start sm:w-[22rem]" />
		{/each}
	</div>
</section>
