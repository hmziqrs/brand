<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppPageHeader from './app-page-header.svelte'

	const { Story } = defineMeta({
		title: 'App/Shell',
		component: AppPageHeader,
	})
</script>

<script lang="ts">
	import { Button } from '$brand/ui/button/index.js'

	const settingsTabs = [
		{ label: 'Profile', href: '/app/settings/profile' },
		{ label: 'Workspace', href: '/app/settings/workspace' },
		{ label: 'Notifications', href: '/app/settings/notifications' },
		{ label: 'Billing', href: '/app/settings/billing', count: 6 },
	]
</script>

{#snippet actions()}
	<Button size="sm">Invite people</Button>
	<Button variant="outline" size="sm">Export</Button>
{/snippet}

<!-- The least a page says: what it is, and a line about it. -->
<Story name="Header" asChild>
	<div class="max-w-3xl px-4 py-6 md:px-8 md:py-8">
		<AppPageHeader title="Overview" description="What happened in the workspace lately." />
	</div>
</Story>

<!-- Where the page sits, and what you can do on it. -->
<Story name="With breadcrumbs and actions" asChild>
	<div class="max-w-3xl px-4 py-6 md:px-8 md:py-8">
		<AppPageHeader
			title="Maya Fernandes"
			description="Owner of the workspace, signed in with email."
			breadcrumbs={[
				{ label: 'Members', href: '/app/members' },
				{ label: 'Maya Fernandes' },
			]}
			{actions}
		/>
	</div>
</Story>

<!-- The page's own tabs, as links; the count shows as a grey Tag. -->
<Story name="With tabs" asChild>
	<div class="max-w-3xl px-4 py-6 md:px-8 md:py-8">
		<AppPageHeader
			title="Settings"
			description="Your account, this workspace, and how you hear from us."
			tabs={settingsTabs}
			currentPath="/app/settings/notifications"
		/>
	</div>
</Story>

<!-- The back link stands in for the breadcrumbs on small screens. -->
<Story name="Header on mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="max-w-3xl px-4 py-6">
		<AppPageHeader
			title="Maya Fernandes"
			description="Owner of the workspace, signed in with email."
			back={{ label: 'Members', href: '/app/members' }}
			breadcrumbs={[
				{ label: 'Members', href: '/app/members' },
				{ label: 'Maya Fernandes' },
			]}
			tabs={settingsTabs}
			currentPath="/app/settings/profile"
		/>
	</div>
</Story>
