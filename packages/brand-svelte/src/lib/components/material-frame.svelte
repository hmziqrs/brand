<!-- Any content in a thin frame cut from a shader material: the one plan, project or sample
     that leads a row. The content sits on the page color. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import type { Snippet } from "svelte";

	let {
		preset,
		seed = "",
		/** The frame's thickness in pixels. */
		width = 6,
		class: className,
		children,
	}: {
		preset?: string;
		seed?: string;
		width?: number;
		class?: string;
		children: Snippet;
	} = $props();

	const poster = $derived(shaderPosters[preset ?? materialFor(seed)] ?? shaderPosters["copper-sweep"]);
</script>

<div data-slot="material-frame" class={cn("flex flex-col rounded-xl bg-cover bg-center", className)} style:padding={`${width}px`} style:background-image={`url(${poster.src})`}>
	<div class="flex flex-1 flex-col bg-background" style:border-radius={`calc(var(--radius) + 4px - ${width}px)`}>
		{@render children()}
	</div>
</div>
