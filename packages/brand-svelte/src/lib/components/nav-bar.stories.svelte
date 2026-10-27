<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { siGithub } from 'simple-icons'
	import AppWindow from '@lucide/svelte/icons/app-window'
	import Link from '@lucide/svelte/icons/link'
	import Package from '@lucide/svelte/icons/package'
	import Sun from '@lucide/svelte/icons/sun'
	import NavBar, { type NavLink } from './nav-bar.svelte'
	import ThemeToggle from './theme-toggle.svelte'
	import BrandIcon from './brand-icon.svelte'
	import ShaderMaterial from './shader-material.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Nav bar',
		component: NavBar,
		parameters: { layout: 'fullscreen' },
	})

	const links: NavLink[] = [
		{
			label: 'Projects',
			menu: [
				{ label: 'gpui-query', body: 'Data loading for GPUI', href: '#', icon: Package },
				{ label: 'gpui-starter', body: 'Desktop app starter', href: '#', icon: AppWindow },
				{ label: 'tunnel', body: 'A public link for anything on your computer', href: '#', icon: Link },
				{ label: 'oxiwake', body: 'Keep your computer awake', href: '#', icon: Sun },
			],
		},
		{ label: 'How I work', href: '#' },
		{ label: 'Writing', href: '#' },
		{ label: 'About', href: '#', current: true },
	]
</script>

{#snippet extra()}
	<a href="https://github.com/freeoxide" aria-label="GitHub" class="hidden size-9 place-items-center rounded-md text-muted-foreground hover:text-foreground sm:grid"><BrandIcon icon={siGithub} class="size-4" /></a>
	<ThemeToggle />
{/snippet}

{#snippet page()}
	<div class="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16"><h1 class="max-w-xl text-5xl leading-[1.02] font-medium tracking-[-0.035em]">Free Rust tools, finished before they ship.</h1><p class="max-w-lg text-lg text-muted-foreground">Open-source software made by one person.</p></div>
{/snippet}

<Story name="Bar" asChild>
	<div class="min-h-[28rem]"><NavBar site="freeoxide" maker="by hmziq" {links} cta={{ label: 'Browse projects', href: '#' }} {extra} />{@render page()}</div>
</Story>

<Story name="Floating" asChild>
	<div class="relative isolate min-h-[28rem] overflow-hidden">
		<ShaderMaterial rendering="image" preset="etched-silk" controls={false} class="absolute inset-0 -z-10 opacity-60" transparent />
		<NavBar variant="floating" site="freeoxide" {links} cta={{ label: 'Browse', href: '#' }} secondary={{ label: 'Contact', href: '#' }} />
		{@render page()}
	</div>
</Story>

<Story name="Centered" asChild>
	<div class="min-h-[28rem]"><NavBar variant="centered" site="freeoxide" {links} cta={{ label: 'Browse', href: '#' }} />{@render page()}</div>
</Story>
