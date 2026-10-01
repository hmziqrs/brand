<!--
  Loading rows for inside a table body: the header stays visible while the
  rows wait. Each cell is the width of the column it stands for, so nothing
  shifts when the data arrives. Decorative — the surrounding loading state
  carries the accessible story.
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { Cell, Row } from "$brand/ui/table/index.js";

	let {
		rows = 5,
		/** Column widths, e.g. ["40%", "20%", "20%", "20%"]. */
		columns,
		class: className,
	}: {
		rows?: number;
		columns: string[];
		class?: string;
	} = $props();

	// Widths come as data, so they go inline: no class names are built at
	// render time for Tailwind to miss.
	const widths = $derived(columns.map((width) => `width: ${width}`));
</script>

{#each Array.from({ length: rows }) as _, row (row)}
	<Row data-slot="table-skeleton-rows" class={className} aria-hidden="true">
		{#each widths as width, column (column)}
			<Cell style={width} class="px-4 py-3.5">
				<Skeleton class="h-4 w-full" />
			</Cell>
		{/each}
	</Row>
{/each}
