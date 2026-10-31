<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Box from '@lucide/svelte/icons/box';
	import Diamond from '@lucide/svelte/icons/diamond';

	type Row = { name: string; start: number; end: number; progress: number; health: 'on' | 'risk' | 'off'; milestones: { at: number; label: string }[]; lead: string };

	let { chart = true, class: className }: { chart?: boolean; class?: string } = $props();

	const weeks = ['Feb 9', '16', '23', 'Mar 2', '9', '16', '23', '30', 'Apr 6', '13', '20', '27', 'May 4', '11'];
	const rows: Row[] = [
		{ name: 'Interface refresh', start: 1, end: 9, progress: 0.62, health: 'on', lead: 'Mara', milestones: [{ at: 4, label: 'Core screens' }, { at: 7.5, label: 'Polish' }] },
		{ name: 'Split fares', start: 3, end: 11, progress: 0.35, health: 'risk', lead: 'Teo', milestones: [{ at: 6, label: 'Internal' }] },
		{ name: 'Offline mode', start: 6, end: 13, progress: 0.12, health: 'on', lead: 'Ines', milestones: [{ at: 9, label: 'Spec signed' }, { at: 12, label: 'Beta' }] },
		{ name: 'Telemetry baseline', start: 0, end: 5, progress: 0.9, health: 'on', lead: 'Pia', milestones: [{ at: 3, label: 'Dash live' }] }
	];

	let pick = $state(0);
	const today = 5.4;
	const pct = (w: number) => `${(w / weeks.length) * 100}%`;

	const lines = [
		{ name: 'Plumb Agent', tone: 'var(--primary)', pts: [62, 58, 54, 47, 44, 38, 33, 30, 27, 24] },
		{ name: 'Coding sessions', tone: 'var(--teal)', pts: [70, 69, 63, 60, 52, 50, 47, 45, 41, 40] },
		{ name: 'People', tone: 'var(--foreground)', pts: [74, 73, 72, 70, 71, 69, 68, 68, 66, 65] }
	];
	const path = (pts: number[]) => pts.map((v, i) => `${i ? 'L' : 'M'}${(i / (pts.length - 1)) * 300},${v * 1.4}`).join(' ');
</script>

<div data-slot="roadmap-mock" class={cn('relative', className)}>
	<div class="overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/12 lg:mr-[26%]">
		<div class="overflow-x-auto [scrollbar-width:none]">
			<div class="relative min-w-[720px]">
				<div class="grid border-b border-border text-[11.5px] text-muted-foreground" style:grid-template-columns="repeat({weeks.length}, minmax(0,1fr))">
					{#each weeks as w, i (i)}<span class="border-l border-border/60 px-1.5 py-2 first:border-l-0">{w}</span>{/each}
				</div>
				<div class="pointer-events-none absolute top-0 bottom-0 z-10 w-px bg-primary" style:left={pct(today)}>
					<span class="absolute top-1 left-1 rounded bg-primary px-1 font-mono text-[10px] text-primary-foreground">Today</span>
				</div>
				<ul class="flex flex-col gap-1 py-4">
					{#each rows as r, i (r.name)}
						<li class="relative h-[60px]">
							<button
								type="button"
								onclick={() => (pick = i)}
								onpointerenter={() => (pick = i)}
								class={cn('absolute top-2 flex h-11 items-center gap-2 overflow-hidden rounded-lg px-3 text-left text-[13px] text-foreground ring-1 transition-colors motion-reduce:transition-none', pick === i ? 'bg-primary/15 ring-primary' : 'bg-card ring-border hover:ring-foreground/30')}
								style:left={pct(r.start)}
								style:width={pct(r.end - r.start)}
							>
								<span class="absolute inset-y-0 left-0 -z-0 bg-primary/25" style:width="{r.progress * 100}%"></span>
								<Box class="lucide relative size-3.5 shrink-0 {pick === i ? 'text-primary' : ''}" />
								<span class="relative truncate font-medium">{r.name}</span>
								<span class={cn('relative ml-auto size-2 shrink-0 rounded-full', r.health === 'on' ? 'bg-green' : r.health === 'risk' ? 'bg-yellow' : 'bg-red')}></span>
							</button>
							{#each r.milestones as m (m.label)}
								<span class="absolute top-[48px] flex -translate-x-1/2 items-center gap-1 text-[10.5px] whitespace-nowrap text-foreground/80" style:left={pct(m.at)}>
									<Diamond class="lucide size-2.5 fill-current {pick === i ? 'text-primary' : ''}" />{m.label}
								</span>
							{/each}
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border px-4 py-3 text-[13px]">
			<span class="font-medium text-foreground">{rows[pick].name}</span>
			<span class="text-foreground/85">Lead · {rows[pick].lead}</span>
			<span class="text-foreground/85">{Math.round(rows[pick].progress * 100)}% done</span>
			<span class={rows[pick].health === 'risk' ? 'text-yellow' : 'text-green'}>{rows[pick].health === 'risk' ? 'At risk' : 'On track'}</span>
		</div>
	</div>

	{#if chart}
		<div class="mx-auto mt-4 w-[min(100%,380px)] rounded-2xl bg-card p-5 shadow-2xl ring-1 ring-foreground/15 lg:absolute lg:top-10 lg:right-0 lg:mt-0">
			<p class="text-[13px] font-medium text-foreground">Cycle time by assignee</p>
			<p class="text-xs text-muted-foreground">Hours from start to merge · example data</p>
			<svg viewBox="0 0 300 120" class="mt-4 h-36 w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
				{#each [0, 40, 80, 120] as y (y)}<line x1="0" x2="300" y1={y} y2={y} stroke="var(--border)" stroke-width="1" vector-effect="non-scaling-stroke" />{/each}
				{#each lines as l (l.name)}<path d={path(l.pts)} fill="none" stroke={l.tone} stroke-width="1.6" vector-effect="non-scaling-stroke" opacity={l.name === 'People' ? 0.5 : 1} />{/each}
			</svg>
			<ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground">
				{#each lines as l (l.name)}<li class="flex items-center gap-1.5"><span class="h-0.5 w-3" style:background={l.tone}></span>{l.name}</li>{/each}
			</ul>
		</div>
	{/if}
</div>
