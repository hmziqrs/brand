<script lang="ts">
	// The blog index: a plain top, search and topics, then the posts (the
	// lab's claude-multi blog). The words and the posts are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import PostList from '$brand/blocks/content/post-list.svelte';
	import NewsletterBand from '$brand/blocks/content/newsletter-band.svelte';
	import BlogLayout from '$brand/blocks/content/blog-layout.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { page } from '$app/state';
	import { topicTone, topics } from '$lib/example';

	let { data } = $props();

	// The newsletter band posts to the page's subscribe action
	// (content-blocks.md: "Its form posts to the page's own action; no
	// mailing service is built in"): an email in the field comes back to a
	// band that says thanks, an empty one comes back to the page as it was.
	// A real site swaps the action for whatever runs its list.
	const subscribed = $derived(page.url.searchParams.has('subscribed'));

	// The blog index's filter: the search box and the topic chips narrow the
	// post list live, the way the lab's blog index does in React.
	let topic = $state('All');
	let query = $state('');
	const q = $derived(query.trim().toLowerCase());
	const list = $derived(
		data.posts.filter(
			(post) =>
				(topic === 'All' || post.metadata.topic === topic) &&
				(!q || `${post.metadata.title} ${post.metadata.summary ?? ''}`.toLowerCase().includes(q))
		)
	);
</script>

<BlogLayout current="Posts">
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="blog"
			title="Blog — svelte-app"
			description="Example posts, written in Markdown through the kit's blocks."
			url="https://example.com/blog"
		/>

		<Container>
			<PageIntro class="max-w-2xl">
				{#snippet title()}Writing about the example{/snippet}
				{#snippet lede()}Build notes, deep dives, and the occasional rant. New posts whenever there's something worth saying. Example copy.{/snippet}
			</PageIntro>
		</Container>

		<Container>
			<div class="mb-7 flex flex-wrap items-center gap-3">
				<SearchBox label="Search posts" class="w-auto min-w-64" bind:value={query} onChange={(v) => (query = v)} />
				<TopicChips items={topics} bind:value={topic} onChange={(t) => (topic = t)} tone={(t) => (t === 'All' ? undefined : topicTone(t))} />
			</div>
			<PostList
				posts={list.map((p) => ({
					title: p.metadata.title,
					summary: p.metadata.summary,
					date: p.metadata.date,
					readingTime: p.metadata.readingTime,
					updated: p.metadata.updated,
					topic: p.metadata.topic,
					href: p.href
				}))}
				tone={topicTone}
			/>
		</Container>

		<NewsletterBand
			action="?/subscribe"
			title={subscribed ? "You're on the list" : undefined}
			body={subscribed ? 'Thanks — the next post lands in your inbox. Example copy; no list is wired up in the starter.' : undefined}
		/>
	{/snippet}
</BlogLayout>
