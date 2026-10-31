<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';

	type Item = { word: string; body: string };

	let {
		items,
		auto = true,
		interval = 2800,
		aside,
		class: className
	}: {
		items: Item[];
		auto?: boolean;
		interval?: number;
		aside?: Snippet<[number]>;
		class?: string;
	} = $props();

	let active = $state(0);
	let held = $state(false);

	$effect(() => {
		if (!auto || held || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => (active = (active + 1) % items.length), interval);
		return () => clearInterval(id);
	});
</script>

<div class={cn('grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16', className)}>
	<ul class="space-y-1" onpointerleave={() => (held = false)}>
		{#each items as it, i (it.word)}
			<li>
				<button
					type="button"
					onpointerenter={() => {
						held = true;
						active = i;
					}}
					onfocus={() => {
						held = true;
						active = i;
					}}
					onclick={() => (active = i)}
					aria-pressed={active === i}
					class={cn(
						'group/word flex w-full items-baseline gap-4 text-left text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.02] font-medium tracking-[-0.045em] outline-none transition-[color,-webkit-text-stroke-color,translate] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none',
						active === i
							? 'translate-x-2 text-foreground [-webkit-text-stroke:0px_transparent] sm:translate-x-6 motion-reduce:translate-x-0'
							: 'text-transparent [-webkit-text-stroke:1.25px_color-mix(in_oklab,var(--foreground)_70%,transparent)]'
					)}
				>
					<span class={cn(active === i && 'font-serif font-normal tracking-[-0.02em] italic')}>{it.word}</span>
					<span aria-hidden="true" class={cn('size-[0.22em] shrink-0 bg-primary transition-[scale,opacity] duration-500 motion-reduce:transition-none', active === i ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}></span>
				</button>
			</li>
		{/each}
	</ul>
	<div class="min-w-0">
		{#if aside}{@render aside(active)}{/if}
		<p class="mt-6 max-w-[40ch] text-xl leading-snug text-foreground" aria-live="polite">{items[active]?.body}</p>
	</div>
</div>
