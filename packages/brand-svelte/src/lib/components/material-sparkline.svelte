<!-- A trend as an area cut from a shader material, fading toward the bottom, with the line drawn
     on top and the latest point in orange. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import { materialFor } from "@hmziq/brand-core/shaders/materials";
	import "@hmziq/brand-core/materials.css";

	let {
		values,
		/** What the trend shows, for screen readers: "Visitors a day, last 30 days, rising". */
		label,
		preset,
		seed = "",
		class: className,
	}: {
		values: number[];
		label: string;
		preset?: string;
		seed?: string;
		class?: string;
	} = $props();

	const w = 300;
	const h = 100;
	const pad = 6;
	const uid = $props.id();
	const poster = $derived(shaderPosters[preset ?? materialFor(seed || label)] ?? shaderPosters["copper-sweep"]);
	const points = $derived.by(() => {
		const lo = Math.min(...values);
		const span = Math.max(...values) - lo || 1;
		return values.map((v, i): [number, number] => [(i / Math.max(1, values.length - 1)) * w, h - pad - ((v - lo) / span) * (h - pad * 2)]);
	});
	const line = $derived.by(() => {
		const at = (i: number) => points[Math.min(points.length - 1, Math.max(0, i))];
		const y = (v: number) => Math.min(h, Math.max(0, v)).toFixed(1);
		return points
			.map(([x1, y1], i) => {
				if (i === 0) return `M${x1.toFixed(1)} ${y1.toFixed(1)}`;
				const [x0, y0] = at(i - 1);
				const [xa, ya] = at(i - 2);
				const [xb, yb] = at(i + 1);
				return `C${(x0 + (x1 - xa) / 6).toFixed(1)} ${y(y0 + (y1 - ya) / 6)} ${(x1 - (xb - x0) / 6).toFixed(1)} ${y(y1 - (yb - y0) / 6)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
			})
			.join("");
	});
	const last = $derived(points.at(-1) ?? [0, 0]);
</script>

<svg data-slot="material-sparkline" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} class={cn("h-auto w-full overflow-visible", className)}>
	<defs>
		<linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="white" />
			<stop offset="1" stop-color="white" stop-opacity="0.05" />
		</linearGradient>
		<mask id={`${uid}-area`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
			<path d={`${line}L${w} ${h}L0 ${h}Z`} fill={`url(#${uid}-fade)`} />
		</mask>
	</defs>
	<g mask={`url(#${uid}-area)`} data-material-sheet>
		<rect width={w} height={h} data-part="floor" />
		<image href={poster.src} x="0" y="0" width={w} height={h} preserveAspectRatio="xMidYMid slice" data-part="metal" />
	</g>
	<path d={line} fill="none" stroke="var(--foreground)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--primary)" />
</svg>
