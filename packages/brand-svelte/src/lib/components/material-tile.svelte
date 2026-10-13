<!-- A small tile cut from a shader material. With content (an icon or two letters) the material
     becomes its frame and the content sits on the page color; without, it's a plain swatch. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import type { Snippet } from "svelte";

	let {
		preset,
		seed = "",
		/** Width and height in pixels. */
		size = 44,
		shape = "square",
		/** The frame's thickness as a share of the size. */
		frame = 0.1,
		class: className,
		children,
	}: {
		preset?: string;
		seed?: string;
		size?: number;
		shape?: "square" | "circle";
		frame?: number;
		class?: string;
		children?: Snippet;
	} = $props();

	const poster = $derived(shaderPosters[preset ?? materialFor(seed)] ?? shaderPosters["copper-sweep"]);
</script>

<span
	data-slot="material-tile"
	aria-hidden="true"
	class={cn("relative inline-grid shrink-0 place-items-center overflow-hidden bg-cover bg-center", shape === "circle" ? "rounded-full" : "rounded-[22%]", className)}
	style:width={`${size}px`}
	style:height={`${size}px`}
	style:background-image={`url(${poster.src})`}
>
	{#if children}
		<span
			class={cn("absolute grid place-items-center bg-background text-foreground [&_svg:not([class*='size-'])]:size-[45%]", shape === "circle" ? "rounded-full" : "rounded-[18%]")}
			style:inset={`${Math.max(2, Math.round(size * frame))}px`}
			style:font-size={`${size * 0.34}px`}
		>
			{@render children()}
		</span>
	{/if}
</span>
