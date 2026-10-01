<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ConfirmAction from './confirm-action.svelte'

	const { Story } = defineMeta({
		title: 'App/Actions',
		component: ConfirmAction,
		parameters: { layout: 'padded' },
	})
</script>

<!--
  The confirm and the edit panel (app-blocks.md, phase 8): the two steps that
  change or throw away work behind a second look. Both need JavaScript, and
  neither touches the network — the page's callback does the work and hands
  back a FormResult. The stories drive them with play functions, because both
  start closed; the dialogs portal to the page body, so the plays reach them
  through the document rather than the story's own corner of it.
-->
<script lang="ts">
	import RecordSheet from './record-sheet.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import { fakeRequest, workspaces } from '@hmziq/brand-core/app/demo-data'

	// The scripted results the stories run: one that works, one that hangs so
	// its pending state can be seen, one that fails with a reason.
	const works = () => fakeRequest(undefined)
	const hangs = () => new Promise<undefined>(() => {})
	const refuses = () => fakeRequest({ message: "We couldn't delete the workspace. Try again." }, { ms: 300 })

	// The mock page form the sheets hold: named fields, as a real one has.
	let emails = $state('')
	let role = $state('Member')
	// Each sheet story holds its own open state, the way a page does.
	let sheetOpen = $state(false)
	let dirtyOpen = $state(false)
	let pendingOpen = $state(false)
	let errorOpen = $state(false)
	let mobileOpen = $state(false)

	// Buttons by their exact text: a trigger and a confirm often share words
	// ("Delete this workspace" / "Delete workspace"), so "includes" won't do.
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
		// The word lands in the field the way typing would, so the button comes on.
		const input = canvasElement.ownerDocument.querySelector<HTMLInputElement>('#confirm-action-word')
		if (!input) return
		input.value = workspaces[0].name
		input.dispatchEvent(new Event('input', { bubbles: true }))
	}

	async function openSheet({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		button(canvasElement, 'Invite people')?.click()
	}

	// A dirty sheet closed by its Cancel: the discard question comes up over it.
	async function openDirty({ canvasElement }: { canvasElement: HTMLElement }) {
		await openSheet({ canvasElement })
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

<!-- The sheet's body is the page's own form, with its named fields and its id
     the footer's Save submits. -->
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

<!-- The usual kind: removing something, with the soft destructive confirm. -->
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

<!-- The plain kind: still a second look, without the red. -->
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

<!-- The step that can't be undone: the button stays off until the word matches. -->
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

<!-- The same, with the word typed: the button is live and Enter would run it. -->
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

<!-- While the action runs: a spinner in the confirm button, both buttons off,
     and the dialog holds still. -->
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

<!-- A failure stays open with the reason, so it can be tried again. -->
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

<!-- At 360px: the same dialog, the width of the screen. -->
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

<!-- The edit panel: the page's form in a sheet, footer submitting from outside.
     The page owns the open state and the button that opens it. -->
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

<!-- A dirty sheet closed by its Cancel: the discard question comes up over it. -->
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

<!-- While the save runs: the footer says so and everything holds still. -->
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

<!-- A save the server refused: the reason above the buttons, values kept. -->
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

<!-- Below md the sheet rises from the bottom of the screen. -->
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
