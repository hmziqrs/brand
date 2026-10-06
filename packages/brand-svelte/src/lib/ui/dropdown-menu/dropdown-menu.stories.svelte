<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Mail from '@lucide/svelte/icons/mail'
	import Plus from '@lucide/svelte/icons/plus'
	import PlusCircle from '@lucide/svelte/icons/plus-circle'
	import Search from '@lucide/svelte/icons/search'
	import UserPlus from '@lucide/svelte/icons/user-plus'
	import DropdownMenuRoot from './dropdown-menu.svelte'
	import DropdownMenuCheckboxItem from './dropdown-menu-checkbox-item.svelte'
	import DropdownMenuContent from './dropdown-menu-content.svelte'
	import DropdownMenuGroup from './dropdown-menu-group.svelte'
	import DropdownMenuItem from './dropdown-menu-item.svelte'
	import DropdownMenuLabel from './dropdown-menu-label.svelte'
	import DropdownMenuPortal from './dropdown-menu-portal.svelte'
	import DropdownMenuRadioGroup from './dropdown-menu-radio-group.svelte'
	import DropdownMenuRadioItem from './dropdown-menu-radio-item.svelte'
	import DropdownMenuSeparator from './dropdown-menu-separator.svelte'
	import DropdownMenuShortcut from './dropdown-menu-shortcut.svelte'
	import DropdownMenuSub from './dropdown-menu-sub.svelte'
	import DropdownMenuSubContent from './dropdown-menu-sub-content.svelte'
	import DropdownMenuSubTrigger from './dropdown-menu-sub-trigger.svelte'
	import DropdownMenuTrigger from './dropdown-menu-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/DropdownMenu',
		component: DropdownMenuRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	let autosave = $state(true)
	let showComments = $state(false)

	async function clickItemCloses({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = [...canvasElement.querySelectorAll('button')].find((b) =>
			b.textContent?.trim() === 'Open'
		)
		if (!(trigger instanceof HTMLElement)) throw new Error('the dropdown menu trigger is missing')
		trigger.click()
		let menu: Element | null = null
		for (let waited = 0; !menu && waited < 3000; waited += 30) {
			await sleep(30)
			menu = doc.querySelector('[role="menu"]')
		}
		if (!menu) throw new Error('clicking the trigger did not open the dropdown menu')
		const items = [...doc.querySelectorAll('[role="menuitem"]')] as HTMLElement[]
		if (items.length !== 4) throw new Error(`expected four menu items, found ${items.length}`)
		items[0].dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }))
		items[0].click()
		for (let waited = 0; doc.querySelector('[role="menu"]') && waited < 3000; waited += 30) {
			await sleep(30)
		}
		if (doc.querySelector('[role="menu"]')) {
			throw new Error('clicking the menu item did not close the dropdown menu')
		}
	}
</script>

{#snippet trigger()}
	<DropdownMenuTrigger>Open</DropdownMenuTrigger>
{/snippet}

{#snippet defaultMenu()}
	<DropdownMenuContent class="w-44">
		<DropdownMenuGroup>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Profile</DropdownMenuItem>
			<DropdownMenuItem>Billing</DropdownMenuItem>
			<DropdownMenuItem>Team</DropdownMenuItem>
			<DropdownMenuItem>Subscription</DropdownMenuItem>
		</DropdownMenuGroup>
	</DropdownMenuContent>
{/snippet}

<Story name="Default" asChild>
	<DropdownMenuRoot>
		{@render trigger()}
		{@render defaultMenu()}
	</DropdownMenuRoot>
</Story>

<Story name="With shortcuts" asChild>
	<DropdownMenuRoot>
		{@render trigger()}
		<DropdownMenuContent class="w-44">
			<DropdownMenuGroup>
				<DropdownMenuLabel>Controls</DropdownMenuLabel>
				<DropdownMenuItem>
					Back
					<DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					Forward
					<DropdownMenuShortcut>⌘]</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</Story>

<Story name="With submenus" asChild>
	<DropdownMenuRoot>
		{@render trigger()}
		<DropdownMenuContent class="w-44">
			<DropdownMenuItem>
				<Search class="lucide mr-2 size-4" />
				<span>Search</span>
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>
					<Plus class="lucide mr-2 size-4" />
					<span>New Team</span>
					<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<UserPlus class="lucide mr-2 size-4" />
						<span>Invite users</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<Mail class="lucide mr-2 size-4" />
								<span>Email</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<PlusCircle class="lucide mr-2 size-4" />
								<span>More...</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</Story>

<Story name="With radio items" asChild>
	<DropdownMenuRoot>
		{@render trigger()}
		<DropdownMenuContent class="w-44">
			<DropdownMenuGroup>
				<DropdownMenuLabel inset>Status</DropdownMenuLabel>
				<DropdownMenuRadioGroup value="warning">
					<DropdownMenuRadioItem value="info">Info</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="warning">Warning</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="error">Error</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</Story>

<Story name="With checkboxes" asChild>
	<DropdownMenuRoot>
		{@render trigger()}
		<DropdownMenuContent class="w-44">
			<DropdownMenuCheckboxItem bind:checked={autosave}>
				Autosave
				<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
			</DropdownMenuCheckboxItem>
			<DropdownMenuCheckboxItem bind:checked={showComments}>Show Comments</DropdownMenuCheckboxItem>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</Story>

<Story
	name="Should Open Close"
	tags={['!dev', '!autodocs']}
	play={clickItemCloses}
	asChild
>
	<DropdownMenuRoot>
		{@render trigger()}
		{@render defaultMenu()}
	</DropdownMenuRoot>
</Story>
