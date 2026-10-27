<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BeforeAfter from './before-after.svelte'

	const { Story } = defineMeta({ title: 'Site/Cards/Before after', component: BeforeAfter })
</script>

<Story name="Default" asChild>
	<BeforeAfter
		before="By hand"
		after="With gpui-query"
		rows={[
			['Loading state', 'A flag on every view, set by hand', 'The key knows'],
			['Refetching', 'Call it again and hope', 'Invalidate the key'],
			['Sharing results', 'Pass the value down yourself', 'Ask for the same key'],
		]}
	/>
</Story>
