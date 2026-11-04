<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { mountDotField } from "@hmziq/brand-core/motion/dot-field";

	let {
		/** Distance between dots in pixels. */
		gap = 22,
		/** The cursor's reach in pixels. */
		reach = 140,
		class: className,
	}: { gap?: number; reach?: number; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!host || !canvas) return;
		return mountDotField(host, canvas, { gap, reach });
	});
</script>

<div bind:this={host} data-slot="dot-field" aria-hidden="true" class={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden text-foreground", className)}>
	<canvas bind:this={canvas} class="h-full w-full"></canvas>
</div>
