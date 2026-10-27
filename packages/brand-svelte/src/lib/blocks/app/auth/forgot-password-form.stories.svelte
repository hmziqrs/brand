<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ForgotPasswordForm from './forgot-password-form.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: ForgotPasswordForm })
</script>

<script lang="ts">
	const links = { signIn: '/app/sign-in' }
</script>

<Story name="Forgot password form" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} />
	</form>
</Story>

<Story name="Forgot password form, sent" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} sentTo="maya@paperplane.app" resendAfter={30} />
	</form>
</Story>

<Story name="Forgot password form, sending" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} pending={true} />
	</form>
</Story>

<Story name="Forgot password form, field error" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} result={{ field: 'email', message: 'Enter your email to send the link.' }} />
	</form>
</Story>

<Story name="Forgot password form, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} />
	</form>
</Story>
