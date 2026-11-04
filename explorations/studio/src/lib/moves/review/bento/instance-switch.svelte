<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import Play from '@lucide/svelte/icons/play';
	import FolderOpen from '@lucide/svelte/icons/folder-open';
	import Link2 from '@lucide/svelte/icons/link-2';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Tag from '$brand/components/tag.svelte';
	import ProviderMark from '$moves/dovetail/provider-mark.svelte';
	import type { Provider } from '$moves/dovetail/providers';

	let {
		providers,
		picked = $bindable('ds'),
		version = '0.9.2',
		class: className
	}: {
		providers: Provider[];
		picked?: string;
		version?: string;
		class?: string;
	} = $props();

	let log = $state<string[]>([]);
	let list: HTMLUListElement | undefined = $state();
	const current = $derived(providers.find((p) => p.id === picked) ?? providers[0]);
	const rows = $derived([
		['Endpoint', current.endpoint],
		['Opus slot', current.opus],
		['Fast slot', current.fast],
		['Config', `~/.claude-${current.id}`],
		['Billing', current.pay]
	]);

	function step(e: KeyboardEvent) {
		const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
		if (!d) return;
		e.preventDefault();
		const i = providers.findIndex((p) => p.id === picked);
		picked = providers[(i + d + providers.length) % providers.length].id;
		list?.querySelector<HTMLButtonElement>(`[data-id="${picked}"]`)?.focus();
	}

	function launch() {
		log = [`$ claude-${current.id}`, `Claude Code on ${current.name}, ${current.opus} in the Opus slot.`];
	}

	function open() {
		log = [`$ open ~/.claude-${current.id}`, 'settings.json, history and login for this instance only.'];
	}

	$effect(() => {
		picked;
		log = [];
	});
</script>

<div data-slot="instance-switch" class={cn('dark overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background text-foreground shadow-[0_30px_80px_-30px_color-mix(in_oklab,black_70%,transparent)]', className)}>
	<div class="flex h-11 items-center gap-3 border-b px-4">
		<span class="flex gap-1.5" aria-hidden="true">{#each [0, 1, 2] as i (i)}<i class="size-2.5 rounded-full bg-[color-mix(in_oklab,var(--foreground)_22%,transparent)]"></i>{/each}</span>
		<span class="font-mono text-[0.75rem] text-muted-foreground">claude-multi</span>
		<span class="ml-auto font-mono text-[11px] text-foreground/70">{version}</span>
	</div>
	<div class="border-b px-3 py-3 sm:px-4">
		<div class="flex h-11 items-center gap-3 rounded-lg border px-3.5">
			<Search class="lucide size-4 text-muted-foreground" />
			<span class="min-w-0 flex-1 truncate font-mono text-[0.8125rem]"><span class="text-muted-foreground">switch</span> <span class="text-primary">{current.id}</span><span class="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-foreground motion-safe:animate-pulse"></span></span>
			<span class="hidden font-mono text-[0.6875rem] text-muted-foreground sm:inline">↑ ↓ to switch</span>
		</div>
	</div>
	<div class="grid md:grid-cols-[15rem_minmax(0,1fr)]">
		<ul bind:this={list} class="flex gap-1 overflow-x-auto border-b p-2 md:flex-col md:overflow-visible md:border-r md:border-b-0" aria-label="Instances">
			{#each providers as p (p.id)}
				{@const on = p.id === picked}
				<li class="shrink-0">
					<button
						type="button"
						data-id={p.id}
						aria-pressed={on}
						onclick={() => (picked = p.id)}
						onkeydown={step}
						class={cn(
							'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[0.8125rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
							on ? 'bg-[color-mix(in_oklab,var(--orange)_16%,transparent)] text-foreground' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
						)}
					>
						<span class={cn('grid size-6 place-items-center rounded-[5px] border text-[0.8rem]', on && 'border-transparent bg-orange text-(--on-orange)')}><ProviderMark provider={p} class="text-[0.75rem]" /></span>
						<span class="font-mono">claude-{p.id}</span>
					</button>
				</li>
			{/each}
		</ul>
		<div class="flex min-w-0 flex-col gap-6 p-5 sm:p-7">
			<div class="flex flex-wrap items-center gap-3">
				<span class="grid size-11 place-items-center rounded-lg bg-orange text-[1.3rem] text-(--on-orange)"><ProviderMark provider={current} /></span>
				<span class="flex flex-col">
					<span class="font-mono text-[1.25rem] font-semibold tracking-tight">claude-{current.id}</span>
					<span class="text-[0.8125rem] text-muted-foreground">{current.name}</span>
				</span>
				<Tag tone="success" marker class="ml-auto">Ready</Tag>
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
			<div class="flex min-h-[3.25rem] flex-col justify-center gap-1 rounded-lg border px-3.5 py-2.5 font-mono text-[0.75rem]" aria-live="polite">
				{#if log.length}
					<span class="text-primary">{log[0]}</span>
					<span class="text-foreground/85">{log[1]}</span>
				{:else}
					<span class="flex items-start gap-2 text-foreground/80"><Link2 class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />Plugins and skills linked from ~/.claude, which stays untouched.</span>
				{/if}
			</div>
			<div class="flex flex-wrap items-center justify-end gap-2">
				<Button size="sm" variant="outline" onclick={open}><FolderOpen class="lucide" data-icon="inline-start" />Open folder</Button>
				<Button size="sm" onclick={launch}><Play class="lucide" data-icon="inline-start" />Launch</Button>
			</div>
		</div>
	</div>
</div>
