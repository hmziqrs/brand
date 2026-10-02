<script lang="ts">
	// A docs page: the menu built from the whole collection, the page's title
	// and trail, its Markdown body, and the previous and next pages as cards
	// (the lab's gpui-query docs page). The words are example copy.
	import Pencil from '@lucide/svelte/icons/pencil';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import DocsLayout from '$brand/blocks/content/docs-layout.svelte';
	import DocsTitle from '$brand/blocks/content/docs-title.svelte';
	import DocsPager from '$brand/blocks/content/docs-pager.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { headingsOf } from '$lib/content';

	let { data } = $props();

	const { entry } = $derived(data);
	const toc = $derived(headingsOf(entry.body));
	const trail = $derived(['Docs', ...(entry.metadata.section ? [entry.metadata.section] : [])]);
	const url = $derived(`https://example.com/docs/${entry.slug}`);
</script>

<DocsLayout site="example" menu={data.menu} page={entry.metadata.title} {toc}>
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title={`${entry.metadata.title} — svelte-app docs`}
			description={entry.metadata.lede ?? 'Example docs page.'}
			{url}
		/>

		<DocsTitle title={entry.metadata.title} lede={entry.metadata.lede} {trail} seed="example" />

		<Prose class="mt-9">
			{#snippet children()}
				<entry.Content />
			{/snippet}
		</Prose>

		<p class="mt-12 text-[0.8125rem]">
			<a href="https://github.com" class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
				<Pencil class="lucide size-3.5" />
				Edit this page on GitHub
			</a>
		</p>

		<DocsPager prev={data.prev} next={data.next} class="mt-8" />
	{/snippet}
</DocsLayout>
