<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import SourceStrip from '$moves/site-dovetail/source-strip.svelte';
	import PlanPair from '$moves/site-dovetail/plan-pair.svelte';
	import CompareTable from '$moves/site-dovetail/compare-table.svelte';
	import FaqSplit from '$moves/site-dovetail/faq-split.svelte';
	import { to } from '$moves/site-dovetail/site';

	const free = {
		name: 'Free',
		price: '$0',
		note: 'no card needed',
		pitch: 'For one person making sense of calls, documents and surveys.',
		cta: 'Try Contextline free',
		href: to('contact'),
		listTitle: 'What’s included',
		items: ['One Signal that sorts your incoming feedback automatically', 'One Study for calls, recordings, docs and surveys', 'Ask questions of your data and summarize trends']
	};
	const paid = {
		name: 'Enterprise',
		price: 'Custom',
		note: 'priced to your seats and sources',
		pitch: 'For organizations rolling customer context out across many teams, with the controls to match.',
		cta: 'Talk to sales',
		href: to('contact'),
		listTitle: 'Everything in Free, plus',
		items: [
			'Unlimited Agents that watch every signal and close the loop',
			'Unlimited Signals to classify feedback as it lands',
			'Boards that chart customer signals around the clock',
			'Unlimited Studies and Briefs with clips and highlight reels',
			'Unlimited questions from Slack and Teams',
			'Folders, global tags, fields and shared templates',
			'Semantic search and custom summaries',
			'Redaction, compliance and access control',
			'Named success manager and onboarding'
		]
	};

	const groups = [
		{
			title: 'Centralize every piece of feedback',
			lede: 'One searchable source of truth that pulls every customer interaction into a single organized repository.',
			rows: [
				{ name: 'Integrations', hint: '30+ sources: help desks, CRMs, survey tools, app stores and call recorders.', free: true, paid: true },
				{ name: 'Calendar sync', hint: 'Join and record scheduled customer calls automatically.', free: true, paid: true },
				{ name: 'Search', hint: 'Keyword and meaning-based search across everything you have connected.', free: true, paid: true },
				{ name: 'Contacts', hint: 'A record for every person and account behind the feedback.', free: false, paid: true },
				{ name: 'Folders & templates', hint: 'Shared structure for studies, so every team files work the same way.', free: false, paid: true },
				{ name: 'Global tags & fields', hint: 'One taxonomy and metadata scheme across the whole workspace.', free: false, paid: true },
				{ name: 'Bulk import', hint: 'Load years of historical research and tickets in one go.', free: false, paid: true },
				{ name: 'API access', hint: 'Read and write everything programmatically.', free: true, paid: true },
				{ name: 'CRM sync', hint: 'Two-way sync of account and deal data with your CRM.', free: false, paid: true }
			]
		},
		{
			title: 'Analyze what customers say',
			lede: 'Let AI turn high-volume feedback into always-on intelligence, so the next thing to build is obvious.',
			rows: [
				{ name: 'Opportunity tracking', hint: 'Signals that cluster feedback into ranked opportunities.', free: '1 Signal', paid: 'Unlimited' },
				{ name: 'Ask', hint: 'Chat with your data and get cited answers.', free: 'Basic', paid: 'Advanced' },
				{ name: 'Summaries', hint: 'Summaries of calls, studies and whole Signals.', free: 'Basic', paid: 'Advanced' },
				{ name: 'Boards', hint: 'Live charts of customer signals.', free: '1 Board', paid: 'Unlimited' },
				{ name: 'Study customization', hint: 'Custom fields, views and layouts per study.', free: true, paid: true },
				{ name: 'Slack & Teams questions', hint: 'Ask Contextline from the chat tools you already use.', free: false, paid: true },
				{ name: 'Clustering', hint: 'Automatic grouping of related feedback.', free: true, paid: true }
			]
		},
		{
			title: 'Act on what you learn',
			lede: 'Close the gap between discovery and delivery: share AI-written insight, or automate the whole process with agents.',
			rows: [
				{ name: 'Agents', hint: 'Background agents that watch feedback and act on it.', free: false, paid: true },
				{ name: 'Briefs', hint: 'Shareable insight docs with clips attached.', free: true, paid: true },
				{ name: 'Translation', hint: 'Transcripts and briefs in 40+ languages.', free: false, paid: true },
				{ name: 'Suggested actions', hint: 'Next steps proposed from new evidence.', free: false, paid: true },
				{ name: 'Comments & mentions', hint: 'Discuss evidence where it lives.', free: true, paid: true },
				{ name: 'Highlight reels', hint: 'Stitch the best moments into a shareable reel.', free: true, paid: true }
			]
		},
		{
			title: 'Platform',
			sub: 'Security',
			badges: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
			rows: [
				{ name: 'Single sign-on', hint: 'SAML SSO with your identity provider.', free: false, paid: true },
				{ name: 'Access control', hint: 'Roles and restricted folders down to one person.', free: false, paid: true },
				{ name: 'Security reviews', hint: 'Our team completes your questionnaire.', free: false, paid: true },
				{ name: 'Redaction', hint: 'Automatic removal of personal data.', free: false, paid: true },
				{ name: 'Custom retention', hint: 'Choose how long raw data is kept.', free: false, paid: true },
				{ name: 'Audit log', hint: 'Every action, exportable.', free: false, paid: true }
			]
		},
		{
			title: 'Platform',
			sub: 'Support',
			rows: [
				{ name: 'Onboarding', hint: 'Guided setup for your first teams.', free: false, paid: true },
				{ name: 'Success manager', hint: 'A named person who knows your account.', free: false, paid: true },
				{ name: 'Priority support', hint: 'Faster answers from people who use the product daily.', free: false, paid: true }
			]
		}
	];

	const faqs = [
		{ q: 'How many seats do we need?', a: 'Seats are for people who add data and run analysis. Most teams buy enough for product, design, research and CX; everyone else can view and ask questions for free.' },
		{ q: 'How do we control who sees what?', a: 'Give each person a role — Manager, Contributor or Viewer — or restrict a study or folder to named people. Admins can manage access by group.' },
		{ q: 'Can we pause a subscription?', a: 'Not today, but you can drop to the Free plan whenever you need a break and upgrade again later without losing data.' },
		{ q: 'What happens if we cancel?', a: 'You keep full access until the end of the period you have paid for. After that the workspace moves to the Free plan.' },
		{ q: 'Can you invoice us?', a: 'Yes. Enterprise plans are invoiced on net-30 terms, so finance can pay it like any other vendor.' },
		{ q: 'Which currencies do you bill in?', a: 'All plans are billed in US dollars so pricing stays consistent wherever your team sits.' },
		{ q: 'How is tax handled?', a: 'Prices exclude tax. GST, VAT or sales tax is added to the invoice where it applies.' }
	];
</script>

<svelte:head><title>Pricing — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="pricing" />

	<section class="relative isolate overflow-hidden">
		<RustGridField cell={44} radius={1.8} gap={2} fade="bottom" stain="--foreground" class="-z-10" />
		<div class="mx-auto w-full max-w-[82rem] px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
			<MonoChip mark="square">Pricing</MonoChip>
			<AccentHeadline as="h1" size="xl" tint="primary" class="mt-6 max-w-[12ch]">Start free.<br /><em>Scale</em> when ready.</AccentHeadline>
		</div>
	</section>

	<div class="mx-auto w-full max-w-[82rem] px-4 sm:px-6">
		<PlanPair {free} {paid} />
	</div>

	<SourceStrip label="Reads from the tools your customers already use" class="py-24" />

	<CompareTable {groups} />

	<FaqSplit items={faqs} />

	<ProofCrowd lines={['Pay', 'for', 'proof,', 'not', 'guesses']} accent={4}>
		{#snippet after()}
			<div class="flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Talk to sales</Button>
				<Button size="lg" variant="outline" href={to('contact')} class="bg-background">Start free</Button>
			</div>
		{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
