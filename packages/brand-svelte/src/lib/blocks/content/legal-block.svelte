<!--
  One block of a legal section, the lab's four kinds: a paragraph, a list,
  definitions in a lined column, or small caps for the warranty text. A
  legal document is data (its sections and their blocks), so the page maps
  this over it inside LegalSection.
-->
<script lang="ts">
	import Bullets from "$brand/blocks/site/bullets.svelte";
	import type { LegalBlock } from "./types.js";

	let { block }: { block: LegalBlock } = $props();
</script>

{#if block[0] === "ul"}
	<Bullets items={[...block[1]]} />
{:else if block[0] === "caps"}
	<p class="text-[0.8125rem] leading-[1.7] tracking-[0.02em] text-muted-foreground">{block[1]}</p>
{:else if block[0] === "defs"}
	<dl class="grid gap-3">
		{#each block[1] as [term, text] (term)}
			<div class="grid gap-0.5 border-l pl-4.5">
				<dt class="font-medium">{term}</dt>
				<dd class="text-muted-foreground">{text}</dd>
			</div>
		{/each}
	</dl>
{:else}
	<p>{block[1]}</p>
{/if}
