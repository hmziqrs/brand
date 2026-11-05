<!-- A card made of a shader material, with the words on a smoke-glass panel over it. The material is
     the surface, never a picture: one per section, for the call to action or the number that matters,
     or where the material is the thing itself. A still image unless `animated`; the material is picked
     by name if no preset. -->
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
		/** The live shader, moving, with a pause button. A still image otherwise. */
		animated = false,
		sizes = "(min-width: 1024px) 33vw, 100vw",
		class: className,
	}: {
		title: string;
		preset?: string;
		seed?: string;
		eyebrow?: string;
		body?: Snippet | string;
		footer?: Snippet;
		href?: string;
		named?: boolean;
		animated?: boolean;
		sizes?: string;
		class?: string;
	} = $props();

	const material = $derived(preset ?? materialFor(seed ?? title));
	const materialName = $derived(shaderLooks.find((look) => look.id === material)?.name ?? material);
	const rendering = $derived(animated ? "live" : "image");
</script>

{#snippet surface(extra: string)}
	<ShaderMaterial preset={material} {rendering} animated={rendering === "live"} {sizes} controls={rendering === "live"} class={extra} />
{/snippet}

{#snippet chip()}
	{#if named}<Glass variant="clear" as="span" class="pointer-events-none absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs">{materialName}</Glass>{/if}
{/snippet}

{#snippet words()}
	{#if eyebrow}<p class="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"><Marker class="text-primary" />{eyebrow}</p>{/if}
	<h3 class="text-lg leading-snug font-medium tracking-[-0.01em] text-balance">
		{#if href}<a {href} class="outline-none group-hover/material:underline group-hover/material:underline-offset-4 after:absolute after:inset-0 after:z-10 after:rounded-[inherit]">{title}</a>{:else}{title}{/if}
	</h3>
	{#if body}<p class="text-[0.9rem] leading-relaxed text-foreground/85">{#if typeof body === "string"}{body}{:else}{@render body()}{/if}</p>{/if}
	{#if footer}<div class="mt-auto pt-2 text-[0.8125rem] text-muted-foreground">{@render footer()}</div>{/if}
{/snippet}

<article
	data-slot="material-card"
	class={cn(
		"group/material relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-xl p-3 ring-1 ring-foreground/10 transition-[box-shadow] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
		href && "hover:ring-primary/50",
		className,
	)}
>
	{@render surface("absolute inset-0 -z-10")}
	{@render chip()}
	<Glass variant="smoke" class={cn("flex flex-col gap-2 rounded-lg p-5", animated && "mb-12")}>{@render words()}</Glass>
</article>
