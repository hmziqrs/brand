<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import UserMenu from './user-menu.svelte'

	const { Story } = defineMeta({
		title: 'App/Account',
		component: UserMenu,
	})
</script>

<script lang="ts">
	import CreditCard from '@lucide/svelte/icons/credit-card'
	import LogOut from '@lucide/svelte/icons/log-out'
	import Settings from '@lucide/svelte/icons/settings'
	import type { Theme } from './types.js'
	import { storyUser, storyUserItems } from '../stories-data.js'
	import { Button } from '$brand/ui/button/index.js'

	// The theme choice is live, as it is in the demo.
	let theme = $state<Theme>('dark')

	// The sidebar's own width, so the stories read as the real place.
	const sidebar = 'w-64 shrink-0 rounded-lg border bg-sidebar p-2'

	const withIcons = [
		{ label: 'Settings', href: '/app/settings/profile', icon: Settings },
		{ label: 'Billing', href: '/app/settings/billing', icon: CreditCard },
	]
</script>

{#snippet signOut()}
	<form class="p-1">
		<Button type="submit" variant="ghost" size="sm" class="w-full justify-start">
			<LogOut class="lucide" data-icon="inline-start" />
			Sign out
		</Button>
	</form>
{/snippet}

<!-- Who's signed in, their settings, the theme, and signing out. -->
<Story name="User menu" asChild>
	<div class="flex gap-6 p-6">
		<div class={sidebar}>
			<UserMenu user={storyUser} items={withIcons} {theme} onThemeChange={(next) => (theme = next)} {signOut} />
		</div>
	</div>
</Story>

<!-- Without a theme choice the menu ends with the items and sign out. -->
<Story name="User menu, no theme choice" asChild>
	<div class="flex gap-6 p-6">
		<div class={sidebar}>
			<UserMenu user={storyUser} items={storyUserItems} {signOut} />
		</div>
	</div>
</Story>

<!-- Inside a collapsed sidebar only the avatar stays. -->
<Story name="User menu, collapsed" asChild>
	<div class="flex gap-6 p-6">
		<div class="group w-12 shrink-0 rounded-lg border bg-sidebar p-2" data-collapsible="icon">
			<UserMenu user={storyUser} items={withIcons} {theme} onThemeChange={(next) => (theme = next)} {signOut} />
		</div>
	</div>
</Story>
