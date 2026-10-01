<!--
  StatCards in one ruled grid: a gap-px grid on bg-border inside a rounded
  border, the way Sightline's overview draws it in the lab. The grid draws
  the rules; the cards bring their own background. Two columns on phones,
  the chosen count from sm.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		columns = 4,
		children,
		class: className,
		...rest
	}: { columns?: 2 | 3 | 4; children: Snippet; class?: string } & Record<string, unknown> = $props();

	// Written out in full, the way the kit writes tone classes, and matched
	// by SkeletonStats so a loading grid stands exactly where this one lands.
	const counts: Record<2 | 3 | 4, string> = {
		2: "sm:grid-cols-2",
		3: "sm:grid-cols-3",
		4: "sm:grid-cols-4",
	};
</script>

<div data-slot="stat-grid" class={cn("grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border", counts[columns], className)} {...rest}>
	{@render children()}
</div>
