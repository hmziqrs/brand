<!-- The stock slider with its filled part cut from a shader material: for prices that follow an
     amount, or any setting worth a little weight. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Slider } from "$brand/ui/slider/index.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		label,
		preset,
		seed = "",
		class: className,
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label: string;
		preset?: string;
		seed?: string;
		class?: string;
	} = $props();

	const poster = $derived(shaderPosters[preset ?? materialFor(seed)] ?? shaderPosters["copper-sweep"]);
</script>

<div data-slot="material-slider" class={cn("material-slider", className)} style:--material={`url(${poster.src})`}>
	<Slider type="single" bind:value {min} {max} {step} aria-label={label} />
</div>

<style>
	.material-slider :global([data-slot="slider-track"]) {
		height: 0.625rem;
		background-color: transparent;
		box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent);
	}
	.material-slider :global([data-slot="slider-range"]) {
		background-image: var(--material);
		background-size: cover;
		background-position: center;
		border-radius: 9999px;
	}
	.material-slider :global([data-slot="slider-thumb"]) {
		width: 1.25rem;
		height: 1.25rem;
		border-width: 2px;
		background-color: var(--background);
	}
</style>
