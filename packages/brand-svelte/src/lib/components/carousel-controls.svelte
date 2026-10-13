<!-- Arrows, a ring per stop (the current one filled) and "3 of 8", for a carousel built on the
     stock Carousel. Must sit inside Carousel.Root. -->
<script lang="ts">
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import { getEmblaContext } from "$brand/ui/carousel/context.js";

	let { dots = true, count = true, class: className }: { dots?: boolean; count?: boolean; class?: string } = $props();

	const ctx = getEmblaContext("<CarouselControls/>");
	let stops = $state(0);

	$effect(() => {
		const api = ctx.api;
		if (!api) return;
		const update = () => (stops = api.scrollSnapList().length);
		update();
		api.on("reInit", update);
		return () => api.off("reInit", update);
	});
</script>

<div data-slot="carousel-controls" class={cn("flex items-center gap-3", className)}>
	{#if count && stops > 1}<span class="text-[0.8125rem] text-muted-foreground tabular-nums" aria-live="polite">{ctx.selectedIndex + 1} of {stops}</span>{/if}
	{#if dots && stops > 1 && stops <= 12}
		<div class="flex items-center">
			{#each Array.from({ length: stops }, (_, i) => i) as i (i)}
				<button type="button" aria-label={`Go to ${i + 1} of ${stops}`} aria-current={i === ctx.selectedIndex || undefined} onclick={() => ctx.scrollTo(i)} class="group grid size-6 place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
					<i aria-hidden="true" class="size-2 rounded-full border-[1.5px] border-muted-foreground transition-colors group-hover:border-foreground group-aria-current:border-primary group-aria-current:bg-primary"></i>
				</button>
			{/each}
		</div>
	{/if}
	<div class="flex gap-1.5">
		<Button variant="outline" size="icon-sm" aria-label="Previous" disabled={!ctx.canScrollPrev} onclick={ctx.scrollPrev}><ArrowLeft class="lucide" /></Button>
		<Button variant="outline" size="icon-sm" aria-label="Next" disabled={!ctx.canScrollNext} onclick={ctx.scrollNext}><ArrowRight class="lucide" /></Button>
	</div>
</div>
