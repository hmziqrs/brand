<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseTimeline from './release-timeline.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release timeline', component: ReleaseTimeline })
</script>

<script lang="ts">
	import { releases } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="max-w-[52rem] px-6">
		<ReleaseTimeline releases={releases} skip={1} />
	</div>
</Story>
