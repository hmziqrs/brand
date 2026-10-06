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
	let touched = $state(false)
	let result: FormResult = $state(undefined)

	const invalid = $derived(touched && result?.field === 'username')

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function submit(event: SubmitEvent) {
		event.preventDefault()
		await sleep(25)
		result =
			username.trim().length >= 6
				? undefined
				: { message: 'Username must be at least 6 characters.', field: 'username' }
	}

	function usernameInput(canvas: HTMLElement) {
		const input = canvas.querySelector<HTMLInputElement>('#form-action-username')
		if (!input) throw new Error('the username input is missing')
		return input
	}

	function submitButton(canvas: HTMLElement) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			b.textContent?.includes('Submit'),
		)
		if (!button) throw new Error('the submit button is missing')
		return button
	}

	async function postAndRead(canvasElement: HTMLElement, text: string) {
		await sleep(50)
		const input = usernameInput(canvasElement)
		input.value = text
		input.dispatchEvent(new Event('input', { bubbles: true }))
		await sleep(30)
		submitButton(canvasElement).click()
		await sleep(90)
		return input.closest('form')?.textContent ?? ''
	}
</script>

{#snippet actionForm()}
	<form class="w-full max-w-sm space-y-8" onsubmit={submit}>
		<FieldGroup>
			<FieldRoot data-invalid={invalid ? 'true' : undefined}>
				<FieldLabel for="form-action-username">Username</FieldLabel>
				<Input
					id="form-action-username"
					name="username"
					placeholder="username"
					bind:value={username}
					oninput={() => (touched = true)}
					onblur={() => (touched = true)}
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
	name="Server Action"
	asChild
	parameters={{
		docs: {
			description: {
				story:
					"Ports the lab's TanStack Form trio (the React Hook Form one is the Default story next door). The kit has no form library: the submit handler stands in for a SvelteKit action, awaiting the way +page.server.ts would and handing its FormResult back the way the page prop does, and the error stays gated on the field being touched, matching the lab's isTouched check.",
			},
		},
	}}
>
	{@render actionForm()}
</Story>

<Story
	name="Server Action Accepts A Valid Username"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		const text = await postAndRead(canvasElement, 'mockuser')
		if (/username must be at least 6 characters/i.test(text)) {
			throw new Error('the error message should not be shown for a valid username')
		}
	}}
	asChild
>
	{@render actionForm()}
</Story>

<Story
	name="Server Action Rejects A Short Username"
	tags={['!dev', '!autodocs']}
	play={async ({ canvasElement }) => {
		await postAndRead(canvasElement, 'fail')
		const alert = canvasElement.querySelector('[data-slot="field-error"]')
		if (!alert?.textContent?.includes('Username must be at least 6 characters.')) {
			throw new Error('the error message is missing after an invalid submit')
		}
	}}
	asChild
>
	{@render actionForm()}
</Story>
