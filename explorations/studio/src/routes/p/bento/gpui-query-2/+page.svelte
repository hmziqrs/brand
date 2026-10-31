<script lang="ts">
	import NavBar from '$brand/components/nav-bar.svelte';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import BentoSection from '$brand/blocks/sections/bento-section.svelte';
	import KpiStat from '$brand/blocks/showcase/kpi-stat.svelte';
	import BarList from '$brand/blocks/showcase/bar-list.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ProductHero from '$moves/bento/product-hero.svelte';
	import OxideMarkHeadline from '$moves/bento/oxide-mark-headline.svelte';
	import ForgeAppWindow from '$moves/bento/forge-app-window.svelte';
	import DevtoolsInspector from '$moves/bento/devtools-inspector.svelte';
	import CacheTimeline from '$moves/bento/cache-timeline.svelte';
	import RefetchPulse from '$moves/bento/refetch-pulse.svelte';
	import MutationRollback from '$moves/bento/mutation-rollback.svelte';
	import { install, queryCode, viewCode, mutationCode, devtoolsCode, refetchCode } from '$moves/bento/query-data';

	const links = [
		{ label: 'Product', href: '#/p/bento/gpui-query-2' },
		{ label: 'Guide', href: '#/p/bento/gpui-query-2' },
		{ label: 'Bento', href: '#/p/bento/gpui-query-1' }
	];

	const callouts = [
		{ n: 1, title: 'Refetching in background', body: 'The list never blanks. New rows replace old ones when they land.' },
		{ n: 2, title: 'Merging · optimistic', body: 'The row reacts on click. If the server refuses, it comes back.' },
		{ n: 3, title: 'Devtools, docked', body: 'Every key with its state, observers and stale countdown.' }
	];

	const sessions = Array.from({ length: 20 }, (_, i) => ({ label: `S${i + 1}`, value: 6 + ((i * 5) % 7), previous: 38 + ((i * 11) % 17) }));

	const slow = [
		{ label: 'Checks { sha }', value: 840 },
		{ label: 'Pulls { repo, Open }', value: 410 },
		{ label: 'Reviews { pull }', value: 260 },
		{ label: 'Pull { id }', value: 180 },
		{ label: 'Viewer', value: 90 }
	];
</script>

{#snippet head(n: string, title: string, body: string)}
	<div class="grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
		<div class="flex flex-col gap-4">
			<span class="flex items-center gap-2 font-mono text-sm text-primary"><span class="size-2 rounded-[2px] bg-primary"></span>{n}</span>
			<h2 class="text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.98] font-medium tracking-[-0.04em] text-balance text-foreground">{title}</h2>
		</div>
		<p class="self-end text-lg leading-snug text-foreground md:text-[1.375rem]">{body}</p>
	</div>
{/snippet}

<div class="min-h-screen bg-background text-foreground">
	<NavBar site="gpui-query" maker="by hmziq" {links} cta={{ label: 'Quickstart', href: '#/p/bento/gpui-query-2' }} />

	<ProductHero layout="left" ground="glow">
		{#snippet eyebrow()}
			<p class="flex items-center gap-2 font-mono text-xs tracking-wide text-foreground uppercase"><span class="size-2 rounded-[2px] bg-primary"></span>gpui-query 0.4 — server state for GPUI</p>
		{/snippet}
		{#snippet headline()}<OxideMarkHeadline before="Your GPUI app, " mark="never waiting" after=" on the network." />{/snippet}
		{#snippet lede()}A typed cache that lives beside your views. They render from it instantly, and it refreshes itself in the background.{/snippet}
		{#snippet actions()}
			<Button href="#/p/bento/gpui-query-2" size="lg" class="px-4">Start the quickstart <ArrowRight class="lucide" /></Button>
			<CommandBox command={install} class="w-72 max-w-full" />
		{/snippet}
		<ForgeAppWindow annotate />
		<ol class="mt-8 grid gap-6 sm:grid-cols-3">
			{#each callouts as c (c.n)}
				<li class="flex gap-3">
					<span class="grid size-6 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">{c.n}</span>
					<div class="flex flex-col gap-1">
						<p class="font-medium text-foreground">{c.title}</p>
						<p class="leading-snug text-foreground/80">{c.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</ProductHero>

	<main class="mx-auto flex max-w-[1320px] flex-col gap-28 px-4 py-16 sm:px-6 md:gap-36 md:py-24">
		<section class="flex flex-col gap-10">
			{@render head('01 Queries', 'A query is a struct.', 'Describe the request once. Every view that asks for the same key shares one fetch and one cached answer, and you decide how long it stays fresh.')}
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
				<CodeBlock lang="rust" files={[{ label: 'pulls.rs', code: queryCode, lang: 'rust' }, { label: 'inbox.rs', code: viewCode, lang: 'rust' }]} class="bg-card/50" />
				<div class="flex flex-col gap-5 rounded-xl border bg-card/50 p-5 md:p-6">
					<div class="flex items-baseline justify-between gap-3">
						<p class="text-lg font-medium text-foreground">Drag stale_time, watch the requests</p>
						<span class="font-mono text-xs text-muted-foreground">60s of Forge</span>
					</div>
					<CacheTimeline interactive staleTime={15} class="mt-auto" />
				</div>
			</div>
		</section>

		<section class="flex flex-col gap-10">
			{@render head('02 Background refetch', 'Fresh data, no spinner.', 'Stale queries refresh when a window regains focus, the network comes back, a timer fires or you invalidate them. The rows on screen stay put until better ones arrive.')}
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
				<div class="rounded-xl border bg-card/50 p-5 md:p-8">
					<RefetchPulse layout="side" />
				</div>
				<div class="flex flex-col gap-4">
					<div class="grid grid-cols-2 gap-4">
						<KpiStat variant="card" label="Requests per session" value="9" delta={-81} lowerIsBetter against="vs fetch in render" class="bg-card/50" />
						<KpiStat variant="card" label="Spinners on revisit" value="0" against="cached rows render first" class="bg-card/50" />
					</div>
					<div class="flex flex-1 flex-col gap-3 rounded-xl border bg-card/50 p-5">
						<p class="text-sm text-foreground">Requests per session, Forge demo</p>
						<TrendChart points={sessions} label="Requests per session" height={150} names={['gpui-query', 'Fetch in render']} class="mt-auto" />
					</div>
				</div>
			</div>
			<CodeBlock code={refetchCode} lang="rust" label="Per-query refetch rules" class="bg-card/50" />
		</section>

		<section class="flex flex-col gap-10">
			{@render head('03 Mutations', 'Optimistic first, honest on failure.', 'Write the cache before the request leaves. Keep a snapshot. If the server says no, the snapshot goes back and the view never lies for long.')}
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div class="flex flex-col justify-center gap-6 rounded-xl border bg-card/50 p-5 md:p-8">
					<p class="text-lg text-foreground">Press Approve, then flip the server’s answer.</p>
					<MutationRollback auto={false} />
				</div>
				<CodeBlock code={mutationCode} lang="rust" label="approve.rs" class="bg-card/50" />
			</div>
		</section>

		<section class="flex flex-col gap-10">
			{@render head('04 Devtools', 'The cache, open on your desk.', 'One line in main() docks an inspector into any window. Pick a key to see its data and countdown, refetch it, invalidate it. Release builds leave it out.')}
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
				<DevtoolsInspector class="min-h-[28rem] rounded-xl border" initial={0} />
				<div class="flex flex-col gap-4">
					<div class="rounded-xl border bg-card/50 p-5">
						<BarList rows={slow} label="Slowest keys, p95 ms" mono />
					</div>
					<CodeBlock code={devtoolsCode} lang="rust" label="main.rs" class="bg-card/50" />
				</div>
			</div>
		</section>
	</main>

	<BentoSection
		ground="material"
		preset="cast-iron"
		align="start"
		title="Everything else you would have written yourself."
		intro="The parts of TanStack Query people miss most, shaped for GPUI entities and executors."
		class="[&_h2]:text-[clamp(2rem,4vw,3.25rem)] [&_h2]:leading-none [&_h2]:tracking-[-0.035em] [&_h2+p]:text-lg [&_h2+p]:text-foreground [&_h3+p]:text-foreground/85"
		tiles={[
			{ title: 'Dependent queries', body: 'Enable a query only once the key it needs exists.', cols: 2 },
			{ title: 'Infinite lists', body: 'Page cursors, merged pages, fetch-next on scroll.', cols: 2 },
			{ title: 'Prefetch on hover', body: 'Warm the cache before the click lands.', cols: 2 },
			{ title: 'Cancel on drop', body: 'When the last view drops, its in-flight fetch is cancelled.', cols: 3 },
			{ title: 'Persist to disk', body: 'Restore the cache on launch so the first frame has data.', cols: 3 }
		]}
	/>

	<section class="band-orange">
		<div class="mx-auto flex max-w-[1320px] flex-col gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-end md:justify-between md:py-28">
			<h2 class="max-w-[14ch] text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] font-medium tracking-[-0.045em]">Stop writing loading states.</h2>
			<div class="flex flex-col gap-4 md:items-end">
				<p class="max-w-[34ch] text-lg leading-snug md:text-right">Add the crate, wrap your app in a QueryClient, read from the cache.</p>
				<div class="flex flex-wrap gap-3">
					<code class="flex h-10 items-center rounded-md border border-(--on-orange)/30 px-3.5 font-mono text-sm">$ {install}</code>
					<Button href="#/p/bento/gpui-query-2" size="lg" class="px-4">Quickstart <ArrowRight class="lucide" /></Button>
				</div>
			</div>
		</div>
	</section>

	<SiteFooter site="gpui-query" tagline="Data loading for GPUI apps." github="https://github.com/hmziqrs" columns={[
		{ title: 'Learn', links: [{ label: 'Quickstart', href: '#/p/bento/gpui-query-2' }, { label: 'Mutations', href: '#/p/bento/gpui-query-2' }] },
		{ title: 'Tools', links: [{ label: 'Devtools', href: '#/p/bento/gpui-query-2' }, { label: 'Examples', href: '#/p/bento/gpui-query-1' }] }
	]} />
</div>
