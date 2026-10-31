<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { level, class: className }: { level: 0 | 1 | 2 | 3 | 4; class?: string } = $props();
</script>

<svg viewBox="0 0 14 14" role="img" aria-label={level === 4 ? 'Urgent' : `Priority ${level}`} class={cn('size-3.5 shrink-0', className)}>
	{#if level === 4}
		<rect x="1" y="1" width="12" height="12" rx="2.5" class="fill-primary" />
		<path d="M7 3.6v4.2" stroke="var(--primary-foreground)" stroke-width="1.6" stroke-linecap="round" />
		<circle cx="7" cy="10.1" r="0.95" fill="var(--primary-foreground)" />
	{:else}
		{#each [0, 1, 2] as b (b)}
			<rect x={1.5 + b * 4} y={9 - b * 3} width="3" height={3.5 + b * 3} rx="0.8" class={b < level ? 'fill-foreground' : 'fill-foreground/25'} />
		{/each}
	{/if}
</svg>
