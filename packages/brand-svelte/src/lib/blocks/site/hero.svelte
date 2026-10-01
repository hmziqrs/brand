<!--
  The landing hero: the words, the buttons and their notes, with the product
  beside them or under them. Same sizes everywhere; the parts are separate
  pieces for heroes laid out another way.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "./container.svelte";
	import HeroTitle from "./hero-title.svelte";
	import HeroLede from "./hero-lede.svelte";
	import HeroActions from "./hero-actions.svelte";
	import HeroNotes from "./hero-notes.svelte";
	import type { Snippet } from "svelte";

	let {
		/** A small grey word above the title: "About", "FAQ". */
		kicker,
		title,
		lede,
		actions,
		note,
		aside,
		/** "wide" gives a product beside the words more room than the words, from lg up. */
		asideSize = "half",
		/** Under the text at full width, e.g. a live demo. */
		below,
	}: {
		kicker?: Snippet;
		title: Snippet;
		lede: Snippet;
		actions?: Snippet;
		note?: Snippet;
		aside?: Snippet;
		asideSize?: "half" | "wide";
		below?: Snippet;
	} = $props();

	const wide = $derived(Boolean(aside) && asideSize === "wide");
</script>

<Container class={cn("grid items-center gap-10 md:gap-12", aside && !wide && "md:grid-cols-2", wide && "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]")}>
	<div class="flex max-w-xl flex-col gap-6">
		{#if kicker}<p class="-mb-2 text-[0.8125rem] text-muted-foreground">{@render kicker()}</p>{/if}
		<HeroTitle size={wide ? "compact" : "default"}>{@render title()}</HeroTitle>
		<HeroLede>{@render lede()}</HeroLede>
		{#if actions}<HeroActions>{@render actions()}</HeroActions>{/if}
		{#if note}<HeroNotes>{@render note()}</HeroNotes>{/if}
	</div>
	{#if aside}<div class="min-w-0">{@render aside()}</div>{/if}
	{#if below}<div class="mt-2 min-w-0 md:col-span-full">{@render below()}</div>{/if}
</Container>
