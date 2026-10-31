<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import Glass from '$brand/components/glass.svelte';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import SquareRatingRow from '$moves/dovetail/square-rating-row.svelte';
	import OxideQuoteCard from '$moves/dovetail/oxide-quote-card.svelte';
	import StatSlab from '$moves/dovetail/stat-slab.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import RevealStage from '$moves/site-dovetail/reveal-stage.svelte';
	import SourceStrip from '$moves/site-dovetail/source-strip.svelte';
	import ContextBoard from '$moves/site-dovetail/context-board.svelte';
	import FeatureTabs from '$moves/site-dovetail/feature-tabs.svelte';
	import SourceGrid from '$moves/site-dovetail/source-grid.svelte';
	import ReplicaChat from '$moves/site-dovetail/replica-chat.svelte';
	import CapabilityOrbit from '$moves/site-dovetail/capability-orbit.svelte';
	import LoopSteps from '$moves/site-dovetail/loop-steps.svelte';
	import GovernGrid from '$moves/site-dovetail/govern-grid.svelte';
	import StoryRail from '$moves/site-dovetail/story-rail.svelte';
	import { stories } from '$moves/site-dovetail/stories';
	import { to } from '$moves/site-dovetail/site';

	const trust = [
		{ label: 'Reviewer score', value: '4.7', score: 4.7, example: true },
		{ label: 'Sources', value: '30+' },
		{ label: 'Languages', value: '40+' }
	];

	const build = [
		{ title: 'Turn every interaction into context', body: 'Connect 30+ sources — help desks, CRMs, survey tools, app-store reviews — so people and agents work from every customer conversation, not only the ones sitting in their own inbox.', link: 'Browse integrations' },
		{ title: 'Process each conversation once', body: 'Everything is indexed, tagged and embedded the moment it lands, so you are not paying a model to re-read the same transcript for every new question.', link: 'How processing works' },
		{ title: 'Hand context to your AI tools', body: 'One MCP server gives Claude, Cursor and whichever assistant your team opens next the same cited customer context.', link: 'Set up the MCP server' },
		{ title: 'Fit the stack you already run', body: 'Push findings to Linear, Jira, Notion or Confluence and pull account data from your warehouse, so every insight knows who said it and what they pay.', link: 'See the API' }
	];
	const focus = [
		['Zendesk', 'Intercom', 'HubSpot', 'Typeform', 'Google Play', 'App Store', 'Trustpilot', 'Qualtrics'],
		['Google Meet', 'Zoom', 'Loom', 'Gmail', 'Google Drive'],
		['Claude', 'Cursor', 'GitHub'],
		['Linear', 'Jira', 'Notion', 'Confluence', 'Snowflake', 'Airtable']
	];
	const captions = ['30+ sources', 'Processed once', 'Over MCP', 'Two-way sync'];

	const prompt = [
		{ title: 'Simulate customers and segments', body: 'Build lasting replicas of a customer, a persona or a whole market segment from real evidence, then run quick interviews and usability checks against them before you build.', link: 'Explore Replicas' },
		{ title: 'Bring evidence into every build', body: 'Product specs and coding prompts pull the relevant quotes and clips automatically, so the reason for a change travels with the change.', link: 'See evidence in specs' },
		{ title: 'Line the team up behind the customer', body: 'Sales, support and design ask the same replica and get the same cited answer, instead of arguing from their own slide decks.', link: 'Read how teams use it' },
		{ title: 'Automate whole workflows', body: 'Chain questions, briefs and handoffs into agents that run on a schedule or the moment new feedback lands.', link: 'Meet Agents' }
	];
	const turns = [
		{ persona: 'Commuter segment', role: 'Replica · 46 accounts', ask: 'Would you pay more for downloads that survive a dead zone?', answer: 'Most of us would. 38 accounts raised offline playback without being asked, and three named it as the reason they cancelled.', cites: ['Ticket #4471', 'Interview · 12 Mar', 'Churn survey'] },
		{ persona: 'Family plan owner', role: 'Replica · 112 accounts', ask: 'What should the spec for shared profiles get right?', answer: 'Keep kids’ history out of my recommendations and let me lock explicit tracks per profile. Both come up in almost every family interview.', cites: ['Interview · 4 Feb', 'Review · App Store', 'Ticket #3920'] },
		{ persona: 'Support lead', role: 'Replica · built from 9k tickets', ask: 'What is the one thing sales keeps promising that support can’t deliver?', answer: 'Bulk invoice export. It shows up in 61 deal notes and 140 tickets, and support currently does it by hand.', cites: ['Deal notes', 'Ticket cluster', 'QBR recording'] },
		{ persona: 'Churn analyst', role: 'Agent · runs Mondays', ask: 'Summarize last week’s cancellation reasons for the exec channel.', answer: 'Pricing fell to second. Offline playback is now the top reason, up 18% week on week, concentrated in two regions.', cites: ['Cancellation survey', 'Signals: Churn', 'Usage export'] }
	];

	const caps = [
		{ name: 'Indexing', body: 'Every piece of feedback is indexed the moment it lands, ready for keyword and meaning-based search across the workspace.' },
		{ name: 'Classification', body: 'Feedback is sorted into themes, topics and sentiment automatically, using the taxonomy your team defines.' },
		{ name: 'Synthesis', body: 'Patterns across thousands of conversations come together into themes and summaries someone can act on.' },
		{ name: 'Embedding', body: 'Content becomes vectors, so models can find related feedback by meaning rather than exact words.' },
		{ name: 'Enrichment', body: 'Account and plan data is joined onto each insight, so you always know who said it and what they are worth.' },
		{ name: 'Redaction', body: 'Personal and confidential details are found from your own rules, then blurred or deleted before anyone sees them.' },
		{ name: 'Transcription', body: 'Calls, interviews and videos are transcribed, with each line linked back to the second it was said.' },
		{ name: 'Translation', body: 'Transcripts are translated with current LLM translation models, so global research reads as one corpus.' },
		{ name: 'Speakers', body: 'Voices are detected and separated in every recording, so it is always clear who said what.' },
		{ name: 'OCR', body: 'Text inside screenshots, images and scanned documents is pulled out and made searchable with everything else.' }
	];

	const steps = [
		{ title: 'Stack-ranked ideas', body: 'Signals groups related feedback into ideas backed by evidence, shows the accounts behind each one and ranks them by customer and revenue impact.', mock: 'rank' as const },
		{ title: 'Faster discovery', body: 'Transcription, summaries, tagging, clustering and reporting run end to end with guardrails, so a round of research takes days, not weeks.', mock: 'pipeline' as const },
		{ title: 'Synthesized into context', body: 'Trends and studies become requirement docs, exec summaries and strategy notes — with the evidence still attached.', mock: 'doc' as const },
		{ title: 'Handed to coding agents', body: 'Send bugs, requests and usability issues straight to Claude Code or Cursor. When the fix ships, new feedback flows back in and the loop starts over.', mock: 'handoff' as const },
		{ title: 'Closed with customers', body: 'Agents follow up with everyone who raised the issue, so customers see their input land and keep talking to you.', mock: 'reply' as const }
	];

	const govern = [
		{ title: 'Multiplayer AI', body: 'One workspace for every team. Share agents, skills and outputs so AI work compounds instead of vanishing into private chats.', kind: 'share' as const },
		{ title: 'Privacy built in', body: 'Names, faces and voices are redacted automatically. Set retention, and host and run inference in the US, EU or Australia.', kind: 'redact' as const },
		{ title: 'Shared standards', body: 'Set guardrails once with workspace context docs; reuse skills, templates, fields and tags everywhere.', kind: 'skills' as const },
		{ title: 'Predictable spend', body: 'Roll agents and replicas out widely, watch credit use per team and decide whether overages are allowed.', kind: 'usage' as const },
		{ title: 'Granular permissions', body: 'Control who sees what down to the person. Enterprise SSO sign-in, with SCIM provisioning.', kind: 'roles' as const },
		{ title: 'Enterprise-grade security', body: 'Audited for SOC 2 Type II, ISO 27001 and ISO 42001; GDPR ready, with a HIPAA add-on. (Study copy.)', kind: 'certs' as const }
	];
</script>

<svelte:head><title>Contextline — the customer context layer</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="home" />

	<RevealStage preset="oxide-bloom" class="pb-24">
		<div class="mx-auto w-full max-w-[82rem] px-4 pt-10 sm:px-6 sm:pt-14">
			<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
				<Glass variant="smoke" class="max-w-[33rem] rounded-2xl p-5 sm:p-6">
					<p class="text-[1.15rem] leading-[1.45] text-foreground sm:text-[1.25rem]">
						<b class="font-semibold">The customer context layer</b> that turns every sales call, support ticket and interview into context for agents — each line tied to its source and the revenue behind it.
					</p>
					<div class="mt-5 flex flex-wrap gap-2.5">
						<Button size="lg" href={to('contact')}>Book a demo</Button>
						<Button size="lg" variant="outline" href={to('pricing')}>Start free</Button>
					</div>
				</Glass>
				<Glass variant="smoke" class="self-start rounded-xl px-5 py-4 lg:self-auto"><SquareRatingRow items={trust} /></Glass>
			</div>
			<AccentHeadline as="h1" size="mega" tint="primary" class="mt-16 max-w-[13ch] [text-shadow:0_2px_48px_var(--background)] sm:mt-24">
				Ground every <InlineGlyph kind="tile" preset="oxide-bloom" /> agent in <em>facts</em>
			</AccentHeadline>
			<SourceStrip class="mt-16 sm:mt-20" />
			<ContextBoard class="mt-14 sm:mt-16" />
		</div>
	</RevealStage>

	<FeatureTabs lede="From support queues to call recordings, Contextline processes every customer interaction once, up front, and keeps it in a live system of record that is rich in context." items={build}>
		{#snippet heading()}
			<AccentHeadline size="xl" tint="primary" class="max-w-[14ch]">Build your <em>customer</em> <InlineGlyph kind="rings" /> context layer</AccentHeadline>
		{/snippet}
		{#snippet visual(i)}<SourceGrid focus={focus[i]} caption={captions[i]} />{/snippet}
	</FeatureTabs>

	<section class="mx-auto grid w-full max-w-[82rem] gap-4 px-4 sm:px-6 lg:grid-cols-[2fr_1fr]">
		<OxideQuoteCard texture="rain" quote="Efficiency is the whole point for us. With the AI layer we get far more out of customer data we already had sitting around. It changed how the team works." name="Imogen Sato" role="Head of research ops, a regional bank — invented example" />
		<StatSlab value="30h" label="Saved per person, every week" detail="A full working week back. Example figure for this study." face="dot" />
	</section>

	<section class="py-24 sm:py-36">
		<div class="mx-auto flex w-full max-w-[82rem] flex-col items-center px-4 text-center sm:px-6">
			<AccentHeadline size="xl" tint="primary" class="max-w-[14ch]">Turn raw <InlineGlyph kind="stack" preset="hammered-copper" /> data into <em>rich</em> context</AccentHeadline>
			<p class="mt-8 max-w-[44rem] text-[1.2rem] leading-[1.5] text-foreground sm:text-[1.35rem]">A multimodal engine reads millions of pieces of raw feedback — text, documents, audio and video — and turns them into structured context, ready for your next prompt.</p>
			<div class="mt-8 flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('pricing')}>Start free</Button>
			</div>
		</div>
		<CapabilityOrbit {caps} class="mt-10" />
	</section>

	<FeatureTabs flip lede="Keep customer evidence at the centre of decisions and coding prompts. Test an idea against a replica, get cited answers from agents and carry context into the tools you build with." items={prompt}>
		{#snippet heading()}
			<AccentHeadline size="xl" tint="primary" class="max-w-[13ch]">Put the customer in <em>every</em> <InlineGlyph kind="term" /> prompt</AccentHeadline>
		{/snippet}
		{#snippet visual(i)}<ReplicaChat turn={turns[i]} preset={['copper-sweep', 'sediment', 'brushed-alloy', 'oxide-bloom'][i]} />{/snippet}
	</FeatureTabs>

	<section class="mx-auto grid w-full max-w-[82rem] gap-4 px-4 sm:px-6 lg:grid-cols-[2fr_1fr]">
		<OxideQuoteCard texture="patina" quote="The best moment is watching a stakeholder search the repository and find something that genuinely surprises them. That look is how I measure the return." name="Teo Marsh" role="Staff UX researcher — invented example" />
		<StatSlab value="66%" label="Faster to ship" detail="From discovery to delivery, without cutting corners. Example figure." face="dot" tone="ink" />
	</section>

	<section class="py-24 sm:py-36">
		<div class="mx-auto flex w-full max-w-[82rem] flex-col items-center px-4 text-center sm:px-6">
			<AccentHeadline size="xl" tint="primary" class="max-w-[13ch]">Make your <em>software</em> <InlineGlyph kind="square" preset="lava-fissures" /> self-improving</AccentHeadline>
			<p class="mt-8 max-w-[44rem] text-[1.2rem] leading-[1.5] text-foreground sm:text-[1.35rem]">Shrink the gap between feedback and shipped code. Agents watch what customers say, draft requirement docs and hand work to Linear, Jira, Claude or Cursor over MCP.</p>
			<div class="mt-8 flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('product')}>See Agents</Button>
			</div>
		</div>
		<LoopSteps {steps} class="mt-20" />
	</section>

	<section class="pb-24 sm:pb-36">
		<div class="mx-auto w-full max-w-[82rem] px-4 sm:px-6">
			<AccentHeadline size="xl" tint="primary" class="max-w-[13ch]">Govern customer <em>context</em> at scale</AccentHeadline>
			<p class="mt-8 max-w-[46rem] text-[1.2rem] leading-[1.5] text-foreground sm:text-[1.35rem]">Roll agents out to every team without loosening security: reusable skills, access down to the person, automatic PII redaction, a full audit log, spend tracking and a kill switch.</p>
		</div>
		<GovernGrid cards={govern} class="mt-16" />
	</section>

	<StoryRail stories={stories.slice(0, 6)} class="border-t border-[color-mix(in_oklab,var(--foreground)_10%,transparent)]">
		{#snippet heading()}<AccentHeadline size="lg">Straight from the people using it</AccentHeadline>{/snippet}
	</StoryRail>

	<ProofCrowd>
		{#snippet after()}
			<div class="flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('pricing')} class="bg-background">Start free</Button>
			</div>
		{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
