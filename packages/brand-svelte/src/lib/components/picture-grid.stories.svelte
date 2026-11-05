<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PictureGrid from './picture-grid.svelte'
	import { playbooks, work } from '$brand/blocks/sections/stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Custom/Picture grid',
		component: PictureGrid,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Work" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12"><PictureGrid items={work} /></div>
</Story>

<Story name="With filters" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12"><PictureGrid items={playbooks} filter="Where it runs" /></div>
</Story>
