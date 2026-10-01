<!-- One line of the note under a hero, with an orange ring before it. -->
<script lang="ts">
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<span class="inline-flex items-center gap-2.5">
	<Marker class="text-primary" />
	{@render children()}
</span>
