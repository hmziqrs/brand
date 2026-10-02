<!--
  A skeleton for a DetailList: `rows` rows of a muted-width label on the
  left and a value on the right, divided like the real rows, so the values
  land where the skeletons stood. The bars carry the rows' own heights —
  `h-5` is `text-sm`'s line box, `w-40` the label's width — so the panel
  is already the size the record will make it.
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
			<Skeleton class="h-5 w-40 shrink-0" />
			<Skeleton class="h-5 w-44" />
		</div>
	{/each}
</div>
