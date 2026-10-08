<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Accordion from './accordion.svelte'
	import AccordionContent from './accordion-content.svelte'
	import AccordionItem from './accordion-item.svelte'
	import AccordionTrigger from './accordion-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Accordion',
		component: Accordion,
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function triggersIn(canvasElement: HTMLElement) {
		return [...canvasElement.querySelectorAll<HTMLElement>('button[aria-expanded]')]
	}

	const expandedCount = (triggers: HTMLElement[]) =>
		triggers.filter((t) => t.getAttribute('aria-expanded') === 'true').length

	async function openOneAtATime({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const triggers = triggersIn(canvasElement)
		for (const trigger of triggers) {
			trigger.click()
			await sleep(100)
			if (expandedCount(triggers) !== 1) {
				throw new Error('clicking an accordion item left more than one item open')
			}
		}
		triggers[triggers.length - 1].click()
		await sleep(100)
		if (expandedCount(triggers) !== 0) {
			throw new Error('re-clicking the last opened item did not close it')
		}
	}

	async function openAllOneAtATime({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const triggers = triggersIn(canvasElement)
		for (let i = 0; i < triggers.length; i++) {
			triggers[i].click()
			await sleep(100)
			if (expandedCount(triggers) !== i + 1) {
				throw new Error(`after ${i + 1} clicks, ${expandedCount(triggers)} items were open`)
			}
		}
		for (let i = triggers.length - 1; i > 0; i--) {
			triggers[i].click()
			await sleep(100)
			if (expandedCount(triggers) !== i) {
				throw new Error(`closing item ${i + 1} left ${expandedCount(triggers)} items open`)
			}
		}
		triggers[0].click()
		await sleep(100)
		if (expandedCount(triggers) !== 0) {
			throw new Error('closing the last opened item left items open')
		}
	}
</script>

{#snippet items()}
	<AccordionItem value="item-1">
		<AccordionTrigger>Is it accessible?</AccordionTrigger>
		<AccordionContent>
			Yes. It adheres to the WAI-ARIA design pattern.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-2">
		<AccordionTrigger>Is it styled?</AccordionTrigger>
		<AccordionContent>
			Yes. It comes with default styles that matches the other components' aesthetic.
		</AccordionContent>
	</AccordionItem>
	<AccordionItem value="item-3">
		<AccordionTrigger>Is it animated?</AccordionTrigger>
		<AccordionContent>
			Yes. It's animated by default, but you can disable it if you prefer.
		</AccordionContent>
	</AccordionItem>
{/snippet}

<Story name="Default" asChild>
	<Accordion type="single">
		{@render items()}
	</Accordion>
</Story>

<Story
	name="when accordions are clicked, should open only one item at a time"
	tags={['!dev', '!autodocs']}
	play={openOneAtATime}
	asChild
>
	<Accordion type="single">
		{@render items()}
	</Accordion>
</Story>

<Story
	name="when accordions are clicked, should open all items one at a time"
	tags={['!dev', '!autodocs']}
	play={openAllOneAtATime}
	asChild
>
	<Accordion type="multiple">
		{@render items()}
	</Accordion>
</Story>
