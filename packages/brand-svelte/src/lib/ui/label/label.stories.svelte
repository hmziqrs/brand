<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Label } from '$brand/ui/label/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Label',
		component: Label,
	})
</script>

<Story name="Default" asChild>
	<Label for="email">Your email address</Label>
</Story>
