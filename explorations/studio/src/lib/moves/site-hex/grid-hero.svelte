<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';
	import PlotGrid from './plot-grid.svelte';

	let {
		kicker,
		lead,
		mark,
		tail,
		lede,
		size = 'xl',
		grid = true,
		class: className,
		sub,
		children
	}: {
		kicker?: string;
		lead: string;
		mark?: string;
		tail?: string;
		lede?: string;
		size?: 'lg' | 'xl';
		grid?: boolean;
		class?: string;
		sub?: Snippet;
		children?: Snippet;
	} = $props();

	const sizes = {
		lg: 'text-[44px] sm:text-6xl lg:text-[84px]',
		xl: 'text-[48px] sm:text-7xl lg:text-[112px]'
	};
</script>

<section class={cn('relative isolate mx-auto w-full max-w-[1320px] px-4 pt-20 pb-16 text-center sm:px-8 lg:pt-28 lg:pb-24', className)}>
	{#if grid}<PlotGrid class="-z-10 mx-4 sm:mx-8" />{/if}
	{#if kicker}
		<p class="mx-auto mb-8 inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-xs tracking-[0.14em] text-foreground uppercase">
			<span class="size-2 bg-[var(--orange)]"></span>{kicker}
		</p>
	{/if}
	<h1 class={cn('mx-auto max-w-[15ch] leading-[1.04] font-semibold tracking-[-0.045em] text-balance text-foreground', sizes[size])}>
		{lead}
		{#if mark}<span class="bg-[var(--orange)] px-[0.12em] text-[var(--on-orange)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">{mark}</span>{/if}
		{#if tail}{tail}{/if}
	</h1>
	{#if lede}<p class="mx-auto mt-8 max-w-[44ch] bg-background text-xl leading-snug text-foreground sm:text-2xl">{lede}</p>{/if}
	{#if sub}<div class="mx-auto mt-8 max-w-[52ch] text-xl leading-relaxed text-foreground sm:text-2xl">{@render sub()}</div>{/if}
	{#if children}<div class="mt-10 flex flex-wrap justify-center gap-3">{@render children()}</div>{/if}
</section>
