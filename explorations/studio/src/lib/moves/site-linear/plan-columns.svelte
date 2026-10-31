<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Switch } from '$brand/ui/switch/index.js';
	import { Button } from '$brand/ui/button/index.js';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import { plans, to } from './content';

	let { class: className }: { class?: string } = $props();

	let yearly = $state(true);
</script>

<div data-slot="plan-columns" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<div class="mb-8 flex items-center gap-3 text-base text-foreground">
		<Switch bind:checked={yearly} id="billing" aria-label="Bill yearly" />
		<label for="billing">Billed yearly</label>
		<span class={cn('rounded-full px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase transition-colors', yearly ? 'bg-primary text-primary-foreground' : 'ring-1 ring-border')}>Save up to 17%</span>
	</div>
	<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
		{#each plans as p (p.name)}
			{@const price = yearly ? p.yearly : p.monthly}
			<div class={cn('relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl p-6 md:p-7', p.highlight ? 'band-orange' : 'bg-card/40 ring-1 ring-border')}>
				{#if p.highlight}
					<CornerRings seed="plumb-business" color="var(--on-orange)" class="pointer-events-none absolute -top-4 -right-4 -z-10 w-1/2 opacity-60 [&_circle]:[stroke-width:0.5]" />
				{/if}
				<div>
					<p class="flex items-center justify-between text-2xl font-medium tracking-[-0.02em]">{p.name}{#if p.highlight}<span class="rounded-full px-2 py-0.5 font-mono text-[10.5px] tracking-wide uppercase ring-1 ring-current">Most picked</span>{/if}</p>
					<p class="mt-4 flex items-baseline gap-2">
						{#if price === null}
							<span class="text-5xl font-medium tracking-[-0.04em]">Custom</span>
						{:else}
							<span class="text-5xl font-medium tracking-[-0.04em] tabular-nums">${price}</span>
							{#if price > 0}<span class="text-base">per user / month</span>{/if}
						{/if}
					</p>
					<p class="mt-2 text-sm">{price === 0 ? 'Free for everyone' : price === null ? 'Annual billing only' : yearly ? 'Billed yearly' : 'Billed monthly'}</p>
				</div>
				<ul class={cn('flex flex-col gap-2.5 border-t pt-5 text-[15px]', p.highlight ? 'border-(--on-orange)/25' : 'border-border')}>
					{#each p.features as f, i (f)}
						<li class="flex items-start gap-2.5"><CircleCheck class={cn('lucide mt-0.5 size-4 shrink-0', !p.highlight && 'text-primary')} /><span class={i === 0 && p.name !== 'Free' ? 'font-medium' : ''}>{f}</span></li>
					{/each}
				</ul>
				<div class="mt-auto flex flex-wrap gap-2">
					<Button href={to(p.cta === 'Talk to sales' ? 'contact' : 'contact')} variant={p.highlight ? 'default' : 'outline'} class="h-10 flex-1 rounded-full">{p.cta}</Button>
					{#if p.secondary}<Button href={to('contact')} variant="outline" class="h-10 flex-1 rounded-full">{p.secondary}</Button>{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
