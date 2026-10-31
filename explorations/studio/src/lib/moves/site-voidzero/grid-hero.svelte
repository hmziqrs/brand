<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import HoverGrid from './hover-grid.svelte';
	import { pointer } from './pointer';

	let {
		chip,
		lede,
		tone = 'page',
		cell = 64,
		class: className,
		title,
		actions,
		art
	}: {
		chip?: string;
		lede?: string;
		tone?: 'page' | 'ink';
		cell?: number;
		class?: string;
		title: Snippet;
		actions?: Snippet;
		art?: Snippet;
	} = $props();
</script>

<section use:pointer class={cn('grid-hero relative isolate overflow-hidden border-b border-border bg-background text-foreground', tone === 'ink' && 'dark', className)}>
	<HoverGrid {cell} class="-z-10 [mask-image:radial-gradient(90%_75%_at_50%_35%,black_35%,transparent)]" />
	<div class="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 pt-16 pb-6 text-center sm:px-6 md:pt-24">
		{#if chip}
			<p class="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
				<span aria-hidden="true" class="relative grid size-2 place-items-center"><span class="absolute size-2 animate-ping rounded-full bg-green/60 motion-reduce:animate-none"></span><span class="size-1.5 rounded-full bg-green"></span></span>{chip}
			</p>
		{/if}
		<h1 class="mt-7 max-w-[13ch] text-[clamp(3.1rem,9vw,8.75rem)] leading-[0.92] font-medium tracking-[-0.055em] text-balance">{@render title()}</h1>
		{#if lede}<p class="mt-7 max-w-[40ch] text-xl leading-relaxed text-foreground sm:text-2xl">{lede}</p>{/if}
		{#if actions}<div class="mt-9 flex flex-wrap justify-center gap-3">{@render actions()}</div>{/if}
	</div>
	{#if art}
		<div class="tilt mx-auto w-full max-w-[1040px] px-4 pb-10 sm:px-6">{@render art()}</div>
	{/if}
</section>

<style>
	.tilt {
		transform: perspective(1600px) rotateX(calc((var(--py, 0.5) - 0.5) * 7deg)) rotateY(calc((var(--px, 0.5) - 0.5) * 10deg)) translateX(calc((var(--px, 0.5) - 0.5) * 18px));
		transform-style: preserve-3d;
	}
	@media (prefers-reduced-motion: reduce) {
		.tilt {
			transform: none;
		}
	}
</style>
