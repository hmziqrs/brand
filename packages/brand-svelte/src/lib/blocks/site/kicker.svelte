<!-- A small grey word for a kind of thing: "Latest release", "Contact". -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } = $props();
</script>

<p class={cn("text-[0.8125rem] text-muted-foreground", className)}>{@render children?.()}</p>
