<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import SpotMini from './spot-mini.svelte';

	type Plan = { name: string; for: string; month: number | null; year: number | null; unit: string; cta: string; href: string; kind: 'cube' | 'stack' | 'branch' | 'lock'; hot?: boolean; items: readonly string[] };
	let { plans, class: className }: { plans: readonly Plan[]; class?: string } = $props();

	let annual = $state(true);
</script>

<div class={cn('w-full', className)}>
	<div class="mb-8 flex justify-center">
		<div role="radiogroup" aria-label="Billing" class="inline-flex border border-border p-1">
			<button type="button" role="radio" aria-checked={!annual} onclick={() => (annual = false)} class="px-4 py-2 text-sm text-foreground aria-checked:bg-foreground aria-checked:text-background">Monthly</button>
			<button type="button" role="radio" aria-checked={annual} onclick={() => (annual = true)} class="px-4 py-2 text-sm text-foreground aria-checked:bg-foreground aria-checked:text-background">Yearly <span class="ml-1 font-mono text-xs">−17%</span></button>
		</div>
	</div>
	<div class="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
		{#each plans as p (p.name)}
			{@const price = annual ? p.year : p.month}
			<article class="flex flex-col bg-background">
				<div class={cn('relative border-b border-border px-8 pt-6 pb-2', p.hot && 'bg-[var(--orange)] text-[var(--on-orange)]')}>
					{#if p.hot}<span class="absolute top-4 left-4 font-mono text-[11px] tracking-[0.14em] uppercase">Most teams</span>{/if}
					<SpotMini kind={p.kind} class={cn('mx-auto max-w-[150px]', p.hot && '[--orange:var(--on-orange)]')} />
				</div>
				<div class="flex flex-1 flex-col p-6">
					<h3 class="text-2xl font-semibold tracking-tight text-foreground">{p.name}</h3>
					<p class="mt-2 min-h-[3em] text-[16px] leading-snug text-foreground/85">{p.for}</p>
					<p class="mt-6 flex items-baseline gap-2 text-foreground">
						{#if price === null}<span class="text-5xl font-semibold tracking-tight">Let's talk</span>
						{:else}<span class="text-6xl font-semibold tracking-tight tabular-nums">${price}</span><span class="font-mono text-xs text-muted-foreground">{p.unit}</span>{/if}
					</p>
					<a href={p.href} class={cn('mt-6 inline-flex h-11 items-center justify-center border px-4 text-sm font-medium transition-colors', p.hot ? 'border-[var(--orange)] bg-[var(--orange)] text-[var(--on-orange)] hover:opacity-85' : 'border-foreground text-foreground hover:bg-foreground hover:text-background')}>{p.cta}</a>
					<ul class="mt-6 grid gap-2.5 border-t border-border pt-6">
						{#each p.items as it (it)}
							<li class="flex gap-2.5 text-[15px] leading-snug text-foreground"><Check class="lucide mt-0.5 size-4 shrink-0" />{it}</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</div>
</div>
