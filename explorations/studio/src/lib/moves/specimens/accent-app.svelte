<script lang="ts">
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import Server from '@lucide/svelte/icons/server';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import History from '@lucide/svelte/icons/history';
	import Settings from '@lucide/svelte/icons/settings';
	import Plus from '@lucide/svelte/icons/plus';
	import Check from '@lucide/svelte/icons/check';
	import { Button } from '$brand/ui/button/index.js';

	const nav = [
		{ icon: LayoutDashboard, label: 'Overview' },
		{ icon: Server, label: 'Providers', on: true },
		{ icon: KeyRound, label: 'Keys' },
		{ icon: History, label: 'Switches' },
		{ icon: Settings, label: 'Settings' }
	];
	const providers = [
		{ name: 'Anthropic', region: 'global', p50: 412, state: 'ready' },
		{ name: 'Amazon Bedrock', region: 'eu-central-1', p50: 388, state: 'active' },
		{ name: 'Google Vertex', region: 'europe-west4', p50: 455, state: 'ready' },
		{ name: 'LiteLLM gateway', region: 'self-hosted', p50: 301, state: 'ready' },
		{ name: 'OpenRouter', region: 'global', p50: 520, state: 'no key' }
	];
	const week = [62, 48, 71, 55, 90, 84, 66];
</script>

<div class="grid min-h-[560px] @3xl:grid-cols-[220px_1fr]">
	<aside class="hidden flex-col gap-1 border-r p-3 @3xl:flex">
		<p class="px-2 pt-1 pb-3 text-[15px] font-semibold tracking-[-0.02em] text-foreground">claude-multi<i class="sq ml-0.5"></i></p>
		{#each nav as n (n.label)}
			<a href="#/p/specimens/accent" class={['flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px]', n.on ? 'on font-medium' : 'text-foreground hover:bg-muted']}>
				<n.icon class="lucide size-4" />{n.label}
			</a>
		{/each}
		<div class="mt-auto rounded-lg border p-3 text-[13px] text-foreground">
			<p class="font-medium">Bedrock is live</p>
			<p class="mt-1 opacity-80">Switched 2 h ago from Anthropic.</p>
		</div>
	</aside>
	<div class="flex min-w-0 flex-col gap-6 p-5 @2xl:p-8">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">Providers</p>
				<h3 class="mt-1 text-[clamp(1.6rem,4cqw,2.4rem)] leading-none font-medium tracking-[-0.035em] text-foreground">Where Claude Code runs</h3>
			</div>
			<div class="flex gap-2">
				<Button variant="outline" size="sm" class="px-3">Test all</Button>
				<Button size="sm" class="px-3"><Plus class="lucide" />Add provider</Button>
			</div>
		</div>

		<div class="grid gap-3 @2xl:grid-cols-[1fr_1.1fr]">
			<div class="tile flex flex-col justify-between gap-6 rounded-2xl p-5">
				<p class="font-mono text-[11px] tracking-[0.14em] uppercase">Active · eu-central-1</p>
				<div>
					<p class="text-[clamp(2.4rem,7cqw,3.6rem)] leading-[0.9] font-medium tracking-[-0.05em]">Bedrock</p>
					<p class="mt-2 text-[14px] font-medium">388 ms p50 · 1,204 requests today</p>
				</div>
			</div>
			<div class="flex flex-col gap-3 rounded-2xl border p-5">
				<p class="flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-foreground uppercase"><span>Switches this week</span><span>7 days</span></p>
				<div class="flex h-28 items-end gap-2">
					{#each week as v, i (i)}
						<div class={['flex-1 rounded-t-[4px]', i === 4 ? 'bar-on' : 'bar']} style:height={`${v}%`}></div>
					{/each}
				</div>
			</div>
		</div>

		<div class="overflow-hidden rounded-2xl border">
			<table class="w-full text-left text-[14px] text-foreground">
				<thead class="font-mono text-[11px] tracking-[0.12em] uppercase">
					<tr class="border-b"><th class="px-4 py-2.5 font-normal">Provider</th><th class="hidden px-4 py-2.5 font-normal @xl:table-cell">Region</th><th class="px-4 py-2.5 text-right font-normal">p50</th><th class="px-4 py-2.5 text-right font-normal">State</th></tr>
				</thead>
				<tbody>
					{#each providers as p (p.name)}
						<tr class={['border-b last:border-b-0', p.state === 'active' && 'row-on']}>
							<td class="px-4 py-3 font-medium">{p.name}</td>
							<td class="hidden px-4 py-3 font-mono text-[13px] @xl:table-cell">{p.region}</td>
							<td class="px-4 py-3 text-right font-mono text-[13px] tabular-nums">{p.p50} ms</td>
							<td class="px-4 py-3 text-right">
								{#if p.state === 'active'}
									<span class="chip-on inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] uppercase"><Check class="lucide size-3" />active</span>
								{:else}
									<span class="inline-flex rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase">{p.state}</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.sq {
		display: inline-block;
		width: 0.36em;
		height: 0.36em;
		background: var(--mark-square);
	}
	.on,
	.tile,
	.chip-on,
	.bar-on {
		background: var(--orange);
		color: var(--on-orange);
	}
	.bar {
		background: color-mix(in oklab, var(--foreground) 14%, transparent);
	}
	.row-on {
		box-shadow: inset 3px 0 0 var(--orange);
		background: color-mix(in oklab, var(--orange) 9%, transparent);
	}
</style>
