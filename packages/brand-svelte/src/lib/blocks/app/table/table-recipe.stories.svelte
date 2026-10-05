<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppTableFrame from './app-table-frame.svelte'

	const { Story } = defineMeta({
		title: 'App/Table recipe',
		component: AppTableFrame,
		parameters: { layout: 'padded' },
	})
</script>

<!--
  The recipe: a whole list page — toolbar, filters, sort, selection, bulk
  actions, row actions, pagination — with @tanstack/table-core underneath,
  as shadcn-svelte's data table guide uses it. It's a pattern to copy, not
  an exported component. The list state lives in URL params held by the
  story (a story can't move its own URL): every link is built with listHref
  and applied through readListParams, exactly what the members page does
  with goto.
-->
<script lang="ts">
	import {
		createTable,
		functionalUpdate,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type RowSelectionState,
		type SortingState,
	} from '@tanstack/table-core'
	import { listHref, readListParams, type ListState } from '@hmziq/brand-core/app/list-params'
	import { members, type Member } from '@hmziq/brand-core/app/demo-data'
	import { relativeDate } from '@hmziq/brand-core/app/format'
	import BulkActionBar from '../collection/bulk-action-bar.svelte'
	import CollectionToolbar from '../collection/collection-toolbar.svelte'
	import FilterChip from '../collection/filter-chip.svelte'
	import SortMenu from '../collection/sort-menu.svelte'
	import RowActions from './row-actions.svelte'
	import RowCheckbox from './row-checkbox.svelte'
	import SelectAllCheckbox from './select-all-checkbox.svelte'
	import SortableHead from './sortable-head.svelte'
	import TablePagination from './table-pagination.svelte'
	import TableSkeletonRows from './table-skeleton-rows.svelte'
	import TableStateRow from './table-state-row.svelte'
	import { Body, Cell, Head, Header, Row, Root } from '$brand/ui/table/index.js'
	import Tag from '$brand/components/tag.svelte'
	import EmptyState from '../states/empty-state.svelte'
	import ErrorState from '../states/error-state.svelte'
	import NoResults from '../states/no-results.svelte'
	import Users from '@lucide/svelte/icons/users'
	import { Button } from '$brand/ui/button/index.js'

	const PATH = '/app/members'
	const FILTERS = ['role', 'status']
	const SORT_OPTIONS = [
		{ value: '', label: 'Newest joined' },
		{ value: 'name', label: 'Name (A–Z)' },
		{ value: '-name', label: 'Name (Z–A)' },
		{ value: '-last_active', label: 'Last active (newest)' },
		{ value: 'last_active', label: 'Last active (oldest)' },
	]
	// The sort the URL spells and the sort TanStack holds, translated here.
	const SORT_FIELDS: Record<string, string> = { name: 'name', last_active: 'lastActive' }
	const toSorting = (sort: string): SortingState => {
		const desc = sort.startsWith('-')
		const id = SORT_FIELDS[desc ? sort.slice(1) : sort]
		return id ? [{ id, desc }] : []
	}
	const fromField = (field: string, desc: boolean) =>
		Object.entries(SORT_FIELDS)
			.filter(([, id]) => id === field)
			.map(([key]) => (desc ? `-${key}` : key))[0] ?? ''

	const roleOptions = [
		{ value: 'owner', label: 'Owner', count: members.filter((m) => m.role === 'Owner').length },
		{ value: 'admin', label: 'Admin', count: members.filter((m) => m.role === 'Admin').length },
		{ value: 'member', label: 'Member', count: members.filter((m) => m.role === 'Member').length },
		{ value: 'viewer', label: 'Viewer', count: members.filter((m) => m.role === 'Viewer').length },
	]
	const statusOptions = [
		{ value: 'active', label: 'Active', count: members.filter((m) => m.status === 'Active').length },
		{ value: 'invited', label: 'Invited', count: members.filter((m) => m.status === 'Invited').length },
		{ value: 'suspended', label: 'Suspended', count: members.filter((m) => m.status === 'Suspended').length },
	]

	// The URL's list state, as the page receives it from +page.ts.
	let list = $state<ListState>(readListParams('?sort=-last_active', FILTERS))
	// Removals in the story edit a local copy, as a real page would its data.
	let roster = $state<Member[]>(members)
	let rowSelection = $state<RowSelectionState>({})

	const hrefOf = (change: Partial<ListState>) => listHref(PATH, list, change)

	/** What the page does in its goto: the href becomes the state. */
	function navigate(href: string) {
		list = readListParams(href, FILTERS)
	}

	// Links inside the story apply their href instead of leaving the iframe.
	// A detail link can't be routed from a story, so it stands still.
	function onShellClick(event: MouseEvent) {
		const anchor = (event.target as HTMLElement).closest('a')
		if (!anchor) return
		const href = anchor.getAttribute('href') ?? ''
		if (!href.startsWith(PATH)) return
		event.preventDefault()
		if (new URL(href, 'https://story.local').pathname === PATH) navigate(href)
	}

	// The page's GET form: with JavaScript the submit is read here; without
	// it the browser would carry the same fields to the server.
	function onsubmit(event: SubmitEvent) {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const params = new URLSearchParams()
		for (const [key, value] of data.entries()) if (typeof value === 'string') params.append(key, value)
		navigate(`${PATH}?${params}`)
	}

	const filtered = $derived.by(() => {
		const q = list.q.toLowerCase()
		return roster.filter(
			(m) =>
				(!q || m.name.toLowerCase().includes(q) || m.email.includes(q)) &&
				(list.filters.role.length === 0 || list.filters.role.includes(m.role.toLowerCase())) &&
				(list.filters.status.length === 0 || list.filters.status.includes(m.status.toLowerCase())),
		)
	})
	const filtering = $derived(list.q !== '' || list.filters.role.length > 0 || list.filters.status.length > 0)
	const pageCount = $derived(Math.max(1, Math.ceil(filtered.length / list.perPage)))
	// A URL can point past the end (rows removed); the page shows the last one.
	const page = $derived(Math.min(list.page, pageCount))

	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'name' },
		{ accessorKey: 'role' },
		{ accessorKey: 'status' },
		{ accessorKey: 'lastActive' },
	]

	const table = $derived(
		createTable({
			data: filtered,
			columns,
			getRowId: (row) => row.id,
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			// The URL owns the reset rule (a new search or filter starts at page 1).
			autoResetPageIndex: false,
			// The state above comes from outside, so the table never announces
			// its own changes; nothing here renders a fallback.
			onStateChange: () => {},
			renderFallbackValue: null,
			state: {
				sorting: toSorting(list.sort),
				pagination: { pageIndex: page - 1, pageSize: list.perPage },
				rowSelection,
			},
			onRowSelectionChange: (updater) => {
				rowSelection = functionalUpdate(updater, rowSelection)
			},
		}),
	)

	const selectedCount = $derived(Object.keys(rowSelection).length)
	const rows = $derived(table.getRowModel().rows)

	// The sort link for a column: none → up → down → none.
	function toggleSortHref(field: string) {
		const current = toSorting(list.sort).find((s) => s.id === field)
		return hrefOf({ sort: current ? fromField(field, !current.desc) : fromField(field, false) })
	}
	const sorted = (field: string): false | 'asc' | 'desc' => {
		const current = toSorting(list.sort).find((s) => s.id === field)
		return current ? (current.desc ? 'desc' : 'asc') : false
	}
</script>

{#snippet statusOf(member)}
	{#if member.status === 'Active'}
		<Tag tone="success" marker>Active</Tag>
	{:else if member.status === 'Invited'}
		<Tag tone="warning">Invite sent</Tag>
	{:else}
		<Tag>Suspended</Tag>
	{/if}
{/snippet}

{#snippet memberCell(member, selectable = true)}
	<span class="flex items-center gap-3">
		{#if selectable}
			<RowCheckbox
				checked={member.id in rowSelection}
				onCheckedChange={(on) => table.getRow(member.id).toggleSelected(on)}
				label={`Select ${member.name}`}
			/>
		{/if}
		<span class="flex min-w-0 flex-col">
			<a
				href="{PATH}/{member.id}"
				class="truncate font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				{member.name}
			</a>
			<span class="truncate text-muted-foreground">{member.email}</span>
		</span>
	</span>
{/snippet}

{#snippet tableBody()}
	<Body>
		{#if rows.length === 0}
			<TableStateRow colSpan={5}>
				{#if filtering}
					<NoResults
						query={list.q}
						filtered={list.filters.role.length + list.filters.status.length > 0}
						clearHref={hrefOf({ q: '', filters: { role: [], status: [] } })}
						noun="members"
					/>
				{:else}
					<EmptyState icon={Users} title="No members yet" description="Invite your team to see the same dashboards." />
				{/if}
			</TableStateRow>
		{:else}
			{#each rows as row (row.id)}
				{@const member = row.original}
				<Row data-state={row.getIsSelected() ? 'selected' : undefined}>
					<Cell class="px-4">{@render memberCell(member)}</Cell>
					<Cell class="px-4">{member.role}</Cell>
					<Cell class="px-4">{@render statusOf(member)}</Cell>
					<Cell class="px-4 text-muted-foreground">
						{member.lastActive ? relativeDate(member.lastActive) : 'Not yet'}
					</Cell>
					<Cell class="px-4">
						<RowActions
							label={`Actions for ${member.name}`}
							items={[
								{ label: 'View', href: `${PATH}/${member.id}` },
								{ label: 'Change role', onSelect: () => {} },
								...(member.status === 'Invited' ? [{ label: 'Resend invite' as const, onSelect: () => {} }] : []),
								{ label: 'Remove', onSelect: () => (roster = roster.filter((m) => m.id !== member.id)), tone: 'destructive' as const },
							]}
						/>
					</Cell>
				</Row>
			{/each}
		{/if}
	</Body>
{/snippet}

<!-- The story's stand-in for goto: list links apply their href instead of
     leaving the iframe. A detail link can't be routed from a story, so it
     stands still. -->
<svelte:window onclick={onShellClick} />

<Story name="Recipe" asChild>
	<!-- The whole list as one GET form: the search, the chips' hidden inputs
	     and the per-page select all submit, with or without JavaScript. -->
	<form method="GET" action={PATH} {onsubmit}>
		<div class="flex max-w-5xl flex-col gap-4" data-slot="table-recipe">
			<CollectionToolbar
				search={{
					value: list.q,
					label: 'Search members',
					placeholder: 'Search by name or email…',
					onChange: (q) => navigate(hrefOf({ q })),
				}}
				clearFiltersHref={filtering ? hrefOf({ q: '', filters: { role: [], status: [] } }) : undefined}
				selection={selectedCount > 0 ? selectionBar : undefined}
			>
				{#snippet filters()}
					<FilterChip
						label="Role"
						name="role"
						options={roleOptions}
						value={list.filters.role}
						onChange={(role) => navigate(hrefOf({ filters: { ...list.filters, role } }))}
						removeHref={hrefOf({ filters: { ...list.filters, role: [] } })}
					/>
					<FilterChip
						label="Status"
						name="status"
						options={statusOptions}
						value={list.filters.status}
						onChange={(status) => navigate(hrefOf({ filters: { ...list.filters, status } }))}
						removeHref={hrefOf({ filters: { ...list.filters, status: [] } })}
					/>
				{/snippet}
				{#snippet sort()}
					<SortMenu options={SORT_OPTIONS} value={list.sort} hrefFor={(sort) => hrefOf({ sort })} />
				{/snippet}
				{#snippet count()}
					{filtered.length} of {roster.length} members
				{/snippet}
			</CollectionToolbar>

			<AppTableFrame stickyFirstColumn>
				<Root>
					<Header>
						<Row>
							<SortableHead label="Member" sorted={sorted('name')} href={toggleSortHref('name')}>
								{#snippet leading()}
									<SelectAllCheckbox
										checked={rows.length > 0 && rows.every((row) => row.getIsSelected())}
										indeterminate={rows.some((row) => row.getIsSelected()) && rows.some((row) => !row.getIsSelected())}
										onCheckedChange={(on) => table.toggleAllPageRowsSelected(on)}
									/>
								{/snippet}
							</SortableHead>
							<Head>Role</Head>
							<Head>Status</Head>
							<SortableHead label="Last active" sorted={sorted('lastActive')} href={toggleSortHref('lastActive')} />
							<Head class="w-12"><span class="sr-only">Actions</span></Head>
						</Row>
					</Header>
					{@render tableBody()}
				</Root>
				{#if filtered.length > 0}
					<TablePagination
						class="border-t border-border"
						{page}
						pageSize={list.perPage}
						total={filtered.length}
						pageHref={(next) => hrefOf({ page: next })}
						pageSizes={[25, 50]}
					/>
				{/if}
			</AppTableFrame>
		</div>
	</form>
</Story>

{#snippet selectionBar()}
	<BulkActionBar
		count={selectedCount}
		total={filtered.length}
		onSelectAll={() => {
			const next = { ...rowSelection }
			for (const row of table.getPrePaginationRowModel().rows) next[row.id] = true
			rowSelection = next
		}}
		onClear={() => (rowSelection = {})}
	>
		{#snippet actions()}
			<Button type="button" variant="outline" size="sm">Change role</Button>
			<Button
				type="button"
				variant="outline"
				size="sm"
				class="text-destructive"
				onclick={() => {
					roster = roster.filter((m) => !(m.id in rowSelection));
					rowSelection = {};
				}}
			>
				Remove {selectedCount} {selectedCount === 1 ? 'member' : 'members'}
			</Button>
		{/snippet}
	</BulkActionBar>
{/snippet}

<!-- The list's other faces, held the way the page shows them. -->
<Story name="Recipe, pending" asChild>
	<div class="max-w-5xl" data-slot="table-recipe">
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<SortableHead label="Member" sorted={false} href={toggleSortHref('name')} />
						<Head>Role</Head>
						<Head>Status</Head>
						<SortableHead label="Last active" sorted={false} href={toggleSortHref('lastActive')} />
						<Head class="w-12"><span class="sr-only">Actions</span></Head>
					</Row>
				</Header>
				<Body>
					<TableSkeletonRows rows={10} columns={['36%', '14%', '16%', '20%', '14%']} />
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>

<Story name="Recipe, empty" asChild>
	<div class="max-w-5xl" data-slot="table-recipe">
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<SortableHead label="Member" sorted={false} href={toggleSortHref('name')} />
						<Head>Role</Head>
						<Head>Status</Head>
						<SortableHead label="Last active" sorted={false} href={toggleSortHref('lastActive')} />
						<Head class="w-12"><span class="sr-only">Actions</span></Head>
					</Row>
				</Header>
				<Body>
					<TableStateRow colSpan={5}>
						<EmptyState icon={Users} title="No members yet" description="Invite your team to see the same dashboards.">
							{#snippet actions()}
								<Button type="button">Invite people</Button>
							{/snippet}
						</EmptyState>
					</TableStateRow>
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>

<Story name="Recipe, no results and filtered empty" asChild>
	<div class="flex max-w-5xl flex-col gap-4" data-slot="table-recipe">
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<SortableHead label="Member" sorted={false} href={toggleSortHref('name')} />
						<Head>Role</Head>
						<Head>Status</Head>
						<SortableHead label="Last active" sorted={false} href={toggleSortHref('lastActive')} />
						<Head class="w-12"><span class="sr-only">Actions</span></Head>
					</Row>
				</Header>
				<Body>
					<TableStateRow colSpan={5}>
						<NoResults query="zzz" clearHref={hrefOf({ q: '' })} noun="members" />
					</TableStateRow>
				</Body>
			</Root>
		</AppTableFrame>
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<SortableHead label="Member" sorted={false} href={toggleSortHref('name')} />
						<Head>Role</Head>
						<Head>Status</Head>
						<SortableHead label="Last active" sorted={false} href={toggleSortHref('lastActive')} />
						<Head class="w-12"><span class="sr-only">Actions</span></Head>
					</Row>
				</Header>
				<Body>
					<TableStateRow colSpan={5}>
						<NoResults filtered clearHref={hrefOf({ q: '', filters: { role: [], status: [] } })} noun="members" />
					</TableStateRow>
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>

<Story name="Recipe, error" asChild>
	<div class="max-w-5xl" data-slot="table-recipe">
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<SortableHead label="Member" sorted={false} href={toggleSortHref('name')} />
						<Head>Role</Head>
						<Head>Status</Head>
						<SortableHead label="Last active" sorted={false} href={toggleSortHref('lastActive')} />
						<Head class="w-12"><span class="sr-only">Actions</span></Head>
					</Row>
				</Header>
				<Body>
					<TableStateRow colSpan={5}>
						<ErrorState onRetry={() => {}} />
					</TableStateRow>
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>

<!-- A refetch keeps the rows and says so by the count. -->
<Story name="Recipe, refetching" asChild>
	<div class="flex max-w-5xl flex-col gap-4" data-slot="table-recipe">
		<CollectionToolbar busy>
			{#snippet count()}
				60 members
			{/snippet}
		</CollectionToolbar>
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<SortableHead label="Member" sorted={sorted('name')} href={toggleSortHref('name')} />
						<Head>Role</Head>
						<Head>Status</Head>
						<SortableHead label="Last active" sorted={sorted('lastActive')} href={toggleSortHref('lastActive')} />
						<Head class="w-12"><span class="sr-only">Actions</span></Head>
					</Row>
				</Header>
				<Body>
					{#each members.slice(0, 5) as member (member.id)}
						<Row>
							<Cell class="px-4">{@render memberCell(member, false)}</Cell>
							<Cell class="px-4">{member.role}</Cell>
							<Cell class="px-4">{@render statusOf(member)}</Cell>
							<Cell class="px-4 text-muted-foreground">{member.lastActive ? relativeDate(member.lastActive) : 'Not yet'}</Cell>
							<Cell class="px-4">
								<RowActions label={`Actions for ${member.name}`} items={[{ label: 'View', href: `${PATH}/${member.id}` }]} />
							</Cell>
						</Row>
					{/each}
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>
