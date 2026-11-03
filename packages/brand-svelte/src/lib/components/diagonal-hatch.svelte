<!-- A hero stage of fine diagonal oxide lines, thickening toward a corner. Inside a
     [data-pointer-host] they bend toward the cursor, and drift on their own while it's away.
     corner: lines from the top right, fading out behind words on the left. frame: lines from two
     opposite corners around a clear middle, for centered words. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { mountDiagonalHatch, type HatchOptions } from "@hmziq/brand-core/motion/diagonal-hatch";

	let {
		variant = "corner",
		/** Pixels between lines. */
		spacing = 9,
		/** The lines' angle in degrees. */
		angle = -38,
		/** How far, in pixels, the cursor pulls lines (corner 190, frame 200). */
		reach,
		/** How strongly lines bend toward the cursor, 0–1 (corner 0.38, frame 0.4). */
		bend,
		class: className,
	}: { variant?: "corner" | "frame"; spacing?: number; angle?: number; reach?: number; bend?: number; class?: string } = $props();

	const frame = $derived(variant === "frame");
	const corners = $derived<NonNullable<HatchOptions["from"]>[]>(frame ? ["top-right", "bottom-left"] : ["top-right"]);
	const options = $derived({ spacing, angle, reach: reach ?? (frame ? 200 : 190), bend: bend ?? (frame ? 0.4 : 0.38) });

	function hatch(canvas: HTMLCanvasElement, params: HatchOptions) {
		let destroy = mountDiagonalHatch(canvas, params);
		return {
			update(next: HatchOptions) {
				destroy();
				destroy = mountDiagonalHatch(canvas, next);
			},
			destroy: () => destroy(),
		};
	}
</script>

<div
	data-slot="diagonal-hatch"
	data-variant={variant}
	aria-hidden="true"
	class={cn(
		"absolute inset-0 overflow-hidden opacity-75",
		frame ? "[mask-image:radial-gradient(ellipse_44%_50%_at_50%_50%,transparent_42%,black_100%)]" : "[mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0/0.15)_35%,black_80%)]",
		className,
	)}
>
	{#each corners as from (from)}
		<div class="absolute inset-0"><canvas use:hatch={{ ...options, from }} class="absolute inset-0 h-full w-full"></canvas></div>
	{/each}
</div>
