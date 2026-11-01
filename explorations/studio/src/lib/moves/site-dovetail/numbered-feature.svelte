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
		inset = false,
		visual,
		class: className
	}: {
		n: number;
		title: string;
		body: string;
		more?: string;
		inset?: boolean;
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
	<div class={cn('relative isolate min-w-0 min-h-[24rem] overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card', inset && 'grid grid-cols-[minmax(0,1fr)] place-items-center p-4 sm:p-10')}>
		<span aria-hidden="true" class="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_22%,transparent)_1px,transparent_1.5px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black_90%)]"></span>
		<span aria-hidden="true" class="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--orange)_14%,transparent),transparent_70%)]"></span>
		{#if inset}<div class="w-full min-w-0 max-w-[34rem]">{@render visual()}</div>{:else}{@render visual()}{/if}
	</div>
</section>
