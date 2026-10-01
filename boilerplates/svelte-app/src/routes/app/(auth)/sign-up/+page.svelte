<!--
  The sign-up page (app-blocks.md, phase 5): the centered AuthLayout, one
  form around SignUpForm with its password rules, posted to the page's
  action with use:enhance.
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import AuthFrame from '$lib/auth-frame.svelte';
	import SignUpForm from '$brand/blocks/app/auth/sign-up-form.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siGithub, siGoogle } from 'simple-icons';
	import { passwordRules } from '$lib/auth-schemas.js';
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
	let values = $state<{ name?: string; email?: string }>(seed.values);
</script>

<AuthFrame title="Create your account" description="Start tracking your product with Sightline.">
	<form
		method="POST"
		action="?/signUp"
		use:enhance={() => {
			pending = true;
			return async ({ result: kitResult, update }) => {
				pending = false;
				if (kitResult.type === 'redirect') {
					await update();
					return;
				}
				if (kitResult.type === 'failure') {
					const body = kitResult.data as { form?: { message?: string; field?: string }; values?: Record<string, string> };
					result = body?.form?.message ? { message: body.form.message, field: body.form.field } : undefined;
					values = body?.values ?? values;
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
		<SignUpForm
			{result}
			{pending}
			{values}
			passwordRules={passwordRules}
			providers={[
				{ id: 'github', label: 'GitHub', icon: githubIcon, href: '/app/sign-up/github' },
				{ id: 'google', label: 'Google', icon: googleIcon, href: '/app/sign-up/google' },
			]}
			links={{ signIn: '/app/sign-in', terms: '/terms', privacy: '/privacy' }}
		/>
	</form>
</AuthFrame>
