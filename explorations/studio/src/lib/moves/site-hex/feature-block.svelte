<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { Snippet } from 'svelte';

	let {
		title,
		cta,
		href = '#',
		quote,
		who,
		class: className,
		demo
	}: { title: string; cta?: string; href?: string; quote?: string; who?: string; class?: string; demo: Snippet } = $props();
</script>

<section class={cn('mx-auto grid w-full max-w-[1320px] items-start gap-10 border-t border-border px-4 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-20', className)}>
	<div class="lg:sticky lg:top-8">
		<h3 class="text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl">{title}</h3>
		{#if cta}
			<a {href} class="group mt-7 inline-flex items-center gap-3 border-b border-foreground pb-1 font-medium text-foreground hover:border-[var(--orange)]">{cta}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></a>
		{/if}
		{#if quote}
			<figure class="mt-12 border-l-2 border-[var(--orange)] pl-5">
				<blockquote class="text-lg leading-snug text-foreground">“{quote}”</blockquote>
				{#if who}<figcaption class="mt-3 font-mono text-xs text-muted-foreground">{who}</figcaption>{/if}
			</figure>
		{/if}
	</div>
	<div>{@render demo()}</div>
</section>
