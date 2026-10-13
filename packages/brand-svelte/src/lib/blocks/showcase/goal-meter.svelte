<!-- A target for a period and how far along it is: a ring that fills, the share, and whether the
     pace will get there by the end. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import RingGauge from "$brand/components/ring-gauge.svelte";
	import Marker from "$brand/components/marker.svelte";

	let {
		label,
		current,
		target,
		/** How much of the period has passed, 0–1, to judge the pace. */
		elapsed,
		unit = "",
		class: className,
	}: {
		label: string;
		current: number;
		target: number;
		elapsed?: number;
		unit?: string;
		class?: string;
	} = $props();

	const share = $derived(Math.min(1, current / Math.max(1, target)));
	const pace = $derived(elapsed === undefined ? undefined : share >= elapsed);
</script>

<div data-slot="goal-meter" class={cn("flex items-center gap-4", className)}>
	<RingGauge value={share} tone={pace === false ? "warning" : "primary"} />
	<div class="flex flex-col gap-0.5">
		<span class="text-[1.75rem] leading-none font-medium tracking-[-0.03em] tabular-nums">{Math.round(share * 100)}%</span>
		<span class="text-sm text-muted-foreground">{current.toLocaleString("en-US")} of {target.toLocaleString("en-US")}{unit ? ` ${unit}` : ""} · {label}</span>
		{#if pace !== undefined}<span class="flex items-center gap-1.5 text-xs"><Marker filled class={pace ? "text-success" : "text-warning"} />{pace ? "On pace" : "Behind pace"}</span>{/if}
	</div>
</div>
