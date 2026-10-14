<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Eyebrow from './eyebrow.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Eyebrow',
		component: Eyebrow,
		parameters: { layout: 'centered' },
	})
</script>

<!-- A numbered ring, for a section that belongs to a sequence. -->
<Story name="Ring" asChild>
	<Eyebrow variant="ring" index={2}>Where the work goes</Eyebrow>
</Story>

<!-- A short line, for a quiet section that needs a label and nothing more. -->
<Story name="Rule" asChild>
	<Eyebrow variant="rule">Where the work goes</Eyebrow>
</Story>

<!-- Ticks up to the current step, for a process with a known length. -->
<Story name="Count" asChild>
	<Eyebrow variant="count" index={3} total={5}>Where the work goes</Eyebrow>
</Story>
