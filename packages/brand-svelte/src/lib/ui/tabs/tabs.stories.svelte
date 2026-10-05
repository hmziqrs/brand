<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Tabs from './tabs.svelte'
	import TabsContent from './tabs-content.svelte'
	import TabsList from './tabs-list.svelte'
	import TabsTrigger from './tabs-trigger.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Tabs',
		component: Tabs,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function changeTabs({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const tabs = [...canvasElement.querySelectorAll<HTMLElement>('[role="tab"]')]
		if (tabs.length !== 2) throw new Error(`expected 2 tabs, found ${tabs.length}`)
		for (const tab of tabs) {
			tab.click()
			await sleep(50)
			if (tab.getAttribute('aria-selected') !== 'true') {
				throw new Error(`the '${tab.innerText}' tab was not selected by its click`)
			}
			const panel = canvasElement.querySelector(`[role="tabpanel"]:not([hidden])`)
			if (!panel?.textContent?.trim()) throw new Error('the selected tab shows no panel content')
			for (const other of tabs) {
				if (other === tab) continue
				if (other.getAttribute('aria-selected') !== 'false') {
					throw new Error(`the '${other.innerText}' tab stayed selected`)
				}
			}
		}
	}
</script>

<Story name="Default" asChild>
	<Tabs value="account" class="w-96">
		<TabsList class="grid grid-cols-2">
			<TabsTrigger value="account">Account</TabsTrigger>
			<TabsTrigger value="password">Password</TabsTrigger>
		</TabsList>
		<TabsContent value="account">
			Make changes to your account here.
		</TabsContent>
		<TabsContent value="password">Change your password here.</TabsContent>
	</Tabs>
</Story>

<Story
	name="should change the content when clicking a tab"
	tags={['!dev', '!autodocs']}
	play={changeTabs}
	asChild
>
	<Tabs value="account" class="w-96">
		<TabsList class="grid grid-cols-2">
			<TabsTrigger value="account">Account</TabsTrigger>
			<TabsTrigger value="password">Password</TabsTrigger>
		</TabsList>
		<TabsContent value="account">
			Make changes to your account here.
		</TabsContent>
		<TabsContent value="password">Change your password here.</TabsContent>
	</Tabs>
</Story>
