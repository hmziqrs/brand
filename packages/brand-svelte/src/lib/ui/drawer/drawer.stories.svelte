<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Drawer from './drawer.svelte'
	import DrawerClose from './drawer-close.svelte'
	import DrawerContent from './drawer-content.svelte'
	import DrawerDescription from './drawer-description.svelte'
	import DrawerFooter from './drawer-footer.svelte'
	import DrawerHeader from './drawer-header.svelte'
	import DrawerTitle from './drawer-title.svelte'
	import DrawerTrigger from './drawer-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Drawer',
		component: Drawer,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function closeButton({ canvasElement }: { canvasElement: HTMLElement }, label: RegExp) {
		const doc = canvasElement.ownerDocument
		return [...doc.querySelectorAll('button')].find((button) => label.test(button.textContent ?? ''))
	}

	async function openThenCloseWith({ canvasElement }: { canvasElement: HTMLElement }, label: RegExp) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = canvasElement.querySelector('[data-slot="drawer-trigger"] button, [data-slot="drawer-trigger"]')
		if (!(trigger instanceof HTMLElement)) throw new Error('the drawer trigger is missing')
		trigger.click()
		let content: Element | null = null
		for (let waited = 0; !content && waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="drawer-content"][data-state="open"]')
		}
		if (!content) throw new Error('clicking the trigger did not open the drawer')
		const button = closeButton({ canvasElement }, label)
		if (!(button instanceof HTMLElement)) {
			throw new Error(`the ${label.source} button is missing from the open drawer`)
		}
		button.click()
		for (let waited = 0; waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="drawer-content"]')
			if (!content || content.getAttribute('data-state') === 'closed') return
		}
		throw new Error(`clicking the ${label.source} button did not close the drawer`)
	}

	function openThenCloseWithSubmit(context: { canvasElement: HTMLElement }) {
		return openThenCloseWith(context, /submit/i)
	}

	function openThenCloseWithCancel(context: { canvasElement: HTMLElement }) {
		return openThenCloseWith(context, /cancel/i)
	}
</script>

{#snippet form()}
	<Drawer>
		<DrawerTrigger>Open</DrawerTrigger>
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
				<DrawerDescription>This action cannot be undone.</DrawerDescription>
			</DrawerHeader>
			<DrawerFooter>
				<DrawerClose class="rounded bg-primary px-4 py-2 text-primary-foreground">
					Submit
				</DrawerClose>
				<DrawerClose class="hover:underline">Cancel</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
{/snippet}

<Story name="Default" asChild>
	{@render form()}
</Story>

<Story
	name="when clicking Submit button, should close the drawer"
	tags={['!dev', '!autodocs']}
	play={openThenCloseWithSubmit}
	asChild
>
	{@render form()}
</Story>

<Story
	name="when clicking Cancel button, should close the drawer"
	tags={['!dev', '!autodocs']}
	play={openThenCloseWithCancel}
	asChild
>
	{@render form()}
</Story>
