<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import Layers from '@lucide/svelte/icons/layers';
	import Radar from '@lucide/svelte/icons/radar';
	import Box from '@lucide/svelte/icons/box';
	import Users from '@lucide/svelte/icons/users';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import OxideQuoteCard from '$moves/dovetail/oxide-quote-card.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import SourceStrip from '$moves/site-dovetail/source-strip.svelte';
	import DemoForm from '$moves/site-dovetail/demo-form.svelte';
	import ReportCover from '$moves/site-dovetail/report-cover.svelte';
	import { to } from '$moves/site-dovetail/site';

	const points = [
		{ title: 'A proper tour', body: 'We answer your questions and go deep on the parts your team will use most.' },
		{ title: 'See it working', body: 'Watch your kind of feedback, insight and data come together in one place.' },
		{ title: 'AI doing the work', body: 'Live examples of always-on analysis, agents and automated workflows.' },
		{ title: 'Your own workspace', body: 'We set up a trial workspace so your team can test it on real data.' }
	];
	const stats = [
		{ v: '236%', l: 'return within six months' },
		{ v: '66%', l: 'faster to ship' },
		{ v: '30%', l: 'more team capacity' },
		{ v: '30h', l: 'saved per person, per week' }
	];
	const feats = [
		{ icon: Layers, title: 'End-to-end, without the effort', body: 'Feedback, interviews, calls, surveys and reports assembled automatically, so the team agrees on what matters.' },
		{ icon: Radar, title: 'From signals to strategy', body: 'Always-on analysis that learns your business and surfaces insight tailored to each team.' },
		{ icon: Box, title: 'From insight to action', body: 'Agents turn intelligence into outcomes: specs, VoC reports, highlight reels and automated workflows.' },
		{ icon: Users, title: 'One truth for every team', body: 'Product, CX and leadership all work from the same source of customer evidence.' },
		{ icon: TrendingUp, title: 'Impact you can measure', body: 'Track faster decisions and fewer re-runs of the same research. (Figures on this page are examples.)' }
	];
</script>

<svelte:head><title>Book a demo — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="contact" />

	<section class="relative isolate">
		<RustGridField cell={40} fade="bottom" stain="--foreground" class="bottom-auto -z-10 h-[16rem] opacity-70" />
		<div class="mx-auto grid w-full max-w-[82rem] gap-12 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
			<div class="lg:sticky lg:top-24 lg:self-start">
				<MonoChip mark="square">Talk to sales</MonoChip>
				<AccentHeadline as="h1" size="lg" tint="primary" class="mt-6 max-w-[11ch]">Put your feedback to <em>work</em></AccentHeadline>
				<p class="mt-7 max-w-[32rem] text-[1.2rem] leading-[1.5] text-foreground">Book a demo and we will show you how scattered interviews, surveys, tickets and reports come together in one place — analyzed by AI and turned into actions that keep teams moving.</p>
				<ul class="mt-10 space-y-6">
					{#each points as p (p.title)}
						<li class="flex gap-4">
							<span class="mt-1.5 size-2.5 shrink-0 bg-primary"></span>
							<span><span class="block text-[1.1rem] font-medium text-foreground">{p.title}</span><span class="mt-1 block text-[1rem] leading-relaxed text-foreground/85">{p.body}</span></span>
						</li>
					{/each}
				</ul>
			</div>
			<DemoForm />
		</div>
	</section>

	<SourceStrip class="pb-24" />

	<section class="mx-auto grid w-full max-w-[82rem] items-center gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:gap-20">
		<div>
			<AccentHeadline size="lg" class="max-w-[12ch]">The economics, <em>measured</em></AccentHeadline>
			<p class="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed text-foreground">Ask sales for the full impact study. Organizations modelled in it saw returns like these — example figures for this design study.</p>
			<dl class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
				{#each stats as s (s.l)}
					<div class="border-t border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] pt-4">
						<dt class="font-dot text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-extrabold text-foreground">{s.v}</dt>
						<dd class="mt-2 text-[0.95rem] text-foreground/85">{s.l}</dd>
					</div>
				{/each}
			</dl>
			<Button size="lg" href={to('contact')} class="mt-10">Get the study</Button>
		</div>
		<ReportCover />
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6">
		<AccentHeadline size="lg">See the platform <em>in action</em></AccentHeadline>
		<div class="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
			{#each feats as f (f.title)}
				<div>
					<span class="grid size-12 place-items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] text-foreground"><f.icon class="lucide size-5" /></span>
					<h3 class="mt-5 text-[1.2rem] font-medium tracking-[-0.015em] text-foreground">{f.title}</h3>
					<p class="mt-2 max-w-[24rem] text-[1rem] leading-relaxed text-foreground/85">{f.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6">
		<OxideQuoteCard texture="shader" preset="oxide-chalk" quote="Insight from five countries now lives in one place. That alone stopped us losing — and paying twice for — what we already knew about customers." name="Priya Okafor" role="Senior UX designer, a kitchen-appliance brand — invented example" class="min-h-[26rem]" />
	</section>

	<ProofCrowd lines={['See', 'it', 'on', 'your', 'data']} accent={4}>
		{#snippet after()}<Button size="lg" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Book a demo</Button>{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
