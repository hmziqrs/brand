<!-- A floating bar of actions in glass, for a page's or a selection's few most-used actions.
     Inline by default; `fixed` pins it to the bottom of the window. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Glass from "./glass.svelte";
	import type { Snippet } from "svelte";

	type Item = { label: string; icon: Snippet; onclick?: () => void; href?: string; pressed?: boolean };

	let {
		label,
		items,
		/** Words at the start, like "3 selected". */
		lead,
		/** A button at the end, set apart: the one main action. */
		action,
		fixed = false,
		class: className,
	}: {
		label: string;
		items: (Item | "separator")[];
		lead?: Snippet;
		action?: Snippet;
		fixed?: boolean;
		class?: string;
	} = $props();

	const button = "inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors outline-none hover:bg-foreground/8 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-foreground/10 aria-pressed:text-foreground [&_svg]:size-4 [&_svg]:shrink-0";
</script>

<Glass
	role="toolbar"
	aria-label={label}
	class={cn("inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full p-1.5", fixed && "fixed bottom-5 left-1/2 z-50 -translate-x-1/2", className)}
>
	{#if lead}<span class="shrink-0 px-3 text-sm font-medium whitespace-nowrap">{@render lead()}</span><span aria-hidden="true" class="mx-1 h-5 w-px shrink-0 bg-border"></span>{/if}
	{#each items as item, i (i)}
		{#if item === "separator"}
			<span aria-hidden="true" class="mx-1 h-5 w-px shrink-0 bg-border"></span>
		{:else if item.href}
			<a href={item.href} class={button}>{@render item.icon()}<span class="hidden sm:inline">{item.label}</span><span class="sr-only sm:hidden">{item.label}</span></a>
		{:else}
			<button type="button" aria-pressed={item.pressed} onclick={item.onclick} class={button}>{@render item.icon()}<span class="hidden sm:inline">{item.label}</span><span class="sr-only sm:hidden">{item.label}</span></button>
		{/if}
	{/each}
	{#if action}<span aria-hidden="true" class="mx-1 h-5 w-px shrink-0 bg-border"></span>{@render action()}{/if}
</Glass>
