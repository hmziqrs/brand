<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Colors from './colors.svelte'
	import Introduction from './introduction.svelte'
	import Typography from './typography.svelte'
	import Writing from './writing.svelte'

	const { Story } = defineMeta({
		title: 'Brand',
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Introduction" asChild>
	<Introduction />
</Story>

<Story name="Typography" asChild>
	<Typography />
</Story>

<Story name="Colors" asChild>
	<Colors />
</Story>

<Story name="Writing" asChild>
	<Writing />
</Story>
