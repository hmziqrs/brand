<script lang="ts">
	import { type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { children?: Snippet } = $props();
</script>

<div
	bind:this={ref}
	data-slot="questionnaire-actions"
	class={cn("grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-9", className)}
	{...restProps}
>
	{@render children?.()}
</div>
