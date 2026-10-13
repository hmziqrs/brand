<!-- A titled section of feature tiles in a six-column bento. Each tile is an outline card, an orange
     tile, a material cover or glass on a material, with its picture at the bottom. The whole grid
     can sit on the page, on the orange band, or on a material. -->
<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type BentoTile = {
		title: string;
		body?: string;
		/** Columns out of six on wide screens. */
		cols?: 2 | 3 | 4 | 6;
		rows?: 1 | 2;
		tone?: "outline" | "orange" | "material" | "glass";
		preset?: string;
		visual?: Snippet;
	};
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Glass from "$brand/components/glass.svelte";
	import ShaderMaterial from "$brand/components/shader-material.svelte";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import { pageMode } from "$brand/hooks/page-mode.svelte.js";

	let {
		title,
		intro,
		tiles,
		align = "center",
		ground = "page",
		preset = "etched-silk",
		class: className,
	}: {
		title: string;
		intro?: string;
		tiles: BentoTile[];
		align?: "start" | "center";
		/** What the grid sits on. */
		ground?: "page" | "band" | "material";
		/** The material for ground="material". */
		preset?: string;
		class?: string;
	} = $props();

	const lg = { 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4", 6: "lg:col-span-6" } as const;
	const md = { 2: "md:col-span-2", 3: "md:col-span-2", 4: "md:col-span-4", 6: "md:col-span-4" } as const;
</script>

{#snippet words(t: BentoTile)}
	<div class="flex flex-col gap-1.5">
		<h3 class="text-lg font-medium tracking-[-0.01em]">{t.title}</h3>
		{#if t.body}<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{t.body}</p>{/if}
	</div>
{/snippet}

{#snippet tile(t: BentoTile)}
	{@const span = cn(lg[t.cols ?? 2], md[t.cols ?? 2], t.rows === 2 && "lg:row-span-2")}
	{#if t.tone === "orange"}
		<div class={cn("band-orange flex flex-col gap-5 rounded-xl p-6", span)}>{@render words(t)}{#if t.visual}<div class="mt-auto">{@render t.visual()}</div>{/if}</div>
	{:else if t.tone === "material"}
		<div class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", ground === "band" && pageMode(), ground === "material" && "bg-background", span)}>
			<div class="relative h-36 border-b"><ShaderMaterial preset={t.preset ?? materialFor(t.title)} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0" /></div>
			<div class="flex flex-1 flex-col gap-5 p-6">{@render words(t)}{#if t.visual}<div class="mt-auto">{@render t.visual()}</div>{/if}</div>
		</div>
	{:else if t.tone === "glass"}
		<div class={cn("relative isolate flex flex-col justify-end overflow-hidden rounded-xl p-3 ring-1 ring-foreground/10", span)}>
			<ShaderMaterial preset={t.preset ?? materialFor(t.title)} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0 -z-10" />
			<Glass variant="smoke" class="flex flex-col gap-4 rounded-lg p-5">{@render words(t)}{#if t.visual}{@render t.visual()}{/if}</Glass>
		</div>
	{:else if ground === "material"}
		<Glass variant="smoke" class={cn("flex flex-col gap-5 rounded-xl p-6", span)}>{@render words(t)}{#if t.visual}<div class="mt-auto">{@render t.visual()}</div>{/if}</Glass>
	{:else}
		<div class={cn("flex flex-col gap-5 rounded-xl p-6 ring-1 ring-foreground/10", ground === "band" && pageMode(), span)}>{@render words(t)}{#if t.visual}<div class="mt-auto">{@render t.visual()}</div>{/if}</div>
	{/if}
{/snippet}

<section data-slot="bento-section" data-ground={ground} class={cn("relative isolate", ground !== "page" && "overflow-hidden py-16 md:py-24", ground === "band" && "band-orange", className)}>
	{#if ground === "material"}<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" class="absolute inset-0 -z-10" />{/if}
	<Container class="flex flex-col gap-10">
		<div class={cn("flex max-w-2xl flex-col gap-3", align === "center" && "mx-auto items-center text-center")}>
			{#if ground === "material"}
				<Glass variant="smoke" class={cn("flex flex-col gap-3 rounded-xl px-6 py-5", align === "center" && "items-center")}>
					<h2 class="text-3xl font-medium tracking-tight text-balance">{title}</h2>
					{#if intro}<p class="leading-relaxed text-muted-foreground">{intro}</p>{/if}
				</Glass>
			{:else}
				<h2 class="text-3xl font-medium tracking-tight text-balance">{title}</h2>
				{#if intro}<p class="leading-relaxed text-muted-foreground">{intro}</p>{/if}
			{/if}
		</div>
		<div class="grid grid-flow-row-dense gap-4 md:grid-cols-4 lg:grid-cols-6">
			{#each tiles as t (t.title)}{@render tile(t)}{/each}
		</div>
	</Container>
</section>
