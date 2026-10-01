<!--
  A skeleton for a DetailList: `rows` rows of a muted-width label on the
  left and a value on the right, divided like the real rows, so the values
  land where the skeletons stood.
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";

	let {
		rows = 4,
		class: className,
	}: {
		rows?: number;
		class?: string;
	} = $props();
</script>

<div data-slot="skeleton-details" class={cn("flex flex-col divide-y divide-border", className)} aria-hidden="true">
	{#each Array.from({ length: rows }) as _}
		<div class="flex items-center justify-between gap-6 py-3.5">
			<Skeleton class="h-4 w-28 shrink-0" />
			<Skeleton class="h-4 w-44" />
		</div>
	{/each}
</div>
