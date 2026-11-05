<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import StepCards from './step-cards.svelte'
	import StepDemo from '$brand/blocks/sections/stories-data-step-demos.svelte'
	import { steps } from '$brand/blocks/sections/stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Custom/Step cards',
		component: StepCards,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="With demos" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<StepCards {steps}>
			{#snippet demo(i)}<StepDemo {i} />{/snippet}
		</StepCards>
	</div>
</Story>
