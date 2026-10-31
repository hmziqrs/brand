<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import TopNav from '$moves/site-hex/top-nav.svelte';
	import GridHero from '$moves/site-hex/grid-hero.svelte';
	import SplitRow from '$moves/site-hex/split-row.svelte';
	import SpotFrame from '$moves/site-hex/spot-frame.svelte';
	import SpotDrilldown from '$moves/site-hex/spot-drilldown.svelte';
	import SpotLayers from '$moves/site-hex/spot-layers.svelte';
	import SpotPipeline from '$moves/site-hex/spot-pipeline.svelte';
	import SpotTangentRings from '$moves/site-hex/spot-tangent-rings.svelte';
	import ResourceCard from '$moves/site-hex/resource-card.svelte';
	import OxideCta from '$moves/site-hex/oxide-cta.svelte';
	import TerrainFooter from '$moves/site-hex/terrain-footer.svelte';
	import { href } from '$moves/site-hex/site';
	import { outline, solid } from '$moves/site-hex/buttons';

	const reads = [
		{ kind: 'stack', tag: 'Guide', title: 'Getting your warehouse ready for language models', body: 'Every data team ends up onboarding an LLM. What it needs from you before day one.', meta: '12 min read' },
		{ kind: 'lock', tag: 'Playbook', title: 'A field guide to earning data trust at scale', body: 'Six habits from teams that grew past a thousand dashboard readers.', meta: '9 min read' },
		{ kind: 'curve', tag: 'Essay', title: 'Stop trying to measure “data team ROI”', body: 'You will not find the number. Here is what to report instead.', meta: '6 min read' }
	] as const;
</script>

<svelte:head><title>Quarry for data leaders</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<TopNav active="data-leaders" />

	<GridHero kicker="Solutions · data leaders" lead="Data leaders: aim your team and" mark="scale the answers" lede="Turn “why is this taking so long?” into “wait, how did you do that already?”">
		<a href={href('contact')} class={solid}>Request a demo <ArrowRight class="lucide size-4" /></a>
		<a href={href('pricing')} class={outline}>Start free</a>
	</GridHero>

	<SplitRow kicker="Root cause" title="Steer strategy with the real cause, not the chart" body="Notebooks you can poke at. Dig as deep as the question needs, work on it together, then share it with the full trail attached so the people deciding can see how you got there." cta="How a freight team found $1.2M of churn" href={href('customers')}>
		{#snippet art()}<SpotDrilldown class="mx-auto max-w-[520px]" />{/snippet}
	</SplitRow>

	<SplitRow flip kicker="Governed self-serve" title="Self-serve that stays on the rails, with AI on top" body="Plug in your semantic layer so people explore from the same definitions you do. No copied spreadsheets, no shadow metrics. The agent answers from trusted models and says when it can't." cta="See the context studio" href={href('home')}>
		{#snippet art()}<SpotLayers class="mx-auto max-w-[440px]" />{/snippet}
	</SplitRow>

	<SplitRow kicker="One workflow" title="One place from first query to final story" body="SQL, Python, charts and the write-up live in the same project. Your team spends the week on the question, not on moving CSVs between five tools." cta="Tour the notebook" href={href('home')}>
		{#snippet art()}<SpotPipeline class="mx-auto max-w-[540px]" />{/snippet}
	</SplitRow>

	<section class="mx-auto w-full max-w-[1320px] px-4 pt-16 pb-10 text-center sm:px-8 lg:pt-28">
		<h2 class="mx-auto max-w-[18ch] text-4xl leading-[1] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">How other data leaders are earning a seat at the table</h2>
	</section>

	<section class="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
		<div>
			<p class="mb-5 font-mono text-xs tracking-[0.16em] uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>Featured essay</p>
			<h3 class="text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">AI is changing how data teams work. Good.</h3>
			<p class="mt-5 text-xl leading-snug">What we learned running our own data team with agents for a year: what got faster, what got weird, and what we stopped doing.</p>
			<a href={href('about')} class="group mt-8 inline-flex items-center gap-3 border-b border-foreground pb-1 font-medium hover:border-[var(--orange)]">Read the essay<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></a>
		</div>
		<SpotFrame grid class="px-4 py-12 sm:px-10">
			<SpotTangentRings />
		</SpotFrame>
	</section>

	<section class="mx-auto grid w-full max-w-[1320px] gap-5 px-4 py-16 sm:px-8 md:grid-cols-3">
		{#each reads as r (r.title)}
			<ResourceCard {...r} href={href('about')} />
		{/each}
	</section>

	<OxideCta class="mt-10" title="See why data leaders pick Quarry" body="Thirty minutes with someone who has run a data team, on your warehouse, with your questions." primary="Request a demo" secondary="Talk to sales" href={href('contact')} altHref={href('contact')} />

	<TerrainFooter />
</div>
