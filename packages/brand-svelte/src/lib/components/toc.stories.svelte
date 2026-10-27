<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Toc from './toc.svelte'

	const items = [
		{ id: 'install', label: 'Install' },
		{ id: 'quick-start', label: 'Quick start' },
		{ id: 'queries', label: 'Queries' },
		{ id: 'persistence', label: 'Persistence' },
	]

	const { Story } = defineMeta({
		title: 'Custom/Toc',
		component: Toc,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Toc {items} current="quick-start" />
</Story>

<Story name="Numbered" asChild>
	<Toc {items} current="queries" numbered />
</Story>
