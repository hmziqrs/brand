<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import HoverCard from './hover-card.svelte'
	import HoverCardContent from './hover-card-content.svelte'
	import HoverCardTrigger from './hover-card-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/HoverCard',
		component: HoverCard,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function hoverAndLeave({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = canvasElement.querySelector('[data-slot="hover-card-trigger"]')
		if (!(trigger instanceof HTMLElement)) throw new Error('the hover card trigger is missing')
		trigger.dispatchEvent(new MouseEvent('pointerenter', { bubbles: false }))
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }))
		let content: Element | null = null
		for (let waited = 0; !content && waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="hover-card-content"]')
		}
		if (!content) throw new Error('hovering the trigger did not show the hover card content')
		trigger.dispatchEvent(new MouseEvent('pointerleave', { bubbles: false }))
		trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }))
		for (let waited = 0; doc.querySelector('[data-slot="hover-card-content"]') && waited < 3000; waited += 30) {
			await sleep(30)
		}
		if (doc.querySelector('[data-slot="hover-card-content"]')) {
			throw new Error('unhovering the trigger did not hide the hover card content')
		}
	}
</script>

<Story name="Default" asChild>
	<HoverCard>
		<HoverCardTrigger>Hover</HoverCardTrigger>
		<HoverCardContent>
			The React Framework - created and maintained by @vercel.
		</HoverCardContent>
	</HoverCard>
</Story>

<Story name="Instant" asChild>
	<HoverCard openDelay={0} closeDelay={0}>
		<HoverCardTrigger>Hover</HoverCardTrigger>
		<HoverCardContent>
			The React Framework - created and maintained by @vercel.
		</HoverCardContent>
	</HoverCard>
</Story>

<Story
	name="when hovering over trigger, should show hover card content"
	tags={['!dev', '!autodocs']}
	play={hoverAndLeave}
	asChild
>
	<HoverCard>
		<HoverCardTrigger>Hover</HoverCardTrigger>
		<HoverCardContent>
			The React Framework - created and maintained by @vercel.
		</HoverCardContent>
	</HoverCard>
</Story>
