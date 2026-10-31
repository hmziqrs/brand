<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		numeral,
		title,
		children,
		aside,
		class: className
	}: { numeral: string; title: Snippet; children: Snippet; aside?: Snippet; class?: string } = $props();
</script>

<section class={cn('mx-auto grid max-w-[1200px] gap-x-12 gap-y-6 border-t border-border px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-[9rem_minmax(0,1fr)_17rem]', className)}>
	<p class="font-newsreader text-[4.5rem] leading-[0.8] font-light tracking-[-0.02em] text-primary lg:text-[6rem]">{numeral}</p>
	<div class="min-w-0">
		<h2 class="font-newsreader text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.02em] text-balance">{@render title()}</h2>
		<div class="editorial-body mt-8 max-w-[38rem] font-newsreader text-[1.32rem] leading-[1.6] text-foreground">{@render children()}</div>
	</div>
	{#if aside}
		<aside class="border-l border-primary/50 pl-5 text-[0.92rem] leading-relaxed text-foreground/85 lg:mt-24">{@render aside()}</aside>
	{/if}
</section>

<style>
	.editorial-body :global(p + p) {
		margin-top: 1.1em;
	}
	.editorial-body :global(p:first-child::first-letter) {
		float: left;
		font-size: 4.1em;
		line-height: 0.82;
		padding: 0.06em 0.1em 0 0;
		color: var(--primary);
		font-style: italic;
	}
</style>
