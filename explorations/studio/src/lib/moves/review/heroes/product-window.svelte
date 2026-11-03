<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';

	let {
		preset = 'chalk-dunes',
		panel = false,
		chrome = true,
		title = '',
		live = false,
		children,
		class: className
	}: { preset?: string; panel?: boolean; chrome?: boolean; title?: string; live?: boolean; children: Snippet; class?: string } = $props();
</script>

<div class={cn('relative isolate', panel && 'overflow-hidden rounded-2xl p-3 sm:p-7', className)}>
	{#if panel}<ShaderMaterial {preset} rendering="image" animated={false} controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0 -z-10 bg-transparent" />{/if}
	<Glass variant="frost" class="overflow-hidden rounded-xl border border-white/25 shadow-[0_1px_0_0_color-mix(in_oklab,white_30%,transparent)_inset,0_30px_70px_-28px_color-mix(in_oklab,black_55%,transparent)]">
		{#if chrome}<div class="relative flex h-11 items-center border-b border-foreground/10 px-4">
			<span aria-hidden="true" class="flex gap-2">
				<i class="size-3 rounded-full bg-[#ff5f57]"></i><i class="size-3 rounded-full bg-[#febc2e]"></i><i class="size-3 rounded-full bg-[#28c840]"></i>
			</span>
			<span class="absolute inset-x-24 truncate text-center font-mono text-[13px] text-foreground/70">{title}</span>
			{#if live}
				<span class="ml-auto flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-foreground/70 uppercase"><span class="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"></span>Live</span>
			{/if}
		</div>{/if}
		<div class={cn(chrome && 'px-4 py-6 sm:px-6 sm:py-8')}>{@render children()}</div>
	</Glass>
</div>
