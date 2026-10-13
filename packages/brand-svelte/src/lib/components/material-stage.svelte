<!-- A product screen or code shown on a material: the content sits in a solid window with an
     optional title bar, or brings its own surface (none). For words on glass, use MaterialCard. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderLooks } from "@hmziq/brand-core/shaders/catalog";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import ShaderMaterial from "./shader-material.svelte";
	import type { Snippet } from "svelte";

	let {
		preset,
		seed = "",
		window = "solid",
		/** A title bar on the window, e.g. the file or page name. */
		title,
		/** How much material shows around the window. */
		padding = "md",
		named = false,
		animated = false,
		sizes = "(min-width: 1024px) 60vw, 100vw",
		class: className,
		children,
	}: {
		preset?: string;
		seed?: string;
		window?: "solid" | "none";
		title?: string;
		padding?: "sm" | "md" | "lg";
		named?: boolean;
		animated?: boolean;
		sizes?: string;
		class?: string;
		children: Snippet;
	} = $props();

	const material = $derived(preset ?? materialFor(seed));
	const materialName = $derived(shaderLooks.find((look) => look.id === material)?.name ?? material);
	const pad = { sm: "p-3 sm:p-5", md: "p-4 sm:p-8 md:p-10", lg: "p-5 sm:p-12 md:p-16" } as const;
</script>

{#snippet frame()}
	{#if title}<div class="flex items-center border-b px-4 py-2.5 text-xs text-muted-foreground">{title}</div>{/if}
	<div class="min-w-0">{@render children()}</div>
{/snippet}

<div data-slot="material-stage" class={cn("relative isolate overflow-hidden rounded-xl ring-1 ring-foreground/10", pad[padding], className)}>
	<ShaderMaterial preset={material} rendering={animated ? "live" : "image"} {animated} controls={animated} {sizes} class="absolute inset-0 -z-10" />
	{#if named}<span class="absolute top-3 left-3 rounded-full border bg-background px-2.5 py-1 text-xs">{materialName}</span>{/if}
	{#if window === "none"}
		{@render children()}
	{:else}
		<div class={cn("overflow-hidden rounded-lg border bg-background shadow-xl", animated && "mb-10")}>{@render frame()}</div>
	{/if}
</div>
