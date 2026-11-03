<script lang="ts">
	import KeyRound from '@lucide/svelte/icons/key-round';
	import Layers from '@lucide/svelte/icons/layers';
	import Undo2 from '@lucide/svelte/icons/undo-2';
	import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import Glass from '$brand/components/glass.svelte';
	import IconTile from '$brand/components/icon-tile.svelte';
	import RollingNumber from '$brand/components/rolling-number.svelte';
	import Segmented from '$brand/components/segmented.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import TrendChart from '$brand/blocks/showcase/trend-chart.svelte';
	import SectionHead from './section-head.svelte';
	import { kicker, outline } from './ui';

	let { class: className }: { here?: string; class?: string } = $props();

	type Mode = 'query' | 'render';
	let mode = $state<Mode>('query');
	let hot = $state(-1);

	const modes = [
		{ value: 'query', label: 'With gpui-query' },
		{ value: 'render', label: 'Fetch in render' }
	] as const;

	const kpi = {
		query: { requests: 9, spinners: 0, dupes: 0, hits: 86 },
		render: { requests: 47, spinners: 6, dupes: 11, hits: 0 }
	};
	const now = $derived(kpi[mode]);
	const other = $derived(kpi[mode === 'query' ? 'render' : 'query']);

	const screens = [
		{ label: 'Pull detail', query: 38, render: 640 },
		{ label: 'Inbox', query: 24, render: 410 },
		{ label: 'Checks', query: 21, render: 380 },
		{ label: 'Reviews', query: 12, render: 260 },
		{ label: 'Settings', query: 3, render: 90 }
	];
	const top = Math.max(...screens.map((s) => s.render));

	const minutes = Array.from({ length: 24 }, (_, i) => {
		const wave = Math.sin(i / 3.2) * 6;
		return { label: `${i}m`, query: Math.round(9 + wave + (i % 5)), render: Math.round(64 + wave * 3 + ((i * 7) % 11)) };
	});
	const points = $derived(minutes.map((m) => ({ label: m.label, value: mode === 'query' ? m.query : m.render, previous: mode === 'query' ? m.render : m.query })));
	const names = $derived<[string, string]>(mode === 'query' ? ['With gpui-query', 'Fetch in render'] : ['Fetch in render', 'With gpui-query']);

	const change = (a: number, b: number) => (b === 0 ? 0 : Math.round(((a - b) / b) * 100));

	const plus = [
		{ title: 'Typed keys', body: 'Keys are structs and enums, so a typo in one is a compile error.', stat: '0', label: 'string keys', icon: KeyRound },
		{ title: 'One shared cache', body: 'Every view that asks for the same key reads the same entry.', stat: '12 → 1', label: 'views to requests', icon: Layers },
		{ title: 'Rollback', body: 'A refused write puts the old value back before anyone acts on it.', stat: '0', label: 'wrong counts left on screen', icon: Undo2 }
	];
</script>

{#snippet delta(a: number, b: number, lower: boolean)}
	{@const d = change(a, b)}
	{#if d !== 0}
		<span class={cn('inline-flex items-center gap-0.5 text-xs font-medium tabular-nums', (lower ? d < 0 : d > 0) ? 'text-success' : 'text-destructive')}>
			{#if d > 0}<ArrowUpRight class="lucide size-3.5" />{:else}<ArrowDownRight class="lucide size-3.5" />{/if}{Math.abs(d)}%
		</span>
	{/if}
{/snippet}

<section data-slot="query-numbers" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead kicker="In numbers" title="Fewer requests. No spinners on the way back." accent="No spinners" lede="Measured in the example inbox app, built twice: once with gpui-query, once with a fetch in every render. Flip the switch to compare.">
			{#snippet aside()}
				<Segmented label="Which build" options={modes} value={mode} onValueChange={(v) => (mode = v as Mode)} />
			{/snippet}
		</SectionHead>

		<div class="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-4 lg:grid-cols-6">
			<article class="band-orange relative isolate flex min-h-56 min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 md:col-span-2 lg:col-span-2">
				<CornerRings seed="requests" color="var(--on-orange)" class="pointer-events-none -z-10 w-1/2 opacity-60 [&_circle]:[stroke-width:0.5]" />
				<p class="font-mono text-xs tracking-wide uppercase">Requests per session</p>
				<div>
					<p class="text-[clamp(4rem,8vw,6.5rem)] leading-[0.85] font-medium tracking-[-0.06em]"><RollingNumber value={now.requests} /></p>
					<p class="mt-3 text-[0.9375rem] leading-snug">{mode === 'query' ? `${other.requests} with a fetch in every render.` : `${other.requests} with gpui-query.`}</p>
				</div>
			</article>

			<article class={cn(outline, 'flex min-w-0 flex-col gap-4 p-5 sm:p-6 md:col-span-4 md:row-span-2 lg:col-span-4')}>
				<div class="flex flex-wrap items-baseline justify-between gap-3">
					<p class={kicker}>Network · one 24-minute session</p>
					<p class="text-xs text-muted-foreground">Point at the chart for a minute's numbers</p>
				</div>
				<p class="max-w-[40ch] text-lg leading-snug text-foreground">{mode === 'query' ? 'Background refetches stay low and flat while you work.' : 'Every render asks again, so requests track every click.'}</p>
				<TrendChart {points} label="Requests a minute" height={240} {names} class="mt-auto" />
			</article>

			<article class={cn(outline, 'flex min-h-48 min-w-0 flex-col justify-between gap-6 p-6 md:col-span-2 lg:col-span-2')}>
				<div class="flex items-start justify-between gap-3">
					<p class="text-sm text-muted-foreground">Spinners on a revisit</p>
					{@render delta(now.spinners, other.spinners, true)}
				</div>
				<div>
					<p class="text-6xl leading-none font-medium tracking-[-0.05em]"><RollingNumber value={now.spinners} /></p>
					<p class="mt-2 text-[0.9375rem] text-foreground/85">{now.spinners === 0 ? 'Cached rows render first.' : 'The list blanks, then loads.'}</p>
				</div>
			</article>

			<article class={cn(outline, 'flex min-w-0 flex-col gap-5 p-5 sm:p-6 md:col-span-4 lg:col-span-3')}>
				<div class="flex flex-wrap items-baseline justify-between gap-3">
					<p class={kicker}>Time to rows on a revisit</p>
					<p class="text-xs text-muted-foreground">p95, ms</p>
				</div>
				<ul class="flex flex-col gap-2">
					{#each screens as s, i (s.label)}
						{@const v = mode === 'query' ? s.query : s.render}
						{@const was = mode === 'query' ? s.render : s.query}
						<li class="grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-3 text-sm">
							<span role="presentation" class="relative flex h-9 items-center overflow-hidden rounded-md px-3 ring-1 ring-foreground/[0.07] ring-inset" onpointerenter={() => (hot = i)} onpointerleave={() => (hot = -1)}>
								<i aria-hidden="true" class="absolute inset-y-1 left-0 rounded-[5px] border border-dashed border-foreground/25 transition-[width] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none" style:width={`${Math.max(1.5, (was / top) * 100)}%`}></i>
								<i aria-hidden="true" class={cn('absolute inset-y-0 left-0 rounded-md transition-[width,background-color] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none', hot === i ? 'bg-primary/35' : 'bg-primary/25 dark:bg-primary/30')} style:width={`${Math.max(3, (v / top) * 100)}%`}></i>
								<span class="relative truncate text-foreground">{s.label}</span>
								<span class={cn('relative ml-auto pl-3 font-mono text-[0.6875rem] whitespace-nowrap text-muted-foreground transition-opacity duration-200', hot === i ? 'opacity-100' : 'opacity-0')}>was {was} ms</span>
							</span>
							<span class="text-right font-mono text-foreground tabular-nums"><RollingNumber value={v} /> ms</span>
						</li>
					{/each}
				</ul>
			</article>

			<article class="relative isolate flex min-h-64 min-w-0 flex-col justify-end overflow-hidden rounded-2xl p-3 ring-1 ring-foreground/10 sm:p-4 md:col-span-4 lg:col-span-3">
				<ShaderMaterial preset="hammered-copper" rendering="image" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0 -z-10" />
				<Glass variant="smoke" class="flex flex-col gap-4 rounded-xl p-5 sm:p-6">
					<div class="flex items-start justify-between gap-3">
						<p class="text-sm text-foreground">Reads served from the cache</p>
						<p class="font-mono text-xs text-muted-foreground">{now.dupes} duplicate requests</p>
					</div>
					<p class="text-[clamp(3.5rem,6vw,5rem)] leading-[0.85] font-medium tracking-[-0.05em]"><RollingNumber value={now.hits} />%</p>
					<div class="h-2.5 overflow-hidden rounded-full ring-1 ring-foreground/15" role="progressbar" aria-label="Reads served from the cache" aria-valuemin={0} aria-valuemax={100} aria-valuenow={now.hits}>
						<div class="h-full rounded-full bg-primary transition-[width] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none" style:width={`${now.hits}%`}></div>
					</div>
				</Glass>
			</article>

			{#each plus as p (p.title)}
				<article class={cn(outline, 'flex min-w-0 flex-col gap-5 p-6 md:col-span-2 lg:col-span-2')}>
					<IconTile><p.icon class="lucide" /></IconTile>
					<div class="flex flex-col gap-1.5">
						<h3 class="text-lg font-medium tracking-[-0.01em]">{p.title}</h3>
						<p class="text-[0.9375rem] leading-snug text-foreground/85">{p.body}</p>
					</div>
					<p class="mt-auto flex items-baseline gap-2.5 pt-2">
						<span class="font-mono text-3xl leading-none font-medium tracking-[-0.03em]">{p.stat}</span>
						<span class="text-[0.8125rem] text-muted-foreground">{p.label}</span>
					</p>
				</article>
			{/each}
		</div>
		<p class="mt-5 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">Example app numbers, one session on one machine</p>
	</Container>
</section>
