<script lang="ts">
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageScrollerController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		messageId,
		scrollAnchor = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		messageId?: string;
		scrollAnchor?: boolean;
		children?: Snippet;
	} = $props();

	const controller = useMessageScrollerController("MessageScrollerItem");
	let item: HTMLDivElement | null = $state(null);

	$effect(() => {
		ref = item;
	});

	$effect(() => {
		const id = messageId;
		const element = item;
		if (!id || !element) return;
		controller.registerMessage(id, element);
		return () => controller.registerMessage(id, null, element);
	});
</script>

<div
	bind:this={item}
	data-slot="message-scroller-item"
	data-message-id={messageId}
	data-scroll-anchor={scrollAnchor ? "true" : "false"}
	class={cn("min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]", className)}
	{...restProps}
>
	{@render children?.()}
</div>
