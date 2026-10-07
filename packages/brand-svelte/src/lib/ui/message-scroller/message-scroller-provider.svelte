<script lang="ts">
	import { untrack, type Snippet } from "svelte";
	import {
		setMessageScroller,
		type MessageScrollerDefaultScrollPosition,
	} from "./context.svelte.js";

	let {
		autoScroll = false,
		defaultScrollPosition = "end",
		scrollEdgeThreshold = 8,
		scrollPreviousItemPeek = 64,
		scrollMargin = 0,
		children,
	}: {
		autoScroll?: boolean;
		defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
		scrollEdgeThreshold?: number;
		scrollPreviousItemPeek?: number;
		scrollMargin?: number;
		children?: Snippet;
	} = $props();

	// svelte-ignore state_referenced_locally
	const controller = setMessageScroller({
		autoScroll,
		defaultScrollPosition,
		scrollEdgeThreshold,
		scrollPreviousItemPeek,
		scrollMargin,
	});

	$effect(() => {
		return () => controller.destroy();
	});

	$effect(() => {
		const options = { autoScroll, defaultScrollPosition, scrollEdgeThreshold, scrollPreviousItemPeek, scrollMargin };
		untrack(() => {
			controller.syncProps(options);
			if (!controller.applyDefaultScrollPosition() && controller.itemCount === 0) controller.pendingDefault = false;
			if (options.autoScroll && controller.mode === "following-bottom" && controller.itemCount > 0) {
				controller.scrollToEnd({ behavior: "auto" });
			} else {
				controller.commitScrollState();
			}
		});
	});
</script>

{@render children?.()}
