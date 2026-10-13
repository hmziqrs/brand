<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AnnouncePill from './announce-pill.svelte'
	import AnnounceBar from './announce-bar.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Announce',
		component: AnnouncePill,
	})
</script>

<!-- One piece of news as a pill, above a hero title. -->
<Story name="Pill" asChild>
	<div class="flex flex-col items-start gap-4">
		<AnnouncePill href="#">Tunnel can now collect files with a link</AnnouncePill>
		<AnnouncePill href="#" label="Version 0.1" preset="liquid-chrome">Oxiwake is out for Linux and Windows</AnnouncePill>
	</div>
</Story>

<!-- A strip of copper across the top of a page, holding the news on glass. For SiteShell's banner. -->
<Story name="Bar" asChild>
	<AnnounceBar href="#">Tunnel can now collect files with a link</AnnounceBar>
</Story>
