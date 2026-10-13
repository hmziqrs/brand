<!-- A rule inlaid with a shader material: a thin strip of metal between sections, fading at its ends. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";

	let {
		preset,
		seed = "",
		/** Height in pixels. */
		thickness = 3,
		fade = true,
		class: className,
	}: {
		preset?: string;
		seed?: string;
		thickness?: number;
		fade?: boolean;
		class?: string;
	} = $props();

	const poster = $derived(shaderPosters[preset ?? materialFor(seed)] ?? shaderPosters["copper-sweep"]);
</script>

<div
	data-slot="material-rule"
	role="separator"
	class={cn("w-full rounded-full bg-cover bg-center", className)}
	style:height={`${thickness}px`}
	style:background-image={`url(${poster.src})`}
	style:mask-image={fade ? "linear-gradient(90deg, transparent, white 18%, white 82%, transparent)" : undefined}
></div>
