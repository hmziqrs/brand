<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Plus from '@lucide/svelte/icons/plus'
	import TooltipRoot from './tooltip.svelte'
	import TooltipContent from './tooltip-content.svelte'
	import TooltipProvider from './tooltip-provider.svelte'
	import TooltipTrigger from './tooltip-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Tooltip',
		component: TooltipContent,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function hoverAndLeave({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = canvasElement.querySelector('[data-slot="tooltip-trigger"]')
		if (!(trigger instanceof HTMLElement)) throw new Error('the tooltip trigger is missing')
		trigger.dispatchEvent(new MouseEvent('pointerenter', { bubbles: false }))
		trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }))
		let content: Element | null = null
		for (let waited = 0; !content && waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="tooltip-content"]')
		}
		if (!content) throw new Error('hovering the trigger did not show the tooltip content')
		trigger.dispatchEvent(new MouseEvent('pointerleave', { bubbles: false }))
		trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }))
		for (let waited = 0; doc.querySelector('[data-slot="tooltip-content"]') && waited < 3000; waited += 30) {
			await sleep(30)
		}
		if (doc.querySelector('[data-slot="tooltip-content"]')) {
			throw new Error('unhovering the trigger did not hide the tooltip content')
		}
	}
</script>

{#snippet tooltip(side: 'top' | 'bottom' | 'left' | 'right')}
	<TooltipProvider>
		<TooltipRoot>
			<TooltipTrigger>
				<Plus class="lucide h-4 w-4" />
				<span class="sr-only">Add</span>
			</TooltipTrigger>
			<TooltipContent {side}>Add to library</TooltipContent>
		</TooltipRoot>
	</TooltipProvider>
{/snippet}

<Story name="Default" asChild>
	{@render tooltip('top')}
</Story>

<Story name="Bottom" asChild>
	{@render tooltip('bottom')}
</Story>

<Story name="Left" asChild>
	{@render tooltip('left')}
</Story>

<Story name="Right" asChild>
	{@render tooltip('right')}
</Story>

<Story
	name="Should Show On Hover"
	tags={['!dev', '!autodocs']}
	play={hoverAndLeave}
	asChild
>
	{@render tooltip('top')}
</Story>
