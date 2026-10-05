<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SiteShell from './site-shell.svelte'

	const { Story } = defineMeta({
		title: 'Site/Site shell',
		component: SiteShell,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!--
	The header, the page's column rhythm and the footer that links the whole
	family together. The lab's finished sites are the full pictures; this is
	the shell they all share.
-->
<Story name="Landing" asChild>
	<SiteShell site="freeoxide" nav={['Projects', 'Writing', 'About']} current="Projects" cta={{ label: 'View on GitHub' }}>
		{#snippet children()}
			<section class="mx-auto w-full max-w-5xl px-6">
				<h1 class="text-4xl font-medium tracking-[-0.035em]">Free Rust tools, finished before they ship.</h1>
				<p class="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">
					Open-source software made by one person, tested properly and given away.
				</p>
			</section>
		{/snippet}
	</SiteShell>
</Story>

<!-- "page" for inner pages: less space between sections than a landing page. -->
<Story name="Inner page" asChild>
	<SiteShell site="blog" nav={['Posts', 'Topics', 'About']} current="About" layout="page">
		{#snippet children()}
			<section class="mx-auto w-full max-w-[46rem] px-6">
				<h1 class="text-[2.4rem] font-medium tracking-[-0.035em]">About</h1>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">One person, writing about what gets built.</p>
			</section>
		{/snippet}
	</SiteShell>
</Story>

<!-- With the link columns, a wider header for docs, and a different signature. -->
<Story name="With footer links" asChild>
	<SiteShell
		site="gpui-query"
		maker="by freeoxide"
		nav={['Docs', 'API', 'Releases']}
		current="Docs"
		wide
		footerLinks={[
			{ title: 'Project', links: ['Docs', 'Releases', 'GitHub'] },
			{ title: 'About', links: ['freeoxide', 'Writing'] },
		]}
	>
		{#snippet children()}
			<section class="mx-auto w-full max-w-[82rem] px-6">
				<h1 class="text-4xl font-medium tracking-[-0.035em]">Data loading for GPUI</h1>
			</section>
		{/snippet}
	</SiteShell>
</Story>
