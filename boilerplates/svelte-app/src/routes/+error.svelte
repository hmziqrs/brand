<script lang="ts">
	// The error page: the kit's NotFoundPage for a 404, and the same page
	// with the status and words of the error for anything else.
	import { page } from '$app/state';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import NotFoundPage from '$brand/blocks/content/not-found-page.svelte';
	import SiteFrame from '#lib/site-frame.svelte';
	import { notFoundData } from '#lib/example.js';

	const missing = $derived(page.status === 404);
	const data = $derived(
		missing
			? notFoundData
			: {
					...notFoundData,
					status: String(page.status),
					title: 'Something went wrong',
					lede: 'An error happened while drawing this page. Trying again usually fixes it.'
				}
	);
</script>

<SiteHead
	site="freeoxide"
	title={missing ? 'Page not found — svelte-app' : 'Something went wrong — svelte-app'}
	description={missing ? "This URL doesn't point to anything." : 'An error happened while drawing this page.'}
	url={`https://example.com${page.url.pathname}`}
/>

<SiteFrame><NotFoundPage {data} /></SiteFrame>
