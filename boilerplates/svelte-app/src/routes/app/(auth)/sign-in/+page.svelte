<!--
  The sign-in page (app-blocks.md, phase 5): the split AuthLayout with the
  product's rings, one form around SignInForm, posted to the page's action
  with use:enhance. The Google provider's endpoint turns straight back around
  with the failure in the URL, so it shows without JavaScript too.
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import AuthFrame from '$lib/auth-frame.svelte';
	import SignInForm from '$brand/blocks/app/auth/sign-in-form.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siGithub, siGoogle } from 'simple-icons';
	import { seededAction, type FormResult } from '$lib/auth-form.svelte.js';
	import type { PageProps } from './$types';

	let { form: action }: PageProps = $props();
	// What a post with no JavaScript sent back, read once while the page sets up.
	function seeded() {
		return seededAction(action);
	}
	const seed = seeded();

	// The Google provider's way back in: its endpoint redirects here with
	// provider=google, and the failure reads like any form error.
	const google = page.url.searchParams.get('provider') === 'google';

	let pending = $state(false);
	let result = $state<FormResult>(google ? { message: "Google sign-in isn't working right now. Try another way." } : seed.result);
	let values = $state<{ email?: string }>(seed.values);
</script>

<svelte:head>
	<title>Sign in — svelte-app</title>
</svelte:head>

<AuthFrame variant="split" title="Sign in" description="Sign in to your Sightline workspace.">
	<form
		method="POST"
		action="?/signIn"
		use:enhance={() => {
			pending = true;
			return async ({ result: kitResult, update }) => {
				pending = false;
				if (kitResult.type === 'redirect') {
					await update();
					return;
				}
				if (kitResult.type === 'failure') {
					const body = kitResult.data as { form?: { message?: string; field?: string }; values?: { email?: string } };
					result = body?.form?.message ? { message: body.form.message, field: body.form.field } : undefined;
					values = { email: body?.values?.email ?? values.email };
				}
			};
		}}
	>
		{#snippet githubIcon()}
			<BrandIcon icon={siGithub} />
		{/snippet}
		{#snippet googleIcon()}
			<BrandIcon icon={siGoogle} />
		{/snippet}
		<SignInForm
			{result}
			{pending}
			{values}
			providers={[
				{ id: 'github', label: 'GitHub', icon: githubIcon, href: '/app/sign-in/github' },
				{ id: 'google', label: 'Google', icon: googleIcon, href: '/app/sign-in/google' },
			]}
			links={{ signUp: '/app/sign-up', forgotPassword: '/app/forgot-password' }}
		/>
	</form>
</AuthFrame>
