<script lang="ts" module>
	export type LaneRow = { key: string; mounts: number[]; unmount?: number };
</script>

<script lang="ts">
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
		lap = 12,
		class: className
	}: {
		rows?: LaneRow[];
		span?: number;
		staleTime?: number;
		gcTime?: number;
		fetchTime?: number;
		lap?: number;
		class?: string;
	} = $props();

	type Kind = 'fetch' | 'fresh' | 'stale' | 'inactive';
	type Seg = { kind: Kind; from: number; to: number };
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
				if (starts.length === 0 || m >= ready + staleTime) {
					starts.push(m);
					ready = m + fetchTime;
				} else marks.push({ kind: 'hit', at: m });
			}
			const segs: Seg[] = [];
			starts.forEach((s, i) => {
				const done = Math.min(s + fetchTime, end);
				segs.push({ kind: 'fetch', from: s, to: done });
				const next = Math.min(starts[i + 1] ?? end, end);
				const freshEnd = Math.min(done + staleTime, next);
				if (freshEnd > done) segs.push({ kind: 'fresh', from: done, to: freshEnd });
				if (next > freshEnd) segs.push({ kind: 'stale', from: freshEnd, to: next });
			});
			let gone = Infinity;
			if (row.unmount !== undefined) {
				gone = Math.min(row.unmount + gcTime, span);
				segs.push({ kind: 'inactive', from: row.unmount, to: gone });
				if (row.unmount + gcTime <= span) marks.push({ kind: 'gc', at: row.unmount + gcTime });
			}
			fetches += starts.length;
			hits += marks.filter((m) => m.kind === 'hit').length;
			return { key: row.key, segs, marks, gone };
		});
		return { rows: out, fetches, hits };
	});

	let t = $state(0);
	let scrubbing = $state(false);
	let still = $state(false);
	let lanes: HTMLDivElement | undefined = $state();

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still) {
			t = span * 0.55;
			return;
		}
		let raf = 0;
		let last = 0;
		let visible = true;
		const io = new IntersectionObserver((e) => (visible = e.some((x) => x.isIntersecting)));
		if (lanes) io.observe(lanes);
		const frame = (now: number) => {
			raf = requestAnimationFrame(frame);
			const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
			last = now;
			if (!visible || scrubbing) return;
			t = (t + (dt * span) / lap) % span;
		};
		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	});

	function scrub(e: PointerEvent) {
		if (!lanes) return;
		const r = lanes.getBoundingClientRect();
		t = Math.max(0, Math.min(span, ((e.clientX - r.left) / r.width) * span));
		scrubbing = true;
	}

	function key(e: KeyboardEvent) {
		const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
		if (!d) return;
		e.preventDefault();
		scrubbing = true;
		t = Math.max(0, Math.min(span, Math.round(t) + d));
	}

	const pct = (v: number) => `${(Math.max(0, Math.min(span, v)) / span) * 100}%`;
	const segClass: Record<Kind, string> = {
		fetch: 'bg-primary',
		fresh: 'bg-green/25 ring-1 ring-inset ring-green/50',
		stale: 'lanes-hatch ring-1 ring-inset ring-yellow/45',
		inactive: 'border border-dashed border-foreground/30'
	};
	const dotClass: Record<Kind | 'gone' | 'none', string> = {
		fetch: 'bg-primary',
		fresh: 'bg-green',
		stale: 'bg-yellow',
		inactive: 'border border-dashed border-foreground/60',
		gone: 'bg-foreground/15',
		none: 'bg-foreground/15'
	};
	const word: Record<Kind | 'gone' | 'none', string> = { fetch: 'fetching', fresh: 'fresh', stale: 'stale', inactive: 'unused', gone: 'collected', none: 'not asked yet' };
	const at = (r: (typeof model.rows)[number]) => (t >= r.gone ? 'gone' : (r.segs.find((s) => t >= s.from && t < s.to)?.kind ?? 'none'));
	const ticks = $derived(Array.from({ length: Math.floor(span / 10) + 1 }, (_, i) => i * 10));
</script>

<div data-slot="cache-lanes" class={cn('flex min-w-0 flex-col gap-4', className)}>
	<div class="flex min-w-0 gap-3">
		<div class="flex shrink-0 flex-col gap-2.5">
			{#each model.rows as r (r.key)}
				{@const s = at(r)}
				<span class="flex h-7 items-center gap-2 font-mono text-[0.6875rem] text-foreground sm:text-xs" title={`${r.key}: ${word[s]}`}>
					<i class={cn('size-2 shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none', dotClass[s])}></i>{r.key}
				</span>
			{/each}
			<span class="h-4"></span>
		</div>
		<div
			bind:this={lanes}
			role="slider"
			tabindex="0"
			aria-label="Time on the cache timeline"
			aria-valuemin={0}
			aria-valuemax={span}
			aria-valuenow={Math.round(t)}
			aria-valuetext={`${Math.round(t)} seconds: ${model.rows.map((r) => `${r.key} ${word[at(r)]}`).join(', ')}`}
			class="relative flex min-w-0 flex-1 cursor-ew-resize touch-pan-y flex-col gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
			onpointermove={scrub}
			onpointerdown={scrub}
			onpointerleave={() => (scrubbing = false)}
			onkeydown={key}
			onblur={() => (scrubbing = false)}
		>
			{#each model.rows as r (r.key)}
				<div class="relative h-7 rounded-md ring-1 ring-foreground/[0.07] ring-inset">
					{#each r.segs as s, i (i)}
						{@const on = t >= s.from && t < s.to}
						<span
							class={cn('absolute inset-y-1 rounded-[4px] transition-[box-shadow] duration-150', segClass[s.kind], s.kind === 'fetch' && 'inset-y-0.5', on && 'shadow-[0_0_0_1.5px_var(--foreground)]')}
							style:left={pct(s.from)}
							style:width={`calc(${pct(s.to - s.from)} - 1px)`}
						></span>
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
				{#each ticks as tick (tick)}
					<span class={cn('absolute', tick === 0 ? '' : tick === span ? '-translate-x-full' : '-translate-x-1/2')} style:left={pct(tick)}>{tick}s</span>
				{/each}
			</div>
			<span aria-hidden="true" class="pointer-events-none absolute -top-1.5 bottom-4 w-px bg-foreground/70" style:left={pct(t)}>
				<span class="absolute -top-0.5 -left-[3px] size-[7px] rounded-full bg-foreground"></span>
				<span class={cn('absolute -top-6 -translate-x-1/2 rounded bg-foreground px-1 font-mono text-[0.625rem] leading-4 text-background tabular-nums transition-opacity', scrubbing ? 'opacity-100' : 'opacity-0')}>{Math.round(t)}s</span>
			</span>
		</div>
	</div>
	<div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
		<div class="flex items-baseline gap-5">
			<p class="flex flex-col"><span data-display class="font-mono text-3xl leading-none font-medium tracking-tight text-primary tabular-nums">{model.fetches}</span><span class="mt-1 text-xs text-muted-foreground">network fetches</span></p>
			<p class="flex flex-col"><span class="font-mono text-3xl leading-none font-medium tracking-tight text-foreground tabular-nums">{model.hits}</span><span class="mt-1 text-xs text-muted-foreground">reads from cache</span></p>
		</div>
		<ul class="flex flex-wrap gap-x-3.5 gap-y-1.5 text-xs text-foreground">
			<li class="flex items-center gap-1.5"><i class="h-2.5 w-4 rounded-sm bg-primary"></i>fetch</li>
			<li class="flex items-center gap-1.5"><i class="h-2.5 w-4 rounded-sm bg-green/25 ring-1 ring-green/50 ring-inset"></i>fresh</li>
			<li class="flex items-center gap-1.5"><i class="lanes-hatch h-2.5 w-4 rounded-sm ring-1 ring-yellow/45 ring-inset"></i>stale</li>
			<li class="flex items-center gap-1.5"><i class="size-2.5 rounded-full border-2 border-green"></i>cache hit</li>
			<li class="flex items-center gap-1.5"><i class="h-2.5 w-4 rounded-sm border border-dashed border-foreground/40"></i>unused</li>
		</ul>
	</div>
</div>

<style>
	:global(.lanes-hatch) {
		background-image: repeating-linear-gradient(-45deg, color-mix(in oklab, var(--yellow) 45%, transparent) 0 3px, transparent 3px 7px);
	}
</style>
