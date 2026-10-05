<!-- Shown when a search or filter finds nothing. -->
<script lang="ts">
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<p class="flex items-center gap-2.5 py-8 text-muted-foreground">
	<Marker class="text-primary" />
	{@render children()}
</p>
