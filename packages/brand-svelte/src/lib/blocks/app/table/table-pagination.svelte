<!--
  The table's foot: which rows are showing, the page size, and the page
  turns. Page turns are links (they work with no JavaScript, and sit quiet
  at the ends); the page size is a real select named per_page that hands its
  form in on change.
-->
<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";

	let {
		/** From 1. */
		page,
		pageSize,
		total,
		/** The href for the same list on another page. */
		pageHref,
		/** Offered as the page size, submitted as per_page. */
		pageSizes,
		class: className,
		...rest
	}: {
		page: number;
		pageSize: number;
		total: number;
		pageHref: (page: number) => string;
		pageSizes?: number[];
		class?: string;
	} & Record<string, unknown> = $props();

	const lastPage = $derived(Math.max(1, Math.ceil(total / pageSize)));
	const shown = $derived(Math.min(page * pageSize, total));
	const range = $derived(total === 0 ? "0 of 0" : `${(page - 1) * pageSize + 1}–${shown} of ${total}`);
</script>

<div
	data-slot="table-pagination"
	class={cn("flex flex-wrap items-center justify-between gap-3 px-4 py-3", className)}
	{...rest}
>
	<p class="text-sm text-muted-foreground tabular-nums">{range}</p>
	<div class="flex items-center gap-3">
		{#if pageSizes}
			<div class="relative">
				<select
					name="per_page"
					aria-label="Rows per page"
					value={String(pageSize)}
					onchange={(event) => event.currentTarget.form?.requestSubmit()}
					class="h-8 appearance-none rounded-md border border-border bg-background pr-7 pl-2.5 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3"
				>
					{#each pageSizes as size (size)}
						<option value={size}>{size} per page</option>
					{/each}
				</select>
				<ChevronDown
					class="lucide pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
					aria-hidden="true"
				/>
			</div>
		{/if}
		<nav aria-label="Pages" class="flex items-center gap-2">
			{#if page > 1}
				<Button variant="outline" size="sm" href={pageHref(page - 1)} aria-label="Previous page">
					<ChevronLeft class="lucide" aria-hidden="true" />
				</Button>
			{:else}
				<Button variant="outline" size="sm" disabled aria-label="Previous page">
					<ChevronLeft class="lucide" aria-hidden="true" />
				</Button>
			{/if}
			{#if page < lastPage}
				<Button variant="outline" size="sm" href={pageHref(page + 1)} aria-label="Next page">
					<ChevronRight class="lucide" aria-hidden="true" />
				</Button>
			{:else}
				<Button variant="outline" size="sm" disabled aria-label="Next page">
					<ChevronRight class="lucide" aria-hidden="true" />
				</Button>
			{/if}
		</nav>
	</div>
</div>
