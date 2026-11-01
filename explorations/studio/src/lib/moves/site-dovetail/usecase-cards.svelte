<script lang="ts">
	import type { Component } from 'svelte';
	import { fade } from 'svelte/transition';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import CornerDownRight from '@lucide/svelte/icons/corner-down-right';
	import { cn } from '$brand/utils.js';

	type Use = { title: string; body: string; icon: Component; prompts: string[] };

	let { uses, class: className }: { uses: Use[]; class?: string } = $props();

	let open = $state(0);
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const u = $derived(uses[open]);
</script>

<div class={cn('grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12', className)}>
	<ul class="space-y-2">
		{#each uses as x, i (x.title)}
			<li>
				<button
					type="button"
					aria-pressed={open === i}
					onclick={() => (open = i)}
					onpointerenter={() => (open = i)}
					class={cn(
						'flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors duration-200 motion-reduce:transition-none sm:px-5',
						open === i ? 'band-orange border-transparent' : 'border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] text-foreground hover:border-[color-mix(in_oklab,var(--foreground)_30%,transparent)]'
					)}
				>
					<span class={cn('grid size-12 shrink-0 place-items-center rounded-xl', open === i ? 'bg-[var(--on-orange)] text-white' : 'bg-orange text-[var(--on-orange)]')}><x.icon class="lucide size-6" /></span>
					<span class="flex-1">
						<span class="block text-[1.2rem] leading-tight font-medium tracking-[-0.02em]">{x.title}</span>
						<span class={cn('mt-1 block text-[0.95rem] leading-snug', open === i ? '' : 'text-foreground/80')}>{x.body}</span>
					</span>
				</button>
			</li>
		{/each}
	</ul>
	<div class="lg:sticky lg:top-24 lg:self-start">
		<div class="dark overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background text-foreground shadow-[0_40px_80px_-40px_color-mix(in_oklab,black_70%,transparent)]">
			<div class="flex items-center gap-2 border-b border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] px-5 py-3">
				<span class="size-2 bg-primary"></span>
				<span class="font-mono text-[0.68rem] tracking-[0.14em] uppercase">Ask · try a prompt</span>
				<span class="ml-auto font-mono text-[0.68rem] tracking-[0.1em] text-muted-foreground uppercase">{String(open + 1).padStart(2, '0')} / {String(uses.length).padStart(2, '0')}</span>
			</div>
			{#key open}
				<div in:fade={{ duration: reduce ? 0 : 220 }} class="p-5 sm:p-7">
					<p class="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] font-medium tracking-[-0.03em]">{u.title}</p>
					<ul class="mt-6 space-y-2.5">
						{#each u.prompts as p (p)}
							<li>
								<a href="#/p/site-dovetail/contact" class="group flex items-start gap-3 rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] p-4 text-[1.02rem] leading-snug transition-colors hover:border-primary">
									<CornerDownRight class="lucide mt-0.5 size-4 shrink-0 text-primary" />
									<span class="flex-1">{p}</span>
									<ArrowUpRight class="lucide size-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
								</a>
							</li>
						{/each}
					</ul>
					<p class="mt-6 font-mono text-[0.66rem] tracking-[0.12em] text-muted-foreground uppercase">Answers cite the calls, tickets and surveys they came from</p>
				</div>
			{/key}
		</div>
	</div>
</div>
