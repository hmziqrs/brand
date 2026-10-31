<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	type Item = { title: string; body: string; link: string };

	let {
		lede,
		items,
		heading,
		visual,
		flip = false,
		class: className
	}: {
		lede: string;
		items: Item[];
		heading: Snippet;
		visual: Snippet<[number]>;
		flip?: boolean;
		class?: string;
	} = $props();

	let active = $state(0);
</script>

<section class={cn('mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32', className)}>
	{@render heading()}
	<div class={cn('mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16', flip && 'lg:[&>*:first-child]:order-2')}>
		<div>
			<p class="max-w-[34rem] text-[1.25rem] leading-[1.45] text-foreground sm:text-[1.4rem]">{lede}</p>
			<div class="mt-7 flex flex-wrap gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('pricing')}>Start free</Button>
			</div>
			<ul class="mt-12 border-t border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]" role="tablist">
				{#each items as it, i (it.title)}
					<li class="border-b border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]">
						<button
							type="button"
							role="tab"
							aria-selected={active === i}
							onclick={() => (active = i)}
							onpointerenter={() => (active = i)}
							class={cn('flex w-full items-center gap-4 py-4 text-left text-[1.15rem] transition-colors sm:text-[1.3rem]', active === i ? 'text-foreground' : 'text-foreground/55 hover:text-foreground')}
						>
							<span class={cn('size-2.5 shrink-0 transition-colors', active === i ? 'bg-primary' : 'bg-[color-mix(in_oklab,var(--foreground)_20%,transparent)]')}></span>
							{it.title}
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="lg:sticky lg:top-24 lg:self-start">
			<div class="relative min-h-[22rem] overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card sm:min-h-[26rem]">
				{@render visual(active)}
			</div>
			<p class="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed text-foreground">{items[active].body}</p>
			<a href={to('product')} class="mt-3 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-foreground underline-offset-4 hover:underline">{items[active].link}<ArrowRight class="lucide size-4" /></a>
		</div>
	</div>
</section>
