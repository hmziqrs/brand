<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AuthLayout from './auth-layout.svelte'

	const { Story } = defineMeta({ title: 'App/Auth layout', component: AuthLayout })
</script>

<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte'
	import Rings from '$brand/components/rings.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import PasswordInput from '../auth/password-input.svelte'

	// The demo's sign-in shape, so the stories read as the real page.
	const field = 'flex flex-col gap-2'
	const label = 'text-sm font-medium'
</script>

{#snippet brand()}
	<a href="/" aria-label="Sightline home" class="focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm outline-none">
		<Wordmark name="Sightline" class="text-lg" />
	</a>
{/snippet}

{#snippet footer()}
	<nav aria-label="Legal" class="flex items-center gap-4 text-sm">
		<a href="/terms" class="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Terms</a>
		<a href="/privacy" class="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Privacy</a>
	</nav>
{/snippet}

{#snippet form()}
	<form class="flex flex-col gap-4" onsubmit={(event) => event.preventDefault()}>
		<div class={field}>
			<label class={label} for="layout-email">Email</label>
			<Input id="layout-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" />
		</div>
		<div class={field}>
			<label class={label} for="layout-password">Password</label>
			<PasswordInput id="layout-password" name="password" autocomplete="current-password" />
		</div>
		<Button type="submit">Sign in</Button>
	</form>
{/snippet}

<!-- The whole page: one small column, the brand at the top. -->
<Story name="Centered" asChild>
	<AuthLayout {brand} title="Sign in" description="Sign in to your Sightline workspace." {footer}>
		{form}
	</AuthLayout>
</Story>

<!-- The split: the form on the left, the product's rings on the right. -->
<Story name="Split" asChild>
	<AuthLayout variant="split" {brand} title="Sign in" description="Sign in to your Sightline workspace." {footer}>
		{#snippet aside()}
			<div class="w-full max-w-md">
				<Rings seed="sightline" />
			</div>
		{/snippet}
		{form}
	</AuthLayout>
</Story>

<!-- Below md the split is the centered page; this is the same at 360px. -->
<Story name="Split, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<AuthLayout variant="split" {brand} title="Sign in" description="Sign in to your Sightline workspace." {footer}>
		{#snippet aside()}
			<div class="w-full max-w-md">
				<Rings seed="sightline" />
			</div>
		{/snippet}
		{form}
	</AuthLayout>
</Story>
