<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Eyebrow from './eyebrow.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Eyebrow',
		component: Eyebrow,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Ring" asChild>
	<Eyebrow variant="ring" index={2}>Where the work goes</Eyebrow>
</Story>

<Story name="Rule" asChild>
	<Eyebrow variant="rule">Where the work goes</Eyebrow>
</Story>

<Story name="Count" asChild>
	<Eyebrow variant="count" index={3} total={5}>Where the work goes</Eyebrow>
</Story>
