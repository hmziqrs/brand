<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Toc from './toc.svelte'

	const items = [
		{ id: 'install', label: 'Install' },
		{ id: 'quick-start', label: 'Quick start' },
		{ id: 'queries', label: 'Queries' },
		{ id: 'persistence', label: 'Persistence' },
	]

	const { Story } = defineMeta({ title: 'Custom/Toc', component: Toc })
</script>

<!-- A list of the page's headings. The one you're reading gets an orange ring. -->
<Story name="Default" asChild>
	<Toc {items} current="quick-start" />
</Story>

<!-- 01, 02… in orange instead of the rings, for numbered documents. -->
<Story name="Numbered" asChild>
	<Toc {items} current="queries" numbered />
</Story>
