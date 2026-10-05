<!--
  A full-width band in the other mode: white on a dark page, dark on a light
  one. It follows the page when the mode changes. Everything inside, shadcn
  components included, takes that mode's colors.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { createSubscriber } from "svelte/reactivity";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children: Snippet } = $props();

	const pageIsDark = createSubscriber((update) => {
		const observer = new MutationObserver(update);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	});
	const dark = $derived.by(() => {
		pageIsDark();
		return typeof document === "undefined" || document.documentElement.classList.contains("dark");
	});
</script>

<section class={cn(dark ? "light" : "dark", "py-16 md:py-24", className)}>
	{@render children()}
</section>
