<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import X from '@lucide/svelte/icons/x';
	import GitPullRequest from '@lucide/svelte/icons/git-pull-request';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Bell from '@lucide/svelte/icons/bell';
	import FolderGit from '@lucide/svelte/icons/folder-git-2';
	import { cn } from '$brand/utils.js';
	import DevtoolsInspector from './devtools-inspector.svelte';
	import { pulls } from './query-data';

	let {
		devtools = true,
		annotate = false,
		live = true,
		class: className
	}: {
		devtools?: boolean;
		annotate?: boolean;
		live?: boolean;
		class?: string;
	} = $props();

	let refetching = $state(false);
	let merging = $state(false);
	let n = 0;

	$effect(() => {
		if (!live) return;
		const id = setInterval(() => {
			n++;
			if (n % 6 === 2) {
				refetching = true;
				setTimeout(() => (refetching = false), 1600);
			}
			if (n % 9 === 5) {
				merging = true;
				setTimeout(() => (merging = false), 2600);
			}
		}, 1000);
		return () => clearInterval(id);
	});

	const repos = [
		{ name: 'forge/engine', count: 6 },
		{ name: 'forge/text', count: 2 },
		{ name: 'forge/keymap', count: 0 }
	];
</script>

{#snippet badge(n: number)}
	{#if annotate}
		<span class="grid size-5 shrink-0 place-items-center rounded-full bg-primary font-mono text-[0.6875rem] font-semibold text-primary-foreground shadow-[0_0_0_3px_var(--background)]">{n}</span>
	{/if}
{/snippet}

<div data-slot="forge-app-window" class={cn('flex min-w-0 flex-col overflow-hidden rounded-xl border bg-background text-left shadow-2xl', className)}>
	<div class="flex h-10 items-center gap-3 border-b px-3.5">
		<span class="flex gap-1.5" aria-hidden="true">
			{#each [0, 1, 2] as i (i)}<i class="size-2.5 rounded-full border-[1.5px] border-foreground/25"></i>{/each}
		</span>
		<span class="min-w-0 flex-1 truncate text-center text-xs text-muted-foreground">Forge — forge/engine</span>
		{#if devtools}<span class="hidden rounded-md border px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground sm:inline">⌘⇧Q devtools</span>{/if}
	</div>
	<div class={cn('grid min-h-0 flex-1', devtools ? 'lg:grid-cols-[11rem_minmax(0,1fr)_minmax(0,25rem)]' : 'md:grid-cols-[11rem_minmax(0,1fr)]')}>
		<aside class="hidden flex-col gap-1 border-r p-3 text-[0.8125rem] md:flex" aria-label="Sidebar">
			<span class="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground"><Inbox class="lucide size-3.5" />Inbox</span>
			<span class="flex items-center gap-2 rounded-md bg-foreground/6 px-2 py-1.5 text-foreground"><GitPullRequest class="lucide size-3.5" />Pull requests</span>
			<span class="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground"><Bell class="lucide size-3.5" />Mentions</span>
			<p class="mt-4 mb-1 px-2 text-[0.6875rem] text-muted-foreground">Repositories</p>
			{#each repos as r (r.name)}
				<span class="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-foreground">
					<span class="flex min-w-0 items-center gap-2"><FolderGit class="lucide size-3.5 shrink-0 text-muted-foreground" /><span class="truncate">{r.name}</span></span>
					{#if r.count}<span class="font-mono text-[0.6875rem] text-muted-foreground">{r.count}</span>{/if}
				</span>
			{/each}
		</aside>
		<section class="flex min-w-0 flex-col" aria-label="Open pull requests">
			<div class="flex items-center justify-between gap-3 border-b px-4 py-3">
				<div class="flex items-center gap-2">
					<h4 class="text-sm font-medium text-foreground">Open pull requests</h4>
					{@render badge(1)}
				</div>
				<span class={cn('flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.6875rem] transition-colors', refetching ? 'bg-primary/15 text-primary' : 'text-muted-foreground')}>
					<span class={cn('size-1.5 rounded-full', refetching ? 'animate-pulse bg-primary motion-reduce:animate-none' : 'bg-green')}></span>
					{refetching ? 'Refetching in background' : 'Fresh · 30s'}
				</span>
			</div>
			<ul class="flex flex-col divide-y">
				{#each pulls as p (p.id)}
					{@const isMerge = p.id === 4124}
					<li class={cn('grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 text-[0.8125rem] transition-colors', isMerge && merging && 'bg-primary/8')}>
						<span class="font-mono text-[0.75rem] text-muted-foreground">#{p.id}</span>
						<span class="flex min-w-0 flex-col">
							<span class={cn('truncate text-foreground', isMerge && merging && 'line-through decoration-primary/70')}>{p.title}</span>
							<span class="text-[0.6875rem] text-muted-foreground">{p.author} · {p.updated}</span>
						</span>
						<span class="flex items-center gap-2">
							{#if isMerge && merging}
								<span class="rounded-full border border-primary px-2 py-0.5 text-[0.6875rem] text-primary">Merging · optimistic</span>
								{@render badge(2)}
							{:else if p.checks === 'pass'}
								<span class="grid size-5 place-items-center rounded-full bg-green/15 text-green"><Check class="lucide size-3" /></span>
							{:else if p.checks === 'fail'}
								<span class="grid size-5 place-items-center rounded-full bg-red/15 text-red"><X class="lucide size-3" /></span>
							{:else}
								<span class="grid size-5 place-items-center"><span class="size-2 animate-pulse rounded-full bg-yellow motion-reduce:animate-none"></span></span>
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</section>
		{#if devtools}
			<div class="relative flex min-w-0 flex-col border-t lg:border-t-0 lg:border-l">
				{#if annotate}<span class="absolute top-2.5 right-[9.5rem] z-10 hidden sm:block">{@render badge(3)}</span>{/if}
				<DevtoolsInspector {live} initial={1} class="h-full" />
			</div>
		{/if}
	</div>
</div>
