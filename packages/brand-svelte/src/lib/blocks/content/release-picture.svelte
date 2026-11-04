<!-- A release's picture: what it changed, framed with a thin ring, and a Tag and a caption under it.
     `drawing` holds a line drawing at 16:10; anything else sets its own height. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Tag from "$brand/components/tag.svelte";

	let {
		tag,
		caption,
		drawing = false,
		class: className,
		children,
	}: {
		/** What the picture is, in a Tag: "settings.json", "Line drawing". */
		tag: string;
		caption: string;
		/** A line drawing that fills a 16:10 frame. */
		drawing?: boolean;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<figure data-slot="release-picture" class={cn("m-0 min-w-0", className)}>
	<div class={cn("relative isolate overflow-hidden rounded-xl bg-background ring-1 ring-foreground/10 transition-shadow duration-300 hover:ring-foreground/25 motion-reduce:transition-none", drawing && "aspect-[16/10]")}>
		{@render children()}
	</div>
	<figcaption class="mt-3 flex items-baseline gap-2.5 text-sm leading-snug text-foreground/80">
		<Tag>{tag}</Tag>
		<span>{caption}</span>
	</figcaption>
</figure>
