<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Badge from './badge.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Badge',
		component: Badge,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Badge>Badge</Badge>
</Story>

<Story name="Secondary" asChild>
	<Badge variant="secondary">Badge</Badge>
</Story>

<Story name="Destructive" asChild>
	<Badge variant="destructive">Badge</Badge>
</Story>

<Story name="Outline" asChild>
	<Badge variant="outline">Badge</Badge>
</Story>
