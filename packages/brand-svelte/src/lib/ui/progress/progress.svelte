<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		children,
		...restProps
	}: ProgressPrimitive.RootProps & { children?: Snippet } = $props();
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn("flex flex-wrap gap-3", className)}
	{value}
	{max}
	{...restProps}
>
	{@render children?.()}
	<div data-slot="progress-track" class="relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted">
		<div data-slot="progress-indicator" class="h-full bg-primary transition-all" style="width: {(100 * (value ?? 0)) / (max ?? 1)}%"></div>
	</div>
</ProgressPrimitive.Root>
