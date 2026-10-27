<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import GroundworkPage from './groundwork.svelte'
	import HooklinePage from './hookline.svelte'
	import OpenslotPage from './openslot.svelte'
	import ParleyPage from './parley.svelte'
	import SightlinePage from './sightline.svelte'

	const { Story } = defineMeta({
		title: 'Templates/SaaS landing pages',
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Sightline - analytics" asChild>
	<SightlinePage />
</Story>

<Story name="Hookline - developer API" asChild>
	<HooklinePage />
</Story>

<Story name="Groundwork - team planning" asChild>
	<GroundworkPage />
</Story>

<Story name="Parley - AI support" asChild>
	<ParleyPage />
</Story>

<Story name="Openslot - scheduling" asChild>
	<OpenslotPage />
</Story>
