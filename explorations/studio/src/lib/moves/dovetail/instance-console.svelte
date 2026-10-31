<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Search from '@lucide/svelte/icons/search';
	import Play from '@lucide/svelte/icons/play';
	import FolderOpen from '@lucide/svelte/icons/folder-open';
	import Link2 from '@lucide/svelte/icons/link-2';
	import MonoChip from './mono-chip.svelte';
	import ProviderMark from './provider-mark.svelte';
	import type { Provider } from './providers';

	let {
		providers,
		start = 'glm',
		dark = true,
		title = 'claude-multi',
		class: className
	}: {
		providers: Provider[];
		start?: string;
		dark?: boolean;
		title?: string;
		class?: string;
	} = $props();

	// svelte-ignore state_referenced_locally
	let picked = $state(start);
	const current = $derived(providers.find((p) => p.id === picked) ?? providers[0]);
	const sessions = (id: string) => 20 + ((id.length * 37 + id.charCodeAt(0) * 11) % 160);
	const rows = $derived([
		['Endpoint', current.endpoint],
		['Opus slot', current.opus],
		['Fast slot', current.fast],
		['Config', `~/.claude-${current.id}`],
		['History', `${sessions(current.id)} sessions, this instance only`],
		['Billing', current.pay]
	]);
</script>

<div
	data-slot="instance-console"
	class={cn(
		dark && 'dark',
		'overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background text-foreground shadow-[0_30px_80px_-30px_color-mix(in_oklab,black_70%,transparent)]',
		className
	)}
>
	<div class="flex h-11 items-center gap-3 border-b px-4">
		<span class="flex gap-1.5" aria-hidden="true">{#each [0, 1, 2] as i (i)}<i class="size-2.5 rounded-full bg-[color-mix(in_oklab,var(--foreground)_22%,transparent)]"></i>{/each}</span>
		<span class="font-mono text-[0.75rem] text-muted-foreground">{title}</span>
		<MonoChip class="ml-auto" tone="ghost">v0.12.0</MonoChip>
	</div>
	<div class="border-b px-3 py-3 sm:px-4">
		<div class="flex h-11 items-center gap-3 rounded-lg border bg-card px-3.5">
			<Search class="lucide size-4 text-muted-foreground" />
			<span class="min-w-0 flex-1 truncate font-mono text-[0.8125rem]"><span class="text-muted-foreground">switch</span> <span class="text-primary">{current.id}</span><span class="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-foreground motion-safe:animate-pulse"></span></span>
			<kbd class="hidden rounded border px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground sm:inline">⌘K</kbd>
		</div>
	</div>
	<div class="grid md:grid-cols-[15rem_minmax(0,1fr)]">
		<ul class="flex gap-1 overflow-x-auto border-b p-2 md:flex-col md:overflow-visible md:border-r md:border-b-0" aria-label="Instances">
			{#each providers as p (p.id)}
				{@const on = p.id === picked}
				<li class="shrink-0">
					<button
						type="button"
						aria-pressed={on}
						onclick={() => (picked = p.id)}
						class={cn(
							'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[0.8125rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
							on ? 'bg-[color-mix(in_oklab,var(--orange)_16%,transparent)] text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
						)}
					>
						<span class={cn('grid size-6 place-items-center rounded-[5px] border text-[0.8rem]', on && 'border-transparent bg-orange text-[var(--on-orange)]')}><ProviderMark provider={p} class="text-[0.75rem]" /></span>
						<span class="font-mono">claude-{p.id}</span>
						<span aria-hidden="true" class={cn('ml-auto hidden size-2 rounded-full border-[1.5px] md:block', on ? 'border-primary bg-primary' : 'border-[color-mix(in_oklab,var(--foreground)_35%,transparent)]')}></span>
					</button>
				</li>
			{/each}
		</ul>
		<div class="flex min-w-0 flex-col gap-6 p-5 sm:p-7">
			<div class="flex flex-wrap items-center gap-3">
				<span class="grid size-11 place-items-center rounded-lg bg-orange text-[1.3rem] text-[var(--on-orange)]"><ProviderMark provider={current} /></span>
				<span class="flex flex-col">
					<span class="font-mono text-[1.25rem] font-semibold tracking-tight">claude-{current.id}</span>
					<span class="text-[0.8125rem] text-muted-foreground">{current.name}</span>
				</span>
				<MonoChip class="ml-auto" mark="ring">Ready</MonoChip>
			</div>
			<dl class="grid gap-2.5 font-mono text-[0.78rem]">
				{#each rows as [k, v] (k)}
					<div class="flex items-baseline gap-2">
						<dt class="shrink-0 text-muted-foreground">{k}</dt>
						<i aria-hidden="true" class="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-[color-mix(in_oklab,var(--foreground)_25%,transparent)]"></i>
						<dd class="min-w-0 truncate text-right text-foreground">{v}</dd>
					</div>
				{/each}
			</dl>
			<div class="flex flex-wrap items-center gap-3 border-t pt-5">
				<span class="flex items-center gap-2 text-[0.8125rem]"><Link2 class="lucide size-4 text-primary" />Plugins and skills linked from <code class="font-mono text-[0.78rem]">~/.claude</code></span>
				<span class="ml-auto flex gap-2">
					<span class="inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[0.8125rem]"><FolderOpen class="lucide size-3.5" />Open folder</span>
					<span class="inline-flex h-8 items-center gap-1.5 rounded-md bg-orange px-3 text-[0.8125rem] font-medium text-[var(--on-orange)]"><Play class="lucide size-3.5" />Launch</span>
				</span>
			</div>
		</div>
	</div>
</div>
