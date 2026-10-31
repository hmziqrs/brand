<script lang="ts">
	import TopNav from '$moves/site-hex/top-nav.svelte';
	import GridHero from '$moves/site-hex/grid-hero.svelte';
	import StoryRail from '$moves/site-hex/story-rail.svelte';
	import QuoteMarquee from '$moves/site-hex/quote-marquee.svelte';
	import StoryFilter from '$moves/site-hex/story-filter.svelte';
	import OxideCta from '$moves/site-hex/oxide-cta.svelte';
	import TerrainFooter from '$moves/site-hex/terrain-footer.svelte';
	import { href } from '$moves/site-hex/site';

	const featured = [
		{ co: 'Halden Freight', stat: '$1.2M', line: 'of churn caught a quarter early by one ops analyst.', preset: 'copper-sweep' },
		{ co: 'Tessel Labs', stat: '81%', line: 'of agent users are outside the data team.', preset: 'sediment' },
		{ co: 'Kestrel Bank', stat: '6 wks', line: 'to retire a legacy BI tool, most of it done by the agent.', preset: 'mineral-fault' },
		{ co: 'Orbit Dental', stat: '97%', line: 'less time spent preparing quarterly reviews.', preset: 'hammered-copper' },
		{ co: 'Parcel9', stat: '10×', line: 'more questions answered in the team chat each week.', preset: 'oxide-bloom' }
	];

	const rows = [
		[
			{ text: 'We rolled it out in March and already know we chose right. The pace of shipping is a bit unreal.', who: 'Head of data · Parcel9 (invented)' },
			{ stat: '4 hrs', text: 'saved on every dashboard we build.', who: 'Analytics lead · Halden Freight (invented)' },
			{ text: 'Our sales-ops VP built an analysis in his pyjamas that used to need a Python person. Wild.', who: 'Data manager · Kestrel Bank (invented)' },
			{ text: 'Reports that took days now take hours. For us that is real money.', who: 'COO · Miro Farms (invented)' },
			{ stat: '2×', text: 'more output from the same data team.', who: 'Director of analytics · Sable (invented)' }
		],
		[
			{ text: 'I describe what I want and get SQL I can read back. No juggling five tabs.', who: 'Analytics engineer · fjordline (invented)' },
			{ text: 'Support has answered every question and fixed every bug I have raised. Rare.', who: 'Data scientist · Quill (invented)' },
			{ text: 'It traced a metric drop to its cause in about twenty minutes of my afternoon.', who: 'Product analyst · Tessel Labs (invented)' },
			{ text: 'Tutorial to production dashboards in under three days.', who: 'Founder · Marrow (invented)' },
			{ text: 'A five-sentence prompt gave me an analysis that would have eaten my morning.', who: 'Researcher · Orbit Dental (invented)' }
		]
	];

	const stories = [
		{ co: 'Halden Freight', stage: 'Growth', title: 'Caught $1.2M of churn a quarter early with one shared notebook', kind: 'curve', added: 12 },
		{ co: 'Tessel Labs', stage: 'Startup', title: '81% of agent users are not on the data team', kind: 'stack', added: 11 },
		{ co: 'Kestrel Bank', stage: 'Enterprise', title: 'Moved off legacy BI in six weeks, most of it agent-written', kind: 'lock', added: 10 },
		{ co: 'Orbit Dental', stage: 'Growth', title: 'Cut quarterly review prep by 97% and raised the bar on calls', kind: 'mic', added: 9 },
		{ co: 'Parcel9', stage: 'Startup', title: 'Answers land in the chat thread where the question was asked', kind: 'mail', added: 8 },
		{ co: 'Miro Farms', stage: 'Growth', title: 'Built a 36-month yield forecast in an afternoon', kind: 'globe', added: 7 },
		{ co: 'Sable', stage: 'Enterprise', title: 'Two thousand readers, one set of definitions', kind: 'branch', added: 6 },
		{ co: 'fjordline', stage: 'Startup', title: 'Turned a pricing hunch into a tested model in a week', kind: 'cube', added: 5 },
		{ co: 'Lumen & Co', stage: 'Enterprise', title: 'Saved 260 hours with apps for recurring questions', kind: 'stack', added: 4 }
	] as const;
</script>

<svelte:head><title>Quarry customer stories</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<TopNav active="customers" />

	<GridHero kicker="Customer stories" lead="Loved by the people who" mark="live in data" lede="Over two thousand teams use Quarry to scale what their analysts know. Here is how a few of them did it." size="lg" />
	<p class="-mt-8 mb-10 text-center font-mono text-xs text-muted-foreground">All companies, people and numbers on this page are invented examples.</p>

	<section class="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
		<StoryRail stories={featured} href={href('customers')} />
	</section>

	<section class="py-20">
		<h2 class="mx-auto mb-10 max-w-[1320px] px-4 text-4xl leading-[1] font-semibold tracking-[-0.03em] sm:px-8 sm:text-6xl">In their words</h2>
		<QuoteMarquee {rows} />
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
		<h2 class="mb-8 text-4xl leading-[1] font-semibold tracking-[-0.03em] sm:text-6xl">Every story</h2>
		<StoryFilter stories={[...stories]} href={href('customers')} />
	</section>

	<OxideCta class="mt-24" title="Your team could be the next story" body="Bring one stubborn question. We will answer it on your own data." primary="Request a demo" secondary="See pricing" href={href('contact')} altHref={href('pricing')} preset="lava-fissures" />

	<TerrainFooter />
</div>
