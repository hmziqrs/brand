<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children, ...rest }: { class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<div class={cn("flex flex-wrap gap-3 pt-2", className)} {...rest}>
	{@render children?.()}
</div>
