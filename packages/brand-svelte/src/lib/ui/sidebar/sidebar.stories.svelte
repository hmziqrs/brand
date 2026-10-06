<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Component, Snippet } from 'svelte'
	import Calendar from '@lucide/svelte/icons/calendar'
	import ChevronUp from '@lucide/svelte/icons/chevron-up'
	import Home from '@lucide/svelte/icons/home'
	import Inbox from '@lucide/svelte/icons/inbox'
	import Search from '@lucide/svelte/icons/search'
	import Settings from '@lucide/svelte/icons/settings'
	import User2 from '@lucide/svelte/icons/user-2'
	import DropdownMenuContent from '../dropdown-menu/dropdown-menu-content.svelte'
	import DropdownMenuItem from '../dropdown-menu/dropdown-menu-item.svelte'
	import DropdownMenuRoot from '../dropdown-menu/dropdown-menu.svelte'
	import DropdownMenuTrigger from '../dropdown-menu/dropdown-menu-trigger.svelte'
	import SidebarRoot from './sidebar.svelte'
	import SidebarContent from './sidebar-content.svelte'
	import SidebarFooter from './sidebar-footer.svelte'
	import SidebarGroup from './sidebar-group.svelte'
	import SidebarGroupContent from './sidebar-group-content.svelte'
	import SidebarGroupLabel from './sidebar-group-label.svelte'
	import SidebarHeader from './sidebar-header.svelte'
	import SidebarMenu from './sidebar-menu.svelte'
	import SidebarMenuButton from './sidebar-menu-button.svelte'
	import SidebarMenuItem from './sidebar-menu-item.svelte'
	import SidebarProvider from './sidebar-provider.svelte'
	import SidebarTrigger from './sidebar-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Sidebar',
		component: SidebarRoot,
		parameters: { layout: 'fullscreen' },
	})

	const items: { title: string; url: string; icon: Component<{ class?: string }> }[] = [
		{ title: 'Home', url: '#', icon: Home },
		{ title: 'Inbox', url: '#', icon: Inbox },
		{ title: 'Calendar', url: '#', icon: Calendar },
		{ title: 'Search', url: '#', icon: Search },
		{ title: 'Settings', url: '#', icon: Settings },
	]
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function closeAndOpen({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const trigger = [...canvasElement.querySelectorAll('button')].find((b) =>
			b.textContent?.includes('Toggle Sidebar')
		)
		if (!(trigger instanceof HTMLElement)) throw new Error('the sidebar trigger is missing')
		trigger.click()
		const sidebar = canvasElement.ownerDocument.querySelector('[data-slot="sidebar"]')
		let collapsed = false
		for (let waited = 0; !collapsed && waited < 3000; waited += 30) {
			await sleep(30)
			collapsed = sidebar?.getAttribute('data-state') === 'collapsed'
		}
		if (!collapsed) throw new Error('clicking the trigger did not collapse the sidebar')
		trigger.click()
		for (let waited = 0; waited < 3000; waited += 30) {
			await sleep(30)
			if (sidebar?.getAttribute('data-state') === 'expanded') return
		}
		throw new Error('clicking the trigger did not reopen the sidebar')
	}
</script>

{#snippet shell(sidebar: Snippet)}
	<SidebarProvider>
		{@render sidebar()}
		<section class="m-4">
			<SidebarTrigger />
			<div class="size-full"></div>
		</section>
	</SidebarProvider>
{/snippet}

{#snippet simple()}
	<SidebarRoot collapsible="icon">
		<SidebarHeader />
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Application</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{#each items as item (item.title)}
							<SidebarMenuItem>
								<SidebarMenuButton>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon class="lucide" />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</SidebarMenuButton>
							</SidebarMenuItem>
						{/each}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
		<SidebarFooter />
	</SidebarRoot>
{/snippet}

<Story name="Simple" asChild>
	{@render shell(simple)}
</Story>

{#snippet footer()}
	<SidebarRoot collapsible="icon">
		<SidebarHeader />
		<SidebarContent />
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenuRoot>
						<DropdownMenuTrigger>
							{#snippet child({ props })}
								<SidebarMenuButton {...props}>
									<User2 class="lucide" />
									Username
									<ChevronUp class="lucide ml-auto" />
								</SidebarMenuButton>
							{/snippet}
						</DropdownMenuTrigger>
						<DropdownMenuContent side="top" class="w-(--anchor-width)">
							<DropdownMenuItem>
								<span>Account</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Billing</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenuRoot>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	</SidebarRoot>
{/snippet}

<Story name="Footer" asChild>
	{@render shell(footer)}
</Story>

<Story
	name="Should Close Open"
	tags={['!dev', '!autodocs']}
	play={closeAndOpen}
	asChild
>
	{@render shell(simple)}
</Story>
