<script lang="ts">
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { MessageScrollerController, useMessageScrollerController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		preserveScrollOnPrepend = true,
		children,
		onkeydown,
		onscroll,
		ontouchmove,
		onwheel,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		preserveScrollOnPrepend?: boolean;
		children?: Snippet;
	} = $props();

	const controller = useMessageScrollerController("MessageScrollerViewport");
	let viewport: HTMLDivElement | null = $state(null);

	$effect(() => {
		controller.preserveScrollOnPrepend = preserveScrollOnPrepend;
	});

	$effect(() => {
		ref = viewport;
		controller.setViewportElement(viewport);
		if (!viewport || typeof ResizeObserver === "undefined") return;
		let frame = 0;
		const observer = new ResizeObserver(() => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => controller.handleResize());
		});
		observer.observe(viewport);
		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});

	function handleScroll(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		controller.syncAfterScroll();
		onscroll?.(event);
	}

	function handleWheel(event: WheelEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		controller.userScrollIntent();
		onwheel?.(event);
	}

	function handleTouchMove(event: TouchEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		controller.userScrollIntent();
		ontouchmove?.(event);
	}

	function handleKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		if (MessageScrollerController.isScrollKey(event.key)) controller.userScrollIntent();
		onkeydown?.(event);
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={viewport}
	data-slot="message-scroller-viewport"
	data-pending-scroll={controller.pendingDefault ? "" : undefined}
	role="region"
	aria-label="Messages"
	tabindex="0"
	class={cn(
		"size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible",
		className
	)}
	onscroll={handleScroll}
	onwheel={handleWheel}
	ontouchmove={handleTouchMove}
	onkeydown={handleKeyDown}
	{...restProps}
>
	{@render children?.()}
</div>
