<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RingDivider from './ring-divider.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Ring divider',
		component: RingDivider,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<div class="max-w-2xl"><RingDivider /></div>
</Story>

<Story name="With words" asChild>
	<div class="flex max-w-2xl flex-col gap-10">
		<RingDivider seed="part-two">Part two</RingDivider>
		<RingDivider seed="or">or</RingDivider>
	</div>
</Story>

<Story name="Start" asChild>
	<div class="max-w-2xl"><RingDivider align="start">Older posts</RingDivider></div>
</Story>
