<script lang="ts" module>
	export type Pillar = { tag: string; title: string; body: string; points: string[] };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		items,
		visual,
		class: className
	}: { items: Pillar[]; visual: Snippet<[number]>; class?: string } = $props();

	let at = $state(0);
</script>

<div data-slot="pillar-switch" class={cn('grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16', className)}>
	<ol class="flex flex-col" role="tablist" aria-label="What enterprise teams get">
		{#each items as p, i (p.tag)}
			<li class="border-t first:border-t-0">
				<button
					type="button"
					role="tab"
					aria-selected={at === i}
					onclick={() => (at = i)}
					onpointerenter={(e) => e.pointerType === 'mouse' && (at = i)}
					class="group/p flex w-full items-baseline gap-5 py-6 text-left"
				>
					<span class={cn('font-mono text-xs tracking-[0.16em] uppercase transition-colors motion-reduce:transition-none', at === i ? 'text-primary' : 'text-muted-foreground')}>0{i + 1}</span>
					<span class="min-w-0 flex-1">
						<span class={cn('block text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.04] font-medium tracking-[-0.035em] transition-colors motion-reduce:transition-none', at === i ? 'text-foreground' : 'text-foreground/45 group-hover/p:text-foreground/70')}>{p.title}</span>
						{#if at === i}
							<span class="mt-4 block max-w-[44ch] text-lg leading-snug text-foreground">{p.body}</span>
							<span class="mt-5 grid gap-2.5">
								{#each p.points as pt (pt)}
									<span class="flex gap-3 text-[15.5px] leading-snug text-foreground/90"><span class="mt-2 size-1.5 shrink-0 bg-primary"></span>{pt}</span>
								{/each}
							</span>
						{/if}
					</span>
				</button>
			</li>
		{/each}
	</ol>
	<div class="min-w-0 lg:sticky lg:top-24 lg:self-start">
		{#key at}
			<div class="swap">{@render visual(at)}</div>
		{/key}
	</div>
</div>

<style>
	.swap {
		animation: swap-in 0.45s ease-out both;
	}
	@keyframes swap-in {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.99);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.swap {
			animation: none;
		}
	}
</style>
