<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppTableFrame from './app-table-frame.svelte'

	const { Story } = defineMeta({
		title: 'App/Table',
		component: AppTableFrame,
		parameters: { layout: 'padded' },
	})
</script>

<!--
  The table parts on the stock Table: the frame, the sortable head, the two
  checkboxes, the row actions, the pagination, the state row and the loading
  rows, all with the demo's members as the data.
-->
<script lang="ts">
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
	import NoResults from '../states/no-results.svelte'
	import Users from '@lucide/svelte/icons/users'
	import { members } from '@hmziq/brand-core/app/demo-data'

	const page = members.slice(0, 5)
	let sort = $state<false | 'asc' | 'desc'>('asc')
	let checked = $state<string[]>([page[1].id])

	// The sort link points at the page sorted the other way.
	function sortHref(next: string) {
		return `/app/members?sort=${next}`
	}
</script>

{#snippet tableRows(withStates = false)}
	<Root>
		<Header>
			<Row>
				<SortableHead label="Member" sorted={sort} href={sortHref('-name')}>
					{#snippet leading()}
						<SelectAllCheckbox
							checked={checked.length === page.length}
							indeterminate={checked.length > 0 && checked.length < page.length}
							onCheckedChange={(on) => (checked = on ? page.map((member) => member.id) : [])}
						/>
					{/snippet}
				</SortableHead>
				<Head>Role</Head>
				<Head>Status</Head>
				<SortableHead label="Last active" sorted={false} href="/app/members?sort=-last_active" />
				<Head class="w-12"><span class="sr-only">Actions</span></Head>
			</Row>
		</Header>
		<Body>
			{#if withStates}
				<TableStateRow colSpan={5}>
					<NoResults query="ada" clearHref="/app/members" noun="members" />
				</TableStateRow>
			{:else}
				{#each page as member (member.id)}
					<Row data-state={checked.includes(member.id) ? 'selected' : undefined}>
						<Cell class="px-4">
							<span class="flex items-center gap-3">
								<RowCheckbox
									checked={checked.includes(member.id)}
									onCheckedChange={(on) =>
										(checked = on ? [...checked, member.id] : checked.filter((id) => id !== member.id))}
									label={`Select ${member.name}`}
								/>
								<span class="flex min-w-0 flex-col">
									<a href={`/app/members/${member.id}`} class="truncate font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50">{member.name}</a>
									<span class="truncate text-muted-foreground">{member.email}</span>
								</span>
							</span>
						</Cell>
						<Cell class="px-4">{member.role}</Cell>
						<Cell class="px-4">
							{#if member.status === 'Active'}
								<Tag tone="success" marker>Active</Tag>
							{:else if member.status === 'Invited'}
								<Tag tone="warning">Invite sent</Tag>
							{:else}
								<Tag>Suspended</Tag>
							{/if}
						</Cell>
						<Cell class="px-4 text-muted-foreground">{member.joined}</Cell>
						<Cell class="px-4">
							<RowActions
								label={`Actions for ${member.name}`}
								items={[
									{ label: 'View', href: `/app/members/${member.id}` },
									{ label: 'Change role', onSelect: () => {} },
									{ label: 'Remove', onSelect: () => {}, tone: 'destructive' },
								]}
							/>
						</Cell>
					</Row>
				{/each}
			{/if}
		</Body>
	</Root>
{/snippet}

<!-- The frame around the stock table, with a sortable, selectable column. -->
<Story name="Frame" asChild>
	<div class="max-w-3xl">
		<AppTableFrame>
			{@render tableRows()}
		</AppTableFrame>
	</div>
</Story>

<!-- The first column stays put while the table scrolls sideways. -->
<Story name="Frame, sticky first column" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="max-w-md">
		<AppTableFrame stickyFirstColumn>
			{@render tableRows()}
		</AppTableFrame>
	</div>
</Story>

<!-- The header stays visible while the rows wait for their data. -->
<Story name="Skeleton rows" asChild>
	<div class="max-w-3xl">
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<Head class="px-4">Member</Head>
						<Head>Role</Head>
						<Head>Status</Head>
						<Head>Last active</Head>
					</Row>
				</Header>
				<Body>
					<TableSkeletonRows rows={5} columns={['38%', '18%', '18%', '26%']} />
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>

<!-- No results inside the table: the header keeps it company. -->
<Story name="State row" asChild>
	<div class="max-w-3xl">
		<AppTableFrame>
			{@render tableRows(true)}
		</AppTableFrame>
		<AppTableFrame class="mt-4">
			<Root>
				<Header>
					<Row>
						<Head class="px-4">Member</Head>
						<Head>Role</Head>
					</Row>
				</Header>
				<Body>
					<TableStateRow colSpan={2}>
						<EmptyState icon={Users} title="No members yet" description="Invite your team to see the same dashboards." />
					</TableStateRow>
				</Body>
			</Root>
		</AppTableFrame>
	</div>
</Story>

<!-- The head's three states: unsorted, ascending, descending. -->
<Story name="Sortable head" asChild>
	<AppTableFrame>
		<Root>
			<Header>
				<Row>
					<SortableHead label="Member" sorted={false} href="/app/members?sort=name" />
					<SortableHead label="Joined" sorted="asc" href="/app/members?sort=-joined" />
					<SortableHead label="Last active" sorted="desc" href="/app/members" />
				</Row>
			</Header>
			<Body>
				<Row>
					<Cell class="px-4 text-muted-foreground">…</Cell>
					<Cell class="px-4 text-muted-foreground">…</Cell>
					<Cell class="px-4 text-muted-foreground">…</Cell>
				</Row>
			</Body>
		</Root>
	</AppTableFrame>
</Story>

<!-- The header checkbox: off, mixed, all on. -->
<Story name="Select all checkbox" asChild>
	<div class="flex items-center gap-6 rounded-xl border border-border p-4">
		<SelectAllCheckbox checked={false} onCheckedChange={() => {}} />
		<SelectAllCheckbox checked={false} indeterminate onCheckedChange={() => {}} />
		<SelectAllCheckbox checked onCheckedChange={() => {}} />
	</div>
</Story>

<!-- One row's checkbox. -->
<Story name="Row checkbox" asChild>
	<div class="flex items-center gap-6 rounded-xl border border-border p-4">
		<RowCheckbox checked={false} onCheckedChange={() => {}} label="Select Ada Lovelace" />
		<RowCheckbox checked onCheckedChange={() => {}} label="Select Kenji Watanabe" />
	</div>
</Story>

<!-- The row's own menu, with a link, an action, a disabled one and a destructive one. -->
<Story name="Row actions" asChild>
	<div class="flex justify-center rounded-xl border border-border p-4">
		<RowActions
			label="Actions for Ada Lovelace"
			items={[
				{ label: 'View', href: '/app/members/usr_06' },
				{ label: 'Change role', onSelect: () => {} },
				{ label: 'Resend invite', onSelect: () => {}, disabled: true },
				{ label: 'Remove', onSelect: () => {}, tone: 'destructive' },
			]}
		/>
	</div>
</Story>

<!-- The foot: which rows, how many a page, and the page turns. -->
<Story name="Pagination" asChild>
	<div class="max-w-3xl rounded-xl border border-border">
		<TablePagination page={2} pageSize={25} total={60} pageHref={(next) => `/app/members?page=${next}`} pageSizes={[25, 50, 100]} />
	</div>
</Story>

<!-- The first page: nothing before it, and no page-size choice offered. -->
<Story name="Pagination, first page" asChild>
	<div class="max-w-3xl rounded-xl border border-border">
		<TablePagination page={1} pageSize={25} total={60} pageHref={(next) => `/app/members?page=${next}`} />
	</div>
</Story>
