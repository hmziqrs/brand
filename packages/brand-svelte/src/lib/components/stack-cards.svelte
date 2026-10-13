<!-- Cards that stick as you scroll and stack, each one sliding over the last with a little of it
     still showing: steps, chapters, a story in parts. Plain sticky positioning; no hover motion. -->
<script lang="ts" generics="T">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		items,
		/** Where the first card sticks, from the top of the window. */
		top = "6rem",
		/** How much of each covered card still shows. */
		step = "1.25rem",
		/** Scroll room after the last card, so the full stack stays a while. */
		linger = "40vh",
		card,
		class: className,
	}: {
		items: T[];
		top?: string;
		step?: string;
		linger?: string;
		card: Snippet<[item: T, index: number]>;
		class?: string;
	} = $props();
</script>

<ol data-slot="stack-cards" class={cn("flex flex-col gap-[30vh]", className)} style:padding-bottom={linger}>
	{#each items as item, i (i)}
		<li class="sticky" style:top={`calc(${top} + ${i} * ${step})`}>
			<div class="overflow-hidden rounded-xl bg-background ring-1 ring-foreground/10">{@render card(item, i)}</div>
		</li>
	{/each}
</ol>
