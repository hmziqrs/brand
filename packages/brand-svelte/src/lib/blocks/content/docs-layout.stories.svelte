<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsLayout from './docs-layout.svelte'

	const { Story } = defineMeta({
		title: 'Content/Docs layout',
		component: DocsLayout,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import { slug } from '@hmziq/brand-core/scroll-spy'
	import DocsTitle from './docs-title.svelte'
	import Prose from '$brand/blocks/site/prose.svelte'
	import { docsHeadings, docsMenu } from './stories-data.js'

	const toc = docsHeadings.map((h) => ({ id: slug(h), label: h }))
</script>

<!--
	The docs' shell (the lab's gpui-query docs page): the line menu on the
	left, the page in the middle, "On this page" sticky on the right, the
	search in the header and a menu button below md.
-->
<Story name="Default" asChild>
	<DocsLayout site="gpui-query" menu={docsMenu} page="Installation" toc={toc}>
		{#snippet children()}
			<DocsTitle title="Installation" lede="Install gpui-query in a Rust GPUI app: add the crate, register the global QueryClient, and verify your setup with a first query." trail={["Docs", "Getting Started"]} seed="gpui-query" />
			<Prose class="mt-9">
				{#each toc as item (item.id)}
					<h2 id={item.id}>{item.label}</h2>
					<p>
						gpui-query is a Cargo crate. This page covers adding it to a GPUI project, choosing the right feature flags, and installing a QueryClient as a GPUI
						Global so the hooks can share a single cache.
					</p>
				{/each}
			</Prose>
		{/snippet}
	</DocsLayout>
</Story>
