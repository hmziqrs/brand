<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Popover, PopoverContent, PopoverTrigger } from '$brand/ui/popover/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Popover',
		component: Popover,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function shouldOpenClose({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = canvasElement.querySelector('[data-slot="popover-trigger"]')
		if (!(trigger instanceof HTMLElement)) throw new Error('the popover trigger is missing')
		trigger.click()
		let content: Element | null = null
		for (let waited = 0; !content && waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="popover-content"]')
		}
		if (!content) throw new Error('clicking the trigger did not open the popover')
		trigger.click()
		for (let waited = 0; doc.querySelector('[data-slot="popover-content"]') && waited < 3000; waited += 30) {
			await sleep(30)
		}
		if (doc.querySelector('[data-slot="popover-content"]')) {
			throw new Error('re-clicking the trigger did not close the popover')
		}
	}
</script>

{#snippet demo()}
	<Popover>
		<PopoverTrigger>Open</PopoverTrigger>
		<PopoverContent>Place content for the popover here.</PopoverContent>
	</Popover>
{/snippet}

<Story name="Default" asChild>
	{@render demo()}
</Story>

<Story
	name="Should Open Close"
	tags={['!dev', '!autodocs']}
	play={shouldOpenClose}
	asChild
>
	{@render demo()}
</Story>
