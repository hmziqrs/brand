<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import NavBar, { type NavLink } from './nav-bar.svelte'
	import ThemeToggle from './theme-toggle.svelte'
	import ShaderMaterial from './shader-material.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Nav bar',
		component: NavBar,
		parameters: { layout: 'fullscreen' },
	})

	const plain: NavLink[] = [
		{ label: 'Projects', href: '#' },
		{ label: 'How I work', href: '#' },
		{ label: 'Writing', href: '#' },
		{ label: 'About', href: '#', current: true },
	]

	const links: NavLink[] = [
		{
			label: 'Guide',
			children: [
				{ label: 'Quickstart', href: '#', description: 'Your first cached query in five minutes.' },
				{ label: 'Queries', href: '#', description: 'Typed keys, stale times, background refetch.' },
				{ label: 'Mutations', href: '#', description: 'Optimistic writes that roll back on error.' },
				{ label: 'Devtools', href: '#', description: 'Watch the cache live while the app runs.' },
			],
		},
		{
			label: 'Resources',
			children: [
				{ label: 'Examples', href: '#', description: 'Small apps that use one feature each.' },
				{ label: 'Recipes', href: '#', description: 'Pagination, polling and offline, step by step.' },
				{ label: 'Migration', href: '#', description: 'Moving over from hand-rolled caches.' },
			],
		},
		{ label: 'Changelog', href: '#' },
	]

	const announcement = { text: 'gpui-query 0.3 tries again on its own when the network drops', href: '#', preset: 'copper-sweep' }
	const github = 'https://github.com/hmziqrs'
</script>

{#snippet extra()}
	<ThemeToggle />
{/snippet}

{#snippet page()}
	<div class="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16"><h1 class="max-w-xl text-5xl leading-[1.02] font-medium tracking-[-0.035em]">Data loading that stays out of the way.</h1><p class="max-w-lg text-lg text-muted-foreground">Open-source software made by one person.</p></div>
{/snippet}

<Story name="Plain" asChild>
	<div class="min-h-[28rem]"><NavBar site="freeoxide" maker="by hmziq" links={plain} cta={{ label: 'Browse projects', href: '#' }} {github} {extra} />{@render page()}</div>
</Story>

<Story name="With dropdowns" asChild>
	<div class="min-h-[28rem]"><NavBar site="gpui-query" maker="by hmziq" {links} cta={{ label: 'Get started', href: '#' }} {github} />{@render page()}</div>
</Story>

<Story name="With announcement" asChild>
	<div class="min-h-[28rem]"><NavBar site="gpui-query" maker="by hmziq" {links} cta={{ label: 'Get started', href: '#' }} {github} {announcement} announcementKey="hmziq-announce-story" />{@render page()}</div>
</Story>

<Story name="Mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="min-h-[28rem]"><NavBar site="gpui-query" maker="by hmziq" {links} cta={{ label: 'Get started', href: '#' }} {github} {announcement} announcementKey="hmziq-announce-story" />{@render page()}</div>
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
