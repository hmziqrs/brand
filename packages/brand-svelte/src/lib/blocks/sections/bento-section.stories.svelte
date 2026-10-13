<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BentoSection from './bento-section.svelte'
	import RetentionGrid from '../showcase/retention-grid.svelte'
	import FunnelChart from '../showcase/funnel-chart.svelte'
	import TrendChart from '../showcase/trend-chart.svelte'
	import KpiStat from '../showcase/kpi-stat.svelte'
	import BarList from '../showcase/bar-list.svelte'
	import LiveFeed from '../showcase/live-feed.svelte'
	import GoalMeter from '../showcase/goal-meter.svelte'
	import AlertCard from '../showcase/alert-card.svelte'
	import ActivityHeatmap from '../showcase/activity-heatmap.svelte'
	import { visitors, funnel, cohorts, events, pages, signups, activity } from '../showcase/demo.js'

	const { Story } = defineMeta({
		title: 'Sections/Bento',
		component: BentoSection,
		parameters: { layout: 'fullscreen' },
	})

	const deliveries = [
		{ label: 'invoice.paid', value: 48210 },
		{ label: 'customer.updated', value: 31904 },
		{ label: 'order.created', value: 22417 },
		{ label: 'subscription.renewed', value: 9380 },
	]
	const attempts = [
		{ id: '1', when: 'now', who: 'invoice.paid', what: 'delivered in 182 ms', tone: 'success' as const },
		{ id: '2', when: '4s', who: 'order.created', what: 'got a 503, retrying in 30s', tone: 'warning' as const },
		{ id: '3', when: '9s', who: 'customer.updated', what: 'delivered in 96 ms', tone: 'success' as const },
		{ id: '4', when: '15s', who: 'invoice.paid', what: 'delivered in 211 ms', tone: 'success' as const },
	]
</script>

{#snippet funnelCols()}<FunnelChart steps={funnel} variant="columns" callout={false} />{/snippet}
{#snippet retention()}<RetentionGrid {cohorts} numbers={false} legend={false} periods={6} />{/snippet}
{#snippet live()}<LiveFeed {events} limit={3} />{/snippet}
{#snippet goal()}<GoalMeter label="paid sign-ups" current={288} target={400} elapsed={0.6} />{/snippet}
{#snippet alert()}<AlertCard title="Sign-ups fell 30%" when="on Tuesday" values={signups} at={9} />{/snippet}
{#snippet trend()}<TrendChart label="Visitors a day" points={visitors} height={150} />{/snippet}
{#snippet top()}<BarList rows={pages} mono />{/snippet}
{#snippet kpis()}<div class="grid grid-cols-2 gap-4"><KpiStat label="Delivered first try" value="99.4%" delta={0.3} /><KpiStat label="Retried" value="41" delta={-12} lowerIsBetter /></div>{/snippet}
{#snippet types()}<BarList rows={deliveries} mono />{/snippet}
{#snippet log()}<LiveFeed events={attempts} limit={4} />{/snippet}
{#snippet latency()}<div class="flex flex-col gap-5"><KpiStat label="Median time to deliver" value="182 ms" delta={-8} lowerIsBetter /><KpiStat label="Slowest 5%" value="640 ms" delta={-3} lowerIsBetter /></div>{/snippet}
{#snippet heat()}<ActivityHeatmap label="Deploys" unit="deploys" days={activity} start="2025-10-13" />{/snippet}

{#snippet analytics()}
	<BentoSection
		title="Every question a product team asks, answered"
		intro="The five reports people actually use, built for you from the moments you name."
		tiles={[
			{ title: 'Funnels', body: 'Pick the steps from visit to payment. See how many make it through each one, and where the rest leave.', cols: 4, visual: funnelCols },
			{ title: 'Retention', body: 'Of the people who joined each week, how many came back.', cols: 2, visual: retention },
			{ title: 'Live view', body: "Who's on your site right now.", cols: 2, visual: live },
			{ title: 'Goals', body: 'A number for the month, filling in.', cols: 2, visual: goal },
			{ title: 'Alerts', body: 'Told when something changes.', cols: 2, visual: alert },
			{ title: 'Every day, against the last period', cols: 6, visual: trend },
		]}
	/>
{/snippet}

<!-- A: Sightline's analytics, every tile a different report. Example data. -->
<Story name="A Analytics" asChild>{@render analytics()}</Story>

<!-- B: For a developer product: what gets sent, how it went, the log. Hookline's example data. -->
<Story name="B Developer" asChild>
	<BentoSection
		align="start"
		title="Every webhook, accounted for"
		intro="What you send, what arrived, and what's being tried again."
		tiles={[
			{ title: 'What gets sent most', cols: 3, visual: types },
			{ title: 'This week', body: 'Delivered on the first try, and what needed another go.', cols: 3, visual: kpis },
			{ title: 'Every attempt, as it happens', cols: 4, rows: 2, visual: log },
			{ title: 'How fast', cols: 2, rows: 2, visual: latency },
			{ title: 'A year of deploys', cols: 6, visual: heat },
		]}
	/>
</Story>

<!-- C: Tiles in four tones: outline, orange, a material cover, glass on a material. -->
<Story name="C Mixed tones" asChild>
	<BentoSection
		title="One place for the whole product"
		tiles={[
			{ title: 'Goals', body: 'A number for the month, filling in.', cols: 2, tone: 'orange', visual: goal },
			{ title: 'Funnels', body: 'Where people leave, step by step.', cols: 4, visual: funnelCols },
			{ title: 'Made from your events', body: 'Name the moments that matter; the reports build themselves.', cols: 2, tone: 'material', preset: 'copper-sweep' },
			{ title: 'Retention', cols: 2, visual: retention },
			{ title: 'Alerts, anywhere', body: 'Email or Slack, the moment it changes.', cols: 2, tone: 'glass', preset: 'liquid-chrome' },
		]}
	/>
</Story>

<!-- D: The whole grid on the orange band; the tiles keep the page's colors. -->
<Story name="D On the band" asChild>
	<BentoSection
		ground="band"
		title="Answers, not dashboards"
		tiles={[
			{ title: 'Funnels', cols: 3, visual: funnelCols },
			{ title: 'Top pages', cols: 3, visual: top },
			{ title: 'Live view', cols: 2, visual: live },
			{ title: 'Goals', cols: 2, visual: goal },
			{ title: 'Retention', cols: 2, visual: retention },
		]}
	/>
</Story>

<!-- E: The grid on a material, every tile in smoked glass. -->
<Story name="E On a material" asChild>
	<BentoSection
		ground="material"
		preset="etched-silk"
		title="Every report in one glance"
		tiles={[
			{ title: 'Funnels', cols: 4, visual: funnelCols },
			{ title: 'Goals', cols: 2, visual: goal },
			{ title: 'Live view', cols: 3, visual: live },
			{ title: 'Top pages', cols: 3, visual: top },
		]}
	/>
</Story>
