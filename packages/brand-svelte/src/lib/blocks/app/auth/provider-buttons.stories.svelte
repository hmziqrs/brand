<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ProviderButtons from './provider-buttons.svelte'

	const { Story } = defineMeta({ title: 'App/Auth', component: ProviderButtons })
</script>

<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte'
	import { siGithub, siGoogle } from 'simple-icons'
	import type { Provider } from './types.js'
</script>

{#snippet githubIcon()}
	<BrandIcon icon={siGithub} />
{/snippet}

{#snippet googleIcon()}
	<BrandIcon icon={siGoogle} />
{/snippet}

<!-- The outside ways in: outline buttons with the provider's logo. Choosing
	one turns its spinner on and stands the others down. -->
<Story name="Provider buttons" asChild>
	<form class="flex max-w-sm flex-col p-6" onsubmit={(event) => event.preventDefault()}>
		<ProviderButtons
			providers={[
				{ id: 'github', label: 'GitHub', icon: githubIcon, href: '/auth/github' },
				{ id: 'google', label: 'Google', icon: googleIcon, href: '/auth/google' },
			] satisfies Provider[]}
		/>
	</form>
</Story>
