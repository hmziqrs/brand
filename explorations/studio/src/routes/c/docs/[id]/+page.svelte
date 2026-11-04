<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { docsCandidate, docsProducts } from '$studio/docs-candidates';
	import { footer } from '$studio/footer-candidates';

	const c = $derived(docsCandidate(page.params.id ?? ''));
	const site = $derived(docsProducts[c?.product ?? 'claude-multi']);
	const f = $derived(footer(site.footer));
	const self = $derived(`#/c/docs/${page.params.id ?? ''}`);
	const links = $derived(
		(f?.site.nav.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			current: l.label === site.current,
			children: l.children?.map((ch) => ({ label: ch.label, description: ch.description, href: self }))
		}))
	);
	let nav = $state(0);

	$effect(() => {
		const el = f && document.querySelector<HTMLElement>('header[data-slot="nav-bar"]');
		if (!el) return;
		const ro = new ResizeObserver(() => (nav = el.offsetHeight));
		ro.observe(el);
		return () => ro.disconnect();
	});
</script>

<svelte:head><title>{c ? `${c.name} · docs` : 'Docs page not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/docs" class="hover:text-foreground">← Back to the docs review</a>
			<span class="hidden font-mono sm:inline">{c ? `${site.label} · ${c.name}` : ''}</span>
		</div>
	</div>
	{#if c}
		{#if f}
			<NavBar site={f.site.name} maker={f.site.maker} href={self} {links} cta={{ label: f.site.nav.cta, href: self }} github={f.site.nav.github} size="wide" sticky />
		{/if}
		<main>
			<c.component {...c.props} offset={nav} />
		</main>
		{#if f}<f.component {...f.props} />{/if}
	{:else}
		<p class="p-10">No docs page “{page.params.id}”.</p>
	{/if}
</div>
