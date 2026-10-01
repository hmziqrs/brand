<!--
  A skeleton for a whole table: a header row and `rows` body rows over the
  given column widths (percent strings, one per column), the same shape as
  the AppTableFrame it stands for.
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";

	let {
		rows = 5,
		columns = ["40%", "20%", "20%", "20%"],
		class: className,
	}: {
		rows?: number;
		columns?: string[];
		class?: string;
	} = $props();

	// The widths come as data, so they go inline: no class names are built
	// at render time for Tailwind to miss.
	const tracks = $derived(`grid-template-columns: ${columns.join(" ")}`);
</script>

<div data-slot="skeleton-table" class={cn("overflow-hidden rounded-xl border border-border", className)} aria-hidden="true">
	<div class="grid gap-4 border-b border-border px-4 py-2.5" style={tracks}>
		{#each columns as _}
			<Skeleton class="h-3.5" />
		{/each}
	</div>
	{#each Array.from({ length: rows }) as _}
		<div class="grid gap-4 border-b border-border px-4 py-4 last:border-b-0" style={tracks}>
			{#each columns as _}
				<Skeleton class="h-4" />
			{/each}
		</div>
	{/each}
</div>
