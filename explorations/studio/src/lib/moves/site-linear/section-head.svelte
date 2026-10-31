<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let {
		index,
		title,
		lede,
		href,
		link = 'Learn more',
		as = 'h2',
		class: className
	}: {
		index?: string;
		title: string;
		lede: string;
		href?: string;
		link?: string;
		as?: 'h1' | 'h2';
		class?: string;
	} = $props();
</script>

<div data-slot="section-head" class={cn('mx-auto grid max-w-[1320px] gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-10', className)}>
	<div class="flex flex-col gap-4">
		{#if index}
			<p class="flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-primary uppercase"><span class="size-2 bg-primary"></span>{index}</p>
		{/if}
		<svelte:element this={as} class="max-w-[13ch] text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.04em] text-balance text-foreground">{title}</svelte:element>
	</div>
	<div class="flex flex-col items-start gap-5 md:pt-2">
		<p class="max-w-[40ch] text-xl leading-snug text-foreground md:text-[1.5rem] md:leading-[1.3]">{lede}</p>
		{#if href}
			<a {href} class="group inline-flex items-center gap-1.5 text-base font-medium text-primary underline-offset-4 hover:underline">
				{link}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
			</a>
		{/if}
	</div>
</div>
