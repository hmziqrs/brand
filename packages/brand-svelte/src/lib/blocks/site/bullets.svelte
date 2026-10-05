<!-- A list with orange rings for bullets. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let { items, class: className }: { items: (Snippet | string)[]; class?: string } = $props();
</script>

<ul class={cn("flex flex-col gap-2.5", className)}>
	{#each items as item, i (i)}
		<li class="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3">
			<Marker class="-translate-y-[0.1em] text-primary" />
			{#if typeof item === "string"}{item}{:else}<span>{@render item()}</span>{/if}
		</li>
	{/each}
</ul>
