<!--
  The workspace group's shell (app-blocks.md, phase 1): the AppShell block
  with the demo's two nav groups, the WorkspaceSwitcher as its brand, the
  UserMenu as its account (its theme choice turns the dark class on <html>),
  and the demo state switch in the top bar. The page owns routing: the shell
  only gets the current path.
-->
<script lang="ts">
	import { page } from '$app/state';
	import AppShell from '$brand/blocks/app/shell/app-shell.svelte';
	import UserMenu from '$brand/blocks/app/account/user-menu.svelte';
	import WorkspaceSwitcher from '$brand/blocks/app/account/workspace-switcher.svelte';
	import type { Theme } from '$brand/blocks/app/account/types.js';
	import type { NavGroup } from '$brand/blocks/app/shell/types.js';
	import { currentWorkspaceId, currentUser, workspaces } from '@hmziq/brand-core/app/demo-data';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import ChartNoAxesColumn from '@lucide/svelte/icons/chart-no-axes-column';
	import Settings from '@lucide/svelte/icons/settings';
	import Users from '@lucide/svelte/icons/users';
	import { Button } from '$brand/ui/button/index.js';
	import DemoStateSwitch from '$lib/demo-state-switch.svelte';
	import { applyTheme } from '$lib/theme.svelte.js';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const groups: NavGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '/app/overview', icon: ChartNoAxesColumn },
				{ label: 'Members', href: '/app/members', icon: Users },
			],
		},
		{
			label: 'Account',
			items: [{ label: 'Settings', href: '/app/settings/profile', icon: Settings }],
		},
	];

	// Switching workspace stays on the overview: the demo has one
	// workspace's worth of data, and the link is what matters.
	const switcherWorkspaces = workspaces.map((workspace) => ({ ...workspace, href: '/app/overview' }));

	// The theme choice starts from what app.html already applied. Effects
	// only run in the browser, so the server render never touches the
	// document.
	let theme = $state<Theme>('dark');
	$effect(() => {
		try {
			const stored = localStorage.getItem('theme');
			if (stored === 'light' || stored === 'dark' || stored === 'system') theme = stored;
		} catch {
			// Private modes can refuse storage; dark is the default.
		}
	});
</script>

<AppShell nav={groups} currentPath={page.url.pathname} open={data.sidebarOpen}>
	{#snippet brand()}
		<WorkspaceSwitcher workspaces={switcherWorkspaces} currentId={currentWorkspaceId} />
	{/snippet}
	{#snippet account()}
		<UserMenu
			user={currentUser}
			items={[
				{ label: 'Settings', href: '/app/settings/profile' },
				{ label: 'Billing', href: '/app/settings/billing', icon: CreditCard },
			]}
			{theme}
			onThemeChange={(next) => {
				applyTheme(next);
				theme = next;
			}}
		>
			{#snippet signOut()}
				<form method="POST" action="/app/sign-out" class="p-1">
					<Button type="submit" variant="ghost" size="sm" class="w-full justify-start">Sign out</Button>
				</form>
			{/snippet}
		</UserMenu>
	{/snippet}
	{#snippet topbar()}
		<DemoStateSwitch />
	{/snippet}
	{@render children()}
</AppShell>
