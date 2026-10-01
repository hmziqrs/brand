<!-- Features in outline cards: a thin line, no fill, an icon tile on top. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import * as Card from "$brand/ui/card/index.js";
	import IconTile from "$brand/components/icon-tile.svelte";
	import type { Snippet } from "svelte";

	let {
		items,
		class: className,
	}: { items: { icon?: Snippet; title: string; body: Snippet | string }[]; class?: string } = $props();
</script>

<div class={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
	{#each items as f (f.title)}
		<Card.Root class="gap-3 bg-transparent px-6 shadow-none">
			{#if f.icon}<IconTile>{@render f.icon()}</IconTile>{/if}
			<h3 class="text-lg font-medium tracking-[-0.01em]">{f.title}</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{#if typeof f.body === "string"}{f.body}{:else}{@render f.body()}{/if}</p>
		</Card.Root>
	{/each}
</div>
