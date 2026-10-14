<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	type Node = { label: string; detail: string; /** Degrees, 0 is straight right, counted clockwise. */ angle: number; /** 1 is the nearest ring, 3 the farthest. */ ring: 1 | 2 | 3 };

	let {
		title,
		lede,
		caption,
		hub,
		nodes = [],
		actions,
		class: className,
	}: {
		title: string;
		lede?: string;
		caption: string;
		hub: string;
		nodes?: Node[];
		actions?: Snippet;
		class?: string;
	} = $props();

	const radius = { 1: 50, 2: 90, 3: 128 } as const;
	const point = (n: Node) => {
		const rad = (n.angle * Math.PI) / 180;
		const r = radius[n.ring];
		return { x: 200 + r * Math.cos(rad), y: 200 + r * Math.sin(rad) };
	};
	const placed = $derived(nodes.map((n) => ({ ...n, ...point(n) })));
</script>

<section data-slot="orbit-section" class={cn("relative isolate", className)}>
	<Container size="wide" class="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
		<div class="flex max-w-md flex-col gap-4">
			<p class="flex items-center gap-2 text-[0.8125rem] font-medium text-primary"><Marker />{caption}</p>
			<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-4xl">{title}</h2>
			{#if lede}<p class="leading-relaxed text-muted-foreground">{lede}</p>{/if}
			{#if actions}<div class="mt-2 flex flex-wrap gap-3">{@render actions()}</div>{/if}
		</div>

		<figure class="hidden md:block">
			<div class="relative mx-auto aspect-square w-full max-w-[34rem]">
				<svg viewBox="0 0 400 400" class="absolute inset-0 size-full" aria-hidden="true">
					{#each [1, 2, 3] as ring (ring)}
						<circle cx="200" cy="200" r={radius[ring as 1 | 2 | 3]} fill="none" stroke="var(--border)" stroke-width="1" />
					{/each}
					{#each placed as p (p.label)}
						<line x1="200" y1="200" x2={p.x} y2={p.y} stroke="var(--border)" stroke-width="1" />
					{/each}
					<circle cx="200" cy="200" r="30" fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />
					{#each placed as p (p.label)}
						<circle cx={p.x} cy={p.y} r="5" fill="var(--background)" stroke="var(--primary)" stroke-width="1.5" />
					{/each}
				</svg>
				<span class="absolute top-1/2 left-1/2 w-20 -translate-x-1/2 -translate-y-1/2 text-center text-xs leading-tight font-medium">{hub}</span>
				{#each placed as p (p.label)}
					<div
						class="absolute max-w-40 -translate-y-1/2 bg-background px-1.5 py-0.5 text-sm whitespace-nowrap"
						style={`left: ${(p.x / 400) * 100}%; top: ${(p.y / 400) * 100}%; transform: translate(${p.x >= 200 ? "12px" : "calc(-100% - 12px)"}, -50%);`}
					>
						<span class="block font-medium">{p.label}</span>
						<span class="block text-xs text-muted-foreground">{p.detail}</span>
					</div>
				{/each}
			</div>
		</figure>

		<ul class="grid gap-px overflow-hidden rounded-xl border bg-border md:hidden">
			{#each nodes as n (n.label)}
				<li class="flex flex-col gap-0.5 bg-background p-4">
					<span class="font-medium">{n.label}</span>
					<span class="text-sm text-muted-foreground">{n.detail}</span>
				</li>
			{/each}
		</ul>
	</Container>
</section>
