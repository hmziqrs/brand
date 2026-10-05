<!-- The kit's hero, centered, for products whose picture goes under the words at full width. -->
<script lang="ts">
	import Container from "$brand/blocks/site/container.svelte";
	import HeroActions from "$brand/blocks/site/hero-actions.svelte";
	import HeroLede from "$brand/blocks/site/hero-lede.svelte";
	import HeroNotes from "$brand/blocks/site/hero-notes.svelte";
	import HeroTitle from "$brand/blocks/site/hero-title.svelte";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		title,
		lede,
		actions,
		note,
		class: className,
	}: { title: Snippet; lede: Snippet; actions: Snippet; note?: Snippet; class?: string } = $props();
</script>

<Container class={cn("flex flex-col items-center gap-6 text-center", className)}>
	<HeroTitle class="max-w-[48rem]">{@render title()}</HeroTitle>
	<HeroLede class="max-w-[40rem] text-balance">{@render lede()}</HeroLede>
	<HeroActions class="justify-center">{@render actions()}</HeroActions>
	{#if note}<HeroNotes class="justify-center">{@render note()}</HeroNotes>{/if}
</Container>
