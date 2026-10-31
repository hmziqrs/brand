<script lang="ts">
	import RowActions from '$brand/blocks/app/table/row-actions.svelte';
	import { cn } from '$brand/utils.js';
	import RowSpark from './row-spark.svelte';
	import StatusPill from './status-pill.svelte';
	import type { ErrorState, errorGroups } from './tarnish-data';

	let { rows, href = '#', class: className }: { rows: typeof errorGroups; href?: string; class?: string } = $props();

	const states: (ErrorState | 'all')[] = ['all', 'new', 'regressed', 'ongoing', 'resolved'];
	let pick = $state<ErrorState | 'all'>('all');
	const shown = $derived(rows.filter((r) => pick === 'all' || r.state === pick));
	const groups = $derived([...new Set(rows.map((r) => r.service))].map((s) => ({ s, rows: shown.filter((r) => r.service === s) })).filter((g) => g.rows.length));
	const color = (s: ErrorState) => (s === 'regressed' ? 'var(--red)' : s === 'resolved' ? 'var(--muted-foreground)' : s === 'new' ? 'var(--primary)' : 'var(--yellow)');
</script>

<div data-move="error-table" class={cn('overflow-hidden rounded-xl border border-border bg-card', className)}>
	<div class="flex flex-wrap items-center gap-1 border-b border-border p-3">
		{#each states as s (s)}
			<button type="button" aria-pressed={pick === s} onclick={() => (pick = s)} class="h-8 rounded-md px-3 text-sm text-muted-foreground capitalize hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground">
				{s} <span class="font-mono text-[0.6875rem] tabular-nums">{s === 'all' ? rows.length : rows.filter((r) => r.state === s).length}</span>
			</button>
		{/each}
	</div>
	<div class="overflow-x-auto">
		<table class="w-full min-w-[56rem] border-separate border-spacing-0 text-sm">
			<thead class="sticky top-0 z-10 bg-card/95 backdrop-blur">
				<tr class="text-left text-[0.75rem] text-muted-foreground">
					<th class="border-b border-border py-2.5 pl-4 font-medium">Error</th>
					<th class="border-b border-border py-2.5 font-medium">Status</th>
					<th class="border-b border-border py-2.5 font-medium">Events, 24 h</th>
					<th class="border-b border-border py-2.5 text-right font-medium">Events</th>
					<th class="border-b border-border py-2.5 text-right font-medium">Users</th>
					<th class="border-b border-border py-2.5 pl-6 font-medium">Seen</th>
					<th class="border-b border-border py-2.5 font-medium">Release</th>
					<th class="w-12 border-b border-border py-2.5 pr-3"><span class="sr-only">Actions</span></th>
				</tr>
			</thead>
			{#each groups as g (g.s)}
				<tbody>
					<tr><th colspan="8" class="border-b border-border bg-muted/40 px-4 py-2 text-left text-[0.8125rem] font-medium">{g.s} <span class="font-normal text-muted-foreground">· {g.rows.reduce((a, r) => a + r.count, 0)} events</span></th></tr>
					{#each g.rows as r (r.title)}
						<tr class="hover:bg-muted/40">
							<td class="max-w-[26rem] border-b border-border py-3 pr-4 pl-4">
								<a {href} class="block truncate font-mono text-[0.8125rem] text-foreground hover:underline">{r.title}</a>
								<span class="text-[0.75rem] text-muted-foreground">{r.where}</span>
							</td>
							<td class="border-b border-border py-3 pr-4"><StatusPill state={r.state} /></td>
							<td class="border-b border-border py-3 pr-4"><RowSpark values={r.series} bars color={color(r.state)} label={`${r.title}: events over 24 hours`} /></td>
							<td class="border-b border-border py-3 text-right font-mono tabular-nums">{r.count}</td>
							<td class="border-b border-border py-3 text-right font-mono text-muted-foreground tabular-nums">{r.users || '—'}</td>
							<td class="border-b border-border py-3 pl-6 text-[0.8125rem]"><span class="text-foreground">{r.last}</span><span class="block text-[0.75rem] text-muted-foreground">since {r.first}</span></td>
							<td class="border-b border-border py-3"><span class="rounded border border-border px-1.5 py-0.5 font-mono text-[0.6875rem]">{r.release}</span></td>
							<td class="border-b border-border py-3 pr-3"><RowActions label={`Actions for ${r.title}`} items={[{ label: 'Open', href }, { label: 'Assign to me', onSelect: () => {} }, { label: 'Resolve', onSelect: () => {} }, { label: 'Ignore', onSelect: () => {}, tone: 'destructive' }]} /></td>
						</tr>
					{/each}
				</tbody>
			{/each}
		</table>
	</div>
</div>
