<!--
  A record's facts as a real definition list: one label and one value per
  fact. A missing value says “Not set” in muted words, machine values (ids,
  keys) go mono, and a `copy` text puts the copy button beside the value.
  The list brings no panel and no horizontal padding of its own —
  DetailSection draws the panel around it, and SkeletonDetails stands
  exactly where these rows land while the record loads.
-->
<script lang="ts">
	import CopyButton from "$brand/components/copy-button.svelte";
	import { cn } from "$brand/utils.js";
	import type { DetailItem } from "./types.js";

	let {
		items,
		/** "rows" puts each label left of its value (stacked below sm); "grid" stacks the label over the value in columns. */
		layout = "rows",
		/** The grid's columns from sm: 2 (default) or 3. */
		columns = 2,
		class: className,
		...rest
	}: {
		items: DetailItem[];
		layout?: "rows" | "grid";
		columns?: 2 | 3;
		class?: string;
	} & Record<string, unknown> = $props();

	// Written out, not assembled: every class name Tailwind needs is whole
	// in the source.
	const gridColumns = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" } as const;
</script>

{#snippet labelOf(item: DetailItem)}
	<dt class={cn("text-sm text-muted-foreground", layout === "rows" && "w-40 shrink-0")}>
		{#if typeof item.label === "string"}{item.label}{:else}{@render item.label()}{/if}
	</dt>
{/snippet}

{#snippet valueText(item: DetailItem)}
	{#if item.value === undefined}
		Not set
	{:else if typeof item.value === "string"}
		{item.value}
	{:else}
		{@render item.value()}
	{/if}
{/snippet}

{#snippet valueOf(item: DetailItem)}
	<dd
		class={cn(
			"min-w-0 text-sm",
			item.mono && "font-mono",
			item.value === undefined && "text-muted-foreground",
		)}
	>
		{#if item.copy}
			<span class="flex flex-wrap items-center gap-2">
				<span class="min-w-0">{@render valueText(item)}</span>
				<CopyButton text={item.copy} class="size-6" />
			</span>
		{:else}
			{@render valueText(item)}
		{/if}
	</dd>
{/snippet}

{#if layout === "grid"}
	<dl data-slot="detail-list" class={cn("grid grid-cols-1 gap-x-8", gridColumns[columns], className)} {...rest}>
		{#each items as item}
			<div class="flex flex-col gap-1 py-3.5">
				{@render labelOf(item)}
				{@render valueOf(item)}
			</div>
		{/each}
	</dl>
{:else}
	<dl data-slot="detail-list" class={cn("flex flex-col divide-y divide-border", className)} {...rest}>
		{#each items as item}
			<div class="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
				{@render labelOf(item)}
				{@render valueOf(item)}
			</div>
		{/each}
	</dl>
{/if}
