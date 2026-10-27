<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CardCarousel from './card-carousel.svelte'
	import FeatureCarousel from './feature-carousel.svelte'
	import MaterialCard from './material-card.svelte'
	import MaterialStage from './material-stage.svelte'
	import StatusRing from './status-ring.svelte'
	import QuoteCard from '$brand/blocks/saas/quote-card.svelte'
	import { posts } from '$brand/blocks/content/stories-data.js'

	const { Story } = defineMeta({
		title: 'Custom/Carousel',
		component: CardCarousel,
		parameters: { layout: 'padded' },
	})

	const services = [
		{ name: 'docs-site', state: 'on' },
		{ name: 'proxy-3000', state: 'on' },
		{ name: 'run-5173', state: 'stale' },
	] as const

	const quotes = [
		{ name: 'Priya Nair', role: 'Operations lead, Fernhill Schools', text: 'We ran twelve schools out of email threads. Now every school has a board, and the Friday check-in replaced a two-hour meeting.' },
		{ name: 'Lucas Moreira', role: 'Founder, Tidewater Studio', text: 'Clients see their project as guests. The “where are we with this?” emails just stopped.' },
		{ name: 'Kenji Mori', role: 'Engineering manager, Hexwork', text: 'Tasks close themselves when the pull request merges. That one feature sold the whole team.' },
		{ name: 'Ana Duarte', role: 'Product lead, Northwind', text: 'Planning went from a Monday meeting to a board everyone already reads.' },
	]
</script>

{#snippet folder()}
	<MaterialStage preset="brushed-alloy" title="Terminal" class="aspect-[16/9]" padding="lg"><div class="flex flex-col gap-3 p-5 font-mono text-sm"><span><span class="text-muted-foreground">$</span> ft ./dist</span><span class="truncate text-primary">https://steady-harbor-figures-plan.trycloudflare.com</span></div></MaterialStage>
{/snippet}
{#snippet hooks()}
	<MaterialStage preset="copper-sweep" title="ft hook" class="aspect-[16/9]" padding="lg"><ul class="divide-y font-mono text-[0.8125rem]">{#each ['POST /payments/events', 'POST /github', 'GET /health'] as r (r)}<li class="px-5 py-3">{r}</li>{/each}</ul></MaterialStage>
{/snippet}
{#snippet drop()}
	<MaterialStage preset="hammered-copper" title="ft drop ./inbox" class="aspect-[16/9]" padding="lg"><dl class="grid grid-cols-3 divide-x text-center"><div class="p-5"><dt class="text-xs text-muted-foreground">Each file</dt><dd class="text-2xl font-medium">64 MB</dd></div><div class="p-5"><dt class="text-xs text-muted-foreground">In all</dt><dd class="text-2xl font-medium">1 GB</dd></div><div class="p-5"><dt class="text-xs text-muted-foreground">Overwrites</dt><dd class="text-2xl font-medium">None</dd></div></dl></MaterialStage>
{/snippet}
{#snippet track()}
	<MaterialStage preset="liquid-chrome" title="ft ls" class="aspect-[16/9]" padding="lg"><ul class="divide-y text-sm">{#each services as sv (sv.name)}<li class="flex items-center gap-3 px-5 py-3 font-mono"><StatusRing state={sv.state} />{sv.name}</li>{/each}</ul></MaterialStage>
{/snippet}

<Story name="Posts" asChild>
	<CardCarousel label="From the blog" items={posts} class="max-w-6xl">
		{#snippet card(p)}<MaterialCard title={p.title} eyebrow={p.topic} body={p.summary} href={p.href} class="w-full">{#snippet footer()}{p.date}{/snippet}</MaterialCard>{/snippet}
	</CardCarousel>
</Story>

<Story name="Quotes" asChild>
	<CardCarousel label="What teams say" items={quotes} per={{ sm: 1.05, md: 1.6, lg: 2 }} class="max-w-5xl">
		{#snippet card(q)}<QuoteCard class="w-full" name={q.name} role={q.role}>{#snippet quote()}{q.text}{/snippet}</QuoteCard>{/snippet}
	</CardCarousel>
</Story>

<Story name="Feature tour" asChild>
	<FeatureCarousel
		class="max-w-5xl"
		label="What tunnel does"
		slides={[
			{ title: 'Share a folder', body: 'One command, one public link.', content: folder },
			{ title: 'Read every webhook', body: 'Each request kept for you to read.', content: hooks },
			{ title: 'Collect files', body: 'A link people can send files to.', content: drop },
			{ title: 'Keep track', body: 'Everything you started, in one list.', content: track },
		]}
	/>
</Story>
