<!-- A headline with one phrase of it in oxide (the display shade in light mode). -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		title,
		/** The part of the title to color; it must appear in the title. */
		accent,
		as = "h1",
		class: className,
	}: { title: string; accent?: string; as?: "h1" | "h2" | "p"; class?: string } = $props();

	const parts = $derived.by(() => {
		const at = accent ? title.indexOf(accent) : -1;
		if (!accent || at < 0) return { lead: title, hit: "", tail: "" };
		return { lead: title.slice(0, at), hit: accent, tail: title.slice(at + accent.length) };
	});
</script>

<svelte:element this={as} data-slot="accent-title" class={cn("text-balance", className)}>{parts.lead}{#if parts.hit}<span class="text-primary">{parts.hit}</span>{/if}{parts.tail}</svelte:element>
