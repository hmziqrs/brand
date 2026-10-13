<!-- A share as a bar filled with a shader material, on a thin outline track. Values are 0–1. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";

	let {
		label,
		value,
		detail,
		preset,
		seed,
		class: className,
	}: {
		label: string;
		value: number;
		/** Under the label, e.g. "7.2 of 10 GB". */
		detail?: string;
		preset?: string;
		seed?: string;
		class?: string;
	} = $props();

	const share = $derived(Math.min(1, Math.max(0, value)));
	const poster = $derived(shaderPosters[preset ?? materialFor(seed ?? label)] ?? shaderPosters["copper-sweep"]);
</script>

<div data-slot="material-bar" class={cn("flex flex-col gap-2", className)}>
	<div class="flex items-baseline justify-between gap-4 text-sm">
		<span>{label}{#if detail}<span class="ml-2 text-muted-foreground">{detail}</span>{/if}</span>
		<span class="font-medium tabular-nums">{Math.round(share * 100)}%</span>
	</div>
	<div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(share * 100)} class="h-2.5 overflow-hidden rounded-full ring-1 ring-foreground/10">
		<div class="h-full rounded-full bg-cover bg-center" style:width={`${share * 100}%`} style:background-image={`url(${poster.src})`}></div>
	</div>
</div>
