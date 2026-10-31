<script lang="ts">
	import FaqList from '$brand/blocks/content/faq-list.svelte';
	import type { FaqItem } from '$brand/blocks/content/types.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Languages from '@lucide/svelte/icons/languages';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Server from '@lucide/svelte/icons/server';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import PricingTiers from '$moves/site-framer/pricing-tiers.svelte';
	import ProofStrip from '$moves/site-framer/proof-strip.svelte';
	import CompareTable from '$moves/site-framer/compare-table.svelte';
	import PromptBox from '$moves/site-framer/prompt-box.svelte';
	import { to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';

	const groups = [
		{
			title: 'Limits',
			intro: 'Fixed on Basic, flexible on Pro: pay for what you use.',
			rows: [
				{ name: 'Pages', hint: 'Custom designed pages', v: ['30', '150, then $20 per 100', 'Custom'] },
				{ name: 'CMS collections', hint: 'Places to store structured content', v: ['2', '10, then $40 per 10', 'Custom'] },
				{ name: 'CMS items', hint: 'Entries across collections', v: ['1,000', '2,500, up to 40,000', 'Custom'] },
				{ name: 'Bandwidth', hint: 'Monthly, with alerts before overage', v: ['50 GB', '100 GB, up to 2 TB', 'Custom'] },
				{ name: 'Edge locations', hint: 'Where your site is served from', v: ['20', '300+', 'All'] },
				{ name: 'Analytics history', hint: 'How far back you can look', v: ['30 days', '90 days', 'Unlimited'] }
			]
		},
		{
			title: 'Site features',
			rows: [
				{ name: 'Password protection', hint: 'Keep a site private', v: [true, true, true] },
				{ name: 'Site search', hint: 'Instant search across every page', v: [true, true, true] },
				{ name: 'Redirects', hint: 'Keep rankings when URLs move', v: [false, true, true] },
				{ name: 'Staging', hint: 'Test changes before they go live', v: [false, true, true] },
				{ name: 'Branches', hint: 'Explore changes and share previews', v: [false, true, true] }
			]
		},
		{
			title: 'Agents',
			intro: 'The agent and other AI features spend credits.',
			rows: [
				{ name: 'Credits', hint: 'Shared by everyone in the workspace', v: ['1,000 / month', '3,000 / month', 'Volume pricing'] },
				{ name: 'MCP server', hint: 'Use kiln from your coding agent', v: ['Free in preview', 'Free in preview', 'Free in preview'] }
			]
		},
		{
			title: 'Team',
			intro: 'Invite people to design, edit content and publish.',
			rows: [
				{ name: 'Viewers', hint: 'View pages and leave comments', v: ['Free', 'Free', 'Free'] },
				{ name: 'Editors', hint: 'Design, edit and publish', v: ['$20 each', '$20 each', 'Custom'] },
				{ name: 'Content editors', hint: 'CMS, translations and on-page edits', v: ['$10 each', '$10 each', 'Custom'] },
				{ name: 'Roles and permissions', hint: 'Who can view, write, design and deploy', v: [false, true, true] }
			]
		}
	];

	const faq: FaqItem[] = [
		['Credits', 'What are credits?', 'Paid plans include monthly credits that power the agent, translation and other AI features. Credits are shared across the workspace. If you run low, upgrade a site or add a top-up.'],
		['Plans', 'What does the Free plan include?', 'Free projects get 10 CMS collections, unlimited design pages, small uploads and one locale to try. You need a paid plan to connect your own domain.'],
		['Plans', 'Which plan should I pick?', 'Free suits non-commercial work. Basic suits students, freelancers and small studios. Pro is for teams that run their whole marketing site here. Enterprise is for teams that need custom limits, invoicing and named support.'],
		['Billing', 'How are extra editors billed?', 'Per seat, added any time. We email you when someone is added, and the charge appears within a day.'],
		['Billing', 'What happens if I go over a limit?', 'For pages and collections we ask you to upgrade. For bandwidth you can go over for one month, and we tell you by email first.'],
		['Billing', 'Do you offer refunds?', 'Where the law gives you a cooling-off period, yes. Write to support within 14 days of buying and we will cancel and refund the subscription.'],
		['Plans', 'My open-source project gets a lot of traffic. Can you help?', 'Often, yes. Non-commercial and open-source projects can ask us for higher limits.']
	];
</script>

<svelte:head><title>kiln pricing</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="pricing" />

	<section class="{wrap} pt-16 pb-20 md:pt-24">
		<SectionHead as="h1" size="xl" title="Start free. Pay when the site grows." class="mb-12" />
		<PricingTiers />
	</section>

	<section class="{wrap} pb-24"><ProofStrip label="Teams on Pro and Enterprise (names invented for this study)" /></section>

	<section class="{wrap} pb-24">
		<SectionHead title="Compare plans" size="md" />
		<CompareTable {groups} />
	</section>

	<section class="{wrap} pb-24">
		<SectionHead title="Add-ons" size="md" lede="Power up one site at a time. Cancel whenever you like." class="mb-10" />
		<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-3">
			{#each [{ i: Languages, t: 'Translation', p: '$20', u: 'per locale', b: 'Translate the whole site with the agent, up to 20 languages.' }, { i: FlaskConical, t: 'Experiments', p: '$50', u: 'per 500k events', b: 'A/B tests, funnels and triggers, up to five tests at once.' }, { i: Server, t: 'Advanced hosting', p: '$200', u: 'per month', b: 'Several sites on one domain, custom headers and firewall rules.' }] as a (a.t)}
				<div class="flex flex-col bg-background p-6 md:p-7">
					<a.i class="lucide size-5 text-primary" />
					<p class="mt-8 text-xl font-medium tracking-[-0.02em]">{a.t}</p>
					<p class="mt-1 text-[1.0625rem] leading-snug text-foreground/75">{a.b}</p>
					<p class="mt-6 flex items-baseline gap-1.5"><span class="text-4xl font-semibold tracking-[-0.04em]">{a.p}</span><span class="text-foreground/65">{a.u}</span></p>
				</div>
			{/each}
		</div>
		<p class="mt-5 text-sm text-foreground/60">Prices are monthly and billed on the cycle you choose. Sales tax is added at checkout where it applies.</p>
	</section>

	<section class="{wrap} pb-8">
		<div class="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
			<div>
				<SectionHead title="Questions" size="md" />
				<a href={to('contact')} class="mt-6 inline-flex items-center gap-1.5 text-lg hover:text-primary">Still stuck? Talk to us<ArrowRight class="lucide size-4" /></a>
			</div>
			<FaqList items={faq} />
		</div>
	</section>

	<SiteFooter preset="hammered-copper">
		{#snippet cta()}
			<div class="flex flex-col items-center text-center">
				<h2 class="text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.055em]">Your next idea starts here<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h2>
				<PromptBox glow={false} class="mt-10" />
			</div>
		{/snippet}
	</SiteFooter>
</div>
