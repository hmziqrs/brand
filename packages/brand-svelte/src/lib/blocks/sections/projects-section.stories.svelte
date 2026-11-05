<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ProjectsSection from './projects-section.svelte'
	import { projects } from './stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Sections/Projects section',
		component: ProjectsSection,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Open source" asChild>
	<ProjectsSection kicker="Open source" title="Every line, in the open." lede="I build the tools I wish I had, finish them properly and give them away. Pick one to see what it does and how it starts." {projects} />
</Story>
