<!-- The TL;DR box: an orange outline, a ring and a label. Also "The short version" on legal pages. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let { label, children, class: className }: { label: string; children: Snippet; class?: string } = $props();
</script>

<div class={cn("rounded-xl border border-primary/45 px-5 py-4.5", className)}>
	<p class="mb-1.5 flex items-center gap-2 text-[0.8125rem] font-medium text-primary">
		<Marker />
		{label}
	</p>
	<p class="leading-[1.7]">{@render children()}</p>
</div>
