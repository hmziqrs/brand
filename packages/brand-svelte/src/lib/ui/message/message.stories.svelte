<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Copy from '@lucide/svelte/icons/copy'
	import Download from '@lucide/svelte/icons/download'
	import FileText from '@lucide/svelte/icons/file-text'
	import RefreshCcw from '@lucide/svelte/icons/refresh-ccw'
	import { Avatar, AvatarFallback, AvatarImage } from '$brand/ui/avatar/index.js'
	import { Bubble, BubbleContent } from '$brand/ui/bubble/index.js'
	import { Button } from '$brand/ui/button/index.js'
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from '$brand/ui/marker/index.js'
	import { Spinner } from '$brand/ui/spinner/index.js'
	import {
		Attachment,
		AttachmentAction,
		AttachmentActions,
		AttachmentContent,
		AttachmentDescription,
		AttachmentMedia,
		AttachmentTitle,
	} from '$brand/ui/attachment/index.js'
	import MessageRoot from './message.svelte'
	import {
		Message,
		MessageAvatar,
		MessageContent,
		MessageFooter,
		MessageGroup,
		MessageHeader,
	} from './index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Message',
		component: MessageRoot,
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'Lays out conversation messages with avatar, content, header, footer, and alignment.',
				},
			},
		},
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonByLabel(canvas: HTMLElement, pattern: RegExp) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			pattern.test(b.getAttribute('aria-label') ?? '')
		)
		if (!button) throw new Error(`the button matching ${pattern} is missing`)
		return button
	}

	async function copyAction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const button = buttonByLabel(canvasElement, /^copy message$/i)
		button.focus()
		button.click()
		await sleep(30)
		if (canvasElement.ownerDocument.activeElement !== button) {
			throw new Error('clicking the copy action did not focus it')
		}
	}

	async function retryAction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const button = buttonByLabel(canvasElement, /^retry message$/i)
		button.focus()
		button.click()
		await sleep(30)
		if (canvasElement.ownerDocument.activeElement !== button) {
			throw new Error('clicking the retry action did not focus it')
		}
	}
</script>

{#snippet avatarSlot()}
	<MessageAvatar>
		<Avatar class="size-8">
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	</MessageAvatar>
{/snippet}

<Story name="Default" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			<MessageContent>
				<Bubble variant="secondary">
					<BubbleContent>How can I help you today?</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="Aligned End" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message align="end">
			<MessageContent>
				<Bubble>
					<BubbleContent>Deploying to prod real quick.</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="With Avatar" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			{@render avatarSlot()}
			<MessageContent>
				<Bubble variant="secondary">
					<BubbleContent>
						The build failed during dependency installation.
					</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="Group" asChild>
	<div class="w-full min-w-sm max-w-md">
		<MessageGroup>
			<Message>
				<MessageAvatar />
				<MessageContent>
					<Bubble variant="secondary">
						<BubbleContent>I checked the registry addresses.</BubbleContent>
					</Bubble>
				</MessageContent>
			</Message>
			<Message>
				{@render avatarSlot()}
				<MessageContent>
					<Bubble variant="secondary">
						<BubbleContent>
							The component and example JSON now live under the UI registry.
						</BubbleContent>
					</Bubble>
				</MessageContent>
			</Message>
		</MessageGroup>
	</div>
</Story>

<Story name="Header" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			{@render avatarSlot()}
			<MessageContent>
				<MessageHeader>Olivia</MessageHeader>
				<Bubble variant="secondary">
					<BubbleContent>I already checked the logs.</BubbleContent>
				</Bubble>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="Footer" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message align="end">
			<MessageContent>
				<Bubble>
					<BubbleContent>Send the report to the team.</BubbleContent>
				</Bubble>
				<MessageFooter>Read yesterday</MessageFooter>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="Actions" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			<MessageContent>
				<Bubble variant="secondary">
					<BubbleContent>
						The install failure is coming from the workspace package.
					</BubbleContent>
				</Bubble>
				<MessageFooter class="gap-1">
					<Button variant="ghost" size="icon-xs" aria-label="Copy message">
						<Copy class="lucide" />
					</Button>
					<Button variant="ghost" size="icon-xs" aria-label="Retry message">
						<RefreshCcw class="lucide" />
					</Button>
				</MessageFooter>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="With Attachment" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			{@render avatarSlot()}
			<MessageContent>
				<Bubble variant="secondary">
					<BubbleContent>
						Done. Here is the PDF with the image added as the cover page.
					</BubbleContent>
				</Bubble>
				<Attachment>
					<AttachmentMedia>
						<FileText class="lucide" />
					</AttachmentMedia>
					<AttachmentContent>
						<AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
						<AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
					</AttachmentContent>
					<AttachmentActions>
						<AttachmentAction aria-label="Download sales-dashboard.pdf">
							<Download class="lucide" />
						</AttachmentAction>
					</AttachmentActions>
				</Attachment>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="With Status" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			<MessageContent>
				<Marker role="status">
					<MarkerIcon>
						<Spinner />
					</MarkerIcon>
					<MarkerContent>Checking the logs...</MarkerContent>
				</Marker>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="Copy Action" tags={['!dev', '!autodocs']} play={copyAction} asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			<MessageContent>
				<Bubble variant="secondary">
					<BubbleContent>Copy this message.</BubbleContent>
				</Bubble>
				<MessageFooter>
					<Button variant="ghost" size="icon-xs" aria-label="Copy message">
						<Copy class="lucide" />
					</Button>
				</MessageFooter>
			</MessageContent>
		</Message>
	</div>
</Story>

<Story name="Retry Action" tags={['!dev', '!autodocs']} play={retryAction} asChild>
	<div class="w-full min-w-sm max-w-md">
		<Message>
			<MessageContent>
				<Bubble variant="destructive">
					<BubbleContent>Failed to send.</BubbleContent>
				</Bubble>
				<MessageFooter>
					<Button variant="ghost" size="icon-xs" aria-label="Retry message">
						<RefreshCcw class="lucide" />
					</Button>
				</MessageFooter>
			</MessageContent>
		</Message>
	</div>
</Story>
