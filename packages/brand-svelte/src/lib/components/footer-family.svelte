<!-- The "More from hmziq" row every hmziq footer carries: each other site in the family with its
     mark, under a mono oxide label. -->
<script lang="ts">
	import { family } from "@hmziq/brand-core/family";
	import { cn } from "$brand/utils.js";
	import Mark from "./mark.svelte";
	import { footerLabel, footerLink } from "./footer-ui.js";

	let {
		/** This site's family id or name, left out of the row. */
		site,
		class: className,
	}: { site?: string; class?: string } = $props();

	const others = $derived(family.filter((f) => f.id !== site && f.name !== site));
</script>

<div data-slot="footer-family" class={cn("flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10", className)}>
	<h2 class={cn(footerLabel, "shrink-0")}>More from hmziq</h2>
	<ul class="flex flex-wrap gap-x-6 gap-y-3">
		{#each others as f (f.id)}
			<li><a href={f.href} class={cn(footerLink, "inline-flex items-center gap-2 text-[15px]")}><Mark symbol={f.symbol} size={20} />{f.name}</a></li>
		{/each}
	</ul>
</div>
