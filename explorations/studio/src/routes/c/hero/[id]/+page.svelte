<script lang="ts">
	import { page } from '$app/state';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { hero } from '$studio/hero-candidates';

	const h = $derived(hero(page.params.id ?? ''));
	const self = $derived(`#/c/hero/${page.params.id ?? ''}`);

	const sections = [
		{ kicker: 'Why', title: 'Built for the second year, not the first demo', body: 'Most tools feel fast on day one. The test is month fourteen, when the codebase has three owners and nobody remembers why the cache key looks like that. Every default here is picked for that month.' },
		{ kicker: 'How', title: 'One small core, everything else optional', body: 'The core does one job and does it in the open. Plugins sit beside it, not inside it, so you can read the whole path from request to render in an afternoon and swap any piece without a rewrite.' },
		{ kicker: 'Price', title: 'Free to start, fair when you grow', body: 'Open source stays open source. Paid plans cover hosting, support and the hours you would rather not spend on infrastructure. No seat tax, no surprise invoices, cancel from the settings page.' }
	];
</script>

<svelte:head><title>{h ? `${h.name} · hero` : 'Hero not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<header class="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
		<div class="mx-auto flex h-14 w-full max-w-[1320px] items-center gap-6 px-4 sm:px-8">
			<a href={self} class="text-[17px]"><Wordmark name="freeoxide" /></a>
			<nav class="hidden items-center gap-6 text-sm text-foreground/80 md:flex" aria-label="Main">
				<a href={self} class="hover:text-foreground">Tools</a>
				<a href={self} class="hover:text-foreground">Docs</a>
				<a href={self} class="hover:text-foreground">Changelog</a>
			</nav>
			<Button href={self} size="sm" class="ml-auto">Get started</Button>
		</div>
	</header>

	{#if h}
		<h.component {...h.props} />

		{#each sections as s (s.title)}
			<section class="border-t border-border">
				<div class="mx-auto grid max-w-[1320px] gap-8 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
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

	<span class="fixed bottom-4 left-4 z-50 rounded-md bg-background shadow-lg"><Button href="#/review/hero" variant="outline" size="sm">← back to review</Button></span>
</div>
