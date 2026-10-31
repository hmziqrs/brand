<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import FloatObjectsHero from '$moves/site-dovetail/float-objects-hero.svelte';
	import RingGlobe from '$moves/site-dovetail/ring-globe.svelte';
	import RoleBoard from '$moves/site-dovetail/role-board.svelte';
	import PeopleList from '$moves/site-dovetail/people-list.svelte';
	import NumberedPerks from '$moves/site-dovetail/numbered-perks.svelte';
	import MaterialReel from '$moves/site-dovetail/material-reel.svelte';
	import ValuesRail from '$moves/site-dovetail/values-rail.svelte';
	import HireSteps from '$moves/site-dovetail/hire-steps.svelte';
	import FaqSplit from '$moves/site-dovetail/faq-split.svelte';
	import { to } from '$moves/site-dovetail/site';

	const roles = [
		{ title: 'Account Executive, Enterprise', team: 'Sales & Success', place: 'US remote' },
		{ title: 'Sales Development Representative', team: 'Sales & Success', place: 'US remote' },
		{ title: 'Demand Generation Lead', team: 'Marketing', place: 'Melbourne' },
		{ title: 'Demand Generation Lead', team: 'Marketing', place: 'US remote' },
		{ title: 'Lifecycle Marketer', team: 'Marketing', place: 'Melbourne' },
		{ title: 'Senior Web Engineer', team: 'Marketing', place: 'Melbourne' },
		{ title: 'Cloud Support Engineer', team: 'Engineering', place: 'Melbourne' },
		{ title: 'Security Engineering Lead', team: 'Engineering', place: 'Melbourne' },
		{ title: 'Staff Engineer, Ingestion', team: 'Engineering', place: 'US remote' },
		{ title: 'Senior Product Designer', team: 'Design & Research', place: 'Melbourne' }
	];

	const people = [
		{ name: 'Noor', role: 'Design research manager', preset: 'copper-sweep', story: ['What surprised me first was how short the distance is between a customer call and an engineer’s editor. I can sit in an interview in the morning and watch the fix land by Thursday.', 'Engineers here want the problem, not just the ticket. Small changes ship constantly and go straight back to the customer for a reaction.', 'That pace comes from sitting close together — demos, crits, the Friday show-and-tell. Those moments keep the work fast and human.'] },
		{ name: 'Callum', role: 'Software engineer', preset: 'brushed-alloy', story: ['I owned dark mode, which turned out to be a much deeper job than it sounded: it needed a rebuild of how colour flows through the whole app.', 'We ended up shipping both themes from scratch plus a token system that makes the next change a one-line edit.'] },
		{ name: 'Ines', role: 'Creative director', preset: 'lava-fissures', story: ['There is an energy here that is hard to fake. The problems are big, the room is small and nobody pretends to have all the answers.', 'We build, test and throw away ideas inside a week. Low ego, open conversations, and people who genuinely care about the craft.'] },
		{ name: 'Mateo', role: 'Software engineer', preset: 'sediment', story: ['I prototyped contextual chat on a hack day. Six weeks later it was one of the most-used surfaces in the product.', 'That is the ownership here: if you can show it works, you get to finish it.'] }
	];

	const perks = [
		{ title: 'Equity for everyone', body: 'A competitive salary plus stock options, so every builder shares in the long-term outcome.' },
		{ title: 'How we work', body: 'Melbourne works in person for speed; the US team is remote-first with regular meetups.' },
		{ title: 'Time to recharge', body: 'Four weeks of leave, extra company-wide rest days and flexible public holidays.' },
		{ title: 'Built-in connection', body: 'Clubs, team outings and proper celebrations when something big ships.' },
		{ title: 'Four weeks anywhere', body: 'Work from anywhere in the world for up to four weeks a year, in one block or several.' },
		{ title: 'Learning budget', body: 'An annual allowance for courses, books, conferences or wellbeing — your call.' },
		{ title: 'Parental leave', body: 'Twenty weeks for primary carers, twelve for secondary carers, and a gentle return.' },
		{ title: 'Four-year sabbatical', body: 'After four years, an extra four weeks off to reset before the next chapter.' }
	];

	const values = [
		{ title: 'Customers first', body: 'Understand the problem before solving it. Earn trust through candour and results; watch competitors, obsess over customers.', preset: 'oxide-bloom' },
		{ title: 'Stay humble', body: 'Be kind, direct and curious. Remember the person behind the work and celebrate wins together.', preset: 'woven-linen' },
		{ title: 'Do the thing', body: 'Keep the pace up with sensible risks. Only agonize over decisions you can’t undo. Say it, then do it.', preset: 'hammered-copper' },
		{ title: 'If we ship it, we nail it', body: 'First impressions count. Sweat the details everywhere a customer touches us — product, support, even invoices.', preset: 'brushed-alloy' },
		{ title: 'Open by default', body: 'Assume good intent and share context freely. When you don’t know, ask; when you do, write it down.', preset: 'mica-flakes' }
	];

	const hire = [
		{ title: 'Intro call', body: 'A conversation with a recruiter about your experience, what you want next and why this problem.' },
		{ title: 'Craft session', body: 'A hands-on exercise or workshop for your role, briefed in advance so you can prepare properly.' },
		{ title: 'Values chat', body: 'A conversation about our five values and how they show up in the way you work with a team.' },
		{ title: 'Final round', body: 'Meet two senior leaders to talk about your goals, the product vision and the impact you would have.' }
	];

	const faqs = [
		{ q: 'Where are the offices?', a: 'Our headquarters is in Melbourne, with a small hub in New York. Some roles are fully remote in the US.' },
		{ q: 'What is the hybrid policy?', a: 'Melbourne teams are in the office four days a week, with flexibility when life needs it. US remote roles meet in person each quarter.' },
		{ q: 'What kind of team are you building?', a: 'Curious, proactive people who take ownership and enjoy hard problems in a fast-moving place.' },
		{ q: 'What does building with AI mean here?', a: 'AI is part of how everyone works, not only a feature we sell. Every team has access to current coding and research assistants.' },
		{ q: 'Do engineers talk to customers?', a: 'Yes, regularly. The people building the product sit in on calls and read the feedback themselves.' },
		{ q: 'How are product decisions made?', a: 'With evidence. Teams bring the customer clips and the numbers, and the person closest to the problem makes the call.' }
	];
</script>

<svelte:head><title>Careers — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="about" />

	<FloatObjectsHero class="min-h-[min(52rem,92svh)]">
		<div class="mx-auto flex min-h-[min(52rem,92svh)] w-full max-w-[82rem] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
			<MonoChip mark="square">Careers at Contextline</MonoChip>
			<AccentHeadline as="h1" size="mega" tint="primary" class="mt-8 max-w-[11ch] [text-shadow:0_2px_40px_var(--background)]">Help companies <em>actually</em> hear customers</AccentHeadline>
			<Button size="lg" onclick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })} class="mt-10">See open roles <ArrowDown class="lucide" /></Button>
		</div>
	</FloatObjectsHero>

	<section class="mx-auto grid w-full max-w-[82rem] gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:gap-20">
		<div class="lg:sticky lg:top-24 lg:self-start"><RingGlobe points={120} seed={4} class="mx-auto max-w-[36rem]" /></div>
		<div class="space-y-28 sm:space-y-40">
			<div>
				<AccentHeadline size="md">We build the customer <em>intelligence</em> layer used by teams who <InlineGlyph kind="square" preset="oxide-bloom" /> refuse to guess</AccentHeadline>
				<p class="mt-6 max-w-[36rem] text-[1.15rem] leading-relaxed text-foreground">We turn messy, unstructured conversations into clear intelligence for ambitious companies. It is a deep problem: large-scale data systems, applied AI and product design that has to feel effortless.</p>
			</div>
			<div>
				<AccentHeadline size="md">AI <InlineGlyph kind="rings" /> was our core <em>long</em> before it was a trend</AccentHeadline>
				<p class="mt-6 max-w-[36rem] text-[1.15rem] leading-relaxed text-foreground">We were training our own models years before chat assistants went mainstream, and we keep pushing what is possible by building AI into both the product and the way we work.</p>
			</div>
			<div>
				<AccentHeadline size="md">One problem, every team: helping companies <em>understand</em> <InlineGlyph kind="tile" preset="copper-sweep" /> their customers.</AccentHeadline>
			</div>
		</div>
	</section>

	<section id="roles" class="mx-auto w-full max-w-[82rem] scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
		<AccentHeadline size="lg">Open <em>roles</em></AccentHeadline>
		<p class="mt-6 max-w-[44rem] text-[1.15rem] leading-relaxed text-foreground">We are building an ambitious team across Australia and the US, and the expectation is clear: you will be trusted with meaningful problems early and asked to own them end to end. There is no set path. If you thrive on autonomy, this is where you do your best work.</p>
		<RoleBoard {roles} class="mt-14" />
		<div class="mt-16 max-w-[34rem] rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] p-6">
			<p class="text-[1.15rem] font-medium text-foreground">Don’t see your role?</p>
			<p class="mt-2 text-[1rem] leading-relaxed text-foreground/85">If the right fit isn’t listed, it might not exist yet. Show us how you think and what you have built.</p>
			<a href={to('contact')} class="mt-4 inline-block text-[1rem] font-medium text-foreground underline underline-offset-4 hover:text-primary">Join the talent list</a>
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32">
		<AccentHeadline size="xl" class="mx-auto max-w-[14ch] text-center">Meet some of the <em>people</em> behind it</AccentHeadline>
		<PeopleList {people} class="mt-16" />
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32">
		<AccentHeadline size="lg">The whole <em>package</em></AccentHeadline>
		<p class="mt-6 max-w-[40rem] text-[1.15rem] leading-relaxed text-foreground">We set a high bar, so we give you what you need to clear it: support, flexibility and the tools for consistently great work.</p>
		<NumberedPerks {perks} class="mt-14" />
		<div class="mt-20 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-end">
			<MaterialReel preset="lava-fissures" label="Tour" aspect="aspect-[4/5]" caption="A walk round the Melbourne office with one of our engineers." />
			<div class="grid gap-10">
				<MaterialReel preset="copper-sweep" label="Year in review" caption="Looking back on the year: launches, offsites and one very long whiteboard." />
				<MaterialReel preset="mica-flakes" label="Ritual" caption="Build week, the five days a year everyone ships something new." />
			</div>
		</div>
	</section>

	<section class="py-24 sm:py-32">
		<div class="mx-auto w-full max-w-[82rem] px-4 sm:px-6">
			<AccentHeadline size="lg">Run on <em>values</em></AccentHeadline>
			<p class="mt-6 max-w-[42rem] text-[1.15rem] leading-relaxed text-foreground">Our values are not a poster; they are the standard. They shape how we argue, how we own things and how we get from a hard problem to a shipped answer.</p>
		</div>
		<ValuesRail {values} class="mt-14" />
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32">
		<AccentHeadline size="lg">How we <em>hire</em></AccentHeadline>
		<p class="mt-6 max-w-[40rem] text-[1.15rem] leading-relaxed text-foreground">Our process is built to see how you approach problems, work with others and operate day to day.</p>
		<HireSteps steps={hire} class="mt-14" />
	</section>

	<FaqSplit items={faqs} />

	<ProofCrowd lines={['Come', 'build', 'the', 'proof']} accent={3}>
		{#snippet after()}<Button size="lg" onclick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}>See open roles</Button>{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
