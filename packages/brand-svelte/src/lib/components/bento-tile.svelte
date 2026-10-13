<!-- One tile of a bento grid: a picture or a live piece (media) and the words, in an outline tile.
     `cols` and `rows` set its size on wide screens; on tablets it takes up to four columns. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		cols = 2,
		rows = 1,
		eyebrow,
		title,
		body,
		/** Where the media sits: above the words, below them, or beside them on wide tiles. */
		layout = "top",
		href,
		media,
		class: className,
		children,
	}: {
		cols?: 1 | 2 | 3 | 4 | 5 | 6;
		rows?: 1 | 2 | 3;
		eyebrow?: string;
		title?: string;
		body?: string;
		layout?: "top" | "bottom" | "side";
		href?: string;
		media?: Snippet;
		class?: string;
		children?: Snippet;
	} = $props();

	const lg = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6" } as const;
	const md = { 1: "md:col-span-2", 2: "md:col-span-2", 3: "md:col-span-4", 4: "md:col-span-4", 5: "md:col-span-4", 6: "md:col-span-4" } as const;
	const tall = { 1: "", 2: "md:row-span-2", 3: "md:row-span-3" } as const;
</script>

<article
	data-slot="bento-tile"
	data-layout={layout}
	class={cn(
		"group/tile relative flex min-w-0 overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-[box-shadow] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
		href && "hover:ring-primary/50",
		layout === "side" ? "flex-col lg:flex-row" : "flex-col",
		layout === "bottom" && "flex-col-reverse",
		lg[cols],
		md[cols],
		tall[rows],
		className,
	)}
>
	{#if media}<div class={cn("relative min-h-0 min-w-0 flex-1", layout === "side" && "lg:order-2")}>{@render media()}</div>{/if}
	{#if title || body || eyebrow || children}
		<div class={cn("flex flex-col gap-1.5 p-5", layout === "side" && "lg:w-1/2 lg:justify-center lg:p-7")}>
			{#if eyebrow}<p class="text-[0.8125rem] text-muted-foreground">{eyebrow}</p>{/if}
			{#if title}
				<h3 class="font-medium tracking-[-0.01em]">
					{#if href}<a {href} class="outline-none group-hover/tile:underline group-hover/tile:underline-offset-4 after:absolute after:inset-0 after:z-10">{title}</a>{:else}{title}{/if}
				</h3>
			{/if}
			{#if body}<p class="text-sm leading-relaxed text-muted-foreground">{body}</p>{/if}
			{@render children?.()}
		</div>
	{/if}
</article>
