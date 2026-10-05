<!-- Requirements that are met: filled green rings (claude-multi's horizontal variant, not the shared CheckList). -->
<script lang="ts">
	import Marker from "$brand/components/marker.svelte";

	let { items }: { items: string[] } = $props();
</script>

<ul data-slot="checks" class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
	{#each items as t (t)}
		<li class="inline-flex items-center gap-2">
			<Marker filled class="text-success" />
			{t}
		</li>
	{/each}
</ul>
