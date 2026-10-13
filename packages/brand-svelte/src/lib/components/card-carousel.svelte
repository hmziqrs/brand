<!-- A row of cards that scrolls sideways: a few in view with the next one peeking, a heading and
     the controls above. Drag, swipe, the arrows or the arrow keys move it. -->
<script lang="ts" generics="T">
	import { MediaQuery } from "svelte/reactivity";
	import { cn } from "$brand/utils.js";
	import * as Carousel from "$brand/ui/carousel/index.js";
	import CarouselControls from "./carousel-controls.svelte";
	import type { Snippet } from "svelte";

	let {
		items,
		/** What the carousel holds, for screen readers and as its heading. */
		label,
		/** Cards in view from sm, md and lg up; the rest peek in from the side. */
		per = { sm: 1.15, md: 2.2, lg: 3 },
		loop = false,
		heading,
		card,
		class: className,
	}: {
		items: T[];
		label: string;
		per?: { sm: number; md: number; lg: number };
		loop?: boolean;
		heading?: Snippet;
		card: Snippet<[item: T, index: number]>;
		class?: string;
	} = $props();

	const reduced = new MediaQuery("prefers-reduced-motion: reduce");
	const basis = $derived(`calc(100% / var(--per))`);
</script>

<Carousel.Root
	aria-label={label}
	opts={{ align: "start", loop, duration: reduced.current ? 1 : 28 }}
	class={cn("card-carousel flex flex-col gap-6", className)}
	style={`--per-sm: ${per.sm}; --per-md: ${per.md}; --per-lg: ${per.lg};`}
>
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div class="min-w-0">{#if heading}{@render heading()}{:else}<h2 class="text-2xl font-medium tracking-tight">{label}</h2>{/if}</div>
		<CarouselControls />
	</div>
	<Carousel.Content class="-ms-4">
		{#each items as item, i (i)}
			<Carousel.Item class="flex ps-4" style={`flex-basis: ${basis};`} aria-label={`${i + 1} of ${items.length}`}>
				<div class="flex w-full">{@render card(item, i)}</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>

<style>
	:global(.card-carousel) {
		--per: var(--per-sm);
	}
	@media (min-width: 768px) {
		:global(.card-carousel) {
			--per: var(--per-md);
		}
	}
	@media (min-width: 1024px) {
		:global(.card-carousel) {
			--per: var(--per-lg);
		}
	}
</style>
