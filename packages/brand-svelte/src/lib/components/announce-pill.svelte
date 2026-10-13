<!-- A short announcement as a pill: a material dot and a word, the news, an arrow. A link.
     Hover lifts the line and the text color; nothing moves. -->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import MaterialTile from "./material-tile.svelte";
	import type { Snippet } from "svelte";

	let {
		href,
		label = "New",
		preset = "copper-sweep",
		/** glass for a pill over a material or a picture. */
		variant = "outline",
		class: className,
		children,
	}: {
		href: string;
		label?: string;
		preset?: string;
		variant?: "outline" | "glass";
		class?: string;
		children: Snippet;
	} = $props();
</script>

<a
	{href}
	data-slot="announce-pill"
	data-variant={variant}
	class={cn(
		"group inline-flex max-w-full items-center gap-2.5 rounded-full border py-1 pr-3 pl-1 text-[0.8125rem] text-muted-foreground transition-colors outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
		variant === "glass" && "pill-glass",
		className,
	)}
>
	<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background px-2 py-0.5 font-medium text-foreground"><MaterialTile {preset} size={10} shape="circle" />{label}</span>
	<span class="truncate">{@render children()}</span>
	<ArrowRight class="lucide size-3.5 shrink-0" />
</a>

<style>
	.pill-glass {
		background-color: color-mix(in oklab, var(--background) 70%, transparent);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
		backdrop-filter: blur(14px) saturate(1.4);
	}
	@media (prefers-reduced-transparency: reduce) {
		.pill-glass {
			background-color: var(--background);
		}
	}
</style>
