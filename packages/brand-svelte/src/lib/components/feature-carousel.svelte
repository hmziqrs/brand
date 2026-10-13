<!-- A tour, one slide at a time: the picture large, and the slides' titles below it as chapters you
     can pick. The current chapter is marked in orange; only colors change on the list. -->
<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import { cn } from "$brand/utils.js";
	import * as Carousel from "$brand/ui/carousel/index.js";
	import type { CarouselAPI } from "$brand/ui/carousel/context.js";
	import CarouselControls from "./carousel-controls.svelte";
	import type { Snippet } from "svelte";

	type Slide = { title: string; body: string; content: Snippet };

	let { label, slides, class: className }: { label: string; slides: Slide[]; class?: string } = $props();

	const reduced = new MediaQuery("prefers-reduced-motion: reduce");
	let api = $state<CarouselAPI>();
	let current = $state(0);

	$effect(() => {
		if (!api) return;
		const select = () => (current = api!.selectedScrollSnap());
		api.on("select", select);
		return () => api?.off("select", select);
	});
</script>

<Carousel.Root aria-label={label} setApi={(a) => (api = a)} opts={{ duration: reduced.current ? 1 : 30 }} class={cn("flex flex-col gap-5", className)}>
	<Carousel.Content class="-ms-4">
		{#each slides as slide, i (slide.title)}
			<Carousel.Item class="ps-4" aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}>{@render slide.content()}</Carousel.Item>
		{/each}
	</Carousel.Content>
	<div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
		<ol class="grid flex-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each slides as slide, i (slide.title)}
				<li>
					<button type="button" aria-current={i === current || undefined} onclick={() => api?.scrollTo(i)} class="group flex w-full flex-col gap-1 border-t-2 border-border pt-3 text-left transition-colors outline-none hover:border-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50 aria-current:border-primary">
						<span class="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground group-aria-current:text-foreground">{slide.title}</span>
						<span class="text-[0.8125rem] leading-relaxed text-muted-foreground">{slide.body}</span>
					</button>
				</li>
			{/each}
		</ol>
		<CarouselControls dots={false} class="shrink-0" />
	</div>
</Carousel.Root>
