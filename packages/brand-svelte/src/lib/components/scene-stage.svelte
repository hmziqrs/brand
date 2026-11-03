<!-- A hero stage: a kit Scene on the right, fading out behind the words on the left. Below lg it
     spans the stage at lower strength. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { SceneKind } from "@hmziq/brand-core/motion/scenes";
	import Scene from "./scene.svelte";

	let {
		/** Beside the words in a hero: lattice, network, layers. */
		kind = "lattice",
		/** The site or project name. The same name always draws the same scene. */
		seed,
		/** The scene's own settings, as exported from its tweaker. */
		settings,
		class: className,
	}: { kind?: SceneKind; seed?: string; settings?: Record<string, unknown>; class?: string } = $props();
</script>

<div data-slot="scene-stage" class={cn("absolute inset-0 overflow-hidden", className)}>
	<Scene {kind} {seed} {settings} class="absolute inset-y-0 right-0 w-full opacity-60 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:w-[64%] lg:opacity-100" />
</div>
