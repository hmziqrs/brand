<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleasePicture from './release-picture.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release picture', component: ReleasePicture })
</script>

<script lang="ts">
	import SettingsSketch from './stories-data-settings-sketch.svelte'
	import { multiChangelog } from './stories-data-changelog.js'

	const pic = multiChangelog.pictures['0.13.2']
</script>

<Story name="settings.json" asChild>
	<div class="max-w-[38rem] px-6">
		<ReleasePicture tag={pic.tag} caption={pic.caption}>
			<SettingsSketch />
		</ReleasePicture>
	</div>
</Story>
