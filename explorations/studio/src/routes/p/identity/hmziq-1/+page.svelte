<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import Headline from '$moves/identity/signature-headline.svelte';
	import Sq from '$moves/identity/sq.svelte';
	import SpotOnePerson from '$moves/identity/spot-one-person.svelte';
	import SpotFourSurfaces from '$moves/identity/spot-four-surfaces.svelte';
	import SpotFiveRounds from '$moves/identity/spot-five-rounds.svelte';
	import SpotLabBench from '$moves/identity/spot-lab-bench.svelte';
	import FingerprintCard from '$moves/identity/fingerprint-card.svelte';
	import HatchField from '$moves/identity/hatch-field.svelte';
	import SignOff from '$moves/identity/sign-off.svelte';
	import SpotLive from '$moves/identity/spot-live.svelte';
	import { projects } from '$moves/identity/projects';

	const surfaces = [
		{ name: 'Phones', line: 'Apps you carry. Built for thumbs, bad signal and small screens.', where: 'oxlabs studio' },
		{ name: 'Computers', line: 'Native desktop apps on GPUI. Fast, quiet and keyboard-first.', where: 'gpui-starter · gpui-query' },
		{ name: 'The web', line: 'Sites and tools that load fast and read well without asking for much.', where: 'hmziq.rs · oxlabs studio' },
		{ name: 'The terminal', line: 'Command-line tools that do one job and get out of the way.', where: 'claude-multi · freeoxide' }
	];

	const rounds = [
		{ q: 'Does it work?', a: 'Every path, clicked through by hand.' },
		{ q: 'Does it read?', a: 'Words a person understands, not jargon.' },
		{ q: 'Does it hold?', a: 'Tests, edge cases, a slow network.' },
		{ q: 'Is it finished?', a: 'Light, dark, small screens, keyboard.' },
		{ q: 'Would I use it?', a: 'One last pass as a stranger would.' }
	];

	const columns = [
		{ title: 'Projects', links: projects.map((p) => ({ label: p.name, href: '#/p/identity/hmziq-1' })) },
		{ title: 'Read', links: [{ label: 'Writing', href: '#/p/identity/hmziq-1' }, { label: 'Labs', href: '#/p/identity/hmziq-1' }, { label: 'How I work', href: '#/p/identity/hmziq-1' }] },
		{ title: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/hmziqrs' }, { label: 'Email', href: 'mailto:hello@hmziq.rs' }] }
	];

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
</script>

<svelte:head><title>hmziq — apps for phones, computers, the web and the terminal</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<header class="{wrap} flex h-20 items-center justify-between">
		<a href="#/p/identity/hmziq-1" class="text-2xl text-foreground"><Wordmark name="hmziq" /></a>
		<nav class="hidden items-center gap-8 text-[15px] md:flex">
			<a href="#work" class="text-foreground">Work</a>
			<a href="#surfaces" class="text-foreground">Surfaces</a>
			<a href="#rounds" class="text-foreground">How I work</a>
			<a href="#labs" class="text-foreground">Labs</a>
		</nav>
		<Button size="sm" href="mailto:hello@hmziq.rs">Say hello</Button>
	</header>

	<main class="flex flex-col gap-28 pb-10 md:gap-40">
		<section class="{wrap} flex flex-col gap-12 pt-10 md:pt-16">
			<span class="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase"><Sq size={0.9} gap={0} /> hmziq.rs · a one-person studio</span>
			<Headline size="hero" class="max-w-[13ch] lg:max-w-[16ch]">I build apps for phones, computers, the web <em>and the terminal</em></Headline>
			<div class="grid items-center gap-10 md:grid-cols-[1.25fr_1fr] lg:gap-20">
				<figure class="m-0 flex flex-col gap-3">
					<SpotLive><SpotOnePerson /></SpotLive>
					<figcaption class="font-mono text-xs tracking-wider text-muted-foreground uppercase">Fig. 1 — One person, all of it</figcaption>
				</figure>
				<div class="flex flex-col gap-8">
					<p class="m-0 text-[clamp(1.25rem,1.9vw,1.6rem)] leading-snug text-foreground">
						The design, the code, the tests and the five rounds of review. Every project on this site was made start to finish by one person<Sq size={0.32} />
					</p>
					<div class="flex flex-wrap gap-3">
						<Button size="lg" href="#work">See the work <ArrowRight class="lucide" /></Button>
						<Button size="lg" variant="outline" href="#rounds">How I work</Button>
					</div>
					<dl class="m-0 grid grid-cols-3 gap-4 border-t pt-6">
						<div><dt class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Projects</dt><dd class="m-0 mt-1 font-bricolage text-4xl font-semibold tracking-tight">05</dd></div>
						<div><dt class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Surfaces</dt><dd class="m-0 mt-1 font-bricolage text-4xl font-semibold tracking-tight">04</dd></div>
						<div><dt class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Reviews</dt><dd class="m-0 mt-1 font-bricolage text-4xl font-semibold tracking-tight">×5</dd></div>
					</dl>
				</div>
			</div>
		</section>

		<section id="surfaces" class="{wrap} flex flex-col gap-12">
			<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<Headline as="h2" size="section" class="max-w-[14ch]">One way of working, <em>four</em> surfaces</Headline>
				<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">Fig. 2 — Same rings on every screen</span>
			</div>
			<SpotLive><SpotFourSurfaces /></SpotLive>
			<div class="grid gap-x-8 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
				{#each surfaces as s (s.name)}
					<div class="flex flex-col gap-3">
						<h3 class="m-0 font-bricolage text-3xl font-semibold tracking-[-0.03em]">{s.name}<Sq size={0.3} /></h3>
						<p class="m-0 text-lg leading-snug text-foreground/90">{s.line}</p>
						<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">{s.where}</span>
					</div>
				{/each}
			</div>
		</section>

		<section id="work" class="{wrap} flex flex-col gap-12">
			<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<Headline as="h2" size="section">The <em>work</em></Headline>
				<p class="m-0 max-w-md text-lg leading-snug text-foreground/90">Each project wears a fingerprint drawn from its own name. Move across a card and its rings turn like a lock.</p>
			</div>
			<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as p, i (p.name)}
					<FingerprintCard variant="tile" index={i + 1} {...p} />
				{/each}
				<a id="labs" href="#/p/identity/hmziq-1" class="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-6">
					<HatchField from="top-right" tone="patina" strength={0.35} />
					<SpotLive class="relative mx-auto w-3/4 max-w-[16rem] pt-4"><SpotLabBench /></SpotLive>
					<div class="relative flex flex-col gap-3">
						<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">06 · Writing &amp; labs</span>
						<h3 class="m-0 font-bricolage text-[2.5rem] leading-none font-semibold tracking-[-0.04em]">The <em class="font-fraunces font-normal">workbench</em><Sq size={0.3} /></h3>
						<p class="m-0 text-lg leading-snug text-foreground/90">Notes on building alone, and experiments that might grow up.</p>
					</div>
				</a>
			</div>
		</section>

		<section id="rounds" class="{wrap} flex flex-col gap-12">
			<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<Headline as="h2" size="section" class="max-w-[16ch]">Five review rounds before <em>anything</em> ships</Headline>
				<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">Fig. 3 — Move across it to push the sheet through</span>
			</div>
			<div class="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"><SpotFiveRounds class="min-w-[560px]" /></div>
			<ol class="m-0 grid list-none gap-8 border-t p-0 pt-10 sm:grid-cols-2 lg:grid-cols-5">
				{#each rounds as r, i (r.q)}
					<li class="flex flex-col gap-2">
						<span class="font-mono text-xs tracking-wider text-muted-foreground">0{i + 1}</span>
						<span class="text-xl font-medium tracking-tight text-foreground">{r.q}</span>
						<span class="text-base leading-snug text-foreground/80">{r.a}</span>
					</li>
				{/each}
			</ol>
		</section>
	</main>

	<SignOff {columns} />
</div>
