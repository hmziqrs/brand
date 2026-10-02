<!--
  The members list (app-blocks.md, phase 4): the full table in context —
  toolbar, filters, sort, selection, bulk actions, row actions and paging,
  all of it URL state through readListParams and listHref, and @tanstack/
  table-core underneath for the sorting, selection and paging math. The
  whole list is one GET form: with JavaScript off, the search submits and
  the chips' hidden inputs carry the filters along. Phase 8 put the two
  working actions behind its blocks: "Invite people" opens a record sheet,
  and every removal — one row or a selection — asks first.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import {
		createTable,
		functionalUpdate,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type RowSelectionState,
		type SortingState,
	} from '@tanstack/table-core';
	import { listHref, type ListState } from '@hmziq/brand-core/app/list-params';
	import { fakeRequest, members, type Member, type MemberRole } from '@hmziq/brand-core/app/demo-data';
	import { relativeDate } from '@hmziq/brand-core/app/format';
	import { toast } from 'svelte-sonner';
	import ConfirmAction from '$brand/blocks/app/actions/confirm-action.svelte';
	import RecordSheet from '$brand/blocks/app/actions/record-sheet.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import BulkActionBar from '$brand/blocks/app/collection/bulk-action-bar.svelte';
	import CollectionToolbar from '$brand/blocks/app/collection/collection-toolbar.svelte';
	import FilterChip from '$brand/blocks/app/collection/filter-chip.svelte';
	import SortMenu from '$brand/blocks/app/collection/sort-menu.svelte';
	import AppTableFrame from '$brand/blocks/app/table/app-table-frame.svelte';
	import RowActions from '$brand/blocks/app/table/row-actions.svelte';
	import RowCheckbox from '$brand/blocks/app/table/row-checkbox.svelte';
	import SelectAllCheckbox from '$brand/blocks/app/table/select-all-checkbox.svelte';
	import SortableHead from '$brand/blocks/app/table/sortable-head.svelte';
	import TablePagination from '$brand/blocks/app/table/table-pagination.svelte';
	import TableSkeletonRows from '$brand/blocks/app/table/table-skeleton-rows.svelte';
	import TableStateRow from '$brand/blocks/app/table/table-state-row.svelte';
	import DataState from '$brand/blocks/app/states/data-state.svelte';
	import EmptyState from '$brand/blocks/app/states/empty-state.svelte';
	import ErrorState from '$brand/blocks/app/states/error-state.svelte';
	import NoResults from '$brand/blocks/app/states/no-results.svelte';
	import * as Avatar from '$brand/ui/avatar/index.js';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import * as DropdownMenu from '$brand/ui/dropdown-menu/index.js';
	import { Body, Cell, Head, Header, Row, Root } from '$brand/ui/table/index.js';
	import Tag from '$brand/components/tag.svelte';
	import Users from '@lucide/svelte/icons/users';
	import type { FormResult } from '$lib/settings-form.svelte.js';
	import { DemoLoad } from '$lib/demo-load.svelte.js';
	import type { Snippet } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const PATH = '/app/members';
	const load = new DemoLoad(page.url.searchParams.get('state'));

	// The demo's data lives in the page: removals and role changes edit this
	// copy, the way a real page edits what its action returned.
	let roster = $state<Member[]>(members);
	let rowSelection = $state<RowSelectionState>({});

	const hrefOf = (change: Partial<ListState>) => listHref(PATH, data.list, change);
	function navigate(href: string) {
		// List hrefs carry the list's own params; the demo state rides along,
		// so a page can be checked in any state while its list is used.
		const state = page.url.searchParams.get('state');
		if (state && !href.includes('state=')) {
			const url = new URL(href, page.url.origin);
			url.searchParams.set('state', state);
			href = url.pathname + url.search;
		}
		goto(href, { keepFocus: true, noScroll: true });
	}

	// The GET form with JavaScript on: read its fields and go. With it off,
	// the browser carries the same fields to the server.
	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		const fields = new FormData(event.currentTarget as HTMLFormElement);
		const params = new URLSearchParams();
		for (const [key, value] of fields.entries()) if (typeof value === 'string') params.append(key, value);
		navigate(`${PATH}?${params}`);
	}

	// A refetch keeps the rows on screen and says so by the count.
	let busy = $state(false);
	let firstListSeen = false;
	$effect(() => {
		// The list's URL state, watched as one value.
		void [data.list.q, data.list.sort, data.list.page, data.list.perPage, ...Object.values(data.list.filters)];
		if (!firstListSeen) {
			firstListSeen = true;
			return;
		}
		busy = true;
		void fakeRequest(undefined, { ms: 400 }).then(() => (busy = false));
	});

	// ---- the list, TanStack underneath -------------------------------------
	const SORT_FIELDS: Record<string, string> = { name: 'name', last_active: 'lastActive' };
	const toSorting = (sort: string): SortingState => {
		const desc = sort.startsWith('-');
		const id = SORT_FIELDS[desc ? sort.slice(1) : sort];
		return id ? [{ id, desc }] : [];
	};
	const fromField = (field: string, desc: boolean) =>
		Object.entries(SORT_FIELDS)
			.filter(([, id]) => id === field)
			.map(([key]) => (desc ? `-${key}` : key))[0] ?? '';

	const filtered = $derived.by(() => {
		const q = data.list.q.toLowerCase();
		return roster.filter(
			(m) =>
				(!q || m.name.toLowerCase().includes(q) || m.email.includes(q)) &&
				(data.list.filters.role.length === 0 || data.list.filters.role.includes(m.role.toLowerCase())) &&
				(data.list.filters.status.length === 0 || data.list.filters.status.includes(m.status.toLowerCase())),
		);
	});
	const filtering = $derived(
		data.list.q !== '' || data.list.filters.role.length > 0 || data.list.filters.status.length > 0,
	);
	const pageCount = $derived(Math.max(1, Math.ceil(filtered.length / data.list.perPage)));
	// A URL can point past the end once rows are removed; show the last page.
	const currentPage = $derived(Math.min(data.list.page, pageCount));
	const selectedCount = $derived(Object.keys(rowSelection).length);
	const selectedMembers = $derived(
		Object.keys(rowSelection)
			.map((id) => roster.find((m) => m.id === id))
			.filter((m): m is Member => Boolean(m)),
	);

	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'name' },
		{ accessorKey: 'role' },
		{ accessorKey: 'status' },
		{ accessorKey: 'lastActive' },
	];

	const table = $derived(
		createTable({
			data: filtered,
			columns,
			getRowId: (row) => row.id,
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			// The URL owns the reset rule: a new search, filter or sort starts at page 1.
			autoResetPageIndex: false,
			// The state comes from the URL and the page; the table never announces
			// its own changes, and nothing here renders a fallback.
			onStateChange: () => {},
			renderFallbackValue: null,
			state: {
				sorting: toSorting(data.list.sort),
				pagination: { pageIndex: currentPage - 1, pageSize: data.list.perPage },
				rowSelection,
			},
			onRowSelectionChange: (updater) => {
				rowSelection = functionalUpdate(updater, rowSelection);
			},
		}),
	);
	const rows = $derived(table.getRowModel().rows);

	// The sort link for a column: none → up → down → back to none.
	const sorted = (field: string): false | 'asc' | 'desc' => {
		const current = toSorting(data.list.sort).find((s) => s.id === field);
		return current ? (current.desc ? 'desc' : 'asc') : false;
	};
	function toggleSortHref(field: string) {
		const current = toSorting(data.list.sort).find((s) => s.id === field);
		return hrefOf({ sort: current ? fromField(field, !current.desc) : fromField(field, false) });
	}

	// ---- what the demo's actions do ----------------------------------------
	// The scripted failure (app-blocks.md, phase 4): removing a selection
	// that holds the workspace owner is refused, with the reason. Since
	// phase 8 the refusal shows inside the confirm dialog rather than as a
	// toast, and the success toast is ConfirmAction's.
	async function removeMembers(victims: Member[]): Promise<FormResult> {
		if (victims.some((m) => m.role === 'Owner')) {
			return {
				message: "You can't remove the workspace owner. Take the owner out of the selection and try again.",
			};
		}
		await fakeRequest(undefined, { ms: 600 });
		roster = roster.filter((m) => !victims.includes(m));
		rowSelection = {};
		return undefined;
	}

	// One dialog for every removal: a row's action or the bulk bar's button
	// only decide who it's about.
	let removeOpen = $state(false);
	let removeVictims = $state<Member[]>([]);
	const removeTitle = $derived(
		removeVictims.length === 1 ? `Remove ${removeVictims[0].name}?` : `Remove ${removeVictims.length} members?`,
	);
	const removeLabel = $derived(removeVictims.length === 1 ? 'Remove member' : 'Remove members');
	const removeSuccess = $derived(
		removeVictims.length === 1
			? `Removed ${removeVictims[0].name}.`
			: `Removed ${removeVictims.length} members.`,
	);
	function askRemove(victims: Member[]) {
		removeVictims = victims;
		removeOpen = true;
	}

	function changeRole(victims: Member[], role: MemberRole) {
		if (victims.length === 0) return;
		roster = roster.map((m) => (victims.includes(m) ? { ...m, role } : m));
		toast.success(`Changed role for ${victims.length} ${victims.length === 1 ? 'member' : 'members'}.`);
	}

	// ---- the invite sheet ----------------------------------------------------
	let inviteOpen = $state(false);
	let inviteEmails = $state('');
	let inviteRole = $state<MemberRole>('Member');
	let inviteError = $state<string>();
	let invitePending = $state(false);
	const inviteDirty = $derived(inviteEmails.trim() !== '' || inviteRole !== 'Member');

	// However the sheet closed — sent or discarded — the fields go back to
	// empty, so the next invitation starts clean.
	$effect(() => {
		if (inviteOpen) return;
		inviteEmails = '';
		inviteRole = 'Member';
		inviteError = undefined;
	});

	// A name for an invited address: "ada.lovelace" becomes "Ada Lovelace".
	const nameOf = (email: string) =>
		email
			.split('@')[0]
			.split(/[._-]/)
			.filter(Boolean)
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');

	async function sendInvites(event: SubmitEvent) {
		event.preventDefault();
		const addresses = inviteEmails
			.split(',')
			.map((address) => address.trim())
			.filter(Boolean);
		// A clean form can't be submitted (FormActions keeps Save off), so
		// the empty case only guards other callers; the format check is the
		// one a reader meets.
		if (addresses.length === 0) {
			inviteError = 'Enter at least one email address.';
			document.getElementById('invite-emails')?.focus();
			return;
		}
		if (addresses.some((address) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))) {
			inviteError = 'Enter valid email addresses, like ada@example.com.';
			document.getElementById('invite-emails')?.focus();
			return;
		}
		invitePending = true;
		await fakeRequest(undefined, { ms: 600 });
		const joined = new Date().toISOString().slice(0, 10);
		roster = [
			...roster,
			...addresses.map((email, at) => ({
				id: `usr_invite_${roster.length + at + 1}`,
				name: nameOf(email),
				email,
				role: inviteRole,
				status: 'Invited' as const,
				lastActive: null,
				joined,
				twoStep: false,
				signInMethod: 'Email' as const,
			})),
		];
		invitePending = false;
		inviteOpen = false;
		toast.success(`Invites sent to ${addresses.length} ${addresses.length === 1 ? 'person' : 'people'}.`);
	}

	// ---- small presentation helpers ----------------------------------------
	const initials = (name: string) =>
		name
			.split(' ')
			.map((word) => word[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();

	const roleOptions = [
		{ value: 'owner', label: 'Owner', count: members.filter((m) => m.role === 'Owner').length },
		{ value: 'admin', label: 'Admin', count: members.filter((m) => m.role === 'Admin').length },
		{ value: 'member', label: 'Member', count: members.filter((m) => m.role === 'Member').length },
		{ value: 'viewer', label: 'Viewer', count: members.filter((m) => m.role === 'Viewer').length },
	];
	const statusOptions = [
		{ value: 'active', label: 'Active', count: members.filter((m) => m.status === 'Active').length },
		{ value: 'invited', label: 'Invited', count: members.filter((m) => m.status === 'Invited').length },
		{ value: 'suspended', label: 'Suspended', count: members.filter((m) => m.status === 'Suspended').length },
	];
	const sortOptions = [
		{ value: '', label: 'Newest joined' },
		{ value: 'name', label: 'Name (A–Z)' },
		{ value: '-name', label: 'Name (Z–A)' },
		{ value: '-last_active', label: 'Last active (newest)' },
		{ value: 'last_active', label: 'Last active (oldest)' },
	];
	const ROLES: MemberRole[] = ['Owner', 'Admin', 'Member', 'Viewer'];
</script>

<svelte:head>
	<title>Members — svelte-app</title>
</svelte:head>

{#snippet statusOf(member: Member)}
	{#if member.status === 'Active'}
		<Tag tone="success" marker>Active</Tag>
	{:else if member.status === 'Invited'}
		<Tag tone="warning">Invite sent</Tag>
	{:else}
		<Tag>Suspended</Tag>
	{/if}
{/snippet}

<!-- The invite sheet's body: this page's form, which the sheet's footer
     submits from outside it. -->
{#snippet inviteForm()}
	<form
		id="invite-form"
		class="flex flex-col gap-4 py-4"
		onsubmit={sendInvites}
		aria-busy={invitePending || undefined}
	>
		<div class="flex flex-col gap-2">
			<label class="text-sm font-medium" for="invite-emails">Emails</label>
			<Input
				id="invite-emails"
				name="emails"
				bind:value={inviteEmails}
				placeholder="ada@example.com, grace@example.com"
				aria-invalid={inviteError ? true : undefined}
				aria-describedby={inviteError ? 'invite-emails-error' : undefined}
			/>
			{#if inviteError}
				<p id="invite-emails-error" class="text-sm text-destructive">{inviteError}</p>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<label class="text-sm font-medium" for="invite-role">Role</label>
			<select
				id="invite-role"
				name="role"
				bind:value={inviteRole}
				class="h-9 rounded-md border border-border bg-background px-2.5 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				{#each ROLES.filter((role) => role !== 'Owner') as role (role)}
					<option value={role}>{role}</option>
				{/each}
			</select>
			<p class="text-sm text-muted-foreground">Admins can manage members and settings.</p>
		</div>
	</form>
{/snippet}

<!-- The bulk bar's role picker: one of the four roles, applied at once. -->
{#snippet roleMenu(victims: Member[])}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} type="button" variant="outline" size="sm">Change role</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="start" class="w-40">
			{#each ROLES as role (role)}
				<DropdownMenu.Item onclick={() => changeRole(victims, role)}>
					<span class="truncate">{role}</span>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

<!-- One row of the member column: the picker, the face and who they are. -->
{#snippet memberCell(member: Member)}
	<span class="flex items-center gap-3">
		<RowCheckbox
			checked={member.id in rowSelection}
			onCheckedChange={(on) => table.getRow(member.id).toggleSelected(on)}
			label={`Select ${member.name}`}
		/>
		<Avatar.Root>
			<Avatar.Fallback>{initials(member.name)}</Avatar.Fallback>
		</Avatar.Root>
		<span class="flex min-w-0 flex-col">
			<a
				href={`/app/members/${member.id}`}
				class="truncate font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				{member.name}
			</a>
			<span class="truncate text-muted-foreground">{member.email}</span>
		</span>
	</span>
{/snippet}

{#snippet skeletonBody()}
	<Body>
		<TableSkeletonRows rows={Math.min(data.list.perPage, 8)} columns={['38%', '14%', '16%', '18%', '14%']} />
	</Body>
{/snippet}

{#snippet firstUseBody()}
	<Body>
		<TableStateRow colSpan={5}>
			<EmptyState icon={Users} title="No members yet" description="Invite your team to see the same dashboards.">
				{#snippet actions()}
					<Button type="button" onclick={() => (inviteOpen = true)}>Invite people</Button>
				{/snippet}
			</EmptyState>
		</TableStateRow>
	</Body>
{/snippet}

{#snippet rowsBody()}
	<Body>
		{#if rows.length === 0}
			<!-- Filters win when both are set (APP-BLOCKS.md, NoResults):
			     theirs is the copy, and the one clear link empties the
			     search and the filters together. -->
			<TableStateRow colSpan={5}>
				<NoResults
					query={data.list.q}
					filtered={data.list.filters.role.length + data.list.filters.status.length > 0}
					clearHref={hrefOf({ q: '', filters: { role: [], status: [] } })}
					noun="members"
				/>
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
								{ label: 'View', href: `/app/members/${member.id}` },
								// The member page's edit panel (name and role) changes it.
								{ label: 'Change role', href: `/app/members/${member.id}` },
								...(member.status === 'Invited'
									? [{ label: 'Resend invite', onSelect: () => toast.success(`Invite sent to ${member.name}.`) }]
									: []),
								{ label: 'Remove', onSelect: () => askRemove([member]), tone: 'destructive' },
							]}
						/>
					</Cell>
				</Row>
			{/each}
		{/if}
	</Body>
{/snippet}

<!-- The table around whichever body the page is showing. -->
{#snippet tableFrame(body: Snippet)}
	<AppTableFrame stickyFirstColumn>
		<Root>
			<Header>
				<Row>
					<SortableHead label="Member" sorted={sorted('name')} href={toggleSortHref('name')} class="min-w-64">
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
			{@render body()}
		</Root>
		{#if filtered.length > data.list.perPage || data.list.perPage !== 25}
			<TablePagination
				class="border-t border-border"
				page={currentPage}
				pageSize={data.list.perPage}
				total={filtered.length}
				pageHref={(next) => hrefOf({ page: next })}
				pageSizes={[10, 25, 50]}
			/>
		{/if}
	</AppTableFrame>
{/snippet}

{#snippet bulkBar()}
	<BulkActionBar
		count={selectedCount}
		total={filtered.length}
		onSelectAll={() => {
			const next = { ...rowSelection };
			for (const row of table.getPrePaginationRowModel().rows) next[row.id] = true;
			rowSelection = next;
		}}
		onClear={() => (rowSelection = {})}
	>
		{#snippet actions()}
			{@render roleMenu(selectedMembers)}
			<Button
				type="button"
				variant="outline"
				size="sm"
				class="text-destructive"
				onclick={() => askRemove(selectedMembers)}
			>
				Remove {selectedCount} {selectedCount === 1 ? 'member' : 'members'}
			</Button>
		{/snippet}
	</BulkActionBar>
{/snippet}

<AppPage>
	<AppPageHeader title="Members" description="People who can see this workspace.">
		{#snippet actions()}
			<Button type="button" onclick={() => (inviteOpen = true)}>Invite people</Button>
		{/snippet}
	</AppPageHeader>

	<form method="GET" action={PATH} {onsubmit} class="mt-4">
		<div class="flex flex-col gap-4">
			<CollectionToolbar
				search={{
					value: data.list.q,
					label: 'Search members',
					placeholder: 'Search by name or email…',
					onChange: (q) => navigate(hrefOf({ q })),
				}}
				clearFiltersHref={filtering ? hrefOf({ q: '', filters: { role: [], status: [] } }) : undefined}
				selection={selectedCount > 0 ? bulkBar : undefined}
				{busy}
			>
				{#snippet filters()}
					<FilterChip
						label="Role"
						name="role"
						options={roleOptions}
						value={data.list.filters.role}
						onChange={(role) => navigate(hrefOf({ filters: { ...data.list.filters, role } }))}
						removeHref={hrefOf({ filters: { ...data.list.filters, role: [] } })}
					/>
					<FilterChip
						label="Status"
						name="status"
						options={statusOptions}
						value={data.list.filters.status}
						onChange={(status) => navigate(hrefOf({ filters: { ...data.list.filters, status } }))}
						removeHref={hrefOf({ filters: { ...data.list.filters, status: [] } })}
					/>
				{/snippet}
				{#snippet sort()}
					<SortMenu options={sortOptions} value={data.list.sort} hrefFor={(sort) => hrefOf({ sort })} />
				{/snippet}
				{#snippet count()}
					{filtered.length === roster.length ? `${roster.length} members` : `${filtered.length} of ${roster.length} members`}
				{/snippet}
			</CollectionToolbar>

			<DataState status={load.status} isEmpty={load.state === 'empty'} loadingLabel="Loading members">
				{#snippet loading()}
					{@render tableFrame(skeletonBody)}
				{/snippet}
				{#snippet error()}
					<ErrorState kind={load.kind} onRetry={load.load} />
				{/snippet}
				{#snippet empty()}
					{@render tableFrame(firstUseBody)}
				{/snippet}
				{@render tableFrame(rowsBody)}
			</DataState>
		</div>
	</form>

	<!-- Both overlays sit outside the list's GET form: they're actions, not
	     filters. One confirm dialog serves the row actions and the bulk bar. -->
	<ConfirmAction
		bind:open={removeOpen}
		title={removeTitle}
		description="They lose access to everything in Paperplane. You can invite them again later."
		confirmLabel={removeLabel}
		onConfirm={() => removeMembers(removeVictims)}
		successMessage={removeSuccess}
	/>
	<RecordSheet
		bind:open={inviteOpen}
		title="Invite people"
		description="They'll get an email with a link to join Paperplane."
		dirty={inviteDirty}
		pending={invitePending}
		formId="invite-form"
		submitLabel="Send invites"
	>
		{@render inviteForm()}
	</RecordSheet>
</AppPage>
