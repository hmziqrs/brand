<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { Snippet } from 'svelte';
	import SpotFrame from './spot-frame.svelte';

	let {
		kicker,
		title,
		body,
		cta,
		href = '#',
		flip = false,
		class: className,
		art
	}: {
		kicker?: string;
		title: string;
		body: string;
		cta?: string;
		href?: string;
		flip?: boolean;
		class?: string;
		art: Snippet;
	} = $props();
</script>

<section class={cn('mx-auto grid w-full max-w-[1320px] items-center gap-10 px-4 py-16 sm:px-8 md:grid-cols-2 lg:gap-20 lg:py-24', className)}>
	<SpotFrame class={cn('px-4 py-8 sm:px-10', flip && 'md:order-2')}>
		{@render art()}
	</SpotFrame>
	<div class={cn('max-w-[34rem]', flip ? 'md:order-1' : 'md:justify-self-end')}>
		{#if kicker}<p class="mb-5 font-mono text-xs tracking-[0.16em] text-foreground uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>{kicker}</p>{/if}
		<h2 class="text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl lg:text-[56px]">{title}</h2>
		<p class="mt-6 text-lg leading-relaxed text-foreground sm:text-xl">{body}</p>
		{#if cta}
			<a {href} class="group mt-8 inline-flex items-center gap-3 border-b border-foreground pb-1 text-base font-medium text-foreground transition-colors hover:border-[var(--orange)]">
				{cta}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
			</a>
		{/if}
	</div>
</section>
