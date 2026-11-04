<script lang="ts">
	// The docs: every page of src/content/docs in DocsReference's three
	// columns, the menu and search on the left, the page in the middle and
	// "On this page" on the right. The words are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import DocsReference from '$brand/blocks/content/docs-reference.svelte';

	let { data } = $props();
</script>

<SiteHead site="freeoxide" title="Docs — svelte-app" description="Example docs, written in Markdown through the kit's blocks." url="https://example.com/docs" />

<DocsReference site={data.site} here="/docs" prefix="docs" offset={64} />
