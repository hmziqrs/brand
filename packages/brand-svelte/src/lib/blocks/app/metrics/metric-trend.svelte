<!--
  Which way a number moved, and whether that's good: the arrow follows the
  direction, the color follows the meaning, and the words always carry a
  sign. Screen readers hear the direction spelled out ("Up 12% vs last 30
  days"), so the color and the arrow are never the only signal.
-->
<script lang="ts">
	import ArrowDownRight from "@lucide/svelte/icons/arrow-down-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import Minus from "@lucide/svelte/icons/minus";
	import { cn } from "$brand/utils.js";
	import type { MetricTrendProps } from "./types.js";

	let {
		change,
		good = "up",
		format = "percent",
		comparison,
		class: className,
		...rest
	}: MetricTrendProps & { class?: string } & Record<string, unknown> = $props();

	const direction = $derived(change > 0 ? "up" : change < 0 ? "down" : "flat");
	const Icon = $derived(direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus);

	// Grey unless the direction means something: moving the good way is
	// success, moving the wrong way is destructive.
	const tone = $derived(
		direction === "flat" || good === "neither"
			? "text-muted-foreground"
			: direction === good
				? "text-success"
				: "text-destructive",
	);

	// The magnitude without its sign, scaled by the format. The sign itself
	// is written by hand so it's always there, and always the typographic
	// minus the plan spells: "+12%", "−3%", "No change".
	const suffix = $derived(format === "percent" ? "%" : format === "points" ? " points" : "");
	const magnitude = $derived.by(() => {
		const n = format === "percent" ? Math.abs(change) * 100 : Math.abs(change);
		return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
	});
	const text = $derived(direction === "flat" ? "No change" : `${change > 0 ? "+" : "−"}${magnitude}${suffix}`);

	// What the whole thing reads as, for screen readers: the plan's exact
	// words, "Up 12% vs last 30 days".
	const spoken = $derived(
		direction === "flat"
			? `No change${comparison ? ` ${comparison}` : ""}`
			: `${direction === "up" ? "Up" : "Down"} ${magnitude}${suffix}${comparison ? ` ${comparison}` : ""}`,
	);
</script>

<span data-slot="metric-trend" class={cn("inline-flex items-center gap-1.5", className)} {...rest}>
	<span class={cn("inline-flex items-center gap-0.5 text-xs font-medium whitespace-nowrap", tone)} aria-hidden="true">
		<Icon class="lucide size-3.5 shrink-0" />
		{text}
	</span>
	{#if comparison}
		<span class="text-xs whitespace-nowrap text-muted-foreground" aria-hidden="true">{comparison}</span>
	{/if}
	<span class="sr-only">{spoken}</span>
</span>
