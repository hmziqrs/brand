<!-- A catalog to pick from: a mega title with one word in the dot face, a row of Tags beside the lede,
     then CatalogCards four across. Picking a card rings it; bind `picked` to show the pick elsewhere.
     Anything passed as children follows the catalog inside the same section. -->
<script lang="ts">
	import "@fontsource/doto";
	import type { Snippet } from "svelte";
	import type { Tone } from "@hmziq/brand-core/tones";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import CatalogCard, { type CatalogItem } from "$brand/components/catalog-card.svelte";
	import Tag from "$brand/components/tag.svelte";

	let {
		title,
		/** The word of the title set in oxide dots; it must appear in the title. */
		accent,
		/** Tags beside the lede: the tool, the count, the rule. */
		tags = [],
		lede,
		items,
		/** The picked item's id. */
		picked = $bindable(),
		onpick,
		children,
		class: className,
	}: {
		title: string;
		accent?: string;
		tags?: { label: string; tone?: Tone }[];
		lede?: string;
		items: CatalogItem[];
		picked?: string;
		onpick?: (id: string) => void;
		children?: Snippet;
		class?: string;
	} = $props();

	const parts = $derived.by(() => {
		const at = accent ? title.indexOf(accent) : -1;
		if (!accent || at < 0) return { lead: title, hit: "", tail: "" };
		return { lead: title.slice(0, at), hit: accent, tail: title.slice(at + accent.length) };
	});

	function pick(id: string) {
		picked = id;
		onpick?.(id);
	}
</script>

<section data-slot="catalog-section" class={cn("overflow-x-clip py-24 sm:py-32", className)}>
	<Container size="wide">
		<h2 class="font-sans text-[clamp(2.7rem,8.4vw,7.5rem)] leading-[0.92] font-[500] tracking-[-0.05em] text-balance text-foreground">
			{parts.lead}{#if parts.hit}<em class="[font-family:Doto,ui-monospace,monospace] text-[1.02em] font-bold tracking-[-0.04em] text-(--primary) not-italic">{parts.hit}</em>{/if}{parts.tail}
		</h2>
		{#if tags.length || lede}
			<div class="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div class="flex flex-wrap gap-2">
					{#each tags as t (t.label)}<Tag tone={t.tone}>{t.label}</Tag>{/each}
				</div>
				{#if lede}<p class="max-w-[30rem] text-[1.15rem] leading-snug text-foreground">{lede}</p>{/if}
			</div>
		{/if}
		<div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each items as item (item.id)}<CatalogCard {item} picked={picked === item.id} onpick={pick} />{/each}
		</div>
		{@render children?.()}
	</Container>
</section>
