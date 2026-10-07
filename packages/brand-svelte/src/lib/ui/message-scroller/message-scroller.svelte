<script lang="ts">
	import { untrack } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageScrollerController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { children?: Snippet } = $props();

	const controller = useMessageScrollerController("MessageScroller");
	let root: HTMLDivElement | null = $state(null);

	$effect(() => {
		const element = root;
		untrack(() => {
			ref = element;
			controller.setRootElement(element);
		});
	});
</script>

<div
	bind:this={root}
	data-slot="message-scroller"
	data-pending-scroll={controller.pendingDefault ? "" : undefined}
	class={cn("group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", className)}
	{...restProps}
>
	{@render children?.()}
</div>
