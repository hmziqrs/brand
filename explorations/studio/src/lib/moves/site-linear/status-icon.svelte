<script lang="ts" module>
	export type Status = 'backlog' | 'todo' | 'progress' | 'review' | 'done' | 'cancelled';
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { status, class: className }: { status: Status; class?: string } = $props();

	const tone: Record<Status, string> = {
		backlog: 'text-muted-foreground',
		todo: 'text-foreground',
		progress: 'text-primary',
		review: 'text-green',
		done: 'text-blue',
		cancelled: 'text-muted-foreground'
	};
</script>

<svg viewBox="0 0 14 14" aria-label={status} role="img" class={cn('size-3.5 shrink-0', tone[status], className)}>
	{#if status === 'backlog'}
		<circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 1.6" />
	{:else if status === 'todo'}
		<circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" />
	{:else if status === 'progress'}
		<circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" />
		<path d="M7 3.5 A3.5 3.5 0 0 1 7 10.5 Z" fill="currentColor" />
	{:else if status === 'review'}
		<circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" />
		<path d="M7 3.5 A3.5 3.5 0 1 1 3.5 7 L7 7 Z" fill="currentColor" />
	{:else if status === 'done'}
		<circle cx="7" cy="7" r="6.2" fill="currentColor" />
		<path d="M4.4 7.2 6.2 9 9.7 5.2" fill="none" stroke="var(--background)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	{:else}
		<circle cx="7" cy="7" r="6.2" fill="currentColor" />
		<path d="M5 5 9 9 M9 5 5 9" stroke="var(--background)" stroke-width="1.5" stroke-linecap="round" />
	{/if}
</svg>
