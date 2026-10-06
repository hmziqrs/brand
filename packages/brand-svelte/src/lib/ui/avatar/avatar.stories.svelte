<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Avatar, AvatarFallback, AvatarImage } from '$brand/ui/avatar/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Avatar',
		component: Avatar,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Avatar>
		<AvatarImage src="https://github.com/shadcn.png" />
		<AvatarFallback>CN</AvatarFallback>
	</Avatar>
</Story>
