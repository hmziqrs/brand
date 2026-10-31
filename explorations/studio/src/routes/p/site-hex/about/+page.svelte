<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import TopNav from '$moves/site-hex/top-nav.svelte';
	import SpotFrame from '$moves/site-hex/spot-frame.svelte';
	import SpotTerrain from '$moves/site-hex/spot-terrain.svelte';
	import StatRow from '$moves/site-hex/stat-row.svelte';
	import ResourceCard from '$moves/site-hex/resource-card.svelte';
	import TeamMosaic from '$moves/site-hex/team-mosaic.svelte';
	import OxideCta from '$moves/site-hex/oxide-cta.svelte';
	import TerrainFooter from '$moves/site-hex/terrain-footer.svelte';
	import { href } from '$moves/site-hex/site';
	import { outline, solid } from '$moves/site-hex/buttons';

	const stats = [
		{ value: '6', label: 'years building the tool we wanted' },
		{ value: '2,000+', label: 'teams, from AI labs to banks' },
		{ value: '31', label: 'countries with a customer' },
		{ value: '140', label: 'people, most of them ex-analysts' }
	];

	const backers = ['Longfield Partners', 'Second Harbour', 'Northlight Ventures', 'Atlas & Vane', 'Quiet Capital Co.', 'Meridian Seed', 'Copperline Fund', 'Halyard Growth'];

	const press = [
		{ kind: 'mic', tag: 'Talk', title: 'How data teams changed when the agents arrived', meta: 'Warehouse Summit · Jun 17, 2026' },
		{ kind: 'curve', tag: 'Talk', title: 'Benchmarks where everything is made up and nothing counts', meta: 'Applied AI Council · Jun 17, 2026' },
		{ kind: 'globe', tag: 'Story', title: 'Following a football tournament with one notebook', meta: 'Sports desk · Jun 12, 2026' },
		{ kind: 'cube', tag: 'Award', title: 'Partner of the year for the agentic data category', meta: 'Cloud partner awards · Jun 2, 2026' },
		{ kind: 'mail', tag: 'Podcast', title: 'From dashboards to decisions: closing the last mile', meta: 'The Ledger Pod · May 18, 2026' },
		{ kind: 'stack', tag: 'Podcast', title: 'What an analyst does when the SQL writes itself', meta: 'Powered by Questions · Apr 21, 2026' }
	] as const;

	const tiles = [
		{ span: 'col-span-2 row-span-2', preset: 'copper-sweep', role: 'offsite · Lisbon' },
		{ span: '', kind: 'cube', role: 'analytics eng.' },
		{ span: 'row-span-2', preset: 'sediment', role: 'design · Berlin' },
		{ span: 'col-span-2', preset: 'hammered-copper', role: 'hack week' },
		{ span: '', kind: 'branch', role: 'platform' },
		{ span: '', preset: 'mineral-fault', role: 'support · NYC' },
		{ span: 'col-span-2', kind: 'curve', role: 'research' },
		{ span: '', preset: 'endgrain-wood', role: 'the office shelf' },
		{ span: '', kind: 'mic', role: 'customer calls' },
		{ span: 'col-span-2', preset: 'oxide-bloom', role: 'launch night' }
	] as const;
</script>

<svelte:head><title>About Quarry</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<TopNav active="about" />

	<section class="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-4 pt-16 pb-12 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:pt-24">
		<div>
			<p class="mb-6 font-mono text-xs tracking-[0.16em] uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>Company</p>
			<h1 class="text-[52px] leading-[0.95] font-semibold tracking-[-0.045em] text-balance sm:text-7xl lg:text-[104px]">Changing how the world works with data</h1>
			<p class="mt-8 max-w-[38ch] text-xl leading-snug sm:text-2xl">We started Quarry to build the analytics tool we always wished we had. Six years on it runs at more than two thousand teams, from AI labs to regulated banks.</p>
			<div class="mt-10 flex flex-wrap gap-3">
				<a href={href('contact')} class={solid}>See open roles <ArrowRight class="lucide size-4" /></a>
				<a href={href('home')} class={outline}><BookOpen class="lucide size-4" />Read the handbook</a>
			</div>
		</div>
		<SpotFrame class="px-2 py-6">
			<p class="absolute top-3 right-4 font-mono text-[11px] text-muted-foreground">move the cursor</p>
			<SpotTerrain cols={11} rows={11} u={24} lift={4} />
		</SpotFrame>
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-8">
		<StatRow {stats} />
	</section>

	<section class="mx-auto grid w-full max-w-[1320px] gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
		<div>
			<h2 class="text-4xl leading-[1] font-semibold tracking-[-0.03em] sm:text-6xl">Backed by patient people</h2>
			<p class="mt-5 text-xl leading-snug">We raised from investors who were happy to wait for the product to be right. <span class="font-mono text-sm text-muted-foreground">(names invented)</span></p>
		</div>
		<ul class="grid grid-cols-2 gap-px border border-border bg-border">
			{#each backers as b, i (b)}
				<li class="flex items-center gap-3 bg-background p-5 text-lg font-medium sm:p-6 sm:text-xl">
					<span class="size-2 shrink-0 {i % 3 === 0 ? 'bg-[var(--orange)]' : 'border border-foreground'}"></span>{b}
				</li>
			{/each}
		</ul>
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-8">
		<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
			<h2 class="text-4xl leading-[1] font-semibold tracking-[-0.03em] sm:text-6xl">Elsewhere on the internet</h2>
			<a href={href('about')} class="group inline-flex items-center gap-3 border-b border-foreground pb-1 font-medium hover:border-[var(--orange)]">More links<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></a>
		</div>
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each press as p (p.title)}
				<ResourceCard {...p} href={href('about')} cta="Open" />
			{/each}
		</div>
	</section>

	<section class="mx-auto grid w-full max-w-[1320px] items-start gap-10 px-4 py-20 sm:px-8 lg:grid-cols-[0.6fr_1.4fr]">
		<div class="lg:sticky lg:top-8">
			<h2 class="text-5xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-7xl">A team of data nerds</h2>
			<p class="mt-6 text-xl leading-snug">Centuries of combined time spent waiting on queries. We are only getting started.</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href={href('contact')} class={solid}>See open roles</a>
			</div>
		</div>
		<TeamMosaic tiles={[...tiles]} />
	</section>

	<OxideCta class="mt-10" title="Come build it with us" body="Remote-first, with hubs in New York, Lisbon and Berlin. We hire people who have felt the pain." primary="See open roles" secondary="Read the handbook" href={href('contact')} altHref={href('home')} preset="sediment" />

	<TerrainFooter />
</div>
