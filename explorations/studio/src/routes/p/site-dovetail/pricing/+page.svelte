<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import AccentHeadline from '$moves/site-dovetail/accent-headline.svelte';
	import SourceStrip from '$moves/site-dovetail/source-strip.svelte';
	import TierCards, { type Tier } from '$moves/site-dovetail/tier-cards.svelte';
	import CompareTable from '$moves/site-dovetail/compare-table.svelte';
	import FaqSplit from '$moves/site-dovetail/faq-split.svelte';
	import { to } from '$moves/site-dovetail/site';

	const tiers: Tier[] = [
		{
			name: 'Free',
			pitch: 'For one person making sense of calls, documents and surveys.',
			month: 0,
			year: 0,
			unit: 'forever',
			cta: 'Start free',
			href: to('contact'),
			art: 'ring',
			listTitle: 'What’s included',
			items: ['One Signal that sorts incoming feedback automatically', 'One Study for calls, recordings, docs and surveys', 'Ask questions of your data with cited answers', 'Three integrations and the API']
		},
		{
			name: 'Team',
			pitch: 'For a product trio or research team sharing one source of customer truth.',
			month: 49,
			year: 39,
			unit: 'per seat / month',
			cta: 'Start a 14-day trial',
			href: to('contact'),
			art: 'material',
			preset: 'copper-sweep',
			badge: 'Most teams',
			listTitle: 'Everything in Free, plus',
			items: ['Ten Signals and five live Boards', 'Unlimited Studies, Briefs and highlight reels', 'Questions from Slack and Teams', 'Contacts, folders and shared templates', 'Two scheduled Agents']
		},
		{
			name: 'Enterprise',
			pitch: 'For organizations rolling customer context out across many teams, with the controls to match.',
			month: null,
			year: null,
			unit: '',
			cta: 'Talk to sales',
			href: to('contact'),
			art: 'oxide',
			listTitle: 'Everything in Team, plus',
			items: ['Unlimited Agents, Signals and Boards', 'SSO, SCIM and access down to one person', 'Automatic redaction and custom retention', 'CRM sync and bulk historical import', 'A named success manager and onboarding']
		}
	];
	const plans = [
		{ name: 'Free', price: '$0 forever', cta: 'Start free', href: to('contact') },
		{ name: 'Team', price: 'From $39 / seat', cta: 'Start trial', href: to('contact') },
		{ name: 'Enterprise', price: 'Custom', cta: 'Talk to sales', href: to('contact') }
	];
	const team: Record<string, boolean | string> = {
		Contacts: true, 'Folders & templates': true, 'Global tags & fields': false, 'Bulk import': false, 'CRM sync': false,
		'Opportunity tracking': '10 Signals', Ask: 'Advanced', Summaries: 'Advanced', Boards: '5 Boards', 'Slack & Teams questions': true,
		Agents: '2 scheduled', Translation: true, 'Suggested actions': false,
		'Single sign-on': false, 'Access control': 'Folder-level', 'Security reviews': false, Redaction: false, 'Custom retention': false, 'Audit log': false,
		Onboarding: 'Self-serve', 'Success manager': false, 'Priority support': true
	};

	const groups = [
		{
			title: 'Centralize every piece of feedback',
			lede: 'One searchable source of truth that pulls every customer interaction into a single organized repository.',
			rows: [
				{ name: 'Integrations', hint: '30+ sources: help desks, CRMs, survey tools, app stores and call recorders.', v: [true, team['Integrations'] ?? true, true] },
				{ name: 'Calendar sync', hint: 'Join and record scheduled customer calls automatically.', v: [true, team['Calendar sync'] ?? true, true] },
				{ name: 'Search', hint: 'Keyword and meaning-based search across everything you have connected.', v: [true, team['Search'] ?? true, true] },
				{ name: 'Contacts', hint: 'A record for every person and account behind the feedback.', v: [false, team['Contacts'] ?? true, true] },
				{ name: 'Folders & templates', hint: 'Shared structure for studies, so every team files work the same way.', v: [false, team['Folders & templates'] ?? true, true] },
				{ name: 'Global tags & fields', hint: 'One taxonomy and metadata scheme across the whole workspace.', v: [false, team['Global tags & fields'] ?? true, true] },
				{ name: 'Bulk import', hint: 'Load years of historical research and tickets in one go.', v: [false, team['Bulk import'] ?? true, true] },
				{ name: 'API access', hint: 'Read and write everything programmatically.', v: [true, team['API access'] ?? true, true] },
				{ name: 'CRM sync', hint: 'Two-way sync of account and deal data with your CRM.', v: [false, team['CRM sync'] ?? true, true] }
			]
		},
		{
			title: 'Analyze what customers say',
			lede: 'Let AI turn high-volume feedback into always-on intelligence, so the next thing to build is obvious.',
			rows: [
				{ name: 'Opportunity tracking', hint: 'Signals that cluster feedback into ranked opportunities.', v: ['1 Signal', team['Opportunity tracking'] ?? 'Unlimited', 'Unlimited'] },
				{ name: 'Ask', hint: 'Chat with your data and get cited answers.', v: ['Basic', team['Ask'] ?? 'Advanced', 'Advanced'] },
				{ name: 'Summaries', hint: 'Summaries of calls, studies and whole Signals.', v: ['Basic', team['Summaries'] ?? 'Advanced', 'Advanced'] },
				{ name: 'Boards', hint: 'Live charts of customer signals.', v: ['1 Board', team['Boards'] ?? 'Unlimited', 'Unlimited'] },
				{ name: 'Study customization', hint: 'Custom fields, views and layouts per study.', v: [true, team['Study customization'] ?? true, true] },
				{ name: 'Slack & Teams questions', hint: 'Ask Contextline from the chat tools you already use.', v: [false, team['Slack & Teams questions'] ?? true, true] },
				{ name: 'Clustering', hint: 'Automatic grouping of related feedback.', v: [true, team['Clustering'] ?? true, true] }
			]
		},
		{
			title: 'Act on what you learn',
			lede: 'Close the gap between discovery and delivery: share AI-written insight, or automate the whole process with agents.',
			rows: [
				{ name: 'Agents', hint: 'Background agents that watch feedback and act on it.', v: [false, team['Agents'] ?? true, true] },
				{ name: 'Briefs', hint: 'Shareable insight docs with clips attached.', v: [true, team['Briefs'] ?? true, true] },
				{ name: 'Translation', hint: 'Transcripts and briefs in 40+ languages.', v: [false, team['Translation'] ?? true, true] },
				{ name: 'Suggested actions', hint: 'Next steps proposed from new evidence.', v: [false, team['Suggested actions'] ?? true, true] },
				{ name: 'Comments & mentions', hint: 'Discuss evidence where it lives.', v: [true, team['Comments & mentions'] ?? true, true] },
				{ name: 'Highlight reels', hint: 'Stitch the best moments into a shareable reel.', v: [true, team['Highlight reels'] ?? true, true] }
			]
		},
		{
			title: 'Security',
			lede: 'Audited controls for the data your customers trust you with.',
			badges: ['SOC 2', 'ISO 27001', 'GDPR', 'HIPAA'],
			rows: [
				{ name: 'Single sign-on', hint: 'SAML SSO with your identity provider.', v: [false, team['Single sign-on'] ?? true, true] },
				{ name: 'Access control', hint: 'Roles and restricted folders down to one person.', v: [false, team['Access control'] ?? true, true] },
				{ name: 'Security reviews', hint: 'Our team completes your questionnaire.', v: [false, team['Security reviews'] ?? true, true] },
				{ name: 'Redaction', hint: 'Automatic removal of personal data.', v: [false, team['Redaction'] ?? true, true] },
				{ name: 'Custom retention', hint: 'Choose how long raw data is kept.', v: [false, team['Custom retention'] ?? true, true] },
				{ name: 'Audit log', hint: 'Every action, exportable.', v: [false, team['Audit log'] ?? true, true] }
			]
		},
		{
			title: 'Support',
			lede: 'People who use the product every day, on your side.',
			rows: [
				{ name: 'Onboarding', hint: 'Guided setup for your first teams.', v: [false, team['Onboarding'] ?? true, true] },
				{ name: 'Success manager', hint: 'A named person who knows your account.', v: [false, team['Success manager'] ?? true, true] },
				{ name: 'Priority support', hint: 'Faster answers from people who use the product daily.', v: [false, team['Priority support'] ?? true, true] }
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
		<div class="w-full px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-10">
			<MonoChip mark="square">Pricing</MonoChip>
			<AccentHeadline as="h1" size="mega" tint="primary" class="mt-6 max-w-[12ch]">Start free.<br /><em>Scale</em> when ready.</AccentHeadline>
		</div>
	</section>

	<div class="w-full px-4 sm:px-6 lg:px-10">
		<TierCards {tiers} />
	</div>

	<SourceStrip label="Reads from the tools your customers already use" class="py-24" />

	<CompareTable {groups} {plans} />

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
