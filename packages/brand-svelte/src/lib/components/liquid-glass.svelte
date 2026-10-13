<!-- Glass that bends what's behind it at its edges, like a lens (an SVG displacement map through
     backdrop-filter). Chromium only; elsewhere, and for reduced transparency, it is frosted Glass. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import "@hmziq/brand-core/glass.css";

	let {
		/** How far the edges bend, in pixels. */
		bend = 40,
		/** How wide the bending edge is, in pixels. */
		edge = 18,
		/** A little blur on top of the bend; 0 keeps it clear. */
		blur = 2,
		as = "div",
		class: className,
		children,
		...rest
	}: {
		bend?: number;
		edge?: number;
		blur?: number;
		as?: string;
		class?: string;
		children?: Snippet;
	} & Record<string, unknown> = $props();

	const uid = $props.id();
	const filter = `liquid-${uid}`;
	let host: HTMLElement | undefined = $state();
	let size = $state({ w: 0, h: 0, r: 16 });
	let liquid = $state(false);

	$effect(() => {
		if (!host) return;
		const element = host;
		const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands ?? [];
		const chromium = brands.some((b) => b.brand === "Chromium") && CSS.supports("backdrop-filter", "url(#a)");
		liquid = chromium && !matchMedia("(prefers-reduced-transparency: reduce)").matches;
		const observer = new ResizeObserver(() => {
			const box = element.getBoundingClientRect();
			size = { w: Math.round(box.width), h: Math.round(box.height), r: parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0 };
		});
		observer.observe(element);
		return () => observer.disconnect();
	});

	const map = $derived.by(() => {
		const { w, h, r } = size;
		if (!w || !h) return "";
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="x"><stop offset="0" stop-color="black"/><stop offset="1" stop-color="rgb(255,0,0)"/></linearGradient><linearGradient id="y" x2="0" y2="1"><stop offset="0" stop-color="black"/><stop offset="1" stop-color="rgb(0,255,0)"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#x)"/><rect width="${w}" height="${h}" fill="url(#y)" style="mix-blend-mode:screen"/><rect x="${edge}" y="${edge}" width="${Math.max(0, w - edge * 2)}" height="${Math.max(0, h - edge * 2)}" rx="${Math.max(0, r - edge / 2)}" fill="rgb(128,128,0)" style="filter:blur(${edge / 2}px)"/></svg>`;
		return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
	});
</script>

{#if liquid && map}
	<svg aria-hidden="true" width="0" height="0" class="absolute">
		<filter id={filter} x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
			<feImage href={map} x="0" y="0" width={size.w} height={size.h} result="map" />
			<feDisplacementMap in="SourceGraphic" in2="map" scale={bend} xChannelSelector="R" yChannelSelector="G" />
		</filter>
	</svg>
{/if}

<svelte:element
	this={as}
	bind:this={host}
	data-slot="glass"
	data-glass={liquid ? "clear" : "frost"}
	data-liquid={liquid || undefined}
	class={cn(className)}
	style:backdrop-filter={liquid && map ? `url(#${filter}) blur(${blur}px) saturate(1.6) brightness(1.05)` : undefined}
	{...rest}
>
	{@render children?.()}
</svelte:element>
