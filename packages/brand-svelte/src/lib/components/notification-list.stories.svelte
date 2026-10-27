<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AtSign from '@lucide/svelte/icons/at-sign'
	import CircleCheck from '@lucide/svelte/icons/circle-check'
	import GitMerge from '@lucide/svelte/icons/git-merge'
	import UserPlus from '@lucide/svelte/icons/user-plus'
	import NotificationList, { type Notice } from './notification-list.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Notification list',
		component: NotificationList,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	let items = $state<Notice[]>([
		{ id: '1', day: 'Today', at: '09:41', unread: true, icon: AtSign, title: 'Priya mentioned you on “Pricing page copy”', body: 'Can you look at the second paragraph before Friday?' },
		{ id: '2', day: 'Today', at: '08:12', unread: true, icon: GitMerge, title: 'A pull request closed “Fix the export button”', body: 'The task moved to Done by itself.' },
		{ id: '3', day: 'Yesterday', at: '17:30', icon: UserPlus, title: 'Lucas joined Launch week as a guest' },
		{ id: '4', day: 'Yesterday', at: '11:05', icon: CircleCheck, title: 'Your weekly check-in is ready', body: '12 of 14 people answered.' },
	])
</script>

<Story name="Default" asChild>
	<NotificationList class="max-w-md" {items} onread={(ids) => (items = items.map((i) => (ids.includes(i.id) ? { ...i, unread: false } : i)))} />
</Story>
