<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DialogRoot from './dialog.svelte'
	import DialogClose from './dialog-close.svelte'
	import DialogContent from './dialog-content.svelte'
	import DialogDescription from './dialog-description.svelte'
	import DialogFooter from './dialog-footer.svelte'
	import DialogHeader from './dialog-header.svelte'
	import DialogTitle from './dialog-title.svelte'
	import DialogTrigger from './dialog-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Dialog',
		component: DialogRoot,
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
			if (!(trigger instanceof HTMLElement)) throw new Error('the dialog trigger is missing')
			trigger.click()
			let dialog: Element | null = null
			for (let waited = 0; !dialog && waited < 3000; waited += 30) {
				await sleep(30)
				dialog = doc.querySelector('[role="dialog"]')
			}
			if (!dialog) throw new Error('clicking the trigger did not open the dialog')
			const closer = buttonNamed(doc.body, text)
			if (!(closer instanceof HTMLElement)) throw new Error(`the ${text} button is missing`)
			closer.click()
			for (let waited = 0; doc.querySelector('[role="dialog"]') && waited < 3000; waited += 30) {
				await sleep(30)
			}
			if (doc.querySelector('[role="dialog"]')) {
				throw new Error(`clicking ${text} did not close the dialog`)
			}
		}
	}

	const closeWithContinue = shouldCloseWith('Continue')
	const closeWithCancel = shouldCloseWith('Cancel')
	const closeWithClose = shouldCloseWith('Close')
</script>

{#snippet dialog()}
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Are you absolutely sure?</DialogTitle>
			<DialogDescription>
				This action cannot be undone. This will permanently delete your account and remove your data from
				our servers.
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="gap-4">
			<DialogClose class="hover:underline">Cancel</DialogClose>
			<DialogClose class="rounded bg-primary px-4 py-2 text-primary-foreground">
				Continue
			</DialogClose>
		</DialogFooter>
	</DialogContent>
{/snippet}

<Story name="Default" asChild>
	<DialogRoot>
		<DialogTrigger>Open</DialogTrigger>
		{@render dialog()}
	</DialogRoot>
</Story>

<Story
	name="Should Open Close With Continue"
	tags={['!dev', '!autodocs']}
	play={closeWithContinue}
	asChild
>
	<DialogRoot>
		<DialogTrigger>Open</DialogTrigger>
		{@render dialog()}
	</DialogRoot>
</Story>

<Story
	name="Should Open Close With Cancel"
	tags={['!dev', '!autodocs']}
	play={closeWithCancel}
	asChild
>
	<DialogRoot>
		<DialogTrigger>Open</DialogTrigger>
		{@render dialog()}
	</DialogRoot>
</Story>

<Story
	name="Should Open Close Cross"
	tags={['!dev', '!autodocs']}
	play={closeWithClose}
	asChild
>
	<DialogRoot>
		<DialogTrigger>Open</DialogTrigger>
		{@render dialog()}
	</DialogRoot>
</Story>
