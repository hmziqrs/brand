<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { pricingCandidate, pricingSites } from '$studio/pricing-candidates';
	import { footer } from '$studio/footer-candidates';
	import { withPricing } from '$moves/review/pricing/sites';

	const c = $derived(pricingCandidate(page.params.id ?? ''));
	const site = $derived(pricingSites[c?.kind ?? 'studio']);
	const f = $derived(footer(site.footer));
	const self = $derived(`#/c/pricing/${page.params.id ?? ''}`);
	const nav = $derived(site.nav ?? (f ? { name: f.site.name, maker: f.site.maker, links: withPricing(f.site.nav.links), cta: f.site.nav.cta, github: f.site.nav.github } : undefined));
	const links = $derived(
		(nav?.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			current: l.label === site.current,
			children: l.children?.map((ch) => ({ label: ch.label, description: ch.description, href: self }))
		}))
	);
</script>

<svelte:head><title>{c ? `${c.name} · pricing` : 'Pricing page not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground [--pricing-top:65px]">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/pricing" class="hover:text-foreground">← Back to the pricing review</a>
			<span class="hidden font-mono sm:inline">{c ? `${site.label} · ${c.name}` : ''}</span>
		</div>
	</div>
	{#if c}
		{#if nav}
			<NavBar site={nav.name} maker={nav.maker} href={self} {links} cta={{ label: nav.cta, href: self }} github={nav.github} size="wide" sticky />
		{/if}
		<main>
			<c.component {...c.props} />
		</main>
		{#if f}<f.component {...f.props} />{/if}
	{:else}
		<p class="p-10">No pricing page “{page.params.id}”.</p>
	{/if}
</div>
