<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ArrowUpDown from '@lucide/svelte/icons/arrow-up-down';
	import RowActions from '$brand/blocks/app/table/row-actions.svelte';
	import { cn } from '$brand/utils.js';
	import InlineRing from './inline-ring.svelte';
	import RowSpark from './row-spark.svelte';
	import StatusPill from './status-pill.svelte';
	import type { FleetRow, FleetState } from './tarnish-data';

	let { rows, href = '#', class: className }: { rows: FleetRow[]; href?: string; class?: string } = $props();

	const filters = [
		{ id: 'all', label: 'All' },
		{ id: 'issues', label: 'Needs a look' },
		{ id: 'up', label: 'Up' },
		{ id: 'paused', label: 'Paused' }
	] as const;
	let filter = $state<(typeof filters)[number]['id']>('all');
	let query = $state('');
	let sort = $state<'name' | 'uptime' | 'p50'>('name');
	let selected = $state<string[]>([]);
	let closed = $state<string[]>([]);

	const order: FleetState[] = ['down', 'slow', 'up', 'paused'];
	const match = (r: FleetRow) =>
		(filter === 'all' || (filter === 'issues' ? r.state === 'down' || r.state === 'slow' : r.state === filter)) &&
		(!query || r.name.includes(query.toLowerCase()));
	const sorted = $derived(
		rows.filter(match).toSorted((a, b) =>
			sort === 'uptime' ? (a.uptime ?? 101) - (b.uptime ?? 101) : sort === 'p50' ? (b.p50 ?? -1) - (a.p50 ?? -1) : order.indexOf(a.state) - order.indexOf(b.state) || a.name.localeCompare(b.name)
		)
	);
	const groups = $derived(
		[...new Set(rows.map((r) => r.group))].map((g) => ({ name: g, rows: sorted.filter((r) => r.group === g), all: rows.filter((r) => r.group === g) })).filter((g) => g.rows.length)
	);
	const count = (id: string) => rows.filter((r) => (id === 'all' ? true : id === 'issues' ? r.state === 'down' || r.state === 'slow' : r.state === id)).length;
	const tone = (s: FleetState) => (s === 'down' ? 'var(--red)' : s === 'slow' ? 'var(--yellow)' : s === 'paused' ? 'var(--muted-foreground)' : 'var(--primary)');
	const day = (v: number) => (v < 99 ? 'bg-red' : v < 99.8 ? 'bg-yellow' : 'bg-green/70');
	const toggle = (n: string) => (selected = selected.includes(n) ? selected.filter((s) => s !== n) : [...selected, n]);
	const all = $derived(sorted.length > 0 && sorted.every((r) => selected.includes(r.name)));
</script>

<div data-move="fleet-table" class={cn('overflow-hidden rounded-xl border border-border bg-card', className)}>
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3">
		<div role="tablist" aria-label="Filter monitors" class="flex flex-wrap gap-1">
			{#each filters as f (f.id)}
				<button
					type="button"
					role="tab"
					aria-selected={filter === f.id}
					onclick={() => (filter = f.id)}
					class="inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground hover:text-foreground aria-selected:bg-muted aria-selected:text-foreground"
				>
					{f.label}<span class="rounded bg-background px-1.5 font-mono text-[0.6875rem] tabular-nums">{count(f.id)}</span>
				</button>
			{/each}
		</div>
		<label class="flex h-8 w-full items-center gap-2 rounded-md border border-border bg-background px-2.5 text-sm sm:w-64">
			<Search class="lucide size-4 text-muted-foreground" />
			<input bind:value={query} placeholder="Filter by name" aria-label="Filter monitors by name" class="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
		</label>
	</div>

	{#if selected.length}
		<div class="flex items-center justify-between gap-3 border-b border-border bg-primary px-4 py-2 text-sm text-primary-foreground">
			<span><b class="tabular-nums">{selected.length}</b> selected</span>
			<span class="flex gap-2">
				<button type="button" class="rounded-md border border-current/30 px-2.5 py-1">Pause</button>
				<button type="button" class="rounded-md border border-current/30 px-2.5 py-1">Mute alerts</button>
				<button type="button" onclick={() => (selected = [])} class="rounded-md px-2.5 py-1 underline-offset-4 hover:underline">Clear</button>
			</span>
		</div>
	{/if}

	<div class="max-h-[40rem] overflow-auto">
		<table class="w-full min-w-[60rem] border-separate border-spacing-0 text-sm">
			<thead class="sticky top-0 z-10 bg-card/95 backdrop-blur">
				<tr class="text-left text-[0.75rem] text-muted-foreground">
					<th class="w-10 border-b border-border py-2.5 pl-4"><input type="checkbox" checked={all} onchange={() => (selected = all ? [] : sorted.map((r) => r.name))} aria-label="Select all" class="size-4 accent-primary" /></th>
					<th class="border-b border-border py-2.5 font-medium"><button type="button" onclick={() => (sort = 'name')} class="inline-flex items-center gap-1 hover:text-foreground" class:text-foreground={sort === 'name'}>Monitor <ArrowUpDown class="lucide size-3" /></button></th>
					<th class="border-b border-border py-2.5 font-medium">Status</th>
					<th class="border-b border-border py-2.5 font-medium">Response, 24 h</th>
					<th class="border-b border-border py-2.5 text-right font-medium"><button type="button" onclick={() => (sort = 'p50')} class="inline-flex items-center gap-1 hover:text-foreground" class:text-foreground={sort === 'p50'}>p50 <ArrowUpDown class="lucide size-3" /></button></th>
					<th class="border-b border-border py-2.5 pl-6 font-medium">30 days</th>
					<th class="border-b border-border py-2.5 text-right font-medium"><button type="button" onclick={() => (sort = 'uptime')} class="inline-flex items-center gap-1 hover:text-foreground" class:text-foreground={sort === 'uptime'}>Uptime <ArrowUpDown class="lucide size-3" /></button></th>
					<th class="border-b border-border py-2.5 pl-6 font-medium">Regions</th>
					<th class="w-12 border-b border-border py-2.5 pr-3"><span class="sr-only">Actions</span></th>
				</tr>
			</thead>
			{#each groups as g (g.name)}
				{@const open = !closed.includes(g.name)}
				{@const issues = g.all.filter((r) => r.state === 'down' || r.state === 'slow').length}
				<tbody>
					<tr>
						<th colspan="9" class="border-b border-border bg-muted/40 py-0 text-left font-normal">
							<button
								type="button"
								aria-expanded={open}
								onclick={() => (closed = open ? [...closed, g.name] : closed.filter((c) => c !== g.name))}
								class="flex w-full items-center gap-3 px-4 py-2 text-[0.8125rem]"
							>
								<ChevronDown class={cn('lucide size-4 transition-transform motion-reduce:transition-none', !open && '-rotate-90')} />
								<span class="font-medium text-foreground">{g.name}</span>
								<span class="text-muted-foreground">{g.all.length} monitors</span>
								{#if issues}<span class="ml-auto font-mono text-[0.6875rem] text-yellow uppercase">{issues} need a look</span>{:else}<span class="ml-auto font-mono text-[0.6875rem] text-muted-foreground uppercase">all quiet</span>{/if}
							</button>
						</th>
					</tr>
					{#if open}
						{#each g.rows as r (r.name)}
							{@const on = selected.includes(r.name)}
							<tr class={cn('group transition-colors hover:bg-muted/40', on && 'bg-primary/6', r.state === 'down' && 'bg-red/6')}>
								<td class="border-b border-border py-3 pl-4"><input type="checkbox" checked={on} onchange={() => toggle(r.name)} aria-label={`Select ${r.name}`} class="size-4 accent-primary" /></td>
								<td class="border-b border-border py-3 pr-4">
									<span class="flex items-center gap-3">
										<InlineRing seed={r.name} rings={4} weight={2} class={cn('size-7', r.state === 'paused' && 'opacity-40 grayscale')} />
										<span class="min-w-0">
											<a {href} class="block truncate font-medium text-foreground hover:underline">{r.name}</a>
											<span class="font-mono text-[0.6875rem] text-muted-foreground">{r.kind} · {r.last}</span>
										</span>
									</span>
								</td>
								<td class="border-b border-border py-3 pr-4"><StatusPill state={r.state} /></td>
								<td class="border-b border-border py-3 pr-4"><RowSpark values={r.series} color={tone(r.state)} label={`${r.name} response over 24 hours`} /></td>
								<td class="border-b border-border py-3 text-right font-mono tabular-nums">{r.p50 === null ? '—' : `${r.p50} ms`}</td>
								<td class="border-b border-border py-3 pl-6">
									<span class="flex h-5 items-end gap-px" aria-label={`${r.name}: last 30 days`} role="img">
										{#each r.days as d, i (i)}<span class={cn('w-[3px] rounded-[1px]', r.state === 'paused' ? 'bg-muted-foreground/30' : day(d))} style:height={`${d < 99 ? 100 : d < 99.8 ? 75 : 55}%`}></span>{/each}
									</span>
								</td>
								<td class="border-b border-border py-3 text-right font-mono tabular-nums">{r.uptime === null ? '—' : `${r.uptime.toFixed(2)}%`}</td>
								<td class="border-b border-border py-3 pl-6">
									<span class="flex items-center gap-2 font-mono text-[0.75rem] tabular-nums">
										<span class="relative h-1.5 w-14 overflow-hidden rounded-full bg-muted">
											<span class="absolute inset-y-0 left-0 rounded-full" style:width={`${r.regions[1] ? (r.regions[0] / r.regions[1]) * 100 : 0}%`} style:background={tone(r.state)}></span>
										</span>
										{r.regions[0]}/{r.regions[1]}
									</span>
								</td>
								<td class="border-b border-border py-3 pr-3">
									<RowActions label={`Actions for ${r.name}`} items={[{ label: 'Open', href }, { label: 'Check now', onSelect: () => {} }, { label: r.state === 'paused' ? 'Resume' : 'Pause', onSelect: () => {} }, { label: 'Delete', onSelect: () => {}, tone: 'destructive' }]} />
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			{/each}
		</table>
		{#if !groups.length}<p class="p-10 text-center text-muted-foreground">No monitors match.</p>{/if}
	</div>
</div>
