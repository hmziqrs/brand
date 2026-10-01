<script lang="ts">
	import { cn } from "$brand/utils.js";
	import IconTile from "$brand/components/icon-tile.svelte";
	import type { Snippet } from "svelte";

	let { items, columns = 3 }: { items: { icon?: Snippet; title: string; body: Snippet | string }[]; columns?: 2 | 3 } = $props();
</script>

<div class={cn("grid gap-x-10 gap-y-10 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
	{#each items as f (f.title)}
		<div class="flex flex-col gap-3">
			{#if f.icon}<IconTile>{@render f.icon()}</IconTile>{/if}
			<h3 class="font-medium">{f.title}</h3>
			<p class="text-sm leading-relaxed text-muted-foreground">{#if typeof f.body === "string"}{f.body}{:else}{@render f.body()}{/if}</p>
		</div>
	{/each}
</div>
