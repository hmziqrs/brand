<script lang="ts">
	import Star from '@lucide/svelte/icons/star';
	import Check from '@lucide/svelte/icons/check';
	import Trash from '@lucide/svelte/icons/trash-2';
	import { cn } from '$brand/utils.js';
	import { verdicts, type Verdict } from './verdicts.svelte';

	let { id, size = 'sm' }: { id: string; size?: 'sm' | 'md' } = $props();

	const opts: { v: Verdict; label: string; icon: typeof Star; on: string }[] = [
		{ v: 'star', label: 'Star', icon: Star, on: 'bg-yellow/20 text-yellow border-yellow/50' },
		{ v: 'keep', label: 'Keep', icon: Check, on: 'bg-green/20 text-green border-green/50' },
		{ v: 'nuke', label: 'Nuke', icon: Trash, on: 'bg-red/20 text-red border-red/50' }
	];
</script>

<div class="flex items-center gap-1">
	{#each opts as o (o.v)}
		{@const Icon = o.icon}
		<button
			type="button"
			title={o.label}
			aria-label={`${o.label} ${id}`}
			aria-pressed={verdicts.all[id] === o.v}
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				verdicts.set(id, o.v);
			}}
			class={cn(
				'inline-flex items-center justify-center rounded-md border border-border text-muted-foreground transition-colors motion-reduce:transition-none hover:text-foreground',
				size === 'sm' ? 'size-7' : 'size-8',
				verdicts.all[id] === o.v && o.on
			)}
		>
			<Icon class="lucide size-3.5" />
		</button>
	{/each}
</div>
