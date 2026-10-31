<script lang="ts">
	import Activity from '@lucide/svelte/icons/activity';
	import Bug from '@lucide/svelte/icons/bug';
	import Clock from '@lucide/svelte/icons/clock';
	import Globe from '@lucide/svelte/icons/globe';
	import Bell from '@lucide/svelte/icons/bell';
	import Settings from '@lucide/svelte/icons/settings';
	import Plus from '@lucide/svelte/icons/plus';
	import AppShell from '$brand/blocks/app/shell/app-shell.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import WorkspaceSwitcher from '$brand/blocks/app/account/workspace-switcher.svelte';
	import UserMenu from '$brand/blocks/app/account/user-menu.svelte';
	import StatGrid from '$brand/blocks/app/metrics/stat-grid.svelte';
	import StatCard from '$brand/blocks/app/metrics/stat-card.svelte';
	import UsageMeter from '$brand/blocks/app/metrics/usage-meter.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import MaterialSparkline from '$brand/components/material-sparkline.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import LiveFeed from '$brand/blocks/showcase/live-feed.svelte';
	import type { NavGroup } from '$brand/blocks/app/shell/types.js';
	import type { Theme } from '$brand/blocks/app/account/types.js';
	import ProductScope from '$moves/new/product-scope.svelte';
	import InlineRing from '$moves/new/inline-ring.svelte';
	import AccentSlab from '$moves/new/accent-slab.svelte';
	import FleetTable from '$moves/new/fleet-table.svelte';
	import ErrorTable from '$moves/new/error-table.svelte';
	import { latency, feed, fleet, errorGroups } from '$moves/new/tarnish-data';
	import { prefs } from '$studio/prefs.svelte';

	const here = '#/p/new/tarnish-app';
	const nav: NavGroup[] = [
		{
			label: 'tarnish',
			items: [
				{ label: 'Overview', href: here, icon: Activity },
				{ label: 'Monitors', href: `${here}/monitors`, icon: Globe },
				{ label: 'Errors', href: `${here}/errors`, icon: Bug },
				{ label: 'Heartbeats', href: `${here}/cron`, icon: Clock },
				{ label: 'Alerts', href: `${here}/alerts`, icon: Bell }
			]
		},
		{ label: 'Account', items: [{ label: 'Settings', href: `${here}/settings`, icon: Settings }] }
	];

	const theme = $derived<Theme>(prefs.dark ? 'dark' : 'light');
	const spark = latency.map((p) => p.value);
	const uptime = latency.map((_, i) => (i === 21 ? 97.8 : i === 22 ? 99.4 : 99.9 + ((i * 7) % 10) / 100));
	const errSpark = [42, 38, 51, 47, 33, 29, 31, 28, 44, 26, 22, 25, 19, 21];
</script>

<svelte:head><title>tarnish — tarnish overview</title></svelte:head>

{#snippet brand()}
	<WorkspaceSwitcher
		workspaces={[
			{ id: 'tn', name: 'tarnish', symbol: 'Tn', href: here },
			{ id: 'side', name: 'Side projects', symbol: 'Sp', href: here }
		]}
		currentId="tn"
	/>
{/snippet}

{#snippet account()}
	<UserMenu user={{ name: 'Ada Okafor', email: 'ada@tarnish.dev' }} items={[{ label: 'Billing', href: `${here}/billing` }]} {theme} onThemeChange={(t) => { if ((t === 'dark') !== prefs.dark) prefs.toggleTheme(); }} />
{/snippet}

{#snippet topbar()}
	<Button size="sm"><Plus class="lucide" />New monitor</Button>
{/snippet}

<ProductScope hue="blue" tweak="tarnish">
	<AppShell {nav} currentPath={here} {brand} {account} {topbar} breadcrumbs={[{ label: 'tarnish', href: here }, { label: 'Overview' }]}>
		<AppPage>
			<AppPageHeader
				description="Ten monitors and five error groups, checked every 30 seconds from 14 regions."
				tabs={[
					{ label: 'Last 30 days', href: here },
					{ label: '7 days', href: `${here}/7d` },
					{ label: '24 hours', href: `${here}/24h` }
				]}
				currentPath={here}
			>
				{#snippet title()}
					<span class="flex items-center gap-3"><InlineRing seed="tarnish" rings={6} weight={2.5} class="size-8" />Overview</span>
				{/snippet}
			</AppPageHeader>

			<AccentSlab preset="brushed-alloy" seed="tarnish-status" size="sm" grain={0.16} ring={false} class="mt-6">
				<div class="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
					<div class="flex min-w-0 items-center gap-4">
						<InlineRing seed="tarnish-status" rings={7} weight={2} class="slab-glyph hidden size-14 sm:inline-block" />
						<div class="min-w-0">
						<p class="text-2xl font-medium tracking-tight sm:text-3xl">1 down, 2 slow, 6 up.</p>
						<p class="mt-1 text-[0.95rem] opacity-85">status.tarnish.dev is failing from 11 of 14 regions. One alert sent; smtp and billing-sync are slow but have not paged anyone.</p>
						</div>
					</div>
					<span class="slab-btn inline-flex h-9 items-center rounded-md px-3.5 text-sm font-medium">Open the incident</span>
				</div>
			</AccentSlab>

			<StatGrid columns={4} class="mt-6">
				<StatCard label="Uptime" value="99.94%" trend={{ change: 0.03, good: 'up', format: 'points', comparison: 'vs September' }}>
					{#snippet chart()}<MaterialSparkline values={uptime} label="Uptime a day, last 30 days, one dip on Oct 23" preset="hammered-silver" />{/snippet}
				</StatCard>
				<StatCard label="Median response" value="203 ms" trend={{ change: -0.08, good: 'down', comparison: 'vs September' }}>
					{#snippet chart()}<MaterialSparkline values={spark} label="Median response a day, last 30 days, one spike" preset="hammered-silver" />{/snippet}
				</StatCard>
				<StatCard label="Errors" value="705" trend={{ change: -0.31, good: 'down', comparison: 'vs September' }}>
					{#snippet chart()}<MaterialSparkline values={errSpark} label="Errors a day, last 14 days, falling" preset="hammered-silver" />{/snippet}
				</StatCard>
				<StatCard label="Open incidents" value="1" hint="status.tarnish.dev, open 6 min · 2 closed this month" />
			</StatGrid>

			<div class="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
				<section class="min-w-0 rounded-xl border border-border p-5">
					<TrendChart points={latency} label="Median response time, ms" height={220} names={['October', 'September']} axis={(n) => `${n}`} />
				</section>
				<section class="flex min-w-0 flex-col gap-5 rounded-xl border border-border p-5">
					<LiveFeed events={feed} limit={5} />
					<UsageMeter label="Checks this month" used={2_310_400} limit={2_678_400} unit="checks" resetsOn="Nov 1" class="mt-auto" />
				</section>
			</div>

			<section class="mt-8">
				<div class="mb-3 flex flex-wrap items-end justify-between gap-3">
					<div>
						<h2 class="text-lg font-medium tracking-tight">Monitors</h2>
						<p class="text-sm text-muted-foreground">Grouped by where they run. Sort by uptime to see the worst first.</p>
					</div>
				</div>
				<FleetTable rows={fleet} href={here} />
			</section>

			<section class="mt-8 mb-24">
				<div class="mb-3">
					<h2 class="text-lg font-medium tracking-tight">Error groups</h2>
					<p class="text-sm text-muted-foreground">One row per cause, with the release that started it.</p>
				</div>
				<ErrorTable rows={errorGroups} href={here} />
			</section>
		</AppPage>
	</AppShell>
</ProductScope>

<style>
	:global(.slab-glyph) {
		--pa: var(--on-pa);
		--foreground: var(--on-pa);
	}
	.slab-btn {
		background: var(--on-pa);
		color: var(--pa-fill);
	}
</style>
