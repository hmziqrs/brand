<!-- A name in a dot font, as a picture with the name as its label. The dots fly in from a scatter
     when it scrolls into view; inside a [data-pointer-host] the dots near the cursor push away and
     light up in oxide. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { dotNameGrid, mountDotName } from "@hmziq/brand-core/motion/dot-name";

	let {
		/** Lowercase letters, digits, - . > _ and ■. */
		word,
		/** What screen readers hear; the word itself by default. */
		label,
		class: className,
	}: { word: string; label?: string; class?: string } = $props();

	const grid = $derived(dotNameGrid(word));

	let canvas: HTMLCanvasElement | undefined = $state();
	let ink: HTMLSpanElement | undefined = $state();
	let accent: HTMLSpanElement | undefined = $state();

	$effect(() => {
		if (!canvas || !ink || !accent) return;
		return mountDotName(canvas, { word, ink, accent });
	});
</script>

<span data-slot="dot-name" class={cn("relative block", className)} role="img" aria-label={label ?? word}>
	<canvas bind:this={canvas} class="block h-auto w-full" style:aspect-ratio="{grid.cols} / {grid.rows}"></canvas>
	<span bind:this={ink} class="hidden text-foreground"></span>
	<span bind:this={accent} class="hidden text-primary"></span>
</span>
