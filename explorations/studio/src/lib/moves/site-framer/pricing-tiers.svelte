<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Check from '@lucide/svelte/icons/check';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import IsoStack from './iso-stack.svelte';
	import { to } from './site';

	let { class: className }: { class?: string } = $props();

	let yearly = $state(true);
	const tiers = [
		{ name: 'Free', for: 'Try the agent on a real idea.', base: 0, stack: 1, credits: ['500 to try'], cta: 'Start for free', lead: 'Includes', perks: ['kiln.site address', '1 GB bandwidth', 'Unlimited design pages', 'MCP server'] },
		{ name: 'Basic', for: 'A personal site, done properly.', base: 12, stack: 2, credits: ['1k', '2k', '5k'], step: 6, cta: 'Start with Basic', lead: 'Everything in Free, plus', perks: ['Custom domain, free for a year', '2 CMS collections', '50 GB bandwidth', 'Built-in SEO'] },
		{ name: 'Pro', for: 'A growing site run by a team.', base: 36, stack: 4, credits: ['3k', '10k', '30k'], step: 20, cta: 'Start with Pro', lead: 'Everything in Basic, plus', perks: ['10 CMS collections', '100 GB bandwidth', 'Redirects and staging', 'Branches with previews', 'A/B testing add-on'], hot: true },
		{ name: 'Enterprise', for: 'Sites the business runs on.', base: -1, stack: 6, credits: ['Volume'], cta: 'Talk to sales', lead: 'Everything in Pro, plus', perks: ['Custom limits', 'SSO and SCIM', 'Uptime guarantee', 'Named support'] }
	];
	let pick = $state([0, 0, 0, 0]);
	const price = (i: number) => {
		const t = tiers[i];
		if (t.base < 0) return 'Let’s talk';
		const raw = t.base + (t.step ?? 0) * pick[i] * (pick[i] === 2 ? 2 : 1);
		return `$${Math.round(yearly ? raw * 0.84 : raw)}`;
	};
</script>

<div class={cn('min-w-0', className)}>
	<div class="mb-10 flex justify-center">
		<div class="inline-flex rounded-full border border-border bg-card p-1 text-[0.9375rem]" role="radiogroup" aria-label="Billing">
			{#each [false, true] as y (y)}
				<button type="button" role="radio" aria-checked={yearly === y} onclick={() => (yearly = y)} class={cn('rounded-full px-4 py-1.5 transition-colors', yearly === y ? 'bg-foreground text-background' : 'text-foreground')}>
					{y ? 'Yearly' : 'Monthly'}{#if y}<span class={cn('ml-2 rounded-full px-1.5 py-0.5 font-mono text-[0.6875rem]', yearly ? 'bg-primary text-primary-foreground' : 'bg-primary/15 text-primary')}>−16%</span>{/if}
				</button>
			{/each}
		</div>
	</div>
	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
		{#each tiers as t, i (t.name)}
			<div class={cn('group/tier relative isolate flex flex-col overflow-hidden rounded-[24px] border', t.hot ? 'band-orange border-transparent xl:-my-4' : 'border-border bg-card')}>
				{#if t.hot}<p class="border-b border-(--on-orange)/25 px-6 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">Most teams pick this</p>{/if}
				<div class={cn('grid h-44 place-items-center border-b', t.hot ? 'border-(--on-orange)/25' : 'border-border bg-background/40')}>
					<IsoStack count={t.stack} hot={t.hot} />
				</div>
				<div class="flex flex-1 flex-col p-6">
					<p class="text-2xl font-semibold tracking-[-0.03em]">{t.name}</p>
					<p class="mt-1 text-[1.0625rem] leading-snug">{t.for}</p>
					<p class="mt-7 flex items-baseline gap-2">
						<span class="text-[3.25rem] leading-none font-semibold tracking-[-0.05em] tabular-nums">{price(i)}</span>
						{#if t.base >= 0}<span class="font-mono text-xs leading-tight uppercase">per month{#if t.base > 0}<br />{yearly ? 'billed yearly' : 'billed monthly'}{/if}</span>{/if}
					</p>
					<a href={t.base < 0 ? to('enterprise') : to('home')} class={cn('mt-6 inline-flex items-center justify-center gap-1.5 rounded-full py-3 font-medium transition-opacity hover:opacity-85', t.hot ? 'bg-(--on-orange) text-(--orange)' : i === 0 ? 'border border-border bg-background text-foreground' : 'bg-foreground text-background')}>
						{t.cta}<ArrowRight class="lucide size-4" />
					</a>
					<div class="mt-6">
						<p class="font-mono text-[0.6875rem] tracking-[0.12em] uppercase">Agent credits / month</p>
						<div class={cn('mt-2 grid gap-1 rounded-full p-1', t.hot ? 'bg-(--on-orange)/12' : 'bg-background')} style:grid-template-columns="repeat({t.credits.length}, minmax(0, 1fr))">
							{#each t.credits as c, k (c)}
								<button
									type="button"
									disabled={t.credits.length < 2}
									onclick={() => (pick[i] = k)}
									aria-pressed={pick[i] === k}
									class={cn('rounded-full py-1.5 text-sm tabular-nums transition-colors disabled:cursor-default', pick[i] === k ? (t.hot ? 'bg-(--on-orange) text-(--orange)' : 'bg-primary text-primary-foreground') : '')}
								>{c}</button>
							{/each}
						</div>
					</div>
					<p class={cn('mt-7 border-t pt-5 text-sm font-medium', t.hot ? 'border-(--on-orange)/25' : 'border-border')}>{t.lead}</p>
					<ul class="mt-3 space-y-2.5 text-[0.9375rem]">
						{#each t.perks as p (p)}<li class="flex gap-2.5"><Check class={cn('lucide mt-0.5 size-4 shrink-0', t.hot ? '' : 'text-primary')} />{p}</li>{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
	<p class="mt-10 text-center text-lg text-foreground">Extra editors are $20 a month. Viewers and commenters are always free.</p>
</div>
