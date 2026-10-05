<!--
  One full-width row for a state inside the table: an empty state, no
  results, an error. The header stays visible above it, so the reader can
  still see what they're looking at.
-->
<script lang="ts">
	import { Cell, Row } from "$brand/ui/table/index.js";
	import { cn } from "$brand/utils.js";

	let {
		colSpan,
		class: className,
		children,
		...rest
	}: {
		colSpan: number;
		class?: string;
		children: import("svelte").Snippet;
	} & Record<string, unknown> = $props();
</script>

<Row data-slot="table-state-row" class={cn("hover:bg-transparent", className)} {...rest}>
	<Cell colspan={colSpan} class="p-0">
		{@render children()}
	</Cell>
</Row>
