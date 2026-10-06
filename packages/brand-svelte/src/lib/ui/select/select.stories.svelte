<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectSeparator,
		SelectTrigger,
		SelectValue,
	} from '$brand/ui/select/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Select',
		component: Select,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function findOption(doc: Document, pattern: RegExp) {
		for (let waited = 0; waited < 3000; waited += 30) {
			await sleep(30)
			const option = [...doc.querySelectorAll<HTMLElement>('[role="option"]')].find((o) =>
				pattern.test(o.textContent ?? ''),
			)
			if (option) return option
		}
		return null
	}

	const waitFor = async (check: () => boolean) => {
		for (let waited = 0; waited < 3000; waited += 30) {
			await sleep(30)
			if (check()) return true
		}
		return false
	}

	async function shouldSelectOption({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const select = canvasElement.querySelector('[data-slot="select-trigger"]')
		if (!(select instanceof HTMLElement)) throw new Error('the select trigger is missing')
		select.click()
		const banana = await findOption(doc, /banana/i)
		if (!(banana instanceof HTMLElement)) throw new Error('opening the select did not list banana')
		banana.click()
		if (!(await waitFor(() => /banana/i.test(select.textContent ?? '')))) {
			throw new Error('selecting an option did not show it on the trigger')
		}
		select.click()
		const reopened = await findOption(doc, /banana/i)
		if (!(reopened instanceof HTMLElement)) throw new Error('re-opening the select did not list banana')
		if (reopened.getAttribute('aria-selected') !== 'true') {
			throw new Error('the selected option is not marked aria-selected')
		}
	}
</script>

{#snippet demo()}
	<Select type="single">
		<SelectTrigger title="Select" class="w-96">
			<SelectValue placeholder="Select a fruit" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>Fruits</SelectLabel>
				<SelectItem value="apple">Apple</SelectItem>
				<SelectItem value="banana">Banana</SelectItem>
				<SelectItem value="blueberry">Blueberry</SelectItem>
				<SelectItem value="grapes">Grapes</SelectItem>
				<SelectItem value="pineapple">Pineapple</SelectItem>
			</SelectGroup>
			<SelectSeparator />
			<SelectGroup>
				<SelectLabel>Vegetables</SelectLabel>
				<SelectItem value="aubergine">Aubergine</SelectItem>
				<SelectItem value="broccoli">Broccoli</SelectItem>
				<SelectItem value="carrot" disabled>
					Carrot
				</SelectItem>
				<SelectItem value="courgette">Courgette</SelectItem>
				<SelectItem value="leek">Leek</SelectItem>
			</SelectGroup>
			<SelectSeparator />
			<SelectGroup>
				<SelectLabel>Meat</SelectLabel>
				<SelectItem value="beef">Beef</SelectItem>
				<SelectItem value="chicken">Chicken</SelectItem>
				<SelectItem value="lamb">Lamb</SelectItem>
				<SelectItem value="pork">Pork</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
{/snippet}

<Story name="Default" asChild>
	{@render demo()}
</Story>

<Story
	name="Should Select Option"
	tags={['!dev', '!autodocs']}
	play={shouldSelectOption}
	asChild
>
	{@render demo()}
</Story>
