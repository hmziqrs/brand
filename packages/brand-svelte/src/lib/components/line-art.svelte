<!-- A thin-line drawing for a picture card, filling its box: lanes, rings, a fan, bars, a window, the
     four surfaces, a phone, a webview, a native window, the edge, a database or a terminal, or one of
     the post drawings (a laptop, a request client, modules, a plan, a queue, tools, a pipeline,
     endpoints), whose line stays 1.25px at any size. The part nearest the cursor over its host (the
     nearest [data-line-art-host], else its parent) lights in oxide; still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import { followLineArt, lineArt, lineArtStroke, type LineArtKind } from "@hmziq/brand-core/motion/line-art";

	let {
		kind,
		/** Map the cursor onto the drawing itself, not its whole host: for a drawing letterboxed in a wider frame, like a post's cover. */
		fit = false,
		/** Answer the cursor's last place even when it is off the host: for a preview that only shows while you point. */
		held = false,
		class: className,
	}: { kind: LineArtKind; fit?: boolean; held?: boolean; class?: string } = $props();

	let svg: SVGSVGElement | undefined = $state();
	let x = $state(0.5);
	let y = $state(0.5);
	let on = $state(false);
	let still = $state(false);

	const shapes = $derived(lineArt(kind, { x, y, on: on || held, still }));
	const stroke = $derived(lineArtStroke(kind));

	$effect(() => {
		if (!svg) return;
		still = reducedMotion();
		return followLineArt(
			svg,
			(px, py, hit) => {
				x = px;
				y = py;
				on = hit;
			},
			{ fit },
		);
	});
</script>

<svg bind:this={svg} data-slot="line-art" data-kind={kind} viewBox="0 0 320 200" class={cn("absolute inset-0 h-full w-full", className)} aria-hidden="true" fill="none" {...stroke}>
	{#each shapes as s, i (i)}
		<svelte:element this={s.tag} xmlns="http://www.w3.org/2000/svg" {...s.attrs} class={s.class} style={s.style} />
	{/each}
</svg>
