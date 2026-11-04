<!-- The picture card: a line drawing in a thin ring with a Tag on it, then the title, a short dek and a
     line of meta. The whole card is the link and the drawing follows the cursor across it. With a
     head (a post's PostMeta, a kicker) it is a post card: the head over the title, the words packed
     closer, lg and xl for the posts a page leads with, xl split beside its drawing. Without a
     drawing the card wears the thin ring itself. -->
<script lang="ts" module>
	import type { LineArtKind } from "@hmziq/brand-core/motion/line-art";

	export type PictureItem = {
		title: string;
		/** One or two sentences under the title. */
		dek?: string;
		/** The fine print at the foot: a stack, a place. */
		meta?: string;
		/** The Tag on the picture: what kind of thing it is. */
		tag?: string;
		/** The drawing. */
		art: LineArtKind;
		href?: string;
		/** The filter it falls under in a PictureGrid. */
		group?: string;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import LineArt from "./line-art.svelte";
	import Tag from "./tag.svelte";

	let {
		title,
		dek,
		meta,
		tag,
		art,
		href = "#",
		/** The title's heading level; plain text when left out. */
		as,
		/** md (default), lg for a pair of leads, xl for the one post a page starts with. */
		size = "md",
		/** split puts the drawing beside the words from lg up. */
		layout = "stack",
		/** Over the title: a post's PostMeta, and a kicker before it. */
		head,
		/** A line under the dek that ends in an arrow, like Read the post. */
		more,
		class: className,
	}: Omit<PictureItem, "group" | "art"> & {
		art?: LineArtKind;
		as?: "h2" | "h3";
		size?: "md" | "lg" | "xl";
		layout?: "stack" | "split";
		head?: Snippet;
		more?: string;
		class?: string;
	} = $props();

	const titles = {
		md: "text-xl leading-snug tracking-[-0.015em]",
		lg: "text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.08] tracking-[-0.03em]",
		xl: "text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[1.02] tracking-[-0.04em]",
	};
	const deks = {
		md: "line-clamp-3 text-base leading-snug text-foreground/85",
		lg: "max-w-[52ch] text-lg leading-snug text-foreground/85",
		xl: "max-w-[40ch] text-xl leading-snug text-foreground",
	};
</script>

{#snippet words()}
	<svelte:element this={as ?? "span"} class={cn("font-medium text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4", head && "group-hover:decoration-1", titles[size])}>{title}</svelte:element>
	{#if dek}<span class={deks[size]}>{dek}</span>{/if}
	{#if meta}<span class="mt-auto text-sm text-foreground/75">{meta}</span>{/if}
	{#if more}<span class="mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary">{more} <ArrowRight class="lucide size-4" /></span>{/if}
{/snippet}

<a
	{href}
	data-slot="picture-card"
	data-line-art-host
	class={cn(
		"group flex min-w-0 flex-col gap-4 outline-none",
		!art && "rounded-2xl p-6 ring-1 ring-foreground/10 transition-shadow duration-300 hover:ring-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/60 motion-reduce:transition-none",
		layout === "split" && "lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-14",
		className,
	)}
>
	{#if art}
		<span class={cn("relative isolate block aspect-[16/10] overflow-hidden ring-1 ring-foreground/10 transition-shadow duration-300 group-hover:ring-foreground/25 group-focus-visible:ring-3 group-focus-visible:ring-ring/60 motion-reduce:transition-none", size === "xl" ? "rounded-2xl" : "rounded-xl")}>
			<LineArt kind={art} />
			{#if tag}<Tag class="absolute bottom-3 left-3">{tag}</Tag>{/if}
		</span>
	{/if}
	{#if head}
		<span class={cn("flex min-w-0 flex-col", size === "xl" ? "gap-5" : "gap-3")}>
			{@render head()}
			{@render words()}
		</span>
	{:else}
		{@render words()}
	{/if}
</a>
