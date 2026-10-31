<script lang="ts">
	import NavBar from '$brand/components/nav-bar.svelte';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import BentoTile from '$brand/components/bento-tile.svelte';
	import Bento from '$brand/components/bento.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import Tag from '$brand/components/tag.svelte';
	import LiveFeed from '$brand/blocks/showcase/live-feed.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Search from '@lucide/svelte/icons/search';
	import OxideMarkHeadline from '$moves/bento/oxide-mark-headline.svelte';
	import SpecRail from '$moves/bento/spec-rail.svelte';
	import CacheTimeline from '$moves/bento/cache-timeline.svelte';
	import RefetchPulse from '$moves/bento/refetch-pulse.svelte';
	import MutationRollback from '$moves/bento/mutation-rollback.svelte';
	import DevtoolsInspector from '$moves/bento/devtools-inspector.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import MaterialTile from '$moves/bento/material-tile.svelte';
	import { install, cargoCode, queryCode, viewCode, keyCode, refetchCode, mutationCode, devtoolsCode } from '$moves/bento/query-data';

	const links = [
		{ label: 'Guide', href: '#/p/bento/gpui-query-3', current: true },
		{ label: 'API', href: '#/p/bento/gpui-query-3' },
		{ label: 'Product', href: '#/p/bento/gpui-query-2' },
		{ label: 'Bento', href: '#/p/bento/gpui-query-1' }
	];

	const sections = [
		{ id: 'gq-install', label: 'Install' },
		{ id: 'gq-queries', label: 'Queries' },
		{ id: 'gq-keys', label: 'Typed keys' },
		{ id: 'gq-refetch', label: 'Refetch' },
		{ id: 'gq-mutations', label: 'Mutations' },
		{ id: 'gq-devtools', label: 'Devtools' }
	];

	type Row = [string, string, string, string];
	const queryOpts: Row[] = [
		['stale_time', 'Duration', '0s', 'How long data counts as fresh. Fresh reads never fetch.'],
		['gc_time', 'Duration', '5m', 'How long an unused key stays cached.'],
		['retry', 'u32', '3', 'Retries with exponential backoff before Error.'],
		['enabled', 'bool', 'true', 'Hold the fetch until a dependency exists.'],
		['placeholder', 'Fn() -> T', '—', 'Shown while the first fetch runs.']
	];
	const refetchOpts: Row[] = [
		['refetch_on_focus', 'bool', 'true', 'Window regains focus.'],
		['refetch_on_reconnect', 'bool', 'true', 'Network comes back.'],
		['refetch_interval', 'Option<Duration>', 'None', 'Poll while mounted.'],
		['invalidate(&key)', 'method', '—', 'Mark stale, refetch if observed.']
	];
	const hooks: Row[] = [
		['on_mutate', 'Fn(&mut Cache, &V) -> S', '—', 'Write the cache, return a snapshot.'],
		['on_error', 'Fn(&mut Cache, &E, S)', '—', 'Restore the snapshot.'],
		['on_success', 'Fn(&mut Cache, &T)', '—', 'Merge the server’s answer.'],
		['on_settled', 'Fn(&mut Cache)', '—', 'Invalidate what changed.']
	];

	const events = [
		{ id: '1', when: 'now', who: 'Pull { 4127 }', what: 'refetched on focus · 212ms', tone: 'success' as const },
		{ id: '2', when: '4s', who: 'Approve { 4121 }', what: 'rolled back · 409', tone: 'warning' as const },
		{ id: '3', when: '9s', who: 'Pulls::open', what: 'read from cache · 3 observers' },
		{ id: '4', when: '15s', who: 'Checks { 9f3c }', what: 'went stale' },
		{ id: '5', when: '31s', who: 'Labels', what: 'garbage collected' }
	];
</script>

{#snippet table(rows: Row[], caption: string)}
	<div class="overflow-x-auto rounded-xl border">
		<table class="w-full min-w-[34rem] text-left text-sm">
			<caption class="sr-only">{caption}</caption>
			<thead class="border-b bg-foreground/[0.03] text-xs text-muted-foreground">
				<tr><th class="px-4 py-2.5 font-medium">Option</th><th class="px-4 py-2.5 font-medium">Type</th><th class="px-4 py-2.5 font-medium">Default</th><th class="px-4 py-2.5 font-medium">What it does</th></tr>
			</thead>
			<tbody class="divide-y">
				{#each rows as r (r[0])}
					<tr>
						<td class="px-4 py-2.5 font-mono text-[0.8125rem] whitespace-nowrap text-primary">{r[0]}</td>
						<td class="px-4 py-2.5 font-mono text-[0.75rem] whitespace-nowrap text-foreground">{r[1]}</td>
						<td class="px-4 py-2.5 font-mono text-[0.75rem] text-foreground">{r[2]}</td>
						<td class="px-4 py-2.5 text-foreground">{r[3]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet head(id: string, n: string, title: string, body: string)}
	<header {id} class="flex scroll-mt-20 flex-col gap-3 pt-4 lg:scroll-mt-8">
		<span class="font-mono text-sm text-primary">{n}</span>
		<h2 class="text-[clamp(2rem,3.6vw,3rem)] leading-[1] font-medium tracking-[-0.035em] text-foreground">{title}</h2>
		<p class="max-w-[60ch] text-lg leading-snug text-foreground">{body}</p>
	</header>
{/snippet}

<div class="min-h-screen bg-background text-foreground">
	<NavBar site="gpui-query" maker="docs" {links} cta={{ label: 'GitHub', href: 'https://github.com/hmziqrs' }}>
		{#snippet extra()}
			<span class="hidden h-8 items-center gap-2 rounded-md border px-2.5 text-xs text-muted-foreground lg:flex"><Search class="lucide size-3.5" />Search the guide<kbd class="ml-4 font-mono text-[0.6875rem]">⌘K</kbd></span>
		{/snippet}
	</NavBar>

	<section class="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:pb-24">
		<div class="flex flex-col gap-6">
			<div class="flex flex-wrap gap-2">
				<Tag tone="orange" marker>v0.4.2</Tag><Tag>gpui 0.2</Tag><Tag>MIT</Tag>
			</div>
			<h1 class="text-[clamp(3rem,6.2vw,5.75rem)] leading-[1.04] font-medium tracking-[-0.045em] text-balance">
				<OxideMarkHeadline before="The whole manual, " mark="running." font="serif" />
			</h1>
			<p class="max-w-[46ch] text-lg leading-snug text-foreground md:text-[1.375rem]">gpui-query is data loading for GPUI apps: cached queries, background refetch, optimistic mutations, a devtools panel. Six sections, every one with a demo you can poke.</p>
			<div class="flex flex-wrap items-center gap-3">
				<CommandBox command={install} class="w-72 max-w-full" />
				<Button href="#/p/bento/gpui-query-2" variant="outline" size="lg" class="px-4">See it in an app <ArrowRight class="lucide" /></Button>
			</div>
			<dl class="mt-2 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border bg-border">
				{#each [['0s', 'stale_time'], ['5m', 'gc_time'], ['3×', 'retry']] as d (d[1])}
					<div class="flex flex-col gap-1 bg-background p-4">
						<dt class="order-2 font-mono text-xs text-muted-foreground">{d[1]}</dt>
						<dd class="font-mono text-3xl font-medium tracking-tight text-foreground">{d[0]}</dd>
					</div>
				{/each}
			</dl>
		</div>
		<CodeBlock lang="rust" files={[{ label: 'pulls.rs', code: queryCode, lang: 'rust' }, { label: 'Cargo.toml', code: cargoCode, lang: 'toml' }, { label: 'inbox.rs', code: viewCode, lang: 'rust' }, { label: 'main.rs', code: devtoolsCode, lang: 'rust' }]} class="self-start bg-card/60 shadow-2xl lg:mt-10" />
	</section>

	<SpecRail {sections} class="border-t pt-10 pb-24 lg:pt-14">
		{#snippet foot()}
			<div class="flex flex-col gap-2 rounded-xl border p-4">
				<p class="text-sm font-medium text-foreground">New in 0.4</p>
				<p class="text-sm leading-snug text-foreground/85">Devtools panel, infinite queries, persisted cache.</p>
				<a href="#/p/bento/gpui-query-2" class="text-sm text-primary underline-offset-4 hover:underline">Release notes →</a>
			</div>
		{/snippet}

		<div class="flex flex-col gap-20 md:gap-28">
			<section class="flex flex-col gap-8">
				{@render head('gq-install', '01', 'Install', 'One crate. Turn on the devtools feature for debug builds; it compiles to nothing in release.')}
				<Bento class="gap-3 auto-rows-auto">
					<BentoTile cols={3}>
						<ol class="flex flex-col gap-5">
							{#each [['Add the crate', 'cargo add gpui-query --features devtools'], ['Create a client', 'QueryClient::new(cx) once, in main().'], ['Read in render()', 'cx.use_query(key) returns cached data plus status.']] as s, i (s[0])}
								<li class="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
									<span class="grid size-7 place-items-center rounded-full border border-primary font-mono text-xs text-primary">{i + 1}</span>
									<div class="flex flex-col gap-1"><p class="font-medium text-foreground">{s[0]}</p><p class="font-mono text-[0.8125rem] break-words text-foreground/85">{s[1]}</p></div>
								</li>
							{/each}
						</ol>
					</BentoTile>
					<MaterialTile preset="copper-sweep" eyebrow="Requires" title="GPUI 0.2 and Rust 1.85." body="No async runtime of its own. Fetches run on GPUI's background executor." class="min-h-64 md:col-span-4 lg:col-span-3" />
				</Bento>
			</section>

			<section class="flex flex-col gap-8">
				{@render head('gq-queries', '02', 'Queries', 'A query is a key plus a fetch function. Reads inside stale_time come from the cache; the first read after it triggers one background fetch shared by every view.')}
				<Bento class="gap-3 auto-rows-auto">
					<BentoTile cols={6}>
						<div class="flex flex-col gap-5">
							<div class="flex flex-wrap items-baseline justify-between gap-2">
								<p class="text-lg font-medium text-foreground">Try it: drag stale_time</p>
								<p class="text-sm text-foreground/80">Three keys over sixty seconds of the Forge demo.</p>
							</div>
							<CacheTimeline interactive staleTime={10} />
						</div>
					</BentoTile>
				</Bento>
				{@render table(queryOpts, 'Query options')}
			</section>

			<section class="flex flex-col gap-8">
				{@render head('gq-keys', '03', 'Typed keys', 'Keys are your own structs and enums. Hash and Eq decide identity; invalidation is pattern matching, so a renamed field breaks the build, not the cache.')}
				<Bento class="gap-3 auto-rows-auto">
					<OxideTile eyebrow="String keys" big="0" title="places a typo can hide." body="Derive QueryKey and the compiler owns every key." art="square" class="md:col-span-4 lg:col-span-2" />
					<div class="min-w-0 md:col-span-4 lg:col-span-4"><CodeBlock code={keyCode} lang="rust" label="keys.rs" class="h-full bg-card/50" /></div>
				</Bento>
			</section>

			<section class="flex flex-col gap-8">
				{@render head('gq-refetch', '04', 'Background refetch', 'Stale data stays on screen while fresh data loads. Click a trigger to send a refetch through the query.')}
				<Bento class="gap-3 auto-rows-auto">
					<BentoTile cols={3}><RefetchPulse auto={false} /></BentoTile>
					<div class="flex min-w-0 flex-col gap-3 md:col-span-4 lg:col-span-3">
						<CodeBlock code={refetchCode} lang="rust" label="Per query" class="bg-card/50" />
						<MaterialTile preset="etched-silk" eyebrow="Never blanks" title="Old rows stay until new ones land." body="No spinner, no layout jump, no flash of empty list." class="min-h-56 flex-1" />
					</div>
				</Bento>
				{@render table(refetchOpts, 'Refetch options')}
			</section>

			<section class="flex flex-col gap-8">
				{@render head('gq-mutations', '05', 'Mutations', 'Mutations change server data. Update the cache optimistically, keep a snapshot, and give it back if the request fails.')}
				<Bento class="gap-3 auto-rows-auto">
					<BentoTile cols={3}><MutationRollback auto={false} /></BentoTile>
					<div class="min-w-0 md:col-span-4 lg:col-span-3"><CodeBlock code={mutationCode} lang="rust" label="approve.rs" class="h-full bg-card/50" /></div>
				</Bento>
				{@render table(hooks, 'Mutation lifecycle')}
			</section>

			<section class="flex flex-col gap-8">
				{@render head('gq-devtools', '06', 'Devtools', 'Press cmd-shift-q in a debug build. Pick a key to see its data and countdown; refetch or invalidate it from the panel.')}
				<Bento class="gap-3 auto-rows-auto">
					<div class="min-w-0 md:col-span-4 lg:col-span-4"><DevtoolsInspector class="h-full rounded-xl border" initial={2} /></div>
					<BentoTile cols={2}>
						<div class="flex flex-col gap-3">
							<p class="text-sm font-medium text-foreground">Cache events</p>
							<LiveFeed {events} />
						</div>
					</BentoTile>
				</Bento>
			</section>

			<nav class="grid gap-3 border-t pt-8 sm:grid-cols-2" aria-label="Continue reading">
				<a href="#/p/bento/gpui-query-2" class="flex flex-col gap-1 rounded-xl border p-5 outline-none hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50">
					<span class="text-xs text-muted-foreground">See it whole</span><span class="text-lg font-medium text-foreground">The Forge demo app</span>
				</a>
				<a href="#/p/bento/gpui-query-1" class="flex flex-col gap-1 rounded-xl border p-5 text-right outline-none hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50">
					<span class="text-xs text-muted-foreground">Next</span><span class="text-lg font-medium text-foreground">Infinite lists →</span>
				</a>
			</nav>
		</div>
	</SpecRail>

	<SiteFooter site="gpui-query" tagline="Data loading for GPUI apps." github="https://github.com/hmziqrs" columns={[
		{ title: 'Guide', links: sections.map((s) => ({ label: s.label, href: '#/p/bento/gpui-query-3' })) },
		{ title: 'More', links: [{ label: 'Product tour', href: '#/p/bento/gpui-query-2' }, { label: 'Bento', href: '#/p/bento/gpui-query-1' }] }
	]} />
</div>
