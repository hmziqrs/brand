<!--
  A docs page's own title (the lab's docs page head): the trail of sections
  above it in small grey words, the title, one sentence on what the page
  covers — and the site's own rings faintly beside it, drawn from the same
  seed every time.
-->
<script lang="ts">
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import { cn } from "$brand/utils.js";
	import Rings from "$brand/components/rings.svelte";

	let {
		title,
		/** One sentence on what the page covers. */
		lede,
		/** The sections above this page: ["Docs", "Getting Started"]. */
		trail = [],
		/** The rings' seed: the site's or the product's name. */
		seed,
		class: className,
	}: { title: string; lede?: string; trail?: string[]; seed?: string; class?: string } = $props();
</script>

<div class={cn("relative", className)}>
	{#if seed}
		<Rings seed={seed} aria-hidden="true" role={undefined} class="pointer-events-none absolute -top-10 -right-4 w-60 max-w-[40%] opacity-90" />
	{/if}
	<div class="relative">
		{#if trail.length > 0}
			<p class="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
				{#each trail as step, i (step)}
					{#if i > 0}<ChevronRight class="lucide size-3.5" />{/if}
					{step}
				{/each}
			</p>
		{/if}
		<h1 class="mt-3 text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-[2.75rem]">{title}</h1>
		{#if lede}<p class="mt-3.5 max-w-[34rem] text-lg leading-relaxed text-muted-foreground">{lede}</p>{/if}
	</div>
</div>
