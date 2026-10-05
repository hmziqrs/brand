<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn, type WithElementRef, type WithoutChildren } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
			children?: Snippet;
		} = $props();
</script>

<div
	bind:this={ref}
	data-slot="bubble-group"
	class={cn("flex min-w-0 flex-col gap-2", className)}
	{...restProps}
>
	{@render children?.()}
</div>
