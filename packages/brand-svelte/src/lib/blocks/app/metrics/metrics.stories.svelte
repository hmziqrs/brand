<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import StatCard from './stat-card.svelte'

	const { Story } = defineMeta({
		title: 'App/Metrics',
		component: StatCard,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import MetricTrend from './metric-trend.svelte'
	import StatGrid from './stat-grid.svelte'
	import UsageMeter from './usage-meter.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { overview, usage } from '@hmziq/brand-core/app/demo-data'

	const cards = overview['30']
</script>

{#snippet barChart()}
	<div class="flex h-8 items-end gap-1" aria-hidden="true">
		{#each [40, 55, 45, 62, 58, 72, 68, 84] as h, i (i)}
			<div class="w-full rounded-xs {i === 7 ? 'bg-primary' : 'bg-muted'}" style="height: {h}%"></div>
		{/each}
	</div>
{/snippet}

{#snippet upgradeAction()}
	<Button type="button" variant="link" size="sm" class="h-auto p-0">Upgrade</Button>
{/snippet}

<Story name="Trend, rising" asChild>
	<div class="flex flex-wrap items-center gap-6 bg-background px-4 py-4">
		<MetricTrend change={0.126} good="up" comparison="vs last 30 days" />
		<MetricTrend change={0.09} good="down" comparison="vs last 30 days" />
		<MetricTrend change={0.21} good="neither" comparison="vs last 90 days" />
	</div>
</Story>

<Story name="Trend, falling" asChild>
	<div class="flex flex-wrap items-center gap-6 bg-background px-4 py-4">
		<MetricTrend change={-0.06} good="up" comparison="vs last 30 days" />
		<MetricTrend change={-2.8} good="down" format="points" comparison="vs last 30 days" />
		<MetricTrend change={-0.11} good="neither" comparison="vs last 90 days" />
	</div>
</Story>

<Story name="Trend, no change" asChild>
	<div class="flex flex-wrap items-center gap-6 bg-background px-4 py-4">
		<MetricTrend change={0} good="up" comparison="vs last 30 days" />
		<MetricTrend change={0} good="down" comparison="vs last 30 days" />
		<MetricTrend change={0} good="neither" />
	</div>
</Story>

<Story name="Trend, formats" asChild>
	<div class="flex flex-wrap items-center gap-6 bg-background px-4 py-4">
		<MetricTrend change={0.124} format="percent" />
		<MetricTrend change={-4.1} format="points" />
		<MetricTrend change={1234} format="number" />
	</div>
</Story>

<Story name="Card" asChild>
	<div class="max-w-xs">
		<StatCard label="Visitors" value={cards[0].value} trend={{ change: cards[0].change, good: cards[0].good, format: cards[0].format, comparison: cards[0].comparison }} />
	</div>
</Story>

<Story name="Card, hint and chart" asChild>
	<div class="max-w-xs">
		<StatCard label="Visitors" value={cards[0].value} trend={{ change: cards[0].change, good: cards[0].good, format: cards[0].format, comparison: cards[0].comparison }} hint="Unique visitors across all pages" chart={barChart} />
	</div>
</Story>

<Story name="Card, pending" asChild>
	<div class="max-w-2xl">
		<StatGrid columns={2}>
			<StatCard label="Visitors" value={cards[0].value} status="pending" />
			<StatCard label="Sign-ups" value={cards[1].value} trend={{ change: cards[1].change, good: cards[1].good, format: cards[1].format }} />
		</StatGrid>
	</div>
</Story>

<Story name="Card, error" asChild>
	<div class="max-w-2xl">
		<StatGrid columns={2}>
			<StatCard label="Bounce rate" value={cards[2].value} status="error" onRetry={() => {}} />
			<StatCard label="Page load time" value={cards[3].value} trend={{ change: cards[3].change, good: cards[3].good, format: cards[3].format }} />
		</StatGrid>
	</div>
</Story>

<Story name="Card, link" asChild>
	<div class="max-w-2xl">
		<StatGrid columns={2}>
			<StatCard label="Visitors" value={cards[0].value} href="/app/members" trend={{ change: cards[0].change, good: cards[0].good, format: cards[0].format }} />
			<StatCard label="Sign-ups" value={cards[1].value} href="/app/members" trend={{ change: cards[1].change, good: cards[1].good, format: cards[1].format }} />
		</StatGrid>
	</div>
</Story>

<Story name="Grid, demo cards" asChild>
	<div class="max-w-4xl">
		<StatGrid>
			{#each cards as stat (stat.label)}
				<StatCard label={stat.label} value={stat.value} trend={{ change: stat.change, good: stat.good, format: stat.format, comparison: stat.comparison }} />
			{/each}
		</StatGrid>
	</div>
</Story>

<Story name="Grid, two columns" asChild>
	<div class="max-w-xl">
		<StatGrid columns={2}>
			{#each cards.slice(0, 2) as stat (stat.label)}
				<StatCard label={stat.label} value={stat.value} trend={{ change: stat.change, good: stat.good, format: stat.format }} />
			{/each}
		</StatGrid>
	</div>
</Story>

<Story name="Grid, three columns" asChild>
	<div class="max-w-2xl">
		<StatGrid columns={3}>
			{#each cards.slice(0, 3) as stat (stat.label)}
				<StatCard label={stat.label} value={stat.value} trend={{ change: stat.change, good: stat.good, format: stat.format }} />
			{/each}
		</StatGrid>
	</div>
</Story>

<Story name="Grid, pending and error cards" asChild>
	<div class="max-w-4xl">
		<StatGrid>
			<StatCard label="Visitors" value={cards[0].value} status="pending" />
			<StatCard label="Sign-ups" value={cards[1].value} trend={{ change: cards[1].change, good: cards[1].good, format: cards[1].format }} />
			<StatCard label="Bounce rate" value={cards[2].value} status="error" onRetry={() => {}} />
			<StatCard label="Page load time" value={cards[3].value} trend={{ change: cards[3].change, good: cards[3].good, format: cards[3].format }} />
		</StatGrid>
	</div>
</Story>

<Story name="Meter, below the warning level" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter label="Events this month" used={usage.events.used} limit={usage.events.limit} unit={usage.events.unit} resetsOn="Resets on {usage.events.resetsOn}" />
	</div>
</Story>

<Story name="Meter, at the warning level" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter label="Seats" used={usage.seats.used} limit={usage.seats.limit} unit={usage.seats.unit} />
	</div>
</Story>

<Story name="Meter, at the limit" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter label="Events this month" used={usage.events.limit} limit={usage.events.limit} unit={usage.events.unit} resetsOn="Resets on {usage.events.resetsOn}" limitMessage="You've used every event this month. New events are dropped until it resets." action={upgradeAction} />
	</div>
</Story>

<Story name="Meter, over the limit" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter label="Events this month" used={12420} limit={usage.events.limit} unit={usage.events.unit} resetsOn="Resets on {usage.events.resetsOn}" limitMessage="You've used every event this month. New events are dropped until it resets." action={upgradeAction} />
	</div>
</Story>

<Story name="Meter, no limit" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter label="Projects" used={12} limit={null} unit="projects" />
	</div>
</Story>

<Story name="Meter, ring" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter variant="ring" label="Seats" used={5} limit={usage.seats.limit} unit={usage.seats.unit} />
	</div>
</Story>

<Story name="Meter, ring, at the warning level" asChild>
	<div class="max-w-md px-4 py-4">
		<UsageMeter variant="ring" label="Seats" used={usage.seats.used} limit={usage.seats.limit} unit={usage.seats.unit} />
	</div>
</Story>

<Story name="Meter, the demo row" asChild>
	<div class="grid max-w-4xl gap-3 sm:grid-cols-3">
		<div class="rounded-xl border border-border px-4 py-4">
			<UsageMeter label="Events this month" used={usage.events.used} limit={usage.events.limit} unit={usage.events.unit} resetsOn="Resets on {usage.events.resetsOn}" />
		</div>
		<div class="rounded-xl border border-border px-4 py-4">
			<UsageMeter variant="ring" label="Seats" used={usage.seats.used} limit={usage.seats.limit} unit={usage.seats.unit} />
		</div>
		<div class="rounded-xl border border-border px-4 py-4">
			<UsageMeter label="Data kept" used={usage.retention.used} limit={usage.retention.limit} unit={usage.retention.unit} />
		</div>
	</div>
</Story>

<Story name="Mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="flex flex-col gap-6">
		<StatGrid>
			{#each cards as stat (stat.label)}
				<StatCard label={stat.label} value={stat.value} trend={{ change: stat.change, good: stat.good, format: stat.format }} />
			{/each}
		</StatGrid>
		<div class="flex flex-col gap-6 bg-background px-4 py-4">
			<UsageMeter label="Events this month" used={usage.events.used} limit={usage.events.limit} unit={usage.events.unit} resetsOn="Resets on {usage.events.resetsOn}" />
			<UsageMeter variant="ring" label="Seats" used={usage.seats.used} limit={usage.seats.limit} unit={usage.seats.unit} />
		</div>
	</div>
</Story>
