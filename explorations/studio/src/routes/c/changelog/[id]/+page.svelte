<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { changelogCandidate, changelogSites } from '$studio/changelog-candidates';
	import { footer } from '$studio/footer-candidates';

	const c = $derived(changelogCandidate(page.params.id ?? ''));
	const site = $derived(changelogSites[c?.kind ?? 'main']);
	const f = $derived(footer(site.footer));
	const self = $derived(`#/c/changelog/${page.params.id ?? ''}`);
	const links = $derived(
		(f?.site.nav.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			current: l.label === site.current,
			children: l.children?.map((ch) => ({ label: ch.label, description: ch.description, href: self }))
		}))
	);
	const latest = $derived((c?.props.content as { releases?: { v: string }[] } | undefined)?.releases?.[0]?.v);
	const status = $derived(f && 'status' in f.props && f.props.status && latest ? { status: { label: `Latest release ${latest}`, href: self } } : {});
</script>

<svelte:head><title>{c ? `${c.name} · changelog` : 'Changelog page not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/changelog" class="hover:text-foreground">← Back to the changelog review</a>
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
		{#if f}<f.component {...f.props} {...status} />{/if}
	{:else}
		<p class="p-10">No changelog page “{page.params.id}”.</p>
	{/if}
</div>
