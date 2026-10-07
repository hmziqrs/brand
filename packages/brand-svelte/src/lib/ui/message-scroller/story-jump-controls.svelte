<script lang="ts">
	import { Button } from "$brand/ui/button/index.js";
	import { Marker, MarkerContent } from "$brand/ui/marker/index.js";
	import { useMessageScroller } from "./context.svelte.js";

	const { scrollToEnd, scrollToMessage } = useMessageScroller();
	let status = $state("Ready to jump");

	function jumpTo(messageId: string, label: string) {
		const didScroll = scrollToMessage(messageId, { align: "start" });
		status = didScroll ? `Jumped to ${label}` : `${label} is not available`;
	}
</script>

<div class="flex flex-wrap items-center gap-2 border-b p-2">
	<Button size="sm" variant="outline" onclick={() => jumpTo("m1", "first message")}>
		First
	</Button>
	<Button size="sm" variant="outline" onclick={() => jumpTo("m5", "latest question")}>
		Latest Question
	</Button>
	<Button
		size="sm"
		onclick={() => {
			const didScroll = scrollToEnd();
			status = didScroll ? "Jumped to end" : "Already at end";
		}}
	>
		End
	</Button>
	<Marker variant="separator" class="ml-auto">
		<MarkerContent>{status}</MarkerContent>
	</Marker>
</div>
