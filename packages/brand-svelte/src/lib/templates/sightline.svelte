<!-- Template 1 · Sightline, product analytics: centered hero with the app under it at full width, customers, a bento grid, set-up steps beside the code, privacy on a grey band, quotes, plans and questions. -->
<script lang="ts">
	import Bird from "@lucide/svelte/icons/bird";
	import Cloudy from "@lucide/svelte/icons/cloudy";
	import Hexagon from "@lucide/svelte/icons/hexagon";
	import Landmark from "@lucide/svelte/icons/landmark";
	import Leaf from "@lucide/svelte/icons/leaf";
	import Mountain from "@lucide/svelte/icons/mountain";
	import Waves from "@lucide/svelte/icons/waves";
	import { cn } from "$brand/utils.js";
	import CenteredHero from "$brand/blocks/saas/centered-hero.svelte";
	import LogoCloud from "$brand/blocks/saas/logo-cloud.svelte";
	import QuoteCard from "$brand/blocks/saas/quote-card.svelte";
	import SaasShell from "$brand/blocks/saas/saas-shell.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import CheckList from "$brand/blocks/site/check-list.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import LinkBar from "$brand/blocks/site/link-bar.svelte";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import type { Plan } from "$brand/blocks/site/plan.js";
	import PricingPlans from "$brand/blocks/site/pricing-plans.svelte";
	import RingStats from "$brand/blocks/site/ring-stats.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Notice from "$brand/components/notice.svelte";
	import Question from "$brand/components/question.svelte";
	import Questions from "$brand/components/questions.svelte";
	import RingGauge from "$brand/components/ring-gauge.svelte";
	import Step from "$brand/components/step.svelte";
	import Stepper from "$brand/components/stepper.svelte";
	import Dashboard from "./sightline-dashboard.svelte";
	const customers = [
		{ name: "Paperplane", icon: Bird }, { name: "Northwind", icon: Mountain }, { name: "Tidewater", icon: Waves },
		{ name: "Fernhill", icon: Leaf }, { name: "Lumabank", icon: Landmark }, { name: "Hexwork", icon: Hexagon }, { name: "Cumulus", icon: Cloudy },
	];
	const steps = [
		{ title: "Add one line to your site", body: "Paste the script tag, or install the package if your app is built with React, Vue or Svelte. Page views start coming in right away." },
		{ title: "Name the moments that matter", body: "Signed up, invited a teammate, paid. One line each, wherever they happen in your code." },
		{ title: "Read the answers", body: "Funnels, retention and paths build themselves from those names. No queries, no spreadsheets." },
	];
	const code = [
		{ label: "Install", lang: "bash" as const, code: "npm install @sightline/web" },
		{
			label: "Your app",
			lang: "typescript" as const,
			code: `import { sightline } from "@sightline/web"

sightline.start({ site: "paperplane.app" })

// Wherever it happens in your code:
sightline.track("Invited a teammate", { plan: "team" })`,
		},
	];
	const quotes = [
		{ quote: "We found out 60% of people left at the card step. We moved it after the first project, and paid sign-ups doubled in a month.", name: "Ana Duarte", role: "Product lead, Paperplane" },
		{ quote: "Our old tool needed an analyst to answer anything. Now the designers open Sightline on Monday morning and just read it.", name: "Tom Becker", role: "Head of design, Northwind" },
		{ quote: "Dropping the cookie banner was worth the switch on its own. Setup took one afternoon.", name: "Rina Okafor", role: "Founder, Fernhill" },
	];
	const plans: Plan[] = [
		{ name: "Free", price: 0, blurb: "For a side project or a first launch.", features: ["10,000 visitors a month", "Every chart, one site", "Data kept for 6 months"], cta: "Start free" },
		{ name: "Growth", price: 39, yearly: 390, blurb: "For a product with real customers.", features: ["200,000 visitors a month", "Funnels, retention and paths", "Alerts by email and Slack", "Data kept for 3 years"], cta: "Start a free trial", pick: true },
		{ name: "Scale", price: 149, yearly: 1490, blurb: "For teams that live in the numbers.", features: ["2 million visitors a month", "Everything in Growth", "Single sign-on and roles", "Export to your warehouse"], cta: "Talk to us" },
	];
	const faq = [
		{ q: "Do I need a cookie banner?", a: "No. Sightline doesn't use cookies or store anything on your visitors' devices, so there's nothing to ask permission for in the EU or the UK." },
		{ q: "Will it slow my site down?", a: "The script is 4 kB and loads after your page does. People won't notice it's there." },
		{ q: "Can I bring my old data?", a: "Yes. Upload an export from Google Analytics or Mixpanel and Sightline adds it to your charts, so your history stays in one place." },
		{ q: "What happens when I go over my plan?", a: "Nothing breaks. We keep counting and send you an email. If it happens two months in a row, we'll suggest the next plan." },
		{ q: "Who can see my data?", a: "Only the people you invite. We never sell it, share it, or use it to train anything." },
		{ q: "Can I cancel any time?", a: "Yes, from the settings page, in two clicks. You can download everything before you go." },
	];
	const funnel = [["Visited", 100], ["Signed up", 40], ["Set up", 22], ["Paid", 9]] as const;
	const heatRows = [[5, 4, 3, 3, 2, 2], [5, 4, 3, 2, 2], [5, 4, 3, 3], [5, 5, 4], [5, 4]] as const;
	const heatTone = ["", "bg-primary/8", "bg-primary/18", "bg-primary/35", "bg-primary/60", "bg-primary"];
	const live = [["Maya", "invited 3 teammates", true], ["Someone in Austin", "opened /pricing", false], ["Kenji", "created a project", true]] as const;
</script>

{#snippet bento(title: string, body: string, span: string, content?: import("svelte").Snippet)}
	<OutlineCard class={cn("gap-5", span)}>
		<div class="flex flex-col gap-1.5">
			<h3 class="text-lg font-medium tracking-[-0.01em]">{title}</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
		</div>
		{@render content?.()}
	</OutlineCard>
{/snippet}

{#snippet miniFunnel()}
	<ul class="mt-auto grid grid-cols-4 items-end gap-2" aria-label="A funnel: 100% visited, 40% signed up, 22% set up, 9% paid">
		{#each funnel as [label, v] (label)}
			<li class="flex flex-col gap-2"><span class="flex h-28 items-end" aria-hidden="true"><i class="block w-full rounded-t-[4px] bg-primary" style="height: {Math.max(v, 4)}%"></i></span><span class="text-xs text-muted-foreground">{label} <span class="text-foreground tabular-nums">{v}%</span></span></li>
		{/each}
	</ul>
{/snippet}

{#snippet miniHeat()}
	<div class="mt-auto grid grid-cols-6 gap-1" aria-hidden="true">
		{#each heatRows as r, i (i)}{#each Array.from({ length: 6 }, (_, j) => j) as j (j)}<i class={cn("aspect-square rounded-[3px]", r[j] ? heatTone[r[j]] : "border border-dashed")}></i>{/each}{/each}
	</div>
{/snippet}

{#snippet miniLive()}
	<ul class="mt-auto flex flex-col gap-2.5 text-[0.8125rem]">
		{#each live as [who, what, good] (who)}<li class="flex items-center gap-2.5"><Marker filled={good} class={good ? "text-success" : "text-muted-foreground"} /><span class="truncate">{who} <span class="text-muted-foreground">{what}</span></span></li>{/each}
	</ul>
{/snippet}

{#snippet goals()}
	<div class="mt-auto flex items-center gap-4"><RingGauge value={0.72} /><span class="flex flex-col gap-0.5"><span class="text-[1.75rem] leading-none font-medium tracking-[-0.03em]">72%</span><span class="text-sm text-muted-foreground">of 400 paid sign-ups</span></span></div>
{/snippet}

{#snippet alerts()}
	<Notice tone="warning" title="Sign-ups fell 30% on Tuesday, after the 2.4 release." class="mt-auto" />
{/snippet}
{#snippet share()}<LinkBar url="https://sightline.io/share/paperplane/pricing-to-team" />{/snippet}

<SaasShell
	name="sightline" symbol="Sl" tagline="Product analytics that answers in plain words. Made for small product teams."
	nav={["Product", "Pricing", "Customers", "Docs"]} cta="Start free" status="Every system working" signature={24.8}
	announcement={{ tag: "New", text: "Funnels now show where people leave, step by step.", link: "See what's new" }}
	footer={[
		{ title: "Product", links: ["Overview", "Funnels", "Retention", "Live view", "Pricing"] }, { title: "Resources", links: ["Docs", "Guides", "Changelog", "Status"] },
		{ title: "Company", links: ["About", "Customers", "Careers", "Contact"] }, { title: "Compare", links: ["Google Analytics", "Mixpanel", "Amplitude"] },
	]}
>
	<div class="flex flex-col gap-14 md:gap-16">
		<CenteredHero>
			{#snippet title()}See which features people use, and where they give up.{/snippet}
			{#snippet lede()}
				Sightline turns clicks into plain answers. It shows what brings people in, where they get stuck and what makes them come back. Add one line to your site and the charts fill in by themselves.
			{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Start free</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Book a demo</ButtonLink>
			{/snippet}
			{#snippet note()}
				<HeroNote>Free up to 10,000 visitors a month</HeroNote>
				<HeroNote>No cookie banner needed</HeroNote>
			{/snippet}
		</CenteredHero>
		<Container><Dashboard /></Container>
		<Container>
			<LogoCloud items={customers}>
				{#snippet label()}
					Product teams that open Sightline every morning
				{/snippet}
			</LogoCloud>
		</Container>
	</div>

	<Section align="center">
		{#snippet title()}Every question a product team asks, answered{/snippet}
		{#snippet intro()}The five reports people actually use, built for you from the moments you name.{/snippet}
		<div class="grid gap-4 lg:grid-cols-6">
			{@render bento("Funnels", "Pick the steps from visit to payment. See how many people make it through each one, and where the rest leave.", "lg:col-span-4", miniFunnel)}
			{@render bento("Retention", "Of the people who joined each week, how many came back. The darker the square, the more.", "lg:col-span-2", miniHeat)}
			{@render bento("Live view", "Who's on your site right now and what they just did.", "lg:col-span-2", miniLive)}
			{@render bento("Goals", "Set a number for the month and watch it fill in.", "lg:col-span-2", goals)}
			{@render bento("Alerts", "An email or a Slack message when something changes that you'd want to know about.", "lg:col-span-2", alerts)}
			{@render bento("Share a chart with a link", "Anyone with the link sees the chart as it is right now, without an account. Turn the link off whenever you like.", "lg:col-span-6", share)}
		</div>
	</Section>

	<Section>
		{#snippet title()}Set up in five minutes{/snippet}
		{#snippet intro()}If you can paste a line into your site, you can set up Sightline.{/snippet}
		<div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
			<Stepper>
				{#each steps as s, i (s.title)}
					<Step n={i + 1} done>
						<h3 class="text-[1.0625rem] font-medium">{s.title}</h3>
						<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{s.body}</p>
					</Step>
				{/each}
			</Stepper>
			<CodeBlock files={code} />
		</div>
	</Section>

	<RingStats items={[{ value: "4 kB", label: "script, loaded after your page", ring: 0.04 }, { value: "2 s", label: "from a click to your charts", ring: 0.2 }, { value: "0", label: "cookies set on your visitors", ring: 0 }]} />

	<section class="band-gray py-16 md:py-24">
		<Section>
			{#snippet title()}
				Your visitors stay anonymous
			{/snippet}
			{#snippet intro()}
				Sightline counts what people do and never who they are. With no cookies, fingerprinting or personal data, you can skip the consent banner and your visitors can skip being followed around.
			{/snippet}
			<CheckList
				class="sm:grid sm:grid-cols-2 sm:gap-x-10"
				items={[
					"No cookies and nothing stored on visitors' devices", "Hosted in the EU, on servers we rent, not share", "Delete one person's data, or all of it, in one click",
					"Meets GDPR, CCPA and PECR without extra setup", "Your data is never sold or used to train anything",
				]}
			/>
			<ButtonLink href="#" variant="outline" size="lg" class="w-fit px-5">Read how we handle data</ButtonLink>
		</Section>
	</section>

	<Section>
		{#snippet title()}What product teams say{/snippet}
		{#snippet intro()}Three of the teams that moved to Sightline this year.{/snippet}
		<div class="grid gap-4 md:grid-cols-3">
			{#each quotes as q (q.name)}
				<QuoteCard name={q.name} role={q.role}>
					{#snippet quote()}
						{q.quote}
					{/snippet}
				</QuoteCard>
			{/each}
		</div>
	</Section>

	<Section>
		{#snippet title()}Pricing that grows with you{/snippet}
		{#snippet intro()}Start free. The price follows your visitors, and every plan includes unlimited people.{/snippet}
		<PricingPlans {plans} />
	</Section>

	<Section>
		{#snippet title()}Questions people ask{/snippet}
		{#snippet intro()}Straight answers about privacy, speed and billing.{/snippet}
		<Questions>
			{#each faq as f, i (f.q)}
				{#snippet q()}
					{f.q}
				{/snippet}
				<Question question={q} open={i === 0}>
					{f.a}
				</Question>
			{/each}
		</Questions>
	</Section>

	<CtaBand title="Know what your users do by Friday.">
		{#snippet body()}
			Add the script today. By the end of the week you'll have a funnel, a retention chart and a clear next step.
		{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Start free</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">Book a demo</ButtonLink>
		{/snippet}
	</CtaBand>
</SaasShell>
