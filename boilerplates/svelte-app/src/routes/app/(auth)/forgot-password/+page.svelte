<!--
  The forgot-password page (app-blocks.md, phase 5): one form around
  ForgotPasswordForm. Once the link is sent, the same line says so whatever
  the address was, and the button turns into the counting resend.
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import AuthFrame from '$lib/auth-frame.svelte';
	import ForgotPasswordForm from '$brand/blocks/app/auth/forgot-password-form.svelte';
	import { seededAction, type FormResult } from '$lib/auth-form.svelte.js';
	import type { PageProps } from './$types';

	let { form: action }: PageProps = $props();
	// What a post with no JavaScript sent back, read once while the page sets up.
	function seeded() {
		return seededAction(action);
	}
	const seed = seeded();

	// How long the resend waits. A resend restarts the count in the block;
	// a fresh page-load render starts it from here.
	const RESEND_AFTER = 30;

	let pending = $state(false);
	let result = $state<FormResult>(seed.result);
	let sentTo = $state<string | undefined>(seed.ok ? seed.values.email : undefined);
</script>

<AuthFrame title="Forgot your password?" description="We'll email you a link to set a new one.">
	<form
		method="POST"
		action="?/send"
		use:enhance={() => {
			pending = true;
			return async ({ result: kitResult }) => {
				pending = false;
				if (kitResult.type === 'failure') {
					const body = kitResult.data as { form?: { message?: string; field?: string } };
					result = body?.form?.message ? { message: body.form.message, field: body.form.field } : undefined;
					return;
				}
				if (kitResult.type === 'success') {
					const body = kitResult.data as { values?: { email?: string } };
					result = undefined;
					sentTo = body?.values?.email ?? sentTo;
				}
			};
		}}
	>
		<ForgotPasswordForm {result} {pending} {sentTo} resendAfter={RESEND_AFTER} links={{ signIn: '/app/sign-in' }} />
	</form>
</AuthFrame>
