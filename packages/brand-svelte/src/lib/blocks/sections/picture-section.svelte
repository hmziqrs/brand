<!-- A section of picture cards: a SectionHead, then a PictureGrid, with filter pills when `filter` is
     set, on the wide Container. For a body of work, a set of starting points, a list of guides. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import PictureGrid from "$brand/components/picture-grid.svelte";
	import type { PictureItem } from "$brand/components/picture-card.svelte";
	import SectionHead from "./section-head.svelte";

	let {
		kicker,
		title,
		/** The part of the title in oxide. */
		accent,
		lede,
		/** Beside the lede: a button. */
		actions,
		items,
		/** The link for items without their own. */
		href = "#",
		/** The filter pills' label for screen readers; set it to show them. */
		filter,
		children,
		class: className,
	}: {
		kicker?: string;
		title: string;
		accent?: string;
		lede?: string;
		actions?: Snippet;
		items: PictureItem[];
		href?: string;
		filter?: string;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="picture-section" class={cn("py-24 sm:py-32", className)}>
	<Container size="wide">
		<SectionHead {kicker} {title} {accent} {lede} aside={actions} />
		<PictureGrid {items} {href} {filter} class="mt-12 md:mt-16" />
		{@render children?.()}
	</Container>
</section>
