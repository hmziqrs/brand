<script lang="ts">
	import { page } from '$app/state';
	import AppShell from '$brand/blocks/app/shell/app-shell.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import type { NavGroup } from '$brand/blocks/app/shell/types.js';
	import StatCard from '$brand/blocks/app/metrics/stat-card.svelte';
	import StatGrid from '$brand/blocks/app/metrics/stat-grid.svelte';
	import CollectionToolbar from '$brand/blocks/app/collection/collection-toolbar.svelte';
	import AppTableFrame from '$brand/blocks/app/table/app-table-frame.svelte';
	import TablePagination from '$brand/blocks/app/table/table-pagination.svelte';
	import SettingsSection from '$brand/blocks/app/settings/settings-section.svelte';
	import SettingRow from '$brand/blocks/app/settings/setting-row.svelte';
	import FormActions from '$brand/blocks/app/settings/form-actions.svelte';
	import Tag from '$brand/components/tag.svelte';
	import WorkspaceSwitcher from '$brand/blocks/app/account/workspace-switcher.svelte';
	import UserMenu from '$brand/blocks/app/account/user-menu.svelte';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import { Body, Cell, Head, Header, Row, Root } from '$brand/ui/table/index.js';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Switch } from '$brand/ui/switch/index.js';
	import { currentUser, currentWorkspaceId, members, overview, workspaces } from '@hmziq/brand-core/app/demo-data';
	import { relativeDate } from '@hmziq/brand-core/app/format';
	import ChartNoAxesColumn from '@lucide/svelte/icons/chart-no-axes-column';
	import Settings from '@lucide/svelte/icons/settings';
	import Users from '@lucide/svelte/icons/users';

	const groups: NavGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '/reference/dashboard', icon: ChartNoAxesColumn },
				{ label: 'Members', href: '/app/members', icon: Users },
			],
		},
		{
			label: 'Account',
			items: [{ label: 'Settings', href: '/app/settings/profile', icon: Settings }],
		},
	];

	const switcherWorkspaces = workspaces.map((workspace) => ({ ...workspace, href: '/reference/dashboard' }));

	const pageSize = 6;
	const recent = [...members].sort((a, b) => (b.lastActive ?? '').localeCompare(a.lastActive ?? '')).slice(0, pageSize);
	const current = $derived(Math.max(1, Number(page.url.searchParams.get('page') ?? 1)));

	let savedName = $state('Paperplane');
	let savedTwoStep = $state(true);
	let name = $state('Paperplane');
	let twoStep = $state(true);
	let justSaved = $state(false);
	const dirty = $derived(name !== savedName || twoStep !== savedTwoStep);

	function save(event: SubmitEvent) {
		event.preventDefault();
		savedName = name;
		savedTwoStep = twoStep;
		justSaved = true;
	}

	function reset() {
		name = savedName;
		twoStep = savedTwoStep;
		justSaved = false;
	}

	function statusTone(status: string) {
		return status === 'Active' ? 'success' : status === 'Invited' ? 'warning' : undefined;
	}
</script>

<svelte:head>
	<title>Dashboard — Reference</title>
</svelte:head>

<AppShell nav={groups} currentPath={page.url.pathname}>
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
		/>
	{/snippet}

	<AppPage>
		<AppPageHeader title="Overview" description="How the workspace is doing this month." />

		<div class="mt-8 flex flex-col gap-8">
			<StatGrid>
				{#each overview['30'] as stat (stat.label)}
					<StatCard
						label={stat.label}
						value={stat.value}
						trend={{ change: stat.change, good: stat.good, format: stat.format, comparison: stat.comparison }}
					/>
				{/each}
			</StatGrid>

			<section class="flex flex-col gap-4">
				<h2 class="text-base font-medium">Recent people</h2>
				<CollectionToolbar search={{ value: '', label: 'Search people', placeholder: 'Search people' }}>
					{#snippet count()}{members.length} people{/snippet}
				</CollectionToolbar>

				<AppTableFrame>
					<Root>
						<Header>
							<Row>
								<Head class="px-4">Member</Head>
								<Head class="px-4">Role</Head>
								<Head class="px-4">Status</Head>
								<Head class="px-4">Last active</Head>
							</Row>
						</Header>
						<Body>
							{#each recent as member (member.id)}
								<Row>
									<Cell class="px-4">
										<span class="flex flex-col">
											<span class="font-medium">{member.name}</span>
											<span class="text-muted-foreground">{member.email}</span>
										</span>
									</Cell>
									<Cell class="px-4">{member.role}</Cell>
									<Cell class="px-4">
										<Tag tone={statusTone(member.status)} marker={member.status === 'Active'}>
											{member.status === 'Invited' ? 'Invite sent' : member.status}
										</Tag>
									</Cell>
									<Cell class="px-4 text-muted-foreground">
										{member.lastActive ? relativeDate(member.lastActive) : 'Not yet'}
									</Cell>
								</Row>
							{/each}
						</Body>
					</Root>
					<TablePagination
						page={current}
						{pageSize}
						total={members.length}
						pageHref={(next) => `/reference/dashboard?page=${next}`}
					/>
				</AppTableFrame>
			</section>

			<form onsubmit={save} class="flex flex-col">
				<SettingsSection title="Workspace" description="The name people see on invites and in the sidebar.">
					<SettingRow label="Workspace name" for="workspace-name">
						<Input id="workspace-name" name="name" bind:value={name} />
					</SettingRow>
					<SettingRow label="Require two-step sign-in" description="Everyone signs in with a code as well as a password." orientation="horizontal" for="two-step">
						<Switch id="two-step" name="twoStep" bind:checked={twoStep} />
					</SettingRow>
					{#snippet footer()}
						<FormActions
							{dirty}
							pending={false}
							saved={justSaved && !dirty}
							submitLabel="Save changes"
						>
							{#snippet cancel(disabled)}
								<Button type="button" variant="outline" {disabled} onclick={reset}>Cancel</Button>
							{/snippet}
						</FormActions>
					{/snippet}
				</SettingsSection>
			</form>
		</div>
	</AppPage>
</AppShell>
