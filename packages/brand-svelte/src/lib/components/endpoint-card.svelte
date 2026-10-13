<!-- A webhook endpoint's health: its address and state, a bar per day for the last month, the
     numbers that matter and the latest deliveries. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import StatusRing from "./status-ring.svelte";
	import CopyButton from "./copy-button.svelte";

	type Day = { date: string; delivered: number };
	type Delivery = { event: string; status: number; at: string };

	let {
		url,
		days,
		metrics,
		deliveries = [],
		class: className,
	}: {
		url: string;
		/** One per day, oldest first; `delivered` is the share delivered on the first try, 0–1. */
		days: Day[];
		metrics: [label: string, value: string][];
		deliveries?: Delivery[];
		class?: string;
	} = $props();

	const health = (d: number) => (d >= 0.995 ? "good" : d >= 0.95 ? "slow" : "down");
	const percent = (d: number) => `${(d * 100).toFixed(d >= 0.995 ? 2 : 1)}%`;
	const state = $derived(health(days.at(-1)?.delivered ?? 1));
	const word = { good: "Healthy", slow: "Some retries", down: "Failing" } as const;
	const bar = { good: "bg-foreground/25", slow: "bg-warning", down: "bg-destructive" } as const;
</script>

<article data-slot="endpoint-card" class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", className)}>
	<header class="flex flex-col gap-3 p-6">
		<div class="flex items-center justify-between gap-3">
			<p class="flex items-center gap-2 text-sm font-medium"><StatusRing state={state === "down" ? "stale" : "on"} color={state === "good" ? "var(--success)" : "var(--warning)"} />{word[state]}</p>
			<span class="text-xs text-muted-foreground">Last {days.length} days</span>
		</div>
		<div class="flex items-center gap-2 rounded-lg border py-1 pr-1 pl-3.5">
			<code class="min-w-0 flex-1 truncate font-mono text-[0.8125rem]">{url}</code>
			<CopyButton text={url} />
		</div>
	</header>
	<div class="px-6">
		<ol class="flex h-10 items-end gap-[3px]" aria-label="Delivered on the first try, one bar per day">
			{#each days as d (d.date)}
				<li class={cn("min-w-0 flex-1 rounded-[2px]", bar[health(d.delivered)])} style:height={`${Math.max(18, d.delivered * 100 - (1 - d.delivered) * 400)}%`} title={`${d.date}: ${percent(d.delivered)}`}>
					<span class="sr-only">{d.date}: {percent(d.delivered)}</span>
				</li>
			{/each}
		</ol>
		<div class="mt-1.5 flex justify-between text-[0.6875rem] text-muted-foreground"><span>{days[0]?.date}</span><span>Today</span></div>
	</div>
	<dl class="mt-5 grid border-y" style:grid-template-columns={`repeat(${metrics.length}, minmax(0, 1fr))`}>
		{#each metrics as [label, value], i (label)}
			<div class={cn("flex flex-col gap-0.5 px-6 py-4", i > 0 && "border-l")}>
				<dt class="text-xs text-muted-foreground">{label}</dt>
				<dd class="text-lg font-medium tracking-tight tabular-nums">{value}</dd>
			</div>
		{/each}
	</dl>
	{#if deliveries.length}
		<ul class="divide-y text-sm">
			{#each deliveries as d, i (i)}
				<li class="flex items-center gap-3 px-6 py-2.5">
					<span class={cn("rounded px-1.5 py-0.5 font-mono text-xs", d.status < 300 ? "bg-success/10 text-success dark:bg-success/20" : "bg-warning/10 text-warning dark:bg-warning/20")}>{d.status}</span>
					<span class="truncate font-mono text-[0.8125rem]">{d.event}</span>
					<span class="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">{d.at}</span>
				</li>
			{/each}
		</ul>
	{/if}
	<footer class="mt-auto flex gap-2 border-t p-4">
		<Button size="sm">Send a test event</Button>
		<Button size="sm" variant="outline">Pause</Button>
	</footer>
</article>
