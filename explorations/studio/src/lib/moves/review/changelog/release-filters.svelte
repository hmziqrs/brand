<script lang="ts">
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import { cn } from '$brand/utils.js';
	import { kindsOf, toneOf } from './parts';
	import type { Release } from './releases';

	let {
		releases,
		kind = $bindable('All'),
		query = $bindable(''),
		folds = 0,
		open = false,
		onOpen,
		class: className
	}: { releases: Release[]; kind?: string; query?: string; folds?: number; open?: boolean; onOpen?: (open: boolean) => void; class?: string } = $props();

	const kinds = $derived(['All', ...kindsOf(releases)]);
</script>

<div data-slot="release-filters" class={cn('flex flex-wrap items-center gap-3', className)}>
	<SearchBox label="Search the changes" value={query} onChange={(v) => (query = v)} class="w-full sm:w-auto sm:min-w-72" />
	<TopicChips items={kinds} value={kind} onChange={(v) => (kind = v)} tone={(t) => (t === 'All' ? undefined : toneOf(t))} />
	{#if folds > 0 && onOpen}
		<button
			type="button"
			aria-pressed={open}
			onclick={() => onOpen(!open)}
			class="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground aria-pressed:text-foreground motion-reduce:transition-none sm:ml-auto"
		>
			<ChevronsUpDown class="lucide size-3.5" />
			{open ? 'Fold the older releases' : `Open all ${folds} older releases`}
		</button>
	{/if}
</div>
