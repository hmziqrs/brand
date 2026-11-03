<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { bento } from '$studio/bento-candidates';
	import { hero } from '$studio/hero-candidates';
	import { footer } from '$studio/footer-candidates';

	type NavItem = { label: string; children?: { label: string; description: string }[] };
	type SiteNav = { name: string; maker?: string; links: NavItem[]; cta: string; github?: string; announcement?: string };

	const b = $derived(bento(page.params.id ?? ''));
	const h = $derived(b?.site.hero ? hero(b.site.hero) : undefined);
	const f = $derived(b ? footer(b.site.footer) : undefined);
	const self = $derived(`#/c/bento/${page.params.id ?? ''}`);
	const nav = $derived.by((): SiteNav | undefined => {
		if (h) return h.site;
		const s = f?.site;
		return s ? { name: s.name, maker: s.maker, links: s.nav.links, cta: s.nav.cta, github: s.nav.github } : undefined;
	});
	const links = $derived(
		(nav?.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			children: l.children?.map((c) => ({ label: c.label, description: c.description, href: self }))
		}))
	);
</script>

<svelte:head><title>{b ? `${b.name} · feature section` : 'Feature section not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/bento" class="hover:text-foreground">← Back to the feature section review</a>
			<span class="hidden font-mono sm:inline">{b ? `${b.site.label} · ${b.name}` : ''}</span>
		</div>
	</div>
	{#if b}
		{#if nav}
			<NavBar
				site={nav.name}
				maker={nav.maker}
				href={self}
				{links}
				cta={{ label: nav.cta, href: self }}
				github={nav.github}
				announcement={nav.announcement ? { text: nav.announcement, href: self } : null}
				announcementKey={`studio-bento-${b.site.id}`}
				size="wide"
				sticky
			/>
		{/if}
		<main>
			{#if h}<h.component {...h.props} />{/if}
			<b.component {...b.props} />
		</main>
		{#if f}<f.component {...f.props} />{/if}
	{:else}
		<p class="p-10">No feature section “{page.params.id}”.</p>
	{/if}
</div>
