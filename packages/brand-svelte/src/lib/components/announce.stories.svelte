<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AnnouncePill from './announce-pill.svelte'
	import AnnounceBar from './announce-bar.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Announce',
		component: AnnouncePill,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Pill" asChild>
	<div class="flex flex-col items-start gap-4">
		<AnnouncePill href="#">Tunnel can now collect files with a link</AnnouncePill>
		<AnnouncePill href="#" label="Version 0.1" preset="liquid-chrome">Oxiwake is out for Linux and Windows</AnnouncePill>
	</div>
</Story>

<Story name="Bar" parameters={{ layout: 'padded' }} asChild>
	<AnnounceBar href="#">Tunnel can now collect files with a link</AnnounceBar>
</Story>
