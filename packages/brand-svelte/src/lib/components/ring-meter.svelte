<!-- A few shares at once, as rings inside rings: the first in orange, the rest in the text
     color, each named in the list beside it. Values are 0–1. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		items,
		/** What the rings show, for screen readers: "Usage this month". */
		label,
		size = 168,
		class: className,
	}: {
		items: { label: string; value: number; detail?: string }[];
		label: string;
		size?: number;
		class?: string;
	} = $props();

	const shown = $derived(items.slice(0, 4));
	const strengths = [1, 0.85, 0.55, 0.35];
	const rings = $derived(
		shown.map((item, i) => {
			const r = 44 - i * 9;
			const c = 2 * Math.PI * r;
			const v = Math.min(1, Math.max(0, item.value));
			return { r, c, v, color: i === 0 ? "var(--primary)" : `color-mix(in oklab, var(--foreground) ${strengths[i] * 100}%, transparent)` };
		}),
	);
	const percent = (v: number) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}%`;
</script>

<figure data-slot="ring-meter" class={cn("flex flex-wrap items-center gap-8", className)}>
	<svg viewBox="0 0 100 100" role="img" aria-label={`${label}: ${shown.map((i) => `${i.label} ${percent(i.value)}`).join(", ")}`} style:width={`${size}px`} style:height={`${size}px`} class="shrink-0">
		{#each rings as ring, i (i)}
			<circle cx="50" cy="50" r={ring.r} fill="none" stroke="var(--line)" stroke-width="5" opacity="0.6" />
			<circle cx="50" cy="50" r={ring.r} fill="none" stroke={ring.color} stroke-width="5" stroke-linecap="round" stroke-dasharray={`${(ring.v * ring.c).toFixed(2)} ${ring.c.toFixed(2)}`} transform="rotate(-90 50 50)" />
		{/each}
	</svg>
	<figcaption class="flex min-w-48 flex-col gap-3">
		<span class="text-sm font-medium">{label}</span>
		<dl class="flex flex-col gap-2.5">
			{#each shown as item, i (item.label)}
				<div class="grid grid-cols-[0.75rem_minmax(0,1fr)_auto] items-baseline gap-x-3 text-sm">
					<span aria-hidden="true" class="size-2.5 translate-y-px rounded-full" style:background={rings[i].color}></span>
					<dt>{item.label}{#if item.detail}<span class="block text-xs text-muted-foreground">{item.detail}</span>{/if}</dt>
					<dd class="font-medium tabular-nums">{percent(item.value)}</dd>
				</div>
			{/each}
		</dl>
	</figcaption>
</figure>
