<!-- One number with how it moved: the label, the figure, and the change in green or red with an
     arrow. Plain for a row of stats; card puts it in an outline tile. -->
<script lang="ts">
	import ArrowDownRight from "@lucide/svelte/icons/arrow-down-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { cn } from "$brand/utils.js";

	let {
		label,
		value,
		/** Change in percent; positive is up. */
		delta,
		/** When a fall is good news (costs, errors), flip the colors. */
		lowerIsBetter = false,
		/** What the change is measured against: "vs last month". */
		against,
		variant = "plain",
		class: className,
	}: {
		label: string;
		value: string;
		delta?: number;
		lowerIsBetter?: boolean;
		against?: string;
		variant?: "plain" | "card";
		class?: string;
	} = $props();

	const up = $derived((delta ?? 0) >= 0);
	const good = $derived(lowerIsBetter ? !up : up);
</script>

<div data-slot="kpi-stat" class={cn("flex flex-col gap-1", variant === "card" && "rounded-xl p-5 ring-1 ring-foreground/10", className)}>
	<span class="text-xs text-muted-foreground">{label}</span>
	<span class="flex flex-wrap items-baseline gap-x-2">
		<span class={cn("font-medium tracking-[-0.02em] tabular-nums", variant === "card" ? "text-3xl" : "text-xl")}>{value}</span>
		{#if delta !== undefined}
			<span class={cn("inline-flex items-center gap-0.5 text-xs font-medium tabular-nums", good ? "text-success" : "text-destructive")}>
				{#if up}<ArrowUpRight class="lucide size-3.5" />{:else}<ArrowDownRight class="lucide size-3.5" />{/if}{Math.abs(delta)}%<span class="sr-only">{up ? " up" : " down"}</span>
			</span>
		{/if}
	</span>
	{#if against}<span class="text-xs text-muted-foreground">{against}</span>{/if}
</div>
