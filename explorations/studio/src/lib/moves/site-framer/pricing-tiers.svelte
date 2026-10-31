<script lang="ts">
	import { cn } from '$brand/utils.js';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { to } from './site';

	let { class: className }: { class?: string } = $props();

	let yearly = $state(true);
	const tiers = [
		{ name: 'Free', for: 'Try it out', base: 0, credits: ['500 agent credits to try'], cta: 'Start for free', perks: ['kiln.site address', '1 GB bandwidth', 'Unlimited design pages', 'MCP server'] },
		{ name: 'Basic', for: 'Personal sites', base: 12, credits: ['1,000 credits / month', '2,000 credits / month', '5,000 credits / month'], step: 6, cta: 'Start with Basic', perks: ['Custom domain, free for a year', 'Double credits the first month', '2 CMS collections', '50 GB bandwidth', 'Built-in SEO', 'Localization add-on'] },
		{ name: 'Pro', for: 'Growing professional sites', base: 36, credits: ['3,000 credits / month', '10,000 credits / month', '30,000 credits / month'], step: 20, cta: 'Start with Pro', perks: ['Custom domain, free for a year', 'Double credits the first month', '10 CMS collections', '100 GB bandwidth', 'Redirects and staging', 'Branches with previews', 'A/B testing add-on'], hot: true },
		{ name: 'Enterprise', for: 'Mission-critical sites', base: -1, credits: ['Credits at volume pricing'], cta: 'Talk to sales', perks: ['Custom limits', 'Unlimited editors', 'SSO and SCIM', 'Uptime guarantee', 'Security review', 'Named support'] }
	];
	let pick = $state([0, 0, 0, 0]);
	const price = (i: number) => {
		const t = tiers[i];
		if (t.base < 0) return 'Custom';
		const raw = t.base + (t.step ?? 0) * pick[i] * (pick[i] === 2 ? 2 : 1);
		return `$${Math.round(yearly ? raw * 0.84 : raw)}`;
	};
</script>

<div class={cn('min-w-0', className)}>
	<div class="mb-6 flex items-center justify-end gap-3 text-[0.9375rem]">
		<span class={yearly ? 'text-foreground/55' : ''}>Monthly</span>
		<button type="button" role="switch" aria-checked={yearly} aria-label="Yearly billing" onclick={() => (yearly = !yearly)} class="relative h-6 w-11 rounded-full transition-colors" class:bg-primary={yearly} class:bg-muted={!yearly}>
			<span class="absolute top-0.5 left-0.5 size-5 rounded-full bg-background shadow transition-transform motion-reduce:transition-none" class:translate-x-5={yearly}></span>
		</button>
		<span class={yearly ? '' : 'text-foreground/55'}>Yearly <span class="ml-1 bg-primary px-1.5 py-0.5 font-mono text-[0.6875rem] text-primary-foreground">−16%</span></span>
	</div>
	<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
		{#each tiers as t, i (t.name)}
			<div class={cn('relative isolate flex flex-col p-6 md:p-7', t.hot ? 'band-orange' : 'bg-background')}>
				{#if t.hot}<CornerRings seed="kiln-pro" color="var(--on-orange)" class="[&_circle]:[stroke-width:0.5] pointer-events-none absolute -top-2 -right-2 -z-10 w-1/2 opacity-60" />{/if}
				<p class="flex items-center gap-2 text-2xl font-medium tracking-[-0.03em]">{t.name}{#if t.hot}<span class="bg-(--on-orange) px-1.5 py-0.5 font-mono text-[0.625rem] tracking-wide text-orange uppercase">Popular</span>{/if}</p>
				<p class={t.hot ? '' : 'text-foreground/65'}>{t.for}</p>
				<p class="mt-8 flex items-baseline gap-1.5"><span class="text-[3.5rem] leading-none font-semibold tracking-[-0.05em] tabular-nums">{price(i)}</span>{#if t.base > 0}<span class={t.hot ? '' : 'text-foreground/65'}>/ month</span>{/if}</p>
				<label class="relative mt-5 block">
					<span class="sr-only">Credits for {t.name}</span>
					<select bind:value={pick[i]} disabled={t.credits.length < 2} class={cn('w-full appearance-none rounded-lg border px-3 py-2.5 pr-9 text-[0.9375rem] disabled:opacity-100', t.hot ? 'border-(--on-orange)/30 bg-(--on-orange)/10' : 'border-border bg-card')}>
						{#each t.credits as c, k (c)}<option value={k}>{c}</option>{/each}
					</select>
					{#if t.credits.length > 1}<ChevronDown class="lucide pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />{/if}
				</label>
				<ul class="mt-6 space-y-2.5 border-t pt-6 text-[0.9375rem]" class:border-border={!t.hot}>
					{#each t.perks as p (p)}<li class="flex gap-2.5"><Check class={cn('lucide mt-0.5 size-4 shrink-0', t.hot ? '' : 'text-primary')} />{p}</li>{/each}
				</ul>
				<a href={t.base < 0 ? to('enterprise') : to('home')} class={cn('mt-auto block rounded-full py-3 text-center font-medium transition-opacity hover:opacity-85', t.hot ? 'bg-(--on-orange) text-orange' : 'bg-foreground text-background')} style:margin-top="2.5rem">{t.cta}</a>
			</div>
		{/each}
	</div>
	<p class="mt-5 text-center text-foreground/70">Extra editors are $20 a month. Viewers and commenters are always free.</p>
</div>
