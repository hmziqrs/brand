<!-- A product shown off: the words above, the product's window below on a ground of its own — a
     material, the orange band or the hero rings — or the words beside it (split). Glass notes can
     point at parts of the window. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Glass from "$brand/components/glass.svelte";
	import Rings from "$brand/components/rings.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import { pageMode } from "$brand/hooks/page-mode.svelte.js";
	import type { Snippet } from "svelte";

	type Note = { text: string; /** Percent from the left of the window. */ x: number; /** Percent from the top. */ y: number };

	let {
		title,
		lede,
		actions,
		ground = "material",
		preset = "copper-sweep",
		layout = "stacked",
		notes = [],
		seed = "showcase",
		class: className,
		children,
	}: {
		title: string;
		lede?: string;
		actions?: Snippet;
		ground?: "material" | "band" | "rings" | "page";
		preset?: string;
		layout?: "stacked" | "split";
		/** Short glass labels placed over the window. */
		notes?: Note[];
		seed?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

{#snippet words()}
	<div class={cn("flex max-w-2xl flex-col gap-4", layout === "stacked" && "mx-auto items-center text-center")}>
		<h2 class="text-3xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-[2.6rem]">{title}</h2>
		{#if lede}<p class="text-[1.0625rem] leading-relaxed text-muted-foreground">{lede}</p>{/if}
		{#if actions}<div class="mt-1 flex flex-wrap gap-3">{@render actions()}</div>{/if}
	</div>
{/snippet}

{#snippet stage(extra: string)}
	<div class={cn("relative isolate overflow-hidden rounded-2xl", ground === "band" && "band-orange", extra)}>
		{#if ground === "material"}<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" class="absolute inset-0 -z-10" />{/if}
		{#if ground === "rings"}<Rings {seed} class="absolute top-1/2 left-1/2 -z-10 w-[120%] max-w-none -translate-x-[20%] -translate-y-1/2" />{/if}
		<div class={cn("relative", ground !== "page" && "p-4 sm:p-8 md:p-12")}>
			<div class={cn(ground === "band" && cn("rounded-xl", pageMode()))}>{@render children()}</div>
			{#each notes as n (n.text)}
				<Glass variant="smoke" as="span" class="absolute hidden -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-lg md:inline-flex" style={`left: ${n.x}%; top: ${n.y}%;`}>{n.text}</Glass>
			{/each}
		</div>
	</div>
{/snippet}

<section data-slot="showcase-section" data-ground={ground} data-layout={layout} class={cn("py-16 md:py-24", className)}>
	{#if layout === "split"}
		<Container size="wide" class="grid items-center gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
			{@render words()}
			{@render stage("")}
		</Container>
	{:else}
		<Container class="flex flex-col gap-10">{@render words()}</Container>
		<Container size="wide" class="mt-10">{@render stage("")}</Container>
	{/if}
</section>
