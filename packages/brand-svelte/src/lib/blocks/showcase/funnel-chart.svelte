<!-- How many people make it through each step, and where the rest leave. columns stands the steps
     up side by side; rows lays them out with the share kept from the step before. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";

	type Step = { label: string; value: number };

	let {
		steps,
		variant = "rows",
		/** Name the step most people leave at. */
		callout = true,
		format = (n: number) => n.toLocaleString("en-US"),
		class: className,
	}: {
		steps: Step[];
		variant?: "rows" | "columns";
		callout?: boolean;
		format?: (n: number) => string;
		class?: string;
	} = $props();

	const first = $derived(steps[0]?.value || 1);
	const share = (v: number) => Math.round((v / first) * 100);
	const drop = $derived.by(() => {
		let worst = { at: 0, lost: 0 };
		steps.forEach((s, i) => {
			if (!i) return;
			const lost = 1 - s.value / steps[i - 1].value;
			if (lost > worst.lost) worst = { at: i, lost };
		});
		return worst;
	});
	const summary = $derived(steps.map((s) => `${s.label} ${share(s.value)}%`).join(", "));
</script>

<figure data-slot="funnel-chart" data-variant={variant} class={cn("flex min-w-0 flex-col gap-4", className)}>
	{#if variant === "columns"}
		<ul class="grid items-end gap-2" style:grid-template-columns={`repeat(${steps.length}, minmax(0, 1fr))`} aria-label={`Funnel: ${summary}`}>
			{#each steps as s, i (s.label)}
				<li class="flex flex-col gap-2">
					<span class="flex h-28 items-end" aria-hidden="true"><i class={cn("block w-full rounded-t-[4px]", callout && i !== drop.at ? "bg-primary/70" : "bg-primary")} style:height={`${Math.max(share(s.value), 4)}%`}></i></span>
					<span class="text-xs leading-snug text-muted-foreground">{s.label} <span class="text-foreground tabular-nums">{share(s.value)}%</span></span>
				</li>
			{/each}
		</ul>
	{:else}
		<ol class="flex flex-col gap-4">
			{#each steps as s, i (s.label)}
				<li class="flex flex-col gap-1.5">
					<span class="flex items-baseline justify-between gap-3 text-xs">
						<span><span class="mr-2 text-muted-foreground tabular-nums">{i + 1}</span>{s.label}</span>
						<span class="text-muted-foreground tabular-nums">{format(s.value)}{#if i > 0}<span class={cn("ml-2", i === drop.at && callout && "text-foreground")}>{Math.round((s.value / steps[i - 1].value) * 100)}% kept</span>{/if}</span>
					</span>
					<span class="h-7 overflow-hidden rounded-[4px] bg-foreground/5" aria-hidden="true"><i class="block h-full rounded-[4px] bg-primary" style:width={`${(s.value / first) * 100}%`}></i></span>
				</li>
			{/each}
		</ol>
	{/if}
	{#if callout && drop.at > 0}
		<figcaption class="flex items-center gap-2 text-xs text-muted-foreground"><Marker class="text-warning" />The biggest drop is before “{steps[drop.at].label}”: {Math.round(drop.lost * 100)}% leave there.</figcaption>
	{/if}
</figure>
