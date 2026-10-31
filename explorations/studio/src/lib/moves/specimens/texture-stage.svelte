<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import { cn } from '$brand/utils.js';

	let { layer, align = 'start', class: className }: { layer: Snippet; align?: 'start' | 'end'; class?: string } = $props();
</script>

<div class={cn('relative flex min-h-[460px] items-end p-4 @lg:p-8', align === 'end' && 'justify-end', className)}>
	<div class="absolute inset-0 -z-10">{@render layer()}</div>
	<div class="reading relative flex w-full max-w-[400px] flex-col gap-4 rounded-xl border p-6">
		<span class="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-foreground uppercase"><i class="sq"></i>claude-multi 0.9</span>
		<h2 class="text-[clamp(1.9rem,6cqw,2.6rem)] leading-[0.98] font-medium tracking-[-0.04em] text-foreground">Switch providers, keep the session.</h2>
		<p class="text-[16px] leading-relaxed text-foreground">One command moves Claude Code to Bedrock, Vertex or your own gateway. Hooks and MCP servers come along.</p>
		<div class="flex flex-wrap gap-2">
			<Button>Install</Button>
			<Button variant="outline" class="bg-background">Read the guide <ArrowRight class="lucide" /></Button>
		</div>
	</div>
</div>

<style>
	.reading {
		background: color-mix(in oklab, var(--background) 94%, transparent);
		backdrop-filter: blur(14px);
		box-shadow: 0 24px 60px -24px color-mix(in oklab, black 55%, transparent);
	}
	.sq {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--mark-square);
	}
</style>
