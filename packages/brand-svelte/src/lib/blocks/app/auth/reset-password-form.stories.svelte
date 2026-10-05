<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ResetPasswordForm from './reset-password-form.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: ResetPasswordForm })
</script>

<script lang="ts">
	const links = { forgotPassword: '/app/forgot-password', signIn: '/app/sign-in' }
</script>

<!-- The link is good: pick the new password. -->
<Story name="Reset password form" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} />
	</form>
</Story>

<!-- While the change is on its way. -->
<Story name="Reset password form, changing" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} pending={true} />
	</form>
</Story>

<!-- Too short a password: the field's own word under it. -->
<Story name="Reset password form, field error" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} result={{ field: 'password', message: 'Use at least 8 characters.' }} />
	</form>
</Story>

<!-- The link ran out of time. -->
<Story name="Reset password form, expired" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} status="expired" />
	</form>
</Story>

<!-- The link had already been used, or never was one. -->
<Story name="Reset password form, invalid" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} status="invalid" />
	</form>
</Story>

<!-- Done: the way back in. -->
<Story name="Reset password form, done" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} status="done" />
	</form>
</Story>

<!-- The form at 360px. -->
<Story name="Reset password form, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ResetPasswordForm {links} />
	</form>
</Story>
