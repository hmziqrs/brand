<script lang="ts">
	import { siGithub, siDiscord, siTelegram, siPagerduty, siVercel, siCloudflare } from 'simple-icons';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BellOff from '@lucide/svelte/icons/bell-off';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import AppWindow from '$brand/blocks/saas/app-window.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import KpiStat from '$brand/blocks/showcase/kpi-stat.svelte';
	import AlertCard from '$brand/blocks/showcase/alert-card.svelte';
	import LiveFeed from '$brand/blocks/showcase/live-feed.svelte';
	import BarList from '$brand/blocks/showcase/bar-list.svelte';
	import ActivityHeatmap from '$brand/blocks/showcase/activity-heatmap.svelte';
	import GoalMeter from '$brand/blocks/showcase/goal-meter.svelte';
	import ProductScope from '$moves/new/product-scope.svelte';
	import ProductLockup from '$moves/new/product-lockup.svelte';
	import InlineRing from '$moves/new/inline-ring.svelte';
	import SpecCounters from '$moves/new/spec-counters.svelte';
	import PricingSlab from '$moves/new/pricing-slab.svelte';
	import FamilyFooter from '$moves/new/family-footer.svelte';
	import { latency, checks, errors, feed } from '$moves/new/tarnish-data';

	const alertValues = latency.slice(14, 26).map((p) => p.value);
	const integrations = [siGithub, siDiscord, siTelegram, siPagerduty, siVercel, siCloudflare];
</script>

<svelte:head><title>tarnish — uptime and errors, by hmziq</title></svelte:head>

<ProductScope hue="blue">
	<ProductLockup
		name="tarnish"
		kind="Monitoring"
		links={[
			{ label: 'Uptime', href: '#/p/new/tarnish' },
			{ label: 'Errors', href: '#/p/new/tarnish' },
			{ label: 'Status pages', href: '#/p/new/tarnish' },
			{ label: 'Pricing', href: '#/p/new/tarnish' }
		]}
		secondary={{ label: 'Sign in', href: '#/p/new/tarnish-app' }}
		cta={{ label: 'Start free', href: '#/p/new/tarnish-app' }}
	/>

	<section class="mx-auto max-w-[1320px] px-4 pt-16 text-center sm:px-8 lg:pt-28">
		<p class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em]">
			<span class="size-1.5 rounded-full bg-green"></span>All 6 of our own monitors are up
		</p>
		<h1 class="mx-auto mt-8 max-w-[14ch] text-[clamp(3.2rem,10vw,9.75rem)] leading-[0.9] font-medium tracking-[-0.055em]">
			Know before <InlineRing seed="tarnish-hero" rings={9} weight={1.5} spin label="Rings, one of them blue" class="mx-[0.04em] size-[0.86em] -translate-y-[0.04em]" /> your users do.
		</h1>
		<p class="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-foreground sm:text-[1.4rem]">
			Uptime checks every 30 seconds from 14 regions, plus the errors your code throws — in one quiet place, built for people who ship alone.
		</p>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
			<a href="#/p/new/tarnish-app" class="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground">Start free — no card <ArrowRight class="lucide size-4" /></a>
			<a href="#/p/new/tarnish-app" class="inline-flex h-12 items-center rounded-lg border border-border px-6">Open the demo dashboard</a>
		</div>
	</section>

	<section class="relative mt-20">
		<div class="absolute inset-x-0 top-[18%] bottom-[-4rem] overflow-hidden">
			<ShaderMaterial preset="hammered-silver" rendering="image" controls={false} class="h-full w-full" sizes="100vw" />
			<div class="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background"></div>
		</div>
		<div class="relative mx-auto max-w-[1200px] px-4 sm:px-8">
			<AppWindow url="app.tarnish.dev/pagewell" class="collage-shadow">
				<div class="grid gap-6 p-5 sm:p-8">
					<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
						<KpiStat variant="card" label="Uptime, 30 days" value="99.94%" delta={0.03} against="vs September" />
						<KpiStat variant="card" label="Median response" value="203 ms" delta={-8} lowerIsBetter against="vs September" />
						<KpiStat variant="card" label="Errors" value="705" delta={-31} lowerIsBetter against="vs September" />
						<KpiStat variant="card" label="Incidents" value="2" against="both closed" />
					</div>
					<TrendChart points={latency} label="Median response time, ms" height={200} names={['October', 'September']} axis={(n) => `${n}`} />
				</div>
			</AppWindow>
			<div class="relative mt-4 grid gap-4 md:grid-cols-2 lg:absolute lg:right-[-2rem] lg:bottom-[-5rem] lg:mt-0 lg:w-[25rem] lg:grid-cols-1">
				<AlertCard
					title="api.pagewell.app is slow"
					when="Oct 23, 14:02 UTC"
					values={alertValues}
					at={7}
					cause="Median went from 190 ms to 450 ms after deploy 8f3c2e. One alert sent; 38 duplicate checks folded into it."
					class="collage-shadow bg-card dark:bg-card"
				/>
			</div>
		</div>
	</section>

	<div class="h-24 lg:h-40"></div>

	<SpecCounters
		variant="band"
		kicker="What a $9 month gets you"
		items={[
			{ value: '30', unit: 'sec', label: 'between checks, from every region' },
			{ value: '14', unit: 'regions', label: 'so one bad network never pages you' },
			{ value: '1', unit: 'alert', label: 'per incident — not forty', note: 'duplicates are folded' },
			{ value: '50k', unit: 'errors', label: 'kept for 90 days, grouped by cause' }
		]}
	/>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
			<h2 class="text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em]">Everything that can go grey, watched.</h2>
			<p class="max-w-xl text-xl leading-relaxed lg:justify-self-end">Silver tarnishes slowly, then all at once. So do apps. tarnish watches the three places it usually starts.</p>
		</div>
		<div class="mt-14 grid gap-4 lg:grid-cols-6">
			<article class="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-4">
				<header>
					<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Uptime</p>
					<h3 class="mt-3 text-3xl font-medium tracking-tight">Six months of failures. Mostly empty.</h3>
				</header>
				<div class="overflow-x-auto"><ActivityHeatmap days={checks} start="2026-05-02" label="Failed checks per day, pagewell.app" unit="failed checks" /></div>
			</article>
			<article class="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-2">
				<header>
					<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Error budget</p>
					<h3 class="mt-3 text-3xl font-medium tracking-tight">How much down you can still afford.</h3>
				</header>
				<p class="flex items-baseline gap-2 leading-none"><span class="text-[5.5rem] font-medium tracking-[-0.05em] tabular-nums">17</span><span class="font-mono text-sm uppercase tracking-widest text-primary">min left</span></p>
				<p class="text-lg leading-snug">At 99.9% you get 43 minutes a month. One slow deploy spent 26.</p>
				<GoalMeter label="Downtime used, October" current={26} target={43} elapsed={0.97} unit=" min" class="mt-auto" />
			</article>
			<article class="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
				<header>
					<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Errors</p>
					<h3 class="mt-3 text-3xl font-medium tracking-tight">Grouped by cause, ranked by pain.</h3>
				</header>
				<BarList rows={errors} label="Top errors this week" mono />
			</article>
			<article class="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
				<header class="flex items-start justify-between gap-4">
					<div>
						<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Feed</p>
						<h3 class="mt-3 text-3xl font-medium tracking-tight">Quiet unless it matters.</h3>
					</div>
					<BellOff class="lucide size-6 text-muted-foreground" />
				</header>
				<LiveFeed events={feed} limit={5} />
			</article>
		</div>
	</section>

	<section class="border-t border-border bg-band">
		<div class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-28">
			<div class="mb-12 flex flex-wrap items-end justify-between gap-6">
				<h2 class="max-w-[16ch] text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em]">Priced for one person and a side project.</h2>
				<div class="flex flex-col gap-3">
					<p class="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Alerts go to</p>
					<div class="flex flex-wrap gap-5 text-foreground/80">
						{#each integrations as icon (icon.slug)}<BrandIcon {icon} label={icon.title} class="size-6" />{/each}
					</div>
				</div>
			</div>
			<PricingSlab
				seed="tarnish"
				plans={[
					{ name: 'Hobby', price: '$0', per: 'forever', blurb: 'Three monitors and a status page for the thing you built this weekend.', features: ['3 monitors, 3-minute checks', '5,000 errors a month', 'Email alerts', 'One status page'], cta: 'Start free' },
					{ name: 'Indie', price: '$9', per: 'a month', blurb: 'Everything one person needs to sleep through the night.', features: ['25 monitors, 30-second checks', '50,000 errors, kept 90 days', 'Discord, Telegram, SMS', 'Custom domain status page', 'Cron heartbeats'], cta: 'Start a 14-day trial', pick: true },
					{ name: 'Studio', price: '$29', per: 'a month', blurb: 'For two to five people sharing the pager.', features: ['100 monitors', '250,000 errors', 'PagerDuty and on-call rota', 'Up to 5 seats'], cta: 'Start a trial' }
				]}
			/>
		</div>
	</section>

	<FamilyFooter
		name="tarnish"
		preset="hammered-silver"
		line="Built by one person, for people like them. Every plan is month to month."
		columns={[
			{ title: 'Product', links: ['Uptime', 'Errors', 'Status pages', 'Heartbeats'] },
			{ title: 'Developers', links: ['API', 'SDKs', 'Our own status'] },
			{ title: 'hmziq', links: ['About', 'Changelog', 'Contact'] }
		]}
	/>
</ProductScope>

<style>
	:global(.collage-shadow) {
		box-shadow:
			0 1px 0 color-mix(in oklab, var(--foreground) 8%, transparent) inset,
			0 60px 120px -50px color-mix(in oklab, oklch(from var(--foreground) 0 0 0) 55%, transparent),
			0 30px 60px -30px color-mix(in oklab, oklch(from var(--foreground) 0 0 0) 35%, transparent);
	}
</style>
