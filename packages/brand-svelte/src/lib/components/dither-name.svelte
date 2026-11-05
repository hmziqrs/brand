<!-- A name across its box's full width, rebuilt from small square blocks through an ordered dither:
     a slow noise rusts the letters toward oxide, and the cursor rusts the blocks near it. Its
     height follows its width. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { mountDitherName } from "@hmziq/brand-core/motion/dither-name";

	let {
		name,
		/** The largest block, in pixels; narrow boxes get smaller blocks. */
		block = 6,
		/** The rust drifts on its own. */
		animate = false,
		/** The cursor rusts the blocks near it. */
		hover = true,
		class: className,
	}: { name: string; block?: number; animate?: boolean; hover?: boolean; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let height = $state(0);

	$effect(() => {
		if (!host || !canvas) return;
		return mountDitherName(host, canvas, { name, block, animate, hover, onHeight: (h) => (height = h) });
	});
</script>

<div bind:this={host} data-slot="dither-name" class={cn("relative w-full", className)} style:height={height ? `${height}px` : "22vw"}>
	<span class="sr-only">{name}</span>
	<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 h-full w-full"></canvas>
</div>
