<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CircleAlert from '@lucide/svelte/icons/circle-alert'
	import AlertRoot from './alert.svelte'
	import AlertDescription from './alert-description.svelte'
	import AlertTitle from './alert-title.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Alert',
		component: AlertRoot,
	})
</script>

<Story name="Default" asChild>
	<AlertRoot>
		<AlertTitle>Heads up!</AlertTitle>
		<AlertDescription>You can add components to your app using the cli.</AlertDescription>
	</AlertRoot>
</Story>

<Story name="Destructive" asChild>
	<AlertRoot variant="destructive">
		<CircleAlert class="lucide h-4 w-4" />
		<AlertTitle>Error</AlertTitle>
		<AlertDescription>Your session has expired. Please log in again.</AlertDescription>
	</AlertRoot>
</Story>
