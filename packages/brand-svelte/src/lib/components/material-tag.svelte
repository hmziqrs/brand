<!-- A small label with a thin metal edge, for the one word that should catch the eye: "Pro",
     "Recommended", "New". The text stays on the page color. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { shaderPosters } from "@hmziq/brand-core/shaders/posters";
	import type { Snippet } from "svelte";

	let { preset = "copper-sweep", class: className, children }: { preset?: string; class?: string; children: Snippet } = $props();

	const poster = $derived(shaderPosters[preset] ?? shaderPosters["copper-sweep"]);
</script>

<span data-slot="material-tag" class={cn("inline-flex shrink-0 rounded-full bg-cover bg-center p-[1.5px]", className)} style:background-image={`url(${poster.src})`}>
	<span class="rounded-full bg-background px-2 py-0.5 text-xs leading-4 font-medium text-foreground">{@render children()}</span>
</span>
