<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import { cn } from '$brand/utils.js';
	import { BRAND } from './site';
	import { HOURS, money } from './pricing';

	let { class: className }: { class?: string } = $props();

	const ours = [11.68, 23.36, 46.72, 70.08, 140.16, 280.32];
	const rows = ['Service · 0.5 vCPU · 1 GB', 'Service · 1 vCPU · 2 GB', 'Service · 2 vCPU · 4 GB', 'Service · 4 vCPU · 4 GB', 'Service · 4 vCPU · 16 GB', 'Service · 8 vCPU · 32 GB'];
	const rivals: Record<string, { mult: number[]; fee: string; note: string }> = {
		'Typical PaaS': { mult: [1.6, 1.07, 1.82, 1.4, 1.6, 1.6], fee: '$19 / seat / month', note: 'Median of three popular hosted platforms’ list prices.' },
		'Hyperscaler VMs': { mult: [1.3, 1.25, 1.22, 1.3, 1.18, 1.15], fee: 'Control plane $73 / cluster', note: 'On-demand general purpose VMs plus a managed cluster fee.' },
		'Sandbox vendors': { mult: [2.4, 2.2, 2.1, 2.0, 1.9, 1.9], fee: 'Platform tier $150 / month', note: 'Per-second microVM pricing at list, no commitment.' },
		'Do it yourself': { mult: [1.1, 1.1, 1.05, 1.05, 1.0, 1.0], fee: '≈ 1.5 platform engineers', note: 'Raw compute is close; the people who run it are not.' }
	};
	let tab = $state('Typical PaaS');
	let per = $state<'hour' | 'month'>('month');
	const r = $derived(rivals[tab]);
	const fmt = (m: number) => (per === 'month' ? money(m) : money(m / HOURS, 4));
	const seg = (on: boolean) => cn('rounded-md px-3 py-1.5 whitespace-nowrap', on ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground');
</script>

<div data-slot="price-compare" class={cn('overflow-hidden rounded-2xl border bg-card', className)}>
	<div class="flex flex-wrap items-center gap-2 border-b p-3 font-mono text-[12px]">
		<div class="flex flex-wrap rounded-lg border p-0.5" role="tablist" aria-label="Compare with">
			{#each Object.keys(rivals) as k (k)}
				<button type="button" role="tab" aria-selected={tab === k} class={seg(tab === k)} onclick={() => (tab = k)}>{k}</button>
			{/each}
		</div>
		<div class="flex rounded-lg border p-0.5 sm:ml-auto" role="group" aria-label="Period">
			{#each ['hour', 'month'] as const as p (p)}
				<button type="button" class={seg(per === p)} aria-pressed={per === p} onclick={() => (per = p)}>Per {p}</button>
			{/each}
		</div>
	</div>
	<div class="overflow-x-auto">
		<table class="w-full min-w-[620px] text-[14px]">
			<thead>
				<tr class="border-b text-left">
					<th class="px-5 py-3 font-normal"></th>
					<th class="px-3 py-3 font-normal"><Wordmark name={BRAND} class="text-[15px] text-foreground" /></th>
					<th class="px-3 py-3 font-medium text-foreground">{tab}</th>
					<th class="px-5 py-3 font-normal text-muted-foreground">Difference</th>
				</tr>
			</thead>
			<tbody class="font-mono text-[13px]">
				{#each rows as row, n (row)}
					{@const them = ours[n] * r.mult[n]}
					{@const pct = Math.round((1 - ours[n] / them) * 100)}
					<tr class="border-b hover:bg-foreground/[0.03]">
						<td class="px-5 py-3 font-sans text-[14px] text-foreground">{row}</td>
						<td class="px-3 text-foreground tabular-nums">{fmt(ours[n])}</td>
						<td class="px-3 text-foreground/75 tabular-nums">{fmt(them)}</td>
						<td class="px-5">
							<span class="flex items-center gap-3">
								<span class="h-1.5 w-24 overflow-hidden rounded-full bg-foreground/10"><span class="block h-full rounded-full bg-orange transition-[width] duration-500 motion-reduce:transition-none" style:width="{Math.min(100, pct * 1.6)}%"></span></span>
								<span class={pct > 0 ? 'text-orange' : 'text-muted-foreground'}>{pct > 0 ? `${pct}% less` : 'about even'}</span>
							</span>
						</td>
					</tr>
				{/each}
				<tr>
					<td class="px-5 py-3 font-sans text-[14px] text-foreground">Workspace fee</td>
					<td class="px-3 text-foreground">None</td>
					<td class="px-3 text-foreground/75">{r.fee}</td>
					<td class="px-5 text-orange">No fee</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="border-t px-5 py-3 text-[12.5px] text-muted-foreground">{r.note} Illustrative figures for this study, not a live comparison.</p>
</div>
