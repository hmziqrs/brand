<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseDesk from './release-desk.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release desk', component: ReleaseDesk, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import EndpointsSketch from './stories-data-endpoints-sketch.svelte'
	import { blogChangelog, blogReleases } from './stories-data-changelog.js'
</script>

<Story name="blog.hmziq.rs" asChild>
	<ReleaseDesk releases={blogReleases} {...blogChangelog}>
		{#snippet window(spot)}<EndpointsSketch bind:spot={spot.current} />{/snippet}
	</ReleaseDesk>
</Story>
