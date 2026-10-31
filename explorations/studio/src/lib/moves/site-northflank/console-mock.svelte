<script lang="ts">
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import Folder from '@lucide/svelte/icons/folder';
	import Users from '@lucide/svelte/icons/users';
	import Settings from '@lucide/svelte/icons/settings';
	import Shield from '@lucide/svelte/icons/shield';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Package from '@lucide/svelte/icons/package';
	import Bell from '@lucide/svelte/icons/bell';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { cn } from '$brand/utils.js';
	import { BRAND } from './site';

	let {
		cluster = 'acme-eu',
		provider = 'Azure',
		region = 'uksouth',
		tab: start = 'Details',
		class: className
	}: { cluster?: string; provider?: string; region?: string; tab?: string; class?: string } = $props();

	const tabs = ['Details', 'Observe', 'Node pools', 'History'];
	let tab = $state('Details');
	$effect(() => {
		tab = start;
	});
	const side = [
		{ icon: LayoutDashboard, label: 'Overview' },
		{ icon: Folder, label: 'Projects' },
		{ icon: Users, label: 'Members' },
		{ icon: Settings, label: 'Settings' },
		{ icon: Shield, label: 'Security' }
	];
	const side2 = [
		{ icon: GitBranch, label: 'Git' },
		{ icon: Package, label: 'Registries' },
		{ icon: Bell, label: 'Alerts' }
	];
	const pools = [
		{ name: 'system', type: 'Standard_D4s_v5', nodes: 3, cpu: 41 },
		{ name: 'workloads', type: 'Standard_D8s_v5', nodes: 6, cpu: 67 },
		{ name: 'gpu-l4', type: 'Standard_NC4as_T4', nodes: 2, cpu: 23 }
	];
	const bars = [32, 41, 38, 52, 47, 61, 58, 66, 54, 49, 63, 71, 68, 59, 62, 74, 69, 57, 51, 60];
</script>

<div data-slot="console-mock" class={cn('overflow-hidden rounded-2xl border bg-card shadow-[0_40px_100px_-60px_color-mix(in_oklab,var(--foreground)_60%,transparent)]', className)}>
	<div class="flex items-center gap-3 border-b px-4 py-2.5">
		<span class="flex gap-1.5" aria-hidden="true"><i class="size-2.5 rounded-full bg-foreground/15"></i><i class="size-2.5 rounded-full bg-foreground/15"></i><i class="size-2.5 rounded-full bg-foreground/15"></i></span>
		<Wordmark name={BRAND} class="text-[13px] text-foreground" />
		<span class="truncate font-mono text-[11px] text-muted-foreground">/ acme / clusters / {cluster}</span>
	</div>
	<div class="grid sm:grid-cols-[170px_minmax(0,1fr)]">
		<nav class="hidden border-r p-3 text-[13px] sm:block" aria-label="Console">
			{#each side as s, n (s.label)}
				<p class={cn('flex items-center gap-2 rounded-md px-2 py-1.5', n === 0 ? 'bg-foreground/[0.06] text-foreground' : 'text-foreground/70')}><s.icon class="lucide size-3.5" />{s.label}</p>
			{/each}
			<p class="mt-4 px-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">Integrations</p>
			{#each side2 as s (s.label)}
				<p class="flex items-center gap-2 px-2 py-1.5 text-foreground/70"><s.icon class="lucide size-3.5" />{s.label}</p>
			{/each}
		</nav>
		<div class="min-w-0 p-4 sm:p-5">
			<div class="flex flex-wrap items-start justify-between gap-3">
				<div>
					<p class="text-[19px] font-medium text-foreground">Cluster “{cluster}”</p>
					<p class="mt-1 flex flex-wrap gap-1.5 font-mono text-[11px] text-muted-foreground">
						<span class="rounded border px-1.5 py-0.5">{provider}</span><span class="rounded border px-1.5 py-0.5">{region}</span><span class="rounded border px-1.5 py-0.5">k8s 1.31</span>
					</p>
				</div>
				<span class="inline-flex items-center gap-1.5 rounded-full border border-green/40 px-2.5 py-1 font-mono text-[11px] text-green"><CircleCheck class="lucide size-3.5" />Ready · 3/3</span>
			</div>
			<div class="mt-4 flex gap-1 overflow-x-auto border-b" role="tablist" aria-label="Cluster">
				{#each tabs as t (t)}
					<button type="button" role="tab" aria-selected={tab === t} class={cn('-mb-px shrink-0 border-b-2 px-3 py-2 text-[13px]', tab === t ? 'border-orange text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')} onclick={() => (tab = t)}>{t}</button>
				{/each}
			</div>
			{#if tab === 'Details'}
				<dl class="mt-3 divide-y font-mono text-[12.5px]">
					{#each [['Name', cluster], ['Status', 'Ready'], ['Provider', provider], ['Control plane', 'forward-deployed'], ['Projects', '14']] as [k, v] (k)}
						<div class="grid grid-cols-[140px_minmax(0,1fr)] py-2"><dt class="text-muted-foreground">{k}</dt><dd class="text-foreground">{v}</dd></div>
					{/each}
				</dl>
			{:else if tab === 'Observe'}
				<div class="mt-4 grid grid-cols-2 gap-3">
					{#each [['vCPU usage', '18.4', '/ 48'], ['Memory', '61.2', '/ 192 GB']] as [k, v, m] (k)}
						<div class="rounded-lg border p-3"><p class="font-mono text-[11px] text-muted-foreground">{k}</p><p class="mt-1 font-mono text-[20px] text-foreground">{v}<span class="text-[11px] text-muted-foreground"> {m}</span></p></div>
					{/each}
				</div>
				<div class="mt-3 flex h-24 items-end gap-1 rounded-lg border p-3" aria-hidden="true">
					{#each bars as b, n (n)}<i class="flex-1 rounded-t-[2px] bg-orange/80" style:height="{b}%"></i>{/each}
				</div>
			{:else if tab === 'Node pools'}
				<ul class="mt-3 divide-y font-mono text-[12.5px]">
					{#each pools as p (p.name)}
						<li class="grid grid-cols-[minmax(0,1fr)_auto_90px] items-center gap-3 py-2.5">
							<span class="truncate text-foreground">{p.name} <span class="text-muted-foreground">· {p.type}</span></span>
							<span class="text-muted-foreground">{p.nodes} nodes</span>
							<span class="h-1.5 overflow-hidden rounded-full bg-foreground/10"><span class="block h-full bg-orange" style:width="{p.cpu}%"></span></span>
						</li>
					{/each}
				</ul>
			{:else}
				<ul class="mt-3 space-y-2 font-mono text-[12.5px]">
					{#each [['2m', 'Node pool workloads scaled 5 → 6'], ['1h', 'Platform upgraded to 2026.10'], ['1d', 'Backup policy attached to 9 volumes'], ['3d', 'Cluster imported via BYOK']] as [t, m] (m)}
						<li class="flex gap-3"><span class="w-8 shrink-0 text-muted-foreground">{t}</span><span class="text-foreground/90">{m}</span></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
