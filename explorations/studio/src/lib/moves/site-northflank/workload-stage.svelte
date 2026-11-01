<script lang="ts" module>
	import type { IsoCluster } from '$moves/northflank/iso-tile-stack.svelte';
	export type Workload = {
		name: string;
		title: string;
		line: string;
		cmd: string;
		stats: { value: string; label: string }[];
		clusters: IsoCluster[];
	};
</script>

<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import IsoTileStack from '$moves/northflank/iso-tile-stack.svelte';
	import { to } from './site';

	const defaults: Workload[] = [
		{
			name: 'Sandboxes',
			title: 'Code you did not write, in a box of its own.',
			line: 'Every agent task boots into a fresh microVM and is gone when the task ends.',
			cmd: 'fe sandbox run --ttl 15m python task.py',
			stats: [{ value: '180ms', label: 'cold boot' }, { value: '1', label: 'kernel per task' }, { value: '0', label: 'shared state' }],
			clusters: [
				{ at: [0, 0], size: [6, 6], height: 1, tone: 'steel', rust: true, bumps: 9 },
				{ at: [1, -5], size: [1, 1], height: 2, tone: 'oxide' },
				{ at: [3, -5], size: [1, 1], height: 3, tone: 'oxide' },
				{ at: [5, -5], size: [1, 1], height: 1, tone: 'glass' },
				{ at: [1, -2], size: [1, 1], height: 1, tone: 'ink' },
				{ at: [3, -2], size: [1, 1], height: 2, tone: 'patina' },
				{ at: [5, -2], size: [1, 1], height: 4, tone: 'oxide' }
			]
		},
		{
			name: 'Cloud agents',
			title: 'Coding agents that never close the laptop.',
			line: 'Bring Codex, Claude Code or your own harness. Real compute, and a disk that outlives the session.',
			cmd: 'fe agent start claude-code --repo acme/checkout',
			stats: [{ value: '24/7', label: 'always on' }, { value: '200GB', label: 'persistent disk' }, { value: '3', label: 'harnesses built in' }],
			clusters: [
				{ at: [0, 0], size: [7, 5], height: 1, tone: 'steel', rust: true, bumps: 6 },
				{ at: [1, -4], size: [2, 2], height: 5, tone: 'oxide' },
				{ at: [4, -4], size: [2, 2], height: 3, tone: 'ink' },
				{ at: [4, -1], size: [2, 1], height: 1, tone: 'patina' }
			]
		},
		{
			name: 'Internal apps',
			title: 'The tool someone built this morning, behind SSO by lunch.',
			line: 'One trusted home for everything your team makes with AI, with the same audit trail as production.',
			cmd: 'fe app deploy ./expense-tracker --sso',
			stats: [{ value: '6', label: 'apps this week' }, { value: 'SSO', label: 'on every app' }, { value: '1', label: 'audit trail' }],
			clusters: [
				{ at: [0, 0], size: [8, 6], height: 1, tone: 'steel', rust: true, bumps: 4 },
				{ at: [0, -5], size: [2, 2], height: 1, tone: 'oxide' },
				{ at: [3, -5], size: [2, 2], height: 2, tone: 'glass' },
				{ at: [6, -5], size: [2, 2], height: 1, tone: 'patina' },
				{ at: [0, -2], size: [2, 2], height: 2, tone: 'ink' },
				{ at: [3, -2], size: [2, 2], height: 1, tone: 'oxide' },
				{ at: [6, -2], size: [2, 2], height: 3, tone: 'steel' }
			]
		},
		{
			name: 'Production',
			title: 'The service that takes payments, on the same platform.',
			line: 'Services, databases and jobs from Git, released in stages and rolled back in one step.',
			cmd: 'fe deploy checkout-api --instances 3',
			stats: [{ value: '99.99%', label: 'uptime SLA' }, { value: '17', label: 'regions' }, { value: '1 step', label: 'to roll back' }],
			clusters: [
				{ at: [0, 0], size: [7, 7], height: 1, tone: 'steel', rust: true, bumps: 12 },
				{ at: [1, -6], size: [3, 3], height: 4, tone: 'oxide' },
				{ at: [5, -6], size: [2, 2], height: 2, tone: 'ink' },
				{ at: [5, -3], size: [2, 2], height: 2, tone: 'ink' }
			]
		},
		{
			name: 'GPU inference',
			title: 'Models that scale to zero when nobody asks.',
			line: 'L4s to B200s on demand, billed per second, warm pools when latency matters.',
			cmd: 'fe deploy embedder --gpu L4 --min 0 --max 8',
			stats: [{ value: '6.2s', label: 'cold start' }, { value: '7', label: 'GPU types' }, { value: '$0', label: 'when idle' }],
			clusters: [
				{ at: [0, 0], size: [6, 5], height: 1, tone: 'steel', rust: true, bumps: 7 },
				{ at: [1, -4], size: [4, 2], height: 2, tone: 'patina' },
				{ at: [1, -1], size: [4, 1], height: 6, tone: 'oxide' }
			]
		}
	];

	let { items = defaults, class: className }: { items?: Workload[]; class?: string } = $props();
	let at = $state(0);
	const cur = $derived(items[at]);
</script>

<div data-slot="workload-stage" class={cn('grid gap-4', className)}>
	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="tablist" aria-label="Workloads">
		{#each items as w, n (w.name)}
			<button
				type="button"
				role="tab"
				aria-selected={at === n}
				onclick={() => (at = n)}
				onpointerenter={(e) => e.pointerType === 'mouse' && (at = n)}
				class={cn(
					'flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors motion-reduce:transition-none',
					at === n ? 'border-orange bg-orange text-(--on-orange)' : 'bg-card text-foreground hover:border-foreground/30'
				)}
			>
				<span class="text-[15px] font-medium">{w.name}</span>
				<span class={cn('font-mono text-[11px]', at === n ? 'opacity-80' : 'text-muted-foreground')}>0{n + 1}</span>
			</button>
		{/each}
	</div>

	<div class="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
		<article class="flex min-w-0 flex-col rounded-2xl border bg-card p-7 sm:p-10">
			{#key at}
				<h3 class="fade max-w-[18ch] text-[clamp(30px,3.4vw,46px)] leading-[1.02] font-medium tracking-[-0.03em] text-foreground">{cur.title}</h3>
				<p class="fade mt-5 max-w-[34rem] text-[19px] leading-[1.5] text-foreground/90">{cur.line}</p>
				<dl class="mt-auto grid grid-cols-3 gap-4 pt-12">
					{#each cur.stats as s (s.label)}
						<div class="fade min-w-0">
							<dd class="truncate text-[clamp(26px,3vw,40px)] leading-none font-medium tracking-[-0.03em] text-foreground">{s.value}</dd>
							<dt class="mt-2 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">{s.label}</dt>
						</div>
					{/each}
				</dl>
			{/key}
			<a href={to('product')} class="mt-10 inline-flex w-max items-center gap-1.5 font-mono text-[12.5px] text-orange hover:underline">Explore {cur.name.toLowerCase()}<ArrowRight class="lucide size-3.5" /></a>
		</article>

		<article class="relative flex min-h-[360px] min-w-0 flex-col overflow-hidden rounded-2xl border bg-card">
			<div class="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_12%,transparent)_1px,transparent_1.4px)] [background-size:16px_16px]" aria-hidden="true"></div>
			<div class="relative flex flex-1 items-center justify-center px-6 pt-8">
				{#key at}
					<IsoTileStack clusters={cur.clusters} seed={cur.name} labels={false} floor={2} class="fade w-full max-w-[440px]" />
				{/key}
			</div>
			<div class="relative m-4 flex items-center gap-2 overflow-hidden rounded-lg border bg-background px-3.5 py-2.5 font-mono text-[12.5px]">
				<span class="text-orange">$</span>
				<span class="truncate text-foreground">{cur.cmd}</span>
			</div>
		</article>
	</div>
</div>

<style>
	:global([data-slot='workload-stage'] .fade) {
		animation: stage-in 0.4s ease-out both;
	}
	@keyframes stage-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global([data-slot='workload-stage'] .fade) {
			animation: none;
		}
	}
</style>
