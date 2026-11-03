<script lang="ts">
	import { page } from '$app/state';
	import NavBar from '$brand/components/nav-bar.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import { footer } from '$studio/footer-candidates';

	const f = $derived(footer(page.params.id ?? ''));
	const self = $derived(`#/c/footer/${page.params.id ?? ''}`);
	const links = $derived(
		(f?.site.nav.links ?? []).map((l) => ({
			label: l.label,
			href: self,
			children: l.children?.map((c) => ({ label: c.label, description: c.description, href: self }))
		}))
	);
</script>

<svelte:head><title>{f ? `${f.name} · footer` : 'Footer not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border bg-muted/40 text-xs">
		<div class="mx-auto flex h-9 w-full max-w-[82rem] items-center justify-between gap-4 px-6 text-muted-foreground">
			<a href="#/review/footer" class="hover:text-foreground">← Back to the footer review</a>
			<span class="hidden font-mono sm:inline">{f ? f.name : ''}</span>
		</div>
	</div>
	{#if f}
		{@const p = f.site.page}
		<NavBar
			site={f.site.name}
			maker={f.site.maker}
			href={self}
			{links}
			cta={{ label: f.site.nav.cta, href: self }}
			github={f.site.nav.github}
			size="wide"
			sticky
		/>

		<main>
			{#if p.article}
				<article>
					<Container size="narrow" class="pt-20 pb-24 sm:pt-28">
						<p class="font-mono text-xs tracking-widest text-primary uppercase">{p.kicker}</p>
						<h1 class="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance">{p.title}</h1>
						<p class="mt-6 text-xl leading-snug text-foreground/85">{p.lede}</p>
						{#each p.sections as s (s.title)}
							<h2 class="mt-14 text-2xl font-medium tracking-tight">{s.title}</h2>
							<p class="mt-4 text-lg leading-relaxed text-foreground/85">{s.body}</p>
						{/each}
					</Container>
				</article>
			{:else}
				<Container size="wide" class="pt-20 pb-16 sm:pt-28">
					<p class="font-mono text-xs tracking-widest text-primary uppercase">{p.kicker}</p>
					<h1 class="mt-5 max-w-[16ch] text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">{p.title}</h1>
					<p class="mt-6 max-w-[52ch] text-xl leading-snug text-foreground/85">{p.lede}</p>
				</Container>
				{#each p.sections as s, i (s.title)}
					<section class="border-t border-border">
						<Container size="wide" class="grid gap-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
							<div class="flex items-baseline gap-4">
								<span class="font-mono text-xs text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
								<h2 class="max-w-[18ch] text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{s.title}</h2>
							</div>
							<p class="max-w-[56ch] text-lg leading-relaxed text-foreground/85">{s.body}</p>
						</Container>
					</section>
				{/each}
			{/if}
		</main>

		<f.component {...f.props} />
	{:else}
		<p class="p-10">No footer candidate “{page.params.id}”.</p>
	{/if}
</div>
