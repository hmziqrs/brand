<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import NavBar from '$brand/components/nav-bar.svelte';
	import HeatFooter from '$brand/blocks/sections/heat-footer.svelte';
	import ThemeToggle from '#lib/theme-toggle.svelte';
	import { announcement, footerColumns, footerSocials, navLinks, site } from '#lib/example.js';

	let { children }: { children: Snippet } = $props();

	const links = $derived(
		navLinks.map((l) => ({ ...l, current: !!l.href && (page.url.pathname === l.href || page.url.pathname.startsWith(`${l.href}/`)) }))
	);
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<NavBar
		site={site.name}
		maker={site.maker}
		{links}
		cta={{ label: 'Get started', href: '/docs/installation' }}
		github="https://github.com"
		{announcement}
		size="wide"
		sticky
	>
		{#snippet extra()}<ThemeToggle />{/snippet}
	</NavBar>
	<main class="flex-1">{@render children()}</main>
	<HeatFooter
		site={site.name}
		maker={site.maker}
		tagline="Example tagline: one sentence on what the project does. Replace it with your own."
		columns={footerColumns}
		command={site.install}
		status={{ label: 'Latest release 0.4.0', href: '/changelog' }}
		socials={footerSocials}
		legal="© 2026 example · MIT licensed"
		aside="Example footer"
	/>
</div>
