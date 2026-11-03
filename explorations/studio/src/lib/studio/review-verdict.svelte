<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { verdicts, type Verdict } from './verdicts.svelte';

	let { id, class: className }: { id: string; class?: string } = $props();

	const opts: { v: Verdict; label: string; on: string }[] = [
		{ v: 'keep', label: 'Keep', on: 'border-green/60 bg-green/15 text-green' },
		{ v: 'remove', label: 'Remove', on: 'border-red/60 bg-red/15 text-red' },
		{ v: 'tweak', label: 'Tweak', on: 'border-yellow/60 bg-yellow/15 text-yellow' }
	];
</script>

<div class={cn('flex flex-wrap items-center gap-1.5', className)}>
	{#each opts as o (o.v)}
		<button
			type="button"
			aria-pressed={verdicts.all[id] === o.v}
			onclick={() => verdicts.set(id, o.v)}
			class={cn(
				'h-8 rounded-md border border-border px-3 text-sm text-foreground/80 transition-colors hover:text-foreground motion-reduce:transition-none',
				verdicts.all[id] === o.v && o.on
			)}>{o.label}</button
		>
	{/each}
	<input
		type="text"
		placeholder="Note"
		aria-label={`Note for ${id}`}
		value={verdicts.notes[id] ?? ''}
		oninput={(e) => verdicts.note(id, e.currentTarget.value)}
		class="h-8 w-44 min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring sm:flex-none"
	/>
</div>
