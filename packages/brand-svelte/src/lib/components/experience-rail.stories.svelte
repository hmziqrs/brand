<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ExperienceRail from './experience-rail.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Experience rail',
		component: ExperienceRail,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte'
	import { aboutData } from '$brand/blocks/site/stories-data-company.js'
</script>

<Story name="Default" asChild>
	<Container size="wide" class="py-16">
		<ExperienceRail roles={aboutData.who.roles} kicker={aboutData.who.rail.kicker} />
	</Container>
</Story>
