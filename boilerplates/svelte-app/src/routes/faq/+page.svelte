<script lang="ts">
	// The FAQ: one numbered list, the topic on each question, and a search (the
	// lab's claude-multi FAQ). The words are example copy.
	import { siGithub } from 'simple-icons';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import FaqList from '$brand/blocks/content/faq-list.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import { Card } from '$brand/ui/card/index.js';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { faq } from '$lib/example';

	// The FAQ's search: narrow the questions live, the way the lab's FAQ page
	// does in React.
	let query = $state('');
	const q = $derived(query.trim().toLowerCase());
	const items = $derived(faq.filter(([, question, answer]) => !q || `${question} ${answer}`.toLowerCase().includes(q)));
</script>

<SiteShell site="example" maker="by hmziq" nav={['Docs', 'Blog', 'FAQ']} current="FAQ" layout="page">
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title="FAQ — svelte-app"
			description="Straight answers, all on one page. Example content."
			url="https://example.com/faq"
		/>

		<Container>
			<PageIntro>
				{#snippet kicker()}FAQ{/snippet}
				{#snippet title()}Frequently asked questions{/snippet}
				{#snippet lede()}Straight answers with links to the docs, all on one page. Example content.{/snippet}
				<div class="mt-2">
					<SearchBox label="Search questions" bind:value={query} onChange={(v) => (query = v)} />
				</div>
			</PageIntro>
		</Container>

		<Container>
			<FaqList items={items} />
		</Container>

		<Container>
			<Card class="flex-row flex-wrap items-center justify-between gap-6 bg-transparent px-6 shadow-none sm:px-10 sm:py-10">
				{#snippet children()}
					<div>
						<h2 class="text-2xl font-medium tracking-[-0.02em]">Still have questions?</h2>
						<p class="mt-1.5 text-muted-foreground">Open an issue on GitHub. It's the fastest channel and it leaves a public record. Example copy.</p>
					</div>
					<div class="flex flex-wrap gap-3">
						<ButtonLink href="https://github.com" size="lg" class="px-5">
							<BrandIcon icon={siGithub} data-icon="inline-start" />
							Open an issue
						</ButtonLink>
						<ButtonLink href="/docs/introduction" size="lg" variant="outline" class="px-5">Read the docs</ButtonLink>
					</div>
				{/snippet}
			</Card>
		</Container>
	{/snippet}
</SiteShell>
