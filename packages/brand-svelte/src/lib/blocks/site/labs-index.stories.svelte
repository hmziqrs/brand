<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LabsIndex from './labs-index.svelte'

	const { Story } = defineMeta({ title: 'Site/Labs page', component: LabsIndex, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { labsData } from './stories-data-profile.js'
</script>

<Story name="hmziq.xyz" asChild>
	<LabsIndex data={labsData} />
</Story>
