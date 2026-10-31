<script lang="ts">
	import { untrack } from 'svelte';
	import Check from '@lucide/svelte/icons/check';
	import Undo2 from '@lucide/svelte/icons/undo-2';
	import ThumbsUp from '@lucide/svelte/icons/thumbs-up';
	import { cn } from '$brand/utils.js';

	let {
		auto = true,
		interactive = true,
		outcome = 'fail',
		class: className
	}: {
		auto?: boolean;
		interactive?: boolean;
		outcome?: 'fail' | 'ok' | 'alternate';
		class?: string;
	} = $props();

	type Phase = 'idle' | 'optimistic' | 'inflight' | 'committed' | 'rolledback';
	let phase = $state<Phase>('idle');
	let approvals = $state(1);
	let mode = $state<'fail' | 'ok'>(untrack(() => (outcome === 'ok' ? 'ok' : 'fail')));
	let runs = 0;
	let timers: ReturnType<typeof setTimeout>[] = [];

	const steps = [
		{ id: 'optimistic', label: 'Write cache' },
		{ id: 'inflight', label: 'Request' },
		{ id: 'settle', label: 'Settle' }
	] as const;

	const at = $derived(phase === 'idle' ? -1 : phase === 'optimistic' ? 0 : phase === 'inflight' ? 1 : 2);

	function later(ms: number, fn: () => void) {
		timers.push(setTimeout(fn, ms));
	}

	function run() {
		if (phase !== 'idle') return;
		runs++;
		if (outcome === 'alternate' && auto) mode = runs % 2 ? 'fail' : 'ok';
		const fails = mode === 'fail';
		phase = 'optimistic';
		approvals = 2;
		later(500, () => (phase = 'inflight'));
		later(1700, () => {
			phase = fails ? 'rolledback' : 'committed';
			if (fails) approvals = 1;
		});
		later(3600, () => {
			phase = 'idle';
			approvals = 1;
		});
	}

	$effect(() => {
		if (!auto) return;
		const id = setInterval(() => untrack(run), 4400);
		const first = setTimeout(() => untrack(run), 900);
		return () => {
			clearInterval(id);
			clearTimeout(first);
			timers.forEach(clearTimeout);
			timers = [];
		};
	});
</script>

<div data-slot="mutation-rollback" class={cn('flex min-w-0 flex-col gap-4', className)}>
	<div
		class={cn(
			'flex items-center gap-3 rounded-lg border bg-background/60 p-3 transition-colors duration-300 motion-reduce:transition-none',
			phase === 'optimistic' || phase === 'inflight' ? 'border-primary' : phase === 'rolledback' ? 'border-red bg-red/10' : phase === 'committed' ? 'border-green' : ''
		)}
	>
		<div class="flex min-w-0 flex-1 flex-col">
			<span class="truncate text-sm text-foreground">#4121 Move text shaping off the main thread</span>
			<span class="font-mono text-[0.6875rem] text-muted-foreground">
				cache[Pull {'{'} id: 4121 {'}'}].approvals = <span class={cn(phase === 'optimistic' || phase === 'inflight' ? 'text-primary' : phase === 'rolledback' ? 'text-red' : 'text-foreground')}>{approvals}</span>
			</span>
		</div>
		<button
			type="button"
			disabled={!interactive || phase !== 'idle'}
			onclick={run}
			class={cn(
				'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium tabular-nums transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
				approvals === 2 ? 'bg-primary text-primary-foreground' : 'border text-foreground hover:bg-foreground/5'
			)}
		>
			<ThumbsUp class="lucide size-3.5" />Approve · {approvals}
		</button>
	</div>
	<ol class="grid grid-cols-3 gap-1.5" aria-label="Mutation steps">
		{#each steps as s, i (s.id)}
			{@const done = at > i || (at === i && i < 2)}
			{@const failed = i === 2 && phase === 'rolledback'}
			{@const ok = i === 2 && phase === 'committed'}
			<li class="flex flex-col gap-1.5">
				<span class={cn('h-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none', failed ? 'bg-red' : ok ? 'bg-green' : done ? 'bg-primary' : 'bg-foreground/12')}></span>
				<span class={cn('text-[0.6875rem]', at >= i ? 'text-foreground' : 'text-muted-foreground')}>
					{#if i === 2 && failed}Rolled back{:else if i === 2 && ok}Committed{:else}{s.label}{/if}
				</span>
			</li>
		{/each}
	</ol>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<p class="flex min-h-5 items-center gap-1.5 text-xs" aria-live="polite">
			{#if phase === 'rolledback'}
				<Undo2 class="lucide size-3.5 text-red" /><span class="text-foreground">409 from server. Snapshot restored.</span>
			{:else if phase === 'committed'}
				<Check class="lucide size-3.5 text-green" /><span class="text-foreground">Server agreed. Nothing to undo.</span>
			{:else if phase === 'idle'}
				<span class="text-muted-foreground">The button answers before the server does.</span>
			{:else}
				<span class="text-primary">Showing 2 now, asking the server…</span>
			{/if}
		</p>
		{#if interactive}
			<div class="flex rounded-md border p-0.5 text-[0.6875rem]" role="group" aria-label="Server answer">
				{#each [{ v: 'ok', l: 'Server says yes' }, { v: 'fail', l: 'Server says no' }] as o (o.v)}
					<button type="button" aria-pressed={mode === o.v} onclick={() => (mode = o.v as 'ok' | 'fail')} class={cn('rounded px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/50', mode === o.v ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}>{o.l}</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
