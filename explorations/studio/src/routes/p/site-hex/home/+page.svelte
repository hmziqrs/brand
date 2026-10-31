<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BarChart3 from '@lucide/svelte/icons/bar-chart-3';
	import MessageSquare from '@lucide/svelte/icons/message-square';
	import Network from '@lucide/svelte/icons/network';
	import TopNav from '$moves/site-hex/top-nav.svelte';
	import GridHero from '$moves/site-hex/grid-hero.svelte';
	import NameStrip from '$moves/site-hex/name-strip.svelte';
	import FeatureBlock from '$moves/site-hex/feature-block.svelte';
	import AskDemo from '$moves/site-hex/ask-demo.svelte';
	import ContextTabs from '$moves/site-hex/context-tabs.svelte';
	import KpiBento from '$moves/site-hex/kpi-bento.svelte';
	import EvalList from '$moves/site-hex/eval-list.svelte';
	import SpotFrame from '$moves/site-hex/spot-frame.svelte';
	import SpotTangentRings from '$moves/site-hex/spot-tangent-rings.svelte';
	import SpotPipeline from '$moves/site-hex/spot-pipeline.svelte';
	import SpotMini from '$moves/site-hex/spot-mini.svelte';
	import IntegrationTiles from '$moves/site-hex/integration-tiles.svelte';
	import OxideCta from '$moves/site-hex/oxide-cta.svelte';
	import TerrainFooter from '$moves/site-hex/terrain-footer.svelte';
	import { href } from '$moves/site-hex/site';
	import { outline, solid } from '$moves/site-hex/buttons';

	const chip = 'mx-1 inline-flex translate-y-[-2px] items-center gap-1.5 border border-border bg-background px-2.5 py-0.5 align-middle text-[0.8em] text-foreground';

	const uses = [
		{ n: '01', title: 'Move off static BI', body: 'Swap the dashboard backlog for trusted, AI-assisted self-serve while your team keeps the foundations.' },
		{ n: '02', title: 'Build a context layer', body: 'Put definitions, models and tribal knowledge in one place so agents reason from the same facts you do.' },
		{ n: '03', title: 'Make chat apps data-aware', body: 'People keep working in the assistant or editor they like; Quarry supplies the trusted data underneath.' }
	];

	const stories = [
		{ kind: 'globe', co: 'Halden Freight', title: 'One place for every decision', body: 'Ops, finance and CX moved their weekly numbers into one workspace.' },
		{ kind: 'stack', co: 'Tessel Labs', title: 'Self-serve, at last', body: 'Four in five agent users are not on the data team.' },
		{ kind: 'curve', co: 'Orbit Dental', title: 'Strategy over syntax', body: 'Researchers ask in plain words and check the SQL after.' },
		{ kind: 'branch', co: 'Kestrel Bank', title: 'No more data silos', body: 'Answers land in the chat thread where the question was asked.' }
	] as const;
</script>

<svelte:head><title>Quarry — analytics for people and agents</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<TopNav active="home" />

	<GridHero lead="The analytics workspace for" mark="people and agents">
		{#snippet sub()}
			Rethinking <span class={chip}><BarChart3 class="lucide size-4" />BI</span>,
			<span class={chip}><MessageSquare class="lucide size-4" />chat analytics</span> and
			<span class={chip}><Network class="lucide size-4" />context</span> for the agent era.
		{/snippet}
		<a href={href('pricing')} class={solid}>Start free <ArrowRight class="lucide size-4" /></a>
		<a href={href('contact')} class={outline}>Request a demo</a>
	</GridHero>

	<NameStrip />

	<section class="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:py-28">
		<div>
			<h2 class="text-5xl leading-[0.98] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[80px]">A different take on analytics and BI</h2>
			<p class="mt-6 max-w-[42ch] text-xl leading-snug">Dashboards, chat bots and vibe-coded scripts each give you a different number. Quarry keeps one set of definitions under all of them, so curiosity scales without the arguments.</p>
		</div>
		<SpotFrame grid class="px-4 py-10 sm:px-8">
			<SpotTangentRings center="one context" left="people" right="agents" />
		</SpotFrame>
	</section>

	<FeatureBlock title="Ask a question, get an answer you can check" cta="Explore self-serve" href={href('data-leaders')} quote="We can reach the same project from the editor we already live in. That flexibility is the whole point." who="Platform lead · example quote, Tessel Labs (invented)">
		{#snippet demo()}<AskDemo />{/snippet}
	</FeatureBlock>

	<FeatureBlock title="Ground every answer in your own context" cta="Explore the context studio" href={href('data-leaders')} quote="I check it every morning. Seeing the gaps surface on their own is how we got AI self-serve past the pilot." who="Staff data engineer · example quote (invented)">
		{#snippet demo()}<ContextTabs />{/snippet}
	</FeatureBlock>

	<FeatureBlock title="Share it as a live app, not a screenshot" cta="Explore app building" href={href('data-leaders')} quote="I described the chart and never built another one by hand." who="Senior researcher · example quote (invented)">
		{#snippet demo()}<KpiBento />{/snippet}
	</FeatureBlock>

	<FeatureBlock title="See what people ask, and whether the answers held up" cta="Explore evals" href={href('data-leaders')} quote="Our context goes stale the day after we ship a new domain. Evals tell us where before anyone else notices." who="Director of analytics · example quote (invented)">
		{#snippet demo()}<EvalList />{/snippet}
	</FeatureBlock>

	<section class="mx-auto grid w-full max-w-[1320px] gap-5 px-4 py-16 sm:px-8 lg:grid-cols-2">
		<article class="flex flex-col border border-border">
			<SpotFrame ticks={false} grid class="border-b border-border px-6 py-10"><SpotPipeline class="mx-auto max-w-[460px]" /></SpotFrame>
			<div class="p-6 sm:p-8">
				<p class="font-mono text-xs tracking-[0.14em] uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>Flexible on purpose</p>
				<h3 class="mt-4 text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-4xl">Any data, any model, any context. No lock-in.</h3>
				<p class="mt-4 text-lg leading-snug">Your AI bill is growing and nobody can say who spent what on which project. Choose models per project, including open ones, see token spend per thread, and sweep evals to find the price you are happy with.</p>
			</div>
		</article>
		<article class="flex flex-col border border-border">
			<SpotFrame ticks={false} grid class="border-b border-border px-6 py-10"><SpotMini kind="lock" class="mx-auto max-w-[300px]" /></SpotFrame>
			<div class="p-6 sm:p-8">
				<p class="font-mono text-xs tracking-[0.14em] uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>Control without compromise</p>
				<h3 class="mt-4 text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-4xl">Open up access without giving up control</h3>
				<p class="mt-4 text-lg leading-snug">Row-level permissions, audit logs and org controls come built in. The infrastructure stays strict so the people using it never have to think about it.</p>
			</div>
		</article>
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-8">
		<h2 class="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Where teams start</h2>
		<div class="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
			{#each uses as u (u.n)}
				<div class="bg-background p-6 sm:p-8">
					<p class="font-mono text-sm text-muted-foreground">{u.n}</p>
					<h3 class="mt-10 text-2xl font-semibold tracking-tight">{u.title}</h3>
					<p class="mt-3 text-lg leading-snug">{u.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-8">
		<div class="text-center">
			<h2 class="mx-auto max-w-[14ch] text-5xl leading-[0.98] font-semibold tracking-[-0.04em] text-balance sm:text-7xl">Loved by teams that live in data</h2>
			<p class="mt-5 text-xl">Small startups to regulated banks. <span class="font-mono text-sm text-muted-foreground">(examples, names invented)</span></p>
		</div>
		<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each stories as s (s.co)}
				<a href={href('customers')} class="group border border-border p-5 transition-colors hover:border-foreground">
					<p class="font-semibold tracking-tight">{s.co}</p>
					<SpotMini kind={s.kind} class="my-6 max-w-[180px] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none" />
					<h3 class="text-xl font-semibold">{s.title}</h3>
					<p class="mt-2 text-[16px] leading-snug text-foreground/85">{s.body}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-8">
		<div class="mb-10 grid gap-4 lg:grid-cols-2 lg:items-end">
			<h2 class="text-4xl leading-[1] font-semibold tracking-[-0.03em] sm:text-6xl">Plugs into the whole stack</h2>
			<p class="text-xl leading-snug lg:justify-self-end lg:text-right">Ready-made connections and an open API. Setup takes an afternoon.</p>
		</div>
		<IntegrationTiles />
	</section>

	<OxideCta class="mt-10" title="Getting started is the easy part" body="Connect a warehouse and ask your first question in minutes. Free for individuals, forever." primary="Start free" secondary="Request a demo" href={href('pricing')} altHref={href('contact')} preset="copper-sweep" />

	<TerrainFooter />
</div>
