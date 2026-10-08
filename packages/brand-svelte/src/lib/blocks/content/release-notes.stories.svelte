<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseNotes from './release-notes.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release notes', component: ReleaseNotes })
</script>

<script lang="ts">
	import { releases } from './stories-data.js'
</script>

<!-- Grouped, tagged, columns, tabs, or a summary with show/hide — with the lab's own release notes. -->
<Story name="Grouped" asChild>
	<div class="max-w-[52rem] px-6">
		<ReleaseNotes release={releases[2]} />
	</div>
</Story>

<Story name="Tagged" asChild>
	<div class="px-6">
		<ReleaseNotes release={releases[2]} variant="tagged" />
	</div>
</Story>

<Story name="Columns" asChild>
	<div class="px-6">
		<ReleaseNotes release={releases[2]} variant="columns" />
	</div>
</Story>

<Story name="Tabs" asChild>
	<div class="max-w-[52rem] px-6">
		<ReleaseNotes release={releases[2]} variant="tabs" />
	</div>
</Story>

<Story name="Summary" asChild>
	<div class="max-w-[52rem] px-6">
		<ReleaseNotes release={releases[1]} variant="summary" />
	</div>
</Story>
