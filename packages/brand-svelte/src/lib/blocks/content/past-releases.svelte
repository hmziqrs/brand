<!--
  One past release, folded (the lab's PastRelease): its head, its first
  change, and the button that shows the rest. The latest release gets the
  whole list instead — pass it ReleaseNotes directly.
-->
<script lang="ts">
	import ReleaseHead from "./release-head.svelte";
	import ReleaseNotes from "./release-notes.svelte";
	import type { Release } from "./types.js";

	let { release }: { release: Release } = $props();
</script>

<ReleaseHead {release} />
<ReleaseNotes {release} variant="summary" />
