<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import PosterStack from '$moves/identity/poster-stack.svelte';
	import Sq from '$moves/identity/sq.svelte';
	import HatchField from '$moves/identity/hatch-field.svelte';
	import OxideSlab from '$moves/identity/oxide-slab.svelte';
	import SpotOnePerson from '$moves/identity/spot-one-person.svelte';
	import FingerprintCard from '$moves/identity/fingerprint-card.svelte';
	import SignOff from '$moves/identity/sign-off.svelte';
	import { projects, extras } from '$moves/identity/projects';

	const facts = ['05 projects', '04 surfaces', '05 review rounds', '01 person', '00 templates'];
	const rounds = [
		{ q: 'does it work?', a: 'Every path, clicked through by hand.' },
		{ q: 'does it read?', a: 'Words a person understands, not jargon.' },
		{ q: 'does it hold?', a: 'Tests, edge cases, a slow network.' },
		{ q: 'is it finished?', a: 'Light, dark, small screens, keyboard.' },
		{ q: 'would I use it?', a: 'One last pass, as a stranger would.' }
	];
	const wrap = 'mx-auto w-full max-w-[1440px] px-4 sm:px-8';
</script>

<svelte:head><title>hmziq — I build apps</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<header class="{wrap} flex h-14 items-center justify-between gap-4 border-b font-mono text-xs tracking-[0.14em] uppercase">
		<a href="#/p/identity/hmziq-2" class="font-sans text-lg font-semibold tracking-[-0.02em] normal-case">hmziq<Sq /></a>
		<span class="hidden text-muted-foreground md:block">phones <Sq size={0.8} gap={0.4} class="mr-[0.4em]" /> computers <Sq size={0.8} gap={0.4} class="mr-[0.4em]" /> web <Sq size={0.8} gap={0.4} class="mr-[0.4em]" /> terminal</span>
		<a href="mailto:hello@hmziq.rs" class="text-foreground">hello@hmziq.rs</a>
	</header>

	<section class="relative">
		<HatchField from="bottom-right" tone="rust" strength={0.4} spacing={8} />
		<div class="{wrap} relative flex flex-col gap-10 pt-10 pb-14 md:pt-14">
			<PosterStack
				lines={[
					{ text: 'I build apps■', fit: 6.6 },
					{ text: 'for phones, computers,', face: 'serif', fit: 9.6 },
					{ text: 'the web & the', tone: 'hatch', fit: 7.05 },
					{ text: 'terminal■', tone: 'oxide', fit: 5.4 }
				]}
			/>
			<div class="flex flex-col justify-between gap-8 border-t pt-8 md:flex-row md:items-end">
				<p class="m-0 max-w-xl text-[clamp(1.25rem,2vw,1.75rem)] leading-snug font-medium tracking-tight">
					One person. Design, code, tests and five rounds of review, start to finish, on every project<Sq size={0.3} />
				</p>
				<div class="flex flex-wrap gap-3">
					<Button size="lg" href="#work">The work <ArrowRight class="lucide" /></Button>
					<Button size="lg" variant="outline" href="#rounds">The rounds</Button>
				</div>
			</div>
		</div>
	</section>

	<div class="overflow-hidden border-y py-4">
		<div class="flex w-max items-center gap-6 px-4 font-bricolage text-2xl font-bold tracking-[-0.03em] whitespace-nowrap uppercase sm:px-8 md:text-4xl">
			{#each [...facts, ...facts] as f, i (i)}<span>{f}</span><Sq size={0.5} gap={0} />{/each}
		</div>
	</div>

	<div class="py-24 md:py-32">
		<OxideSlab eyebrow="Fig. 1 — the whole studio" mark={false}>
			<PosterStack as="h2" lines={[{ text: 'One person■', fit: 6.4 }, { text: 'all of it.', face: 'serif', fit: 4.1 }]} />
			<p class="m-0 max-w-md text-xl leading-snug font-medium">No agency, no handoffs. The person who designs it writes it, tests it, and answers the email when it breaks.</p>
			{#snippet aside()}
				<SpotOnePerson fill="color-mix(in oklab, var(--on-orange) 55%, var(--orange))" />
			{/snippet}
		</OxideSlab>
	</div>

	<section id="work" class="{wrap} flex flex-col gap-10">
		<div class="flex items-end justify-between gap-6 border-b pb-6">
			<PosterStack as="h2" class="max-w-[62rem]" lines={[{ text: 'The work■', fit: 5.3 }]} />
			<span class="shrink-0 font-bricolage text-[clamp(3rem,9vw,8rem)] leading-[0.8] font-bold tracking-[-0.05em] text-[var(--mark-square)]">05</span>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			{#each projects as p, i (p.name)}
				<FingerprintCard variant="poster" index={i + 1} {...p} class={i === 0 ? 'md:col-span-2 md:min-h-[36rem]' : ''} />
			{/each}
			<div class="flex flex-col gap-6 rounded-2xl border p-6 md:col-span-2">
				<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">06 / also here</span>
				<div class="grid gap-x-10 md:grid-cols-2">
					{#each extras as e (e.name)}
						<a href={e.href} class="group flex items-center justify-between border-t py-5">
							<span class="font-bricolage text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-bold tracking-[-0.05em] uppercase group-hover:text-[var(--mark-square)]">{e.name}<Sq size={0.32} /></span>
							<ArrowRight class="lucide size-8" />
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section id="rounds" class="{wrap} flex flex-col pt-28 md:pt-40">
		<PosterStack as="h2" lines={[{ text: 'Five rounds■', fit: 7 }, { text: 'before anything ships', face: 'serif', fit: 8.9, align: 'right' }]} />
		<ol class="m-0 mt-12 list-none p-0">
			{#each rounds as r, i (r.q)}
				<li class="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t py-6 md:grid-cols-[14rem_1fr_minmax(0,22rem)] md:gap-x-10 md:py-8">
					<span class="font-bricolage text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.8] font-bold tracking-[-0.06em] {i === 4 ? 'text-[var(--mark-square)]' : 'text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]'}">0{i + 1}</span>
					<span class="font-fraunces text-[clamp(2rem,4.6vw,4rem)] leading-none font-light tracking-[-0.03em] italic">{r.q}</span>
					<span class="col-start-2 mt-3 text-lg leading-snug text-foreground/90 md:col-start-3 md:mt-0">{r.a}</span>
				</li>
			{/each}
		</ol>
	</section>

	<div class="pt-24 md:pt-32">
		<SignOff tagline="Phones, computers, the web and the terminal. One person, all of it." />
	</div>
</div>
