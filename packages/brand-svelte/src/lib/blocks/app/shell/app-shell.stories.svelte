<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppShell from './app-shell.svelte'

	const { Story } = defineMeta({
		title: 'App/Shell',
		component: AppShell,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import ChartNoAxesColumn from '@lucide/svelte/icons/chart-no-axes-column'
	import Settings from '@lucide/svelte/icons/settings'
	import Users from '@lucide/svelte/icons/users'
	import AppPage from './app-page.svelte'
	import AppPageHeader from './app-page-header.svelte'
	import UserMenu from '../account/user-menu.svelte'
	import WorkspaceSwitcher from '../account/workspace-switcher.svelte'
	import type { Theme } from '../account/types.js'
	import { storyUser, storyUserItems, storyWorkspaces } from '../stories-data.js'
	import type { NavGroup } from './types.js'
	import Tag from '$brand/components/tag.svelte'
	import { Button } from '$brand/ui/button/index.js'

	let theme = $state<Theme>('dark')

	const nav = $derived<NavGroup[]>([
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '/app/overview', icon: ChartNoAxesColumn },
				{ label: 'Members', href: '/app/members', icon: Users, badge: memberCount },
			],
		},
		{
			label: 'Account',
			items: [{ label: 'Settings', href: '/app/settings/profile', icon: Settings }],
		},
	])

	const nestedNav = $derived<NavGroup[]>([
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '/app/overview', icon: ChartNoAxesColumn },
				{
					label: 'Members',
					href: '/app/members',
					icon: Users,
					items: [
						{ label: 'All members', href: '/app/members', exact: true },
						{ label: 'Invites', href: '/app/members/invites' },
						{ label: 'Roles', href: '/app/members/roles' },
					],
				},
			],
		},
		{
			label: 'Account',
			items: [{ label: 'Settings', href: '/app/settings/profile', icon: Settings }],
		},
	])

	async function openMobileSheet({ canvasElement }: { canvasElement: HTMLElement }) {
		const view = canvasElement.ownerDocument.defaultView
		if (!view?.matchMedia('(max-width: 767px)').matches) return
		await new Promise((resolve) => setTimeout(resolve, 100))
		canvasElement.querySelector<HTMLElement>('[data-sidebar="trigger"]')?.click()
	}
</script>

{#snippet memberCount()}
	<Tag tone="warning">3</Tag>
{/snippet}

{#snippet brand()}
	<WorkspaceSwitcher workspaces={storyWorkspaces} currentId="ws_paperplane" createHref="/app/settings/workspace" />
{/snippet}

{#snippet account()}
	<UserMenu user={storyUser} items={storyUserItems} {theme} onThemeChange={(next) => (theme = next)} />
{/snippet}

{#snippet topbar()}
	<Button size="sm">Invite people</Button>
{/snippet}

{#snippet page(title: string, description: string, crumbs?: { label: string; href?: string }[])}
	<AppPage>
		<AppPageHeader title={title} description={description} breadcrumbs={crumbs} />
		<p class="mt-6 text-sm text-muted-foreground">The page's content starts under its header.</p>
	</AppPage>
{/snippet}

<Story name="Sidebar" asChild>
	<AppShell {nav} currentPath="/app/members" {brand} {account} {topbar}>
		{@render page('Members', 'People who can see this workspace.', [
			{ label: 'Paperplane', href: '/app/overview' },
			{ label: 'Members' },
		])}
	</AppShell>
</Story>

<Story name="Collapsed" asChild>
	<AppShell {nav} currentPath="/app/members" open={false} {brand} {account} {topbar}>
		{@render page('Members', 'People who can see this workspace.')}
	</AppShell>
</Story>

<Story name="Nested active item" asChild>
	<AppShell nav={nestedNav} currentPath="/app/members/invites" {brand} {account} {topbar}>
		{@render page('Invites', 'People asked to join the workspace.', [
			{ label: 'Members', href: '/app/members' },
			{ label: 'Invites' },
		])}
	</AppShell>
</Story>

<Story name="Top layout" asChild>
	<AppShell {nav} currentPath="/app/overview" layout="top" {brand} {account} {topbar}>
		{@render page('Overview', 'What happened in the workspace lately.')}
	</AppShell>
</Story>

<Story
	name="Mobile, sheet open"
	parameters={{ viewport: { defaultViewport: 'phone360' } }}
	play={openMobileSheet}
	asChild
>
	<AppShell {nav} currentPath="/app/members" {brand} {account} {topbar}>
		{@render page('Members', 'People who can see this workspace.')}
	</AppShell>
</Story>
