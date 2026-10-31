<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';

	let {
		preset = 'oxide-bloom',
		live = true,
		grid = true,
		eyebrow,
		title,
		lede,
		aside,
		children,
		class: className
	}: {
		preset?: string;
		live?: boolean;
		grid?: boolean;
		eyebrow?: Snippet;
		title: Snippet;
		lede?: Snippet;
		aside?: Snippet;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="hero-stage" class={cn('relative isolate overflow-hidden', className)}>
	{#if grid}
		<div class="absolute inset-x-0 top-0 -z-10 h-[78%]">
			<RustGridField mode="paint" cell={44} fade="bottom" ambient={false} class="opacity-90" />
		</div>
	{/if}
	<div class="mx-auto flex max-w-[1320px] flex-col gap-7 px-4 pt-20 sm:px-6 md:pt-32">
		{#if eyebrow}<div>{@render eyebrow()}</div>{/if}
		<h1 class="max-w-[15ch] text-[clamp(3.25rem,8.4vw,8rem)] leading-[0.93] font-medium tracking-[-0.05em] text-balance text-foreground [text-shadow:0_2px_30px_var(--background)]">
			{@render title()}
		</h1>
		<div class="flex flex-wrap items-end justify-between gap-6">
			{#if lede}<div class="max-w-[40ch] text-xl leading-snug text-foreground md:text-2xl">{@render lede()}</div>{/if}
			{#if aside}<div>{@render aside()}</div>{/if}
		</div>
	</div>
	{#if children}
		<div class="relative mt-14 md:mt-20">
			<div class="absolute inset-x-0 top-[22%] bottom-0 -z-10 overflow-hidden">
				<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} loading="eager" fetchpriority="high" class="absolute inset-0 h-full w-full" />
				<div class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-transparent"></div>
				<div class="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent"></div>
			</div>
			<div class="mx-auto max-w-[1320px] px-3 pb-16 sm:px-6 md:pb-24">
				{@render children()}
			</div>
		</div>
	{/if}
</section>
