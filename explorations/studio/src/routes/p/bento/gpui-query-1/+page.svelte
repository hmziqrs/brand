<script lang="ts">
	import NavBar from '$brand/components/nav-bar.svelte';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import Bento from '$brand/components/bento.svelte';
	import BentoTile from '$brand/components/bento-tile.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import MaterialTag from '$brand/components/material-tag.svelte';
	import FeatureBento from '$brand/blocks/sections/feature-bento.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Timer from '@lucide/svelte/icons/timer';
	import Recycle from '@lucide/svelte/icons/recycle';
	import RotateCw from '@lucide/svelte/icons/rotate-cw';
	import AppWindow from '@lucide/svelte/icons/app-window';
	import ProductHero from '$moves/bento/product-hero.svelte';
	import ForgeAppWindow from '$moves/bento/forge-app-window.svelte';
	import DevtoolsInspector from '$moves/bento/devtools-inspector.svelte';
	import CacheTimeline from '$moves/bento/cache-timeline.svelte';
	import RefetchPulse from '$moves/bento/refetch-pulse.svelte';
	import MutationRollback from '$moves/bento/mutation-rollback.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import MaterialTile from '$moves/bento/material-tile.svelte';
	import { install, keyCode } from '$moves/bento/query-data';

	const links = [
		{ label: 'Guide', href: '#/p/bento/gpui-query-3' },
		{ label: 'Devtools', href: '#/p/bento/gpui-query-2' },
		{ label: 'Examples', href: '#/p/bento/gpui-query-1' },
		{ label: 'Changelog', href: '#/p/bento/gpui-query-3' }
	];

	const requests = Array.from({ length: 24 }, (_, i) => {
		const wave = Math.sin(i / 3.2) * 6;
		return { label: `${i}m`, value: Math.round(9 + wave + (i % 5)), previous: Math.round(64 + wave * 3 + ((i * 7) % 11)) };
	});
</script>

{#snippet tileHead(kicker: string, title: string, body: string)}
	<div class="flex flex-col gap-1.5">
		<p class="font-mono text-[0.6875rem] tracking-wide text-primary uppercase">{kicker}</p>
		<h3 class="text-xl font-medium tracking-[-0.02em] text-foreground md:text-2xl">{title}</h3>
		<p class="max-w-[52ch] leading-snug text-foreground/85">{body}</p>
	</div>
{/snippet}

<div class="min-h-screen bg-background text-foreground">
	<NavBar site="gpui-query" maker="by hmziq" {links} cta={{ label: 'Get started', href: '#/p/bento/gpui-query-3' }} secondary={{ label: 'GitHub', href: 'https://github.com/hmziqrs' }} />

	<ProductHero layout="center" ground="material" preset="oxide-bloom">
		{#snippet eyebrow()}<MaterialTag>v0.4 · devtools in the box</MaterialTag>{/snippet}
		{#snippet headline()}Fetch once. <span class="text-primary">Every view</span> knows.{/snippet}
		{#snippet lede()}Typed cache keys, background refetch and optimistic mutations for GPUI apps. Your <code class="font-mono text-[0.9em]">render()</code> just reads.{/snippet}
		{#snippet actions()}
			<CommandBox command={install} class="w-72 max-w-full" />
			<Button href="#/p/bento/gpui-query-3" size="lg" class="px-4">Read the guide <ArrowRight class="lucide" /></Button>
		{/snippet}
		<ForgeAppWindow />
	</ProductHero>

	<section class="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 md:py-28">
		<div class="mb-10 grid gap-6 md:mb-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
			<h2 class="text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.04em] text-balance">Four chores your app stops doing by hand.</h2>
			<p class="text-lg leading-snug text-foreground md:text-xl">Every tile below is running the real state machine: watch keys go stale, refetch without a spinner, and roll back when the server refuses.</p>
		</div>

		<Bento class="gap-4 auto-rows-[minmax(12rem,auto)]">
			<BentoTile cols={4} rows={2} class="bg-card/40">
				<div class="flex h-full flex-col gap-6">
					{@render tileHead('01 · Cache', 'Fresh, stale, gone — on a timeline.', 'Each lane is one key. Reads inside the stale window never touch the network; the oxide bars are the only requests that go out.')}
					<CacheTimeline class="mt-auto" />
				</div>
			</BentoTile>

			<OxideTile eyebrow="Dedupe" big="1" title="network request for twelve views of the same key." body="Every subscriber shares one in-flight future and one cached result." class="md:col-span-2 md:row-span-2 lg:col-span-2" />

			<BentoTile cols={2} rows={2}>
				<div class="flex h-full flex-col gap-6">
					{@render tileHead('02 · Refetch', 'Updates arrive quietly.', 'Focus, reconnect, interval or invalidate: the query refetches behind the rows you are already looking at.')}
					<RefetchPulse class="mt-auto" />
				</div>
			</BentoTile>

			<BentoTile cols={4}>
				<div class="grid h-full gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
					{@render tileHead('03 · Mutations', 'Answer first. Apologise if needed.', 'Write the cache before the request leaves; restore the snapshot if it fails.')}
					<MutationRollback />
				</div>
			</BentoTile>

			<BentoTile cols={4}>
				<div class="grid h-full gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
					{@render tileHead('04 · Keys', 'Keys are types, not strings.', 'Derive QueryKey on a struct or enum. Typos stop compiling; invalidation matches on variants.')}
					<CodeBlock code={keyCode} lang="rust" label="keys.rs" class="bg-background/70" />
				</div>
			</BentoTile>

			<BentoTile cols={4} rows={2} class="overflow-hidden">
				<div class="flex h-full flex-col gap-5">
					{@render tileHead('05 · Devtools', 'See the cache while you build.', 'Click a key: data, observers, stale countdown. Refetch and invalidate from the panel. Compiled out of release builds.')}
					<DevtoolsInspector class="mt-auto rounded-xl ring-1 ring-foreground/10" initial={2} />
				</div>
			</BentoTile>

			<MaterialTile preset="copper-sweep" eyebrow="Runtime" title="Runs on GPUI's executor." body="No Tokio runtime to smuggle in. Fetches are spawned on the app's background executor and land on the main thread." class="min-h-72 md:col-span-2 lg:col-span-2" />

			<BentoTile cols={2}>
				<div class="flex h-full flex-col gap-4">
					<div class="flex items-baseline justify-between gap-3">
						<p class="font-mono text-[0.6875rem] tracking-wide text-primary uppercase">Network, Forge demo</p>
						<p class="text-xs text-muted-foreground">req / min</p>
					</div>
					<p class="text-lg leading-snug text-foreground">Same screens, <span class="text-primary">one sixth</span> of the requests.</p>
					<TrendChart points={requests} label="Requests a minute" height={130} names={['With gpui-query', 'Fetch in render']} class="mt-auto" />
				</div>
			</BentoTile>
		</Bento>
	</section>

	<FeatureBento
		title="Defaults you can read in one breath."
		intro="Borrowed from TanStack Query, because they are right. Override any of them per query or per client."
		align="start"
		class="pb-20 md:pb-28 [&_h2]:text-[clamp(2rem,4vw,3.25rem)] [&_h2]:leading-none [&_h2]:tracking-[-0.035em] [&_h2+p]:text-lg [&_h2+p]:text-foreground [&_h3+p]:text-foreground/85"
		tiles={[
			{ title: 'Stale time', body: 'Data is stale the moment it lands, so the next mount refetches in the background.', icon: Timer, stat: { value: '0s', label: 'stale_time' }, cols: 3 },
			{ title: 'Garbage collection', body: 'Unused keys stay cached for five minutes, then go.', icon: Recycle, stat: { value: '5m', label: 'gc_time' }, cols: 3, tone: 'material', preset: 'mica-flakes' },
			{ title: 'Retries', body: 'Failed fetches retry three times with exponential backoff before the error reaches your view.', icon: RotateCw, stat: { value: '3', label: 'retry' }, cols: 3 },
			{ title: 'Refetch on focus', body: 'When a window regains focus, its stale queries refresh. Turn it off per query.', icon: AppWindow, stat: { value: 'on', label: 'refetch_on_focus' }, cols: 3 }
		]}
	/>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-6">
		<OxideTile size="lg" art="rings" eyebrow="Install" title="Add it before your next fetch." body="One crate, one QueryClient, and your existing views start reading from the cache." class="min-h-96 md:p-12">
			<div class="mt-4 flex flex-wrap items-center gap-3">
				<CommandBox command={install} class="w-80 max-w-full bg-(--on-orange)/5" />
				<Button href="#/p/bento/gpui-query-3" variant="outline" size="lg" class="px-4">Quickstart <ArrowRight class="lucide" /></Button>
			</div>
		</OxideTile>
	</section>

	<SiteFooter site="gpui-query" tagline="Data loading for GPUI apps." github="https://github.com/hmziqrs" columns={[
		{ title: 'Learn', links: [{ label: 'Quickstart', href: '#/p/bento/gpui-query-3' }, { label: 'Queries', href: '#/p/bento/gpui-query-3' }, { label: 'Mutations', href: '#/p/bento/gpui-query-3' }] },
		{ title: 'Tools', links: [{ label: 'Devtools', href: '#/p/bento/gpui-query-2' }, { label: 'Examples', href: '#/p/bento/gpui-query-1' }] }
	]} />
</div>
