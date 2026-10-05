<!-- What's included: a filled orange ring before each item. Plans and "what you get" lists. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let { items, class: className }: { items: (Snippet | string)[]; class?: string } = $props();
</script>

<ul class={cn("flex flex-col gap-3", className)}>
	{#each items as f, i (i)}
		<li class="grid grid-cols-[0.55rem_minmax(0,1fr)] items-baseline gap-3 text-sm text-muted-foreground">
			<Marker filled class="text-primary" />
			{#if typeof f === "string"}{f}{:else}<span>{@render f()}</span>{/if}
		</li>
	{/each}
</ul>
