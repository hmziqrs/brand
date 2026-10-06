<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BellRing from '@lucide/svelte/icons/bell-ring'
	import { Button } from '$brand/ui/button/index.js'
	import CardRoot from './card.svelte'
	import CardAction from './card-action.svelte'
	import CardContent from './card-content.svelte'
	import CardDescription from './card-description.svelte'
	import CardFooter from './card-footer.svelte'
	import CardHeader from './card-header.svelte'
	import CardTitle from './card-title.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Card',
		component: CardRoot,
		parameters: { layout: 'centered' },
	})

	const notifications = [
		{ title: 'Your call has been confirmed.', description: '1 hour ago' },
		{ title: 'You have a new message!', description: '1 hour ago' },
		{ title: 'Your subscription is expiring soon!', description: '2 hours ago' },
	]
</script>

<Story name="Default" asChild>
	<CardRoot class="w-96">
		<CardHeader>
			<CardTitle>Notifications</CardTitle>
			<CardDescription>You have 3 unread messages.</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			{#each notifications as notification, index (index)}
				<div class="flex items-center gap-4">
					<BellRing class="lucide size-6" />
					<div>
						<p>{notification.title}</p>
						<p class="text-foreground/60">{notification.description}</p>
					</div>
				</div>
			{/each}
		</CardContent>
		<CardFooter>
			<Button variant="link">Close</Button>
		</CardFooter>
	</CardRoot>
</Story>

<Story name="With card action" asChild>
	<CardRoot class="w-96">
		<CardHeader>
			<CardTitle>Team Settings</CardTitle>
			<CardDescription>Manage your team preferences</CardDescription>
			<CardAction>
				<Button size="sm" variant="outline">Edit</Button>
			</CardAction>
		</CardHeader>
		<CardContent>
			<p>Configure team members, permissions, and notifications.</p>
		</CardContent>
		<CardFooter>
			<Button variant="ghost">Cancel</Button>
			<Button class="ml-auto">Save Changes</Button>
		</CardFooter>
	</CardRoot>
</Story>

<Story name="Minimal card" asChild>
	<CardRoot class="w-96">
		<CardContent>
			<p class="text-sm">
				This is a minimal card with only content. Perfect for displaying simple information without the
				need for a header or footer.
			</p>
		</CardContent>
	</CardRoot>
</Story>

<Story name="Header only" asChild>
	<CardRoot class="w-96">
		<CardHeader>
			<CardTitle>Quick Stats</CardTitle>
			<CardDescription>Your account summary at a glance. Click for details.</CardDescription>
		</CardHeader>
	</CardRoot>
</Story>
