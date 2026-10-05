<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<span data-slot="progress-value" class={cn("ml-auto text-sm text-muted-foreground tabular-nums", className)}>
	{@render children?.()}
</span>
