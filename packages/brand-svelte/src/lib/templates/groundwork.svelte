<!--
  Template 3 · Groundwork, team planning.
  A split hero with the live board where the rings usually go, four views
  picked from a list, templates drawn as elements, integrations in a grid of
  hairlines, big numbers, quotes, per-person pricing and security on grey.
-->
<script lang="ts">
	import Archive from "@lucide/svelte/icons/archive";
	import DatabaseBackup from "@lucide/svelte/icons/database-backup";
	import KeyRound from "@lucide/svelte/icons/key-round";
	import Minus from "@lucide/svelte/icons/minus";
	import Plus from "@lucide/svelte/icons/plus";
	import UserCog from "@lucide/svelte/icons/user-cog";
	import { siDiscord, siDropbox, siFigma, siGithub, siGmail, siGooglecalendar, siGoogledrive, siJira, siLinear, siNotion, siZapier, siZoom } from "simple-icons";
	import { Avatar, AvatarFallback, AvatarGroup } from "$brand/ui/avatar/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import BigNumbers from "$brand/blocks/site/big-numbers.svelte";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import ElementCard from "$brand/blocks/site/element-card.svelte";
	import FeatureGrid from "$brand/blocks/site/feature-grid.svelte";
	import Hero from "$brand/blocks/site/hero.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import Price from "$brand/blocks/site/price.svelte";
	import PricingPlans from "$brand/blocks/site/pricing-plans.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import type { Plan } from "$brand/blocks/site/plan.js";
	import Faq from "$brand/blocks/saas/faq.svelte";
	import IntegrationGrid from "$brand/blocks/saas/integration-grid.svelte";
	import Person from "$brand/blocks/saas/person.svelte";
	import QuoteCard from "$brand/blocks/saas/quote-card.svelte";
	import SaasShell from "$brand/blocks/saas/saas-shell.svelte";
	import Board from "./groundwork-board.svelte";
	import FeatureExplorer from "./groundwork-explorer.svelte";
	import type { Tone } from "@hmziq/brand-core/tones";
	import type { Snippet } from "svelte";

	// One color per kind of work across the whole page: the board's team tags and the templates below.
	// Web and engineering blue, marketing pink, design purple, people teal.
	const kinds = {
		product: { label: "Product and engineering", color: "var(--blue)", tone: "blue" },
		marketing: { label: "Marketing", color: "var(--pink)", tone: "pink" },
		people: { label: "People and hiring", color: "var(--teal)", tone: "teal" },
	} as const satisfies Record<string, { label: string; color: string; tone: Tone }>;

	const templates = [
		{ n: 1, symbol: "Sp", name: "Sprint planning", kind: kinds.product, status: { label: "18 tasks" }, body: "Two-week sprints with a board, a burndown and a Friday check-in already set up." },
		{ n: 2, symbol: "Bt", name: "Bug triage", kind: kinds.product, status: { label: "9 tasks" }, body: "New bugs land in one column. Sort them by how many people they hit, then assign." },
		{ n: 3, symbol: "Lc", name: "Launch checklist", kind: kinds.marketing, status: { label: "24 tasks" }, body: "Everything from the landing page to the launch email, on a timeline that ends on launch day." },
		{ n: 4, symbol: "Cc", name: "Content calendar", kind: kinds.marketing, status: { label: "12 tasks" }, body: "Posts, videos and newsletters on one calendar, each with its draft attached." },
		{ n: 5, symbol: "Hp", name: "Hiring pipeline", kind: kinds.people, status: { label: "7 stages" }, body: "Candidates move from applied to offer. Interview notes stay with each person." },
		{ n: 6, symbol: "On", name: "Onboarding", kind: kinds.people, status: { label: "15 tasks" }, body: "A new person's first two weeks, planned out, with a buddy and a check-in each Friday." },
	];

	const integrations = [
		{ icon: siGithub, name: "GitHub", note: "Tasks close when the pull request merges." },
		{ icon: siFigma, name: "Figma", note: "Designs show a live preview on the task." },
		{ icon: siGooglecalendar, name: "Google Calendar", note: "Due dates show up next to your meetings." },
		{ icon: siNotion, name: "Notion", note: "Bring your pages over in one click." },
		{ icon: siLinear, name: "Linear", note: "Import issues and keep them in sync." },
		{ icon: siZoom, name: "Zoom", note: "Start a call from any task." },
		{ icon: siGoogledrive, name: "Google Drive", note: "Attach files without downloading them." },
		{ icon: siDiscord, name: "Discord", note: "Updates go to the channel you pick." },
		{ icon: siGmail, name: "Gmail", note: "Turn an email into a task." },
		{ icon: siDropbox, name: "Dropbox", note: "Attach files and folders." },
		{ icon: siJira, name: "Jira", note: "Move projects over with their history." },
		{ icon: siZapier, name: "Zapier", note: "Connect the other 6,000 apps." },
	];

	const plans: Plan[] = [
		{ name: "Free", price: 0, blurb: "For a small team getting started.", features: ["Up to 5 people", "Unlimited boards and docs", "Check-ins once a week"], cta: "Start free" },
		{ name: "Team", price: 8, yearly: 80, per: "per person", blurb: "For a team that plans together every week.", features: ["Unlimited people", "Timeline and dependencies", "Integrations and automations", "Guests for free"], cta: "Try Team free for 14 days", pick: true },
		{ name: "Business", price: 14, yearly: 140, per: "per person", blurb: "For companies with more than one team.", features: ["Everything in Team", "Single sign-on and roles", "Audit log and backups", "A person to call"], cta: "Talk to us" },
	];

	const security: { icon: Snippet; title: string; body: string }[] = [
		{ icon: ssoIcon, title: "Single sign-on", body: "Sign in with Google, Microsoft or Okta. Turn off passwords for the whole company." },
		{ icon: rolesIcon, title: "Roles for everyone", body: "Decide who can see, edit or invite, per team and per project." },
		{ icon: backupsIcon, title: "Backups every hour", body: "Kept for 30 days, in two places. Restore a deleted board yourself." },
		{ icon: exportIcon, title: "Take it all with you", body: "Export every board, doc and comment as a file you can open anywhere." },
	];

	const faq = [
		{ q: "Is Groundwork really free for small teams?", a: answer0 },
		{ q: "Can I bring my tasks from another tool?", a: answer1 },
		{ q: "Do guests cost extra?", a: answer2 },
		{ q: "Does it work on my phone?", a: answer3 },
		{ q: "What if I only want the board?", a: answer4 },
		{ q: "Where is my data kept?", a: answer5 },
	];

	let seats = $state(12);
	const seatsId = $props.id();

	const seatLine = (p: Plan, yearly: boolean) => {
		const each = yearly && p.yearly !== undefined ? p.yearly : Number(p.price);
		return p.price === 0
			? seats > 5
				? "Up to 5 people"
				: `Free for your ${seats === 1 ? "one person" : `${seats} people`}`
			: `$${(each * seats).toLocaleString("en-US")} ${yearly ? "a year" : "a month"} for ${seats} ${seats === 1 ? "person" : "people"}`;
	};
</script>

<SaasShell
	name="groundwork"
	symbol="Gw"
	tagline="One calm place to plan the week, for teams of 3 to 300."
	nav={["Product", "Templates", "Pricing", "Customers"]}
	cta="Try it free"
	signature={17.2}
	footer={[
		{ title: "Product", links: ["Board", "Timeline", "Docs", "Check-ins", "Pricing"] },
		{ title: "Templates", links: ["Sprint planning", "Launch checklist", "Hiring pipeline", "All templates"] },
		{ title: "Company", links: ["About", "Customers", "Careers", "Press"] },
		{ title: "Help", links: ["Guides", "Import your work", "Contact", "Status"] },
	]}
>
	<Hero asideSize="wide">
		{#snippet title()}Plan the week together.{/snippet}
		{#snippet lede()}Groundwork puts your team's tasks, plans and deadlines on one calm board. Everyone can see what's next, so nobody has to ask for a status update.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Try it free</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">Browse templates</ButtonLink>
		{/snippet}
		{#snippet note()}
			<HeroNote>Free for up to 5 people</HeroNote>
			<HeroNote>Set up in two minutes</HeroNote>
		{/snippet}
		{#snippet aside()}
			<Board />
		{/snippet}
	</Hero>

	<Container class="flex flex-col items-center gap-4 text-center">
		<AvatarGroup>
			{#each ["AD", "TB", "RO", "KM", "LS", "PN"] as i (i)}
				<Avatar size="lg">
					<AvatarFallback class="bg-background text-xs font-medium text-foreground">{i}</AvatarFallback>
				</Avatar>
			{/each}
		</AvatarGroup>
		<p class="max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground"><span class="text-foreground">2,400 small teams</span> plan their week in Groundwork, from design studios to school districts.</p>
	</Container>

	<Section>
		{#snippet title()}One set of tasks, four ways to see it{/snippet}
		{#snippet intro()}Change a task anywhere and every view updates. Pick the one that fits the conversation.{/snippet}
		<FeatureExplorer />
	</Section>

	<Section>
		{#snippet title()}Start from a template{/snippet}
		{#snippet intro()}Each one is a real team's setup, cleaned up. Copy it, rename a few things, and you're planning.{/snippet}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each templates as t (t.name)}
				<ElementCard {...t} />
			{/each}
		</div>
	</Section>

	<Section>
		{#snippet title()}Works with what you already use{/snippet}
		{#snippet intro()}Connect a tool once, and its links turn into live previews on every task.{/snippet}
		<IntegrationGrid items={integrations} />
	</Section>

	<Container>
		<BigNumbers
			items={[
				["3 h", "saved per person each week, on average"],
				["40%", "fewer status meetings after a month"],
				["2 min", "from sign-up to your first board"],
			]}
		/>
	</Container>

	<Section>
		{#snippet title()}Teams that stopped chasing updates{/snippet}
		{#snippet intro()}What changed after they moved their week into Groundwork.{/snippet}
		<div class="grid gap-4 md:grid-cols-2">
			<QuoteCard
				class="md:row-span-2 md:p-8 [&_blockquote]:text-lg [&_blockquote]:leading-[1.6]"
				name="Priya Nair"
				role="Operations lead, Fernhill Schools"
				quote={priyaQuote}
			/>
			<QuoteCard name="Lucas Moreira" role="Founder, Tidewater Studio" quote={lucasQuote} />
			<QuoteCard name="Kenji Mori" role="Engineering manager, Hexwork" quote={kenjiQuote} />
		</div>
	</Section>

	<Section>
		{#snippet title()}Pay per person, only once they join{/snippet}
		{#snippet intro()}Invite people for free. You pay when they accept, and guests never count.{/snippet}
		<div class="flex flex-col gap-6">
			<div class="flex items-center gap-4">
				<span id={seatsId} class="text-sm text-muted-foreground">People on your team</span>
				<div role="group" aria-labelledby={seatsId} class="inline-flex items-center gap-1 rounded-[calc(var(--radius-md)+4px)] border p-1">
					<Button variant="ghost" size="icon-sm" aria-label="One fewer" disabled={seats <= 1} onclick={() => (seats = seats - 1)}>
						<Minus class="lucide" />
					</Button>
					<output aria-live="polite" class="min-w-8 text-center text-sm font-medium tabular-nums">{seats}</output>
					<Button variant="ghost" size="icon-sm" aria-label="One more" disabled={seats >= 200} onclick={() => (seats = seats + 1)}>
						<Plus class="lucide" />
					</Button>
				</div>
			</div>
			<PricingPlans {plans}>
				{#snippet price(p: Plan, yearly: boolean)}
					<div class="flex flex-col gap-1">
						<Price plan={p} {yearly} />
						<span class="text-[0.8125rem] text-muted-foreground tabular-nums">{seatLine(p, yearly)}</span>
					</div>
				{/snippet}
			</PricingPlans>
		</div>
	</Section>

	<section class="band-gray py-16 md:py-24">
		<Section>
			{#snippet title()}Safe for the whole company{/snippet}
			{#snippet intro()}The controls IT asks about, on every Business plan.{/snippet}
			<FeatureGrid items={security} columns={2} />
			<div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 text-sm text-muted-foreground">
				<span>Questions about security?</span>
				<Person name="Sam Rivera" role="Head of security, answers within a day" />
			</div>
		</Section>
	</section>

	<Section>
		{#snippet title()}Questions people ask{/snippet}
		{#snippet intro()}Straight answers about plans, moving your work over and where it's kept.{/snippet}
		<Faq items={faq} columns />
	</Section>

	<CtaBand title="Plan next week in Groundwork.">
		{#snippet body()}Bring your team, pick a template and have your first board ready before your next meeting.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Try it free</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">Browse templates</ButtonLink>
		{/snippet}
	</CtaBand>
</SaasShell>

{#snippet ssoIcon()}<KeyRound class="lucide" />{/snippet}
{#snippet rolesIcon()}<UserCog class="lucide" />{/snippet}
{#snippet backupsIcon()}<DatabaseBackup class="lucide" />{/snippet}
{#snippet exportIcon()}<Archive class="lucide" />{/snippet}

{#snippet priyaQuote()}We ran twelve schools out of email threads and a shared spreadsheet that nobody trusted. Now every school has a board, the district has a timeline, and the Friday check-in replaced a two-hour meeting. Teachers actually answer it, because it takes a minute on their phone.{/snippet}
{#snippet lucasQuote()}Clients see their project as guests. The “where are we with this?” emails just stopped.{/snippet}
{#snippet kenjiQuote()}Tasks close themselves when the pull request merges. That one feature sold the whole team.{/snippet}

{#snippet answer0()}Yes. Up to five people, with unlimited boards and docs, for as long as you like. No card needed.{/snippet}
{#snippet answer1()}Import from Trello, Asana, Jira, Linear or a spreadsheet. Comments, due dates and people come across too.{/snippet}
{#snippet answer2()}No. Clients and freelancers can see and comment on the projects you share with them, for free.{/snippet}
{#snippet answer3()}There are apps for iPhone and Android, and the website works on any phone. Check-ins are easiest to answer there.{/snippet}
{#snippet answer4()}Turn off the views you don't use in settings. They stay out of everyone's way until you turn them back on.{/snippet}
{#snippet answer5()}In the EU or the US, your choice. It's encrypted, backed up every hour and never shared.{/snippet}
