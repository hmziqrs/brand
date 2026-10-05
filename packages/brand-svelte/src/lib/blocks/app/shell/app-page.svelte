<!--
  The page inside the shell: one centered column with the app padding.
  Settings and forms take "narrow"; everything else takes the default.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		width = "default",
		class: className,
		children,
	}: {
		width?: "default" | "narrow";
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div
	data-slot="app-page"
	class={cn("mx-auto w-full px-4 py-6 md:px-8 md:py-8", width === "narrow" ? "max-w-3xl" : "max-w-6xl", className)}
>
	{@render children()}
</div>
