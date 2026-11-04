<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';

	let {
		preset = 'brushed-alloy',
		eyebrow,
		title,
		body,
		panel = 'glass',
		align = 'bottom',
		children,
		class: className
	}: {
		preset?: string;
		eyebrow?: string;
		title?: string;
		body?: string;
		panel?: 'glass' | 'solid';
		align?: 'bottom' | 'center' | 'top';
		children?: Snippet;
		class?: string;
	} = $props();
</script>

{#snippet words()}
	{#if eyebrow}<p class="font-mono text-[0.6875rem] tracking-wide text-muted-foreground uppercase">{eyebrow}</p>{/if}
	{#if title}<h3 class="text-xl font-medium tracking-[-0.02em] text-balance text-foreground md:text-2xl">{title}</h3>{/if}
	{#if body}<p class="leading-snug text-foreground">{body}</p>{/if}
	{@render children?.()}
{/snippet}

<div data-slot="material-tile" class={cn('relative isolate flex min-w-0 flex-col overflow-hidden rounded-2xl p-3 ring-1 ring-foreground/10 sm:p-4', align === 'bottom' ? 'justify-end' : align === 'top' ? 'justify-start' : 'justify-center', className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 50vw, 100vw" class="absolute inset-0 -z-10" />
	{#if panel === 'glass'}
		<Glass variant="smoke" class="flex flex-col gap-2 rounded-xl p-5">{@render words()}</Glass>
	{:else}
		<div class="flex flex-col gap-2 rounded-xl bg-background p-5 shadow-xl ring-1 ring-foreground/10">{@render words()}</div>
	{/if}
</div>
