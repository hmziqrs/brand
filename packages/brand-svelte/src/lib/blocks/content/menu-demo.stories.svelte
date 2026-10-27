<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MenuDemo from './menu-demo.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Menu demo', component: MenuDemo })
</script>

<script lang="ts">
	import { addInstance, listed, menu, settingsJson } from './stories-data.js'

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	const listbox = (root: ParentNode) => root.querySelector('[role="listbox"]')
	const press = (el: Element, key: string) => el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))

	function withMotionPref(matches: boolean, run: () => void) {
		const real = window.matchMedia
		window.matchMedia = (() => ({ matches })) as unknown as typeof window.matchMedia
		try {
			run()
		} finally {
			window.matchMedia = real
		}
	}

	async function openListedByKeyboard({ canvasElement }: { canvasElement: HTMLElement }) {
		const ul = listbox(canvasElement)
		if (!(ul instanceof HTMLElement)) throw new Error('the menu listbox is missing')
		ul.focus()
		press(ul, 'ArrowDown')
		press(ul, 'Enter')
		if (ul.getAttribute('aria-activedescendant') !== 'menu-1') throw new Error('ArrowDown did not move the selection')
		if (!canvasElement.textContent?.includes('list all instances')) throw new Error('Enter did not open the moved-to item')
	}

	function reducedMotionShowsSetup({ canvasElement }: { canvasElement: HTMLElement }) {
		const ul = listbox(canvasElement)
		if (!(ul instanceof HTMLElement)) throw new Error('the menu listbox is missing')
		withMotionPref(true, () => press(ul, 'Enter'))
		if (canvasElement.querySelector('.invisible')) throw new Error('reduced motion still hides the setup lines')
	}

	async function timedReveal({ canvasElement }: { canvasElement: HTMLElement }) {
		const ul = listbox(canvasElement)
		if (!(ul instanceof HTMLElement)) throw new Error('the menu listbox is missing')
		withMotionPref(false, () => press(ul, 'Enter'))
		if (!canvasElement.querySelector('.invisible')) throw new Error('the setup lines were not hidden for the reveal')
		for (let waited = 0; canvasElement.querySelector('.invisible') && waited < 3000; waited += 30) await sleep(30)
		if (canvasElement.querySelector('.invisible')) throw new Error('the timed reveal did not finish')
	}
</script>

<Story name="Default" asChild>
	<div class="max-w-5xl px-6">
		<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
	</div>
</Story>

<Story name="Keyboard" play={openListedByKeyboard} asChild>
	<div class="max-w-5xl px-6">
		<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
	</div>
</Story>

<Story name="Reduced motion" play={reducedMotionShowsSetup} asChild>
	<div class="max-w-5xl px-6">
		<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
	</div>
</Story>

<Story name="Timed reveal" play={timedReveal} asChild>
	<div class="max-w-5xl px-6">
		<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
	</div>
</Story>
