<!-- An oxide dither field rising from the bottom of its box in slow waves. The cursor, anywhere on
     the page within reach, heats the cells around it into the hot color: display oxide in light
     mode, yellow in dark. Fills its positioned parent. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { mountHeatField } from "@hmziq/brand-core/motion/heat-field";

	let {
		/** Cell size in pixels. */
		cell = 8,
		/** The cursor's reach in pixels. */
		lens = 170,
		/** How much the cursor lifts the field, 0–1. */
		lift = 0.9,
		class: className,
	}: { cell?: number; lens?: number; lift?: number; class?: string } = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let base: HTMLSpanElement | undefined = $state();
	let hot: HTMLSpanElement | undefined = $state();

	$effect(() => {
		if (!canvas || !base || !hot) return;
		return mountHeatField(canvas, { base, hot, cell, lens, lift });
	});
</script>

<span data-slot="heat-field" class={cn("pointer-events-none absolute inset-0 block", className)} aria-hidden="true">
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
	<span bind:this={base} class="hidden text-(--orange)"></span>
	<span bind:this={hot} class="hidden text-(--orange-display) dark:text-yellow"></span>
</span>
