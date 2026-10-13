<!-- A year (or a few months) of activity, a square per day in weeks of seven, darker orange on busier
     days, with the months above and a legend. The squares grow to fill the width it's given. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		days,
		/** The date of the first value, YYYY-MM-DD. */
		start,
		label = "Activity",
		unit = "contributions",
		class: className,
	}: {
		days: number[];
		start: string;
		label?: string;
		unit?: string;
		class?: string;
	} = $props();

	const steps = ["bg-foreground/6", "bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-primary"];
	const first = $derived(new Date(`${start}T00:00:00Z`));
	const offset = $derived(first.getUTCDay());
	const max = $derived(Math.max(1, ...days));
	const level = (v: number) => (v === 0 ? 0 : Math.min(4, 1 + Math.floor((v / max) * 3.999)));
	const weeks = $derived(Math.ceil((days.length + offset) / 7));
	const dateOf = (i: number) => new Date(first.getTime() + i * 86400000);
	const months = $derived.by(() => {
		const out: { week: number; name: string }[] = [];
		let last = -1;
		for (let w = 0; w < weeks; w++) {
			const d = dateOf(Math.max(0, w * 7 - offset));
			if (d.getUTCMonth() !== last) {
				last = d.getUTCMonth();
				out.push({ week: w, name: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) });
			}
		}
		return out;
	});
	const total = $derived(days.reduce((a, b) => a + b, 0));
</script>

<figure data-slot="activity-heatmap" class={cn("flex min-w-0 flex-col gap-2", className)}>
	<figcaption class="flex items-baseline justify-between gap-3 text-xs"><span class="font-medium">{label}</span><span class="text-muted-foreground tabular-nums">{total.toLocaleString("en-US")} {unit}</span></figcaption>
	<div class="overflow-x-auto pb-1">
		<div class="grid w-full gap-[3px]" style:min-width={`${weeks * 9}px`} style:grid-template-columns={`repeat(${weeks}, minmax(0, 1fr))`} role="img" aria-label={`${label}: ${total} ${unit} over ${days.length} days`}>
			{#each months as m (m.week)}<span class="pb-1 text-[0.6875rem] leading-none whitespace-nowrap text-muted-foreground" style:grid-column={`${m.week + 1} / span 4`} style:grid-row="1">{m.name}</span>{/each}
			{#each days as v, i (i)}
				<i class={cn("aspect-square rounded-[22%]", steps[level(v)])} style:grid-column={`${Math.floor((i + offset) / 7) + 1}`} style:grid-row={`${((i + offset) % 7) + 2}`} title={`${dateOf(i).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}: ${v}`}></i>
			{/each}
		</div>
	</div>
	<p class="flex items-center gap-1.5 self-end text-xs text-muted-foreground" aria-hidden="true">Less{#each steps as s (s)}<i class={cn("size-3 rounded-[3px]", s)}></i>{/each}More</p>
</figure>
