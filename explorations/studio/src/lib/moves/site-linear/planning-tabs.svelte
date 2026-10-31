<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Box from '@lucide/svelte/icons/box';
	import RoadmapMock from './roadmap-mock.svelte';
	import StatusIcon, { type Status } from './status-icon.svelte';

	let { class: className }: { class?: string } = $props();

	const tabs = [
		{ id: 'quarter', name: 'Quarterly planning', body: 'Line teams up on what ships each quarter' },
		{ id: 'pipeline', name: 'Product pipeline', body: 'Watch work move through delivery stages' },
		{ id: 'timeline', name: 'Timeline', body: 'Lay roadmaps out week by week' },
		{ id: 'people', name: 'Resource allocation', body: 'Balance people across projects' }
	] as const;
	let tab = $state<(typeof tabs)[number]['id']>('quarter');

	type P = { name: string; team: string; s: Status };
	const quarters: [string, P[]][] = [
		['Q1 2026', [{ name: 'Network resilience', team: 'Infra', s: 'done' }, { name: 'Protected turns', team: 'Maps', s: 'done' }, { name: 'Incident playbooks', team: 'Infra', s: 'done' }]],
		['Q2 2026', [{ name: 'Map tile streaming', team: 'Maps', s: 'progress' }, { name: 'Local payments', team: 'Payments', s: 'progress' }, { name: 'Backend latency', team: 'Infra', s: 'review' }, { name: 'Smarter prediction', team: 'AI', s: 'progress' }]],
		['Q3 2026', [{ name: 'Offline mode', team: 'Mobile', s: 'todo' }, { name: 'Autoscaling', team: 'Infra', s: 'todo' }, { name: 'Android parity', team: 'Mobile', s: 'todo' }]],
		['Q4 2026', [{ name: 'City launch', team: 'Growth', s: 'backlog' }, { name: 'Geofencing', team: 'Maps', s: 'backlog' }]]
	];
	const stages: [string, string[]][] = [
		['Discovery', ['Group rides', 'Voice booking']],
		['Spec', ['Offline mode', 'Android parity']],
		['Build', ['Map tile streaming', 'Local payments', 'Smarter prediction']],
		['Rollout', ['Backend latency']],
		['Done', ['Network resilience', 'Protected turns']]
	];
	const people = [
		['Maps', 9, 11],
		['Mobile', 7, 7],
		['Infra', 6, 9],
		['Payments', 4, 3],
		['AI', 5, 6]
	] as const;
</script>

<div data-slot="planning-tabs" class={cn('flex flex-col gap-6', className)}>
	<div class="min-h-[420px]">
		{#if tab === 'quarter'}
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each quarters as [q, list], qi (q)}
					<div class={cn('flex flex-col gap-2 rounded-2xl p-3 ring-1', qi === 1 ? 'bg-primary/10 ring-primary/50' : 'bg-card/50 ring-border')}>
						<p class="flex items-center justify-between px-1 py-1 text-[13px] font-medium text-foreground">{q}<span class="text-muted-foreground tabular-nums">{list.length}</span></p>
						{#each list as p (p.name)}
							<div class="flex flex-col gap-2 rounded-lg bg-background p-3 text-[13.5px] ring-1 ring-border">
								<span class="flex items-center gap-2 font-medium text-foreground"><Box class="lucide size-3.5 {qi === 1 ? 'text-primary' : ''}" />{p.name}</span>
								<span class="flex items-center gap-2 text-[12.5px] text-foreground/85"><StatusIcon status={p.s} />{p.team}</span>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{:else if tab === 'pipeline'}
			<div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
				{#each stages as [s, list], si (s)}
					<div class="flex flex-col gap-2">
						<p class="flex items-center gap-2 text-[13px] font-medium text-foreground"><span class={cn('size-2', si === 2 ? 'bg-primary' : 'bg-foreground/40')}></span>{s}</p>
						<div class="h-px bg-border"></div>
						{#each list as p (p)}
							<div class={cn('rounded-lg p-3 text-[13.5px] ring-1', si === 2 ? 'bg-primary text-primary-foreground ring-primary' : 'bg-card text-foreground ring-border')}>{p}</div>
						{/each}
					</div>
				{/each}
			</div>
		{:else if tab === 'timeline'}
			<RoadmapMock chart={false} class="[&>div:first-child]:mr-0" />
		{:else}
			<ul class="flex flex-col gap-4 rounded-2xl bg-card/50 p-6 ring-1 ring-border">
				{#each people as [team, have, need] (team)}
					<li class="grid grid-cols-[90px_1fr_80px] items-center gap-4 text-[14px] text-foreground">
						<span class="font-medium">{team}</span>
						<span class="relative h-6 overflow-hidden rounded-md bg-foreground/[0.06]">
							<span class="absolute inset-y-0 left-0 rounded-md bg-foreground/30" style:width="{(need / 12) * 100}%"></span>
							<span class={cn('absolute inset-y-0 left-0 rounded-md', have < need ? 'bg-primary' : 'bg-green')} style:width="{(have / 12) * 100}%"></span>
						</span>
						<span class="text-right tabular-nums">{have} / {need}</span>
					</li>
				{/each}
				<li class="text-[13px] text-foreground/85">Bars show people assigned against people the plan needs. Oxide means short.</li>
			</ul>
		{/if}
	</div>
	<div class="order-first grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border lg:order-none lg:grid-cols-4" role="tablist">
		{#each tabs as t (t.id)}
			<button type="button" role="tab" aria-selected={tab === t.id} onclick={() => (tab = t.id)} class={cn('flex flex-col gap-1 p-4 text-left transition-colors motion-reduce:transition-none', tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-foreground/[0.04]')}>
				<span class="font-medium">{t.name}</span>
				<span class="text-[13.5px] leading-snug">{t.body}</span>
			</button>
		{/each}
	</div>
</div>
