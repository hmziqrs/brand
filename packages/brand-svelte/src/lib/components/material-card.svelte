<!-- A card made with a shader material: on top (cover), behind glass (panel), beside the words
     (side) or as its frame. A still image unless `animated`; the material is picked by name if no preset. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderLooks } from "@hmziq/brand-core/shaders/catalog";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import ShaderMaterial from "./shader-material.svelte";
	import Glass from "./glass.svelte";
	import Marker from "./marker.svelte";
	import type { Snippet } from "svelte";

	let {
		title,
		variant = "cover",
		/** A shader preset id. Leave it out and `seed` (or the title) picks one from the brand's materials. */
		preset,
		seed,
		eyebrow,
		body,
		footer,
		/** Makes the whole card a link. Hover changes the line color and underlines the title; nothing moves. */
		href,
		/** Shows the material's name on it, for galleries of materials. */
		named = false,
		/** The live shader, moving, with a pause button. A still image otherwise, and always for the frame. */
		animated = false,
		/** The frame's thickness in pixels (variant frame). */
		frame = 6,
		sizes = "(min-width: 1024px) 33vw, 100vw",
		class: className,
	}: {
		title: string;
		variant?: "cover" | "panel" | "side" | "frame";
		preset?: string;
		seed?: string;
		eyebrow?: string;
		body?: Snippet | string;
		footer?: Snippet;
		href?: string;
		named?: boolean;
		animated?: boolean;
		frame?: number;
		sizes?: string;
		class?: string;
	} = $props();

	const material = $derived(preset ?? materialFor(seed ?? title));
	const materialName = $derived(shaderLooks.find((look) => look.id === material)?.name ?? material);
	const rendering = $derived(animated && variant !== "frame" ? "live" : "image");
</script>

{#snippet surface(extra: string)}
	<ShaderMaterial preset={material} {rendering} animated={rendering === "live"} {sizes} controls={rendering === "live"} class={extra} />
{/snippet}

{#snippet chip()}
	{#if named}<Glass variant="clear" as="span" class="pointer-events-none absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs">{materialName}</Glass>{/if}
{/snippet}

{#snippet words(onGlass: boolean)}
	{#if eyebrow}<p class="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"><Marker class="text-primary" />{eyebrow}</p>{/if}
	<h3 class="text-lg leading-snug font-medium tracking-[-0.01em] text-balance">
		{#if href}<a {href} class="outline-none group-hover/material:underline group-hover/material:underline-offset-4 after:absolute after:inset-0 after:z-10 after:rounded-[inherit]">{title}</a>{:else}{title}{/if}
	</h3>
	{#if body}<p class={cn("text-[0.9rem] leading-relaxed", onGlass ? "text-foreground/85" : "text-muted-foreground")}>{#if typeof body === "string"}{body}{:else}{@render body()}{/if}</p>{/if}
	{#if footer}<div class="mt-auto pt-2 text-[0.8125rem] text-muted-foreground">{@render footer()}</div>{/if}
{/snippet}

<article
	data-slot="material-card"
	data-variant={variant}
	class={cn(
		"group/material relative isolate flex overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-[box-shadow] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
		href && "hover:ring-primary/50",
		variant === "cover" && "flex-col",
		variant === "panel" && "min-h-[26rem] flex-col justify-end p-3",
		variant === "side" && "flex-col sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
		variant === "frame" && "flex-col ring-0",
		className,
	)}
>
	{#if variant === "cover"}
		<div class="relative aspect-[16/10] border-b">
			{@render surface("absolute inset-0")}
			{@render chip()}
		</div>
		<div class="flex flex-1 flex-col gap-2 p-6">{@render words(false)}</div>
	{:else if variant === "panel"}
		{@render surface("absolute inset-0 -z-10")}
		{@render chip()}
		<Glass variant="smoke" class={cn("flex flex-col gap-2 rounded-lg p-5", animated && "mb-12")}>{@render words(true)}</Glass>
	{:else if variant === "side"}
		<div class="relative min-h-44 border-b sm:border-r sm:border-b-0">
			{@render surface("absolute inset-0")}
			{@render chip()}
		</div>
		<div class="flex flex-col gap-2 p-6">{@render words(false)}</div>
	{:else}
		{@render surface("absolute inset-0 -z-10")}
		<div class="flex flex-1 flex-col gap-2 rounded-[calc(var(--radius)+4px-var(--frame))] bg-background p-6" style:margin="var(--frame)" style:--frame={`${frame}px`}>{@render words(false)}</div>
	{/if}
</article>
