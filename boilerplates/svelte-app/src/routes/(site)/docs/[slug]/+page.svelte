<script lang="ts">
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import DocsReference from '$brand/blocks/content/docs-reference.svelte';

	let { data } = $props();

	const page = $derived(data.site.pages[data.site.start]);
</script>

<SiteHead
	site="freeoxide"
	title={`${page.title} — svelte-app docs`}
	description={page.desc ?? 'Example docs page.'}
	url={`https://example.com/docs/${page.key}`}
/>

{#key data.site.start}
	<DocsReference site={data.site} here="/docs" prefix="docs" offset={64} />
{/key}
