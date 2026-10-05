<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Check from '@lucide/svelte/icons/check'
	import Info from '@lucide/svelte/icons/info'
	import ThumbsUp from '@lucide/svelte/icons/thumbs-up'
	import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '$brand/ui/bubble/index.js'
	import { Button } from '$brand/ui/button/index.js'
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '$brand/ui/collapsible/index.js'
	import { Popover, PopoverContent, PopoverTrigger } from '$brand/ui/popover/index.js'
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$brand/ui/tooltip/index.js'
	import BubbleRoot from './bubble.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Bubble',
		component: BubbleRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonByText(canvas: HTMLElement, pattern: RegExp) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			pattern.test(b.textContent ?? '')
		)
		if (!button) throw new Error(`the button matching ${pattern} is missing`)
		return button
	}
</script>

<Story name="Default" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble>
			<BubbleContent>I checked the registry output and removed the stale route.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Secondary" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="secondary">
			<BubbleContent>The component JSON now lives under the UI registry.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Muted" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="muted">
			<BubbleContent>This note has lower emphasis than the main reply.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Tinted" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="tinted">
			<BubbleContent>I can preserve the chat tone without using the full primary color.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Outline" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="outline">
			<BubbleContent>Here is the command output you asked me to review.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Destructive" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="destructive">
			<BubbleContent>Failed to send. Check your connection and try again.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Ghost" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="ghost">
			<BubbleContent>
				Ghost bubbles work well when assistant messages should read like regular text instead of framed
				chat surfaces.
			</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="AlignedEnd" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble align="end">
			<BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Group" asChild>
	<div class="w-full min-w-sm max-w-md">
		<BubbleGroup>
			<Bubble variant="secondary">
				<BubbleContent>Can you tell me what changed?</BubbleContent>
			</Bubble>
			<Bubble variant="secondary">
				<BubbleContent>The registry entries now match the files.</BubbleContent>
			</Bubble>
		</BubbleGroup>
	</div>
</Story>

<Story name="ButtonBubble" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="muted">
			<BubbleContent>
				{#snippet render({ props })}
					<button type="button" {...props}>I forgot my password</button>
				{/snippet}
			</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story name="Reactions" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="secondary" class="mb-4">
			<BubbleContent>Tests passed on the first try. Looking good.</BubbleContent>
			<BubbleReactions role="img" aria-label="Reactions: thumbs up and party">
				<span>👍</span>
				<span>🎉</span>
			</BubbleReactions>
		</Bubble>
	</div>
</Story>

<Story name="CollapsibleBubble" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Collapsible class="flex flex-col gap-2">
			<Bubble variant="secondary">
				<BubbleContent>
					The accessibility review found two focus states that were visually too subtle in dark mode.
				</BubbleContent>
			</Bubble>
			<CollapsibleContent>
				<Bubble variant="secondary">
					<BubbleContent>
						I checked the dialog, menu, and drawer paths because each one renders focusable controls inside
						an overlay.
					</BubbleContent>
				</Bubble>
			</CollapsibleContent>
			<CollapsibleTrigger class="w-fit text-sm underline underline-offset-4 hover:text-primary">
				Show more
			</CollapsibleTrigger>
		</Collapsible>
	</div>
</Story>

<Story name="TooltipBubble" asChild>
	<div class="w-full min-w-sm max-w-md">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					{#snippet child({ props })}
						<div {...props}>
							<Bubble variant="secondary">
								<BubbleContent>Yes, removed it from the registry.</BubbleContent>
							</Bubble>
						</div>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent>Read yesterday</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</div>
</Story>

<Story name="PopoverBubble" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Popover>
			<Bubble variant="destructive">
				<BubbleContent>
					{#snippet render({ props })}
						<PopoverTrigger {...props}>Failed to run the command.</PopoverTrigger>
					{/snippet}
				</BubbleContent>
			</Bubble>
			<PopoverContent class="max-w-xs text-sm">
				The process exited before Storybook finished loading.
			</PopoverContent>
		</Popover>
	</div>
</Story>

<Story
	name="ButtonInteraction"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		await sleep(50)
		const button = buttonByText(canvasElement, /subscription/i)
		button.click()
		await sleep(30)
		if (document.activeElement !== button) {
			throw new Error('the quick-reply button should have focus after the click')
		}
	}}
	asChild
>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="muted">
			<BubbleContent>
				{#snippet render({ props })}
					<button type="button" {...props}>I need help with my subscription</button>
				{/snippet}
			</BubbleContent>
		</Bubble>
	</div>
</Story>

<Story
	name="CollapsibleExpanded"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		await sleep(50)
		buttonByText(canvasElement, /show more/i).click()
		await sleep(150)
		if (!canvasElement.textContent?.includes('The hidden implementation detail is now visible.')) {
			throw new Error('the hidden bubble is not rendered after expanding')
		}
	}}
	asChild
>
	<div class="w-full min-w-sm max-w-md">
		<Collapsible class="flex flex-col gap-2">
			<Bubble variant="secondary">
				<BubbleContent>The short summary is visible first.</BubbleContent>
			</Bubble>
			<CollapsibleContent>
				<Bubble variant="secondary">
					<BubbleContent>The hidden implementation detail is now visible.</BubbleContent>
				</Bubble>
			</CollapsibleContent>
			<CollapsibleTrigger class="w-fit text-sm underline underline-offset-4 hover:text-primary">
				Show more
			</CollapsibleTrigger>
		</Collapsible>
	</div>
</Story>

<Story
	name="AccessibleReactions"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		await sleep(50)
		for (const name of ['Approve', 'Thumbs up']) {
			if (!canvasElement.querySelector(`button[aria-label="${name}"]`)) {
				throw new Error(`the "${name}" reaction button is missing`)
			}
		}
	}}
	asChild
>
	<div class="w-full min-w-sm max-w-md">
		<Bubble variant="secondary" class="mb-4">
			<BubbleContent>Can I run the formatter?</BubbleContent>
			<BubbleReactions>
				<Button aria-label="Approve" size="icon-xs" variant="secondary">
					<Check class="lucide" aria-hidden="true" />
				</Button>
				<Button aria-label="Thumbs up" size="icon-xs" variant="secondary">
					<ThumbsUp class="lucide" aria-hidden="true" />
				</Button>
				<Button aria-label="More information" size="icon-xs" variant="secondary">
					<Info class="lucide" aria-hidden="true" />
				</Button>
			</BubbleReactions>
		</Bubble>
	</div>
</Story>
