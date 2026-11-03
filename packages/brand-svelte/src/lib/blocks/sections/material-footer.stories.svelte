<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialFooter from './material-footer.svelte'
	import { studioColumns } from './stories-data.js'

	const { Story } = defineMeta({
		title: 'Sections/Material footer',
		component: MaterialFooter,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="With a closing line" asChild>
	<MaterialFooter
		site="example"
		maker="studio"
		href="#"
		tagline="A small studio. We build web, mobile, and desktop software, carefully."
		columns={studioColumns}
		cta={{ title: 'Got an app in mind?', primary: { label: 'Start a project', href: '#' }, secondary: { label: 'See our work', href: '#' } }}
		status="Available for new projects"
		legal="© 2026 example. A small studio."
		aside="Remote · replies within a working day"
	/>
</Story>

<Story name="Plain" asChild>
	<MaterialFooter site="example" maker="studio" href="#" tagline="A small studio. We build web, mobile, and desktop software, carefully." columns={studioColumns} legal="© 2026 example. A small studio." />
</Story>
