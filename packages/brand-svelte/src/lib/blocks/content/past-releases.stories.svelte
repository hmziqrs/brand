<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PastReleases from './past-releases.svelte'

	const { Story } = defineMeta({ title: 'Content/Past releases', component: PastReleases })
</script>

<script lang="ts">
	import { releases } from './stories-data.js'
</script>

<!-- One past release, folded: its head, its first change, and the button that shows the rest. -->
<Story name="Default" asChild>
	<div class="max-w-[52rem] px-6">
		<PastReleases release={releases[1]} />
	</div>
</Story>
