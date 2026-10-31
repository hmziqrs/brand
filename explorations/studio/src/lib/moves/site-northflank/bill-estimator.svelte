<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import Minus from '@lucide/svelte/icons/minus';
	import { cn } from '$brand/utils.js';
	import { HOURS, money, planHour } from './pricing';

	let { class: className }: { class?: string } = $props();

	const sizes = [
		{ label: '0.1 vCPU · 256 MB', cpu: 0.1, mem: 0.25 },
		{ label: '0.2 vCPU · 512 MB', cpu: 0.2, mem: 0.5 },
		{ label: '0.5 vCPU · 1 GB', cpu: 0.5, mem: 1 },
		{ label: '1 vCPU · 2 GB', cpu: 1, mem: 2 },
		{ label: '2 vCPU · 4 GB', cpu: 2, mem: 4 },
		{ label: '4 vCPU · 8 GB', cpu: 4, mem: 8 },
		{ label: '8 vCPU · 16 GB', cpu: 8, mem: 16 }
	];
	type Part = { name: string; kind: string; size: number; n: number; disk?: number };
	const presets: Record<string, Part[]> = {
		'SaaS web app': [
			{ name: 'Frontend', kind: 'Service', size: 1, n: 2 },
			{ name: 'API', kind: 'Service', size: 2, n: 2 },
			{ name: 'Postgres', kind: 'Database · 10 GB disk', size: 2, n: 1, disk: 10 },
			{ name: 'Redis', kind: 'Database · 1 GB disk', size: 1, n: 1, disk: 1 }
		],
		'Agent platform': [
			{ name: 'Orchestrator', kind: 'Service', size: 3, n: 2 },
			{ name: 'Sandboxes', kind: 'MicroVMs, avg concurrent', size: 2, n: 12 },
			{ name: 'Postgres', kind: 'Database · 20 GB disk', size: 3, n: 1, disk: 20 },
			{ name: 'Queue worker', kind: 'Job', size: 2, n: 1 }
		],
		'RAG app': [
			{ name: 'Web', kind: 'Service', size: 2, n: 2 },
			{ name: 'Embedder', kind: 'Service', size: 4, n: 1 },
			{ name: 'Vector store', kind: 'Database · 40 GB disk', size: 4, n: 1, disk: 40 },
			{ name: 'Ingest', kind: 'Cron job', size: 2, n: 1 }
		]
	};
	let preset = $state('SaaS web app');
	let parts = $state<Part[]>(presets['SaaS web app'].map((p) => ({ ...p })));
	let cloud = $state<'ours' | 'byoc'>('ours');

	const pick = (k: string) => {
		preset = k;
		parts = presets[k].map((p) => ({ ...p }));
	};
	const cost = (p: Part) => {
		const s = sizes[p.size];
		const compute = cloud === 'ours' ? planHour(s) * HOURS : s.cpu * 0.02 * HOURS * 0.6;
		return compute * p.n + (cloud === 'ours' ? (p.disk ?? 0) * 0.11 : 0);
	};
	const total = $derived(parts.reduce((a, p) => a + cost(p), 0));
	const seg = (on: boolean) => cn('rounded-md px-3 py-1.5 whitespace-nowrap', on ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground');
</script>

<div data-slot="bill-estimator" class={cn('grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]', className)}>
	<div class="overflow-hidden rounded-2xl border bg-card">
		<div class="flex flex-wrap items-center gap-2 border-b p-3 font-mono text-[12px]">
			<div class="flex flex-wrap rounded-lg border p-0.5" role="group" aria-label="Example app">
				{#each Object.keys(presets) as k (k)}
					<button type="button" class={seg(preset === k)} aria-pressed={preset === k} onclick={() => pick(k)}>{k}</button>
				{/each}
			</div>
			<div class="flex rounded-lg border p-0.5 sm:ml-auto" role="group" aria-label="Where it runs">
				<button type="button" class={seg(cloud === 'ours')} aria-pressed={cloud === 'ours'} onclick={() => (cloud = 'ours')}>Our cloud</button>
				<button type="button" class={seg(cloud === 'byoc')} aria-pressed={cloud === 'byoc'} onclick={() => (cloud = 'byoc')}>Your cloud</button>
			</div>
		</div>
		<ul class="divide-y">
			{#each parts as p (p.name)}
				<li class="flex flex-wrap items-center gap-3 px-4 py-3.5">
					<i class="size-2 rounded-full bg-green"></i>
					<span class="min-w-[9rem] flex-1">
						<span class="block text-[15px] text-foreground">{p.name}</span>
						<span class="block font-mono text-[11px] text-muted-foreground">{p.kind}</span>
					</span>
					<select bind:value={p.size} class="h-8 rounded-md border bg-background px-2 font-mono text-[12px] text-foreground" aria-label="{p.name} size">
						{#each sizes as s, n (s.label)}<option value={n}>{s.label}</option>{/each}
					</select>
					<span class="flex items-center font-mono text-[12px]">
						<button type="button" class="grid size-8 place-items-center rounded-l-md border text-muted-foreground hover:text-foreground" aria-label="Fewer {p.name}" onclick={() => (p.n = Math.max(1, p.n - 1))}><Minus class="lucide size-3.5" /></button>
						<span class="grid h-8 w-9 place-items-center border-y text-foreground tabular-nums">×{p.n}</span>
						<button type="button" class="grid size-8 place-items-center rounded-r-md border text-muted-foreground hover:text-foreground" aria-label="More {p.name}" onclick={() => (p.n = Math.min(40, p.n + 1))}><Plus class="lucide size-3.5" /></button>
					</span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex flex-col rounded-2xl border bg-card p-5 sm:p-6">
		<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">This month</p>
		<ul class="mt-4 space-y-2.5 font-mono text-[13px]">
			{#each parts as p (p.name)}
				<li class="flex justify-between gap-3"><span class="text-foreground/85">{p.name}<span class="text-muted-foreground">{` ×${p.n}`}</span></span><span class="text-foreground tabular-nums">{money(cost(p))}</span></li>
			{/each}
		</ul>
		<div class="mt-auto border-t pt-5">
			<p class="flex items-end justify-between gap-3">
				<span class="text-[15px] text-foreground/85">Total</span>
				<span class="font-mono text-[clamp(36px,4vw,52px)] leading-none text-foreground tabular-nums">{money(total)}<span class="text-[12px] text-muted-foreground">{" / mo"}</span></span>
			</p>
			<p class="mt-3 text-[13px] text-muted-foreground">{cloud === 'ours' ? 'Sizes are our compute plans; databases include their disk. Billed per second.' : 'Platform fee only. Your provider bills the nodes, at your negotiated rates.'}</p>
		</div>
	</div>
</div>
