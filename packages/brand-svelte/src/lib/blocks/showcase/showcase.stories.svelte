<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RetentionGrid from './retention-grid.svelte'
	import FunnelChart from './funnel-chart.svelte'
	import TrendChart from './trend-chart.svelte'
	import KpiStat from './kpi-stat.svelte'
	import BarList from './bar-list.svelte'
	import LiveFeed from './live-feed.svelte'
	import GoalMeter from './goal-meter.svelte'
	import AlertCard from './alert-card.svelte'
	import ActivityHeatmap from './activity-heatmap.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { visitors, funnel, cohorts, events, pages, signups, activity } from './demo.js'

	const { Story } = defineMeta({
		title: 'Showcase/Product visuals',
		parameters: { layout: 'padded' },
	})
</script>

<!-- Cohort retention: darker orange, more came back. With numbers, and compact. Sightline's example data. -->
<Story name="Retention grid" asChild>
	<div class="grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
		<RetentionGrid {cohorts} />
		<RetentionGrid {cohorts} numbers={false} />
	</div>
</Story>

<!-- Where people leave: rows with the share kept, or columns. -->
<Story name="Funnel" asChild>
	<div class="grid max-w-5xl gap-10 md:grid-cols-2">
		<FunnelChart steps={funnel} />
		<FunnelChart steps={funnel} variant="columns" />
	</div>
</Story>

<!-- This period against the last; hover or the arrow keys for a day. -->
<Story name="Trend chart" asChild>
	<div class="max-w-3xl"><TrendChart label="Visitors a day" points={visitors} /></div>
</Story>

<!-- Numbers and how they moved. -->
<Story name="KPI stats" asChild>
	<div class="grid max-w-4xl gap-4 sm:grid-cols-3">
		<KpiStat variant="card" label="Visitors" value="58,074" delta={16} against="vs the 30 days before" />
		<KpiStat variant="card" label="Signed up" value="2,381" delta={19} against="vs the 30 days before" />
		<KpiStat variant="card" label="Came back" value="41%" delta={-2} against="vs the 30 days before" />
	</div>
</Story>

<!-- A ranked list with bars behind the labels. -->
<Story name="Bar list" asChild>
	<div class="max-w-md"><BarList label="Top pages" rows={pages} mono /></div>
</Story>

<!-- Who's here right now. -->
<Story name="Live feed" asChild>
	<div class="max-w-md"><LiveFeed {events} online={38} /></div>
</Story>

<!-- A goal, and whether the pace gets there. -->
<Story name="Goal" asChild>
	<div class="flex flex-wrap gap-12">
		<GoalMeter label="paid sign-ups this month" current={288} target={400} elapsed={0.6} />
		<GoalMeter label="paid sign-ups this month" current={180} target={400} elapsed={0.6} />
	</div>
</Story>

<!-- An alert that fired, with the drop marked on the line. -->
<Story name="Alert" asChild>
	<AlertCard class="max-w-sm" title="Sign-ups fell 30%" when="Tuesday, after the 2.4 release" values={signups} at={9} cause="The drop starts with release 2.4. Most people now leave at the card step.">
		{#snippet actions()}<Button size="sm" variant="outline">Look into it</Button><Button size="sm" variant="ghost">Mute</Button>{/snippet}
	</AlertCard>
</Story>

<!-- A year of activity, a square a day, filling the width it's given. -->
<Story name="Activity heatmap" asChild>
	<ActivityHeatmap label="Releases and commits" unit="changes" days={activity} start="2025-10-13" />
</Story>
