<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Zap from '@lucide/svelte/icons/zap';
	import Crown from '@lucide/svelte/icons/crown';
	import Megaphone from '@lucide/svelte/icons/megaphone';
	import Target from '@lucide/svelte/icons/target';
	import Search from '@lucide/svelte/icons/search';
	import Archive from '@lucide/svelte/icons/archive';
	import Thermometer from '@lucide/svelte/icons/thermometer';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import GlassStage from '$moves/flora/glass-stage.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import OxideHeroBand from '$moves/site-dovetail/oxide-hero-band.svelte';
	import AgentBuilder from '$moves/site-dovetail/agent-builder.svelte';
	import SourceStrip from '$moves/site-dovetail/source-strip.svelte';
	import MaterialReel from '$moves/site-dovetail/material-reel.svelte';
	import NumberedFeature from '$moves/site-dovetail/numbered-feature.svelte';
	import AgentAnatomy from '$moves/site-dovetail/agent-anatomy.svelte';
	import SourceGrid from '$moves/site-dovetail/source-grid.svelte';
	import ReplicaChat from '$moves/site-dovetail/replica-chat.svelte';
	import UsecaseCards from '$moves/site-dovetail/usecase-cards.svelte';
	import QuoteSlider from '$moves/site-dovetail/quote-slider.svelte';
	import NumberedPerks from '$moves/site-dovetail/numbered-perks.svelte';
	import FaqSplit from '$moves/site-dovetail/faq-split.svelte';
	import { to, tools, sinks } from '$moves/site-dovetail/site';

	const from = [...tools.slice(0, 4), ...sinks.slice(0, 4)];

	const uses = [
		{ title: 'Board-ready narrative', body: 'Turn feedback into a story for the exec team, backed by evidence and refreshed as new insight lands.', icon: Crown, prompts: ['Write this quarter’s customer narrative for the board in one page.', 'What changed in enterprise sentiment since the last QBR?'] },
		{ title: 'Marketing and growth', body: 'Draft case studies from happy customers and build campaigns in their own words.', icon: Megaphone, prompts: ['Find five customers who praised onboarding and draft a case-study outline for each.', 'Which phrases do customers use to describe us?'] },
		{ title: 'Revenue-ranked priorities', body: 'Ask what customers want most right now and get a ranked answer with the accounts behind it.', icon: Target, prompts: ['Rank the top ten requests by ARR at risk.', 'Which requests come up in lost deals but not in tickets?'] },
		{ title: 'Revenue intelligence', body: 'Surface why deals are lost, route the signal to product and sales, and track what changed.', icon: Search, prompts: ['Summarize loss reasons from last month’s calls.', 'Alert #sales when a competitor is mentioned three times in a week.'] },
		{ title: 'Workspace housekeeping', body: 'Agents audit tags, merge duplicates and flag stale studies quietly in the background.', icon: Archive, prompts: ['Merge tags that mean the same thing.', 'List studies with no activity in 90 days.'] },
		{ title: 'Support, risk and quality', body: 'Pull response-time data, flag negative sentiment and post it to the support channel.', icon: Thermometer, prompts: ['Flag tickets with angry sentiment from top-tier accounts.', 'Post a daily support-health summary to #support.'] }
	];

	const quotes = [
		{ quote: 'I search one initiative or one keyword and the context builds itself in seconds. It changed how fast we plan.', name: 'Ola Brennan', role: 'Head of UX research' },
		{ quote: 'The weekly agent digest is the first thing our PMs read on Monday. Nobody asked them to.', name: 'Rafael Ortiz', role: 'Director of product' },
		{ quote: 'We set up the handover agent once. Every new customer now arrives with a brief written from their own calls.', name: 'Hana Ikeda', role: 'Head of customer success' }
	];

	const rules = [
		{ title: 'On-demand agents', body: 'Always on and ready for any question; every word back is grounded and traceable to its source.' },
		{ title: 'In-app triggers', body: 'Start agents from Contextline events and choose exactly which tools each one may use.' },
		{ title: 'External triggers & MCP', body: 'Start agents from outside events and let them act in Linear, Figma, Notion and more.' },
		{ title: 'Scoped sources', body: 'Point each agent at only the data that matters for its output.' }
	];

	const turn = { persona: 'Mid-market buyer', role: 'Replica · 212 accounts', ask: 'Would usage-based pricing make you more or less likely to renew?', answer: 'Less, unless there is a cap. Budget predictability came up in 41 renewal calls; the accounts that churned last year cited surprise overages twice as often.', cites: ['Renewal calls', 'Churn survey', 'Ticket cluster'] };

	const faqs = [
		{ q: 'What are Contextline Agents?', a: 'Configurable agents that work alongside your team: they watch customer data, notice what changes and act across the tools you already use.' },
		{ q: 'What data do agents use?', a: 'Only the customer data connected to your workspace — calls, tickets, surveys and research.' },
		{ q: 'How are they different from general AI agents?', a: 'A general agent knows only what you paste in. A Contextline agent works from your organization’s full customer memory and cites it.' },
		{ q: 'Can I set one up with no data yet?', a: 'No. Agents analyze evidence, so connect at least one source first.' },
		{ q: 'Who can create agents?', a: 'Managers and Contributors can create and edit agents; Viewers can chat with them.' },
		{ q: 'Do I need to code?', a: 'No. Setup is entirely no-code.' }
	];
</script>

<svelte:head><title>Agents — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="product" />

	<OxideHeroBand>
		<div class="mx-auto grid w-full max-w-[82rem] gap-10 px-4 pt-16 pb-10 sm:px-6 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
			<div>
				<p class="flex items-center gap-2 text-[1.05rem] font-medium"><Zap class="lucide size-4" />Agents</p>
				<AccentHeadline as="h1" size="xl" class="mt-5 max-w-[12ch]">Outwork your <InlineGlyph kind="term" /> <em>headcount</em></AccentHeadline>
				<p class="mt-8 max-w-[34rem] text-[1.2rem] leading-[1.5] sm:text-[1.3rem]">Give your team a back office that never sleeps. Agents automate routine work, spot patterns across every customer conversation and hand insight to whoever can act on it.</p>
				<Button size="lg" href={to('contact')} class="mt-8">Request a demo</Button>
			</div>
			<div class="lg:justify-self-end">
				<p class="font-mono text-[0.6875rem] tracking-[0.16em] uppercase lg:text-right">Act on data from</p>
				<div class="mt-3 flex flex-wrap gap-1.5 lg:justify-end">
					{#each from as t (t.name)}<span class="grid size-9 place-items-center rounded-lg bg-[var(--on-orange)] text-[var(--orange)]"><BrandIcon icon={t.icon} label={t.name} class="size-4" /></span>{/each}
				</div>
			</div>
		</div>
		{#snippet below()}<div class="px-4 sm:px-6"><AgentBuilder /></div>{/snippet}
	</OxideHeroBand>

	<SourceStrip class="py-24" />

	<section class="mx-auto w-full max-w-[82rem] px-4 pb-24 text-center sm:px-6">
		<AccentHeadline size="lg" class="mx-auto max-w-[14ch]">Your team, minus the <em>busywork</em></AccentHeadline>
		<p class="mx-auto mt-6 max-w-[42rem] text-[1.2rem] leading-[1.5] text-foreground">Agents run in the background, watching customer conversations, surfacing what changed and routing each insight to the person who can act on it — every answer traceable to the conversation it came from.</p>
		<MaterialReel preset="oxide-bloom" label="Product tour" caption="Two minutes with an agent, from trigger to Slack post." class="mx-auto mt-14 max-w-[56rem] text-left" />
	</section>

	<NumberedFeature n={1} title="Set it up once, sharper every run" body="Give each agent its context and skills, then choose whether it runs on a schedule, on an event or from an outside trigger. Each run reads your latest evidence, so outputs improve with no extra work.">
		{#snippet visual()}<AgentAnatomy />{/snippet}
	</NumberedFeature>
	<NumberedFeature n={2} title="Plugs into the workflows you have" body="Agents connect over MCP to the tools your team already lives in — Linear, Jira, Notion, Figma and more. Ask a question and get the answer without leaving the thread.">
		{#snippet visual()}<SourceGrid focus={['Linear', 'Jira', 'Notion', 'Figma', 'Confluence', 'Miro', 'Claude', 'Cursor']} caption="Over MCP" />{/snippet}
	</NumberedFeature>
	<NumberedFeature n={3} title="Built for teams, not just tasks" body="Agents live in Ask, where anyone can review outputs, tweak instructions and collaborate without handing over judgment. Your team stays in charge of what ships.">
		{#snippet visual()}<ReplicaChat turn={{ persona: 'Weekly churn agent', role: 'Agent · shared with Growth', ask: 'Rewrite the summary for the sales team and drop the jargon.', answer: 'Done. Customers leaving this month mostly mention offline playback and surprise price changes. Here are the three calls worth hearing first.', cites: ['Call · 3 Oct', 'Call · 9 Oct', 'Signals: Churn'] }} preset="brushed-alloy" />{/snippet}
	</NumberedFeature>
	<NumberedFeature n={4} title="Pressure-test ideas on a replica" body="Replicas are evidence-based models of your customers and segments, built from calls, tickets, surveys and research. Talk to them in real time, with every answer traceable to its source." more="Learn about Replicas">
		{#snippet visual()}<ReplicaChat {turn} preset="sediment" />{/snippet}
	</NumberedFeature>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32">
		<AccentHeadline size="lg">Put agents to <em>work</em></AccentHeadline>
		<p class="mt-6 max-w-[38rem] text-[1.2rem] leading-[1.5] text-foreground">Always on, no nudging needed. Every output backed by real customer evidence from your workspace.</p>
		<UsecaseCards {uses} class="mt-14" />
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 pb-24 sm:px-6">
		<QuoteSlider {quotes} />
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-24 sm:px-6 sm:py-32">
		<AccentHeadline size="lg" class="max-w-[14ch]">You set the rules. Agents do the <em>rest</em>.</AccentHeadline>
		<p class="mt-6 max-w-[38rem] text-[1.2rem] leading-[1.5] text-foreground">Decide what each agent does and where its output lands, so the signal reaches exactly the work it should inform.</p>
		<NumberedPerks perks={rules} class="mt-14" />
	</section>

	<GlassStage preset="hammered-copper" glass="smoke" align="center" class="min-h-[44rem]">
		<p class="font-mono text-[0.6875rem] tracking-[0.16em] text-foreground uppercase">Customer story · 01 / 03</p>
		<h2 class="mt-5 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance text-foreground">How a kitchen-appliance brand designs every product around what owners say</h2>
		<p class="mt-5 text-[1.1rem] leading-relaxed text-foreground">A brand built over decades runs on knowing its customers. Agents keep five markets’ worth of feedback lined up behind every launch. (Invented example.)</p>
		<div class="mt-7 flex flex-wrap justify-center gap-2.5">
			<Button href={to('customers')}>Read the story</Button>
			<Button variant="outline" href={to('customers')}>All customer stories</Button>
		</div>
	</GlassStage>

	<FaqSplit items={faqs} />

	<ProofCrowd lines={['Hire', 'agents', 'that', 'cite']} accent={3}>
		{#snippet after()}<Button size="lg" href={to('contact')}>Request a demo</Button>{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
