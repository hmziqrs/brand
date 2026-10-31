<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { releases, to } from './content';

	let { title = 'Changelog', class: className }: { title?: string; class?: string } = $props();

	let hover = $state(0);
</script>

<section data-slot="changelog-rail" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<h2 class="text-[clamp(2.5rem,5vw,4rem)] leading-none font-medium tracking-[-0.04em] text-foreground">{title}</h2>
	<ol class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
		{#each releases as r, i (r.title)}
			<li class="relative">
				<a href={to('changelog')} class="group flex flex-col gap-3" onpointerenter={() => (hover = i)} onfocus={() => (hover = i)}>
					<span class="relative flex h-4 items-center">
						<span class="absolute inset-x-0 h-px bg-border"></span>
						<span class={cn('absolute h-px bg-primary transition-[width] duration-500 motion-reduce:transition-none', hover === i ? 'w-full' : 'w-0')}></span>
						<span class={cn('relative size-2.5 transition-colors motion-reduce:transition-none', hover === i ? 'bg-primary' : 'bg-foreground/40')}></span>
					</span>
					<span class="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">{r.date}</span>
					<span class="text-lg leading-snug font-medium text-foreground group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">{r.title}</span>
					<span class="line-clamp-3 text-base leading-snug text-foreground/85">{r.body}</span>
				</a>
			</li>
		{/each}
	</ol>
	<a href={to('changelog')} class="mt-10 inline-flex items-center gap-1.5 font-medium text-primary hover:underline">See every release <ArrowRight class="lucide size-4" /></a>
</section>
