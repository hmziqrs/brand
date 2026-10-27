<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ResetPasswordForm from './reset-password-form.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: ResetPasswordForm })
</script>

<script lang="ts">
	const links = { forgotPassword: '/app/forgot-password', signIn: '/app/sign-in' }
</script>

<Story name="Reset password form" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} />
	</form>
</Story>

<Story name="Reset password form, changing" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} pending={true} />
	</form>
</Story>

<Story name="Reset password form, field error" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} result={{ field: 'password', message: 'Use at least 8 characters.' }} />
	</form>
</Story>

<Story name="Reset password form, expired" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} status="expired" />
	</form>
</Story>

<Story name="Reset password form, invalid" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} status="invalid" />
	</form>
</Story>

<Story name="Reset password form, done" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} status="done" />
	</form>
</Story>

<Story name="Reset password form, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} />
	</form>
</Story>
