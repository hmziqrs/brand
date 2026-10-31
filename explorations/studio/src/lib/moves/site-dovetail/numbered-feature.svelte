<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	let {
		n,
		title,
		body,
		more,
		visual,
		class: className
	}: {
		n: number;
		title: string;
		body: string;
		more?: string;
		visual: Snippet;
		class?: string;
	} = $props();
</script>

<section class={cn('mx-auto grid w-full max-w-[82rem] items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20', className)}>
	<div>
		<span class="font-dot text-[2.6rem] leading-none font-extrabold text-primary">{String(n).padStart(2, '0')}</span>
		<h2 class="mt-5 max-w-[13ch] text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1] font-medium tracking-[-0.045em] text-balance text-foreground">{title}</h2>
		<p class="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed text-foreground">{body}</p>
		<div class="mt-7 flex flex-wrap gap-2.5">
			<Button href={to('contact')}>Request a demo</Button>
			{#if more}<Button variant="outline" href={to('product')}>{more}</Button>{/if}
		</div>
	</div>
	<div class="relative min-h-[24rem] overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card">
		{@render visual()}
	</div>
</section>
