<script lang="ts">
	import { untrack } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageScrollerController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		spacerClassName,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		spacerClassName?: string;
		children?: Snippet;
	} = $props();

	const controller = useMessageScrollerController("MessageScrollerContent");
	let content: HTMLDivElement | null = $state(null);
	let spacer: HTMLDivElement | null = $state(null);

	$effect(() => {
		ref = content;
		controller.setContentElement(content);
		controller.setSpacerElement(spacer);
		if (!content) return;
		untrack(() => controller.handleContentChange());
		if (typeof MutationObserver === "undefined") return;
		const mutations = new MutationObserver(() => controller.handleContentChange());
		mutations.observe(content, { childList: true });
		return () => mutations.disconnect();
	});

	$effect(() => {
		if (!content || typeof ResizeObserver === "undefined") return;
		let frame = 0;
		const observer = new ResizeObserver(() => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => controller.handleResize());
		});
		observer.observe(content);
		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={content}
	data-slot="message-scroller-content"
	role="log"
	aria-relevant="additions"
	class={cn("flex h-max min-h-full flex-col gap-8", className)}
	{...restProps}
>
	{@render children?.()}
	<div
		bind:this={spacer}
		aria-hidden="true"
		data-message-scroller-spacer=""
		hidden
		class={spacerClassName}
	></div>
</div>
