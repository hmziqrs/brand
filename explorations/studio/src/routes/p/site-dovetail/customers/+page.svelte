<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import OxideQuoteCard from '$moves/dovetail/oxide-quote-card.svelte';
	import StatSlab from '$moves/dovetail/stat-slab.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import TypedQuoteHero from '$moves/site-dovetail/typed-quote-hero.svelte';
	import StoryGrid from '$moves/site-dovetail/story-grid.svelte';
	import { stories, industries } from '$moves/site-dovetail/stories';
	import { to } from '$moves/site-dovetail/site';

	const quotes = [
		{ text: 'Please don’t ever take this tool off me.', who: 'Research lead, a fintech' },
		{ text: 'It answers in a minute what used to take a quarter.', who: 'VP product, a marketplace' },
		{ text: 'Every argument now ends with a clip.', who: 'Design director, a SaaS company' }
	];

	const segments = [
		{ name: 'Global cloud software leader', industry: 'Technology', title: 'How one of the largest software companies built a shared customer context layer' },
		{ name: 'Life-sciences enterprise', industry: 'Health', title: 'How a life-sciences enterprise turned two years of research into on-demand answers' },
		{ name: 'Global financial group', industry: 'Finance', title: 'How a financial group cleared a strict AI review and built its intelligence layer' },
		{ name: 'Fleet technology provider', industry: 'Technology', title: 'How a fleet-tech company gave every leader direct access to customer evidence' },
		{ name: 'Furniture retailer', industry: 'Consumer', title: 'How a global retailer freed its research team and built an insight engine' },
		{ name: 'Industrial technology group', industry: 'Manufacturing', title: 'How an industrial group got decision-makers acting on customer intelligence' }
	];

	const featured = [
		{ quote: 'I search a strategic initiative or a single keyword and the context assembles itself. That speed changes how planning meetings go.', name: 'Ola Brennan', role: 'Head of UX research, a workflow platform — invented example' },
		{ quote: 'Our dealers’ calls, our app reviews and our warranty claims finally sit in one place. We stopped arguing about whose data was right.', name: 'Jonas Albrecht', role: 'Segment specialist, a farm-machinery maker — invented example' },
		{ quote: 'The first time a stakeholder pulled up a clip mid-meeting without asking us, I knew research had changed.', name: 'Imogen Sato', role: 'Head of research ops, a regional bank — invented example' }
	];
	let f = $state(0);
</script>

<svelte:head><title>Customers — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="customers" />

	<section class="relative isolate overflow-hidden pt-20 pb-16 sm:pt-28">
		<RustGridField cell={36} fade="bottom" stain="--foreground" class="-z-10 opacity-70" />
		<TypedQuoteHero {quotes} />
	</section>

	<section class="mx-auto flex w-full max-w-[82rem] flex-wrap items-end justify-between gap-6 px-4 pt-10 pb-10 sm:px-6">
		<AccentHeadline size="md" tint="primary">Their words. We just kept the <em>receipts</em>.</AccentHeadline>
		<span aria-hidden="true" class="flex items-center gap-1.5"><span class="size-2 bg-[color-mix(in_oklab,var(--foreground)_30%,transparent)]"></span><span class="size-2 bg-[color-mix(in_oklab,var(--foreground)_55%,transparent)]"></span><span class="size-3 bg-primary"></span></span>
	</section>

	<StoryGrid {stories} {segments} {industries} />

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32">
		<div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
			{#key f}
				<OxideQuoteCard texture="rain" quote={featured[f].quote} name={featured[f].name} role={featured[f].role} class="min-h-[26rem]" />
			{/key}
			<div class="grid gap-4">
				<StatSlab value="236%" label="Return in six months" detail="Example figure for this study." face="dot" />
				<StatSlab value="30%" label="More team capacity" detail="Example figure for this study." face="dot" tone="ink" arrow={false} />
			</div>
		</div>
		<div class="mt-5 flex items-center gap-3">
			<Button variant="outline" size="icon" aria-label="Previous quote" onclick={() => (f = (f + featured.length - 1) % featured.length)}><ArrowLeft class="lucide" /></Button>
			<Button variant="outline" size="icon" aria-label="Next quote" onclick={() => (f = (f + 1) % featured.length)}><ArrowRight class="lucide" /></Button>
			<span class="ml-2 font-mono text-[0.75rem] tracking-[0.12em] text-foreground">{String(f + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
		</div>
	</section>

	<ProofCrowd lines={['Join', 'the', 'ones', 'who', 'know']} accent={4}>
		{#snippet after()}
			<div class="flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('pricing')} class="bg-background">Start free</Button>
			</div>
		{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
