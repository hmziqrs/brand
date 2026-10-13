<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppWindow from '@lucide/svelte/icons/app-window'
	import BookOpen from '@lucide/svelte/icons/book-open'
	import Copy from '@lucide/svelte/icons/copy'
	import ExternalLink from '@lucide/svelte/icons/external-link'
	import History from '@lucide/svelte/icons/history'
	import Link from '@lucide/svelte/icons/link'
	import Newspaper from '@lucide/svelte/icons/newspaper'
	import Package from '@lucide/svelte/icons/package'
	import Search from '@lucide/svelte/icons/search'
	import Sun from '@lucide/svelte/icons/sun'
	import SunMoon from '@lucide/svelte/icons/sun-moon'
	import CommandPalette, { type PaletteGroup } from './command-palette.svelte'
	import ShaderMaterial from './shader-material.svelte'
	import Mark from './mark.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { Kbd } from '$brand/ui/kbd/index.js'

	const { Story } = defineMeta({
		title: 'Custom/Command palette',
		component: CommandPalette,
		parameters: { layout: 'fullscreen' },
	})

	const project = [
		{ label: 'Open on GitHub', icon: ExternalLink, shortcut: ['⌘', 'O'] },
		{ label: 'Copy link', icon: Link, shortcut: ['⌘', 'L'] },
		{ label: 'Copy install command', icon: Copy, shortcut: ['⌘', '⇧', 'C'] },
	]
	const page = [
		{ label: 'Open in a new tab', icon: ExternalLink },
		{ label: 'Copy link', icon: Link, shortcut: ['⌘', 'L'] },
	]

	const groups: PaletteGroup[] = [
		{
			heading: 'Projects',
			items: [
				{ id: 'tunnel', title: 'tunnel', subtitle: 'A public link for anything on your computer', kind: 'Project', icon: Link, actions: project },
				{ id: 'oxiwake', title: 'oxiwake', subtitle: 'Keep your computer awake', kind: 'Project', icon: Sun, actions: project },
				{ id: 'gpui-query', title: 'gpui-query', subtitle: 'Data loading for GPUI', kind: 'Project', icon: Package, actions: project },
				{ id: 'gpui-starter', title: 'gpui-starter', subtitle: 'Desktop app starter', kind: 'Project', icon: AppWindow, actions: project },
			],
		},
		{
			heading: 'Pages',
			items: [
				{ id: 'docs', title: 'Docs', subtitle: 'Installation, guides and API', kind: 'Page', icon: BookOpen, actions: page },
				{ id: 'blog', title: 'Blog', subtitle: 'Writing about the tools', kind: 'Page', icon: Newspaper, actions: page },
				{ id: 'changelog', title: 'Changelog', subtitle: 'Every release, newest first', kind: 'Page', icon: History, actions: page },
			],
		},
		{
			heading: 'Commands',
			items: [
				{ id: 'theme', title: 'Switch light and dark', kind: 'Command', icon: SunMoon, shortcut: ['⌘', 'D'], primary: 'Switch' },
				{ id: 'search-docs', title: 'Search the docs', kind: 'Command', icon: Search, primary: 'Search' },
				{ id: 'copy-install', title: 'Copy the tunnel install command', subtitle: 'cargo binstall freeoxide-tunnel', kind: 'Command', icon: Copy, primary: 'Copy' },
			],
		},
	]
</script>

<script lang="ts">
	let open = $state(false)
</script>

{#snippet context()}<Mark symbol="Fx" size={18} /><span>freeoxide</span>{/snippet}

<!-- In the page, over a material: type to filter, arrows to move, Enter to run, ⌘K for the highlighted result's actions. -->
<Story name="Inline" asChild>
	<div class="relative isolate grid min-h-[40rem] place-items-start justify-center overflow-hidden px-4 pt-16">
		<ShaderMaterial rendering="image" preset="etched-silk" controls={false} class="absolute inset-0 -z-10" />
		<CommandPalette {groups} modal={false} {context} class="w-[min(42rem,calc(100vw-2rem))]" />
	</div>
</Story>

<!-- As a dialog: press ⌘K (Ctrl+K) anywhere, or the button. -->
<Story name="Dialog" asChild>
	<div class="grid min-h-[36rem] place-items-center">
		<Button variant="outline" onclick={() => (open = true)} class="gap-3 text-muted-foreground">Search<span class="flex gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></span></Button>
		<CommandPalette {groups} bind:open {context} />
	</div>
</Story>
