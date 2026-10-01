<!--
  A column header that sorts: a th that says which way it's pointing
  (aria-sort) and holds the link that turns the sort, so it works with no
  JavaScript. The arrow follows the state; an unsorted column shows the
  both-ways chevrons. Anything that shares the cell — the select-all
  checkbox of a selection column — comes in through the `leading` snippet.
-->
<script lang="ts">
	import ArrowDown from "@lucide/svelte/icons/arrow-down";
	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { Head } from "$brand/ui/table/index.js";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		label,
		sorted = false,
		href,
		leading,
		class: className,
		...rest
	}: {
		label: string;
		sorted?: false | "asc" | "desc";
		href: string;
		leading?: Snippet;
		class?: string;
	} & Record<string, unknown> = $props();

	const ariaSort = $derived(sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none");
	const Icon = $derived(sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ChevronsUpDown);
</script>

<Head data-slot="sortable-head" aria-sort={ariaSort} class={cn("text-foreground", className)} {...rest}>
	<span class="flex items-center gap-2.5">
		{#if leading}
			{@render leading()}
		{/if}
		<a
			href={href}
			class="inline-flex items-center gap-1 rounded-sm outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			{label}
			<Icon class="lucide size-3.5 text-muted-foreground" aria-hidden="true" />
		</a>
	</span>
</Head>
