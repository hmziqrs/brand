<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Colors from './colors.svelte'
	import CustomComponents from './custom-components.svelte'
	import Icons from './icons.svelte'
	import Introduction from './introduction.svelte'
	import Signature from './signature.svelte'
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

<Story name="Icons" asChild>
	<Icons />
</Story>

<Story name="Signature" asChild>
	<Signature />
</Story>

<Story name="CustomComponents" asChild>
	<CustomComponents />
</Story>
