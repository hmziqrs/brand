<script lang="ts">
	import { page } from '$app/state';
	import { header } from '$studio/header-candidates';

	const h = $derived(header(page.params.id ?? ''));

	const sections = [
		{ kicker: 'Why', title: 'Built for the second year, not the first demo', body: 'Most tools feel fast on day one. The test is month fourteen, when the codebase has three owners and nobody remembers why the cache key looks like that. Every default here is picked for that month.' },
		{ kicker: 'How', title: 'One small core, everything else optional', body: 'The core does one job and does it in the open. Plugins sit beside it, not inside it, so you can read the whole path from request to render in an afternoon and swap any piece without a rewrite.' },
		{ kicker: 'Proof', title: 'Teams that moved and stayed', body: 'Studios, agencies and two-person shops run it in production. They write in about the boring parts: upgrades that took ten minutes, error messages that named the file, docs that matched the code.' },
		{ kicker: 'Price', title: 'Free to start, fair when you grow', body: 'Open source stays open source. Paid plans cover hosting, support and the hours you would rather not spend on infrastructure. No seat tax, no surprise invoices, cancel from the settings page.' }
	];
</script>

<svelte:head><title>{h ? `${h.name} · header` : 'Header not found'}</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	{#if h}
		<h.component {...h.props} />

		<section class="mx-auto max-w-[1320px] px-4 pt-24 pb-20 sm:px-8 sm:pt-32">
			<p class="font-mono text-xs tracking-widest text-primary uppercase">{h.name} header · scroll test</p>
			<h1 class="mt-5 max-w-[14ch] text-5xl leading-[1.02] font-medium tracking-tight sm:text-7xl">Software that still makes sense next year.</h1>
			<p class="mt-6 max-w-[48ch] text-xl leading-snug text-foreground/80">Scroll down to see how the header behaves once the page moves under it. Narrow the window to try the phone menu.</p>
			<div class="mt-10 h-72 rounded-2xl border border-border bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_60%),linear-gradient(135deg,var(--muted),var(--background))] sm:h-96"></div>
		</section>

		{#each sections as s, i (s.title)}
			<section class={i % 2 ? 'bg-muted/40' : ''}>
				<div class="mx-auto grid max-w-[1320px] gap-8 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
					<div>
						<p class="font-mono text-xs tracking-widest text-primary uppercase">{s.kicker}</p>
						<h2 class="mt-3 max-w-[20ch] text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{s.title}</h2>
					</div>
					<div class="flex flex-col gap-5 text-lg leading-relaxed text-foreground/80">
						<p>{s.body}</p>
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
		<p class="p-10">No header candidate “{page.params.id}”.</p>
	{/if}

	<a href="#/review/header" class="fixed bottom-4 left-4 z-50 rounded-full border border-border bg-background/90 px-3.5 py-1.5 text-sm shadow-lg backdrop-blur-md hover:text-primary">← back to review</a>
</div>
