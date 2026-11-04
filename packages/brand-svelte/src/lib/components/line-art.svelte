<!-- A thin-line drawing for a picture card, filling its box: lanes, rings, a fan, bars, a window, the
     four surfaces, a phone, a webview, a native window, the edge, a database or a terminal. The part
     nearest the cursor over its host (the nearest [data-line-art-host], else its parent) lights in
     oxide; still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import { followLineArt, lineArt, type LineArtKind } from "@hmziq/brand-core/motion/line-art";

	let { kind, class: className }: { kind: LineArtKind; class?: string } = $props();

	let svg: SVGSVGElement | undefined = $state();
	let x = $state(0.5);
	let y = $state(0.5);
	let on = $state(false);
	let still = $state(false);

	const shapes = $derived(lineArt(kind, { x, y, on, still }));

	$effect(() => {
		if (!svg) return;
		still = reducedMotion();
		return followLineArt(svg, (px, py, hit) => {
			x = px;
			y = py;
			on = hit;
		});
	});
</script>

<svg bind:this={svg} data-slot="line-art" data-kind={kind} viewBox="0 0 320 200" class={cn("absolute inset-0 h-full w-full", className)} aria-hidden="true" fill="none" stroke-width="1">
	{#each shapes as s, i (i)}
		<svelte:element this={s.tag} xmlns="http://www.w3.org/2000/svg" {...s.attrs} class={s.class} style={s.style} />
	{/each}
</svg>
