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

<!--
	Landing page templates for SaaS products that aren't hmziq sites: the kit's
	components and signature on five kinds of product. Every name, number,
	quote and price on them is example content.
-->
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
