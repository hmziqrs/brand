<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ContextMenu from './context-menu.svelte'
	import ContextMenuCheckboxItem from './context-menu-checkbox-item.svelte'
	import ContextMenuContent from './context-menu-content.svelte'
	import ContextMenuItem from './context-menu-item.svelte'
	import ContextMenuLabel from './context-menu-label.svelte'
	import ContextMenuRadioGroup from './context-menu-radio-group.svelte'
	import ContextMenuRadioItem from './context-menu-radio-item.svelte'
	import ContextMenuSeparator from './context-menu-separator.svelte'
	import ContextMenuShortcut from './context-menu-shortcut.svelte'
	import ContextMenuSub from './context-menu-sub.svelte'
	import ContextMenuSubContent from './context-menu-sub-content.svelte'
	import ContextMenuSubTrigger from './context-menu-sub-trigger.svelte'
	import ContextMenuTrigger from './context-menu-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/ContextMenu',
		component: ContextMenu,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let showComments = $state(true)
	let showPreview = $state(false)
	let theme = $state('light')

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function rightClickAndInteract({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = canvasElement.querySelector('[data-slot="context-menu-trigger"]')
		if (!(trigger instanceof HTMLElement)) throw new Error('the context menu trigger is missing')
		trigger.dispatchEvent(
			new MouseEvent('contextmenu', { bubbles: true, cancelable: true, button: 2 })
		)
		let content: Element | null = null
		for (let waited = 0; !content && waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="context-menu-content"]')
		}
		if (!content) throw new Error('right-clicking the trigger did not open the context menu')
		const items = [...doc.querySelectorAll('[role="menuitem"]')]
		if (items.length !== 4) throw new Error(`expected 4 menu items, found ${items.length}`)
		if (!(items[0] instanceof HTMLElement)) throw new Error('the first menu item is not clickable')
		items[0].click()
		await sleep(100)
	}
</script>

{#snippet area()}
	<ContextMenuTrigger
		class="flex h-48 w-96 items-center justify-center rounded-md border border-dashed bg-accent text-sm"
	>
		Right click here
	</ContextMenuTrigger>
{/snippet}

<Story name="Default" asChild>
	<ContextMenu>
		{@render area()}
		<ContextMenuContent class="w-32">
			<ContextMenuItem>Profile</ContextMenuItem>
			<ContextMenuItem>Billing</ContextMenuItem>
			<ContextMenuItem>Team</ContextMenuItem>
			<ContextMenuItem>Subscription</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
</Story>

<Story name="WithShortcuts" asChild>
	<ContextMenu>
		{@render area()}
		<ContextMenuContent class="w-32">
			<ContextMenuItem>
				Back
				<ContextMenuShortcut>⌘[</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem disabled>
				Forward
				<ContextMenuShortcut>⌘]</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem>
				Reload
				<ContextMenuShortcut>⌘R</ContextMenuShortcut>
			</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
</Story>

<Story name="WithSubmenu" asChild>
	<ContextMenu>
		{@render area()}
		<ContextMenuContent class="w-32">
			<ContextMenuItem>
				New Tab
				<ContextMenuShortcut>⌘N</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuSub>
				<ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
				<ContextMenuSubContent>
					<ContextMenuItem>
						Save Page As...
						<ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>Create Shortcut...</ContextMenuItem>
					<ContextMenuItem>Name Window...</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem>Developer Tools</ContextMenuItem>
				</ContextMenuSubContent>
			</ContextMenuSub>
		</ContextMenuContent>
	</ContextMenu>
</Story>

<Story name="WithCheckboxes" asChild>
	<ContextMenu>
		{@render area()}
		<ContextMenuContent class="w-64">
			<ContextMenuCheckboxItem bind:checked={showComments}>
				Show Comments
				<ContextMenuShortcut>⌘⇧C</ContextMenuShortcut>
			</ContextMenuCheckboxItem>
			<ContextMenuCheckboxItem bind:checked={showPreview}>Show Preview</ContextMenuCheckboxItem>
		</ContextMenuContent>
	</ContextMenu>
</Story>

<Story name="WithRadioGroup" asChild>
	<ContextMenu>
		{@render area()}
		<ContextMenuContent class="w-64">
			<ContextMenuRadioGroup bind:value={theme}>
				<ContextMenuLabel inset>Theme</ContextMenuLabel>
				<ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
				<ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
			</ContextMenuRadioGroup>
		</ContextMenuContent>
	</ContextMenu>
</Story>

<Story
	name="when right-clicking the trigger area, the menu appears and can be interacted with"
	tags={['!dev', '!autodocs']}
	play={rightClickAndInteract}
	asChild
>
	<ContextMenu>
		{@render area()}
		<ContextMenuContent class="w-32">
			<ContextMenuItem>Profile</ContextMenuItem>
			<ContextMenuItem>Billing</ContextMenuItem>
			<ContextMenuItem>Team</ContextMenuItem>
			<ContextMenuItem>Subscription</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
</Story>
