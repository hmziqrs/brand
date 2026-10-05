<!--
  A skeleton for a run of text: `lines` lines of it, the last one shorter,
  the same height and spacing as the paragraph it stands for so nothing
  shifts when the text arrives.
-->
<script lang="ts">
	import { Skeleton } from "$brand/ui/skeleton/index.js";
	import { cn } from "$brand/utils.js";

	let {
		lines = 3,
		class: className,
	}: {
		lines?: number;
		class?: string;
	} = $props();
</script>

<div data-slot="skeleton-text" class={cn("flex flex-col gap-2.5", className)} aria-hidden="true">
	{#each Array.from({ length: lines }) as _, at}
		<Skeleton class={cn("h-4", at === lines - 1 && lines > 1 ? "w-2/3" : "w-full")} />
	{/each}
</div>
