<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Label } from '$brand/ui/label/index.js'
	import Checkbox from './checkbox.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Checkbox',
		component: Checkbox,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function toggleCheck({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const checkbox = canvasElement.querySelector('[role="checkbox"]')
		if (!(checkbox instanceof HTMLElement)) throw new Error('the checkbox is missing')
		checkbox.click()
		await sleep(100)
		if (checkbox.getAttribute('aria-checked') !== 'true') throw new Error('the checkbox did not check')
		checkbox.click()
		await sleep(100)
		if (checkbox.getAttribute('aria-checked') !== 'false') throw new Error('the checkbox did not uncheck')
		checkbox.click()
		await sleep(100)
		if (checkbox.getAttribute('aria-checked') !== 'true') throw new Error('the checkbox did not recheck')
	}
</script>

{#snippet field(id: string, disabled = false)}
	<div class="flex space-x-2">
		<Checkbox {id} {disabled} />
		<Label for={id}>Accept terms and conditions</Label>
	</div>
{/snippet}

<Story name="Default" asChild>
	{@render field('terms')}
</Story>

<Story name="Disabled" asChild>
	{@render field('disabled-terms', true)}
</Story>

<Story
	name="when the checkbox is clicked, should toggle between checked and not checked"
	tags={['!dev', '!autodocs']}
	play={toggleCheck}
	asChild
>
	{@render field('terms')}
</Story>
