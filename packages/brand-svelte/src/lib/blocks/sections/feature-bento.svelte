<!-- A titled section of feature tiles like the wave family's cards: an icon up top, the words,
     and a number or a picture at the bottom of the tile. Each tile is an outline card, an orange
     tile or a material cover, in the same six-column bento as BentoSection. -->
<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type FeatureTile = {
		title: string;
		body?: string;
		/** Columns out of six on wide screens. */
		cols?: 2 | 3 | 4 | 6;
		rows?: 1 | 2;
		icon?: import("svelte").Component;
		/** A big number with its label, bottom of the tile. */
		stat?: { value: string; label: string };
		tone?: "outline" | "orange" | "material";
		preset?: string;
		visual?: Snippet;
	};
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import IconTile from "$brand/components/icon-tile.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";

	let {
		title,
		intro,
		tiles,
		align = "center",
		class: className,
	}: {
		title: string;
		intro?: string;
		tiles: FeatureTile[];
		align?: "start" | "center";
		class?: string;
	} = $props();

	const lg = { 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 6: "lg:col-span-6" } as const;
	const md = { 2: "md:col-span-2", 3: "md:col-span-2", 4: "md:col-span-4", 6: "md:col-span-4" } as const;
</script>

{#snippet words(t: FeatureTile)}
	{#if t.icon}
		<IconTile><t.icon class="lucide" /></IconTile>
	{/if}
	<div class="flex flex-col gap-1.5">
		<h3 class="text-lg font-medium tracking-[-0.01em]">{t.title}</h3>
		{#if t.body}<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{t.body}</p>{/if}
	</div>
{/snippet}

{#snippet bottom(t: FeatureTile)}
	{#if t.visual || t.stat}
		<div class="mt-auto flex flex-wrap items-end justify-between gap-6">
			{#if t.visual}
				<div class={cn("min-w-0", t.stat ? "min-w-40 flex-1" : "w-full")}>{@render t.visual()}</div>
			{/if}
			{#if t.stat}
				<div class="flex flex-col gap-1">
					<span class="font-mono text-4xl leading-none font-medium tracking-[-0.03em] tabular-nums md:text-5xl">{t.stat.value}</span>
					<span class="text-[0.8125rem] text-muted-foreground">{t.stat.label}</span>
				</div>
			{/if}
		</div>
	{/if}
{/snippet}

{#snippet tile(t: FeatureTile)}
	{@const span = cn(lg[t.cols ?? 2], md[t.cols ?? 2], t.rows === 2 && "lg:row-span-2")}
	{#if t.tone === "orange"}
		<div class={cn("band-orange flex flex-col gap-5 rounded-xl p-6", span)}>
			{@render words(t)}{@render bottom(t)}
		</div>
	{:else if t.tone === "material"}
		<div class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", span)}>
			<div class="relative h-36 border-b">
				<ShaderMaterial preset={t.preset ?? materialFor(t.title)} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0" />
			</div>
			<div class="flex flex-1 flex-col gap-5 p-6">{@render words(t)}{@render bottom(t)}</div>
		</div>
	{:else}
		<div class={cn("flex flex-col gap-5 rounded-xl p-6 ring-1 ring-foreground/10", span)}>
			{@render words(t)}{@render bottom(t)}
		</div>
	{/if}
{/snippet}

<section data-slot="feature-bento" class={cn("relative isolate", className)}>
	<Container class="flex flex-col gap-10">
		<div class={cn("flex max-w-2xl flex-col gap-3", align === "center" && "mx-auto items-center text-center")}>
			<h2 class="text-3xl font-medium tracking-tight text-balance">{title}</h2>
			{#if intro}<p class="leading-relaxed text-muted-foreground">{intro}</p>{/if}
		</div>
		<div class="grid grid-flow-row-dense gap-4 md:grid-cols-4 lg:grid-cols-6">
			{#each tiles as t (t.title)}{@render tile(t)}{/each}
		</div>
	</Container>
</section>
