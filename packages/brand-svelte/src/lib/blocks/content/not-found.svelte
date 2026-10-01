<!--
  The 404 (the lab's not-found page): the words on the left, and rings
  drawn from "not found" beside them. What went wrong and the way out
  arrive as props, so the same block covers a missing page and a page that
  failed to draw.
-->
<script lang="ts">
	import Container from "$brand/blocks/site/container.svelte";
	import PageIntro from "$brand/blocks/site/page-intro.svelte";
	import Rings from "$brand/components/rings.svelte";

	let {
		/** The status, shown as the small word above the title. */
		status = "404",
		/** The next two are renamed here because the snippets that carry them
		 * into the page intro are also called `title` and `lede`, and a
		 * snippet's name shadows everything inside it. */
		title: titleText,
		lede: ledeText,
		/** The rings' seed. "not found" by default. */
		seed = "not found",
		class: className,
		children: actions,
	}: { status?: string; title: string; lede: string; seed?: string; class?: string; children: import("svelte").Snippet } = $props();
</script>

<Container class={className}>
	<div class="grid min-h-88 items-center gap-8 md:grid-cols-2">
		<PageIntro>
			{#snippet kicker()}
				{status}
			{/snippet}
			{#snippet title()}
				{titleText}
			{/snippet}
			{#snippet lede()}
				{ledeText}
			{/snippet}
			{#snippet children()}
				<div class="flex flex-wrap gap-3">
					{@render actions()}
				</div>
			{/snippet}
		</PageIntro>
		<Rings {seed} label="Rings, one of them orange" />
	</div>
</Container>
