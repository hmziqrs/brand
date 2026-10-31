<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Play from '@lucide/svelte/icons/play';
	import type { Story } from './content';

	let { story, href, class: className }: { story: Story; href: string; class?: string } = $props();
</script>

<a {href} data-slot="story-card" class={cn('group flex flex-col gap-4', className)}>
	<span class="relative isolate grid aspect-[16/10] place-items-center overflow-hidden rounded-xl ring-1 ring-foreground/10">
		<span class="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none">
			<ShaderMaterial preset={story.preset} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0 h-full w-full" />
		</span>
		<span class="flex items-center gap-2.5 rounded-xl bg-background/85 px-4 py-2.5 text-xl font-semibold tracking-[-0.03em] text-foreground ring-1 ring-foreground/10 backdrop-blur-md">
			<svg viewBox="0 0 20 20" class="size-5 text-primary" aria-hidden="true">
				{#if story.mark === 'ring'}
					<circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.5" /><circle cx="10" cy="10" r="3.5" fill="currentColor" />
				{:else if story.mark === 'square'}
					<rect x="3" y="3" width="14" height="14" rx="2.5" fill="currentColor" />
				{:else if story.mark === 'bars'}
					<rect x="2" y="11" width="4" height="7" fill="currentColor" /><rect x="8" y="7" width="4" height="11" fill="currentColor" /><rect x="14" y="2" width="4" height="16" fill="currentColor" />
				{:else}
					<path d="M2 17 A15 15 0 0 1 17 2 L17 7 A10 10 0 0 0 7 17 Z" fill="currentColor" />
				{/if}
			</svg>
			{story.company}
		</span>
		{#if story.kind === 'Watch video'}
			<span class="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110 motion-reduce:transition-none"><Play class="lucide size-4 fill-current" /></span>
		{/if}
	</span>
	<span class="text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-foreground">{story.title}</span>
	<span class="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary">{story.kind}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
</a>
