<!-- The head of a feature section: a mono oxide kicker, a big title (one phrase of it can be oxide) and
     a lede in the page's own color. split puts the lede and any aside (a button, a switch) at the
     right on wide screens, stack keeps them under the title, center centres everything. md is the
     smaller head of a part inside a section, an h3 by default. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";

	let {
		kicker,
		title,
		/** The part of the title in oxide; it must appear in the title. */
		accent,
		lede,
		size = "lg",
		layout = "split",
		/** The heading's level; h2 for lg and h3 for md when left out. */
		as,
		/** Under the lede: a button, a switch. */
		aside,
		/** Extra classes on the title, e.g. a measure. */
		titleClass,
		class: className,
	}: {
		kicker?: string;
		title: string;
		accent?: string;
		lede?: string;
		size?: "lg" | "md";
		layout?: "split" | "stack" | "center";
		as?: "h2" | "h3";
		aside?: Snippet;
		titleClass?: string;
		class?: string;
	} = $props();

	const parts = $derived.by(() => {
		const at = accent ? title.indexOf(accent) : -1;
		if (!accent || at < 0) return { lead: title, hit: "", tail: "" };
		return { lead: title.slice(0, at), hit: accent, tail: title.slice(at + accent.length) };
	});
</script>

<div
	data-slot="section-head"
	class={cn(
		"grid gap-6",
		layout === "split" && "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12",
		layout === "center" && "justify-items-center text-center",
		className,
	)}
>
	<div class={cn("min-w-0", layout === "center" && "flex flex-col items-center")}>
		{#if kicker}<p class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{kicker}</p>{/if}
		<svelte:element
			this={as ?? (size === "lg" ? "h2" : "h3")}
			class={cn(
				size === "lg" ? "text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.04em]" : "text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02] tracking-[-0.035em]",
				"font-medium text-balance",
				kicker && "mt-4",
				layout === "center" && "max-w-[18ch]",
				titleClass,
			)}
		>
			{parts.lead}{#if parts.hit}<span class="text-primary">{parts.hit}</span>{/if}{parts.tail}
		</svelte:element>
	</div>
	{#if lede || aside}
		<div class={cn("flex min-w-0 flex-col items-start gap-5", layout === "split" && "lg:items-end lg:justify-self-end", layout === "center" && "items-center")}>
			{#if lede}<p class={cn("max-w-[46ch] text-lg leading-snug text-foreground", size === "lg" && "md:text-xl")}>{lede}</p>{/if}
			{@render aside?.()}
		</div>
	{/if}
</div>
