<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import Hero from '$brand/blocks/site/hero.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import RingStats from '$brand/blocks/site/ring-stats.svelte';
	import Section from '$brand/blocks/site/section.svelte';
	import Steps from '$brand/blocks/site/steps.svelte';
	import PricingPlans from '$brand/blocks/site/pricing-plans.svelte';
	import FaqList from '$brand/blocks/content/faq-list.svelte';
	import BentoSection, { type BentoTile } from '$brand/blocks/sections/bento-section.svelte';
	import ShowcaseSection from '$brand/blocks/sections/showcase-section.svelte';
	import AppWindow from '$brand/blocks/saas/app-window.svelte';
	import KpiStat from '$brand/blocks/showcase/kpi-stat.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import FunnelChart from '$brand/blocks/showcase/funnel-chart.svelte';
	import LiveFeed from '$brand/blocks/showcase/live-feed.svelte';
	import GoalMeter from '$brand/blocks/showcase/goal-meter.svelte';
	import RetentionGrid from '$brand/blocks/showcase/retention-grid.svelte';
	import { visitors, funnel, events, cohorts } from '$brand/blocks/showcase/demo.js';
	import Rings from '$brand/components/rings.svelte';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import Tag from '$brand/components/tag.svelte';
	import MaterialBand from '../material-band.svelte';
	import type { Plan } from '$brand/blocks/site/plan.js';
	import type { FaqItem } from '$brand/blocks/content/types.js';

	const plans: Plan[] = [
		{ name: 'Hobby', price: 0, blurb: 'For one project and one person.', features: ['One project', 'Community support'], cta: 'Start free' },
		{ name: 'Pro', price: 12, per: 'per person', yearly: 120, blurb: 'For teams that ship every week.', features: ['Unlimited projects', 'Priority support', 'Audit log'], cta: 'Choose Pro', pick: true },
		{ name: 'Studio', price: 'Talk to us', blurb: 'For shared workspaces and single sign-on.', features: ['Everything in Pro', 'Single sign-on', 'A named contact'], cta: 'Contact us' },
	];

	const faq: FaqItem[] = [
		['Plans', 'Can I change plans later?', 'Yes. Pick a new plan any time. The new price starts with your next bill.'],
		['Plans', 'Is there a free plan?', 'Yes. The free plan covers one project and one person.'],
		['Team', 'Can I invite people who are not on my team?', 'Yes. Invite them by email. They choose their own sign-in.'],
		['Data', 'Who can see my projects?', 'Only the people you invite. Admins decide who can edit.'],
	];

	const columns = [
		{ title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Changelog', href: '#' }] },
		{ title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Contact', href: '#' }] },
		{ title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
	];

	const tiles: BentoTile[] = [
		{ title: 'Where people leave', body: 'Who reaches each step, and where most leave.', cols: 2 as const, visual: funnelVisual },
		{ title: 'Who is here now', body: 'Live activity, newest first.', cols: 2 as const, visual: liveVisual },
		{ title: 'Goal for the month', body: 'How far along, and whether the pace is on track.', cols: 2 as const, visual: goalVisual },
		{ title: 'Traffic', body: 'This period against the last, a point a day.', cols: 3 as const, visual: trafficVisual },
		{ title: 'Retention', body: 'How many of each week’s new people came back.', cols: 3 as const, visual: retentionVisual },
	];
</script>

<svelte:head>
	<title>SaaS page — Reference</title>
</svelte:head>

{#snippet funnelVisual()}
	<FunnelChart steps={funnel} stepGap="gap-2" class="gap-2" />
{/snippet}

{#snippet liveVisual()}
	<LiveFeed {events} online={38} />
{/snippet}

{#snippet goalVisual()}
	<div class="flex flex-col items-start gap-5">
		<GoalMeter label="paid sign-ups this month" current={288} target={400} elapsed={0.6} />
		<GoalMeter label="paid sign-ups this month" current={180} target={400} elapsed={0.6} />
	</div>
{/snippet}

{#snippet trafficVisual()}
	<TrendChart label="Visitors a day" points={visitors} height={200} class="w-0 min-w-full" />
{/snippet}

{#snippet retentionVisual()}
	<RetentionGrid {cohorts} class="w-0 min-w-full" />
{/snippet}

<main class="flex flex-col gap-24 md:gap-32">
	<Container class="pt-8">
		<Tag>Sample copy</Tag>
	</Container>

	<Hero>
		{#snippet title()}Plan the work. Ship on time.{/snippet}
		{#snippet lede()}Sightline keeps the plan, the people and the progress in one place. Your team sees what changed, without another meeting.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Start free</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">See how it works</ButtonLink>
		{/snippet}
		{#snippet aside()}
			<div class="hidden md:block">
				<Rings seed="sightline" />
			</div>
		{/snippet}
	</Hero>

	<RingStats
		items={[
			{ value: '3 in 4', label: 'Teams that finish the week on plan', ring: 0.75 },
			{ value: '3', label: 'Reviews before each release', ring: 3 },
			{ value: '40%', label: 'Fewer status meetings in the first month', ring: 0.4 },
		]}
	/>

	<BentoSection title="Everything a team needs to see the work" intro="Five parts, each one plain." {tiles} picture="under" />

	<Section>
		{#snippet title()}How it works{/snippet}
		{#snippet intro()}Three steps, in order.{/snippet}
		<Steps
			items={[
				{ title: 'Add your team', body: 'Invite people by email. They join with one click.' },
				{ title: 'Make a plan', body: 'Pick a project and set the dates. Add the people who own each part.' },
				{ title: 'Check the board', body: 'Open the board each morning. Changes show up as they happen.' },
			]}
		/>
	</Section>

	<ShowcaseSection title="See the week in one screen" lede="The overview sits beside the numbers, so the plan and the progress read together." ground="page" layout="stacked">
		<AppWindow url="app.sightline.io/paperplane/overview">
			<div class="flex flex-col gap-4 p-4">
				<div class="grid grid-cols-3 gap-4">
					<KpiStat label="Visitors" value="58,074" delta={16} />
					<KpiStat label="Signed up" value="2,381" delta={19} />
					<KpiStat label="Came back" value="41%" delta={-2} />
				</div>
				<TrendChart label="Visitors a day" points={visitors} height={150} />
			</div>
		</AppWindow>
	</ShowcaseSection>

	<MaterialBand preset="carbon-twill" />

	<Section>
		{#snippet title()}Pricing{/snippet}
		{#snippet intro()}Pick the plan that fits your team. Change it later.{/snippet}
		<PricingPlans {plans} />
	</Section>

	<Container class="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
		<div class="flex flex-col gap-3">
			<h2 class="text-3xl font-medium tracking-tight text-balance">Questions</h2>
			<p class="leading-relaxed text-muted-foreground">The ones people ask first.</p>
		</div>
		<FaqList items={faq} />
	</Container>
</main>

<SiteFooter site="Sightline" tagline="Plain answers about your work." {columns} class="mt-24 md:mt-32" />
