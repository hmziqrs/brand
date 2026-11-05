<!-- A hero stage: one still material poster, full bleed, under a veil of the page color so words
     read over it. No canvas and no animation. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import ShaderMaterial from "./shader-material.svelte";

	let { preset = "copper-sweep", class: className }: { preset?: string; class?: string } = $props();
</script>

<div data-slot="material-wash" class={cn("absolute inset-0 overflow-hidden", className)}>
	<ShaderMaterial {preset} rendering="image" animated={false} controls={false} loading="eager" sizes="100vw" class="absolute inset-0 h-full w-full" />
	<div aria-hidden="true" class="absolute inset-0 bg-background/42 dark:bg-background/56"></div>
</div>
