<script lang="ts">
	import Mark from '$brand/components/mark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Mail from '@lucide/svelte/icons/mail';
	import { family } from '@hmziq/brand-core/family';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import StatementHero from '$moves/content/statement-hero.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import OxideClipWord from '$moves/content/oxide-clip-word.svelte';
	import ProcessRail from '$moves/content/process-rail.svelte';
	import RingFingerprint from '$moves/content/ring-fingerprint.svelte';
	import MaterialSignoff from '$moves/content/material-signoff.svelte';

	const steps = [
		{ title: 'I write the structure by hand', body: 'Modules, public types and names are decided by a person before any code is generated.', who: 'Me, first' },
		{ title: 'I read it cold the next day', body: 'Fresh eyes on the whole diff. Unclear names and two-job functions go.', who: 'Me, a day later' },
		{ title: 'I install it like a stranger', body: 'A clean machine and the README, word for word. Every stumble becomes a docs fix.', who: 'Me, pretending' },
		{ title: 'Reviewers with one job each', body: 'Correctness, the public API, failure cases. Each reviewer, person or agent, gets one question.', who: 'People and agents' },
		{ title: 'The boring checklist', body: 'Small screens, contrast, reduced motion, errors that say how to fix them, a readable changelog.', who: 'Everyone, every time' }
	];

	const principles = [
		['Plain words', 'If someone who has never opened a terminal cannot follow a page, the page is wrong.'],
		['Finished before it ships', 'A small tool that works on the first try beats a big one that needs a patch tomorrow.'],
		['Free where it says so', 'The freeoxide tools are open source. Client work at oxlabs pays for them.'],
		['Written down', 'I work remotely and write everything down, so nobody waits on a meeting.']
	] as const;

	const work = family.map((f, i) => ({ ...f, n: i + 1 })).filter((f) => !['hmziq', 'blog'].includes(f.id));
</script>

<svelte:head><title>About · hmziq</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<ReadingHeader
		site="hmziq"
		links={[
			{ label: 'Work', href: '#/p/content/about-1' },
			{ label: 'Blog', href: '#/p/content/blog-index-1' },
			{ label: 'About', href: '#/p/content/about-1', current: true }
		]}
	/>

	<StatementHero preset="hammered-copper" seed="hmziq">
		{#snippet kicker()}
			<div class="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4 text-sm">
				<span class="font-medium">About</span>
				<span class="text-muted-foreground">hmziq · software, start to finish</span>
			</div>
		{/snippet}
		{#snippet statement()}
			<SerifMixHeadline text="I build apps for phones, computers, the web and _the terminal._" size="xl" class="max-w-[13ch]" />
		{/snippet}
		{#snippet lede()}
			<p>I’m hmziq. I design, write and ship software on my own and with a small team at oxlabs. Everything I release goes through the same five rounds of review, so it works the first time you open it.</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button size="lg" href="https://oxlabs.dev"><Mail class="lucide" />Start a project</Button>
				<Button size="lg" variant="outline" href="#/p/content/blog-index-1">Read the blog <ArrowRight class="lucide" /></Button>
			</div>
		{/snippet}
		{#snippet card()}
			<div class="flex items-center gap-3">
				<Mark symbol="Hq" size={44} />
				<div class="min-w-0 leading-tight">
					<p class="font-medium">hmziq</p>
					<p class="mt-0.5 text-sm text-muted-foreground">Taking on new projects</p>
				</div>
			</div>
		{/snippet}
	</StatementHero>

	<section class="border-y bg-[var(--band)]">
		<div class="mx-auto max-w-[82rem] px-4 py-20 sm:px-6 md:py-28">
			<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
				<SerifMixHeadline as="h2" text="Five reads before _anything_ ships." size="lg" class="max-w-[12ch]" />
				<p class="text-[1.25rem] leading-[1.5]">Each round looks for a different kind of mistake, and each is done by someone who was not in the room when the code was written.</p>
			</div>
			<ProcessRail {steps} featured={3} seed="hmziq-process" class="mt-14 md:mt-20" />
			<a href="#/p/content/post-1" class="mt-10 inline-flex items-center gap-2 text-[1.0625rem] font-medium text-foreground no-underline hover:text-primary">Read the long version <ArrowRight class="lucide size-4" /></a>
		</div>
	</section>

	<section class="mx-auto max-w-[82rem] px-4 pt-24 sm:px-6 md:pt-32">
		<div class="grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
			<div>
				<h2 class="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.04em]">What I <OxideClipWord text="make" class="font-serif font-normal italic tracking-[-0.01em] text-[1.1em]" /></h2>
				<p class="mt-6 max-w-[34ch] text-[1.1875rem] leading-[1.55]">Libraries, starters and tools under freeoxide, experiments at Labs, and client work under oxlabs. Each one has a number, like an element.</p>
			</div>
			<ul class="grid gap-3 sm:grid-cols-2">
				{#each work as w (w.id)}
					<li>
						<a href={w.href} class="group relative flex h-full min-h-[11rem] flex-col overflow-hidden rounded-2xl border p-5 no-underline transition-colors hover:border-foreground/35">
							<RingFingerprint seed={w.name} count={8} class="pointer-events-none absolute -top-10 -right-10 size-40 opacity-90" />
							<span class="font-mono text-xs text-muted-foreground">{String(w.n).padStart(2, '0')}</span>
							<span class="mt-auto flex items-center gap-2.5">
								<Mark symbol={w.symbol} size={28} />
								<span class="text-[1.375rem] font-medium tracking-[-0.02em] text-foreground group-hover:text-primary">{w.name}</span>
							</span>
							<span class="mt-1.5 text-[0.9375rem] text-foreground/85">{w.note}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="mx-auto max-w-[82rem] px-4 pt-24 sm:px-6 md:pt-32">
		<h2 class="text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.04em]">How I <span class="font-serif font-normal italic tracking-[-0.01em]">work</span></h2>
		<dl class="mt-12 grid border-t md:grid-cols-2">
			{#each principles as [t, d], i (t)}
				<div class="flex flex-col gap-3 border-b py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0">
					<dt class="flex items-baseline gap-4 text-[1.625rem] leading-tight font-medium tracking-[-0.025em]"><span class="font-serif text-[1.5rem] font-normal text-primary italic">{i + 1}</span>{t}</dt>
					<dd class="max-w-[44ch] pl-9 text-[1.125rem] leading-[1.55] text-foreground">{d}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<MaterialSignoff site="hmziq" preset="hammered-copper" />
</div>
