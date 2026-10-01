<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import VerifyEmail from './verify-email.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: VerifyEmail })
</script>

<script lang="ts">
	const email = 'maya@paperplane.app'
</script>

<!-- The code entry: six digits, a verify button, a counting resend. -->
<Story name="Verify email" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<VerifyEmail {email} resendAfter={30} continueHref="/app/overview" />
	</form>
</Story>

<!-- While the code is being checked. -->
<Story name="Verify email, verifying" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<VerifyEmail {email} status="verifying" />
	</form>
</Story>

<!-- The code didn't match: the Notice at the top, the digits cleared. -->
<Story name="Verify email, wrong code" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<VerifyEmail {email} result={{ message: "That code isn't right. Check it and try again." }} />
	</form>
</Story>

<!-- The code ran out of time: a new one, one button. -->
<Story name="Verify email, expired" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<VerifyEmail {email} status="expired" />
	</form>
</Story>

<!-- Through: the way on in. -->
<Story name="Verify email, verified" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<VerifyEmail {email} status="verified" continueHref="/app/overview" />
	</form>
</Story>

<!-- The whole thing at 360px. -->
<Story name="Verify email, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<VerifyEmail {email} resendAfter={30} continueHref="/app/overview" />
	</form>
</Story>
