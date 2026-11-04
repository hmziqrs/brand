<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { companyCandidate, companySites } from '$studio/company-candidates';
	import { footer } from '$studio/footer-candidates';

	const c = $derived(companyCandidate(page.params.id ?? ''));
	const site = $derived(companySites[c?.kind ?? 'contact']);
	const f = $derived(footer(site.footer));
	const self = $derived(`#/c/company/${page.params.id ?? ''}`);
	const links = $derived(
		(f?.site.nav.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			current: l.label === site.current,
			children: l.children?.map((ch) => ({ label: ch.label, description: ch.description, href: self }))
		}))
	);
</script>

<svelte:head><title>{c ? `${c.name} · company` : 'Company page not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground [--company-top:65px]">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/company" class="hover:text-foreground">← Back to the company pages review</a>
			<span class="hidden font-mono sm:inline">{c ? `${site.label} · ${c.name}` : ''}</span>
		</div>
	</div>
	{#if c}
		{#if f}
			<NavBar site={f.site.name} maker={f.site.maker} href={self} {links} cta={{ label: f.site.nav.cta, href: self }} github={f.site.nav.github} size="wide" sticky />
		{/if}
		<main>
			<c.component {...c.props} />
		</main>
		{#if f}<f.component {...f.props} />{/if}
	{:else}
		<p class="p-10">No company page “{page.params.id}”.</p>
	{/if}
</div>
