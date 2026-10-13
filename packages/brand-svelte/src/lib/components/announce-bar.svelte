<!-- A thin strip of material across the top of a page, holding one announcement on glass.
     For SiteShell's `banner`. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import ShaderMaterial from "./shader-material.svelte";
	import AnnouncePill from "./announce-pill.svelte";
	import type { Snippet } from "svelte";

	let {
		href,
		label = "New",
		preset = "copper-sweep",
		class: className,
		children,
	}: {
		href: string;
		label?: string;
		preset?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div data-slot="announce-bar" class={cn("relative isolate flex justify-center overflow-hidden px-4 py-2", className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} sizes="100vw" class="absolute inset-0 -z-10" />
	<AnnouncePill {href} {label} {preset} variant="glass">{@render children()}</AnnouncePill>
</div>
