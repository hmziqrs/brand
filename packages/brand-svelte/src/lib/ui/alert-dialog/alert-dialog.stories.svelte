<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AlertDialogRoot from './alert-dialog.svelte'
	import AlertDialogAction from './alert-dialog-action.svelte'
	import AlertDialogCancel from './alert-dialog-cancel.svelte'
	import AlertDialogContent from './alert-dialog-content.svelte'
	import AlertDialogDescription from './alert-dialog-description.svelte'
	import AlertDialogFooter from './alert-dialog-footer.svelte'
	import AlertDialogHeader from './alert-dialog-header.svelte'
	import AlertDialogTitle from './alert-dialog-title.svelte'
	import AlertDialogTrigger from './alert-dialog-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/AlertDialog',
		component: AlertDialogRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonNamed(scope: ParentNode, text: string) {
		return [...scope.querySelectorAll('button')].find((b) => b.textContent?.trim() === text)
	}

	async function openAndClose({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = buttonNamed(canvasElement, 'Open')
		if (!(trigger instanceof HTMLElement)) throw new Error('the alert dialog trigger is missing')
		trigger.click()
		let dialog: Element | null = null
		for (let waited = 0; !dialog && waited < 3000; waited += 30) {
			await sleep(30)
			dialog = doc.querySelector('[role="alertdialog"]')
		}
		if (!dialog) throw new Error('clicking the trigger did not open the alert dialog')
		const cancel = buttonNamed(doc.body, 'Cancel')
		if (!(cancel instanceof HTMLElement)) throw new Error('the cancel button is missing')
		cancel.click()
		for (let waited = 0; waited < 3000; waited += 30) {
			await sleep(30)
			if (!doc.querySelector('[role="alertdialog"]')) return
		}
		throw new Error('clicking cancel did not close the alert dialog')
	}
</script>

{#snippet dialog()}
	<AlertDialogContent>
		<AlertDialogHeader>
			<AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
			<AlertDialogDescription>
				This action cannot be undone. This will permanently delete your account and remove your data from
				our servers.
			</AlertDialogDescription>
		</AlertDialogHeader>
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Continue</AlertDialogAction>
		</AlertDialogFooter>
	</AlertDialogContent>
{/snippet}

<Story name="Default" asChild>
	<AlertDialogRoot>
		<AlertDialogTrigger>Open</AlertDialogTrigger>
		{@render dialog()}
	</AlertDialogRoot>
</Story>

<Story
	name="when alert dialog trigger is pressed, should open the dialog and be able to close it"
	tags={['!dev', '!autodocs']}
	play={openAndClose}
	asChild
>
	<AlertDialogRoot>
		<AlertDialogTrigger>Open</AlertDialogTrigger>
		{@render dialog()}
	</AlertDialogRoot>
</Story>
