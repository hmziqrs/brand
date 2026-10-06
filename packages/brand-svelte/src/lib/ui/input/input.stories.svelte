<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Button } from '$brand/ui/button/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import { Label } from '$brand/ui/label/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Input',
		component: Input,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function shouldEnterText({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const input = canvasElement.querySelector('input[type="email"]')
		if (!(input instanceof HTMLInputElement)) throw new Error('the input is missing')
		input.focus()
		input.value = 'mocked@shadcn.com'
		input.dispatchEvent(new Event('input', { bubbles: true }))
		if (input.value !== 'mocked@shadcn.com') throw new Error('typing did not land in the input field')
	}
</script>

{#snippet field()}
	<Input class="w-96" type="email" placeholder="Email" />
{/snippet}

<Story name="Default" asChild>
	{@render field()}
</Story>

<Story name="Disabled" asChild>
	<Input class="w-96" type="email" placeholder="Email" disabled />
</Story>

<Story name="With Label" asChild>
	<div class="grid items-center gap-1.5">
		<Label for="email">Email</Label>
		<Input class="w-96" type="email" placeholder="Email" id="email" />
	</div>
</Story>

<Story name="With Helper Text" asChild>
	<div class="grid items-center gap-1.5">
		<Label for="email-2">Email</Label>
		<Input class="w-96" type="email" placeholder="Email" id="email-2" />
		<p class="text-foreground/60 text-sm">Enter your email address.</p>
	</div>
</Story>

<Story name="With Button" asChild>
	<div class="flex items-center space-x-2">
		<Input class="w-96" type="email" placeholder="Email" />
		<Button type="submit">Subscribe</Button>
	</div>
</Story>

<Story
	name="Should Enter Text"
	tags={['!dev', '!autodocs']}
	play={shouldEnterText}
	asChild
>
	{@render field()}
</Story>
