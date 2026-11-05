<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import SectionHead from './section-head.svelte'
	import { Button } from '$brand/ui/button/index.js'

	const { Story } = defineMeta({
		title: 'Sections/Section head',
		component: SectionHead,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Split" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16">
		<SectionHead kicker="What it does" title="Four chores your app stops doing by hand." lede="Every tile runs the real state machine. Drag across the timeline, point at the refetch rings, approve the pull request and click through the cache." />
	</div>
</Story>

<Story name="With an aside" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16">
		<SectionHead kicker="Work" title="Things I've built lately." lede="Open-source tools, client apps and long notes on how they were made. Run the cursor across a card, then pick a thread and follow it.">
			{#snippet aside()}
				<Button href="#" variant="outline" size="lg">All work<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			{/snippet}
		</SectionHead>
	</div>
</Story>

<Story name="Accent" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16">
		<SectionHead kicker="In numbers" title="Fewer requests. No spinners on the way back." accent="No spinners" lede="Measured in the example inbox app, built twice: once with gpui-query, once with a fetch in every render." />
	</div>
</Story>

<Story name="Part head" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16">
		<SectionHead size="md" kicker="Starting points" title="Pick the project closest to yours." lede="Each one names the stack we reach for first. Filter by where it runs." />
	</div>
</Story>

<Story name="Centered" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16">
		<SectionHead layout="center" kicker="Release" title="Push a tag. Get five installers." lede="One workflow builds every installer on native runners and signs it with your keys." />
	</div>
</Story>
