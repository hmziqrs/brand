<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import PictureSection from './picture-section.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { playbooks, work } from './stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Sections/Picture section',
		component: PictureSection,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Work" asChild>
	<PictureSection kicker="Work" title="Things I've built lately." lede="Open-source tools, client apps and long notes on how they were made. Run the cursor across a card, then pick a thread and follow it." items={work}>
		{#snippet actions()}<Button href="#" variant="outline" size="lg">All work<ArrowRight class="lucide" data-icon="inline-end" /></Button>{/snippet}
	</PictureSection>
</Story>

<Story name="With filters" asChild>
	<PictureSection kicker="Starting points" title="Pick the project closest to yours." lede="Each one names the stack we reach for first. Filter by where it runs." items={playbooks} filter="Where it runs" />
</Story>
