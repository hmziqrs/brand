<!-- Before and after: the old way struck through, then what the product does instead. -->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let {
		/** Each row: what it's about, the old way, the new way. */
		rows,
		/** For screen readers: "By hand", "With gpui-query". */
		before,
		after,
	}: {
		rows: readonly (readonly [what: string, before: Snippet | string, after: Snippet | string])[];
		before: string;
		after: string;
	} = $props();
</script>

<ul class="border-t">
	{#each rows as [what, raw, ours] (what)}
		<li class="grid items-baseline gap-x-4 gap-y-1 border-b py-4 text-[0.9rem] lg:grid-cols-[16rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)]">
			<span class="text-[0.8125rem] text-muted-foreground">{what}</span>
			<s class="text-muted-foreground decoration-muted-foreground/70">
				<span class="sr-only">{before}: </span>
				{#if typeof raw === "string"}{raw}{:else}{@render raw()}{/if}
			</s>
			<ArrowRight aria-hidden="true" class="lucide hidden size-3.75 text-muted-foreground lg:block" />
			<span class="inline-flex items-center gap-2">
				<Marker filled class="shrink-0 text-primary" />
				<span class="sr-only">{after}: </span>
				{#if typeof ours === "string"}{ours}{:else}{@render ours()}{/if}
			</span>
		</li>
	{/each}
</ul>
