<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ForgotPasswordForm from './forgot-password-form.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: ForgotPasswordForm })
</script>

<script lang="ts">
	const links = { signIn: '/app/sign-in' }
</script>

<!-- The form as the page serves it: one email field, one button. -->
<Story name="Forgot password form" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} />
	</form>
</Story>

<!-- The link is on its way: the same line whatever the address was, and the
	button a resend counting down. -->
<Story name="Forgot password form, sent" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} sentTo="maya@paperplane.app" resendAfter={30} />
	</form>
</Story>

<!-- While the send is on its way. -->
<Story name="Forgot password form, sending" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} pending={true} />
	</form>
</Story>

<!-- The address wasn't an address: the field's own word under it. -->
<Story name="Forgot password form, field error" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} result={{ field: 'email', message: 'Enter your email to send the link.' }} />
	</form>
</Story>

<!-- The whole form at 360px. -->
<Story name="Forgot password form, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ForgotPasswordForm {links} />
	</form>
</Story>
