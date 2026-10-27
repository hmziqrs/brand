<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LinkBar from './link-bar.svelte'

	const { Story } = defineMeta({ title: 'Content/Link bar', component: LinkBar })
</script>

<Story name="Default" asChild>
	<LinkBar url="https://freeoxide.com/gpui-query" />
</Story>
