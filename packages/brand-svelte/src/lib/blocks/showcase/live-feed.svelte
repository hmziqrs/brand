<!-- What people are doing right now, newest first: when, a ring for how it went, who and what.
     The header counts who's here with a live ring. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";
	import StatusRing from "$brand/components/status-ring.svelte";

	type Event = { id: string; when: string; who: string; what: string; tone?: "success" | "warning" };

	let {
		events,
		online,
		/** Show at most this many; the rest scroll. */
		limit = 7,
		class: className,
	}: {
		events: Event[];
		/** People here now, for the header. */
		online?: number;
		limit?: number;
		class?: string;
	} = $props();
</script>

<div data-slot="live-feed" class={cn("flex min-w-0 flex-col gap-3", className)}>
	{#if online !== undefined}<p class="flex items-center gap-2 text-xs text-muted-foreground"><StatusRing color="var(--success)" /><span><span class="font-medium text-foreground tabular-nums">{online}</span> people here right now</span></p>{/if}
	<ul aria-live="polite" class="flex flex-col divide-y overflow-hidden rounded-lg border">
		{#each events.slice(0, limit) as e (e.id)}
			<li class="grid grid-cols-[2.75rem_0.55rem_minmax(0,1fr)] items-baseline gap-2.5 px-3.5 py-2.5 text-xs">
				<span class="text-muted-foreground tabular-nums">{e.when}</span>
				<Marker filled={Boolean(e.tone)} class={e.tone === "success" ? "text-success" : e.tone === "warning" ? "text-warning" : "text-muted-foreground"} />
				<span class="truncate">{e.who} <span class="text-muted-foreground">{e.what}</span></span>
			</li>
		{/each}
	</ul>
</div>
