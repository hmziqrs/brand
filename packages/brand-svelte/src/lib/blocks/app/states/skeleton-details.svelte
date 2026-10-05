<!--
  A skeleton for a DetailList: `rows` rows of a muted-width label on the
  left and a value on the right, divided like the real rows, so the values
  land where the skeletons stood. The bars carry the rows' own heights —
  `h-5` is `text-sm`'s line box, `w-40` the label's width — and each row
  carries DetailList's own classes, stacking label over value below `sm`
  the way the real rows do, so the panel is already the size the record
  will make it at every width.
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
		<!-- DetailList's own row classes, so the skeleton stacks below `sm`
		     exactly where the real rows will. -->
		<div class="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
			<Skeleton class="h-5 w-40 shrink-0" />
			<Skeleton class="h-5 w-44" />
		</div>
	{/each}
</div>
