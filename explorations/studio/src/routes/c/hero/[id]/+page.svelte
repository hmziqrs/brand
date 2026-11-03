<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import { hero } from '$studio/hero-candidates';

	const h = $derived(hero(page.params.id ?? ''));
	const self = $derived(`#/c/hero/${page.params.id ?? ''}`);
	const links = $derived(
		(h?.site.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			children: l.children?.map((c) => ({ label: c.label, description: c.description, href: self }))
		}))
	);

	const sections = [
		{ kicker: 'Why', title: 'Built for the second year, not the first demo', body: 'Most tools feel fast on day one. The test is month fourteen, when the codebase has three owners and nobody remembers why the cache key looks like that. Every default here is picked for that month.' },
		{ kicker: 'How', title: 'One small core, everything else optional', body: 'The core does one job and does it in the open. Plugins sit beside it, not inside it, so you can read the whole path from request to render in an afternoon and swap any piece without a rewrite.' },
		{ kicker: 'Price', title: 'Free to start, fair when you grow', body: 'Open source stays open source. Paid plans cover hosting, support and the hours you would rather not spend on infrastructure. No seat tax, no surprise invoices, cancel from the settings page.' }
	];
</script>

<svelte:head><title>{h ? `${h.name} · hero` : 'Hero not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/hero" class="hover:text-foreground">← Back to the hero review</a>
			<span class="hidden font-mono sm:inline">{h ? h.name : ''}</span>
		</div>
	</div>
	{#if h}
		<NavBar
			site={h.site.name}
			maker={h.site.maker}
			href={self}
			{links}
			cta={{ label: h.site.cta, href: self }}
			github={h.site.github}
			announcement={h.site.announcement ? { text: h.site.announcement, href: self } : null}
			announcementKey={`studio-hero-${h.id}`}
			size="wide"
			sticky
		/>
	{/if}

	{#if h}
		<h.component {...h.props} />

		{#each sections as s (s.title)}
			<section class="border-t border-border">
				<div class="mx-auto grid max-w-[82rem] gap-8 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
					<div>
						<p class="font-mono text-xs tracking-widest text-primary uppercase">{s.kicker}</p>
						<h2 class="mt-3 max-w-[20ch] text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{s.title}</h2>
					</div>
					<div class="flex flex-col gap-5 text-lg leading-relaxed text-foreground/80">
						<p>{s.body}</p>
						<div class="grid gap-3 sm:grid-cols-3">
							{#each [1, 2, 3] as n (n)}<div class="h-28 rounded-xl border border-border bg-card"></div>{/each}
						</div>
					</div>
				</div>
			</section>
		{/each}
		<footer class="border-t border-border px-4 py-16 text-center text-sm text-muted-foreground sm:px-8">End of page.</footer>
	{:else}
		<p class="p-10">No hero candidate “{page.params.id}”.</p>
	{/if}

</div>
