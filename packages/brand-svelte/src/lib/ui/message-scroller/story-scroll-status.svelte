<script lang="ts">
	import { Marker, MarkerContent } from "$brand/ui/marker/index.js";
	import { useMessageScrollerScrollable } from "./context.svelte.js";

	const scrollable = useMessageScrollerScrollable();
</script>

<Marker>
	<MarkerContent>
		{scrollable.start || scrollable.end
			? "More transcript content is available."
			: "All messages fit in the viewport."}
	</MarkerContent>
</Marker>
