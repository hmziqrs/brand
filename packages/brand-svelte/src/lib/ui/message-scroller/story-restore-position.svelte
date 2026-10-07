<script lang="ts">
	import { useMessageScroller } from "./context.svelte.js";

	let { messageId, onrestored }: { messageId: string | null; onrestored: () => void } = $props();

	const { scrollToMessage } = useMessageScroller();

	$effect(() => {
		if (!messageId) return;
		const frame = window.requestAnimationFrame(() => {
			scrollToMessage(messageId, { align: "start", behavior: "auto" });
			onrestored();
		});
		return () => window.cancelAnimationFrame(frame);
	});
</script>
