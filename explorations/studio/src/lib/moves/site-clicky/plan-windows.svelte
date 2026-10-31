<script lang="ts">
	import { cn } from '$brand/utils.js';
	import DeskWindow from './desk-window.svelte';
	import type { Tint } from './site';

	type Plan = { name: string; line: string; best: string; month: number; tint: Tint; cta: string; items: string[]; hot?: boolean };
	let { plans, href = '#', class: className }: { plans: Plan[]; href?: string; class?: string } = $props();

	let yearly = $state(false);
	const price = (m: number) => (yearly ? Math.round(m * 0.8) : m);
</script>

<div class={cn('mx-auto w-full max-w-[1100px]', className)}>
	<div class="mb-10 flex justify-center">
		<div role="radiogroup" aria-label="Billing" class="inline-flex rounded-full border border-border bg-card p-1">
			<button type="button" role="radio" aria-checked={!yearly} onclick={() => (yearly = false)} class="rounded-full px-4 py-1.5 text-sm text-foreground aria-checked:bg-foreground aria-checked:text-background">monthly</button>
			<button type="button" role="radio" aria-checked={yearly} onclick={() => (yearly = true)} class="rounded-full px-4 py-1.5 text-sm text-foreground aria-checked:bg-foreground aria-checked:text-background">yearly <span class="font-mono text-xs opacity-75">−20%</span></button>
		</div>
	</div>
	<div class="grid items-start gap-5 md:grid-cols-3">
		{#each plans as p (p.name)}
			<div class="relative">
				{#if p.hot}<span class="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--orange)] px-3 py-0.5 font-mono text-[11px] text-[var(--on-orange)]">popular</span>{/if}
				<DeskWindow tint={p.tint} title="{p.name}.app" class={p.hot ? 'md:-translate-y-3' : ''} body="p-6 text-center">
					<h3 class="text-3xl font-semibold tracking-tight text-foreground">{p.name}</h3>
					<p class="mt-1 text-lg text-foreground">{p.line}</p>
					<p class="mt-1 font-mono text-xs text-muted-foreground">{p.best}</p>
					<p class="mt-6 text-7xl font-semibold tracking-[-0.05em] text-foreground tabular-nums">${price(p.month)}</p>
					<p class="mt-1 font-mono text-xs text-muted-foreground">{p.month === 0 ? 'free forever, no card' : yearly ? 'per month, billed yearly' : 'per month, billed monthly'}</p>
					<a {href} class={cn('mt-6 inline-flex h-11 items-center rounded-full px-6 text-base font-medium transition-transform hover:-translate-y-0.5 motion-reduce:transition-none', p.hot ? 'bg-[var(--orange)] text-[var(--on-orange)]' : 'border border-border bg-background text-foreground')}>{p.cta}</a>
					<div class="mt-6 border-t border-border pt-5 text-left">
						<p class="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">includes</p>
						<ul class="mt-3 grid gap-2">
							{#each p.items as it (it)}<li class="flex gap-2 text-[16px] text-foreground"><span class="mt-2 size-1.5 shrink-0 bg-[var(--orange)]"></span>{it}</li>{/each}
						</ul>
					</div>
				</DeskWindow>
			</div>
		{/each}
	</div>
	<div class="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[10px] bg-foreground p-5 font-mono text-sm text-background sm:p-6">
		<p class="max-w-[60ch]"><span class="text-[var(--orange)]">&lt; student discount &gt;</span><br />show us a school email or student id and your first month of pro is half price. *</p>
		<a {href} class="rounded-md bg-background px-4 py-2 text-foreground">reach out</a>
	</div>
	<p class="mt-3 text-center font-mono text-[11px] text-muted-foreground">* new and existing subscribers.</p>
</div>
