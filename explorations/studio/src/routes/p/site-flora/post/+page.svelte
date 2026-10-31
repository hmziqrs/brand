<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ReadingProgress from '$moves/content/reading-progress.svelte';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import CanvasBoard from '$moves/site-flora/canvas-board.svelte';
	import ReadMore from '$moves/site-flora/read-more.svelte';
	import { brand, posts, to } from '$moves/site-flora/site';

	let article: HTMLElement | undefined = $state();
</script>

<svelte:head><title>How Northyard keeps a brand moving after hand-off — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav />
	<ReadingProgress target={article} minutes={5} class="z-50" />

	<header class="mx-auto max-w-[1000px] px-4 pt-16 text-center sm:px-8 sm:pt-24">
		<p class="text-[14px] text-muted-foreground">Jul 1, 2026 · Inspiration</p>
		<h1 class="mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-medium tracking-[-0.045em] text-foreground">How Northyard keeps a brand moving after hand-off</h1>
		<p class="mt-6 inline-flex text-lg"><Wordmark name={brand} /></p>
	</header>

	<div class="mx-auto mt-12 max-w-[1000px] px-4 sm:px-8">
		<CanvasBoard
			width={960}
			height={440}
			nodes={[
				{ id: 'b', kind: 'prompt', x: 30, y: 60, w: 200, title: 'Brand extension', text: 'Studio voice, two colour rules, one mark. Draft every touchpoint.' },
				{ id: 'm', kind: 'image', x: 40, y: 230, w: 160, title: 'Mark', preset: 'black-ice', aspect: 'aspect-square' },
				{ id: 'g', kind: 'grid', x: 330, y: 40, w: 240, title: 'Identity boards', presets: ['terrazzo', 'copper-sweep', 'halftone-print', 'creased-paper'] },
				{ id: 'p', kind: 'palette', x: 340, y: 320, w: 200, title: 'Palette' },
				{ id: 't', kind: 'image', x: 660, y: 30, w: 170, title: 'Shirt mockup', preset: 'woven-linen', aspect: 'aspect-[4/5]' },
				{ id: 'c', kind: 'image', x: 680, y: 290, w: 240, title: 'Tarot set ×22', preset: 'etched-silk', aspect: 'aspect-[16/9]' }
			]}
			edges={[
				['b', 'g'],
				['m', 'g'],
				['m', 'p'],
				['g', 't'],
				['g', 'c']
			]}
			cursors={[
				{ name: 'Ines', tone: 'pink', x: 590, y: 240 },
				{ name: 'Theo', tone: 'teal', x: 250, y: 380 }
			]}
		/>
		<p class="mt-3 text-[13px] text-muted-foreground">An illustrative board. Northyard Studio and everyone quoted here are fictional.</p>
	</div>

	<article bind:this={article} class="mx-auto max-w-[680px] px-4 pt-14 pb-20 text-[19px] leading-[1.65] text-foreground sm:px-0">
		<p class="text-[clamp(1.4rem,2.4vw,1.75rem)] leading-[1.3] font-medium tracking-[-0.015em]">Most studios treat an identity as something you finish. Design the system, write the guidelines, hand it over, done. Northyard thinks that’s the wrong shape for the job now. An identity has to keep moving long after hand-off, because a studio that builds fixed things for a moving world ends up behind its own work.</p>
		<p class="mt-6">Northyard is a small network of studios across three time zones, mostly brand and packaging. What they really make, they’ll tell you, is meaning: brands that hold up, feel current, and are still worth caring about in year five.</p>

		<h2 class="mt-14 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-medium tracking-[-0.025em]">Playbooks as the working method</h2>
		<p class="mt-5">The team’s habit is to see the finished thing as early as they can. That’s where playbooks come in: saved workflows that carry the team’s own taste and rules. Paired with Northyard’s way of building brands, they let the studio get a believable mockup of an idea in front of people within the hour.</p>
		<p class="mt-5">“It tells us much sooner whether an idea lives in the right neighbourhood for the brand,” says Ines, a fictional design lead. “And it lets us make bigger moves faster.”</p>

		<h2 class="mt-14 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-medium tracking-[-0.025em]">Two directions, both taken seriously</h2>
		<p class="mt-5">The question Theo, a senior designer, keeps coming back to is how to give every direction a fair hearing. A brief usually splits the room into two very different routes, and each one deserves to be explored and mocked up properly.</p>
		<p class="mt-5">So the team built a brand-extension playbook. Feed it the brief and the mark, and it drafts logo options, palettes, layouts, headlines, patterns and even shirt mockups in a few seconds, for both routes side by side.</p>

		<figure class="my-12 rounded-3xl bg-primary p-8 text-primary-foreground sm:-mx-16 sm:p-12">
			<blockquote class="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.025em]">“What we hand a client is going to change. It won’t be a PDF of rules. It’ll be the thing that keeps making the work.”</blockquote>
			<figcaption class="mt-6 font-mono text-[12px] tracking-[0.14em] uppercase">Northyard partner · fictional</figcaption>
		</figure>

		<p>From there the playbook stopped being a quick exploration tool and became a durable part of the job. After the identity work, the team built a tarot-card generator that captured the studio’s own personality, twenty-two cards that could only have come from them.</p>

		<h2 class="mt-14 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight font-medium tracking-[-0.025em]">What a hand-off becomes</h2>
		<p class="mt-5">An identity is a living thing that has to be looked after. At Northyard, playbooks are now part of the deliverable: a client gets the system and the tools that keep it consistent, with the reasoning built in.</p>
		<p class="mt-5">The canvas is where that system gets made, deployed, checked and evolved, in the same place, by the same people.</p>

		<div class="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
			<p class="text-lg font-medium">Try the brand-extension playbook on your own brief.</p>
			<Button href={to('techniques')} class="rounded-full px-5">Open playbooks <ArrowRight class="lucide" /></Button>
		</div>
	</article>

	<ReadMore items={posts.slice(1, 5)} class="pb-24" />

	<SiteFooter cta={null} />
</div>
