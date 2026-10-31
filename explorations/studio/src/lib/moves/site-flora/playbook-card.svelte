<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import type { Playbook } from './site';

	let {
		item,
		href = '#',
		action = false,
		class: className
	}: {
		item: Playbook;
		href?: string;
		action?: boolean;
		class?: string;
	} = $props();

	const initials = $derived(
		item.by === 'canvasworks'
			? '■'
			: item.by
					.split(' ')
					.map((w) => w[0])
					.join('')
					.slice(0, 2)
	);
	const house = $derived(item.by === 'canvasworks');
</script>

<a {href} class={cn('group flex flex-col rounded-2xl border border-border bg-card p-2 transition-colors hover:border-foreground/30', className)}>
	<div class="relative aspect-[3/2] overflow-hidden rounded-xl">
		<ShaderMaterial preset={item.preset} rendering="image" loading="lazy" controls={false} sizes="(min-width: 1024px) 25vw, 50vw" class="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
		<span class="absolute top-2 left-2 rounded-full bg-background/90 px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground uppercase">{item.cat}</span>
		<span class="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-background/90 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight class="lucide size-3.5" /></span>
	</div>
	{#if action}
		<span class="mt-2 grid h-9 place-items-center rounded-lg border border-border text-sm font-medium text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">Run playbook</span>
	{/if}
	<div class="flex flex-1 flex-col px-2 pt-3 pb-2">
		<h3 class="text-[16px] font-medium tracking-[-0.01em] text-foreground">{item.name}</h3>
		<p class="mt-1 text-[14px] leading-snug text-foreground/80">{item.line}</p>
		<p class="mt-auto flex items-center gap-2 pt-4 text-[13px] text-foreground">
			<span class={cn('grid size-6 place-items-center rounded-full text-[10px] font-medium', house ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground')}>{initials}</span>
			{item.by}
			{#if house}<BadgeCheck class="lucide size-3.5 text-primary" />{/if}
		</p>
	</div>
</a>
