<!-- A hero stage: thin rings off two edges, one of them oxide, and a few faint stars. Moving the
     pointer anywhere on the page drifts the stars one way and the rings the other. The quietest
     stage. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { driftRingField, isAccentRing, ringFieldSets, ringFieldStars, setTransform, starAt } from "@hmziq/brand-core/motion/ring-field";

	let { class: className }: { class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let mx = $state(0);
	let my = $state(0);

	$effect(() => {
		if (!host) return;
		return driftRingField(host, (x, y) => {
			mx = x;
			my = y;
		});
	});
</script>

<div bind:this={host} data-slot="ring-field" aria-hidden="true" class={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
	<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 h-full w-full">
		{#each ringFieldStars as s, i (i)}
			{@const at = starAt(s, mx, my)}
			<circle data-star={i} cx={at.cx} cy={at.cy} r={s.r} class="fill-foreground/40" />
		{/each}
		{#each ringFieldSets as set, i (i)}
			<g data-ring-set={i} transform={setTransform(set, mx, my)}>
				{#each set.radii as r, j (r)}
					<circle cx={set.cx} cy={set.cy} {r} fill="none" vector-effect="non-scaling-stroke" stroke-width="1" class={isAccentRing(i, j) ? "stroke-primary/70" : "stroke-line"} />
				{/each}
			</g>
		{/each}
	</svg>
</div>
