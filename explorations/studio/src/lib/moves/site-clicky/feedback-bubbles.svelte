<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Heart from '@lucide/svelte/icons/heart';
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

	const rows = $derived([posts.filter((_, i) => i % 2 === 0), posts.filter((_, i) => i % 2 === 1)]);
	const fill = (t: Tint) => (t === 'none' ? 'var(--orange)' : `var(--${t})`);
</script>

{#snippet bubble(p: Post)}
	<figure class="w-[min(80vw,22rem)] shrink-0">
		<blockquote
			class="relative rounded-[28px] rounded-bl-[6px] px-6 py-5 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-background transition-transform duration-300 hover:-rotate-1 hover:scale-[1.03] motion-reduce:transition-none"
			style:background={fill(p.tint)}
		>
			{p.text}
		</blockquote>
		<figcaption class="mt-3 flex items-center gap-2.5 pl-1">
			<span class="grid size-7 place-items-center rounded-full font-mono text-xs text-background" style:background={fill(p.tint)}>{p.name.slice(0, 1)}</span>
			<span class="text-[15px] font-medium text-foreground">{p.name}</span>
			<span class="font-mono text-xs text-muted-foreground">@{p.handle}</span>
			{#if p.likes}<span class="ml-auto inline-flex items-center gap-1 font-mono text-xs text-foreground/70"><Heart class="lucide size-3.5" />{p.likes}</span>{/if}
		</figcaption>
	</figure>
{/snippet}

<section class={cn('relative', className)}>
	<p class="mx-auto mb-6 w-fit rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">feedback</p>
	<h2 class="px-4 text-center text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-8xl">{headline}</h2>
	<p class="mt-4 text-center font-mono text-xs text-muted-foreground">example posts · people and handles invented for this study</p>
	<div class="mt-14 grid gap-10 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
		{#each rows as row, r (r)}
			<div class="group overflow-hidden">
				<div class={cn('track flex w-max items-start gap-6 px-3', r === 1 && 'rev')}>
					{#each [...row, ...row] as p, i (p.handle + i)}{@render bubble(p)}{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="relative mt-14 flex flex-col items-center gap-4 text-center">
		<p class="text-2xl font-medium text-foreground">{count}</p>
		<a {href} class="rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-transform hover:-translate-y-0.5 motion-reduce:transition-none">{cta}</a>
	</div>
</section>

<style>
	.track {
		animation: slide 60s linear infinite;
	}
	.rev {
		animation-direction: reverse;
		animation-duration: 70s;
	}
	.group:hover .track {
		animation-play-state: paused;
	}
	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
			flex-wrap: wrap;
			width: auto;
			justify-content: center;
		}
	}
</style>
