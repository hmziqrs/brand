<!-- An alert that fired: what changed and by how much, when, the line that shows it with the drop
     marked, and what to do next. -->
<script lang="ts">
	import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
	import { cn } from "$brand/utils.js";
	import { monotonePath } from "@hmziq/brand-core/charts";
	import type { Snippet } from "svelte";

	let {
		title,
		when,
		values,
		/** The point where it changed, an index into values. */
		at,
		cause,
		actions,
		class: className,
	}: {
		title: string;
		when: string;
		values: number[];
		at: number;
		cause?: string;
		actions?: Snippet;
		class?: string;
	} = $props();

	const w = 240;
	const h = 56;
	const pts = $derived.by(() => {
		const lo = Math.min(...values);
		const span = Math.max(...values) - lo || 1;
		return values.map((v, i) => ({ x: (i / Math.max(1, values.length - 1)) * w, y: 4 + (1 - (v - lo) / span) * (h - 8) }));
	});
</script>

<div data-slot="alert-card" class={cn("flex flex-col gap-3 rounded-xl border border-warning/40 bg-warning/5 p-4 dark:bg-warning/10", className)}>
	<p class="flex items-start gap-2.5 text-sm"><TriangleAlert class="lucide mt-0.5 size-4 shrink-0 text-warning" /><span><span class="font-medium">{title}</span> <span class="text-muted-foreground">{when}</span></span></p>
	<svg viewBox={`0 0 ${w} ${h}`} class="h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
		<rect x={pts[at]?.x ?? 0} y="0" width={w - (pts[at]?.x ?? 0)} height={h} fill="var(--warning)" fill-opacity="0.08" />
		<path d={monotonePath(pts)} fill="none" stroke="var(--foreground)" stroke-opacity="0.7" stroke-width="1.5" vector-effect="non-scaling-stroke" />
		{#if pts[at]}<circle cx={pts[at].x} cy={pts[at].y} r="3.5" fill="var(--warning)" />{/if}
	</svg>
	{#if cause}<p class="text-[0.8125rem] leading-relaxed text-muted-foreground">{cause}</p>{/if}
	{#if actions}<div class="flex gap-2">{@render actions()}</div>{/if}
</div>
