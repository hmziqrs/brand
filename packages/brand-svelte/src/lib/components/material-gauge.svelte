<!-- A share or a count as a ring cut from metal, like RingGauge: a share fills the ring that far
     over a faint track, a whole number above 1 splits it into that many pieces. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import "@hmziq/brand-core/materials.css";

	let {
		value,
		preset,
		seed = "",
		class: className,
	}: {
		value: number;
		preset?: string;
		seed?: string;
		class?: string;
	} = $props();

	const r = 29;
	const c = 2 * Math.PI * r;
	const uid = $props.id();
	const mask = `material-gauge-${uid}`;
	const poster = $derived(shaderPosters[preset ?? materialFor(seed)] ?? shaderPosters["copper-sweep"]);
	const dash = $derived(value > 1 ? `${(c / value - 6).toFixed(2)} 6` : `${(c * Math.min(1, Math.max(0, value))).toFixed(2)} ${c.toFixed(2)}`);
</script>

<svg data-slot="material-gauge" viewBox="0 0 72 72" aria-hidden="true" class={cn("size-18 shrink-0", className)}>
	<defs>
		<mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="72">
			<circle cx="36" cy="36" {r} fill="none" stroke="white" stroke-width="8" stroke-linecap={value > 1 ? "butt" : "round"} stroke-dasharray={dash} transform="rotate(-90 36 36)" />
		</mask>
	</defs>
	{#if value <= 1}<circle cx="36" cy="36" {r} fill="none" stroke="var(--border)" stroke-width="8" />{/if}
	<g mask={`url(#${mask})`} data-material-sheet>
		<rect width="72" height="72" data-part="floor" />
		<image href={poster.src} x="-24" y="0" width="120" height="72" preserveAspectRatio="xMidYMid slice" data-part="metal" />
	</g>
</svg>
