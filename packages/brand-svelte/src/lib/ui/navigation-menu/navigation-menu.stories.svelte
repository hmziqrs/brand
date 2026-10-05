<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import NavigationMenu from './navigation-menu.svelte'
	import NavigationMenuContent from './navigation-menu-content.svelte'
	import NavigationMenuItem from './navigation-menu-item.svelte'
	import NavigationMenuLink from './navigation-menu-link.svelte'
	import NavigationMenuList from './navigation-menu-list.svelte'
	import NavigationMenuTrigger from './navigation-menu-trigger.svelte'
	import { navigationMenuTriggerStyle } from './navigation-menu-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/NavigationMenu',
		component: NavigationMenu,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink class={navigationMenuTriggerStyle()}>
					Overview
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger class={navigationMenuTriggerStyle()}>
						Documentation
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul class="grid w-96 p-2">
							<li>
								<NavigationMenuLink class={navigationMenuTriggerStyle()}>
									API Reference
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink class={navigationMenuTriggerStyle()}>
									Getting Started
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink class={navigationMenuTriggerStyle()}>
									Guides
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink
					class={navigationMenuTriggerStyle()}
					href="https:www.google.com"
					target="_blank"
				>
					External
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
</Story>
