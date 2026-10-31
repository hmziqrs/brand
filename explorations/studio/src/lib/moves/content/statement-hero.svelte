<script lang="ts">
	import type { Snippet } from 'svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Rings from '$brand/components/rings.svelte';
	import { cn } from '$brand/utils.js';

	let {
		preset = 'hammered-copper',
		seed = 'hmziq',
		live = true,
		kicker,
		statement,
		lede,
		card,
		class: className
	}: {
		preset?: string;
		seed?: string;
		live?: boolean;
		kicker?: Snippet;
		statement: Snippet;
		lede?: Snippet;
		card?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-move="statement-hero" class={cn('relative', className)}>
	<div class="mx-auto max-w-[82rem] px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:pb-24">
		{#if kicker}<div class="mb-8 md:mb-12">{@render kicker()}</div>{/if}
		<div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_25rem]">
			<div class="min-w-0">
				{@render statement()}
				{#if lede}<div class="mt-10 max-w-[38rem] text-[1.25rem] leading-[1.55] text-foreground md:text-[1.375rem]">{@render lede()}</div>{/if}
			</div>
			<div class="relative isolate overflow-hidden rounded-3xl border aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/4]">
				<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} loading="eager" fetchpriority="high" sizes="(min-width: 1024px) 25rem, 100vw" class="absolute inset-0 h-full w-full" />
				<div aria-hidden="true" class="pointer-events-none absolute -top-[18%] -right-[42%] w-[150%] opacity-70 mix-blend-overlay">
					<Rings {seed} class="[&_circle]:[stroke-width:1.25]" />
				</div>
				{#if card}
					<div class="absolute inset-x-3 bottom-3 rounded-2xl border bg-background/92 p-4 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-5">
						{@render card()}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
