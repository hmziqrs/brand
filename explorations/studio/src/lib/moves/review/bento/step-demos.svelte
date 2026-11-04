<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Globe from '@lucide/svelte/icons/globe';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import Server from '@lucide/svelte/icons/server';
	import CursorTag from '$moves/site-flora/cursor-tag.svelte';

	let { i }: { i: number } = $props();

	const asks = [
		{ Icon: Smartphone, label: 'Phone app', key: '1' },
		{ Icon: Monitor, label: 'Desktop app', key: '2' },
		{ Icon: Globe, label: 'Web app', key: '3' },
		{ Icon: SquareTerminal, label: 'CLI tool', key: '4' },
		{ Icon: Server, label: 'API and database', key: '5' }
	];
	const builds = ['iOS', 'Android', 'macOS', 'Windows', 'Linux', 'Web'];

	let pick = $state(1);
	let hover = $state(false);
	let filled = $state(0);

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			filled = builds.length;
			return;
		}
		const a = i === 0 ? setInterval(() => !hover && (pick = (pick + 1) % asks.length), 1500) : undefined;
		const b = i === 2 ? setInterval(() => (filled = filled >= builds.length + 3 ? 0 : filled + 1), 420) : undefined;
		return () => {
			clearInterval(a);
			clearInterval(b);
		};
	});
</script>

{#if i === 0}
	<div class="w-full max-w-[250px] rounded-xl bg-background p-1.5 ring-1 ring-foreground/12 shadow-[0_30px_50px_-30px_color-mix(in_oklab,black_70%,transparent)]" role="presentation" onpointerenter={() => (hover = true)} onpointerleave={() => (hover = false)}>
		<p class="px-2 pt-1.5 pb-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">What are we building?</p>
		{#each asks as a, j (a.label)}
			<button type="button" onpointerenter={() => (pick = j)} onfocus={() => (pick = j)} onclick={() => (pick = j)} class={cn('flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50', pick === j && 'bg-primary text-primary-foreground')}>
				<a.Icon class="lucide size-4" />{a.label}<kbd class={cn('ml-auto rounded px-1 font-mono text-[10px] ring-1', pick === j ? 'ring-primary-foreground/40' : 'text-muted-foreground ring-foreground/15')}>{a.key}</kbd>
			</button>
		{/each}
	</div>
{:else if i === 1}
	<div class="relative w-full max-w-[260px]">
		<div class="relative aspect-[4/5] overflow-hidden rounded-xl bg-background ring-1 ring-foreground/10">
			<div class="flex items-center justify-between border-b border-foreground/10 px-3 py-2">
				<span class="font-mono text-[10px] text-foreground">build 8 · Settings</span>
				<span class="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">Export</span>
			</div>
			<ul class="space-y-1.5 p-3 text-[11px] text-foreground">
				{#each [['Sync on Wi-Fi only', true], ['Keep photos offline', true], ['Daily summary', false], ['Share with team', true]] as [label, on] (label)}
					<li class="flex items-center justify-between rounded-lg px-2.5 py-2 ring-1 ring-foreground/10">
						<span>{label}</span>
						<span class={cn('flex h-3.5 w-6 items-center rounded-full p-0.5', on ? 'justify-end bg-primary' : 'justify-start bg-foreground/25')}><span class="size-2.5 rounded-full bg-background"></span></span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="absolute -right-3 bottom-[34%] max-w-[180px] rounded-xl bg-background p-2.5 text-[12px] leading-snug text-foreground shadow-lg ring-1 ring-foreground/12">
			<p class="font-medium">Dana</p>
			<p class="text-foreground/85">Can export sit top right?</p>
			<p class="mt-1.5 border-t border-foreground/10 pt-1.5"><span class="font-medium">Sam</span> <span class="text-foreground/85">Moved in build 9.</span></p>
		</div>
		<CursorTag name="Dana" tone="pink" class="absolute -top-[3%] right-[2%]" drift="a" />
		<CursorTag name="Sam" tone="teal" class="absolute bottom-[6%] left-[16%]" drift="b" />
	</div>
{:else}
	<div class="flex w-full items-center gap-4">
		<div class="flex w-[34%] shrink-0 flex-col items-center gap-2 rounded-lg px-2 py-4 ring-1 ring-primary">
			<GitBranch class="lucide size-6 text-primary" />
			<span class="font-mono text-[10px] text-foreground">your repo</span>
			<span class="font-mono text-[10px] text-foreground/70">v1.0.0</span>
		</div>
		<svg aria-hidden="true" viewBox="0 0 30 90" class="h-28 w-6 shrink-0 text-primary"><path d="M0 45 C15 45 15 10 30 10 M0 45 H30 M0 45 C15 45 15 80 30 80" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 4" /></svg>
		<ul class="grid flex-1 grid-cols-1 gap-1">
			{#each builds as b, k (b)}
				<li class={cn('flex items-center justify-between rounded-md px-2 py-1 font-mono text-[10px] ring-1 transition-colors duration-300 motion-reduce:transition-none', k < filled ? 'text-foreground ring-foreground/20' : 'text-muted-foreground ring-foreground/8')}>
					<span>{b}</span>
					{#if k < filled}<Check class="lucide size-3 text-primary" />{:else}<span class="size-1.5 rounded-full bg-foreground/25"></span>{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
