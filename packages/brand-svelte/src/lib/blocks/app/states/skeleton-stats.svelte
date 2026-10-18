<!--
  A skeleton for a run of stat cards: `count` outline cards in the grid
  StatGrid draws, three lines each — the label, the number
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
	class={cn("grid grid-cols-2 gap-3", columns[count] ?? columns[4], className)}
	aria-hidden="true"
>
	{#each Array.from({ length: count }) as _, i (i)}
		<!-- The three lines at their landed heights — text-sm's 20px, the
		     number's 32px, MetricTrend's 16px line, which wraps to a second
		     line on narrow cards as its comparison does — so the cell is as
		     tall as the card that lands in it. -->
		<div class="flex flex-col gap-2.5 rounded-xl border border-border px-4 py-4">
			<Skeleton class="h-5 w-24" />
			<Skeleton class="h-8 w-20" />
			<div class="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
				<Skeleton class="h-4 w-14" />
				<Skeleton class="h-4 w-20" />
			</div>
		</div>
	{/each}
</div>
