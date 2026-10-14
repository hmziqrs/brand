<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	type Stream = { label: string; value: string; /** A share from 0 to 1 that sets the thickness of its line. */ share: number };

	let {
		caption,
		title,
		lede,
		hub,
		inputs = [],
		outputs = [],
		actions,
		class: className,
	}: {
		caption: string;
		title: string;
		lede?: string;
		hub: string;
		inputs?: Stream[];
		outputs?: Stream[];
		actions?: Snippet;
		class?: string;
	} = $props();

	const W = 600;
	const hubX = W / 2;
	const H = $derived(Math.max(360, Math.max(inputs.length, outputs.length) * 40));
	const hubY = $derived(H / 2);
	const hubR = 52;
	const slots = (n: number) => Array.from({ length: n }, (_, i) => (H * (i + 0.5)) / n);
	const inY = $derived(slots(inputs.length));
	const outY = $derived(slots(outputs.length));
	const stroke = (share: number) => (0.75 + share * 11).toFixed(2);

	const inPath = (i: number) => `M 112 ${inY[i].toFixed(1)} C 220 ${inY[i].toFixed(1)}, 230 ${hubY}, ${hubX - hubR} ${hubY}`;
	const outPath = (i: number) => `M ${hubX + hubR} ${hubY} C 370 ${hubY}, 380 ${outY[i].toFixed(1)}, 488 ${outY[i].toFixed(1)}`;
</script>

<section data-slot="flow-section" class={cn("relative isolate", className)}>
	<Container size="wide" class="flex flex-col gap-12 py-16 md:py-24">
		<div class="flex max-w-2xl flex-col gap-4">
			<p class="flex items-center gap-2 text-[0.8125rem] font-medium text-primary"><Marker />{caption}</p>
			<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-[2.6rem]">{title}</h2>
			{#if lede}<p class="text-[1.0625rem] leading-relaxed text-muted-foreground">{lede}</p>{/if}
			{#if actions}<div class="mt-1 flex flex-wrap gap-3">{@render actions()}</div>{/if}
		</div>

		<figure class="hidden md:block">
			<div class="relative w-full" style={`aspect-ratio: ${W} / ${H};`}>
				<svg viewBox={`0 0 ${W} ${H}`} class="absolute inset-0 size-full overflow-visible" aria-hidden="true">
					{#each inputs as s, i (s.label)}
						<path d={inPath(i)} fill="none" stroke="var(--primary)" stroke-opacity="0.55" stroke-width={stroke(s.share)} stroke-linecap="round" />
					{/each}
					{#each outputs as s, i (s.label)}
						<path d={outPath(i)} fill="none" stroke="var(--muted-foreground)" stroke-opacity="0.5" stroke-width={stroke(s.share)} stroke-linecap="round" />
					{/each}
					<circle cx={hubX} cy={hubY} r={hubR} fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />
					<circle cx={hubX} cy={hubY} r={hubR - 14} fill="none" stroke="var(--border)" stroke-width="1" />
				</svg>
				<span class="absolute text-center text-sm font-medium" style={`left: ${(hubX / W) * 100}%; top: ${(hubY / H) * 100}%; transform: translate(-50%, -50%);`}>{hub}</span>
				{#each inputs as s, i (s.label)}
					<div class="absolute w-[17%] -translate-y-1/2 text-right" style={`left: 0; top: ${(inY[i] / H) * 100}%;`}>
						<span class="block text-sm font-medium tabular-nums">{s.value}</span>
						<span class="block text-xs leading-tight text-muted-foreground">{s.label}</span>
					</div>
				{/each}
				{#each outputs as s, i (s.label)}
					<div class="absolute w-[17%] -translate-y-1/2 text-left" style={`right: 0; top: ${(outY[i] / H) * 100}%;`}>
						<span class="block text-sm font-medium tabular-nums">{s.value}</span>
						<span class="block text-xs leading-tight text-muted-foreground">{s.label}</span>
					</div>
				{/each}
			</div>
		</figure>

		<div class="grid gap-6 md:hidden">
			{#each [inputs, outputs] as list, g (g)}
				<ul class="grid gap-px overflow-hidden rounded-xl border bg-border">
					{#each list as s (s.label)}
						<li class="flex items-baseline justify-between gap-4 bg-background p-4">
							<span class="font-medium">{s.label}</span>
							<span class="text-sm tabular-nums text-muted-foreground">{s.value}</span>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</Container>
</section>
