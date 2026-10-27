<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SignInForm from './sign-in-form.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: SignInForm })
</script>

<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte'
	import { siGithub, siGoogle } from 'simple-icons'
	import type { Provider } from './types.js'

	const links = { signUp: '/app/sign-up', forgotPassword: '/app/forgot-password' }
</script>

{#snippet githubIcon()}
	<BrandIcon icon={siGithub} />
{/snippet}

{#snippet googleIcon()}
	<BrandIcon icon={siGoogle} />
{/snippet}

<Story name="Sign in form" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignInForm
			{links}
			providers={[
				{ id: 'github', label: 'GitHub', icon: githubIcon, href: '/app/sign-in/github' },
				{ id: 'google', label: 'Google', icon: googleIcon, href: '/app/sign-in/google' },
			] satisfies Provider[]}
		/>
	</form>
</Story>

<Story name="Sign in form, no providers" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignInForm {links} values={{ email: 'maya@paperplane.app' }} />
	</form>
</Story>

<Story name="Sign in form, signing in" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignInForm {links} pending={true} values={{ email: 'maya@paperplane.app' }} />
	</form>
</Story>

<Story name="Sign in form, wrong password" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignInForm
			{links}
			values={{ email: 'maya@paperplane.app' }}
			result={{ message: "That email and password don't match. Try again or reset your password." }}
		/>
	</form>
</Story>

<Story name="Sign in form, field error" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignInForm {links} result={{ field: 'email', message: 'Enter your email to sign in.' }} />
	</form>
</Story>

<Story name="Sign in form, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<form class="flex flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<SignInForm
			{links}
			providers={[
				{ id: 'github', label: 'GitHub', icon: githubIcon, href: '/app/sign-in/github' },
				{ id: 'google', label: 'Google', icon: googleIcon, href: '/app/sign-in/google' },
			] satisfies Provider[]}
		/>
	</form>
</Story>
