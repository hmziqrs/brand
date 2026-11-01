<script module lang="ts">
	export type Tier = {
		name: string;
		pitch: string;
		month: number | null;
		year: number | null;
		unit: string;
		cta: string;
		href: string;
		art: 'ring' | 'material' | 'oxide';
		preset?: string;
		badge?: string;
		listTitle: string;
		items: string[];
	};
</script>

<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { Button } from '$brand/ui/button/index.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import RingGlyph from './ring-glyph.svelte';
	import { cn } from '$brand/utils.js';


	let { tiers, class: className }: { tiers: Tier[]; class?: string } = $props();

	let annual = $state(true);
	const src = (p?: string) => (shaderPosters[p ?? 'hammered-copper'] ?? shaderPosters['hammered-copper']).src;
</script>

<div class={cn('w-full', className)}>
	<div class="mb-8 flex flex-wrap items-center justify-between gap-4">
		<p class="font-mono text-[0.72rem] tracking-[0.14em] text-foreground uppercase">Three plans · every seat sees everything</p>
		<div role="radiogroup" aria-label="Billing period" class="inline-flex rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] p-1">
			<button type="button" role="radio" aria-checked={!annual} onclick={() => (annual = false)} class={cn('rounded-full px-4 py-1.5 text-[0.9rem] transition-colors', !annual ? 'bg-foreground text-background' : 'text-foreground')}>Monthly</button>
			<button type="button" role="radio" aria-checked={annual} onclick={() => (annual = true)} class={cn('rounded-full px-4 py-1.5 text-[0.9rem] transition-colors', annual ? 'bg-foreground text-background' : 'text-foreground')}>Yearly <span class="ml-1 font-mono text-[0.72rem] text-primary">−20%</span></button>
		</div>
	</div>
	<div class="grid gap-4 lg:grid-cols-3">
		{#each tiers as t (t.name)}
			{@const price = annual ? t.year : t.month}
			{@const solid = t.art === 'oxide'}
			<article class={cn('flex flex-col overflow-hidden rounded-3xl', solid ? 'band-orange' : 'border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card text-foreground')}>
				<div class="relative h-44 overflow-hidden">
					{#if t.art === 'material'}
						<img src={src(t.preset)} alt="" class="absolute inset-0 size-full object-cover" />
						<span class="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,var(--card))]"></span>
					{:else if t.art === 'ring'}
						<span class="absolute -top-24 -right-14 text-[15rem] text-foreground"><RingGlyph /></span>
					{:else}
						<svg aria-hidden="true" viewBox="0 0 400 176" class="absolute inset-0 size-full" preserveAspectRatio="xMaxYMin slice">
							{#each Array.from({ length: 60 }, (_, i) => i) as i (i)}
								{@const x = 400 - (i % 12) * 22 - 22}
								{@const y = Math.floor(i / 12) * 22}
								{@const on = (i * 37) % 11 < 11 - Math.floor(i / 12) * 2.4}
								{#if on}<rect {x} {y} width="18" height="18" fill="currentColor" opacity={0.08 + ((i * 13) % 7) * 0.035} />{/if}
							{/each}
						</svg>
					{/if}
					{#if t.badge}<span class={cn('absolute top-5 left-6 rounded-full px-3 py-1 font-mono text-[0.68rem] tracking-[0.12em] uppercase', solid ? 'bg-[var(--on-orange)] text-white' : 'bg-orange text-[var(--on-orange)]')}>{t.badge}</span>{/if}
				</div>
				<div class="-mt-14 flex flex-1 flex-col px-6 pb-7 sm:px-8 sm:pb-8">
					<h3 class="relative text-[2.6rem] leading-none font-medium tracking-[-0.045em]">{t.name}</h3>
					<p class="mt-3 min-h-[3.2em] text-[1.08rem] leading-snug">{t.pitch}</p>
					<p class="mt-8 flex items-baseline gap-2">
						{#if price === null}
							<span class="text-[3.4rem] leading-none font-medium tracking-[-0.05em]">Custom</span>
						{:else}
							<span class="text-[3.4rem] leading-none font-medium tracking-[-0.05em] tabular-nums">${price}</span>
							<span class="font-mono text-[0.72rem] tracking-[0.08em] uppercase opacity-80">{t.unit}</span>
						{/if}
					</p>
					<p class="mt-2 h-5 font-mono text-[0.68rem] tracking-[0.1em] uppercase opacity-75">{price === null ? 'Priced to seats and sources' : annual && price ? 'Billed yearly' : price ? 'Billed monthly' : 'Free forever · no card'}</p>
					<Button href={t.href} size="lg" variant={solid ? 'default' : t.art === 'material' ? 'default' : 'outline'} class={cn('mt-7 w-full', solid && 'bg-[var(--on-orange)] text-white hover:bg-[color-mix(in_oklab,var(--on-orange)_85%,transparent)]')}>{t.cta}</Button>
					<div class={cn('mt-8 border-t pt-7', solid ? 'border-[color-mix(in_oklab,var(--on-orange)_22%,transparent)]' : 'border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]')}>
						<p class="font-mono text-[0.68rem] tracking-[0.14em] uppercase opacity-80">{t.listTitle}</p>
						<ul class="mt-5 space-y-3">
							{#each t.items as it (it)}
								<li class="flex gap-3 text-[1rem] leading-snug">
									<span class={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full', solid ? 'bg-[var(--on-orange)] text-white' : 'bg-orange text-[var(--on-orange)]')}><Check class="lucide size-3" /></span>{it}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
