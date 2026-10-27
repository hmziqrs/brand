<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CopyButton from './copy-button.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Copy button',
		component: CopyButton,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="With label" asChild>
	<CopyButton text="cargo add gpui-query" label="Copy" />
</Story>

<Story name="Icon only" asChild>
	<CopyButton text="cargo add gpui-query" />
</Story>
