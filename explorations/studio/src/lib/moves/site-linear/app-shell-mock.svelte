<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Zap from '@lucide/svelte/icons/zap';
	import InboxIcon from '@lucide/svelte/icons/inbox';
	import CircleUser from '@lucide/svelte/icons/circle-user';
	import GitPullRequest from '@lucide/svelte/icons/git-pull-request';
	import Target from '@lucide/svelte/icons/target';
	import Box from '@lucide/svelte/icons/box';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import Search from '@lucide/svelte/icons/search';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import Star from '@lucide/svelte/icons/star';
	import Bot from '@lucide/svelte/icons/bot';
	import ChartBar from '@lucide/svelte/icons/chart-bar';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Link2 from '@lucide/svelte/icons/link-2';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Eye from '@lucide/svelte/icons/eye';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import Minus from '@lucide/svelte/icons/minus';
	import X from '@lucide/svelte/icons/x';
	import StatusIcon, { type Status } from './status-icon.svelte';
	import PriorityIcon from './priority-icon.svelte';

	type View = 'issue' | 'inbox' | 'my' | 'reviews';

	let { initial = 'issue', agent = true, class: className }: { initial?: View; agent?: boolean; class?: string } = $props();

	let view = $state<View>('issue');
	$effect.pre(() => {
		view = initial;
	});

	const primary = [
		{ id: 'pulse', label: 'Pulse', icon: Zap, view: 'inbox' as View },
		{ id: 'inbox', label: 'Inbox', icon: InboxIcon, view: 'inbox' as View, count: 3 },
		{ id: 'my', label: 'My issues', icon: CircleUser, view: 'my' as View },
		{ id: 'reviews', label: 'Reviews', icon: GitPullRequest, view: 'reviews' as View, count: 2 }
	];
	const workspace = [
		{ label: 'Initiatives', icon: Target },
		{ label: 'Projects', icon: Box },
		{ label: 'More', icon: Ellipsis }
	];
	const favorites = [
		{ label: 'Faster cold start', status: 'progress' as Status, view: 'issue' as View },
		{ label: 'Agent tasks', icon: Bot, view: 'my' as View },
		{ label: 'Agent insights', icon: ChartBar, view: 'reviews' as View },
		{ label: 'Interface refresh', icon: Sparkles, view: 'my' as View }
	];

	const inbox = [
		{ who: 'Plumb Agent', what: 'opened a draft PR for PLB-2140', when: '2m', unread: true, agent: true },
		{ who: 'Ines', what: 'mentioned you in Offline mode spec', when: '14m', unread: true },
		{ who: 'Triage', what: 'routed 4 new requests to Mobile', when: '1h', unread: true, agent: true },
		{ who: 'Teo', what: 'moved Map tile streaming to In review', when: '3h' },
		{ who: 'Mara', what: 'posted a project update: on track', when: '5h' }
	];

	const mine: { id: string; title: string; status: Status; p: 0 | 1 | 2 | 3 | 4; label: string }[] = [
		{ id: 'PLB-2140', title: 'Faster cold start on iOS', status: 'progress', p: 4, label: 'Performance' },
		{ id: 'PLB-2133', title: 'Show a stale-data banner while syncing', status: 'review', p: 3, label: 'Reliability' },
		{ id: 'PLB-2128', title: 'Pass sync state to the dashboard', status: 'review', p: 2, label: 'Bug' },
		{ id: 'PLB-2101', title: 'Smooth out ETA jitter', status: 'todo', p: 2, label: 'Maps' },
		{ id: 'PLB-2097', title: 'Handle GPS drop-outs gracefully', status: 'todo', p: 3, label: 'Maps' },
		{ id: 'PLB-2090', title: 'Remove the old sync flag', status: 'done', p: 1, label: 'Cleanup' }
	];

	const prs = [
		{ n: '#4821', title: 'Render shell before full sync', files: 2, add: 22, del: 10, status: 'review' as Status },
		{ n: '#4817', title: 'Stale-data banner', files: 4, add: 61, del: 8, status: 'review' as Status },
		{ n: '#4802', title: 'Drop isFullySynced', files: 7, add: 30, del: 94, status: 'done' as Status }
	];

	let step = $state(0);
	let host: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (!agent || !host) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			step = 4;
			return;
		}
		let timer = 0;
		let seen = false;
		const tick = () => {
			if (step < 4) {
				step += 1;
				timer = window.setTimeout(tick, step === 2 ? 2200 : 1400);
			}
		};
		const io = new IntersectionObserver(([e]) => {
			if (e.isIntersecting && !seen) {
				seen = true;
				timer = window.setTimeout(tick, 900);
			}
		});
		io.observe(host);
		return () => {
			io.disconnect();
			clearTimeout(timer);
		};
	});

	function replay() {
		step = 0;
		const run = (n: number) => {
			if (n > 4) return;
			setTimeout(() => {
				step = n;
				run(n + 1);
			}, n === 3 ? 2200 : 900);
		};
		run(1);
	}

	const navItem = 'flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left text-[13.5px] text-foreground transition-colors hover:bg-foreground/[0.06] motion-reduce:transition-none';
</script>

<div bind:this={host} data-slot="app-shell-mock" class={cn('relative grid overflow-hidden rounded-2xl bg-background text-left text-[13.5px] text-foreground shadow-[0_40px_120px_-30px_color-mix(in_oklab,black_70%,transparent)] ring-1 ring-foreground/12 md:grid-cols-[228px_minmax(0,1fr)]', className)}>
	<aside class="hidden flex-col gap-5 border-r border-border bg-foreground/[0.025] p-3 md:flex">
		<div class="flex items-center justify-between px-1">
			<span class="flex items-center gap-2 font-medium"><span class="size-4 rounded-[4px] bg-primary"></span>Plumb<ChevronDown class="lucide size-3.5" /></span>
			<span class="flex gap-1">
				<span class="grid size-7 place-items-center rounded-md hover:bg-foreground/[0.06]"><Search class="lucide size-3.5" /></span>
				<span class="grid size-7 place-items-center rounded-full ring-1 ring-border"><SquarePen class="lucide size-3.5" /></span>
			</span>
		</div>
		<ul class="flex flex-col gap-0.5">
			{#each primary as it (it.id)}
				{@const Icon = it.icon}
				<li>
					<button type="button" class={cn(navItem, view === it.view && it.id !== 'pulse' && 'bg-foreground/[0.08]')} onclick={() => (view = it.view)}>
						<Icon class="lucide size-4" />{it.label}
						{#if it.count}<span class="ml-auto rounded-full bg-primary px-1.5 text-[11px] font-medium text-primary-foreground tabular-nums">{it.count}</span>{/if}
					</button>
				</li>
			{/each}
		</ul>
		<div>
			<p class="mb-1 px-2 text-xs text-muted-foreground">Workspace</p>
			<ul class="flex flex-col gap-0.5">
				{#each workspace as it (it.label)}
					{@const Icon = it.icon}
					<li><span class={navItem}><Icon class="lucide size-4" />{it.label}</span></li>
				{/each}
			</ul>
		</div>
		<div>
			<p class="mb-1 px-2 text-xs text-muted-foreground">Favorites</p>
			<ul class="flex flex-col gap-0.5">
				{#each favorites as it (it.label)}
					<li>
						<button type="button" class={cn(navItem, it.view === 'issue' && view === 'issue' && 'bg-foreground/[0.08]')} onclick={() => (view = it.view)}>
							{#if it.status}<StatusIcon status={it.status} class="size-4" />{:else if it.icon}{@const Icon = it.icon}<Icon class="lucide size-4 text-primary" />{/if}
							{it.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</aside>

	<div class="flex min-h-[460px] min-w-0 flex-col md:min-h-[540px]">
		{#if view === 'issue'}
			<div class="flex h-12 items-center gap-2.5 border-b border-border px-4">
				<StatusIcon status="progress" />
				<span class="font-mono text-[12px] text-muted-foreground">PLB-2140</span>
				<span class="truncate font-medium">Faster cold start</span>
				<Star class="lucide size-3.5 fill-primary text-primary" />
				<span class="ml-auto hidden items-center gap-2 text-xs text-muted-foreground sm:flex">1 / 84 <ChevronUp class="lucide size-3.5" /><ChevronDown class="lucide size-3.5" /></span>
			</div>
			<div class="grid min-w-0 flex-1 lg:grid-cols-[minmax(0,1fr)_200px]">
				<div class="min-w-0 px-5 py-7 sm:px-10">
					<h3 class="text-2xl font-medium tracking-[-0.02em]">Faster cold start</h3>
					<p class="mt-2 max-w-[56ch] text-[15px] leading-relaxed">
						Paint the shell as soon as the minimum <code class="rounded bg-foreground/[0.08] px-1 py-0.5 font-mono text-[12.5px]">sync_state</code> is ready, instead of waiting on a full refresh during iOS launch.
					</p>
					<p class="mt-8 text-[15px] font-medium">Activity</p>
					<ol class="mt-3 flex flex-col gap-2.5 text-[13px]">
						<li class="flex gap-2"><span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"></span><span><b class="font-medium">Plumb</b> created the issue from Slack for Mara · 2m</span></li>
						<li class="flex gap-2"><span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40"></span><span><b class="font-medium">Triage</b> added Performance and iOS · 2m</span></li>
					</ol>
					<div class="mt-5 divide-y divide-border rounded-xl ring-1 ring-border">
						<div class="p-3.5">
							<p class="text-xs"><b class="font-medium">mara</b> <span class="text-muted-foreground">· 4 min ago</span></p>
							<p class="mt-1">Right now the spinner never stops, so it looks like the car vanished.</p>
						</div>
						<div class="p-3.5">
							<p class="text-xs"><b class="font-medium">teo</b> <span class="text-muted-foreground">· just now</span></p>
							<p class="mt-1"><span class="rounded bg-primary/15 px-1 text-primary">@plumb</span> can you take a pass at this?</p>
						</div>
					</div>
				</div>
				<div class="hidden flex-col gap-3 border-l border-border p-4 text-[13px] lg:flex">
					<p class="text-xs text-muted-foreground">Properties</p>
					<p class="flex items-center gap-2"><StatusIcon status="progress" />In Progress</p>
					<p class="flex items-center gap-2"><PriorityIcon level={4} />Urgent</p>
					<p class="flex items-center gap-2"><span class="grid size-4 place-items-center rounded-full bg-teal text-[9px] font-semibold text-background">M</span>mara</p>
					<p class="mt-2 text-xs text-muted-foreground">Labels</p>
					<div class="flex flex-wrap gap-1.5">
						<span class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ring-1 ring-border"><span class="size-1.5 rounded-full bg-primary"></span>Performance</span>
						<span class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ring-1 ring-border"><span class="size-1.5 rounded-full bg-blue"></span>iOS</span>
					</div>
					<p class="mt-2 text-xs text-muted-foreground">Reviews</p>
					<p class="flex items-center gap-2"><GitPullRequest class="lucide size-3.5 text-green" />#4821</p>
				</div>
			</div>
		{:else if view === 'inbox'}
			<div class="flex h-12 items-center border-b border-border px-4 font-medium">Inbox <span class="ml-2 text-xs text-muted-foreground">3 unread</span></div>
			<ul class="divide-y divide-border">
				{#each inbox as n (n.what)}
					<li class="flex items-center gap-3 px-4 py-3.5">
						<span class={cn('grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold', n.agent ? 'bg-primary text-primary-foreground' : 'bg-foreground/10')}>{n.agent ? '■' : n.who[0]}</span>
						<span class="min-w-0 flex-1 truncate"><b class="font-medium">{n.who}</b> {n.what}</span>
						<span class="text-xs text-muted-foreground tabular-nums">{n.when}</span>
						{#if n.unread}<span class="size-2 rounded-full bg-primary"></span>{/if}
					</li>
				{/each}
			</ul>
		{:else if view === 'my'}
			<div class="flex h-12 items-center gap-3 border-b border-border px-4 font-medium">My issues <span class="rounded-md bg-foreground/[0.08] px-2 py-0.5 text-xs">Assigned</span><span class="text-xs text-muted-foreground">Created</span></div>
			<ul class="divide-y divide-border">
				{#each mine as it (it.id)}
					<li class="flex items-center gap-3 px-4 py-3">
						<PriorityIcon level={it.p} />
						<span class="hidden w-16 font-mono text-[12px] text-muted-foreground sm:inline">{it.id}</span>
						<StatusIcon status={it.status} />
						<span class="min-w-0 flex-1 truncate">{it.title}</span>
						<span class="hidden rounded-full px-2 py-0.5 text-xs ring-1 ring-border sm:inline">{it.label}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="flex h-12 items-center border-b border-border px-4 font-medium">Reviews</div>
			<ul class="divide-y divide-border">
				{#each prs as pr (pr.n)}
					<li class="flex items-center gap-3 px-4 py-3.5">
						<StatusIcon status={pr.status} />
						<span class="font-mono text-[12px] text-muted-foreground">{pr.n}</span>
						<span class="min-w-0 flex-1 truncate">{pr.title}</span>
						<span class="font-mono text-xs"><span class="text-green">+{pr.add}</span> <span class="text-red">−{pr.del}</span></span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	{#if agent}
		<div class="absolute right-3 bottom-3 hidden w-[340px] flex-col rounded-xl bg-card text-[13px] shadow-2xl ring-1 ring-foreground/15 sm:flex md:right-5 md:bottom-5">
			<div class="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
				<span class="size-3 rounded-[3px] bg-primary"></span>
				<b class="font-medium">Plumb Agent</b>
				<span class="rounded px-1.5 py-0.5 font-mono text-[11px] ring-1 ring-border">model 5.5</span>
				<span class="ml-auto flex gap-2 text-muted-foreground"><Minus class="lucide size-3.5" /><X class="lucide size-3.5" /></span>
			</div>
			<div class="flex min-h-[200px] flex-col gap-2.5 p-3.5">
				{#if step >= 1}
					<p class="ml-8 rounded-lg bg-foreground/[0.07] px-3 py-2">Fix the stuck loading rows and open a PR</p>
					<p class="flex items-center justify-end gap-1.5 text-xs text-muted-foreground"><Link2 class="lucide size-3" />PLB-2140 added to context</p>
				{/if}
				{#if step >= 2}
					<p class="flex items-center gap-2 text-xs">
						{#if step === 2}<span class="size-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none"></span>Working…{:else}<span class="text-muted-foreground">Worked for 12 sec</span>{/if}
					</p>
				{/if}
				{#if step >= 3}
					<p class="leading-snug">Pushed a draft PR. The shell now paints before full sync; <code class="font-mono text-[12px]">isDimmed</code> reads the live status.</p>
				{/if}
				{#if step >= 4}
					<div class="flex items-center gap-2 rounded-lg bg-primary/12 px-3 py-2 ring-1 ring-primary/40">
						<GitBranch class="lucide size-3.5 text-primary" />
						<span>Changed 2 files <span class="font-mono text-green">+22</span> <span class="font-mono text-red">−10</span></span>
						<span class="ml-auto inline-flex items-center gap-1 text-primary"><Eye class="lucide size-3.5" />Preview</span>
					</div>
				{/if}
				{#if step === 0}
					<p class="m-auto text-xs text-muted-foreground">Agent is reading the issue…</p>
				{/if}
			</div>
			<div class="flex items-center gap-2 border-t border-border px-3.5 py-2 text-xs text-muted-foreground">
				Ask Plumb to do anything
				<button type="button" onclick={replay} class="ml-auto inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-foreground hover:bg-foreground/[0.06]" aria-label="Replay agent run"><RotateCcw class="lucide size-3.5" />Replay</button>
			</div>
		</div>
	{/if}
</div>
