<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PasswordInput from './password-input.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: PasswordInput })
</script>

<!-- The password field with its show/hide button, password on the way in. -->
<Story name="Password input" asChild>
	<form class="flex max-w-sm flex-col gap-2 p-6" onsubmit={(event) => event.preventDefault()}>
		<label class="text-sm font-medium" for="pw">Password</label>
		<PasswordInput id="pw" name="password" autocomplete="current-password" />
	</form>
</Story>

<!-- Shown: the button says "Hide password" and the field turns plain text.
	The play function flips the real toggle when the story loads, so this is
	the face it holds, not the hidden one the default story already shows. -->
<Story
	name="Password input, shown"
	asChild
	play={({ canvasElement }) => {
		const toggle = canvasElement.querySelector('button[aria-label="Show password"]')
		if (toggle instanceof HTMLButtonElement) toggle.click()
	}}
>
	<form class="flex max-w-sm flex-col gap-2 p-6" onsubmit={(event) => event.preventDefault()}>
		<label class="text-sm font-medium" for="pw-shown">Password</label>
		<PasswordInput id="pw-shown" name="password" autocomplete="current-password" value="correct horse" />
	</form>
</Story>
