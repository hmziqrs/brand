<!-- An open-source section: a SectionHead, then ProjectRows (a sticky rail of Marks beside one row per
     project, its terminal on its material), on the wide Container. Anything passed as children
     follows the rows inside the same section. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import ProjectRows, { type ProjectRow } from "$brand/components/project-rows.svelte";
	import SectionHead from "./section-head.svelte";

	let {
		kicker,
		title,
		/** The part of the title in oxide. */
		accent,
		lede,
		/** Beside the lede: a button. */
		actions,
		projects,
		/** Where each row's button goes. */
		href = "#",
		children,
		class: className,
	}: {
		kicker?: string;
		title: string;
		accent?: string;
		lede?: string;
		actions?: Snippet;
		projects: ProjectRow[];
		href?: string;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<section data-slot="projects-section" class={cn("py-24 sm:py-32", className)}>
	<Container size="wide">
		<SectionHead {kicker} {title} {accent} {lede} aside={actions} />
		<ProjectRows {projects} {href} class="mt-12 md:mt-16" />
		{@render children?.()}
	</Container>
</section>
