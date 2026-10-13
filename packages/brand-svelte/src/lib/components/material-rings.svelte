<!-- The hero rings cut from a shader material: the same arcs as Rings for the same name, drawn
     thick enough to show the material, with the orange ring and its dot on top. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { arcs, hash, rng } from "@hmziq/brand-core/motion/rings";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import "@hmziq/brand-core/materials.css";

	let {
		seed,
		preset,
		label = "Rings cut from metal, one of them orange",
		class: className,
		...rest
	}: {
		seed: string;
		preset?: string;
		label?: string;
		class?: string;
	} & Record<string, unknown> = $props();

	const cx = 440;
	const cy = 225;
	const uid = $props.id();
	const mask = `material-rings-${uid}`;
	const poster = $derived(shaderPosters[preset ?? materialFor(seed)] ?? shaderPosters["copper-sweep"]);
	const list = $derived.by(() => {
		const random = rng(hash(seed) + 7);
		const accent = 3 + Math.floor(random() * 3);
		return arcs(random, { cx, cy, radii: Array.from({ length: 11 }, (_, i) => 34 + i * 34), accent, accentGap: 0.52, gap: [0.06, 0.3] });
	});
</script>

<svg data-slot="material-rings" viewBox="0 0 520 440" role="img" aria-label={label} class={cn("h-auto w-full", className)} {...rest}>
	<defs>
		<mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="440">
			{#each list as a, i (a.r)}
				{#if !a.accent}
					<circle {cx} {cy} r={a.r} fill="none" stroke="white" stroke-width={5 + i * 1.5} stroke-linecap="round" stroke-dasharray={a.dash} transform={`rotate(${a.rotate} ${cx} ${cy})`} />
				{/if}
			{/each}
		</mask>
	</defs>
	<g mask={`url(#${mask})`} data-material-sheet>
		<rect width="520" height="440" data-part="floor" />
		<image href={poster.src} x="0" y="0" width="520" height="440" preserveAspectRatio="xMidYMid slice" data-part="metal" />
	</g>
	{#each list as a (a.r)}
		{#if a.accent}
			<circle {cx} {cy} r={a.r} fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-dasharray={a.dash} transform={`rotate(${a.rotate} ${cx} ${cy})`} />
			{#if a.end}<circle cx={a.end[0]} cy={a.end[1]} r="7" fill="var(--primary)" />{/if}
		{/if}
	{/each}
</svg>

