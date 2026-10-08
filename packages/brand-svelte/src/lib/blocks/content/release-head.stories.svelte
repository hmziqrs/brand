<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseHead from './release-head.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release head', component: ReleaseHead })
</script>

<script lang="ts">
	import { releases } from './stories-data.js'
</script>

<!-- h3, inside a timeline item (the default). -->
<Story name="In a timeline" asChild>
	<div class="px-6">
		<ReleaseHead release={releases[1]} />
	</div>
</Story>

<!-- h2, for the latest release on its own. -->
<Story name="Latest" asChild>
	<div class="px-6">
		<ReleaseHead release={releases[0]} level={2} />
	</div>
</Story>
