<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BlogLayout from './blog-layout.svelte'

	const { Story } = defineMeta({
		title: 'Content/Blog/Layout',
		component: BlogLayout,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!--
	The blog's shell (the lab's BlogShell): the wordmark with "by hmziq", the
	posts nav, a Subscribe button and the reading rhythm. The lab's finished
	post page is the full picture; this is the shell it wears.
-->
<Story name="Default" asChild>
	<BlogLayout current="Posts">
		{#snippet children()}
			<div class="mx-auto w-full max-w-[46rem] px-6 py-16">
				<h1 class="text-[2.2rem] leading-[1.05] font-medium tracking-[-0.035em]">Vibe coding my blog in Astro, deployed on Cloudflare</h1>
				<p class="mt-4 text-lg leading-relaxed text-muted-foreground">Third attempt at a blog. Finally got this one built.</p>
			</div>
		{/snippet}
	</BlogLayout>
</Story>
