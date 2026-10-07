<script lang="ts">
	import { type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> & { children?: Snippet } = $props();
</script>

<span bind:this={ref} data-slot="questionnaire-choice-description" class={cn("text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</span>
