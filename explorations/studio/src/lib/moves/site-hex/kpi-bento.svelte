<script lang="ts">
	import { cn } from '$brand/utils.js';
	import CornerDownLeft from '@lucide/svelte/icons/corner-down-left';

	let { class: className }: { class?: string } = $props();

	const spark = [22, 26, 24, 31, 29, 36, 34, 41, 39, 47, 52, 49];
	const pts = spark.map((v, i) => `${(i / (spark.length - 1)) * 300},${90 - v * 1.4}`).join(' ');
	const fc = [30, 34, 33, 38, 41, 44];
	const fcPts = fc.map((v, i) => `${i * 36},${90 - v}`).join(' ');
	const fcNext = [44, 48, 51, 55, 60].map((v, i) => `${(i + 5) * 36},${90 - v}`).join(' ');
	const dots = Array.from({ length: 96 }, (_, i) => ({ x: i % 16, y: Math.floor(i / 16), on: (i * 37) % 7 === 0, hot: i === 43 }));
	const accounts = [
		['Halden Freight', '$42k', '−24%'],
		['Orbit Dental', '$68k', '−18%'],
		['Miro Farms', '$31k', '+2%'],
		['Tessel Labs', '$27k', '+12%']
	];
</script>

<div class={cn('grid gap-4 sm:grid-cols-2', className)}>
	{#snippet prompt(text: string)}
		<span class="mt-4 inline-flex w-fit items-center gap-2 border border-border bg-background px-3 py-1.5 text-[13px] text-foreground transition-colors group-hover:border-foreground">{text}<CornerDownLeft class="lucide size-3.5" /></span>
	{/snippet}
	<div class="group flex flex-col border border-border p-5">
		<div class="flex items-baseline justify-between"><p class="font-medium text-foreground">Depot demand</p><p class="font-mono text-2xl text-foreground tabular-nums">24,806</p></div>
		<svg viewBox="0 0 160 60" class="mt-4 h-auto w-full" aria-label="Dot map of depots, one highlighted" role="img">
			{#each dots as d, i (i)}
				<circle cx={5 + d.x * 10} cy={5 + d.y * 10} r={d.hot ? 3.6 : d.on ? 2.4 : 1} fill={d.hot ? 'var(--orange)' : 'currentColor'} opacity={d.on || d.hot ? 1 : 0.35} class="text-foreground" />
			{/each}
		</svg>
		{@render prompt('Show demand by depot')}
	</div>
	<div class="group flex flex-col border border-border p-5">
		<p class="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">Recurring revenue · Apr–Sep</p>
		<p class="mt-2 text-5xl font-semibold tracking-tight text-foreground">$550k</p>
		<p class="mt-1 text-sm text-foreground">↑ 8.4% on the prior period</p>
		<svg viewBox="0 0 300 90" class="mt-3 h-auto w-full text-foreground" aria-hidden="true"><polyline points={pts} fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="300" cy={90 - 49 * 1.4} r="4" fill="var(--orange)" /></svg>
		{@render prompt('Track revenue across the business')}
	</div>
	<div class="group flex flex-col border border-border p-5">
		<p class="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">Q4 forecast</p>
		<p class="mt-2 text-5xl font-semibold tracking-tight text-foreground">$428k</p>
		<svg viewBox="0 0 330 90" class="mt-3 h-auto w-full text-foreground" aria-hidden="true">
			<polyline points={fcPts} fill="none" stroke="currentColor" stroke-width="1.6" />
			<polyline points={fcNext} fill="none" stroke="var(--orange)" stroke-width="1.6" stroke-dasharray="4 4" />
			<line x1="180" x2="180" y1="0" y2="90" stroke="currentColor" opacity="0.3" />
		</svg>
		{@render prompt('Forecast next quarter')}
	</div>
	<div class="group flex flex-col border border-border p-5">
		<p class="text-3xl font-semibold tracking-tight text-foreground">283 accounts</p>
		<table class="mt-3 w-full text-sm text-foreground">
			<thead><tr class="text-left font-mono text-[11px] text-muted-foreground uppercase"><th class="pb-1 font-normal">Account</th><th class="pb-1 font-normal">ARR</th><th class="pb-1 text-right font-normal">Usage</th></tr></thead>
			<tbody>
				{#each accounts as [n, arr, u] (n)}
					<tr class="border-t border-border"><td class="py-1.5">{n}</td><td class="font-mono">{arr}</td><td class="text-right font-mono" class:text-primary={u.startsWith('−')}>{u}</td></tr>
				{/each}
			</tbody>
		</table>
		{@render prompt('Watch at-risk accounts')}
	</div>
</div>
