<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Check from '@lucide/svelte/icons/check';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Megaphone from '@lucide/svelte/icons/megaphone';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import Layers from '@lucide/svelte/icons/layers';

	let {
		title = 'Talk to an expert',
		cells = [],
		preset = 'cast-iron',
		cta = 'Send the brief',
		class: className
	}: { title?: string; cells?: { icon: Component; title: string; body: string }[]; preset?: string; cta?: string; class?: string } = $props();

	const kinds = [
		{ i: Megaphone, t: 'Marketing site' },
		{ i: BookOpen, t: 'Docs or help centre' },
		{ i: ShoppingBag, t: 'Storefront' },
		{ i: Layers, t: 'Many brands, one team' }
	];
	const sizes = ['1–10', '11–50', '51–200', '200+'];
	const whens = ['This month', 'This quarter', 'Just exploring'];

	let step = $state(0);
	let kind = $state<string | null>(null);
	let size = $state<string | null>(null);
	let when = $state<string | null>(null);
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let tried = $state(false);
	let sent = $state(false);
	const okEmail = $derived(/.+@.+\..+/.test(email));
	const can = $derived(step === 0 ? !!kind : step === 1 ? !!size && !!when : !!name && okEmail);
	const qs = ['What are you building?', 'Who works on it, and when?', 'Where should we reply?'];
	const field = 'mt-2 w-full border-b-2 border-border bg-transparent pb-2 text-xl outline-none transition-colors placeholder:text-foreground/40 focus:border-primary';

	function next() {
		tried = true;
		if (!can) return;
		tried = false;
		if (step < 2) step++;
		else sent = true;
	}
	const reset = () => ((sent = false), (step = 0), (kind = size = when = null), (name = email = company = ''));
</script>

<div class={cn('grid gap-4', cells.length && 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]', className)}>
	{#if cells.length}
		<div class="grid gap-4 sm:grid-cols-2">
			{#each cells as c (c.title)}
				<div class="flex min-h-40 flex-col rounded-[24px] border border-border bg-card p-6 sm:min-h-52">
					<span class="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><c.icon class="lucide size-4" /></span>
					<p class="mt-auto pt-6 text-xl font-medium sm:pt-10 tracking-[-0.02em]">{c.title}</p>
					<p class="mt-1.5 text-[1.0625rem] leading-snug text-foreground/80">{c.body}</p>
				</div>
			{/each}
		</div>
	{/if}

	{#if sent}
		<div class="band-orange relative isolate flex min-h-[520px] flex-col justify-end gap-4 overflow-hidden rounded-[28px] p-8 sm:p-10">
			<span class="grid size-14 place-items-center rounded-full bg-(--on-orange) text-(--orange)"><Check class="lucide size-7" /></span>
			<p class="text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.045em]">Thanks{name ? `, ${name.split(' ')[0]}` : ''}.</p>
			<p class="max-w-[36ch] text-xl leading-snug">A specialist will reply to {email} within one working day with a short call slot and a plan for your {kind?.toLowerCase()}.</p>
			<button type="button" class="w-fit underline underline-offset-4" onclick={reset}>Start another brief</button>
		</div>
	{:else}
		<form
			class="flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-border bg-card"
			onsubmit={(e) => {
				e.preventDefault();
				next();
			}}
		>
			<div class="dark relative isolate flex items-end justify-between gap-4 overflow-hidden px-6 pt-10 pb-5 text-foreground sm:px-8">
				<ShaderMaterial {preset} rendering="image" controls={false} sizes="720px" class="absolute inset-0 -z-20 h-full w-full" />
				<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--background),color-mix(in_oklab,var(--background)_45%,transparent))]"></div>
				<p class="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.04em]">{title}</p>
				<p class="shrink-0 font-mono text-xs tracking-[0.12em] uppercase">Step {step + 1} / 3</p>
			</div>
			<div class="flex gap-1.5 px-6 pt-5 sm:px-8">
				{#each qs as _, i (i)}<span class={cn('h-1 flex-1 rounded-full transition-colors duration-300', i <= step ? 'bg-primary' : 'bg-muted')}></span>{/each}
			</div>
			<div class="flex-1 px-6 pt-8 sm:px-8">
				<p class="text-2xl font-medium tracking-[-0.025em]">{qs[step]}</p>
				{#if step === 0}
					<div class="mt-5 grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label={qs[0]}>
						{#each kinds as k (k.t)}
							<button type="button" role="radio" aria-checked={kind === k.t} onclick={() => (kind = k.t)} class={cn('flex items-center gap-3 rounded-2xl border p-4 text-left text-lg transition-colors', kind === k.t ? 'border-transparent bg-primary text-primary-foreground' : 'border-border bg-background hover:border-primary')}>
								<k.i class="lucide size-5 shrink-0" />{k.t}
							</button>
						{/each}
					</div>
				{:else if step === 1}
					<p class="mt-5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">People editing the site</p>
					<div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Team size">
						{#each sizes as s (s)}
							<button type="button" role="radio" aria-checked={size === s} onclick={() => (size = s)} class={cn('rounded-full border py-2.5 text-lg tabular-nums transition-colors', size === s ? 'border-transparent bg-primary text-primary-foreground' : 'border-border bg-background hover:border-primary')}>{s}</button>
						{/each}
					</div>
					<p class="mt-6 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">Launch</p>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Launch">
						{#each whens as w (w)}
							<button type="button" role="radio" aria-checked={when === w} onclick={() => (when = w)} class={cn('rounded-full border px-4 py-2.5 text-lg transition-colors', when === w ? 'border-transparent bg-foreground text-background' : 'border-border bg-background hover:border-primary')}>{w}</button>
						{/each}
					</div>
				{:else}
					<div class="mt-4 grid gap-6 sm:grid-cols-2">
						<label class="text-sm">Name<input bind:value={name} placeholder="Your name" class={cn(field, tried && !name && 'border-red')} /></label>
						<label class="text-sm">Work email<input bind:value={email} type="email" placeholder="you@company.com" class={cn(field, tried && !okEmail && 'border-red')} /></label>
						<label class="text-sm sm:col-span-2">Company<input bind:value={company} placeholder="Company name (optional)" class={field} /></label>
					</div>
				{/if}
				{#if tried && !can}<p class="mt-4 text-sm text-red">{step === 2 ? 'Add your name and a work email so we can reply.' : 'Pick an answer to continue.'}</p>{/if}
			</div>
			<div class="mt-8 flex flex-wrap items-center gap-3 border-t border-border px-6 py-5 sm:px-8">
				<div class="mr-auto flex min-w-0 flex-wrap gap-1.5">
					{#each [kind, size && `${size} people`, when].filter(Boolean) as a (a)}<span class="rounded-full bg-muted px-2.5 py-1 text-sm">{a}</span>{/each}
				</div>
				{#if step > 0}<button type="button" onclick={() => step--} class="grid size-11 place-items-center rounded-full border border-border hover:border-primary" aria-label="Back"><ArrowLeft class="lucide size-4" /></button>{/if}
				<button type="submit" class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-85">{step < 2 ? 'Next' : cta}<ArrowRight class="lucide size-4" /></button>
			</div>
		</form>
	{/if}
</div>
