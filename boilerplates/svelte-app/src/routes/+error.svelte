<script lang="ts">
	// The 404, with the lab's not-found design: the words, and rings drawn from
	// "not found" beside them (apps/lab/src/sites/claude-multi/not-found). The
	// same block covers a page that failed to draw, with its status and words.
	import { page } from '$app/state';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import NotFound from '$brand/blocks/content/not-found.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';

	const notFound = $derived(page.status === 404);
</script>

<SiteShell site="example" layout="page" mainClassName="pb-24">
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title={notFound ? 'Page not found — svelte-app' : 'Something went wrong — svelte-app'}
			description={notFound ? "This URL doesn't point to anything." : 'An error happened while drawing this page.'}
			url={`https://example.com${page.url.pathname}`}
		/>
		<NotFound
			status={String(page.status)}
			title={notFound ? 'Page not found' : 'Something went wrong'}
			lede={notFound
				? "This URL doesn't point to anything. The page probably moved, or the link was wrong."
				: 'An error happened while drawing this page. Trying again usually fixes it.'}
		>
			{#snippet children()}
				<ButtonLink href="/" size="lg" class="px-5">Back to home</ButtonLink>
				<ButtonLink href="/docs/introduction" size="lg" variant="outline" class="px-5">Read the docs</ButtonLink>
			{/snippet}
		</NotFound>
	{/snippet}
</SiteShell>
