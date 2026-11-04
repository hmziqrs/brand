<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import StepsSection from './steps-section.svelte'
	import SectionHead from './section-head.svelte'
	import PictureGrid from '$brand/components/picture-grid.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import StepDemo from './stories-data-step-demos.svelte'
	import { playbooks, steps } from './stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Sections/Steps section',
		component: StepsSection,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="How we work" asChild>
	<StepsSection kicker="How we work" title="From the first call to the store review." lede="Three steps, and the same people the whole way through. Point at the first card to pick what you need." {steps}>
		{#snippet actions()}<Button href="#" size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>{/snippet}
		{#snippet demo(i)}<StepDemo {i} />{/snippet}
		<SectionHead size="md" kicker="Starting points" title="Pick the project closest to yours." lede="Each one names the stack we reach for first. Filter by where it runs." class="mt-28 md:mt-36" />
		<PictureGrid items={playbooks} filter="Where it runs" class="mt-10" />
	</StepsSection>
</Story>
