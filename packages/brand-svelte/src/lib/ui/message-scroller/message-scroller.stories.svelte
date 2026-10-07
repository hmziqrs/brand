<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Snippet } from 'svelte'
	import { Bubble, BubbleContent } from '$brand/ui/bubble/index.js'
	import { Button } from '$brand/ui/button/index.js'
	import { Message, MessageContent } from '$brand/ui/message/index.js'
	import MessageScrollerRoot from './message-scroller.svelte'
	import StoryJumpControls from './story-jump-controls.svelte'
	import StoryRestorePosition from './story-restore-position.svelte'
	import StoryScrollStatus from './story-scroll-status.svelte'
	import {
		MessageScroller,
		MessageScrollerButton,
		MessageScrollerContent,
		MessageScrollerItem,
		MessageScrollerProvider,
		MessageScrollerViewport,
	} from './index.js'

	const { Story } = defineMeta({
		title: 'ui/base/MessageScroller',
		component: MessageScrollerRoot,
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'Provides chat transcript scrolling with anchoring, jump controls, and live-edge behavior.',
				},
			},
		},
	})

	type TranscriptRole = 'user' | 'assistant'
	type TranscriptMessage = { id: string; role: TranscriptRole; content: string }

	const transcript: TranscriptMessage[] = [
		{
			id: 'm1',
			role: 'user',
			content: 'Can you review the activation dip after workspace creation?',
		},
		{
			id: 'm2',
			role: 'assistant',
			content:
				'The sharpest drop is between creating the workspace and inviting the first teammate.',
		},
		{
			id: 'm3',
			role: 'user',
			content: 'What should I compare before we change the onboarding flow?',
		},
		{
			id: 'm4',
			role: 'assistant',
			content:
				'Compare template users, blank workspace users, and people who skip invites but return within 24 hours.',
		},
		{
			id: 'm5',
			role: 'user',
			content: 'Can you turn that into an experiment?',
		},
		{
			id: 'm6',
			role: 'assistant',
			content:
				'Create a variant that shows a short checklist after workspace creation, then measure first invite completion and 24-hour return rate.',
		},
	]
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonByLabel(canvas: HTMLElement, pattern: RegExp) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			pattern.test(b.textContent ?? '')
		)
		if (!button) throw new Error(`the button matching ${pattern} is missing`)
		return button
	}

	async function endButtonInteraction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const button = buttonByLabel(canvasElement, /^end$/i)
		button.focus()
		button.click()
		await sleep(30)
		if (canvasElement.ownerDocument.activeElement !== button) {
			throw new Error('clicking the End button did not keep focus on it')
		}
	}

	async function loadHistoryInteraction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const button = buttonByLabel(canvasElement, /load history/i)
		button.click()
		await sleep(50)
		if (!/billing changes/i.test(canvasElement.textContent ?? '')) {
			throw new Error('loading history did not prepend the earlier messages')
		}
	}

	const earlier: TranscriptMessage[] = [
		{
			id: 'h1',
			role: 'user',
			content: 'Did the deploy include billing changes?',
		},
		{
			id: 'h2',
			role: 'assistant',
			content: 'No. The app deploy only changed the export queue worker.',
		},
	]

	let anchoringMessages = $state<TranscriptMessage[]>(transcript.slice(0, 2))
	let streamingReply = $state('Ready to stream.')
	let historyMessages = $state<TranscriptMessage[]>(transcript.slice(2))
	let restoreMessageId = $state<string | null>(null)

	function sendAnchoringMessage() {
		anchoringMessages = [
			...anchoringMessages,
			{
				id: `user-${anchoringMessages.length}`,
				role: 'user',
				content: 'What should we inspect next?',
			},
			{
				id: `assistant-${anchoringMessages.length}`,
				role: 'assistant',
				content: 'Start with the story coverage and registry output.',
			},
		]
	}

	function loadHistory() {
		restoreMessageId = historyMessages[0]?.id ?? null
		historyMessages = [...earlier, ...historyMessages]
	}
</script>

{#snippet transcriptBody(messages: TranscriptMessage[], anchorRole: TranscriptRole = 'user')}
	<MessageScroller>
		<MessageScrollerViewport>
			<MessageScrollerContent>
				{#each messages as message (message.id)}
					{@const isUser = message.role === 'user'}
					<MessageScrollerItem messageId={message.id} scrollAnchor={message.role === anchorRole}>
						<Message align={isUser ? 'end' : 'start'}>
							<MessageContent>
								<Bubble variant={isUser ? 'default' : 'secondary'}>
									<BubbleContent>{message.content}</BubbleContent>
								</Bubble>
							</MessageContent>
						</Message>
					</MessageScrollerItem>
				{/each}
			</MessageScrollerContent>
		</MessageScrollerViewport>
		<MessageScrollerButton />
	</MessageScroller>
{/snippet}

{#snippet storyShell(controls: Snippet, body: Snippet)}
	<div class="flex size-full min-h-0 flex-col overflow-hidden">
		<div class="min-h-0 flex-1 overflow-hidden">
			{@render body()}
		</div>
		<div class="shrink-0 border-t p-2">
			{@render controls()}
		</div>
	</div>
{/snippet}

{#snippet jumpBody()}
	<div class="flex size-full min-h-0 flex-col overflow-hidden">
		<StoryJumpControls />
		<div class="min-h-0 flex-1 overflow-hidden">
			{@render transcriptBody(transcript)}
		</div>
	</div>
{/snippet}

{#snippet anchoringBody()}
	<div class="size-full min-h-0 overflow-hidden">
		<MessageScrollerProvider autoScroll>
			{@render transcriptBody(anchoringMessages)}
		</MessageScrollerProvider>
	</div>
{/snippet}

{#snippet streamingBody()}
	<div class="size-full min-h-0 overflow-hidden">
		<MessageScrollerProvider autoScroll>
			{@render
				transcriptBody([
					...transcript.slice(0, 3),
					{ id: 'streaming', role: 'assistant', content: streamingReply },
				])}
		</MessageScrollerProvider>
	</div>
{/snippet}

{#snippet historyBody()}
	<div class="size-full min-h-0 overflow-hidden">
		{@render transcriptBody(historyMessages)}
		<StoryRestorePosition messageId={restoreMessageId} onrestored={() => (restoreMessageId = null)} />
	</div>
{/snippet}

{#snippet sendControls()}
	<Button size="sm" onclick={sendAnchoringMessage}>Send Message</Button>
{/snippet}

{#snippet streamingControls()}
	<Button
		size="sm"
		onclick={() =>
			(streamingReply =
				'Streaming is simulated. The reply grows while the scroller keeps the live edge in view.')}
	>
		Send
	</Button>
{/snippet}

{#snippet historyControls()}
	<Button size="sm" onclick={loadHistory}>Load History</Button>
{/snippet}

<!-- The default transcript scrolls within a height-constrained container. -->
<Story name="Default" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider>
			{@render transcriptBody(transcript)}
		</MessageScrollerProvider>
	</div>
</Story>

<!-- Anchor new turns to user messages so the prompt starts near the top edge. -->
<Story name="Anchoring Turns" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		{@render storyShell(sendControls, anchoringBody)}
	</div>
</Story>

<!-- Auto-scroll follows the live edge while a scripted response streams in. -->
<Story name="Streaming" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		{@render storyShell(streamingControls, streamingBody)}
	</div>
</Story>

<!-- Open a saved transcript at the last anchored turn. -->
<Story name="Opening Position" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider defaultScrollPosition="last-anchor">
			{@render transcriptBody(transcript)}
		</MessageScrollerProvider>
	</div>
</Story>

<!-- Prepend earlier messages without moving the reader away from the visible row. -->
<Story name="Load History" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider defaultScrollPosition="start">
			{@render storyShell(historyControls, historyBody)}
		</MessageScrollerProvider>
	</div>
</Story>

<!-- Use external controls to jump to stable message ids. -->
<Story name="Jump To Message" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider>
			{@render jumpBody()}
		</MessageScrollerProvider>
	</div>
</Story>

<!-- Read scroll state for custom status text or controls. -->
<Story name="Scroll State" asChild>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider>
			<div class="flex size-full min-h-0 flex-col overflow-hidden">
				<div class="shrink-0 border-b p-2">
					<StoryScrollStatus />
				</div>
				<div class="min-h-0 flex-1 overflow-hidden">
					{@render transcriptBody(transcript)}
				</div>
			</div>
		</MessageScrollerProvider>
	</div>
</Story>

<!-- Verify external controls can scroll to the latest transcript turn. -->
<Story
	name="Scroll To Latest"
	tags={['!dev', '!autodocs']}
	play={endButtonInteraction}
	asChild
>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider>
			{@render jumpBody()}
		</MessageScrollerProvider>
	</div>
</Story>

<!-- Verify loading history preserves the visible transcript position. -->
<Story
	name="Prepend History Preserves Position"
	tags={['!dev', '!autodocs']}
	play={loadHistoryInteraction}
	asChild
>
	<div class="h-96 w-full min-w-sm max-w-lg rounded-md border">
		<MessageScrollerProvider defaultScrollPosition="start">
			{@render storyShell(historyControls, historyBody)}
		</MessageScrollerProvider>
	</div>
</Story>
