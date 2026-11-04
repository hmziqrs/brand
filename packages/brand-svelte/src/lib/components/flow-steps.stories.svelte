<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FlowSteps from './flow-steps.svelte'
	import FlowContent from '$brand/blocks/sections/stories-data-flow-contents.svelte'
	import { flow } from '$brand/blocks/sections/stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Custom/Flow steps',
		component: FlowSteps,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Brief to ship" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<FlowSteps steps={flow}>
			{#snippet content(i)}<FlowContent {i} />{/snippet}
		</FlowSteps>
	</div>
</Story>
