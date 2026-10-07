<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SheetRoot from './sheet.svelte'
	import SheetClose from './sheet-close.svelte'
	import SheetContent from './sheet-content.svelte'
	import SheetDescription from './sheet-description.svelte'
	import SheetFooter from './sheet-footer.svelte'
	import SheetHeader from './sheet-header.svelte'
	import SheetTitle from './sheet-title.svelte'
	import SheetTrigger from './sheet-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Sheet',
		component: SheetRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonNamed(scope: ParentNode, text: string) {
		return [...scope.querySelectorAll('button')].find((b) => b.textContent?.trim() === text)
	}

	function shouldCloseWith(text: string) {
		return async function close({ canvasElement }: { canvasElement: HTMLElement }) {
			const doc = canvasElement.ownerDocument
			await sleep(50)
			const trigger = buttonNamed(canvasElement, 'Open')
			if (!(trigger instanceof HTMLElement)) throw new Error('the sheet trigger is missing')
			trigger.click()
			let sheet: Element | null = null
			for (let waited = 0; !sheet && waited < 3000; waited += 30) {
				await sleep(30)
				sheet = doc.querySelector('[role="dialog"]')
			}
			if (!sheet) throw new Error('clicking the trigger did not open the sheet')
			const closer = buttonNamed(doc.body, text)
			if (!(closer instanceof HTMLElement)) throw new Error(`the ${text} button is missing`)
			closer.click()
			for (let waited = 0; doc.querySelector('[role="dialog"]') && waited < 3000; waited += 30) {
				await sleep(30)
			}
			if (doc.querySelector('[role="dialog"]')) {
				throw new Error(`clicking ${text} did not close the sheet`)
			}
		}
	}

	const closeWithSubmit = shouldCloseWith('Submit')
	const closeWithCancel = shouldCloseWith('Cancel')
	const closeWithClose = shouldCloseWith('Close')
</script>

{#snippet sheet()}
	<SheetContent>
		<SheetHeader>
			<SheetTitle>Are you absolutely sure?</SheetTitle>
			<SheetDescription>
				This action cannot be undone. This will permanently delete your account and remove your data from
				our servers.
			</SheetDescription>
		</SheetHeader>
		<SheetFooter>
			<SheetClose class="hover:underline">Cancel</SheetClose>
			<SheetClose class="rounded bg-primary px-4 py-2 text-primary-foreground">
				Submit
			</SheetClose>
		</SheetFooter>
	</SheetContent>
{/snippet}

<Story name="Default" asChild>
	<SheetRoot>
		<SheetTrigger>Open</SheetTrigger>
		{@render sheet()}
	</SheetRoot>
</Story>

<Story
	name="Should Open Close With Submit"
	tags={['!dev', '!autodocs']}
	play={closeWithSubmit}
	asChild
>
	<SheetRoot>
		<SheetTrigger>Open</SheetTrigger>
		{@render sheet()}
	</SheetRoot>
</Story>

<Story
	name="Should Open Close With Cancel"
	tags={['!dev', '!autodocs']}
	play={closeWithCancel}
	asChild
>
	<SheetRoot>
		<SheetTrigger>Open</SheetTrigger>
		{@render sheet()}
	</SheetRoot>
</Story>

<Story
	name="Should Open Close With Close"
	tags={['!dev', '!autodocs']}
	play={closeWithClose}
	asChild
>
	<SheetRoot>
		<SheetTrigger>Open</SheetTrigger>
		{@render sheet()}
	</SheetRoot>
</Story>
