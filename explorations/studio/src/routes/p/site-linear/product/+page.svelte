<script lang="ts">
	import Bento from '$brand/components/bento.svelte';
	import BentoTile from '$brand/components/bento-tile.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import BarList from '$brand/blocks/showcase/bar-list.svelte';
	import KpiStat from '$brand/blocks/showcase/kpi-stat.svelte';
	import { siGooglesheets, siPostgresql, siSnowflake } from 'simple-icons';
	import Target from '@lucide/svelte/icons/target';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import MaterialHero from '$moves/site-linear/material-hero.svelte';
	import SectionHead from '$moves/site-linear/section-head.svelte';
	import StageFrame from '$moves/site-linear/stage-frame.svelte';
	import ProjectMock from '$moves/site-linear/project-mock.svelte';
	import ProjectBento from '$moves/site-linear/project-bento.svelte';
	import DocMock from '$moves/site-linear/doc-mock.svelte';
	import PlanningTabs from '$moves/site-linear/planning-tabs.svelte';
	import PulseFeed from '$moves/site-linear/pulse-feed.svelte';
	import NextLinks from '$moves/site-linear/next-links.svelte';
	import QuotePair from '$moves/site-linear/quote-pair.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import MaterialTile from '$moves/bento/material-tile.svelte';
	import StatusIcon from '$moves/site-linear/status-icon.svelte';
	import { to } from '$moves/site-linear/content';

	const throughput = Array.from({ length: 16 }, (_, i) => ({ label: `W${i + 1}`, value: Math.round(42 + i * 2.6 + Math.sin(i / 1.7) * 7), previous: Math.round(38 + i * 1.1 + Math.cos(i / 2) * 5) }));

	const initiatives = [
		{ name: 'Product 2026', projects: 14, done: 0.58, s: 'progress' as const, lead: 'Mara' },
		{ name: 'Faster everywhere', projects: 6, done: 0.81, s: 'review' as const, lead: 'Teo' },
		{ name: 'Agents in every team', projects: 9, done: 0.34, s: 'progress' as const, lead: 'Ines' },
		{ name: 'Enterprise readiness', projects: 5, done: 0.12, s: 'todo' as const, lead: 'Pia' }
	];
</script>

<svelte:head><title>Plumb · Plan</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="product" />

	<MaterialHero eyebrow="Planning and monitoring" title="Plan and steer from idea to launch" lede="Projects, specs, roadmaps and updates that stay true because they sit next to the work." preset="copper-sweep" />

	<section class="pt-24 md:pt-36">
		<SectionHead title="Run projects end to end" lede="Coordinate bigger pieces of work across people and teams, and move from idea to execution without switching tools." href={to('home')} link="Projects" />
		<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6">
			<StageFrame preset="brushed-alloy" title="Close the gap between planning and building" body="Specs, docs, issues, customer feedback and updates for a project, in one place.">
				<ProjectMock class="mx-auto max-w-[1000px]" />
			</StageFrame>
			<ProjectBento class="mt-3" />
		</div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="Shape the idea first" lede="Work out ideas and write requirements together in live, multiplayer project documents." href={to('home')} link="Documents" />
		<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6"><DocMock /></div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="Steer the big bets" lede="Roll projects up into initiatives: the few streams of work that matter most, and how each one is doing." href={to('home')} link="Initiatives" />
		<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6">
			<Bento class="gap-3">
				<OxideTile eyebrow="Initiatives" big="4" title="efforts the whole company can name." body="One canonical entry point for the work that matters most." seed="plumb-initiatives" class="min-h-80 md:col-span-2 lg:col-span-2" />
				<BentoTile cols={4} class="bg-background">
					<div class="flex h-full flex-col gap-5">
						<div>
							<p class="text-xl font-medium text-foreground">Watch progress at scale</p>
							<p class="mt-1 text-base text-foreground/85">See which initiatives are on track and which projects are holding them up.</p>
						</div>
						<ul class="mt-auto divide-y divide-border rounded-xl text-[14px] ring-1 ring-border">
							{#each initiatives as it (it.name)}
								<li class="grid grid-cols-[minmax(0,1fr)_120px] items-center gap-4 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_80px_160px_60px]">
									<span class="flex items-center gap-2 font-medium text-foreground"><Target class="lucide size-4 text-primary" />{it.name}</span>
									<span class="hidden text-foreground/85 sm:inline">{it.projects} projects</span>
									<span class="flex items-center gap-2"><span class="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10"><span class="block h-full rounded-full bg-primary" style:width="{it.done * 100}%"></span></span><span class="w-9 text-right text-xs tabular-nums">{Math.round(it.done * 100)}%</span></span>
									<span class="hidden items-center gap-1.5 text-foreground/85 sm:flex"><StatusIcon status={it.s} />{it.lead}</span>
								</li>
							{/each}
						</ul>
					</div>
				</BentoTile>
				<BentoTile cols={3} class="bg-background [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground [&_p]:text-base [&_p]:text-foreground/85" title="Get everyone on the strategy" body="Each initiative carries a summary, linked docs and the projects under it, so nobody has to ask what it means." />
				<BentoTile cols={3} class="bg-background [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground [&_p]:text-base [&_p]:text-foreground/85" title="Nest as deep as you need" body="Sub-initiatives let a big bet split into team-sized goals without losing the thread." />
			</Bento>
		</div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="Map the road ahead" lede="Put the team on one product timeline, and plan visually with views made for shipping." href={to('home')} link="Visual planning" />
		<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6"><PlanningTabs /></div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="Keep a pulse on progress" lede="A personal feed of the updates and discussions across the product org, with a summary waiting in your inbox." href={to('home')} link="Pulse" />
		<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6">
			<StageFrame preset="oxide-bloom" title="Your feed, tuned to what you own" body="Follow the projects and initiatives you care about; get a written or spoken digest each week.">
				<PulseFeed class="mx-auto max-w-[1040px]" />
			</StageFrame>
		</div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="Data to back your gut" lede="Analytics, reports and dashboards made for product planning, so the numbers sit beside the work they describe." href={to('home')} link="Insights" />
		<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6">
			<Bento class="gap-3">
				<BentoTile cols={4} rows={2} class="bg-background">
					<div class="flex h-full flex-col gap-6">
						<div>
							<p class="text-xl font-medium text-foreground">Instant charts for any slice of work</p>
							<p class="mt-1 max-w-[52ch] text-base text-foreground/85">Pick a filter, get throughput, cycle time and scope in seconds. Example data.</p>
						</div>
						<div class="grid gap-6 sm:grid-cols-3">
							<KpiStat label="Issues closed / week" value="84" delta={12} against="vs last cycle" />
							<KpiStat label="Median cycle time" value="2.4d" delta={-18} lowerIsBetter against="vs last cycle" />
							<KpiStat label="Agent-authored" value="46%" delta={9} against="vs last cycle" />
						</div>
						<TrendChart points={throughput} label="Issues closed a week" height={170} names={['This quarter', 'Last quarter']} class="mt-auto" />
					</div>
				</BentoTile>
				<BentoTile cols={2} rows={2} class="bg-background">
					<div class="flex h-full flex-col gap-5">
						<div>
							<p class="text-xl font-medium text-foreground">Dashboards from blocks</p>
							<p class="mt-1 text-base text-foreground/85">Compose modular dashboards for the metrics you watch.</p>
						</div>
						<BarList label="Open issues by team" rows={[{ label: 'Maps', value: 128 }, { label: 'Mobile', value: 96 }, { label: 'Infra', value: 71 }, { label: 'Payments', value: 44 }, { label: 'AI', value: 39 }]} class="mt-auto" />
					</div>
				</BentoTile>
				<MaterialTile preset="mineral-fault" title="Build your own reporting" body="Export to sheets or your warehouse for deeper analysis." class="min-h-72 md:col-span-3 lg:col-span-6">
					<div class="mt-3 flex gap-2 text-foreground">
						{#each [[siGooglesheets, 'Sheets'], [siPostgresql, 'Postgres'], [siSnowflake, 'Snowflake']] as const as [icon, name] (name)}
							<span class="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-sm ring-1 ring-border"><BrandIcon {icon} class="size-3.5" />{name}</span>
						{/each}
					</div>
				</MaterialTile>
			</Bento>
		</div>
	</section>

	<NextLinks class="pt-28 md:pt-40" items={[
		{ title: 'Make product operations run themselves', label: 'Intake', href: to('home') },
		{ title: 'Plan and steer from idea to launch', label: 'Planning', href: to('product'), current: true },
		{ title: 'Agents that follow work from chat to code', label: 'Agents', href: to('home') },
		{ title: 'Move work forward across people and agents', label: 'Build and ship', href: to('home') }
	]} />

	<QuotePair
		class="py-28 md:py-40"
		preset="copper-sweep"
		main={{ text: 'Projects gave us one source of truth across all of our work, and the team finally stays in sync.', name: 'Dana Whitlock', role: 'Director, example company' }}
		side={{ text: 'For the first time we have one roadmap everyone agrees on.', name: 'Sol Ferreira', role: 'Quality lead, example company' }}
	/>

	<SiteFooter />
</div>
