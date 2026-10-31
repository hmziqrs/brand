<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Tone = 'up' | 'slow' | 'down' | 'paused' | 'new' | 'regressed' | 'ongoing' | 'resolved';
	let { state, label, class: className }: { state: Tone; label?: string; class?: string } = $props();

	const look: Record<Tone, { text: string; cls: string; pulse?: boolean }> = {
		up: { text: 'Up', cls: 'bg-green/12 text-green ring-green/30' },
		slow: { text: 'Slow', cls: 'bg-yellow/14 text-yellow ring-yellow/35', pulse: true },
		down: { text: 'Down', cls: 'bg-red text-background ring-red', pulse: true },
		paused: { text: 'Paused', cls: 'bg-muted text-muted-foreground ring-border' },
		new: { text: 'New', cls: 'bg-primary/14 text-primary ring-primary/35' },
		regressed: { text: 'Regressed', cls: 'bg-red/12 text-red ring-red/35', pulse: true },
		ongoing: { text: 'Ongoing', cls: 'bg-yellow/14 text-yellow ring-yellow/35' },
		resolved: { text: 'Resolved', cls: 'bg-muted text-muted-foreground ring-border' }
	};
	const l = $derived(look[state]);
</script>

<span data-move="status-pill" class={cn('inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[0.75rem] font-medium whitespace-nowrap ring-1 ring-inset', l.cls, className)}>
	<span class="relative grid size-1.5 place-items-center">
		{#if l.pulse}<span class="absolute size-1.5 rounded-full bg-current opacity-60 motion-safe:animate-ping"></span>{/if}
		<span class="size-1.5 rounded-full bg-current"></span>
	</span>
	{label ?? l.text}
</span>
