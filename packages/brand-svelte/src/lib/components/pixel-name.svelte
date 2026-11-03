<!-- A name as a full grid of cells, the size of its box: dots draws a dot per cell that swells and
     heats to oxide around the cursor; glyphs draws ■ □ ○ ◎ glyphs the cursor pushes apart. The
     cursor is read over the nearest [data-pointer-host]. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { mountPixelName } from "@hmziq/brand-core/motion/pixel-name";

	let {
		text,
		/** What screen readers hear; the text itself by default. */
		label,
		look = "dots",
		/** The largest cell, in pixels. */
		pitch = 9,
		/** The smallest cell, in pixels. */
		min = 5,
		/** How many cells across at most, before the cells shrink toward `min`. */
		cols = 140,
		/** How far the cursor reaches, in pixels. */
		reach = 120,
		/** The box's shape: an aspect ratio, a height. */
		class: className = "aspect-[5/1]",
	}: {
		text: string;
		label?: string;
		look?: "dots" | "glyphs";
		pitch?: number;
		min?: number;
		cols?: number;
		reach?: number;
		class?: string;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		return mountPixelName(canvas, { text, look, pitch, min, cols, reach });
	});
</script>

<div data-slot="pixel-name" data-look={look} class={cn("relative w-full", className)} role="img" aria-label={label ?? text}>
	<canvas bind:this={canvas} aria-hidden="true" class="block h-full w-full"></canvas>
</div>
