<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<span data-slot="progress-label" class={cn("text-sm font-medium", className)}>
	{@render children?.()}
</span>
