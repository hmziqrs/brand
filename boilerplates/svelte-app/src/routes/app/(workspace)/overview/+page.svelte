<!--
  The overview (app-blocks.md, phase 7): four stat cards in a ruled grid,
  then the three usage meters. The date range is the header's action and
  lives in the `range` URL param, so a shared link shows the same numbers;
  the trend colors follow each stat's `good` direction, not its sign. The
  demo state switch runs the fake load, and state=limit shows the events
  meter full, with the message and the way out.
-->
<script lang="ts">
	import { page } from '$app/state';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import DataState from '$brand/blocks/app/states/data-state.svelte';
	import ErrorState from '$brand/blocks/app/states/error-state.svelte';
	import SkeletonStats from '$brand/blocks/app/states/skeleton-stats.svelte';
	import StatCard from '$brand/blocks/app/metrics/stat-card.svelte';
	import StatGrid from '$brand/blocks/app/metrics/stat-grid.svelte';
	import UsageMeter from '$brand/blocks/app/metrics/usage-meter.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { Skeleton } from '$brand/ui/skeleton/index.js';
	import { Segmented } from '$brand/index.js';
	import { overview, usage, type Range } from '@hmziq/brand-core/app/demo-data';
	import { DemoLoad } from '$lib/demo-load.svelte.js';

	const load = new DemoLoad(page.url.searchParams.get('state'));

	const ranges: Range[] = ['7', '30', '90'];
	const range = $derived(
		ranges.find((value) => value === page.url.searchParams.get('range')) ?? '30',
	);
	const stats = $derived(overview[range]);

	// The range is URL state like everything else: the link carries the demo
	// state along, so the switch keeps working through a change. It is a
	// real navigation — the same full load the Astro demo makes on a range
	// change, keeping the two demos at parity — which keeps this route
	// inside the two modules the plan allows it ($app/state, $app/forms).
	function setRange(next: string) {
		const url = new URL(page.url);
		if (next === '30') url.searchParams.delete('range');
		else url.searchParams.set('range', next);
		window.location.assign(url.pathname + url.search + url.hash);
	}

	// state=limit: the events meter stands at its limit, with the message.
	const events = $derived(
		load.state === 'limit' ? usage.events.limit : usage.events.used,
	);
</script>

<svelte:head>
	<!-- The document title the axe gate asks for on every demo page, matching
	     the header's word. -->
	<title>Overview — svelte-app</title>
</svelte:head>

{#snippet rangePicker()}
	<Segmented
		label="Date range"
		value={range}
		onValueChange={setRange}
		options={ranges.map((value) => ({ value, label: `${value} days` }))}
	/>
{/snippet}

{#snippet loadingGrid()}
	<div class="flex flex-col gap-6">
		<SkeletonStats count={4} />
		<!-- The meters' panel, sketched in the shapes the meters draw: a
		     label, the bar, the words for the two bar meters (the events
		     words wrap to two lines, so their bar is two lines tall); the
		     ring (size-18) with its two lines beside it for seats. -->
		<div class="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
			<div class="flex flex-col gap-2 bg-background px-4 py-4">
				<Skeleton class="h-5 w-24" />
				<Skeleton class="h-1.5 w-full" />
				<Skeleton class="h-10 w-full" />
			</div>
			<div class="flex items-center gap-4 bg-background px-4 py-4">
				<Skeleton class="size-18 rounded-full" />
				<div class="flex flex-col gap-1.5">
					<Skeleton class="h-5 w-24" />
					<Skeleton class="h-5 w-32" />
				</div>
			</div>
			<div class="flex flex-col gap-2 bg-background px-4 py-4">
				<Skeleton class="h-5 w-24" />
				<Skeleton class="h-1.5 w-full" />
				<Skeleton class="h-5 w-32" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet errorBlock()}
	<ErrorState kind={load.kind} onRetry={load.load} />
{/snippet}

<AppPage>
	<AppPageHeader title="Overview" actions={rangePicker} />

	<DataState status={load.status} loadingLabel="Loading the overview" class="mt-8">
		{#snippet loading()}
			{@render loadingGrid()}
		{/snippet}
		{#snippet error()}
			{@render errorBlock()}
		{/snippet}
		<div class="flex flex-col gap-6">
			<StatGrid>
				{#each stats as stat (stat.label)}
					<StatCard
						label={stat.label}
						value={stat.value}
						trend={{ change: stat.change, good: stat.good, format: stat.format, comparison: stat.comparison }}
					/>
				{/each}
			</StatGrid>

			<div class="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
				<div class="bg-background px-4 py-4">
					<UsageMeter
						label="Events this month"
						used={events}
						limit={usage.events.limit}
						unit={usage.events.unit}
						resetsOn={`Resets on ${usage.events.resetsOn}`}
						limitMessage="You've used every event this month. New events are dropped until it resets."
					>
						{#snippet action()}
							<Button variant="link" size="sm" class="h-auto p-0" href="/app/settings/billing">Upgrade</Button>
						{/snippet}
					</UsageMeter>
				</div>
				<div class="bg-background px-4 py-4">
					<UsageMeter variant="ring" label="Seats" used={usage.seats.used} limit={usage.seats.limit} unit={usage.seats.unit} />
				</div>
				<div class="bg-background px-4 py-4">
					<UsageMeter label="Data kept" used={usage.retention.used} limit={usage.retention.limit} unit={usage.retention.unit} />
				</div>
			</div>
		</div>
	</DataState>
</AppPage>
