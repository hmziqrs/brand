<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CopyButton from './copy-button.svelte'

	const { Story } = defineMeta({ title: 'Custom/Copy button', component: CopyButton })
</script>

<!-- With words next to the icon, for a command bar or a link bar. -->
<Story name="With label" asChild>
	<CopyButton text="cargo add gpui-query" label="Copy" />
</Story>

<!-- Without words: an icon button with a tooltip. The icon turns into a check for two seconds. -->
<Story name="Icon only" asChild>
	<CopyButton text="cargo add gpui-query" />
</Story>
