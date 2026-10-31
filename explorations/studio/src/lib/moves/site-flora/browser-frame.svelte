<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import RotateCw from '@lucide/svelte/icons/rotate-cw';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import type { Snippet } from 'svelte';

	let {
		url = 'app.canvasworks.study',
		crumb = 'Board',
		children,
		class: className
	}: {
		url?: string;
		crumb?: string;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_80px_-40px_color-mix(in_oklab,black_70%,transparent)]', className)}>
	<div class="flex h-10 items-center gap-3 overflow-hidden border-b border-border px-3 text-foreground">
		<PanelLeft class="lucide size-4 text-muted-foreground" />
		<ChevronLeft class="lucide size-4 text-muted-foreground" />
		<ChevronRight class="lucide size-4 text-muted-foreground" />
		<RotateCw class="lucide size-3.5 text-muted-foreground" />
		<span class="min-w-0 truncate rounded-md bg-muted px-2.5 py-1 font-mono text-[11px]">{url} <span class="text-muted-foreground">/ {crumb}</span></span>
	</div>
	{@render children()}
</div>
