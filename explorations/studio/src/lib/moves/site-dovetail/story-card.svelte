<script lang="ts">
	import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';
	import { to } from './site';
	import type { Story } from './stories';

	let { story, tall = false, class: className }: { story: Story; tall?: boolean; class?: string } = $props();

	const poster = $derived((shaderPosters[story.preset] ?? shaderPosters['hammered-copper']).src);
</script>

<a href={to('customers')} class={cn('group block', className)}>
	<div class={cn('relative overflow-hidden rounded-2xl', tall ? 'aspect-[4/5]' : 'aspect-[10/11]')}>
		<img src={poster} alt="" loading="lazy" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
		<div class="absolute inset-x-3 top-3 flex items-center justify-between">
			<span class="rounded-md bg-background px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-foreground uppercase">{story.industry}</span>
			{#if story.stat}<span class="rounded-md bg-orange px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-[var(--on-orange)] uppercase">{story.stat}</span>{/if}
		</div>
		<div class="absolute inset-x-3 bottom-3 rounded-xl bg-background p-4 transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:transition-none sm:translate-y-[calc(100%-4.25rem)]">
			<p class="text-[1.35rem] leading-tight font-medium tracking-[-0.02em] text-foreground">{story.org}</p>
			<p class="mt-3 text-[0.95rem] leading-snug text-foreground transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">“{story.quote}”</p>
			<p class="mt-3 font-mono text-[0.6rem] tracking-[0.1em] text-muted-foreground uppercase transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">{story.name} · {story.role} · invented example</p>
		</div>
	</div>
	<p class="mt-4 text-[1.05rem] leading-snug text-foreground">{story.title}<ArrowDownRight class="lucide ml-1 inline size-4 align-[-0.15em]" /></p>
</a>
