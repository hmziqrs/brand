<!--
  Template 5 · Openslot, scheduling.
  An editorial hero, full width, then the booking page itself on a band in
  the other mode. Sharing, time zones, features, use cases in tabs,
  integrations by kind, a wall of short quotes and two plans.
-->
<script lang="ts">
	import BellRing from "@lucide/svelte/icons/bell-ring";
	import CalendarCheck from "@lucide/svelte/icons/calendar-check";
	import CalendarClock from "@lucide/svelte/icons/calendar-clock";
	import Code2 from "@lucide/svelte/icons/code-2";
	import Hourglass from "@lucide/svelte/icons/hourglass";
	import Mail from "@lucide/svelte/icons/mail";
	import MessageSquare from "@lucide/svelte/icons/message-square";
	import Repeat from "@lucide/svelte/icons/repeat";
	import Timer from "@lucide/svelte/icons/timer";
	import Users from "@lucide/svelte/icons/users";
	import { siApple, siGmail, siGooglecalendar, siGooglemeet, siNotion, siStripe, siZapier, siZoom } from "simple-icons";
	import type { Snippet } from "svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import IconTile from "$brand/components/icon-tile.svelte";
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "$brand/ui/tabs/index.js";
	import ButtonLink from "$brand/blocks/site/button-link.svelte";
	import CheckList from "$brand/blocks/site/check-list.svelte";
	import Container from "$brand/blocks/site/container.svelte";
	import CtaBand from "$brand/blocks/site/cta-band.svelte";
	import FeatureCards from "$brand/blocks/site/feature-cards.svelte";
	import FeatureGrid from "$brand/blocks/site/feature-grid.svelte";
	import HeroActions from "$brand/blocks/site/hero-actions.svelte";
	import HeroLede from "$brand/blocks/site/hero-lede.svelte";
	import HeroNote from "$brand/blocks/site/hero-note.svelte";
	import HeroNotes from "$brand/blocks/site/hero-notes.svelte";
	import HeroTitle from "$brand/blocks/site/hero-title.svelte";
	import LinkBar from "$brand/blocks/site/link-bar.svelte";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import PricingPlans from "$brand/blocks/site/pricing-plans.svelte";
	import RingStats from "$brand/blocks/site/ring-stats.svelte";
	import Section from "$brand/blocks/site/section.svelte";
	import type { Plan } from "$brand/blocks/site/plan.js";
	import Faq from "$brand/blocks/saas/faq.svelte";
	import InverseBand from "$brand/blocks/saas/inverse-band.svelte";
	import QuoteCard from "$brand/blocks/saas/quote-card.svelte";
	import SaasShell from "$brand/blocks/saas/saas-shell.svelte";
	import Booking from "./openslot-booking.svelte";
	import TimeZones from "./openslot-timezones.svelte";

	type Use = { value: string; label: string; title: string; body: string; points: string[]; event: { name: string; length: string; where: string; questions: string[] } };

	const share: { icon: Snippet; title: string; body: string }[] = [
		{ icon: mailIcon, title: "In your email signature", body: "Every email you send becomes a way to book you." },
		{ icon: code2Icon, title: "On your website", body: "Paste two lines and the booking page opens right on your site." },
		{ icon: messageSquareIcon, title: "In any chat", body: "Drop the link in Slack, WhatsApp or a DM. It works on any phone." },
	];

	const features: { icon: Snippet; title: string; body: string }[] = [
		{ icon: calendarCheckIcon, title: "Checks every calendar you have", body: "Work, personal and the shared family one. If you're busy in any of them, the time disappears." },
		{ icon: hourglassIcon, title: "Breathing room between meetings", body: "Add 10 minutes before or after each booking, so calls never run back to back." },
		{ icon: timerIcon, title: "A limit per day", body: "Take no more than four calls a day, or none before 10 on Mondays." },
		{ icon: bellRingIcon, title: "Reminders that cut no-shows", body: "An email the day before and a text an hour before, in your guest's language." },
		{ icon: repeatIcon, title: "Easy to move", body: "Every invite has a link to pick a new time, so nobody has to email to reschedule." },
		{ icon: usersIcon, title: "Round robin for teams", body: "Share one link for the team. Bookings go to whoever is free, evenly." },
	];

	const uses: Use[] = [
		{
			value: "sales",
			label: "Sales",
			title: "Book the demo while they're still interested",
			body: "Put the link on your pricing page. Leads pick a time straight away, and it goes to whoever on the team is free.",
			points: ["Round robin across the team", "Asks company size before booking", "Adds the meeting to your CRM"],
			event: { name: "Product demo", length: "45 min", where: "Zoom", questions: ["Company", "Team size", "What do you want to see?"] },
		},
		{
			value: "recruiting",
			label: "Recruiting",
			title: "Interviews without the email chain",
			body: "Send candidates one link for every round. The right interviewers are free, and the room is booked too.",
			points: ["Panels with up to five people", "A different question set per round", "Candidates reschedule themselves"],
			event: { name: "First interview", length: "30 min", where: "Google Meet", questions: ["Role", "Link to CV", "Anything we should know?"] },
		},
		{
			value: "teaching",
			label: "Teaching",
			title: "Let students book their own lessons",
			body: "Weekly slots, paid up front, with a reminder the night before. Packs of ten if they want them.",
			points: ["Take payment when they book", "Sell packs of lessons", "Recurring weekly slots"],
			event: { name: "Guitar lesson", length: "60 min", where: "In person, Studio 2", questions: ["Level", "What do you want to play?"] },
		},
		{
			value: "clinics",
			label: "Clinics",
			title: "Fewer phone calls at the front desk",
			body: "Patients book, move and cancel online. Reminders by text keep the chairs full.",
			points: ["Text reminders the day before", "A form before the first visit", "Different times per practitioner"],
			event: { name: "Physio, first visit", length: "40 min", where: "In person, Main St clinic", questions: ["Date of birth", "What's the problem?", "Referred by"] },
		},
	];
	const connects = [
		{ title: "Calendars", items: [{ icon: siGooglecalendar, name: "Google Calendar" }, { icon: siApple, name: "iCloud Calendar" }] },
		{ title: "Video", items: [{ icon: siZoom, name: "Zoom" }, { icon: siGooglemeet, name: "Google Meet" }] },
		{ title: "Payments", items: [{ icon: siStripe, name: "Stripe" }] },
		{ title: "Everything else", items: [{ icon: siGmail, name: "Gmail" }, { icon: siNotion, name: "Notion" }, { icon: siZapier, name: "Zapier" }] },
	];
	const quotes = [
		{ quote: "I used to spend Monday mornings answering “does 3pm work?” emails. Now I don't.", name: "Lena Fischer", role: "Head of sales, Oakly" },
		{ quote: "No-shows went from one a day to one a week after we turned on text reminders.", name: "Dr. Omar Haddad", role: "Haddad Physio" },
		{ quote: "Candidates tell us it's the smoothest interview booking they've seen.", name: "Grace Liu", role: "Recruiter, Northwind" },
		{ quote: "Students pay when they book. I haven't chased a payment since.", name: "Mateo Ruiz", role: "Guitar teacher" },
		{ quote: "The time zone handling alone saved our team in Sydney from 3 am calls.", name: "Hannah Park", role: "Customer success, Cumulus" },
		{ quote: "Set it up in the time it took my coffee to cool.", name: "Ben Adeyemi", role: "Freelance designer" },
	];
	const plans: Plan[] = [
		{ name: "Free", price: 0, blurb: "For one person with one kind of meeting.", features: ["One booking page", "One calendar checked", "Email reminders"], cta: "Get your link" },
		{ name: "Pro", price: 12, yearly: 120, blurb: "For people whose calendar is their job.", features: ["Unlimited booking pages", "Every calendar checked", "Text reminders and payments", "Your logo, no Openslot branding"], cta: "Try Pro free for 14 days", pick: true },
	];
	const faq = [
		{ q: "Do my guests need an account?", a: faqGuests },
		{ q: "Which calendars does it check?", a: faqCalendars },
		{ q: "What if someone books and I get busy?", a: faqBusy },
		{ q: "Can I take payments?", a: faqPayments },
		{ q: "Is there a team plan?", a: faqTeam },
	];

	let tab = $state("sales");
</script>

{#snippet mailIcon()}<Mail class="lucide" />{/snippet}
{#snippet code2Icon()}<Code2 class="lucide" />{/snippet}
{#snippet messageSquareIcon()}<MessageSquare class="lucide" />{/snippet}
{#snippet calendarCheckIcon()}<CalendarCheck class="lucide" />{/snippet}
{#snippet hourglassIcon()}<Hourglass class="lucide" />{/snippet}
{#snippet timerIcon()}<Timer class="lucide" />{/snippet}
{#snippet bellRingIcon()}<BellRing class="lucide" />{/snippet}
{#snippet repeatIcon()}<Repeat class="lucide" />{/snippet}
{#snippet usersIcon()}<Users class="lucide" />{/snippet}
{#snippet faqGuests()}No. They open your link, pick a time and type their name and email. That's it.{/snippet}
{#snippet faqCalendars()}Google, iCloud and any calendar with a CalDAV or ICS link. Connect as many as you like on Pro.{/snippet}
{#snippet faqBusy()}Move or cancel the booking from your calendar. Openslot tells your guest and offers them new times.{/snippet}
{#snippet faqPayments()}On Pro, connect Stripe and set a price per booking page. Guests pay when they book, and refunds follow your cancellation rules.{/snippet}
{#snippet faqTeam()}Yes. Teams share round-robin links and one bill. Talk to us for teams over 20.{/snippet}

<SaasShell
	name="openslot"
	symbol="Os"
	tagline="Scheduling links that check every calendar you have, in every time zone."
	nav={["Features", "Use cases", "Pricing", "For teams"]}
	cta="Get your link"
	signature={23.8}
	footer={[
		{ title: "Product", links: ["Booking pages", "Time zones", "Reminders", "Payments", "Pricing"] },
		{ title: "Use cases", links: ["Sales", "Recruiting", "Teaching", "Clinics"] },
		{ title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
		{ title: "Help", links: ["Guides", "Connect a calendar", "Status"] },
	]}
>
	<div class="flex flex-col gap-14 md:gap-20">
		<Container class="flex flex-col gap-10">
			<HeroTitle class="max-w-[46rem]">Let people book time with you. Skip the back-and-forth.</HeroTitle>
			<div class="flex flex-col gap-8 border-t pt-8 md:flex-row md:items-end md:justify-between">
				<HeroLede class="max-w-[34rem]">
					Share one link. People see when you're free, pick a time that suits them and get the invite. Openslot checks all your calendars, so you're never booked twice.
				</HeroLede>
				<div class="flex shrink-0 flex-col gap-4 md:items-end">
					<HeroActions class="pt-0">
						<ButtonLink href="#" size="lg" class="px-5">
							Get your free link
						</ButtonLink>
						<ButtonLink href="#" size="lg" variant="outline" class="px-5">
							See it in action
						</ButtonLink>
					</HeroActions>
					<HeroNotes>
						<HeroNote>Free forever for one person</HeroNote>
						<HeroNote>Works with Google and iCloud</HeroNote>
					</HeroNotes>
				</div>
			</div>
		</Container>

		<InverseBand>
			<Container class="flex flex-col gap-6">
				<p class="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
					<span>This is what your guests see. Try booking a call.</span>
					<span class="font-mono text-[0.8125rem]">openslot.com/lena/intro</span>
				</p>
				<Booking />
			</Container>
		</InverseBand>
	</div>

	<Section>
		{#snippet title()}One link, wherever people find you{/snippet}
		{#snippet intro()}Your link never changes. Put it everywhere once, and it keeps showing your real free times.{/snippet}
		<div class="flex flex-col gap-8">
			<LinkBar url="https://openslot.com/lena/intro" />
			<FeatureCards items={share} />
		</div>
	</Section>

	<Section>
		{#snippet title()}Time zones, handled{/snippet}
		{#snippet intro()}Guests see your free times in their own time zone. Times that land in their night are quietly left out. Pick a city to see.{/snippet}
		<TimeZones />
	</Section>

	<Section>
		{#snippet title()}Your calendar stays in charge{/snippet}
		{#snippet intro()}Openslot follows the rules you set, so a booking is always one you actually want.{/snippet}
		<FeatureGrid items={features} />
	</Section>

	<Section>
		{#snippet title()}Made for the way you meet{/snippet}
		{#snippet intro()}Four of the ways people use Openslot, each with a booking page to start from.{/snippet}
		<Tabs bind:value={tab} class="gap-8">
			<TabsList variant="line" class="w-full justify-start overflow-x-auto border-b pb-1">
				{#each uses as u (u.value)}
					<TabsTrigger value={u.value} class="flex-none px-3 after:bg-primary">
						{u.label}
					</TabsTrigger>
				{/each}
			</TabsList>
			{#each uses as u (u.value)}
				<TabsContent value={u.value} class="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
					<div class="flex flex-col gap-4">
						<h3 class="text-2xl font-medium tracking-[-0.02em]">{u.title}</h3>
						<p class="max-w-prose text-base leading-relaxed text-muted-foreground">{u.body}</p>
						<CheckList items={u.points} class="mt-2 [&_li]:text-[0.9375rem]" />
					</div>
					<OutlineCard class="gap-4">
						<span class="flex items-center gap-2 text-xs text-muted-foreground">
							<CalendarClock class="lucide size-3.5" />
							Booking page
						</span>
						<h4 class="text-lg font-medium">{u.event.name}</h4>
						<dl class="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-y-2.5 border-t pt-4 text-[0.875rem]">
							<dt class="text-muted-foreground">Length</dt>
							<dd>{u.event.length}</dd>
							<dt class="text-muted-foreground">Where</dt>
							<dd>{u.event.where}</dd>
							<dt class="text-muted-foreground">Asks guests</dt>
							<dd class="flex flex-col gap-1">
								{#each u.event.questions as q (q)}
									<span>{q}</span>
								{/each}
							</dd>
						</dl>
					</OutlineCard>
				</TabsContent>
			{/each}
		</Tabs>
	</Section>

	<Section>
		{#snippet title()}Connects to the tools you use{/snippet}
		{#snippet intro()}Calendars to check, places to meet and a way to get paid.{/snippet}
		<div class="grid gap-x-8 gap-y-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each connects as c (c.title)}
				<div class="flex flex-col gap-4">
					<h3 class="text-sm text-muted-foreground">{c.title}</h3>
					<ul class="flex flex-col gap-3">
						{#each c.items as it (it.name)}
							<li class="flex items-center gap-3 font-medium">
								<IconTile class="text-foreground">
									<BrandIcon icon={it.icon} class="size-4" />
								</IconTile>
								{it.name}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</Section>

	<RingStats
		items={[
			{ value: "4 min", label: "to set up your first link", ring: 0.25 },
			{ value: "73%", label: "fewer no-shows with text reminders", ring: 0.73 },
			{ value: "5", label: "calendars checked at once on Pro", ring: 5 },
		]}
	/>

	<Section>
		{#snippet title()}People who stopped emailing about times{/snippet}
		{#snippet intro()}Sales teams, clinics, recruiters and teachers, a month after they switched.{/snippet}
		<div class="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
			{#each quotes as q (q.name)}
				{#snippet words()}{q.quote}{/snippet}
				<QuoteCard quote={words} name={q.name} role={q.role} />
			{/each}
		</div>
	</Section>

	<Section>
		{#snippet title()}Free for one. Pro for everything.{/snippet}
		{#snippet intro()}One plan for people, one for teams. No per-booking fees, ever.{/snippet}
		<div class="flex flex-col gap-4">
			<PricingPlans plans={plans} />
			<OutlineCard class="flex-row flex-wrap items-center justify-between gap-4">
				<span class="flex items-center gap-4">
					<IconTile>
						<Users class="lucide" />
					</IconTile>
					<span class="flex flex-col gap-0.5">
						<span class="text-lg font-medium tracking-[-0.01em]">Teams</span>
						<span class="text-[0.9rem] text-muted-foreground">Round robin, shared links and one bill, from $10 per person.</span>
					</span>
				</span>
				<ButtonLink href="#" variant="outline" size="lg" class="px-5">
					See team pricing
				</ButtonLink>
			</OutlineCard>
		</div>
	</Section>

	<Section>
		{#snippet title()}Questions people ask{/snippet}
		{#snippet intro()}Straight answers about calendars, guests and payments.{/snippet}
		<Faq items={faq} />
	</Section>

	<CtaBand title="Share your link today.">
		{#snippet body()}Connect a calendar, set your hours and send your first link. It takes about four minutes, and it's free for one person forever.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">
				Get your free link
			</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">
				See it in action
			</ButtonLink>
		{/snippet}
	</CtaBand>
</SaasShell>
