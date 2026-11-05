<!-- An isometric field of voxel columns in the page's grays that rises into an oxide ridge under the
     cursor over the nearest [data-pointer-host], and drifts on its own while the cursor is away.
     Fills its positioned parent. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { mountVoxelField } from "@hmziq/brand-core/motion/voxel-field";

	let {
		/** Half a column's width, in pixels. */
		size = 22,
		/** How far the cursor reaches, in pixels. */
		reach = 115,
		/** How high the cursor raises a column, in pixels. */
		lift = 58,
		/** Edges barely there at rest, showing only where the field heats. */
		quiet = false,
		class: className,
	}: { size?: number; reach?: number; lift?: number; quiet?: boolean; class?: string } = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!canvas) return;
		return mountVoxelField(canvas, { size, reach, lift, quiet });
	});
</script>

<div data-slot="voxel-field" aria-hidden="true" class={cn("absolute inset-0", className)}>
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
</div>
