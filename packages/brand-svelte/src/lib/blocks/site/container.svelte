<!-- The page's column. Narrow for reading (posts, legal), wide for docs. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";

	let {
		/** narrow: posts and legal. default: landing pages. wide: docs. */
		size = "default",
		class: className,
		style,
		children,
		...rest
	}: { size?: "narrow" | "default" | "wide"; class?: string; style?: Record<string, string>; children?: import("svelte").Snippet } & Record<string, unknown> = $props();

	const widths = { narrow: "max-w-[46rem]", default: "max-w-5xl", wide: "max-w-[82rem]" } as const;
</script>

<div class={cn("mx-auto w-full px-6", widths[size], className)} style={styleText(style)} {...rest}>
	{@render children?.()}
</div>
