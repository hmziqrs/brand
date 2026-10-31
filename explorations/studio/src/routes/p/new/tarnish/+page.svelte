<script lang="ts">
	import { siGithub, siDiscord, siTelegram, siPagerduty, siVercel, siCloudflare } from 'simple-icons';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Pause from '@lucide/svelte/icons/pause';
	import Play from '@lucide/svelte/icons/play';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import Bento from '$brand/components/bento.svelte';
	import BentoTile from '$brand/components/bento-tile.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import BarList from '$brand/blocks/showcase/bar-list.svelte';
	import ActivityHeatmap from '$brand/blocks/showcase/activity-heatmap.svelte';
	import GoalMeter from '$brand/blocks/showcase/goal-meter.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ProductScope from '$moves/new/product-scope.svelte';
	import ProductLockup from '$moves/new/product-lockup.svelte';
	import InlineRing from '$moves/new/inline-ring.svelte';
	import PricingSlab from '$moves/new/pricing-slab.svelte';
	import RegionPulse from '$moves/new/region-pulse.svelte';
	import AlertFold from '$moves/new/alert-fold.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import GlassStage from '$moves/flora/glass-stage.svelte';
	import DitherFooter from '$moves/flora/dither-footer.svelte';
	import TerminalChip from '$moves/northflank/terminal-chip.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import LoopDiagram from '$moves/northflank/loop-diagram.svelte';
	import { checks, errors, monitors } from '$moves/new/tarnish-data';

	const here = '#/p/new/tarnish';
	const app = '#/p/new/tarnish-app';
	const integrations = [siGithub, siDiscord, siTelegram, siPagerduty, siVercel, siCloudflare];
	const regions = ['Frankfurt', 'London', 'Virginia', 'Chicago', 'San Francisco', 'São Paulo', 'Johannesburg', 'Mumbai', 'Singapore', 'Tokyo', 'Sydney', 'Dubai', 'Warsaw', 'Amsterdam'];

	let playing = $state(true);
	let spent = $state(26);
	const budget = 43;

	const loop = [
		{ label: 'check', detail: 'every 30 s · 14 regions', log: 'GET api.tarnish.dev → 200 in 184 ms from fra' },
		{ label: 'confirm', detail: 'three regions must agree', log: 'nrt, sin, syd timed out · outage confirmed' },
		{ label: 'fold', detail: 'one incident, not forty', log: '38 failed checks folded into incident #212' },
		{ label: 'tell you', detail: 'Discord · Telegram · SMS', log: 'Sent one alert to #ops · resolved after 2m 10s' }
	];

	const columns = [
		{ title: 'Product', links: [{ label: 'Uptime', href: here }, { label: 'Errors', href: here }, { label: 'Status pages', href: here }, { label: 'Heartbeats', href: here }] },
		{ title: 'Developers', links: [{ label: 'API', href: here }, { label: 'SDKs', href: here }, { label: 'Our own status', href: here }] },
		{ title: 'Family', links: [{ label: 'patina', href: '#/p/new/patina' }, { label: 'oxbox', href: '#/p/new/oxbox' }, { label: 'hmziq.rs', href: 'https://hmziq.rs' }] },
		{ title: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/hmziqrs' }, { label: 'Changelog', href: here }, { label: 'Contact', href: here }] }
	];
</script>

{#snippet tileHead(kicker: string, title: string, body: string)}
	<div class="flex flex-col gap-1.5">
		<p class="font-mono text-[0.6875rem] tracking-wide text-primary uppercase">{kicker}</p>
		<h3 class="text-xl font-medium tracking-[-0.02em] text-foreground md:text-2xl">{title}</h3>
		<p class="max-w-[52ch] leading-snug text-foreground/85">{body}</p>
	</div>
{/snippet}

<svelte:head><title>tarnish — uptime and errors, by hmziq</title></svelte:head>

<ProductScope hue="blue" tweak="tarnish">
	<ProductLockup
		name="tarnish"
		kind="Monitoring"
		links={[
			{ label: 'Uptime', href: here },
			{ label: 'Errors', href: here },
			{ label: 'Status pages', href: here },
			{ label: 'Pricing', href: here }
		]}
		secondary={{ label: 'Sign in', href: app }}
		cta={{ label: 'Start free', href: app }}
	/>

	<section class="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden pt-24 pb-10">
		<ShaderMaterial preset="hammered-silver" rendering="live" animated={playing} controls={false} loading="eager" fetchpriority="high" class="absolute inset-0 -z-20 h-full w-full" />
		<RustGridField mode="reveal" cell={56} veil={0.82} fade="none" gap={0} fresh="--pa" stain="--pa" class="-z-10" />

		<div class="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
			<p class="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-mono text-xs tracking-wide text-foreground uppercase">
				<span class="size-2 rounded-full bg-green motion-safe:animate-pulse"></span>All 6 of our own monitors are up
			</p>
			<h1 class="mt-6 max-w-[12ch] text-[clamp(3.4rem,10.5vw,10rem)] leading-[0.88] font-medium tracking-[-0.055em] text-foreground [text-shadow:0_2px_40px_var(--background)]">
				Know before your users <span class="text-primary">do.</span>
			</h1>
			<div class="mt-10 flex flex-wrap items-end justify-between gap-6">
				<Glass variant="smoke" class="max-w-[560px] p-6 sm:p-7">
					<p class="text-xl leading-snug text-foreground sm:text-2xl">Uptime checks every 30 seconds from 14 regions, and the errors your code throws, in one quiet place for people who ship alone.</p>
					<div class="mt-6 flex flex-wrap gap-3">
						<Button href={app} size="lg" class="h-12 rounded-full px-6 text-base">Start free, no card</Button>
						<Button href={app} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Open the demo <ArrowRight class="lucide" /></Button>
					</div>
				</Glass>
				<div class="flex flex-col items-start gap-3 sm:items-end">
					<TerminalChip prompt="tarnish ›" text="watch api.tarnish.dev --every 30s" class="bg-background" />
					<button
						type="button"
						onclick={() => (playing = !playing)}
						aria-pressed={!playing}
						class="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm text-foreground hover:text-primary"
					>
						{#if playing}<Pause class="lucide size-4" />Pause the silver{:else}<Play class="lucide size-4" />Play the silver{/if}
					</button>
				</div>
			</div>
		</div>
	</section>

	<div class="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground" aria-hidden="true">
		<div class="marquee flex w-max gap-10 font-mono text-sm tracking-[0.14em] uppercase">
			{#each [0, 1] as copy (copy)}
				{#each regions as r (r + copy)}
					<span class="flex items-center gap-10">{r}<span class="size-2 bg-current"></span></span>
				{/each}
			{/each}
		</div>
	</div>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 md:py-32">
		<div class="mb-10 grid gap-6 md:mb-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
			<h2 class="text-[clamp(2.4rem,5.4vw,4.75rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance">What tarnish does while you sleep.</h2>
			<p class="text-lg leading-snug text-foreground md:text-xl">Every tile runs the real rules. Fail a region, replay an outage, spend the error budget.</p>
		</div>

		<Bento class="auto-rows-[minmax(12rem,auto)] gap-4">
			<BentoTile cols={4} rows={2} class="bg-card/40">
				<div class="flex h-full flex-col gap-6">
					{@render tileHead('01 · Checks', 'Fourteen regions, one opinion.', 'A single bad network never pages you. Click regions to fail them and watch when tarnish decides it is a real outage.')}
					<RegionPulse class="mt-auto" />
				</div>
			</BentoTile>

			<div class="relative isolate flex min-h-80 flex-col overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground md:col-span-2 md:row-span-2 md:p-7 lg:col-span-2">
				<InlineRing seed="tarnish-one" rings={10} class="slab-ring pointer-events-none absolute -top-24 -right-24 -z-10 size-80 opacity-60" />
				<p class="font-mono text-xs tracking-wide uppercase">Alerts</p>
				<p class="mt-auto text-[clamp(6rem,12vw,10rem)] leading-[0.82] font-medium tracking-[-0.06em] tabular-nums">1</p>
				<h3 class="mt-4 text-2xl font-medium tracking-[-0.02em] text-balance">alert per incident, not forty.</h3>
				<p class="mt-2 leading-snug opacity-90">Duplicates fold into the open incident. You get one message and one message when it ends.</p>
			</div>

			<BentoTile cols={3}>
				<div class="grid h-full gap-6">
					{@render tileHead('02 · Folding', 'Thirty-eight failures, one ping.', 'Watch an outage stream in and collapse into a single alert.')}
					<AlertFold />
				</div>
			</BentoTile>

			<BentoTile cols={3}>
				<div class="flex h-full flex-col gap-5">
					{@render tileHead('03 · Error budget', 'How much down you can still afford.', 'At 99.9% you get 43 minutes a month. Drag to spend some.')}
					<p class="flex items-baseline gap-2 leading-none"><span class="text-[4.5rem] font-medium tracking-[-0.05em] tabular-nums">{Math.max(0, budget - spent)}</span><span class="font-mono text-sm tracking-widest text-primary uppercase">min left</span></p>
					<label class="flex items-center gap-3 text-sm text-muted-foreground">
						<span class="w-16 shrink-0">Spent</span>
						<input type="range" min="0" max={budget + 10} bind:value={spent} class="h-1.5 min-w-0 flex-1 accent-primary" aria-label="Minutes of downtime spent" />
						<span class="w-14 shrink-0 text-right font-mono text-foreground tabular-nums">{spent} min</span>
					</label>
					<GoalMeter label="Downtime used, October" current={spent} target={budget} elapsed={0.97} unit=" min" class="mt-auto" />
				</div>
			</BentoTile>

			<BentoTile cols={3}>
				<div class="flex h-full flex-col gap-6">
					{@render tileHead('04 · Errors', 'Grouped by cause, ranked by pain.', 'Stack traces collapse into one row per cause, with the deploy that started it.')}
					<BarList rows={errors} label="Top errors this week" mono class="mt-auto" />
				</div>
			</BentoTile>

			<BentoTile cols={3}>
				<div class="flex h-full flex-col gap-6">
					{@render tileHead('05 · History', 'Six months of failures. Mostly empty.', 'One square a day for tarnish.dev. The dark ones are the days worth reading about.')}
					<div class="mt-auto overflow-x-auto"><ActivityHeatmap days={checks} start="2026-05-02" label="Failed checks per day, tarnish.dev" unit="failed checks" /></div>
				</div>
			</BentoTile>
		</Bento>
	</section>

	<section class="border-t border-border">
		<div class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8">
			<div class="text-center">
				<MonoLabel index="06" text="The alert loop" class="justify-center" />
				<h2 class="mx-auto mt-5 max-w-[16ch] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1] font-medium tracking-[-0.04em]">Check. Confirm. Fold. Tell you.</h2>
			</div>
			<LoopDiagram steps={loop} count={1209600} counterLabel="checks run today" counterClass="font-sans font-medium tracking-[-0.05em]" class="mt-16" />
		</div>
	</section>

	<GlassStage preset="hammered-silver" glass="frost" align="right">
		<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">Quiet hours</p>
		<h2 class="mt-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.03em]">Sleep through the night.</h2>
		<p class="mt-5 text-xl leading-snug text-foreground">Between 23:00 and 07:00 only confirmed outages wake you. Slow responses and new error types wait for the morning digest.</p>
		<ul class="mt-7 space-y-3 text-lg text-foreground">
			{#each monitors.slice(0, 4) as m (m.name)}
				<li class="flex items-center justify-between gap-4">
					<span class="flex items-center gap-3"><span class="size-2.5 {m.state === 'degraded' ? 'bg-yellow' : 'bg-primary'}"></span>{m.name}</span>
					<span class="font-mono text-sm text-muted-foreground tabular-nums">{m.uptime}</span>
				</li>
			{/each}
		</ul>
	</GlassStage>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<div class="mb-12 flex flex-wrap items-end justify-between gap-6">
			<h2 class="max-w-[16ch] text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.96] font-medium tracking-[-0.04em]">Priced for one person and a side project.</h2>
			<div class="flex flex-col gap-3">
				<p class="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Alerts go to</p>
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
	</section>

	<DitherFooter name="tarnish" maker="by hmziq" giant="tarnish" preset="hammered-silver" animate {columns} line="Uptime and errors for people who ship alone. Every plan is month to month.">
		{#snippet cta()}
			<h2 class="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.03em]">Watch your first URL in a minute.</h2>
			<div class="flex flex-wrap items-center gap-3">
				<CommandBox command="npx tarnish watch https://your.app" class="w-full max-w-md bg-background" />
				<Button href={app} size="lg" class="h-12 rounded-full px-6 text-base">Start free</Button>
			</div>
		{/snippet}
	</DitherFooter>
</ProductScope>

<style>
	.marquee {
		animation: marquee 40s linear infinite;
	}
	.marquee:hover {
		animation-play-state: paused;
	}
	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			animation: none;
		}
	}
	:global(.slab-ring) {
		--pa: var(--primary-foreground);
		--foreground: var(--primary-foreground);
	}
</style>
