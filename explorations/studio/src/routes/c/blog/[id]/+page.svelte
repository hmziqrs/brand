<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { blog, blogSites } from '$studio/blog-candidates';
	import { footer } from '$studio/footer-candidates';

	const b = $derived(blog(page.params.id ?? ''));
	const site = $derived(blogSites[b?.kind ?? 'main']);
	const f = $derived(footer(site.footer));
	const self = $derived(`#/c/blog/${page.params.id ?? ''}`);
	const links = $derived(
		(f?.site.nav.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			current: l.label === site.current,
			children: l.children?.map((c) => ({ label: c.label, description: c.description, href: self }))
		}))
	);
</script>

<svelte:head><title>{b ? `${b.name} · blog` : 'Blog page not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/blog" class="hover:text-foreground">← Back to the blog review</a>
			<span class="hidden font-mono sm:inline">{b ? `${site.label} · ${b.name}` : ''}</span>
		</div>
	</div>
	{#if b}
		{#if f}
			<NavBar site={f.site.name} maker={f.site.maker} href={self} {links} cta={{ label: f.site.nav.cta, href: self }} github={f.site.nav.github} size="wide" sticky />
		{/if}
		<main>
			<b.component {...b.props} />
		</main>
		{#if f}<f.component {...f.props} />{/if}
	{:else}
		<p class="p-10">No blog page “{page.params.id}”.</p>
	{/if}
</div>
