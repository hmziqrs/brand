<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CollectionToolbar from './collection-toolbar.svelte'

	const { Story } = defineMeta({
		title: 'App/Collection',
		component: CollectionToolbar,
		parameters: { layout: 'padded' },
	})
</script>

<!--
  The collection group: the toolbar, the filter chips, the sort menu and the
  bulk bar, shown the way the members page holds them. Links point at the
  demo's real URLs so the stories read like the page.
-->
<script lang="ts">
	import BulkActionBar from './bulk-action-bar.svelte'
	import FilterChip from './filter-chip.svelte'
	import SortMenu from './sort-menu.svelte'
	import { listHref, type ListState } from '@hmziq/brand-core/app/list-params'
	import { Button } from '$brand/ui/button/index.js'

	const roles = [
		{ value: 'owner', label: 'Owner', count: 1 },
		{ value: 'admin', label: 'Admin', count: 4 },
		{ value: 'member', label: 'Member', count: 47 },
		{ value: 'viewer', label: 'Viewer', count: 8 },
	]
	const statuses = [
		{ value: 'active', label: 'Active', count: 50 },
		{ value: 'invited', label: 'Invited', count: 6 },
		{ value: 'suspended', label: 'Suspended', count: 4 },
	]
	const sortOptions = [
		{ value: '', label: 'Newest joined' },
		{ value: 'name', label: 'Name (A–Z)' },
		{ value: '-name', label: 'Name (Z–A)' },
		{ value: '-last_active', label: 'Last active (newest)' },
		{ value: 'last_active', label: 'Last active (oldest)' },
	]

	// The list's state, held the way the page holds it: the URL's, changed
	// through listHref. In the story the links stand still; the chips, the
	// sort and the search still show their states.
	let list = $state<ListState>({ q: '', filters: { role: [], status: [] }, sort: '-last_active', page: 1, perPage: 25 })
	const href = (change: Partial<ListState>) => listHref('/app/members', list, change)

	let selectedCount = $state(3)
</script>

<!-- The whole bar: search, two chips, the sort, the count. -->
<Story name="Toolbar" asChild>
	<div class="flex flex-col gap-4">
		<CollectionToolbar
			search={{
				value: list.q,
				label: 'Search members',
				placeholder: 'Search by name or email…',
				onChange: (q) => (list = { ...list, q }),
			}}
			clearFiltersHref={list.q || list.filters.role.length || list.filters.status.length ? href({ q: '', filters: { role: [], status: [] } }) : undefined}
		>
			{#snippet filters()}
				<FilterChip
					label="Role"
					name="role"
					options={roles}
					value={list.filters.role}
					onChange={(role) => (list = { ...list, filters: { ...list.filters, role } })}
					removeHref={href({ filters: { ...list.filters, role: [] } })}
				/>
				<FilterChip
					label="Status"
					name="status"
					options={statuses}
					value={list.filters.status}
					onChange={(status) => (list = { ...list, filters: { ...list.filters, status } })}
					removeHref={href({ filters: { ...list.filters, status: [] } })}
				/>
			{/snippet}
			{#snippet sort()}
				<SortMenu options={sortOptions} value={list.sort} hrefFor={(sort) => href({ sort })} />
			{/snippet}
			{#snippet count()}
				60 members
			{/snippet}
		</CollectionToolbar>
		<p class="text-sm text-muted-foreground">q “{list.q}”, role [{list.filters.role.join(', ')}], status [{list.filters.status.join(', ')}], sort “{list.sort || 'none'}”.</p>
	</div>
</Story>

<!-- While a refetch runs, the results stay and the count says it's busy. -->
<Story name="Toolbar, busy" asChild>
	<CollectionToolbar busy>
		{#snippet sort()}
			<SortMenu options={sortOptions} value={list.sort} hrefFor={(sort) => href({ sort })} />
		{/snippet}
		{#snippet count()}
			60 members
		{/snippet}
	</CollectionToolbar>
</Story>

<!-- Rows are picked: the same box, filled muted, with the bulk actions. -->
<Story name="Bulk action bar" asChild>
	<CollectionToolbar>
			{#snippet selection()}
			<BulkActionBar
				count={selectedCount}
				total={60}
				onSelectAll={() => (selectedCount = 60)}
				onClear={() => (selectedCount = 0)}
			>
				{#snippet actions()}
					<Button type="button" variant="outline" size="sm">Change role</Button>
					<Button type="button" variant="outline" size="sm" class="text-destructive">Remove</Button>
				{/snippet}
			</BulkActionBar>
		{/snippet}
	</CollectionToolbar>
</Story>

<!-- One chip of each kind: empty, one value on, several on. -->
<Story name="Filter chip" asChild>
	<div class="flex flex-wrap items-center gap-3">
		<FilterChip
			label="Role"
			name="role"
			options={roles}
			value={list.filters.role}
			onChange={(role) => (list = { ...list, filters: { ...list.filters, role } })}
			removeHref={href({ filters: { ...list.filters, role: [] } })}
		/>
		<FilterChip
			label="Status"
			name="status"
			options={statuses}
			value={['active']}
			onChange={() => {}}
			removeHref="/app/members?role=admin"
		/>
		<FilterChip
			label="Status"
			name="status"
			options={statuses}
			value={['active', 'invited']}
			onChange={() => {}}
			removeHref="/app/members?role=admin"
		/>
	</div>
</Story>

<!-- One choice at a time, and a list long enough to want searching. -->
<Story name="Filter chip, single choice and searchable" asChild>
	<div class="flex flex-wrap items-center gap-3">
		<FilterChip
			label="Time zone"
			name="time_zone"
			options={statuses}
			value={['active']}
			multiple={false}
			onChange={() => {}}
			removeHref="/app/members"
		/>
		<FilterChip
			label="Member"
			name="member"
			options={Array.from({ length: 12 }, (_, at) => ({ value: `usr_${at + 1}`, label: `Member number ${at + 1}` }))}
			value={['usr_3', 'usr_7']}
			onChange={() => {}}
			removeHref="/app/members"
		/>
	</div>
</Story>

<!-- The sort: the current order named on the trigger, checked in the menu. -->
<Story name="Sort menu" asChild>
	<div class="flex flex-wrap items-center gap-3">
		<SortMenu options={sortOptions} value="-last_active" hrefFor={(sort) => href({ sort })} />
		<SortMenu options={sortOptions} value="" hrefFor={(sort) => href({ sort })} />
	</div>
</Story>

<!-- At 360px: the search on its own line, the rest scrolling in one row. -->
<Story name="Collection, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="flex flex-col gap-4">
		<CollectionToolbar
			search={{ value: '', label: 'Search members', onChange: () => {} }}
			clearFiltersHref="/app/members"
		>
			{#snippet filters()}
				<FilterChip label="Role" name="role" options={roles} value={['admin']} onChange={() => {}} removeHref="/app/members?status=active" />
				<FilterChip label="Status" name="status" options={statuses} value={[]} onChange={() => {}} removeHref="/app/members" />
			{/snippet}
			{#snippet sort()}
				<SortMenu options={sortOptions} value={list.sort} hrefFor={(sort) => href({ sort })} />
			{/snippet}
			{#snippet count()}
				60 members
			{/snippet}
		</CollectionToolbar>
		<CollectionToolbar>
			{#snippet selection()}
				<BulkActionBar count={2} total={60} onSelectAll={() => {}} onClear={() => {}}>
					{#snippet actions()}
						<Button type="button" variant="outline" size="sm">Change role</Button>
					{/snippet}
				</BulkActionBar>
			{/snippet}
		</CollectionToolbar>
	</div>
</Story>
