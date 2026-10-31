<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		layout = 'center',
		ground = 'material',
		preset = 'oxide-bloom',
		eyebrow,
		headline,
		lede,
		actions,
		note,
		children,
		class: className
	}: {
		layout?: 'center' | 'left';
		ground?: 'material' | 'glow' | 'none';
		preset?: string;
		eyebrow?: Snippet;
		headline: Snippet;
		lede?: Snippet;
		actions?: Snippet;
		note?: Snippet;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="product-hero" class={cn('relative isolate overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20', className)}>
	<div class={cn('mx-auto flex max-w-[1320px] flex-col gap-6 px-4 sm:px-6', layout === 'center' ? 'items-center text-center' : 'items-start')}>
		{#if eyebrow}{@render eyebrow()}{/if}
		<h1 class={cn('pb-[0.06em] font-medium tracking-[-0.045em] text-balance text-foreground', layout === 'center' ? 'max-w-[14ch] text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.92]' : 'max-w-[16ch] text-[clamp(3rem,7.4vw,7.25rem)] leading-[0.94]')}>
			{@render headline()}
		</h1>
		{#if lede}<div class={cn('text-lg leading-snug text-foreground md:text-[1.4rem]', layout === 'center' ? 'max-w-[38ch]' : 'max-w-[44ch]')}>{@render lede()}</div>{/if}
		{#if actions}<div class={cn('flex flex-wrap items-center gap-3', layout === 'center' && 'justify-center')}>{@render actions()}</div>{/if}
		{#if note}<div class="text-sm text-muted-foreground">{@render note()}</div>{/if}
	</div>
	<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6 md:mt-20">
		{#if ground === 'material'}
			<div class="relative isolate overflow-hidden rounded-2xl p-3 ring-1 ring-foreground/10 sm:p-8 md:p-12">
				<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" loading="eager" class="absolute inset-0 -z-10" />
				<div class="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-background/70 to-transparent"></div>
				{@render children()}
			</div>
		{:else if ground === 'glow'}
			<div class="relative">
				<div aria-hidden="true" class="pointer-events-none absolute inset-x-[8%] -top-10 -z-10 h-2/3 rounded-[50%] bg-primary/25 blur-[90px]"></div>
				<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
				{@render children()}
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>
</section>
