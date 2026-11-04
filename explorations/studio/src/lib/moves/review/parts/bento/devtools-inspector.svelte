<script lang="ts">
	import { untrack } from 'svelte';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import CircleSlash from '@lucide/svelte/icons/circle-slash';
	import Eye from '@lucide/svelte/icons/eye';
	import { cn } from '$brand/utils.js';
	import { inspectorSeed, stateDot, stateTone, type InspectorQuery, type QueryState } from './query-data';

	let {
		queries = inspectorSeed,
		initial = 0,
		live = true,
		title = 'gpui-query devtools',
		class: className
	}: {
		queries?: InspectorQuery[];
		initial?: number;
		live?: boolean;
		title?: string;
		class?: string;
	} = $props();

	let rows = $state<InspectorQuery[]>(untrack(() => queries.map((q) => ({ ...q }))));
	let sel = $state(untrack(() => initial));
	let ticks = 0;
	const cur = $derived(rows[sel] ?? rows[0]);
	const counts = $derived(
		(['fresh', 'fetching', 'stale', 'inactive'] as QueryState[]).map((s) => ({ s, n: rows.filter((r) => r.state === s).length }))
	);

	const fmt = (s: number) => (s < 60 ? `${s}s` : `${Math.floor(s / 60)}m`);

	function refetch(i: number) {
		const r = rows[i];
		if (!r || r.state === 'fetching') return;
		r.state = 'fetching';
		r.fetchLeft = 2;
		if (r.observers === 0) r.observers = 1;
	}

	function invalidate(i: number) {
		const r = rows[i];
		if (!r) return;
		if (r.observers > 0) refetch(i);
		else r.state = 'stale';
	}

	function tick() {
		ticks++;
		for (const r of rows) {
			if (r.state === 'fetching') {
				r.fetchLeft = (r.fetchLeft ?? 1) - 1;
				if (r.fetchLeft <= 0) {
					r.state = 'fresh';
					r.age = 0;
				}
			} else {
				r.age++;
				if (r.state === 'fresh' && r.age >= r.stale) r.state = 'stale';
			}
		}
		if (ticks % 7 === 0) {
			const i = rows.findIndex((r) => r.state === 'stale' && r.observers > 0);
			if (i >= 0) refetch(i);
		}
	}

	$effect(() => {
		if (!live) return;
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});

	const left = $derived(cur ? Math.max(0, cur.stale - cur.age) : 0);
	const share = $derived(cur ? Math.min(1, left / cur.stale) : 0);
</script>

<div data-slot="devtools-inspector" class={cn('@container flex min-w-0 flex-col overflow-hidden bg-card text-card-foreground', className)}>
	<div class="flex items-center justify-between gap-3 border-b px-3.5 py-2.5">
		<p class="flex min-w-0 items-center gap-2 text-[0.8125rem] font-medium">
			<span class="size-2.5 shrink-0 rounded-[2px] bg-(--mark-square)" aria-hidden="true"></span>
			<span class="truncate">{title}</span>
		</p>
		<div class="flex shrink-0 gap-1">
			{#each counts as c (c.s)}
				<span class={cn('rounded px-1.5 py-0.5 font-mono text-[0.6875rem] leading-4 tabular-nums', stateTone[c.s])} title={c.s}>{c.n}</span>
			{/each}
		</div>
	</div>
	<div class="grid min-h-0 flex-1 @xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
		<ul class="flex flex-col border-b @xl:border-r @xl:border-b-0" aria-label="Queries in the cache">
			{#each rows as r, i (r.key)}
				<li>
					<button
						type="button"
						onclick={() => (sel = i)}
						aria-pressed={i === sel}
						class={cn(
							'grid w-full grid-cols-[0.5rem_minmax(0,1fr)_auto] items-center gap-2.5 border-l-2 border-transparent px-3 py-2 text-left font-mono text-[0.75rem] transition-colors outline-none hover:bg-foreground/5 focus-visible:bg-foreground/8',
							i === sel && 'border-l-primary bg-primary/8'
						)}
					>
						<span class={cn('size-2 rounded-full', stateDot[r.state], r.state === 'fetching' && 'animate-pulse motion-reduce:animate-none')}></span>
						<span class={cn('truncate', r.state === 'inactive' ? 'text-muted-foreground' : 'text-foreground')}>{r.key}</span>
						<span class="flex items-center gap-2 text-[0.6875rem] text-muted-foreground tabular-nums">
							<span class="flex items-center gap-0.5"><Eye class="lucide size-3" />{r.observers}</span>
							<span class="w-7 text-right">{r.state === 'fetching' ? '…' : fmt(r.age)}</span>
						</span>
					</button>
				</li>
			{/each}
		</ul>
		{#if cur}
			<div class="flex min-w-0 flex-col gap-3 p-3.5">
				<div class="flex flex-wrap items-center gap-2">
					<span class={cn('rounded-md px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide', stateTone[cur.state])}>{cur.state}</span>
					<span class="font-mono text-[0.6875rem] text-muted-foreground">→ {cur.output}</span>
				</div>
				<p class="font-mono text-[0.8125rem] leading-snug break-words text-foreground">{cur.key}</p>
				<div class="flex flex-col gap-1.5">
					<div class="flex justify-between text-[0.6875rem]">
						<span class="text-muted-foreground">{cur.state === 'fetching' ? 'Fetching in background' : cur.state === 'fresh' ? 'Fresh for' : 'Stale'}</span>
						<span class="font-mono text-foreground tabular-nums">{cur.state === 'fresh' ? fmt(left) : cur.state === 'fetching' ? 'now' : `${fmt(cur.age)} old`}</span>
					</div>
					<div class="h-1.5 overflow-hidden rounded-full bg-foreground/8">
						{#if cur.state === 'fetching'}
							<div class="bento-indeterminate h-full w-1/3 rounded-full bg-primary"></div>
						{:else}
							<div class={cn('h-full rounded-full transition-[width] duration-1000 ease-linear motion-reduce:transition-none', cur.state === 'fresh' ? 'bg-green' : 'bg-yellow')} style:width={`${cur.state === 'fresh' ? share * 100 : 100}%`}></div>
						{/if}
					</div>
				</div>
				<dl class="grid grid-cols-3 gap-2 text-[0.6875rem]">
					<div><dt class="text-muted-foreground">Observers</dt><dd class="font-mono text-foreground">{cur.observers}</dd></div>
					<div><dt class="text-muted-foreground">Stale time</dt><dd class="font-mono text-foreground">{fmt(cur.stale)}</dd></div>
					<div><dt class="text-muted-foreground">GC after</dt><dd class="font-mono text-foreground">5m</dd></div>
				</dl>
				<pre class="max-h-36 overflow-auto rounded-md bg-background/60 p-2.5 font-mono text-[0.6875rem] leading-relaxed text-foreground ring-1 ring-foreground/8">{cur.data}</pre>
				<div class="mt-auto flex flex-wrap gap-1.5">
					<button type="button" onclick={() => refetch(sel)} class="inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground outline-none hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50">
						<RefreshCw class={cn('lucide size-3', cur.state === 'fetching' && 'animate-spin motion-reduce:animate-none')} />Refetch
					</button>
					<button type="button" onclick={() => invalidate(sel)} class="inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium text-foreground outline-none hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50">
						<CircleSlash class="lucide size-3" />Invalidate
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.bento-indeterminate {
		animation: bento-slide 1.1s ease-in-out infinite;
	}
	@keyframes bento-slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(300%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.bento-indeterminate {
			animation: none;
			width: 100%;
			opacity: 0.6;
		}
	}
</style>
