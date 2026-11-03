<script lang="ts">
	import { untrack } from 'svelte';
	import Check from '@lucide/svelte/icons/check';
	import Undo2 from '@lucide/svelte/icons/undo-2';
	import ThumbsUp from '@lucide/svelte/icons/thumbs-up';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Segmented from '$brand/components/segmented.svelte';

	let { auto = true, class: className }: { auto?: boolean; class?: string } = $props();

	type Phase = 'idle' | 'optimistic' | 'inflight' | 'committed' | 'rolledback';
	let phase = $state<Phase>('idle');
	let approvals = $state(1);
	let mode = $state<'ok' | 'fail'>('fail');
	let timers: ReturnType<typeof setTimeout>[] = [];

	const steps = [
		{ id: 'optimistic', label: 'Write cache' },
		{ id: 'inflight', label: 'Request' },
		{ id: 'settle', label: 'Settle' }
	] as const;
	const answers = [
		{ value: 'ok', label: 'Server says yes' },
		{ value: 'fail', label: 'Server says no' }
	] as const;

	const step = $derived(phase === 'idle' ? -1 : phase === 'optimistic' ? 0 : phase === 'inflight' ? 1 : 2);

	function later(ms: number, fn: () => void) {
		timers.push(setTimeout(fn, ms));
	}

	function run() {
		if (phase !== 'idle') return;
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
		const first = setTimeout(() => untrack(run), 1200);
		return () => {
			clearTimeout(first);
			timers.forEach(clearTimeout);
			timers = [];
		};
	});
</script>

<div data-slot="rollback-row" class={cn('flex min-w-0 flex-col gap-4', className)}>
	<div
		class={cn(
			'flex items-center gap-3 rounded-lg p-3 ring-1 ring-foreground/10 transition-[box-shadow,background-color] duration-300 motion-reduce:transition-none',
			(phase === 'optimistic' || phase === 'inflight') && 'ring-primary',
			phase === 'rolledback' && 'bg-red/10 ring-red',
			phase === 'committed' && 'ring-green'
		)}
	>
		<div class="flex min-w-0 flex-1 flex-col">
			<span class="truncate text-sm text-foreground">#4121 Move text shaping off the main thread</span>
			<span class="truncate font-mono text-[0.6875rem] text-muted-foreground">
				cache[Pull {'{'} id: 4121 {'}'}].approvals = <span class={cn(phase === 'optimistic' || phase === 'inflight' ? 'text-primary' : phase === 'rolledback' ? 'text-red' : 'text-foreground')}>{approvals}</span>
			</span>
		</div>
		<Button size="sm" variant={approvals === 2 ? 'default' : 'outline'} disabled={phase !== 'idle'} onclick={run} class="tabular-nums disabled:opacity-100">
			<ThumbsUp class="lucide" data-icon="inline-start" />Approve · {approvals}
		</Button>
	</div>
	<ol class="grid grid-cols-3 gap-1.5" aria-label="Mutation steps">
		{#each steps as s, i (s.id)}
			{@const done = step > i || (step === i && i < 2)}
			{@const failed = i === 2 && phase === 'rolledback'}
			{@const ok = i === 2 && phase === 'committed'}
			<li class="flex flex-col gap-1.5">
				<span class={cn('h-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none', failed ? 'bg-red' : ok ? 'bg-green' : done ? 'bg-primary' : 'bg-foreground/12')}></span>
				<span class={cn('text-[0.6875rem]', step >= i ? 'text-foreground' : 'text-muted-foreground')}>
					{#if failed}Rolled back{:else if ok}Committed{:else}{s.label}{/if}
				</span>
			</li>
		{/each}
	</ol>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<p class="flex min-h-5 items-center gap-1.5 text-xs" aria-live="polite">
			{#if phase === 'rolledback'}
				<Undo2 class="lucide size-3.5 text-red" /><span class="text-foreground">409 from the server. Snapshot restored.</span>
			{:else if phase === 'committed'}
				<Check class="lucide size-3.5 text-green" /><span class="text-foreground">The server agreed. Nothing to undo.</span>
			{:else if phase === 'idle'}
				<span class="text-muted-foreground">Press Approve. The count changes before the server answers.</span>
			{:else}
				<span class="text-primary">Showing 2 now, asking the server</span>
			{/if}
		</p>
		<Segmented label="Server answer" options={answers} value={mode} onValueChange={(v) => (mode = v as 'ok' | 'fail')} />
	</div>
</div>
