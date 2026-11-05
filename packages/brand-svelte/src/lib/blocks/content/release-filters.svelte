<!-- A changelog's filters: a search over every change, one chip per kind in its KindTag color, and,
     when older releases are folded, a button that opens or folds them all. -->
<script lang="ts">
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { kindsOf } from "@hmziq/brand-core/changelog";
	import { cn } from "$brand/utils.js";
	import SearchBox from "$brand/blocks/site/search-box.svelte";
	import TopicChips from "$brand/blocks/site/topic-chips.svelte";
	import { kindTone, type Release } from "./types.js";

	let {
		releases,
		kind = $bindable("All"),
		query = $bindable(""),
		folds = 0,
		open = false,
		onOpen,
		search = "Search the changes",
		class: className,
	}: {
		/** Every release, for the kinds. */
		releases: Release[];
		/** The picked kind, "All" for every kind. */
		kind?: string;
		query?: string;
		/** How many releases are folded; the button shows when there are any. */
		folds?: number;
		/** Whether the folded releases are all open. */
		open?: boolean;
		onOpen?: (open: boolean) => void;
		/** The search box's label and placeholder. */
		search?: string;
		class?: string;
	} = $props();

	const kinds = $derived(["All", ...kindsOf(releases)]);
</script>

<div data-slot="release-filters" class={cn("flex flex-wrap items-center gap-3", className)}>
	<SearchBox label={search} value={query} onChange={(v) => (query = v)} class="w-full sm:w-auto sm:min-w-72" />
	<TopicChips items={kinds} value={kind} onChange={(v) => (kind = v)} tone={(t) => (t === "All" ? undefined : kindTone[t])} />
	{#if folds > 0 && onOpen}
		<button
			type="button"
			aria-pressed={open}
			onclick={() => onOpen(!open)}
			class="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground aria-pressed:text-foreground motion-reduce:transition-none sm:ml-auto"
		>
			<ChevronsUpDown class="lucide size-3.5" />
			{open ? "Fold the older releases" : `Open all ${folds} older releases`}
		</button>
	{/if}
</div>
