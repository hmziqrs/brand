<!--
  Nothing here (yet): art, a title, a line of description and, for a first
  run, the one action that starts things. The icon art sits above centered
  text; the rings art sits beside it — never behind (BRAND.md section 13).
  NoResults builds on this with the copy for an empty list.
-->
<script lang="ts">
	import Inbox from "@lucide/svelte/icons/inbox";
	import IconTile from "$brand/components/icon-tile.svelte";
	import Rings from "$brand/components/rings.svelte";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import type { Icon } from "$brand/blocks/app/shell/types.js";

	let {
		/** The icon the tile holds. Inbox when left out. */
		icon,
		/** "icon" shows the tile; "rings" shows small faint Rings seeded by `seed` beside the text. */
		art = "icon",
		/** The seed the rings draw from, when art is "rings". */
		seed = "sightline",
		title,
		description,
		/** For a first use: one primary button. */
		actions,
		/** "page" fills a page's content area, "section" one section, "compact" a slot in a card. */
		size = "page",
		class: className,
		...rest
	}: {
		icon?: Icon;
		art?: "icon" | "rings";
		seed?: string;
		title: Snippet | string;
		description?: Snippet | string;
		actions?: Snippet;
		size?: "page" | "section" | "compact";
		class?: string;
	} & Record<string, unknown> = $props();

	const Art = $derived(icon ?? Inbox);

	// The sizes change the padding and the title's size; the shape (art above
	// or beside the text) comes from the art.
	const sizes = {
		page: "gap-4 py-16",
		section: "gap-3 py-10",
		compact: "gap-2.5 py-6",
	} as const;
	const titleSizes = {
		page: "text-lg font-medium tracking-tight",
		section: "text-base font-medium",
		compact: "text-sm font-medium",
	} as const;
</script>

<div
	data-slot="empty-state"
	class={cn(
		"flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center",
		art === "rings" && "flex-row text-left",
		sizes[size],
		className,
	)}
	{...rest}
>
	{#if art === "rings"}
		<div class="w-20 shrink-0 opacity-50" aria-hidden="true">
			<Rings {seed} />
		</div>
	{:else}
		<IconTile>
			<Art class="lucide" />
		</IconTile>
	{/if}
	<div class={cn("flex min-w-0 max-w-sm flex-col gap-2", art === "rings" && "items-start")}>
		<p class={titleSizes[size]}>
			{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
		</p>
		{#if description}
			<p class="text-sm/relaxed text-muted-foreground">
				{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
			</p>
		{/if}
		{#if actions}
			<div class={cn("mt-2 flex flex-wrap gap-2", art === "rings" ? "justify-start" : "justify-center")}>
				{@render actions()}
			</div>
		{/if}
	</div>
</div>
