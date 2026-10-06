<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { toast } from 'svelte-sonner'
	import { Button } from '$brand/ui/button/index.js'
	import Toaster from './sonner.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Sonner',
		component: Toaster,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function showToast() {
		toast('Event has been created', {
			description: new Date().toLocaleString(),
			action: { label: 'Undo', onClick: () => {} },
		})
	}

	async function waitForToastCount(doc: Document, count: number) {
		for (let waited = 0; waited < 3000; waited += 30) {
			await sleep(30)
			if (doc.querySelectorAll('[data-sonner-toast]').length === count) return
		}
		throw new Error(`expected ${count} toasts on screen`)
	}

	function showButton(doc: Document) {
		return [...doc.body.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Show Toast')
	}

	async function showToasts({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		toast.dismiss()
		await waitForToastCount(doc, 0)
		const trigger = showButton(doc)
		if (!(trigger instanceof HTMLElement)) throw new Error('the Show Toast button is missing')
		trigger.click()
		await waitForToastCount(doc, 1)
		trigger.click()
		trigger.click()
		await waitForToastCount(doc, 3)
	}

	async function closeToast({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		toast.dismiss()
		await waitForToastCount(doc, 0)
		const trigger = showButton(doc)
		if (!(trigger instanceof HTMLElement)) throw new Error('the Show Toast button is missing')
		trigger.click()
		await waitForToastCount(doc, 1)
		const undo = [...doc.body.querySelectorAll('[data-button]')].find(
			(b) => b.textContent?.trim() === 'Undo'
		)
		if (!(undo instanceof HTMLElement)) throw new Error('the Undo button is missing')
		undo.click()
		await waitForToastCount(doc, 0)
	}
</script>

{#snippet toaster()}
	<div class="flex min-h-96 items-center justify-center space-x-2">
		<Button onclick={showToast}>Show Toast</Button>
		<Toaster position="bottom-right" />
	</div>
{/snippet}

<Story name="Default" asChild>
	{@render toaster()}
</Story>

<Story
	name="when clicking Show Toast button, should show a toast"
	tags={['!dev', '!autodocs']}
	play={showToasts}
	asChild
>
	{@render toaster()}
</Story>

<Story
	name="when clicking the close button, should close the toast"
	tags={['!dev', '!autodocs']}
	play={closeToast}
	asChild
>
	{@render toaster()}
</Story>
