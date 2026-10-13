<!-- A bento grid: six columns on wide screens, four on tablets, one on phones. Tiles say how many
     columns and rows they take (BentoTile). -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<div data-slot="bento" class={cn("grid grid-flow-row-dense auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-6", className)}>
	{@render children()}
</div>
