<!--
  The verify-email page (app-blocks.md, phase 5): one form around VerifyEmail.
  The address comes with the redirect from sign-up, or defaults to the demo's
  current user; the code that works is "123456".
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import AuthFrame from '$lib/auth-frame.svelte';
	import VerifyEmail from '$brand/blocks/app/auth/verify-email.svelte';
	import { currentUser } from '@hmziq/brand-core/app/demo-data';
	import { seededAction, type FormResult } from '$lib/auth-form.svelte.js';
	import type { PageProps } from './$types';

	let { form: action }: PageProps = $props();
	// What a post with no JavaScript sent back, read once while the page sets up.
	function seeded() {
		return seededAction(action);
	}
	const seed = seeded();

	const email = page.url.searchParams.get('email') ?? currentUser.email;
	// How long the resend waits once the code is on its way.
	const RESEND_AFTER = 30;

	let pending = $state(false);
	let result = $state<FormResult>(seed.result);
	let status = $state<'sent' | 'verified'>(seed.ok ? 'verified' : 'sent');
</script>

<svelte:head>
	<title>Verify your email — svelte-app</title>
</svelte:head>

<AuthFrame title="Verify your email">
	<form
		method="POST"
		action="?/verify"
		use:enhance={({ formData }) => {
			// A resend's own round trip, without the "Verifying…" face.
			const resend = formData.get('resend') !== null;
			pending = true;
			return async ({ result: kitResult }) => {
				pending = false;
				if (kitResult.type === 'failure') {
					const body = kitResult.data as { form?: { message?: string } };
					result = body?.form?.message ? { message: body.form.message } : undefined;
					return;
				}
				if (kitResult.type === 'success') {
					result = undefined;
					if (!resend) status = 'verified';
				}
			};
		}}
	>
		<VerifyEmail {email} {status} {result} {pending} resendAfter={RESEND_AFTER} continueHref="/app/overview" />
	</form>
</AuthFrame>
