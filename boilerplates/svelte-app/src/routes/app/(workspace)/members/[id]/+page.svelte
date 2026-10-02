<!--
  The member detail page (app-blocks.md, phase 6): one record in Profile and
  Access sections over the destructive Remove panel, with the member's
  machine id in mono beside a copy button. Phase 8 put the real actions
  behind it: "Edit" opens a record sheet (name and role, saved into the
  page's copy of the member), and "Remove from workspace" asks first. An
  unknown id is the not-found state with the way back, and the page also
  takes state=denied (the demo-state table's promise for this phase).
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ConfirmAction from '$brand/blocks/app/actions/confirm-action.svelte';
	import RecordSheet from '$brand/blocks/app/actions/record-sheet.svelte';
	import DetailList from '$brand/blocks/app/details/detail-list.svelte';
	import DetailSection from '$brand/blocks/app/details/detail-section.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import DataState from '$brand/blocks/app/states/data-state.svelte';
	import ErrorState from '$brand/blocks/app/states/error-state.svelte';
	import SkeletonDetails from '$brand/blocks/app/states/skeleton-details.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Skeleton } from '$brand/ui/skeleton/index.js';
	import {
		fakeRequest,
		memberById,
		type MemberRole,
	} from '@hmziq/brand-core/app/demo-data';
	import { relativeDate } from '@hmziq/brand-core/app/format';
	import { toast } from 'svelte-sonner';
	import type { FormResult } from '$lib/settings-form.svelte.js';
	import { DemoLoad } from '$lib/demo-load.svelte.js';

	const load = new DemoLoad(page.url.searchParams.get('state'), { denied: true });
	const found = $derived(page.params.id ? memberById(page.params.id) : undefined);

	// The page's copy of the member: what the edit sheet saves lands here, so
	// the record above shows it without a reload (core's data is example data).
	let edits = $state<{ name?: string; role?: MemberRole }>({});
	const member = $derived(found ? { ...found, ...edits } : undefined);

	// Full dates, as the detail rows show them; last active stays relative.
	const fullDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
	const ROLES: MemberRole[] = ['Owner', 'Admin', 'Member', 'Viewer'];

	// ---- the edit sheet ------------------------------------------------------
	let editOpen = $state(false);
	let editName = $state('');
	let editRole = $state<MemberRole>('Member');
	let nameError = $state<string>();
	let editPending = $state(false);
	const editDirty = $derived(editName !== member?.name || editRole !== member?.role);

	// However the sheet closed — saved, discarded — the fields go back to
	// what the record says, so the next opening starts from the truth.
	$effect(() => {
		if (editOpen) return;
		editName = member?.name ?? '';
		editRole = member?.role ?? 'Member';
		nameError = undefined;
	});

	function openEdit() {
		nameError = undefined;
		editOpen = true;
	}

	async function saveEdit(event: SubmitEvent) {
		event.preventDefault();
		if (!editName.trim()) {
			nameError = 'Enter a name.';
			document.getElementById('edit-name')?.focus();
			return;
		}
		editPending = true;
		await fakeRequest(undefined, { ms: 600 });
		edits = { name: editName.trim(), role: editRole };
		editPending = false;
		editOpen = false;
		toast.success('Changes saved.');
	}

	// ---- removal -------------------------------------------------------------
	async function removeFromWorkspace(): Promise<FormResult> {
		await fakeRequest(undefined, { ms: 600 });
		goto('/app/members');
		return undefined;
	}
</script>

<svelte:head>
	<!-- The record's own name, the way the header reads it; an unknown id
	     names what the page shows instead. -->
	<title>{member ? member.name : 'Not found'} — svelte-app</title>
</svelte:head>

{#snippet twoStep()}
	{#if member?.twoStep}<Tag tone="success" marker>On</Tag>{:else}<Tag>Off</Tag>{/if}
{/snippet}

{#snippet removeTrigger(props: Record<string, unknown>)}
	<Button {...props} type="button" variant="destructive" class="shrink-0">
		Remove from workspace
	</Button>
{/snippet}

<!-- The sheet's body is this page's form; the sheet's footer submits it. -->
{#snippet editForm()}
	<form id="member-edit" class="flex flex-col gap-4 py-4" onsubmit={saveEdit} aria-busy={editPending || undefined}>
		<div class="flex flex-col gap-2">
			<label class="text-sm font-medium" for="edit-name">Name</label>
			<Input
				id="edit-name"
				name="name"
				bind:value={editName}
				aria-invalid={nameError ? true : undefined}
				aria-describedby={nameError ? 'edit-name-error' : undefined}
			/>
			{#if nameError}
				<p id="edit-name-error" class="text-sm text-destructive">{nameError}</p>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<label class="text-sm font-medium" for="edit-role">Role</label>
			<select
				id="edit-role"
				name="role"
				bind:value={editRole}
				class="h-9 rounded-md border border-border bg-background px-2.5 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				{#each ROLES as role (role)}
					<option value={role}>{role}</option>
				{/each}
			</select>
		</div>
	</form>
{/snippet}

{#if !member}
	<!-- An unknown id: the not-found state, with the way back to the list. -->
	<AppPage>
		<div class="mt-8">
			<ErrorState kind="not-found">
				{#snippet actions()}
					<Button variant="outline" href="/app/members">Back to members</Button>
				{/snippet}
			</ErrorState>
		</div>
	</AppPage>
{:else}
	<AppPage>
		<AppPageHeader
			title={member.name}
			breadcrumbs={[{ label: 'Members', href: '/app/members' }, { label: member.name }]}
			back={{ label: 'Members', href: '/app/members' }}
		>
			{#snippet actions()}
				<Button type="button" variant="outline" onclick={openEdit}>Edit</Button>
			{/snippet}
		</AppPageHeader>

		<DataState status={load.status} loadingLabel="Loading member" class="mt-8 flex flex-col gap-8">
			{#snippet loading()}
				<!-- The sections keep their shape: the skeleton stands exactly
				     where the rows land, inside the same panels. That includes
				     the Remove panel, whose skeleton holds the same
				     paragraph-and-button line the real one draws — two lines
				     and a full-width button below sm, one line and a button
				     at home from sm. -->
				<DetailSection title="Profile">
					<SkeletonDetails rows={4} />
				</DetailSection>
				<DetailSection title="Access">
					<SkeletonDetails rows={4} />
				</DetailSection>
				<DetailSection tone="destructive" title="Remove from workspace">
					<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between" aria-hidden="true">
						<Skeleton class="h-10 sm:h-5 sm:w-72" />
						<Skeleton class="h-9 shrink-0 sm:w-44" />
					</div>
				</DetailSection>
			{/snippet}
			{#snippet error()}
				<ErrorState kind={load.kind} onRetry={load.load}>
					{#snippet actions()}
						{#if load.kind === 'denied'}
							<Button variant="outline" href="/app/members">Back to members</Button>
						{/if}
					{/snippet}
				</ErrorState>
			{/snippet}
			<DetailSection title="Profile" description="Who they are in the workspace.">
				<DetailList
					items={[
						{ label: 'Name', value: member.name },
						{ label: 'Email', value: member.email },
						{ label: 'Role', value: member.role },
						{ label: 'Joined', value: fullDate.format(new Date(member.joined)) },
					]}
				/>
			</DetailSection>
			<DetailSection title="Access" description="How they sign in, and when they were last here.">
				<DetailList
					items={[
						{
							label: 'Last active',
							value: member.lastActive ? relativeDate(member.lastActive) : 'Not yet',
						},
						{ label: 'Two-step sign-in', value: twoStep },
						{ label: 'Sign-in method', value: member.signInMethod },
						{ label: 'Member ID', value: member.id, mono: true, copy: member.id },
					]}
				/>
			</DetailSection>
			<DetailSection tone="destructive" title="Remove from workspace">
				<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-sm text-muted-foreground">
						They lose access to everything in Paperplane. You can invite them again later.
					</p>
					<ConfirmAction
						trigger={removeTrigger}
						title={`Remove ${member.name}?`}
						description="They lose access to everything in Paperplane. You can invite them again later."
						confirmLabel="Remove member"
						onConfirm={removeFromWorkspace}
						successMessage={`Removed ${member.name} from the workspace.`}
					/>
				</div>
			</DetailSection>
		</DataState>

		<!-- The edit panel, over whatever state the record is in. -->
		<RecordSheet
			bind:open={editOpen}
			title={`Edit ${member.name}`}
			description="Their name and role in the workspace."
			dirty={editDirty}
			pending={editPending}
			formId="member-edit"
		>
			{@render editForm()}
		</RecordSheet>
	</AppPage>
{/if}
