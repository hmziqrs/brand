<!-- A hero stage: a live material under a veil of cells. The cursor, anywhere on the page, opens the
     cells it passes and leaves them stained; a few warm up on their own. Dark mode shows the dark
     material through a lighter veil with teal stains, light mode a copper material through a near
     opaque veil with oxide stains. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { isDark, onThemeChange } from "@hmziq/brand-core/motion/canvas";
	import { mountHoverGrid } from "@hmziq/brand-core/motion/hover-grid";
	import ShaderMaterial from "./shader-material.svelte";

	let {
		/** The material in dark mode. */
		preset = "oxide-bloom",
		/** The material in light mode. */
		presetLight = "copper-sweep",
		/** A moving material; off shows its still poster. */
		live = true,
		/** How opaque the veil is in dark mode, 0–1. */
		veil = 0.8,
		veilLight = 0.95,
		/** The theme token the visited cells stain with, per mode. */
		stain = "--teal",
		stainLight = "--orange",
		/** Cell size in pixels. */
		cell = 56,
		class: className,
	}: {
		preset?: string;
		presetLight?: string;
		live?: boolean;
		veil?: number;
		veilLight?: number;
		stain?: string;
		stainLight?: string;
		cell?: number;
		class?: string;
	} = $props();

	let root: HTMLDivElement | undefined = $state();
	let grid: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let dark = $state(true);

	$effect(() => {
		if (!root) return;
		const el = root;
		const read = () => (dark = isDark(el));
		read();
		return onThemeChange(read);
	});

	$effect(() => {
		if (!grid || !canvas) return;
		return mountHoverGrid(grid, canvas, { mode: "reveal", cell, veil: dark ? veil : veilLight, stain: dark ? stain : stainLight, gap: 0, line: "--border" });
	});
</script>

<div bind:this={root} data-slot="material-grid" class={cn("absolute inset-0 isolate overflow-hidden", className)}>
	<ShaderMaterial preset={dark ? preset : presetLight} rendering={live ? "live" : "image"} animated={live} controls={false} loading="eager" class="absolute inset-0 -z-20 h-full w-full" />
	<div bind:this={grid} aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
	</div>
</div>
