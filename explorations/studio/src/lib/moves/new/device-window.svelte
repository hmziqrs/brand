<script lang="ts">
	import type { Snippet } from 'svelte';
	import Minus from '@lucide/svelte/icons/minus';
	import Square from '@lucide/svelte/icons/square';
	import X from '@lucide/svelte/icons/x';
	import { cn } from '$brand/utils.js';

	let {
		os = 'mac',
		title,
		toolbar,
		class: className,
		children
	}: { os?: 'mac' | 'win' | 'linux'; title: string; toolbar?: Snippet; class?: string; children: Snippet } = $props();
</script>

<div class={cn('device-window flex min-w-0 flex-col overflow-hidden border border-border bg-card text-card-foreground', os === 'win' ? 'rounded-lg' : 'rounded-xl', className)}>
	<div class="relative flex h-10 shrink-0 items-center gap-3 border-b border-border px-3.5 text-[0.78rem]">
		{#if os === 'mac'}
			<span class="flex gap-2" aria-hidden="true">
				<i class="size-3 rounded-full bg-red/80"></i><i class="size-3 rounded-full bg-yellow/80"></i><i class="size-3 rounded-full bg-green/80"></i>
			</span>
			<span class="absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-muted-foreground">{title}</span>
		{:else}
			<span class="truncate text-muted-foreground">{title}</span>
		{/if}
		<span class="ml-auto flex items-center gap-2">
			{@render toolbar?.()}
			{#if os === 'win'}
				<span class="flex items-center gap-4 pl-2 text-muted-foreground" aria-hidden="true"><Minus class="lucide size-3.5" /><Square class="lucide size-3" /><X class="lucide size-3.5" /></span>
			{:else if os === 'linux'}
				<span class="flex items-center gap-1.5 pl-2" aria-hidden="true">
					{#each [Minus, Square, X] as I, i (i)}<span class="grid size-5 place-items-center rounded-full bg-muted text-muted-foreground"><I class="lucide size-2.5" /></span>{/each}
				</span>
			{/if}
		</span>
	</div>
	<div class="relative min-h-0 flex-1">{@render children()}</div>
</div>

<style>
	.device-window {
		box-shadow:
			0 1px 0 color-mix(in oklab, var(--foreground) 6%, transparent) inset,
			0 50px 100px -40px color-mix(in oklab, oklch(from var(--foreground) 0 0 0) 45%, transparent),
			0 24px 48px -24px color-mix(in oklab, oklch(from var(--foreground) 0 0 0) 30%, transparent);
	}
</style>
