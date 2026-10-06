<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Check from '@lucide/svelte/icons/check'
	import Clock from '@lucide/svelte/icons/clock'
	import Copy from '@lucide/svelte/icons/copy'
	import Download from '@lucide/svelte/icons/download'
	import FileCode from '@lucide/svelte/icons/file-code'
	import FileSearch from '@lucide/svelte/icons/file-search'
	import FileText from '@lucide/svelte/icons/file-text'
	import Image from '@lucide/svelte/icons/image'
	import X from '@lucide/svelte/icons/x'
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$brand/ui/dialog/index.js'
	import { Spinner } from '$brand/ui/spinner/index.js'
	import AttachmentRoot from './attachment.svelte'
	import {
		Attachment,
		AttachmentAction,
		AttachmentActions,
		AttachmentContent,
		AttachmentDescription,
		AttachmentGroup,
		AttachmentMedia,
		AttachmentTitle,
		AttachmentTrigger,
		type AttachmentSize,
		type AttachmentState,
	} from './index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Attachment',
		component: AttachmentRoot,
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'Displays file and image attachments with metadata, states, and actions.',
				},
			},
		},
	})
</script>

<script lang="ts">
	import type { Snippet } from 'svelte'

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonByLabel(canvas: HTMLElement, pattern: RegExp) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			pattern.test(b.getAttribute('aria-label') ?? '')
		)
		if (!button) throw new Error(`the button matching ${pattern} is missing`)
		return button
	}

	async function actionInteraction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const button = buttonByLabel(canvasElement, /^remove sales-dashboard\.pdf$/i)
		button.click()
		await sleep(30)
		if (canvasElement.ownerDocument.activeElement !== button) {
			throw new Error('clicking the remove action did not focus it')
		}
	}

	async function triggerInteraction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		buttonByLabel(canvasElement, /^open handoff\.md$/i)
		buttonByLabel(canvasElement, /^remove handoff\.md$/i)
	}
</script>

{#snippet fileTextIcon()}<FileText class="lucide" />{/snippet}
{#snippet clockIcon()}<Clock class="lucide" />{/snippet}
{#snippet codeIcon()}<FileCode class="lucide" />{/snippet}
{#snippet imageIcon()}<Image class="lucide" />{/snippet}
{#snippet xIcon()}<X class="lucide" />{/snippet}
{#snippet spinnerIcon()}<Spinner />{/snippet}

{#snippet fileAttachment(
	name: string,
	description: string,
	icon: Snippet,
	actionLabel: string,
	state: AttachmentState = 'done',
	size: AttachmentSize = 'default'
)}
	<Attachment {state} {size}>
		<AttachmentMedia>{@render icon()}</AttachmentMedia>
		<AttachmentContent>
			<AttachmentTitle>{name}</AttachmentTitle>
			<AttachmentDescription>{description}</AttachmentDescription>
		</AttachmentContent>
		<AttachmentActions>
			<AttachmentAction aria-label={actionLabel}>
				<X class="lucide" />
			</AttachmentAction>
		</AttachmentActions>
	</Attachment>
{/snippet}

<Story name="Default" asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('sales-dashboard.pdf', 'PDF · 2.4 MB', fileTextIcon, 'Remove sales-dashboard.pdf')}
	</div>
</Story>

<Story name="Image preview" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Attachment orientation="vertical">
			<AttachmentMedia variant="image">
				<img
					src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=240&q=80"
					alt="Workspace"
					width={96}
					height={96}
				/>
			</AttachmentMedia>
			<AttachmentContent>
				<AttachmentTitle>workspace.png</AttachmentTitle>
				<AttachmentDescription>PNG · 820 KB</AttachmentDescription>
			</AttachmentContent>
			<AttachmentActions>
				<AttachmentAction aria-label="Remove workspace.png">
					<X class="lucide" />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>
	</div>
</Story>

<Story name="Uploading" asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('design-system.zip', 'Uploading · 64%', spinnerIcon, 'Remove design-system.zip', 'uploading')}
	</div>
</Story>

<Story name="Processing" asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('market-research.pdf', 'Processing document', clockIcon, 'Remove market-research.pdf', 'processing')}
	</div>
</Story>

<Story name="Error state" asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('financial-model.xlsx', 'Upload failed. Try again.', xIcon, 'Remove financial-model.xlsx', 'error')}
	</div>
</Story>

<Story name="Small" asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('briefing-notes.pdf', 'PDF · 1.4 MB', fileTextIcon, 'Remove briefing-notes.pdf', 'done', 'sm')}
	</div>
</Story>

<Story name="Extra small" asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('renderer.tsx', 'TSX · 12 KB', codeIcon, 'Remove renderer.tsx', 'done', 'xs')}
	</div>
</Story>

<Story name="Group" asChild>
	<div class="w-full min-w-sm max-w-md">
		<AttachmentGroup tabindex={0} role="group" aria-label="Attachments">
			{@render fileAttachment('briefing-notes.pdf', 'PDF · 1.4 MB', fileTextIcon, 'Remove briefing-notes.pdf')}
			{@render fileAttachment('workspace.png', 'PNG · 820 KB', imageIcon, 'Remove workspace.png')}
			{@render fileAttachment('customers.csv', 'CSV · 18 KB', fileTextIcon, 'Remove customers.csv')}
		</AttachmentGroup>
	</div>
</Story>

<Story name="With actions" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Attachment>
			<AttachmentMedia>
				<FileText class="lucide" />
			</AttachmentMedia>
			<AttachmentContent>
				<AttachmentTitle>release-notes.pdf</AttachmentTitle>
				<AttachmentDescription>PDF · 980 KB</AttachmentDescription>
			</AttachmentContent>
			<AttachmentActions>
				<AttachmentAction aria-label="Download release-notes.pdf">
					<Download class="lucide" />
				</AttachmentAction>
				<AttachmentAction aria-label="Copy link to release-notes.pdf">
					<Copy class="lucide" />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>
	</div>
</Story>

<Story name="Trigger" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Dialog>
			<Attachment>
				<AttachmentMedia>
					<FileSearch class="lucide" />
				</AttachmentMedia>
				<AttachmentContent>
					<AttachmentTitle>research-summary.pdf</AttachmentTitle>
					<AttachmentDescription>Open preview dialog</AttachmentDescription>
				</AttachmentContent>
				<AttachmentActions>
					<AttachmentAction aria-label="Remove research-summary.pdf">
						<X class="lucide" />
					</AttachmentAction>
				</AttachmentActions>
				<DialogTrigger>
					{#snippet child({ props })}
						<AttachmentTrigger {...props} aria-label="Preview research-summary.pdf" />
					{/snippet}
				</DialogTrigger>
			</Attachment>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>research-summary.pdf</DialogTitle>
					<DialogDescription>
						Preview the selected attachment before sending it.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	</div>
</Story>

<Story name="Action interaction" tags={['!dev', '!autodocs']} play={actionInteraction} asChild>
	<div class="w-full min-w-sm max-w-md">
		{@render fileAttachment('sales-dashboard.pdf', 'PDF · 2.4 MB', fileTextIcon, 'Remove sales-dashboard.pdf')}
	</div>
</Story>

<Story name="Trigger interaction" tags={['!dev', '!autodocs']} play={triggerInteraction} asChild>
	<div class="w-full min-w-sm max-w-md">
		<Attachment>
			<AttachmentMedia>
				<Check class="lucide" />
			</AttachmentMedia>
			<AttachmentContent>
				<AttachmentTitle>handoff.md</AttachmentTitle>
				<AttachmentDescription>Markdown · 8 KB</AttachmentDescription>
			</AttachmentContent>
			<AttachmentActions>
				<AttachmentAction aria-label="Remove handoff.md">
					<X class="lucide" />
				</AttachmentAction>
			</AttachmentActions>
			<AttachmentTrigger aria-label="Open handoff.md" />
		</Attachment>
	</div>
</Story>
