<!--
  An empty list that's the reader's doing: the search found nothing, or the
  filters together rule everything out. EmptyState with the list copy and a
  "Clear" link back to the plain list; the root re-names the data-slot so the
  two states stay tellable apart in the DOM.
-->
<script lang="ts">
	import FilterX from "@lucide/svelte/icons/filter-x";
	import SearchX from "@lucide/svelte/icons/search-x";
	import { Button } from "$brand/ui/button/index.js";
	import EmptyState from "./empty-state.svelte";

	let {
		/** The search text, quoted in the title. */
		query = "",
		/** True when filters, not the search, rule everything out. */
		filtered = false,
		/** The same list with no search and no filters. */
		clearHref,
		/** What the list holds, for the filtered title: "members". */
		noun = "results",
		class: className,
	}: {
		query?: string;
		filtered?: boolean;
		clearHref: string;
		noun?: string;
		class?: string;
	} = $props();

	// Filters win when both are set: theirs is the copy whose one link
	// clears everything.
	const title = $derived(
		filtered
			? `No ${noun} match these filters`
			: query
				? `Nothing matches “${query}”`
				: "Nothing matches your search",
	);
	const description = $derived(filtered ? "Try removing a filter." : "Check the spelling or search for something else.");
	const label = $derived(filtered ? "Clear filters" : "Clear search");
	const Icon = $derived(filtered ? FilterX : SearchX);
</script>

<EmptyState data-slot="no-results" icon={Icon} {title} {description} class={className}>
	{#snippet actions()}
		<Button variant="outline" href={clearHref}>{label}</Button>
	{/snippet}
</EmptyState>
