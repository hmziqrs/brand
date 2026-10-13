<!-- A frosted surface over the rings or a shader; glass.css in core holds the look. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import "@hmziq/brand-core/glass.css";

	let {
		/** frost for text, smoke for long text over busy pictures, tint in the accent, clear for labels and controls only. */
		variant = "frost",
		grain = false,
		as = "div",
		class: className,
		children,
		...rest
	}: {
		variant?: "frost" | "smoke" | "tint" | "clear";
		grain?: boolean;
		as?: string;
		class?: string;
		children?: Snippet;
	} & Record<string, unknown> = $props();
</script>

<svelte:element this={as} data-slot="glass" data-glass={variant} data-grain={grain || undefined} class={cn(className)} {...rest}>
	{@render children?.()}
</svelte:element>
