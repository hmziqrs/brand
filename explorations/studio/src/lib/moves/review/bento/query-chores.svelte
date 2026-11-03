<script lang="ts">
	import Timer from '@lucide/svelte/icons/timer';
	import Recycle from '@lucide/svelte/icons/recycle';
	import RotateCw from '@lucide/svelte/icons/rotate-cw';
	import AppWindow from '@lucide/svelte/icons/app-window';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import IconTile from '$brand/components/icon-tile.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import DevtoolsInspector from '$moves/bento/devtools-inspector.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import MaterialTile from '$moves/bento/material-tile.svelte';
	import { install } from '$moves/bento/query-data';
	import SectionHead from './section-head.svelte';
	import CacheLanes from './cache-lanes.svelte';
	import RefetchRings from './refetch-rings.svelte';
	import RollbackRow from './rollback-row.svelte';
	import { kicker, outline, subtitle, tileTitle } from './ui';

	let { class: className }: { here?: string; class?: string } = $props();

	const keyCode = `#[derive(QueryKey, Clone, Hash, PartialEq, Eq)]
pub enum RepoKey {
    Pulls { repo: RepoId, state: PrState },
    Pull { id: u64 },
    Checks { sha: Sha },
}

cache.invalidate(&RepoKey::Pull { id: 4121 });
cache.invalidate_where(|k: &RepoKey| {
    matches!(k, RepoKey::Pulls { .. })
});`;

	const requests = Array.from({ length: 24 }, (_, i) => {
		const wave = Math.sin(i / 3.2) * 6;
		return { label: `${i}m`, value: Math.round(9 + wave + (i % 5)), previous: Math.round(64 + wave * 3 + ((i * 7) % 11)) };
	});

	const defaults = [
		{ title: 'Stale time', body: 'Data is stale the moment it lands, so the next mount refetches in the background.', icon: Timer, value: '0s', name: 'stale_time', override: '.stale_time(Duration::from_secs(30))' },
		{ title: 'Garbage collection', body: 'Keys no view reads stay cached for five minutes, then go.', icon: Recycle, value: '5m', name: 'gc_time', override: '.gc_time(Duration::from_secs(600))', preset: 'mica-flakes' },
		{ title: 'Retries', body: 'A failed fetch is tried three more times, waiting longer each time, before your view sees the error.', icon: RotateCw, value: '3', name: 'retry', override: '.retry(5)' },
		{ title: 'Refetch on focus', body: 'When a window comes back to the front, its stale queries refresh.', icon: AppWindow, value: 'on', name: 'refetch_on_focus', override: '.refetch_on_focus(false)' }
	];
</script>

{#snippet head(n: string, title: string, body: string)}
	<div class="flex flex-col gap-1.5">
		<p class={kicker}>{n}</p>
		<h3 class={tileTitle}>{title}</h3>
		<p class="max-w-[52ch] leading-snug text-foreground/85">{body}</p>
	</div>
{/snippet}

<section data-slot="query-chores" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead
			kicker="What it does"
			title="Four chores your app stops doing by hand."
			lede="Every tile runs the real state machine. Drag across the timeline, point at the refetch rings, approve the pull request and click through the cache."
		/>

		<div class="mt-12 grid grid-flow-row-dense auto-rows-[minmax(12rem,auto)] grid-cols-1 gap-4 md:mt-16 md:grid-cols-4 lg:grid-cols-6">
			<article class={cn(outline, 'flex min-w-0 flex-col gap-6 p-5 md:col-span-4 md:row-span-2 lg:col-span-4 sm:p-6')}>
				{@render head('01 · Cache', 'Fresh, stale, gone: on a timeline.', 'Each lane is one key. Reads inside the stale window never touch the network; the oxide bars are the only requests that go out. Drag across it to stop the clock.')}
				<CacheLanes class="mt-auto" />
			</article>

			<OxideTile eyebrow="Dedupe" big="1" title="network request for twelve views of the same key." body="Every view that asks shares one fetch in flight and one cached answer." class="min-h-80 md:col-span-2 md:row-span-2 lg:col-span-2" />

			<article class={cn(outline, 'flex min-w-0 flex-col gap-6 p-5 md:col-span-2 md:row-span-2 lg:col-span-2 sm:p-6')}>
				{@render head('02 · Refetch', 'Updates arrive quietly.', 'Focus, reconnect, a timer or an invalidate: the query refetches behind the rows already on screen. Pointing at this tile counts as a window focus.')}
				<RefetchRings class="mt-auto" />
			</article>

			<article class={cn(outline, 'grid min-w-0 gap-6 p-5 md:col-span-4 lg:col-span-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center sm:p-6')}>
				{@render head('03 · Mutations', 'Answer first. Apologise if needed.', 'Write the cache before the request leaves; put the snapshot back if it fails.')}
				<RollbackRow />
			</article>

			<article class={cn(outline, 'grid min-w-0 gap-5 p-5 md:col-span-4 lg:col-span-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center sm:p-6')}>
				{@render head('04 · Keys', 'Keys are types, not strings.', 'Derive QueryKey on a struct or an enum. A typo stops compiling, and invalidation matches on variants.')}
				<CodeBlock code={keyCode} lang="rust" label="keys.rs" class="min-w-0" />
			</article>

			<article class={cn(outline, 'flex min-w-0 flex-col gap-5 overflow-hidden p-5 md:col-span-4 md:row-span-2 lg:col-span-4 sm:p-6')}>
				{@render head('05 · Devtools', 'See the cache while you build.', 'Pick a key to see its data, observers and stale countdown. Refetch and invalidate from the panel; release builds leave it out.')}
				<DevtoolsInspector class="mt-auto min-h-[22rem] rounded-xl bg-transparent ring-1 ring-foreground/10" initial={2} />
			</article>

			<MaterialTile preset="copper-sweep" eyebrow="Install" title="Add it before your next fetch." body="One crate. Wrap the app in a QueryClient and your views read from the cache." class="min-h-72 md:col-span-2 lg:col-span-2">
				<CommandBox command={install} class="mt-2 w-full bg-background" />
			</MaterialTile>

			<article class={cn(outline, 'flex min-w-0 flex-col gap-4 p-5 md:col-span-2 lg:col-span-2 sm:p-6')}>
				<div class="flex items-baseline justify-between gap-3">
					<p class={kicker}>Network · example app</p>
					<p class="text-xs text-muted-foreground">req / min</p>
				</div>
				<p class="text-lg leading-snug text-foreground">Same screens, <span class="text-primary">one sixth</span> of the requests.</p>
				<TrendChart points={requests} label="Requests a minute" height={130} names={['With gpui-query', 'Fetch in render']} class="mt-auto" />
			</article>
		</div>

		<div class="mt-24 grid gap-6 md:mt-28 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
			<div>
				<p class={kicker}>Defaults</p>
				<h3 class={cn(subtitle, 'mt-4')}>Defaults you can read in one grid.</h3>
			</div>
			<p class="max-w-[46ch] text-lg leading-snug text-foreground lg:justify-self-end">Borrowed from TanStack Query, because they hold up. Point at a default to see how one query changes it.</p>
		</div>
		<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each defaults as d (d.name)}
				<article class={cn(outline, 'group/default relative flex min-h-72 min-w-0 flex-col overflow-hidden')}>
					{#if d.preset}
						<div class="relative h-28 shrink-0 overflow-hidden border-b border-foreground/10">
							<ShaderMaterial preset={d.preset} rendering="image" controls={false} sizes="(min-width: 1024px) 25vw, 50vw" class="absolute inset-0 transition-transform duration-700 group-hover/default:scale-110 motion-reduce:transition-none motion-reduce:group-hover/default:scale-100" />
						</div>
					{/if}
					<div class="flex flex-1 flex-col gap-4 p-5 sm:p-6">
						{#if !d.preset}<IconTile><d.icon class="lucide" /></IconTile>{/if}
						<div class="flex flex-col gap-1.5">
							<h4 class="text-lg font-medium tracking-[-0.01em]">{d.title}</h4>
							<p class="text-[0.9375rem] leading-snug text-foreground/85">{d.body}</p>
						</div>
						<div class="mt-auto">
							<p class="font-mono text-5xl leading-none font-medium tracking-[-0.04em] tabular-nums">{d.value}</p>
							<div class="relative mt-2 h-5 overflow-hidden font-mono text-xs">
								<span class="absolute inset-0 truncate text-muted-foreground transition-[translate,opacity] duration-300 group-hover/default:-translate-y-full group-hover/default:opacity-0 motion-reduce:transition-none">{d.name}</span>
								<span class="absolute inset-0 translate-y-full truncate text-primary opacity-0 transition-[translate,opacity] duration-300 group-hover/default:translate-y-0 group-hover/default:opacity-100 motion-reduce:transition-none">{d.override}</span>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</Container>
</section>
