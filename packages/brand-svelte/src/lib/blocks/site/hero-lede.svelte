<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children, ...rest }: { class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<p class={cn("max-w-prose text-lg leading-relaxed text-muted-foreground", className)} {...rest}>
	{@render children?.()}
</p>
