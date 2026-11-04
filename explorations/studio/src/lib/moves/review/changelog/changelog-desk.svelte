<script lang="ts">
	import ReleaseDesk from '$brand/blocks/content/release-desk.svelte';
	import type { Changelog } from './content';

	let { content, class: className }: { content: Changelog; class?: string } = $props();
</script>

<ReleaseDesk releases={content.releases} title={content.title} accent={content.accent} lede={content.lede} preset={content.preset} windowTitle={content.window?.title ?? ''} numbers={content.numbers} filters={content.filters} open={content.open} spots={content.spots} links={content.links} class={className}>
	{#snippet window(spot)}{#if content.window}<content.window.sketch bind:spot={spot.current} />{/if}{/snippet}
</ReleaseDesk>
