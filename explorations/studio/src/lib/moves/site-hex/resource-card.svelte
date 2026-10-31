<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SpotFrame from './spot-frame.svelte';
	import SpotMini from './spot-mini.svelte';

	type Kind = 'cube' | 'curve' | 'lock' | 'stack' | 'branch' | 'mail' | 'mic' | 'globe';
	let {
		kind,
		tag,
		title,
		body,
		meta,
		href = '#',
		cta = 'Read more',
		class: className
	}: { kind: Kind; tag?: string; title: string; body?: string; meta?: string; href?: string; cta?: string; class?: string } = $props();
</script>

<a {href} class={cn('group flex flex-col border border-border bg-background transition-colors hover:border-foreground', className)}>
	<SpotFrame ticks={false} grid class="border-b border-border px-10 py-8">
		<SpotMini {kind} class="mx-auto max-w-[220px] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none" />
	</SpotFrame>
	<div class="flex flex-1 flex-col p-6">
		{#if tag}<p class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">{tag}</p>{/if}
		<h3 class="mt-3 text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance text-foreground">{title}</h3>
		{#if body}<p class="mt-3 text-[17px] leading-snug text-foreground/85">{body}</p>{/if}
		<div class="mt-auto flex items-center justify-between pt-6">
			<span class="font-mono text-xs text-muted-foreground">{meta ?? ''}</span>
			<span class="inline-flex items-center gap-2 text-sm font-medium text-foreground">{cta}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
		</div>
	</div>
</a>
