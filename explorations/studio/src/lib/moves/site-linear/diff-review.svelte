<script lang="ts">
	import { cn } from '$brand/utils.js';
	import FileCode from '@lucide/svelte/icons/file-code';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import StatusIcon, { type Status } from './status-icon.svelte';

	type Line = { n: number; t: string; k?: 'add' | 'del' };
	type Item = { id: string; title: string; status: Status; file: string; lines: Line[] };

	let { class: className }: { class?: string } = $props();

	const items: Item[] = [
		{
			id: 'PLB-2133',
			title: 'Replace isFullySynced with a sync status',
			status: 'review',
			file: 'app/screens/home/HomeScreen.tsx',
			lines: [
				{ n: 1, t: "import { View, Spinner } from 'ui'" },
				{ n: 2, t: "import { useSync } from '@hooks/useSync'", k: 'add' },
				{ n: 3, t: "import { Dashboard } from '@screens/Dashboard'" },
				{ n: 4, t: '' },
				{ n: 5, t: 'export function HomeScreen() {' },
				{ n: 6, t: '  const { state, isFullySynced } = useSyncState()', k: 'del' },
				{ n: 6, t: '  const { state, status } = useSync()', k: 'add' },
				{ n: 7, t: '  if (!isFullySynced) return <Spinner />', k: 'del' },
				{ n: 7, t: "  if (status === 'empty') return <Spinner />", k: 'add' },
				{ n: 8, t: '  return <Dashboard state={state} status={status} />', k: 'add' },
				{ n: 9, t: '}' }
			]
		},
		{
			id: 'PLB-2128',
			title: 'Show a stale-data banner while syncing',
			status: 'review',
			file: 'app/components/StaleBanner.tsx',
			lines: [
				{ n: 1, t: "import { Banner } from 'ui'" },
				{ n: 2, t: '' },
				{ n: 3, t: 'export function StaleBanner({ status }) {', k: 'add' },
				{ n: 4, t: "  if (status !== 'stale') return null", k: 'add' },
				{ n: 5, t: '  return <Banner tone="info">Catching up…</Banner>', k: 'add' },
				{ n: 6, t: '}', k: 'add' }
			]
		},
		{
			id: 'PLB-2120',
			title: 'Pass sync status to the dashboard',
			status: 'progress',
			file: 'app/screens/Dashboard.tsx',
			lines: [
				{ n: 12, t: 'export function Dashboard({ state }) {', k: 'del' },
				{ n: 12, t: 'export function Dashboard({ state, status }) {', k: 'add' },
				{ n: 13, t: '  return (' },
				{ n: 14, t: '    <Layout>' },
				{ n: 15, t: '      <StaleBanner status={status} />', k: 'add' },
				{ n: 16, t: '      <Trips items={state.trips} />' },
				{ n: 17, t: '    </Layout>' }
			]
		},
		{ id: 'PLB-2076', title: 'Smooth out ETA jitter', status: 'todo', file: 'app/maps/eta.ts', lines: [{ n: 1, t: 'export const smooth = (xs) => xs', k: 'del' }, { n: 1, t: 'export const smooth = (xs) => ema(xs, 0.3)', k: 'add' }] },
		{ id: 'PLB-2108', title: 'Handle GPS drop-outs gracefully', status: 'todo', file: 'app/maps/gps.ts', lines: [{ n: 4, t: 'if (!fix) throw new Error()', k: 'del' }, { n: 4, t: 'if (!fix) return lastKnown', k: 'add' }] }
	];

	let pick = $state(0);
	const cur = $derived(items[pick]);
	const adds = $derived(cur.lines.filter((l) => l.k === 'add').length);
	const dels = $derived(cur.lines.filter((l) => l.k === 'del').length);
</script>

<div data-slot="diff-review" class={cn('grid overflow-hidden rounded-2xl bg-background text-[13.5px] text-foreground ring-1 ring-foreground/12 lg:grid-cols-[340px_minmax(0,1fr)]', className)}>
	<div class="border-b border-border p-2 lg:border-r lg:border-b-0">
		<p class="flex items-center gap-2 px-2 py-2 text-[13px] font-medium"><ChevronDown class="lucide size-3.5" /><StatusIcon status="review" />In Review <span class="text-muted-foreground">3</span></p>
		<ul class="flex flex-col gap-0.5">
			{#each items as it, i (it.id)}
				<li>
					<button type="button" onclick={() => (pick = i)} aria-pressed={pick === i} class={cn('flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors motion-reduce:transition-none', pick === i ? 'bg-primary/12 ring-1 ring-primary/50' : 'hover:bg-foreground/[0.05]')}>
						<span class="w-[4.6rem] shrink-0 font-mono text-[11.5px] text-muted-foreground">{it.id}</span>
						<StatusIcon status={it.status} />
						<span class="truncate">{it.title}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="min-w-0">
		<div class="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-[12px]">
			<FileCode class="lucide size-3.5 text-primary" /><span class="truncate">{cur.file}</span>
			<span class="ml-auto shrink-0"><span class="text-green">+{adds}</span> <span class="text-red">−{dels}</span></span>
		</div>
		<pre class="overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.75]"><code>{#each cur.lines as l, i (i)}<span class={cn('flex px-4', l.k === 'add' && 'bg-green/12', l.k === 'del' && 'bg-red/12')}><span class="w-8 shrink-0 text-muted-foreground select-none">{l.n}</span><span class={cn('w-4 shrink-0 select-none', l.k === 'add' && 'text-green', l.k === 'del' && 'text-red')}>{l.k === 'add' ? '+' : l.k === 'del' ? '−' : ' '}</span><span class="whitespace-pre">{l.t}</span></span>{/each}</code></pre>
		<div class="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3 text-[13px]">
			<span class="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">Guided review · 2 of 3 steps</span>
			<span class="text-foreground/85">The agent explains why each hunk changed before you read it.</span>
		</div>
	</div>
</div>
