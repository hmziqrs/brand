<script lang="ts" module>
	export type Plan = { name: string; line: string; price: number | null; unit?: string; cta: string; href: string; features: string[]; star?: boolean };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Check from '@lucide/svelte/icons/check';

	let { plans, class: className }: { plans: Plan[]; class?: string } = $props();

	const cycles = [
		{ id: 'month', label: 'Monthly', off: 0 },
		{ id: 'quarter', label: 'Quarterly', off: 0.1 },
		{ id: 'year', label: 'Yearly', off: 0.2 }
	];
	let cycle = $state('month');
	const off = $derived(cycles.find((c) => c.id === cycle)!.off);
	const price = (p: number) => (Number.isInteger(p * (1 - off)) ? p * (1 - off) : (p * (1 - off)).toFixed(1));
</script>

<div class={cn('flex flex-col items-center', className)}>
	<div role="radiogroup" aria-label="Billing cycle" class="inline-flex gap-1 rounded-full border border-border bg-card p-1">
		{#each cycles as c (c.id)}
			<button
				type="button"
				role="radio"
				aria-checked={cycle === c.id}
				onclick={() => (cycle = c.id)}
				class={cn('rounded-full px-4 py-2 text-sm transition-colors', cycle === c.id ? 'bg-foreground text-background' : 'text-foreground hover:bg-foreground/8')}
			>
				{c.label}{#if c.off}<span class={cn('ml-1.5 font-mono text-[11px]', cycle === c.id ? 'text-background' : 'text-primary')}>−{c.off * 100}%</span>{/if}
			</button>
		{/each}
	</div>

	<div class="mt-12 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
		{#each plans as p (p.name)}
			<article
				class={cn(
					'relative flex flex-col rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
					p.star ? 'border-primary bg-primary text-primary-foreground lg:-my-3 lg:py-8' : 'border-border bg-card text-foreground'
				)}
			>
				<header class="flex items-center justify-between gap-2">
					<h3 class="text-[1.75rem] leading-none font-medium tracking-[-0.03em]">{p.name}</h3>
					{#if p.star}<span class="rounded-full bg-background px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground uppercase">Most picked</span>{/if}
				</header>
				<p class={cn('mt-2 min-h-[2.6em] text-[14px] leading-snug', p.star ? '' : 'text-foreground/80')}>{p.line}</p>
				<p class={cn('mt-5 flex items-baseline gap-1 border-t pt-5', p.star ? 'border-primary-foreground/25' : 'border-border')}>
					{#if p.price === null}
						<span class="text-[2.5rem] leading-none font-medium tracking-[-0.04em]">Custom</span>
					{:else}
						<span class="text-[2.5rem] leading-none font-medium tracking-[-0.04em] tabular-nums">${price(p.price)}</span>
						<span class={cn('text-[13px]', p.star ? '' : 'text-foreground/75')}>{p.unit ?? '/mo'}</span>
					{/if}
				</p>
				<ul class="mt-5 mb-8 space-y-2 text-[13px]">
					{#each p.features as f (f)}
						<li class="flex items-start gap-2"><Check class={cn('lucide mt-0.5 size-3.5 shrink-0', p.star ? '' : 'text-primary')} />{f}</li>
					{/each}
				</ul>
				<Button
					href={p.href}
					variant={p.star ? 'default' : 'outline'}
					class={cn('mt-auto h-11 rounded-full', p.star && 'border-transparent bg-background text-foreground hover:bg-background/90')}
				>{p.cta}</Button>
			</article>
		{/each}
	</div>
</div>
