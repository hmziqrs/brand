<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import ReadMore from '$moves/site-flora/read-more.svelte';
	import { brand, posts } from '$moves/site-flora/site';

	let playing = $state(true);

	const body = [
		'We’re creatives. We started canvasworks because we kept hitting the same wall: the new tools could make pictures, but they wouldn’t take direction.',
		'We think these tools should be more than slot machines for filler. We want to build an instrument, something serious enough to change how creative work actually gets done.',
		'Classic creative software gives you control, but it’s slow, it takes years to learn, and we still lose whole afternoons to the same repetitive steps.',
		'The new tools flip that. Making is easy and steering is nearly impossible. That’s fine for filler. It isn’t fine for work you’d sign. We want creatives to have both: the speed of the new and the control of the old.',
		'So we’re building for agency. A tool that’s easy to pick up and deep enough to grow into, where you lose track of time the way you do on a good day in the studio. We came out of an art-and-technology lab, and we still work like one.',
		'We called it canvasworks because the canvas is where the work happens. Put the idea down. Watch what it turns into.',
		'We can’t wait to see what you make.'
	];
</script>

<svelte:head><title>Manifesto — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav />

	<header class="mx-auto max-w-[1100px] px-4 pt-20 text-center sm:px-8 sm:pt-28">
		<p class="text-[14px] text-muted-foreground">Jul 29, 2025 · Company update</p>
		<h1 class="mt-5 text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-medium tracking-[-0.045em] text-foreground">The canvasworks manifesto</h1>
		<p class="mt-6 inline-flex items-center gap-2 text-[15px] text-foreground"><span class="text-lg"><Wordmark name={brand} /></span></p>
	</header>

	<figure class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-8">
		<div class="relative isolate aspect-[4/3] overflow-hidden rounded-3xl border border-border sm:aspect-[16/8]">
			<ShaderMaterial preset="oxide-bloom" rendering="live" animated={playing} controls={false} loading="eager" class="absolute inset-0 -z-20 h-full w-full" />
			<RustGridField mode="reveal" cell={48} veil={0.86} fade="none" gap={0} class="-z-10" />
			<button type="button" onclick={() => (playing = !playing)} aria-pressed={!playing} class="absolute right-4 bottom-4 rounded-full bg-background px-4 py-2 text-sm text-foreground hover:text-primary">
				{playing ? 'Pause' : 'Play'} the material
			</button>
		</div>
		<figcaption class="mt-3 text-[13px] text-muted-foreground">Move across the frame: the veil burns away wherever you go.</figcaption>
	</figure>

	<article class="mx-auto max-w-[680px] px-4 pt-16 pb-24 sm:px-0 sm:pt-20">
		<p class="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-foreground">Most creative AI tools are built by people who don’t make things, for people who want to feel like they do.</p>
		<div class="mt-10 space-y-6 text-[19px] leading-[1.6] text-foreground">
			{#each body as p (p)}<p>{p}</p>{/each}
		</div>
		<footer class="mt-12 flex items-center gap-4 border-t border-border pt-8">
			<span class="grid size-12 place-items-center rounded-full bg-primary text-lg font-medium text-primary-foreground">NC</span>
			<span>
				<span class="block text-lg font-medium text-foreground">Noor Castell</span>
				<span class="block text-[14px] text-muted-foreground">Founder (a fictional one, for this study)</span>
			</span>
		</footer>
	</article>

	<ReadMore items={posts.slice(0, 4)} class="pb-24" />

	<SiteFooter cta={null} />
</div>
