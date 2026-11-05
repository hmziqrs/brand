<script lang="ts">
	import ReleaseTimelinePage from '$brand/blocks/content/release-timeline-page.svelte';
	import type { Changelog } from './content';

	let { content, class: className }: { content: Changelog; class?: string } = $props();
</script>

<ReleaseTimelinePage releases={content.releases} title={content.title} accent={content.accent} lede={content.lede} numbers={content.numbers} filters={content.filters} open={content.open} spots={content.spots} pictures={content.pictures} links={content.links} class={className}>
	{#snippet picture(v, spot)}
		{@const Sketch = content.pictures[v]?.sketch}
		{#if Sketch}<Sketch bind:spot={spot.current} />{/if}
	{/snippet}
</ReleaseTimelinePage>
