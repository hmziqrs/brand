<script lang="ts">
	import Headline from '$moves/identity/signature-headline.svelte';
	import Sq from '$moves/identity/sq.svelte';
	import FingerprintCard from '$moves/identity/fingerprint-card.svelte';
	import FingerprintGlyph from '$moves/identity/fingerprint-glyph.svelte';
	import OxideSlab from '$moves/identity/oxide-slab.svelte';
	import SpotFiveRounds from '$moves/identity/spot-five-rounds.svelte';
	import SignOff from '$moves/identity/sign-off.svelte';
	import { fingerprint } from '$moves/identity/fingerprint';
	import { projects, extras } from '$moves/identity/projects';

	const site = fingerprint('hmziq.rs');
	const surfaces = [
		['Phones', 'for thumbs, bad signal and small screens'],
		['Computers', 'native, quiet and keyboard-first'],
		['The web', 'fast to load, easy to read'],
		['The terminal', 'one job, then out of the way']
	];
	const rounds = ['Does it work', 'Does it read', 'Does it hold', 'Is it finished', 'Would I use it'];
	const wrap = 'mx-auto w-full max-w-[1240px] px-4 sm:px-8';
</script>

<svelte:head><title>hmziq — index</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<header class="{wrap} flex h-24 items-center justify-between">
		<a href="#/p/identity/hmziq-3" class="text-xl font-semibold tracking-[-0.02em] text-foreground">hmziq<Sq /></a>
		<nav class="flex items-center gap-5 font-mono text-[11px] tracking-[0.18em] uppercase sm:gap-8">
			<a href="#index" class="text-foreground">Index</a>
			<a href="#rounds" class="hidden text-foreground sm:inline">Method</a>
			<a href="mailto:hello@hmziq.rs" class="text-foreground">Contact</a>
		</nav>
	</header>

	<main>
		<section class="{wrap} grid gap-16 pt-20 pb-28 md:grid-cols-[1fr_auto] md:items-end md:pt-36 md:pb-44">
			<div class="flex flex-col gap-10">
				<span class="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Independent software · one person · since the first commit</span>
				<Headline voice="newsreader" size="hero" class="max-w-[15ch]">I build apps for phones, computers, the web and <em>the terminal</em></Headline>
				<p class="m-0 max-w-[34rem] text-xl leading-relaxed text-foreground">
					Designed, written, tested and reviewed five times by the same pair of hands. Small on purpose, finished on purpose.
				</p>
			</div>
			<figure class="m-0 flex w-40 flex-col gap-3 md:w-48">
				<FingerprintGlyph name="hmziq.rs" rings={8} />
				<figcaption class="font-mono text-[10px] leading-relaxed tracking-[0.16em] text-muted-foreground uppercase">hmziq.rs<br />#{site.code} · {site.preset}</figcaption>
			</figure>
		</section>

		<section id="index" class="{wrap} flex flex-col pb-32 md:pb-44">
			<div class="flex flex-wrap items-baseline justify-between gap-3 pb-6">
				<h2 class="m-0 shrink-0 font-newsreader text-3xl font-light tracking-[-0.02em]">Index<Sq size={0.28} /></h2>
				<span class="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">07 entries · each drawn from its name</span>
			</div>
			{#each projects as p, i (p.name)}
				<FingerprintCard variant="row" index={i + 1} {...p} href="#/p/identity/hmziq-3" />
			{/each}
			{#each extras as e, i (e.name)}
				<FingerprintCard variant="row" index={projects.length + i + 1} name={e.name} blurb={e.blurb} kind={i === 0 ? 'Essays' : 'Experiments'} href="#/p/identity/hmziq-3" />
			{/each}
			<div class="border-t"></div>
		</section>

		<div id="rounds">
			<OxideSlab eyebrow="Method" mark={false} class="[&>div]:md:grid-cols-1 [&>div]:md:py-32">
				<div class="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
					<Headline as="h2" voice="newsreader" size="section" square="ink" class="max-w-[13ch]">Five review rounds before <em>anything</em> ships</Headline>
					<ol class="m-0 grid list-none grid-cols-1 gap-2 p-0 text-lg sm:grid-cols-2">
						{#each rounds as r, i (r)}
							<li class="flex items-baseline gap-3"><span class="font-mono text-xs">0{i + 1}</span><span class="font-medium">{r}?</span></li>
						{/each}
					</ol>
				</div>
				<div class="-mx-4 overflow-x-auto px-4 pt-6 sm:mx-0 sm:px-0">
					<SpotFiveRounds fill="color-mix(in oklab, var(--on-orange) 55%, var(--orange))" class="min-w-[560px]" />
				</div>
			</OxideSlab>
		</div>

		<section class="{wrap} grid gap-12 py-32 md:grid-cols-[1fr_1.4fr] md:py-44">
			<h2 class="m-0 font-newsreader text-4xl leading-tight font-light tracking-[-0.02em]">Four surfaces,<br /><em>one way of working</em></h2>
			<dl class="m-0 flex flex-col">
				{#each surfaces as [name, line] (name)}
					<div class="grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-t py-5 sm:grid-cols-[12rem_1fr]">
						<dt class="flex items-baseline gap-3 text-xl font-medium"><Sq tone="hollow" size={0.5} gap={0} />{name}</dt>
						<dd class="col-start-2 m-0 text-lg text-foreground/85">{line}</dd>
					</div>
				{/each}
			</dl>
		</section>
	</main>

	<SignOff variant="quiet" class="max-w-[1240px]" />
</div>
