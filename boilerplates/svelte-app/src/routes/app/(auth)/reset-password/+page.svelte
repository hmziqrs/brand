<!--
  The reset-password page (app-blocks.md, phase 5): one form around
  ResetPasswordForm. The link's health is the demo's `state` param —
  state=expired shows the expired link — and a successful change turns the
  form into "done", whatever the link was.
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import AuthFrame from '$lib/auth-frame.svelte';
	import ResetPasswordForm from '$brand/blocks/app/auth/reset-password-form.svelte';
	import { seededAction, type FormResult } from '$lib/auth-form.svelte.js';
	import type { PageProps } from './$types';

	let { form: action }: PageProps = $props();

	// The link's health is the demo's state param; a change that landed wins
	// over it. Read once while the page sets up, like the no-JavaScript seed.
	function seeded() {
		const seed = seededAction(action);
		const link = page.url.searchParams.get('state') === 'expired' ? 'expired' : 'ready';
		return { ...seed, status: seed.ok ? 'done' : link } as const;
	}
	const seed = seeded();

	let status = $state<'ready' | 'expired' | 'invalid' | 'done'>(seed.status);

	let pending = $state(false);
	let result = $state<FormResult>(seed.result);
</script>

<svelte:head>
	<title>Reset your password — svelte-app</title>
</svelte:head>

<AuthFrame title="Reset your password" description="Pick a new password for your account.">
	<form
		method="POST"
		action="?/reset"
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
					result = undefined;
					status = 'done';
				}
			};
		}}
	>
		<ResetPasswordForm {result} {pending} {status} links={{ forgotPassword: '/app/forgot-password', signIn: '/app/sign-in' }} />
	</form>
</AuthFrame>
