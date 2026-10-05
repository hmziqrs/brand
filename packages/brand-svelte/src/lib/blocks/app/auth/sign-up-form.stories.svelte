<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SignUpForm from './sign-up-form.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: SignUpForm })
</script>

<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte'
	import { siGithub, siGoogle } from 'simple-icons'
	import type { PasswordRule, Provider } from './types.js'

	const links = { signIn: '/app/sign-in', terms: '/terms', privacy: '/privacy' }
	const rules: PasswordRule[] = [
		{ label: 'At least 8 characters', pattern: '.{8,}' },
		{ label: 'One uppercase letter', pattern: '[A-Z]' },
		{ label: 'One number', pattern: '\\d' },
	]
</script>

{#snippet githubIcon()}
	<BrandIcon icon={siGithub} />
{/snippet}

{#snippet googleIcon()}
	<BrandIcon icon={siGoogle} />
{/snippet}

<!-- The form as the page serves it, with its password rules below the field. -->
<Story name="Sign up form" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignUpForm
			{links}
			passwordRules={rules}
			providers={[
				{ id: 'github', label: 'GitHub', icon: githubIcon, href: '/app/sign-up/github' },
				{ id: 'google', label: 'Google', icon: googleIcon, href: '/app/sign-up/google' },
			] satisfies Provider[]}
		/>
	</form>
</Story>

<!-- While the post is on its way. -->
<Story name="Sign up form, creating" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignUpForm {links} passwordRules={rules} pending={true} values={{ name: 'Ada Lovelace', email: 'ada@example.com' }} />
	</form>
</Story>

<!-- The email is taken: the server's word under the field it refused. -->
<Story name="Sign up form, email taken" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignUpForm
			{links}
			passwordRules={rules}
			values={{ name: 'Ada', email: 'taken@example.com' }}
			result={{ field: 'email', message: "There's already an account with this email. Sign in instead." }}
		/>
	</form>
</Story>

<!-- A form-level error, in the Notice at the top. -->
<Story name="Sign up form, error" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignUpForm {links} passwordRules={rules} result={{ message: "We couldn't create your account. Try again." }} />
	</form>
</Story>

<!-- The whole form at 360px. -->
<Story name="Sign up form, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignUpForm {links} passwordRules={rules} />
	</form>
</Story>
