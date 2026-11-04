<!-- The picture card: a line drawing in a thin ring with a Tag on it, then the title, a short dek and a
     line of meta. The whole card is the link and the drawing follows the cursor across it. -->
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
	import { cn } from "$brand/utils.js";
	import LineArt from "./line-art.svelte";
	import Tag from "./tag.svelte";

	let { title, dek, meta, tag, art, href = "#", class: className }: Omit<PictureItem, "group"> & { class?: string } = $props();
</script>

<a {href} data-slot="picture-card" data-line-art-host class={cn("group flex min-w-0 flex-col gap-4 outline-none", className)}>
	<span class="relative isolate block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-300 group-hover:ring-foreground/25 group-focus-visible:ring-3 group-focus-visible:ring-ring/60">
		<LineArt kind={art} />
		{#if tag}<Tag class="absolute bottom-3 left-3">{tag}</Tag>{/if}
	</span>
	<span class="text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">{title}</span>
	{#if dek}<span class="line-clamp-3 text-base leading-snug text-foreground/85">{dek}</span>{/if}
	{#if meta}<span class="mt-auto text-sm text-foreground/75">{meta}</span>{/if}
</a>
