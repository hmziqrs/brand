<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CommitmentCards from './commitment-cards.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Commitment cards',
		component: CommitmentCards,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte'
	import { aboutData } from '$brand/blocks/site/stories-data-company.js'
</script>

<Story name="Default" asChild>
	<Container size="wide" class="py-16">
		<CommitmentCards data={aboutData.commitments} />
	</Container>
</Story>
