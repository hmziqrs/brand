<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { setContext } from "svelte";
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

	let labelId = $state<string>();
	setContext("progress-root", { setLabelId: (id: string) => (labelId = id) });
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn("flex flex-wrap gap-3", className)}
	{value}
	{max}
	aria-labelledby={labelId}
	{...restProps}
>
	{@render children?.()}
	<div data-slot="progress-track" class="relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted">
		<div data-slot="progress-indicator" class="h-full bg-primary transition-all" style="width: {(100 * (value ?? 0)) / (max ?? 1)}%"></div>
	</div>
</ProgressPrimitive.Root>
