<!-- Cohort retention: a row per group of people who started together, a cell per period after,
     darker orange the more of them came back. With numbers, or compact as a picture. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	type Cohort = { label: string; size?: number; values: number[] };

	let {
		cohorts,
		/** How many periods across, start included. */
		periods = 7,
		/** What a period is called: "Week" gives Start, +1, +2… */
		unit = "Week",
		/** Show the percentages in the cells; compact shows only the colors. */
		numbers = true,
		legend = true,
		caption = "Share of each group that came back, by period",
		class: className,
	}: {
		cohorts: Cohort[];
		periods?: number;
		unit?: string;
		numbers?: boolean;
		legend?: boolean;
		caption?: string;
		class?: string;
	} = $props();

	const steps = ["bg-primary/8", "bg-primary/18", "bg-primary/35", "bg-primary/60", "bg-primary text-primary-foreground"];
	function level(v: number) {
		if (v >= 60) return 4;
		if (v >= 45) return 3;
		if (v >= 35) return 2;
		if (v >= 25) return 1;
		return 0;
	}
	const cols = $derived(Array.from({ length: periods }, (_, i) => i));
</script>

<div data-slot="retention-grid" class={cn("flex min-w-0 flex-col gap-3", className)}>
	<div class="overflow-x-auto">
		<table class="w-full border-separate border-spacing-[3px] text-center text-xs tabular-nums">
			<caption class="sr-only">{caption}</caption>
			<thead>
				<tr class="text-muted-foreground">
					<th scope="col" class="pb-1 text-left font-normal">{unit} of</th>
					{#if numbers && cohorts.some((c) => c.size !== undefined)}<th scope="col" class="pb-1 text-right font-normal">People</th>{/if}
					{#each cols as i (i)}<th scope="col" class="pb-1 font-normal">{i === 0 ? "Start" : `+${i}`}</th>{/each}
				</tr>
			</thead>
			<tbody>
				{#each cohorts as c (c.label)}
					<tr>
						<th scope="row" class="pr-2 text-left font-normal whitespace-nowrap text-muted-foreground">{c.label}</th>
						{#if numbers && c.size !== undefined}<td class="pr-2 text-right text-muted-foreground">{c.size.toLocaleString("en-US")}</td>{/if}
						{#each cols as i (i)}
							{@const v = c.values[i]}
							<td class={cn(numbers ? "h-8 min-w-10" : "aspect-square min-w-5", "rounded-[4px]", v === undefined ? "border border-dashed border-border" : steps[level(v)])}>
								{#if v !== undefined}<span class={numbers ? undefined : "sr-only"}>{v}%</span>{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	{#if legend}
		<p class="flex items-center gap-1.5 self-end text-xs text-muted-foreground" aria-hidden="true">Fewer{#each steps as s (s)}<i class={cn("size-3 rounded-[3px]", s)}></i>{/each}More</p>
	{/if}
</div>
