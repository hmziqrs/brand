<script lang="ts" module>
	export type TimelineRow = { key: string; mounts: number[]; unmount?: number };
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		rows = [
			{ key: 'Pulls::open', mounts: [2, 9, 16, 27, 33, 44], unmount: 49 },
			{ key: 'Viewer', mounts: [0, 21, 42] },
			{ key: 'Checks(9f3c)', mounts: [6, 11, 30], unmount: 37 }
		],
		span = 60,
		staleTime = 15,
		gcTime = 8,
		fetchTime = 2.5,
		interactive = false,
		playhead = true,
		legend = true,
		class: className
	}: {
		rows?: TimelineRow[];
		span?: number;
		staleTime?: number;
		gcTime?: number;
		fetchTime?: number;
		interactive?: boolean;
		playhead?: boolean;
		legend?: boolean;
		class?: string;
	} = $props();

	let stale = $state(untrack(() => staleTime));

	type Seg = { kind: 'fetch' | 'fresh' | 'stale' | 'inactive'; from: number; to: number };
	type Mark = { kind: 'hit' | 'gc'; at: number };

	const model = $derived.by(() => {
		let fetches = 0;
		let hits = 0;
		const out = rows.map((row) => {
			const end = row.unmount ?? span;
			const starts: number[] = [];
			const marks: Mark[] = [];
			let ready = -Infinity;
			for (const m of [...row.mounts].sort((a, b) => a - b)) {
				if (m > end) break;
				if (starts.length === 0 || m >= ready + stale) {
					starts.push(m);
					ready = m + fetchTime;
				} else marks.push({ kind: 'hit', at: m });
			}
			const segs: Seg[] = [];
			starts.forEach((s, i) => {
				const done = Math.min(s + fetchTime, end);
				segs.push({ kind: 'fetch', from: s, to: done });
				const next = Math.min(starts[i + 1] ?? end, end);
				const freshEnd = Math.min(done + stale, next);
				if (freshEnd > done) segs.push({ kind: 'fresh', from: done, to: freshEnd });
				if (next > freshEnd) segs.push({ kind: 'stale', from: freshEnd, to: next });
			});
			if (row.unmount !== undefined) {
				const gone = Math.min(row.unmount + gcTime, span);
				segs.push({ kind: 'inactive', from: row.unmount, to: gone });
				if (row.unmount + gcTime <= span) marks.push({ kind: 'gc', at: row.unmount + gcTime });
			}
			fetches += starts.length;
			hits += marks.filter((m) => m.kind === 'hit').length;
			return { key: row.key, segs, marks };
		});
		return { rows: out, fetches, hits };
	});

	const pct = (t: number) => `${(Math.max(0, Math.min(span, t)) / span) * 100}%`;
	const segClass = {
		fetch: 'bg-primary',
		fresh: 'bg-green/25 ring-1 ring-inset ring-green/50',
		stale: 'bento-hatch ring-1 ring-inset ring-yellow/45',
		inactive: 'border border-dashed border-foreground/30'
	} as const;
	const ticks = $derived(Array.from({ length: Math.floor(span / 10) + 1 }, (_, i) => i * 10));
</script>

<div data-slot="cache-timeline" class={cn('flex min-w-0 flex-col gap-4', className)}>
	<div class="flex min-w-0 gap-3">
		<div class="flex shrink-0 flex-col gap-2.5 pt-0">
			{#each model.rows as r (r.key)}
				<span class="flex h-7 items-center font-mono text-[0.6875rem] text-foreground sm:text-xs">{r.key}</span>
			{/each}
			<span class="h-4"></span>
		</div>
		<div class="relative flex min-w-0 flex-1 flex-col gap-2.5">
			{#each model.rows as r (r.key)}
				<div class="relative h-7 rounded-md bg-foreground/[0.04]">
					{#each r.segs as s, i (i)}
						<span class={cn('absolute inset-y-1 rounded-[4px]', segClass[s.kind], s.kind === 'fetch' && 'inset-y-0.5')} style:left={pct(s.from)} style:width={`calc(${pct(s.to - s.from)} - 1px)`}></span>
					{/each}
					{#each r.marks as m, i (i)}
						{#if m.kind === 'hit'}
							<span class="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green bg-background" style:left={pct(m.at)} title="Cache hit"></span>
						{:else}
							<span class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.625rem] text-muted-foreground" style:left={pct(m.at)}>gc</span>
						{/if}
					{/each}
				</div>
			{/each}
			<div class="relative h-4 font-mono text-[0.625rem] text-muted-foreground">
				{#each ticks as t (t)}
					<span class={cn('absolute', t === 0 ? '' : t === span ? '-translate-x-full' : '-translate-x-1/2')} style:left={pct(t)}>{t}s</span>
				{/each}
			</div>
			{#if playhead}
				<span aria-hidden="true" class="bento-playhead pointer-events-none absolute -top-1.5 bottom-4 w-px bg-foreground/70">
					<span class="absolute -top-0.5 -left-[3px] size-[7px] rounded-full bg-foreground"></span>
				</span>
			{/if}
		</div>
	</div>
	{#if interactive}
		<label class="flex flex-wrap items-center gap-3 text-sm text-foreground">
			<span class="font-mono text-xs">stale_time</span>
			<input type="range" min="0" max="40" step="1" bind:value={stale} class="h-1.5 min-w-32 flex-1 accent-primary" />
			<span class="w-10 text-right font-mono text-xs tabular-nums">{stale}s</span>
		</label>
	{/if}
	<div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
		<div class="flex items-baseline gap-5">
			<p class="flex flex-col"><span class="font-mono text-3xl leading-none font-medium tracking-tight text-primary tabular-nums">{model.fetches}</span><span class="mt-1 text-xs text-muted-foreground">network fetches</span></p>
			<p class="flex flex-col"><span class="font-mono text-3xl leading-none font-medium tracking-tight text-foreground tabular-nums">{model.hits}</span><span class="mt-1 text-xs text-muted-foreground">reads from cache</span></p>
		</div>
		{#if legend}
			<ul class="flex flex-wrap gap-x-3.5 gap-y-1.5 text-xs text-foreground">
				<li class="flex items-center gap-1.5"><i class="h-2.5 w-4 rounded-sm bg-primary"></i>fetch</li>
				<li class="flex items-center gap-1.5"><i class="h-2.5 w-4 rounded-sm bg-green/25 ring-1 ring-inset ring-green/50"></i>fresh</li>
				<li class="flex items-center gap-1.5"><i class="bento-hatch h-2.5 w-4 rounded-sm ring-1 ring-inset ring-yellow/45"></i>stale</li>
				<li class="flex items-center gap-1.5"><i class="size-2.5 rounded-full border-2 border-green"></i>cache hit</li>
				<li class="flex items-center gap-1.5"><i class="h-2.5 w-4 rounded-sm border border-dashed border-foreground/40"></i>unused</li>
			</ul>
		{/if}
	</div>
</div>

<style>
	:global(.bento-hatch) {
		background-image: repeating-linear-gradient(
			-45deg,
			color-mix(in oklab, var(--yellow) 45%, transparent) 0 3px,
			transparent 3px 7px
		);
	}
	.bento-playhead {
		left: 0;
		animation: bento-scan 12s linear infinite;
	}
	@keyframes bento-scan {
		from {
			left: 0%;
		}
		to {
			left: 100%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.bento-playhead {
			animation: none;
			left: 62%;
		}
	}
</style>
