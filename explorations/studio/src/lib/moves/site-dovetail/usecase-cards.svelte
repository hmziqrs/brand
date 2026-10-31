<script lang="ts">
	import type { Component } from 'svelte';
	import { slide } from 'svelte/transition';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CornerDownRight from '@lucide/svelte/icons/corner-down-right';
	import { cn } from '$brand/utils.js';

	type Use = { title: string; body: string; icon: Component; prompts: string[] };

	let { uses, class: className }: { uses: Use[]; class?: string } = $props();

	let open = $state(-1);
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<div class={cn('grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
	{#each uses as u, i (u.title)}
		<article class={cn('rounded-2xl border p-6 transition-colors', open === i ? 'border-primary bg-card' : 'border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card hover:border-[color-mix(in_oklab,var(--foreground)_28%,transparent)]')}>
			<span class={cn('grid size-12 place-items-center rounded-xl', open === i ? 'bg-orange text-[var(--on-orange)]' : 'bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] text-foreground')}><u.icon class="lucide size-6" /></span>
			<h3 class="mt-8 text-[1.2rem] font-medium tracking-[-0.015em] text-foreground">{u.title}</h3>
			<p class="mt-2 text-[1rem] leading-relaxed text-foreground/85">{u.body}</p>
			<button type="button" aria-expanded={open === i} onclick={() => (open = open === i ? -1 : i)} class="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-foreground hover:text-primary">
				{open === i ? 'Hide prompts' : 'Try prompts'}<ArrowRight class={cn('lucide size-4 transition-transform motion-reduce:transition-none', open === i && 'rotate-90')} />
			</button>
			{#if open === i}
				<ul transition:slide={{ duration: reduce ? 0 : 250 }} class="mt-4 space-y-2">
					{#each u.prompts as p (p)}
						<li class="flex gap-2 rounded-lg bg-background p-3 text-[0.9rem] leading-snug text-foreground"><CornerDownRight class="lucide mt-0.5 size-4 shrink-0 text-primary" />{p}</li>
					{/each}
				</ul>
			{/if}
		</article>
	{/each}
</div>
