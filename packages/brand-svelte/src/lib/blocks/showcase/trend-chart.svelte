<!-- A trend over time as an orange line and area, the previous period dashed behind it. Hover or
     the arrow keys show a day's numbers; the chart fits its box's width. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { monotonePath, niceTicks } from "@hmziq/brand-core/charts";

	type Point = { label: string; value: number; previous?: number };

	let {
		points,
		/** What the chart shows, for screen readers and the corner: "Visitors a day". */
		label,
		height = 160,
		format = (n: number) => n.toLocaleString("en-US"),
		/** Short numbers for the axis, e.g. 1.2k. */
		axis = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`),
		names = ["This period", "Previous"],
		class: className,
	}: {
		points: Point[];
		label: string;
		height?: number;
		format?: (n: number) => string;
		axis?: (n: number) => string;
		names?: [string, string];
		class?: string;
	} = $props();

	const axisW = 36;
	const top = 8;
	const right = 8;
	const xH = 26;
	let width = $state(560);
	let hover = $state<number | null>(null);
	const hasPrev = $derived(points.some((p) => p.previous !== undefined));
	const plotW = $derived(Math.max(1, width - axisW - right));
	const plotH = $derived(height - top - xH);
	const ticks = $derived(niceTicks(0, Math.max(1, ...points.map((p) => Math.max(p.value, p.previous ?? 0))), 5));
	const yMax = $derived(ticks.at(-1) ?? 1);
	const step = $derived(points.length > 1 ? plotW / (points.length - 1) : 0);
	const xAt = (i: number) => axisW + i * step;
	const yAt = (v: number) => top + plotH * (1 - v / yMax);
	const line = $derived(monotonePath(points.map((p, i) => ({ x: xAt(i), y: yAt(p.value) }))));
	const prev = $derived(hasPrev ? monotonePath(points.map((p, i) => ({ x: xAt(i), y: yAt(p.previous ?? 0) }))) : "");
	const area = $derived(points.length ? `${line}L${xAt(points.length - 1)},${yAt(0)}L${xAt(0)},${yAt(0)}Z` : "");
	const every = $derived(Math.max(1, Math.ceil(points.length / Math.max(2, Math.floor(plotW / 70)))));
	const total = $derived(points.reduce((n, p) => n + p.value, 0));

	function move(e: PointerEvent) {
		const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
		hover = Math.min(points.length - 1, Math.max(0, Math.round((e.clientX - box.left - axisW) / (step || 1))));
	}
	function key(e: KeyboardEvent) {
		if (e.key === "Escape") return void (hover = null);
		if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
		e.preventDefault();
		const last = points.length - 1;
		const d = e.key === "ArrowRight" ? 1 : -1;
		hover = hover === null ? (d > 0 ? 0 : last) : Math.min(last, Math.max(0, hover + d));
	}
</script>

<figure data-slot="trend-chart" class={cn("flex min-w-0 flex-col gap-2", className)}>
	<figcaption class="flex flex-wrap items-center justify-between gap-2 text-xs">
		<span class="font-medium">{label}</span>
		{#if hasPrev}
			<span class="flex gap-3 text-muted-foreground"><span class="inline-flex items-center gap-1.5"><i aria-hidden="true" class="h-0.5 w-3 rounded-full bg-primary"></i>{names[0]}</span><span class="inline-flex items-center gap-1.5"><i aria-hidden="true" class="w-3 border-t-2 border-dashed border-muted-foreground"></i>{names[1]}</span></span>
		{/if}
	</figcaption>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
	<div
		bind:clientWidth={width}
		class="relative w-full rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
		style:height={`${height}px`}
		role="application"
		aria-label={`${label}: ${points.length} points, ${format(total)} in all, from ${format(points[0]?.value ?? 0)} to ${format(points.at(-1)?.value ?? 0)}. Use the arrow keys for each point.`}
		tabindex="0"
		onpointermove={move}
		onpointerleave={() => (hover = null)}
		onkeydown={key}
	>
		<svg {width} {height} aria-hidden="true" class="overflow-visible">
			{#each ticks as t (t)}
				<line x1={axisW} x2={axisW + plotW} y1={yAt(t)} y2={yAt(t)} stroke="var(--border)" />
				<text x={axisW - 8} y={yAt(t)} text-anchor="end" dominant-baseline="central" font-size="11" fill="var(--muted-foreground)">{axis(t)}</text>
			{/each}
			{#each points as p, i (i)}{#if (i % every === 0 && points.length - 1 - i >= every * 0.6) || i === points.length - 1}<text x={xAt(i)} y={top + plotH + 16} text-anchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"} font-size="11" fill="var(--muted-foreground)">{p.label}</text>{/if}{/each}
			{#if prev}<path d={prev} fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" stroke-dasharray="4 4" />{/if}
			<path d={area} fill="var(--primary)" fill-opacity="0.12" />
			<path d={line} fill="none" stroke="var(--primary)" stroke-width="2" />
			{#if hover !== null}
				<line x1={xAt(hover)} x2={xAt(hover)} y1={top} y2={top + plotH} stroke="var(--border)" />
				<circle cx={xAt(hover)} cy={yAt(points[hover].value)} r="4" fill="var(--background)" stroke="var(--primary)" stroke-width="2" />
			{/if}
		</svg>
		{#if hover !== null}
			{@const p = points[hover]}
			<div class="pointer-events-none absolute top-1 min-w-32 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl" style:left={`${Math.min(Math.max(xAt(hover) + 12, 4), Math.max(4, width - 150))}px`}>
				<p class="font-medium">{p.label}</p>
				<p class="flex justify-between gap-4"><span class="text-muted-foreground">{names[0]}</span><span class="font-medium tabular-nums">{format(p.value)}</span></p>
				{#if p.previous !== undefined}<p class="flex justify-between gap-4"><span class="text-muted-foreground">{names[1]}</span><span class="tabular-nums">{format(p.previous)}</span></p>{/if}
			</div>
		{/if}
	</div>
</figure>
