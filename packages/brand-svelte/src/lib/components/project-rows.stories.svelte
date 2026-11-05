<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ProjectRows from './project-rows.svelte'
	import { projects } from '$brand/blocks/sections/stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Custom/Project rows',
		component: ProjectRows,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Four tools" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12"><ProjectRows {projects} /></div>
</Story>
