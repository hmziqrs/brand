<!--
  A skeleton for a run of stat cards: `count` cells in the gap-px grid on
  bg-border that StatGrid draws, three lines each — the label, the number
  and the trend line the cards land (the same two skeleton lines StatCard's
  own pending draws) — so the real cards land where the skeletons stood.
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";

	let {
		count = 4,
		class: className,
	}: {
		count?: number;
		class?: string;
	} = $props();

	// The grid for each count, written out in full.
	const columns: Record<number, string> = {
		2: "sm:grid-cols-2",
		3: "sm:grid-cols-3",
		4: "sm:grid-cols-4",
	};
</script>

<div
	data-slot="skeleton-stats"
	class={cn("grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border", columns[count] ?? columns[4], className)}
	aria-hidden="true"
>
	{#each Array.from({ length: count }) as _, i (i)}
		<!-- The three lines at their landed heights — text-sm's 20px, the
		     number's 32px, MetricTrend's 16px — so the cell is as tall as
		     the card that lands in it. -->
		<div class="flex flex-col gap-2.5 bg-background px-4 py-4">
			<Skeleton class="h-5 w-24" />
			<Skeleton class="h-8 w-20" />
			<Skeleton class="h-4 w-14" />
		</div>
	{/each}
</div>
