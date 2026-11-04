<!-- A how-it-works section: a SectionHead, then numbered StepCards, each with a live demo, on the wide
     Container. Anything passed as children follows the steps inside the same section. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import StepCards, { type StepCard } from "$brand/components/step-cards.svelte";
	import SectionHead from "./section-head.svelte";

	let {
		kicker,
		title,
		/** The part of the title in oxide. */
		accent,
		lede,
		/** Beside the lede: a button. */
		actions,
		steps,
		/** A step's demo, by index. */
		demo,
		children,
		class: className,
	}: {
		kicker?: string;
		title: string;
		accent?: string;
		lede?: string;
		actions?: Snippet;
		steps: StepCard[];
		demo?: Snippet<[number]>;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="steps-section" class={cn("py-24 sm:py-32", className)}>
	<Container size="wide">
		<SectionHead {kicker} {title} {accent} {lede} aside={actions} />
		<StepCards {steps} {demo} class="mt-12 md:mt-16" />
		{@render children?.()}
	</Container>
</section>
