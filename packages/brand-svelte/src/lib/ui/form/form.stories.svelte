<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Button } from '$brand/ui/button/index.js'
	import FieldRoot from '$brand/ui/field/field.svelte'
	import FieldDescription from '$brand/ui/field/field-description.svelte'
	import FieldError from '$brand/ui/field/field-error.svelte'
	import FieldGroup from '$brand/ui/field/field-group.svelte'
	import FieldLabel from '$brand/ui/field/field-label.svelte'
	import { Input } from '$brand/ui/input/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Form',
		component: FieldRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	import type { FormResult } from '$brand/blocks/app/auth/types.js'

	let username = $state('')
	let result: FormResult = $state(undefined)

	const invalid = $derived(result?.field === 'username')

	function submit(event: SubmitEvent) {
		event.preventDefault()
		result =
			username.trim().length >= 6
				? undefined
				: { message: 'Username must be at least 6 characters.', field: 'username' }
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function usernameInput(canvas: HTMLElement) {
		const input = canvas.querySelector<HTMLInputElement>('#form-username')
		if (!input) throw new Error('the username input is missing')
		return input
	}

	function submitButton(canvas: HTMLElement) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			b.textContent?.includes('Submit')
		)
		if (!button) throw new Error('the submit button is missing')
		return button
	}

	async function typeAndSubmit(canvasElement: HTMLElement, text: string) {
		await sleep(50)
		const input = usernameInput(canvasElement)
		input.value = text
		input.dispatchEvent(new Event('input', { bubbles: true }))
		await sleep(30)
		submitButton(canvasElement).click()
		await sleep(30)
		return input.closest('form')?.textContent ?? ''
	}
</script>

{#snippet profileForm()}
	<form class="w-full max-w-sm space-y-8" onsubmit={submit}>
		<FieldGroup>
			<FieldRoot data-invalid={invalid ? 'true' : undefined}>
				<FieldLabel for="form-username">Username</FieldLabel>
				<Input
					id="form-username"
					name="username"
					placeholder="username"
					bind:value={username}
					aria-invalid={invalid ? true : undefined}
				/>
				<FieldDescription>This is your public display name.</FieldDescription>
				<FieldError errors={invalid ? [result!] : []} />
			</FieldRoot>
		</FieldGroup>
		<Button type="submit">Submit</Button>
	</form>
{/snippet}

<Story
	name="Default"
	asChild
	parameters={{
		docs: {
			description: {
				story:
					'The lab shows this composition with React Hook Form and with TanStack Form; the kit has no form library — a SvelteKit page owns the <form> and posts it to its action, whose FormResult comes back as a prop (the auth blocks are the working example). This story plays that round trip locally: the submit handler stands in for the action and hands its FormResult back the way the page would.',
			},
		},
	}}
>
	{@render profileForm()}
</Story>

<Story
	name="when typing a valid username, should not show an error message"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		const text = await typeAndSubmit(canvasElement, 'mockuser')
		if (/username must be at least 6 characters/i.test(text)) {
			throw new Error('the error message should not be shown for a valid username')
		}
	}}
	asChild
>
	{@render profileForm()}
</Story>

<Story
	name="when typing a short username, should show an error message"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		await typeAndSubmit(canvasElement, 'fail')
		const alert = canvasElement.querySelector('[data-slot="field-error"]')
		if (!alert?.textContent?.includes('Username must be at least 6 characters.')) {
			throw new Error('the error message is missing after an invalid submit')
		}
	}}
	asChild
>
	{@render profileForm()}
</Story>
