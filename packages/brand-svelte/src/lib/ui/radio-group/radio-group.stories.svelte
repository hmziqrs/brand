<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Label } from '$brand/ui/label/index.js'
	import { RadioGroup, RadioGroupItem } from '$brand/ui/radio-group/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/RadioGroup',
		component: RadioGroup,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function shouldToggleRadio({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const radios = [...canvasElement.querySelectorAll<HTMLElement>('[role="radio"]')]
		if (radios.length !== 3) throw new Error(`expected 3 radio buttons, found ${radios.length}`)
		radios[0].click()
		await sleep(50)
		if (radios[0].getAttribute('aria-checked') !== 'true') {
			throw new Error('clicking a radio button did not check it')
		}
		if (radios[1].getAttribute('aria-checked') === 'true') {
			throw new Error('checking one radio left another checked')
		}
		radios[1].click()
		await sleep(50)
		if (radios[1].getAttribute('aria-checked') !== 'true') {
			throw new Error('clicking the second radio button did not check it')
		}
		if (radios[0].getAttribute('aria-checked') === 'true') {
			throw new Error('the first radio button stayed checked')
		}
	}
</script>

{#snippet demo()}
	<RadioGroup value="comfortable" class="grid gap-2 grid-cols-[1rem_1fr] items-center">
		<RadioGroupItem value="default" id="r1" />
		<Label for="r1">Default</Label>
		<RadioGroupItem value="comfortable" id="r2" />
		<Label for="r2">Comfortable</Label>
		<RadioGroupItem value="compact" id="r3" />
		<Label for="r3">Compact</Label>
	</RadioGroup>
{/snippet}

<Story name="Default" asChild>
	{@render demo()}
</Story>

<Story
	name="Should Toggle Radio"
	tags={['!dev', '!autodocs']}
	play={shouldToggleRadio}
	asChild
>
	{@render demo()}
</Story>
