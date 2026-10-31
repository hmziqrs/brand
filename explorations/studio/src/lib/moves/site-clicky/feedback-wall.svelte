<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Heart from '@lucide/svelte/icons/heart';
	import Repeat2 from '@lucide/svelte/icons/repeat-2';
	import DeskWindow from './desk-window.svelte';
	import type { Tint } from './site';

	type Post = { name: string; handle: string; text: string; when: string; rt?: number; likes?: number; tint: Tint };
	let {
		headline = 'they use it every day',
		posts,
		count = '25,000+ people and counting.',
		cta = 'join them',
		href = '#',
		class: className
	}: { headline?: string; posts: Post[]; count?: string; cta?: string; href?: string; class?: string } = $props();

	const cols = $derived([0, 1, 2].map((c) => posts.filter((_, i) => i % 3 === c)));
</script>

<section class={cn('relative', className)}>
	<p class="mx-auto mb-6 w-fit rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">feedback</p>
	<div class="overflow-hidden" aria-hidden="true">
		<div class="slide flex w-max gap-10 text-5xl font-semibold tracking-[-0.04em] whitespace-nowrap sm:text-7xl">
			{#each Array(6) as _, i (i)}<span class={i % 3 === 1 ? 'text-foreground' : 'text-foreground/25'}>{headline}</span>{/each}
		</div>
	</div>
	<h2 class="sr-only">{headline}</h2>
	<p class="mt-4 text-center font-mono text-xs text-muted-foreground">example posts · people and handles invented for this study</p>
	<div class="relative mx-auto mt-10 grid max-w-[1180px] gap-4 px-4 sm:px-6 md:grid-cols-3">
		{#each cols as col, c (c)}
			<div class={cn('grid content-start gap-4', c === 1 && 'md:pt-12')}>
				{#each col as p (p.handle)}
					<DeskWindow tint={p.tint} body="p-4">
						<div class="flex items-center gap-3">
							<span class="grid size-9 place-items-center rounded-full font-mono text-sm text-foreground" style:background="color-mix(in oklab, var(--{p.tint === 'none' ? 'orange' : p.tint}) 35%, var(--card))">{p.name.slice(0, 1)}</span>
							<div class="leading-tight"><p class="text-[15px] font-medium text-foreground">{p.name}</p><p class="font-mono text-xs text-muted-foreground">@{p.handle}</p></div>
						</div>
						<p class="mt-4 text-[17px] leading-snug text-foreground">{p.text}</p>
						<p class="mt-3 font-mono text-[11px] text-muted-foreground">{p.when}</p>
						{#if p.rt || p.likes}
							<p class="mt-2 flex gap-4 font-mono text-xs text-foreground/70">
								{#if p.rt}<span class="inline-flex items-center gap-1"><Repeat2 class="lucide size-3.5" />{p.rt}</span>{/if}
								{#if p.likes}<span class="inline-flex items-center gap-1"><Heart class="lucide size-3.5" />{p.likes}</span>{/if}
							</p>
						{/if}
					</DeskWindow>
				{/each}
			</div>
		{/each}
		<div class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent"></div>
	</div>
	<div class="relative mt-2 flex flex-col items-center gap-4 text-center">
		<p class="text-2xl font-medium text-foreground">{count}</p>
		<a {href} class="rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-transform hover:-translate-y-0.5 motion-reduce:transition-none">{cta}</a>
	</div>
</section>

<style>
	.slide {
		animation: slide 40s linear infinite;
	}
	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.slide {
			animation: none;
			transform: translateX(-20%);
		}
	}
</style>
