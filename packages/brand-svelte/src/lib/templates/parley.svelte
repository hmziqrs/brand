<!--
	Template 4 · Parley, an AI assistant for customer support. The hero sits
	on a grey band with the chat you can try. Then the help desks it plugs
	into, set-up beside an answer check, before and after in two columns,
	channels, guardrails as notices, a customer story, a plan table and a
	numbered FAQ.
-->
<script lang="ts">
	import { siDiscord, siGmail, siHubspot, siIntercom, siShopify, siTelegram, siWhatsapp, siZendesk } from "simple-icons";
	import type { Tone } from "@hmziq/brand-core/tones";
	import { cn } from "$brand/utils.js";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import DataTable from "$brand/components/data-table.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Notice from "$brand/components/notice.svelte";
	import Step from "$brand/components/step.svelte";
	import Stepper from "$brand/components/stepper.svelte";
	import Tag from "$brand/components/tag.svelte";
	import Faq from "$brand/blocks/saas/faq.svelte";
	import Person from "$brand/blocks/saas/person.svelte";
	import SaasShell from "$brand/blocks/saas/saas-shell.svelte";
	import BigNumbers from "$brand/blocks/site/big-numbers.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import Channels from "./parley-channels.svelte";
	import SupportChat from "./parley-chat.svelte";

	const tools = [
		{ icon: siZendesk, name: "Zendesk" },
		{ icon: siIntercom, name: "Intercom" },
		{ icon: siHubspot, name: "HubSpot" },
		{ icon: siShopify, name: "Shopify" },
		{ icon: siGmail, name: "Gmail" },
		{ icon: siWhatsapp, name: "WhatsApp" },
		{ icon: siTelegram, name: "Telegram" },
		{ icon: siDiscord, name: "Discord" },
	];

	const setup = [
		{ title: "Connect your help center", body: "Parley reads your articles, saved replies and a year of past conversations. It takes about ten minutes for a shop your size." },
		{ title: "Check its answers", body: "Ask it the questions you get every day. Where an answer is wrong or missing, fix the article, and every future answer improves." },
		{ title: "Turn it on, a little at a time", body: "Start with one topic, like shipping, or with evenings only. Widen it when you trust it." },
	];

	const checks: [string, string, Tone | undefined][] = [
		["Where's my order?", "Ready", "success"],
		["Do you ship to Canada?", "Ready", "success"],
		["How do I pick a boot size?", "Ready", "success"],
		["Can I change my address after ordering?", "Needs an article", "warning"],
		["Can I return worn boots?", "Goes to a person", undefined],
		["Do you price match?", "Needs an article", "warning"],
	];

	const before = [
		"Customers wait 9 hours for the first reply",
		"Three people answer “where's my order?” all day",
		"Weekends and nights pile up for Monday",
		"Replies sound different depending on who writes them",
	];
	const after = [
		"Most customers get an answer in under a minute",
		"Your team spends its day on the questions that need them",
		"Monday starts with an empty inbox",
		"Every reply follows your tone and your policies",
	];

	const guardrails: { tone: "success" | "info" | "warning" | "destructive"; title: string; body: string }[] = [
		{ tone: "success", title: "It only answers from your sources", body: "If it isn't in your help center or past replies, Parley doesn't make it up. It says so and hands over." },
		{ tone: "info", title: "Every answer shows where it came from", body: "Customers and your team can open the article behind each reply." },
		{ tone: "warning", title: "It hands over when it isn't sure", body: "You set how sure it has to be. Below that, a person takes the chat, with a summary so nobody asks twice." },
		{ tone: "destructive", title: "It never touches money on its own", body: "Refunds, discounts and cancellations always need a person to approve them." },
	];

	const tidewaterStats: [string, string][] = [
		["9 h → 40 s", "time to the first reply"],
		["71%", "of order questions closed without a person"],
		["2 weeks", "from sign-up to every channel"],
	];
</script>

{#snippet column(title: string, items: string[], ours: boolean)}
	<OutlineCard class={cn("gap-5 p-7", ours && "ring-primary/55")}>
		<h3 class={cn("flex items-center gap-2.5 text-lg font-medium", !ours && "text-muted-foreground")}>
			<Marker filled={ours} class={ours ? "text-primary" : "text-muted-foreground"} />
			{title}
		</h3>
		<ul class="flex flex-col divide-y border-t">
			{#each items as t (t)}
				<li class={cn("py-3.5 text-[0.9rem] leading-relaxed", !ours && "text-muted-foreground")}>{t}</li>
			{/each}
		</ul>
	</OutlineCard>
{/snippet}

{#snippet planColumn()}
	<span class="sr-only">Plan details</span>
{/snippet}

{#snippet faqSetup1()}Most teams are answering real customers within a day. Connecting your help center takes minutes; checking the answers takes the rest.{/snippet}
{#snippet faqSetup2()}Zendesk, Intercom, HubSpot, Gorgias, Front and Help Scout, plus email and WhatsApp directly. It replies inside the tool your team already uses.{/snippet}
{#snippet faqAnswer1()}Mark it as wrong in your help desk. Parley shows you which article it used, so you can fix the source instead of the symptom.{/snippet}
{#snippet faqAnswer2()}It answers in the customer's language, from articles written in yours. Growth covers 12 languages; Enterprise covers 40.{/snippet}
{#snippet faqBilling()}A conversation Parley closes without a person. Chats it hands over are free, so you never pay for the hard ones.{/snippet}
{#snippet faqPrivacy()}No. Your conversations are used to answer your customers and nothing else, and you can delete them at any time.{/snippet}

<SaasShell
	name="parley"
	symbol="Pa"
	tagline="An assistant that answers your customers the way your team would."
	nav={["How it works", "Channels", "Pricing", "Security"]}
	cta="Start a free trial"
	signature={31.5}
	footer={[
		{ title: "Product", links: ["How it works", "Channels", "Answer check", "Pricing"] },
		{ title: "Works with", links: ["Zendesk", "Intercom", "HubSpot", "Shopify"] },
		{ title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
		{ title: "Trust", links: ["Security", "Privacy", "Data processing"] },
	]}
>
	<section class="band-gray -mt-16 py-16 md:-mt-24 md:py-24">
		<Hero>
			{#snippet title()}Answer your customers in seconds, in your own words.{/snippet}
			{#snippet lede()}Parley reads your help center and past replies, then answers customer questions the way your team would. When it isn't sure, it hands the chat to a person.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Start a free trial</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Watch the 2-minute tour</ButtonLink>
			{/snippet}
			{#snippet note()}
				<HeroNote>14 days free, no card</HeroNote>
				<HeroNote>Live in an afternoon</HeroNote>
			{/snippet}
			{#snippet aside()}
				<SupportChat />
			{/snippet}
		</Hero>
	</section>

	<Container class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">Answers inside the help desk and channels you already use</p>
		<ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-muted-foreground">
			{#each tools as t (t.name)}
				<li class="inline-flex items-center gap-2 text-[0.9375rem] font-medium">
					<BrandIcon icon={t.icon} class="size-4" />
					{t.name}
				</li>
			{/each}
		</ul>
	</Container>

	<Section>
		{#snippet title()}Live in an afternoon, trusted by Friday{/snippet}
		{#snippet intro()}Three steps, and you decide how fast to go through them.{/snippet}
		<div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
			<Stepper>
				{#each setup as s, i (s.title)}
					<Step n={i + 1} done={i < 2}>
						<h3 class="text-[1.0625rem] font-medium">{s.title}</h3>
						<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{s.body}</p>
					</Step>
				{/each}
			</Stepper>
			<OutlineCard class="gap-4">
				<div class="flex items-baseline justify-between gap-3">
					<h3 class="font-medium">Answer check</h3>
					<span class="text-xs text-muted-foreground">4 of 6 ready</span>
				</div>
				<ul class="-mx-6 divide-y border-y">
					{#each checks as [q, label, tone] (q)}
						<li class="flex items-center justify-between gap-4 px-6 py-3">
							<span class="text-[0.875rem]">{q}</span>
							<Tag {tone} marker={Boolean(tone)}>{label}</Tag>
						</li>
					{/each}
				</ul>
				<p class="text-[0.8125rem] leading-relaxed text-muted-foreground">Write the two missing articles and Parley can answer them too.</p>
			</OutlineCard>
		</div>
	</Section>

	<Section>
		{#snippet title()}A Monday morning, before and after{/snippet}
		{#snippet intro()}What changes for your customers and your team in the first month.{/snippet}
		<div class="grid gap-4 md:grid-cols-2">
			{@render column("Before Parley", before, false)}
			{@render column("With Parley", after, true)}
		</div>
	</Section>

	<Section>
		{#snippet title()}Written for where it's read{/snippet}
		{#snippet intro()}Parley shapes each answer for the place your customer asked. It keeps chat short, email complete and WhatsApp shorter still.{/snippet}
		<Channels />
	</Section>

	<Section>
		{#snippet title()}It knows when to stop{/snippet}
		{#snippet intro()}Guardrails you set once. They hold on every channel, in every language.{/snippet}
		<div class="grid gap-4 md:grid-cols-2">
			{#each guardrails as g (g.title)}
				<Notice tone={g.tone} title={g.title}>{g.body}</Notice>
			{/each}
		</div>
	</Section>

	<Container>
		<BigNumbers
			items={[
				["62%", "of questions answered without a person"],
				["38 s", "to the first reply, day or night"],
				["4.7", "out of 5 from customers after a chat"],
			]}
		/>
	</Container>

	<Section>
		{#snippet title()}How Tidewater got its Mondays back{/snippet}
		{#snippet intro()}An outdoor gear shop with four people on support and a lot of questions about boots.{/snippet}
		<OutlineCard class="grid gap-10 p-7 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:p-10">
			<div class="flex flex-col justify-between gap-8">
				<blockquote class="text-lg leading-[1.65]">
					We used to start every week with 400 unanswered emails. Now Parley handles the order and shipping questions overnight, and the four of us spend Monday on the customers who actually need a person. Nobody on the team wants to go back.
				</blockquote>
				<Person name="Maya Lindqvist" role="Head of support, Tidewater Supply" size="lg" />
			</div>
			<ul class="flex flex-col gap-6">
				{#each tidewaterStats as [v, l] (l)}
					<li class="flex flex-col gap-1 border-t border-foreground pt-3">
						<span class="text-[1.9rem] leading-none font-medium tracking-[-0.03em]">{v}</span>
						<span class="text-sm text-muted-foreground">{l}</span>
					</li>
				{/each}
			</ul>
		</OutlineCard>
	</Section>

	<Section>
		{#snippet title()}Pay only for the answers it gives{/snippet}
		{#snippet intro()}You pay when Parley closes a conversation on its own. Handovers are free, and your whole team is included.{/snippet}
		<div class="flex flex-col gap-6">
			<DataTable
				accent={2}
				columns={[planColumn, "Starter", "Growth", "Enterprise"]}
				rows={[
					["Price", "$0.90 an answer", "$0.60 an answer", "Talk to us"],
					["Included each month", "100 answers", "2,000 answers", "Custom"],
					["Channels", "Website chat", "Chat, email, WhatsApp", "Every channel, plus voice"],
					["Languages", "1", "12", "40"],
					["Handover to a person", "Email only", "In your help desk, with a summary", "Routed by team and skill"],
					["Single sign-on", "No", "No", "Yes"],
				]}
			/>
			<div class="flex flex-wrap items-center gap-3">
				<ButtonLink href="#" size="lg" class="px-5">Start a free trial</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Talk to sales</ButtonLink>
				<span class="text-sm text-muted-foreground">Every plan starts with 14 days free.</span>
			</div>
		</div>
	</Section>

	<Section>
		{#snippet title()}Questions people ask{/snippet}
		{#snippet intro()}Grouped by topic. If yours isn't here, ask the chat at the top of the page.{/snippet}
		<Faq
			numbered
			items={[
				{ topic: "Setup", q: "How long does it take to set up?", a: faqSetup1 },
				{ topic: "Setup", q: "Which help desks does it work with?", a: faqSetup2 },
				{ topic: "Answers", q: "What if it gives a wrong answer?", a: faqAnswer1 },
				{ topic: "Answers", q: "Does it speak other languages?", a: faqAnswer2 },
				{ topic: "Billing", q: "What counts as an answer?", a: faqBilling },
				{ topic: "Privacy", q: "Is our data used to train anything?", a: faqPrivacy },
			]}
		/>
	</Section>

	<CtaBand title="Let your team get to the hard questions.">
		{#snippet body()}Connect your help center today and see Parley's answers to your own customers' questions before anyone else does.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Start a free trial</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">Talk to sales</ButtonLink>
		{/snippet}
	</CtaBand>
</SaasShell>
