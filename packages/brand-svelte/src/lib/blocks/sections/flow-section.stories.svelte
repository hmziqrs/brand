<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ButtonLink from '../site/button-link.svelte'
	import FlowSection from './flow-section.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Flow',
		component: FlowSection,
		parameters: { layout: 'fullscreen' },
	})

	const inputs = [
		{ label: 'Search', value: '41,200', share: 0.9 },
		{ label: 'Referrals', value: '12,600', share: 0.45 },
		{ label: 'Social', value: '6,900', share: 0.25 },
		{ label: 'Paid', value: '3,100', share: 0.12 },
	]
	const outputs = [
		{ label: 'Signed up', value: '5,820', share: 0.5 },
		{ label: 'Back in 90 days', value: '2,240', share: 0.2 },
		{ label: 'Gone quiet', value: '1,090', share: 0.1 },
	]
</script>

{#snippet trial()}<ButtonLink href="#" size="lg">Start a trial</ButtonLink>{/snippet}

<!-- Where visitors come from, what they become. Each line is as thick as its share. -->
<Story name="Visitors" asChild>
	<FlowSection
		caption="Where they come from"
		title="Follow the visitors from the first click to the account."
		lede="Each line is as thick as the number of people on it. The thick lines show where the work pays off, and the thin ones show where to look next."
		hub="Visitors"
		{inputs}
		{outputs}
		actions={trial}
	/>
</Story>

<!-- A single source feeding a single result. -->
<Story name="One path" asChild>
	<FlowSection
		caption="One path"
		title="One source, one outcome."
		lede="With one line in and one out, the diagram shows a single channel clearly."
		hub="Orders"
		inputs={[{ label: 'Checkout', value: '1,904', share: 0.8 }]}
		outputs={[{ label: 'Shipped', value: '1,871', share: 0.7 }]}
	/>
</Story>

<!-- Ten sources and six outcomes: each line is one channel, so the thin ones stay visible. -->
<Story name="Fine-grained" asChild>
	<FlowSection
		caption="Every channel"
		title="Ten channels, each one visible."
		lede="The diagram grows with the list. Every source gets its own line, so a small channel still shows where it lands."
		hub="Visitors"
		inputs={[
			{ label: 'Search, brand', value: '18,400', share: 0.8 },
			{ label: 'Search, generic', value: '11,260', share: 0.55 },
			{ label: 'Referrals, partners', value: '6,930', share: 0.34 },
			{ label: 'Referrals, users', value: '4,210', share: 0.21 },
			{ label: 'Newsletter', value: '3,880', share: 0.19 },
			{ label: 'Social, organic', value: '2,640', share: 0.13 },
			{ label: 'Social, paid', value: '1,920', share: 0.1 },
			{ label: 'Video', value: '1,130', share: 0.06 },
			{ label: 'Podcasts', value: '740', share: 0.04 },
			{ label: 'Direct', value: '610', share: 0.03 },
		]}
		outputs={[
			{ label: 'Signed up', value: '5,820', share: 0.5 },
			{ label: 'Trial, active', value: '2,930', share: 0.25 },
			{ label: 'Paid', value: '1,240', share: 0.11 },
			{ label: 'Back in 90 days', value: '1,090', share: 0.09 },
			{ label: 'Gone quiet', value: '620', share: 0.05 },
			{ label: 'Unsubscribed', value: '210', share: 0.02 },
		]}
	/>
</Story>
