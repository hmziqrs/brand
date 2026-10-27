<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ConfirmAction from './confirm-action.svelte'

	const { Story } = defineMeta({
		title: 'App/Actions',
		component: ConfirmAction,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import RecordSheet from './record-sheet.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import { fakeRequest, workspaces } from '@hmziq/brand-core/app/demo-data'

	const works = () => fakeRequest(undefined)
	const hangs = () => new Promise<undefined>(() => {})
	const refuses = () => fakeRequest({ message: "We couldn't delete the workspace. Try again." }, { ms: 300 })

	let emails = $state('')
	let role = $state('Member')
	let sheetOpen = $state(false)
	let dirtyOpen = $state(false)
	let pendingOpen = $state(false)
	let errorOpen = $state(false)
	let mobileOpen = $state(false)

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	const button = (root: ParentNode, text: string) =>
		[...root.querySelectorAll('button')].find((candidate) => candidate.textContent?.trim() === text)

	async function openRemove({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		button(canvasElement, 'Remove 2 members')?.click()
	}

	async function openSignOut({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		button(canvasElement, 'Sign out everywhere')?.click()
	}

	async function openDelete({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		button(canvasElement, 'Delete this workspace')?.click()
	}

	async function runRemove({ canvasElement }: { canvasElement: HTMLElement }) {
		await openRemove({ canvasElement })
		await sleep(150)
		button(canvasElement.ownerDocument, 'Remove members')?.click()
	}

	async function runDelete({ canvasElement }: { canvasElement: HTMLElement }) {
		await openDelete({ canvasElement })
		await sleep(150)
		button(canvasElement.ownerDocument, 'Delete workspace')?.click()
	}

	async function openTyped({ canvasElement }: { canvasElement: HTMLElement }) {
		await openDelete({ canvasElement })
		const input = canvasElement.ownerDocument.querySelector<HTMLInputElement>('#confirm-action-word')
		if (!input) return
		input.value = workspaces[0].name
		input.dispatchEvent(new Event('input', { bubbles: true }))
	}

	async function openSheet({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		button(canvasElement, 'Invite people')?.click()
	}

	async function openDirty({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		button(canvasElement, 'Invite people')?.focus();
		button(canvasElement, 'Invite people')?.click()
		await sleep(150)
		button(canvasElement.ownerDocument, 'Cancel')?.click()
	}
</script>

{#snippet removeTrigger(props)}
	<Button {...props} variant="outline" size="sm" class="text-destructive">Remove 2 members</Button>
{/snippet}

{#snippet signOutTrigger(props)}
	<Button {...props} variant="outline" size="sm">Sign out everywhere</Button>
{/snippet}

{#snippet deleteTrigger(props)}
	<Button {...props} variant="destructive">Delete this workspace</Button>
{/snippet}

{#snippet inviteTrigger(props)}
	<Button {...props}>Invite people</Button>
{/snippet}

{#snippet inviteForm(ariaBusy: boolean)}
	<form
		id="story-invite"
		class="flex flex-col gap-4 py-4"
		aria-busy={ariaBusy || undefined}
		onsubmit={(event) => event.preventDefault()}
	>
		<div class="flex flex-col gap-2">
			<label class="text-sm font-medium" for="story-emails">Emails</label>
			<Input id="story-emails" name="emails" bind:value={emails} placeholder="ada@example.com, grace@example.com" />
		</div>
		<div class="flex flex-col gap-2">
			<label class="text-sm font-medium" for="story-role">Role</label>
			<select
				id="story-role"
				name="role"
				bind:value={role}
				class="h-9 rounded-md border border-border bg-background px-2.5 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				<option>Admin</option>
				<option>Member</option>
				<option>Viewer</option>
			</select>
		</div>
	</form>
{/snippet}

<Story name="Confirm, destructive" play={openRemove} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={removeTrigger}
			title="Remove 2 members?"
			description="They lose access to everything in Paperplane. You can invite them again later."
			confirmLabel="Remove members"
			onConfirm={works}
			successMessage="Removed 2 members."
		/>
	</div>
</Story>

<Story name="Confirm, default" play={openSignOut} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={signOutTrigger}
			tone="default"
			title="Sign out of all devices?"
			description="Every signed-in session ends, including this one."
			confirmLabel="Sign out everywhere"
			onConfirm={works}
			successMessage="Signed out of all devices."
		/>
	</div>
</Story>

<Story name="Confirm, type to confirm" play={openDelete} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={deleteTrigger}
			title="Delete this workspace?"
			description="Events, dashboards and members go with it. This can't be undone."
			confirmLabel="Delete workspace"
			confirmText={workspaces[0].name}
			onConfirm={works}
			successMessage="Workspace deleted."
		/>
	</div>
</Story>

<Story name="Confirm, typed" play={openTyped} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={deleteTrigger}
			title="Delete this workspace?"
			description="Events, dashboards and members go with it. This can't be undone."
			confirmLabel="Delete workspace"
			confirmText={workspaces[0].name}
			onConfirm={hangs}
		/>
	</div>
</Story>

<Story name="Confirm, pending" play={runRemove} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={removeTrigger}
			title="Remove 2 members?"
			description="They lose access to everything in Paperplane. You can invite them again later."
			confirmLabel="Remove members"
			onConfirm={hangs}
		/>
	</div>
</Story>

<Story name="Confirm, error" play={runDelete} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={deleteTrigger}
			title="Delete this workspace?"
			description="Events, dashboards and members go with it. This can't be undone."
			confirmLabel="Delete workspace"
			onConfirm={refuses}
		/>
	</div>
</Story>

<Story
	name="Confirm, mobile"
	play={openRemove}
	parameters={{ viewport: { defaultViewport: 'phone360' } }}
	asChild
>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<ConfirmAction
			trigger={removeTrigger}
			title="Remove 2 members?"
			description="They lose access to everything in Paperplane. You can invite them again later."
			confirmLabel="Remove members"
			onConfirm={works}
			successMessage="Removed 2 members."
		/>
	</div>
</Story>

<Story name="Record sheet" play={openSheet} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<RecordSheet
			bind:open={sheetOpen}
			title="Invite people"
			description="They'll get an email with a link to join Paperplane."
			dirty={false}
			pending={false}
			formId="story-invite"
			submitLabel="Send invites"
		>
			{@render inviteForm(false)}
		</RecordSheet>
		<Button onclick={() => (sheetOpen = true)}>Invite people</Button>
	</div>
</Story>

<Story name="Record sheet, dirty" play={openDirty} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<RecordSheet
			bind:open={dirtyOpen}
			title="Invite people"
			description="They'll get an email with a link to join Paperplane."
			dirty={true}
			pending={false}
			formId="story-invite"
			submitLabel="Send invites"
		>
			{@render inviteForm(false)}
		</RecordSheet>
		<Button onclick={() => (dirtyOpen = true)}>Invite people</Button>
	</div>
</Story>

<Story name="Record sheet, pending" play={openSheet} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<RecordSheet
			bind:open={pendingOpen}
			title="Invite people"
			description="They'll get an email with a link to join Paperplane."
			dirty={true}
			pending={true}
			formId="story-invite"
			submitLabel="Send invites"
		>
			{@render inviteForm(true)}
		</RecordSheet>
		<Button onclick={() => (pendingOpen = true)}>Invite people</Button>
	</div>
</Story>

<Story name="Record sheet, error" play={openSheet} asChild>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<RecordSheet
			bind:open={errorOpen}
			title="Invite people"
			description="They'll get an email with a link to join Paperplane."
			dirty={true}
			pending={false}
			error="We couldn't send these invites. Try again."
			formId="story-invite"
			submitLabel="Send invites"
		>
			{@render inviteForm(false)}
		</RecordSheet>
		<Button onclick={() => (errorOpen = true)}>Invite people</Button>
	</div>
</Story>

<Story
	name="Record sheet, mobile"
	play={openSheet}
	parameters={{ viewport: { defaultViewport: 'phone360' } }}
	asChild
>
	<div class="flex min-h-24 items-center bg-background px-4 py-4">
		<RecordSheet
			bind:open={mobileOpen}
			title="Invite people"
			description="They'll get an email with a link to join Paperplane."
			dirty={false}
			pending={false}
			formId="story-invite"
			submitLabel="Send invites"
		>
			{@render inviteForm(false)}
		</RecordSheet>
		<Button onclick={() => (mobileOpen = true)}>Invite people</Button>
	</div>
</Story>
