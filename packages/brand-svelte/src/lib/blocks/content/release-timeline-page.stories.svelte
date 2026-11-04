<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseTimelinePage from './release-timeline-page.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release timeline page', component: ReleaseTimelinePage, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import SettingsSketch from './stories-data-settings-sketch.svelte'
	import TemplatesSketch from './stories-data-templates-sketch.svelte'
	import { multiChangelog, multiReleases } from './stories-data-changelog.js'
</script>

<Story name="claude-multi" asChild>
	<ReleaseTimelinePage releases={multiReleases} {...multiChangelog} filters>
		{#snippet picture(v, spot)}
			{#if v === '0.13.2'}<SettingsSketch bind:spot={spot.current} />{:else}<TemplatesSketch bind:spot={spot.current} />{/if}
		{/snippet}
	</ReleaseTimelinePage>
</Story>
