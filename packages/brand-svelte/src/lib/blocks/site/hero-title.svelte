<!-- The page's headline. "compact" (the inner-page size) when a product sits beside it. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { size = "default", class: className, children, ...rest }: { size?: "default" | "compact"; class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<h1 class={cn("text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl", size === "default" ? "lg:text-[3.9rem]" : "lg:text-[3.6rem]", className)} {...rest}>
	{@render children?.()}
</h1>
