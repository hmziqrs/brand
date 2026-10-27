<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Steps from './steps.svelte'

	const { Story } = defineMeta({ title: 'Site/Sections/Steps', component: Steps })
</script>

<Story name="Default" asChild>
	<Steps
		items={[
			{ title: 'Install it', body: 'One command, from crates.io.' },
			{ title: 'Register your pages', body: 'The sidebar, the ⌘K launcher and links all follow.' },
			{ title: 'Ship it', body: 'That is the whole setup.' },
		]}
	/>
</Story>
