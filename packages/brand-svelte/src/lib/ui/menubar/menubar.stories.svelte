<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Menubar from './menubar.svelte'
	import MenubarCheckboxItem from './menubar-checkbox-item.svelte'
	import MenubarContent from './menubar-content.svelte'
	import MenubarGroup from './menubar-group.svelte'
	import MenubarItem from './menubar-item.svelte'
	import MenubarLabel from './menubar-label.svelte'
	import MenubarMenu from './menubar-menu.svelte'
	import MenubarRadioGroup from './menubar-radio-group.svelte'
	import MenubarRadioItem from './menubar-radio-item.svelte'
	import MenubarSeparator from './menubar-separator.svelte'
	import MenubarShortcut from './menubar-shortcut.svelte'
	import MenubarSub from './menubar-sub.svelte'
	import MenubarSubContent from './menubar-sub-content.svelte'
	import MenubarSubTrigger from './menubar-sub-trigger.svelte'
	import MenubarTrigger from './menubar-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Menubar',
		component: Menubar,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let device = $state('md')
	let unread = $state(true)
	let important = $state(true)
	let flagged = $state(false)

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function openAndClose({ canvasElement }: { canvasElement: HTMLElement }) {
		const doc = canvasElement.ownerDocument
		await sleep(50)
		const trigger = [...doc.querySelectorAll('[role="menuitem"]')].find((el) =>
			/file/i.test(el.textContent ?? '')
		)
		if (!(trigger instanceof HTMLElement)) throw new Error('the File menubar trigger is missing')
		trigger.click()
		let content: Element | null = null
		for (let waited = 0; !content && waited < 3000; waited += 30) {
			await sleep(30)
			content = doc.querySelector('[data-slot="menubar-content"]')
		}
		if (!content) throw new Error('clicking the File trigger did not open the menubar menu')
		const items = [...doc.querySelectorAll<HTMLElement>('[role="menuitem"]')]
		if (items.length !== 5) throw new Error(`expected 5 menu items, found ${items.length}`)
		items[0].click()
		await sleep(100)
	}
</script>

{#snippet fileMenu()}
	<MenubarMenu>
		<MenubarTrigger>File</MenubarTrigger>
		<MenubarContent>
			<MenubarItem>
				New Tab <MenubarShortcut>⌘T</MenubarShortcut>
			</MenubarItem>
			<MenubarItem>New Window</MenubarItem>
			<MenubarSeparator />
			<MenubarItem disabled>Share</MenubarItem>
			<MenubarSeparator />
			<MenubarItem>Print</MenubarItem>
		</MenubarContent>
	</MenubarMenu>
{/snippet}

<Story name="Default" asChild>
	<Menubar>
		{@render fileMenu()}
	</Menubar>
</Story>

<Story name="WithSubmenu" asChild>
	<Menubar>
		<MenubarMenu>
			<MenubarTrigger>Actions</MenubarTrigger>
			<MenubarContent>
				<MenubarItem>Download</MenubarItem>
				<MenubarSub>
					<MenubarSubTrigger>Share</MenubarSubTrigger>
					<MenubarSubContent>
						<MenubarItem>Email link</MenubarItem>
						<MenubarItem>Messages</MenubarItem>
						<MenubarItem>Notes</MenubarItem>
					</MenubarSubContent>
				</MenubarSub>
			</MenubarContent>
		</MenubarMenu>
	</Menubar>
</Story>

<Story name="WithRadioItems" asChild>
	<Menubar>
		<MenubarMenu>
			<MenubarTrigger>View</MenubarTrigger>
			<MenubarContent>
				<MenubarLabel inset>Device Size</MenubarLabel>
				<MenubarRadioGroup bind:value={device}>
					<MenubarRadioItem value="sm">Small</MenubarRadioItem>
					<MenubarRadioItem value="md">Medium</MenubarRadioItem>
					<MenubarRadioItem value="lg">Large</MenubarRadioItem>
				</MenubarRadioGroup>
			</MenubarContent>
		</MenubarMenu>
	</Menubar>
</Story>

<Story name="WithCheckboxItems" asChild>
	<Menubar>
		<MenubarMenu>
			<MenubarTrigger>Filters</MenubarTrigger>
			<MenubarContent>
				<MenubarItem>Show All</MenubarItem>
				<MenubarGroup>
					<MenubarCheckboxItem bind:checked={unread}>Unread</MenubarCheckboxItem>
					<MenubarCheckboxItem bind:checked={important}>Important</MenubarCheckboxItem>
					<MenubarCheckboxItem bind:checked={flagged}>Flagged</MenubarCheckboxItem>
				</MenubarGroup>
			</MenubarContent>
		</MenubarMenu>
	</Menubar>
</Story>

<Story
	name="when clicking an item, should close the menubar"
	tags={['!dev', '!autodocs']}
	play={openAndClose}
	asChild
>
	<Menubar>
		{@render fileMenu()}
	</Menubar>
</Story>
