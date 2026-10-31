<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Coins from '@lucide/svelte/icons/coins';
	import Gauge from '@lucide/svelte/icons/gauge';
	import Layers from '@lucide/svelte/icons/layers';
	import Wallet from '@lucide/svelte/icons/wallet';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import PlanCards, { type Plan } from '$moves/site-flora/plan-cards.svelte';
	import FeatureBanner from '$moves/site-flora/feature-banner.svelte';
	import TeamPool from '$moves/site-flora/team-pool.svelte';
	import CompareTable, { type Group } from '$moves/site-flora/compare-table.svelte';
	import { to } from '$moves/site-flora/site';

	const plans: Plan[] = [
		{ name: 'Free', line: 'Try the board and see how it thinks.', price: 0, cta: 'Start free', href: to('home'), features: ['1 seat', '3 open boards', 'Text and image models', 'Full canvas and layers', 'Run and save playbooks', 'Scout assistant, free', 'About 15 images on us*'] },
		{ name: 'Solo', line: 'A whole studio of your own.', price: 16, unit: '/seat/mo', cta: 'Get Solo', href: to('contact'), features: ['Pay per seat, cancel any time', 'Text, image, video and sound', 'Unlimited boards', 'Every model in the catalogue', 'API and MCP access', 'Comments and labels', 'Export everything'] },
		{ name: 'Team', line: 'Shared boards, shared pool, real-time.', price: 45, unit: '/seat/mo', cta: 'Get Team', href: to('contact'), star: true, features: ['Everything in Solo', 'One usage pool for the team', 'Shared asset library', 'Shared elements and styles', 'Live cursors and handoff', 'Spend limits per person'] },
		{ name: 'Studio', line: 'Infrastructure for the heaviest work.', price: 180, unit: '/seat/mo', cta: 'Get Studio', href: to('contact'), features: ['Everything in Team', 'Custom voices, three per org', 'Batch nodes at volume', 'Usage analytics', 'Priority rendering'] },
		{ name: 'Enterprise', line: 'Scale, security and a team behind yours.', price: null, cta: 'Contact sales', href: to('enterprise'), features: ['Everything in Studio', 'For teams of ten or more', 'SSO and SAML', 'Embedded creative lead', 'Onboarding and training', 'Dedicated support channel'] }
	];

	const pillars = [
		{ Icon: Coins, title: 'Usage included with every seat', body: 'Each teammate brings their own share of credit into the team pool. No separate maths.' },
		{ Icon: Gauge, title: 'Metered at list model prices', body: 'See what every generation cost, by board and by person, and bill clients straight from the history.' },
		{ Icon: Layers, title: 'Every model, one pool', body: 'Image, video, sound, vector and 3D models all draw from the same balance, new ones the day they launch.' },
		{ Icon: Wallet, title: 'A budget at the workspace level', body: 'Light users never strand credit that heavy users could have spent.' }
	];

	const columns = [
		{ name: 'Free', price: '$0/mo' },
		{ name: 'Solo', price: '$16/mo' },
		{ name: 'Team', price: '$45/mo' },
		{ name: 'Studio', price: '$180/mo' }
	];

	const groups: Group[] = [
		{ title: 'Canvas & editor', rows: [['Infinite canvas', true, true, true, true], ['Layered image editor', true, true, true, true], ['Comments & labels', true, true, true, true], ['Live cursors', false, true, true, true], ['Batch runs', false, true, true, true], ['Action nodes', false, true, true, true]] },
		{ title: 'Models & generation', rows: [['Every model in the catalogue', true, true, true, true], ['Generation history', false, '30 days', 'Forever', 'Forever'], ['Custom voices', false, false, false, '3 per org']] },
		{ title: 'Playbooks & automation', rows: [['Run and build playbooks', true, true, true, true], ['Playbook as an app', false, 'Just you', 'Team', 'Team']] },
		{ title: 'Collaboration & sharing', rows: [['Commenting', true, true, true, true], ['Share a board', 'View only', 'Edit', 'Edit', 'Edit']] },
		{ title: 'Assets & elements', rows: [['Personal library', false, true, true, true], ['Shared team assets', false, false, true, true], ['Shared elements', false, false, true, true]] },
		{ title: 'Export & publish', rows: [['Download & export', true, true, true, true], ['Every format, plus social publishing', false, true, true, true]] },
		{ title: 'Scout assistant', rows: [['Scout, unmetered', true, true, true, true]] },
		{ title: 'API & integrations', rows: [['API access', false, true, true, true], ['MCP access', false, true, true, true]] },
		{ title: 'Admin & security', rows: [['Workspace usage view', false, true, true, true], ['Per-person spend limits', false, false, true, true], ['Usage analytics', false, false, 'In app', 'In app'], ['SSO / SAML', false, false, false, false]] }
	];
</script>

<svelte:head><title>Pricing — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav current="Pricing" />

	<section class="relative isolate px-4 pt-20 pb-24 sm:px-8 sm:pt-28">
		<div aria-hidden="true" class="absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden [mask-image:linear-gradient(to_bottom,black,transparent)]">
			<div class="absolute -inset-16 opacity-60 [filter:blur(48px)_saturate(1.3)]">
				<ShaderMaterial preset="lava-fissures" rendering="image" loading="eager" controls={false} sizes="100vw" class="absolute inset-0 h-full w-full" />
			</div>
		</div>
		<div class="mx-auto max-w-[1320px] text-center">
			<h1 class="mx-auto max-w-[14ch] text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.95] font-medium tracking-[-0.045em] text-foreground">One canvas for the whole creative team</h1>
			<p class="mx-auto mt-6 max-w-[36ch] text-xl leading-snug text-foreground sm:text-2xl">Simple plans that grow with you. Every plan reaches every model.</p>
		</div>
		<PlanCards {plans} class="mx-auto mt-12 max-w-[1320px]" />
		<p class="mx-auto mt-8 max-w-[1320px] text-[12px] text-muted-foreground">*Based on the average cost of a standard still at list price, capped at $2.50 of usage.</p>
	</section>

	<div class="mx-auto max-w-[1320px] px-4 sm:px-8">
		<FeatureBanner
			eyebrow="Included in every plan"
			title="Lookbook Studio, now on every plan"
			body="Fashion tools from first sketch to campaign, wired straight into the canvas. Runs draw from your plan’s shared pool at list model prices."
			cta="Try Lookbook Studio"
			href={to('techniques')}
			labels={['Silhouette', 'Drape', 'Campaign']}
		/>
	</div>

	<section class="mx-auto grid max-w-[1320px] gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
		<div>
			<h2 class="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Priced around the work, not the seat.</h2>
			<p class="mt-5 max-w-[46ch] text-xl leading-snug text-foreground">A shared pool of credit that grows with your team. Every model at list price. Explore freely, bill clients exactly, and add capacity when the job calls for it.</p>
			<div class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
				{#each pillars as p (p.title)}
					<div>
						<span class="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><p.Icon class="lucide size-5" /></span>
						<h3 class="mt-4 text-lg font-medium text-foreground">{p.title}</h3>
						<p class="mt-1.5 text-[15px] leading-snug text-foreground/80">{p.body}</p>
					</div>
				{/each}
			</div>
		</div>
		<TeamPool />
	</section>

	<section class="mx-auto max-w-[1100px] px-4 pb-24 sm:px-8 sm:pb-32">
		<h2 class="mb-6 text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-foreground">Everything you need to make the work</h2>
		<CompareTable {columns} {groups} star={2} />
	</section>

	<section class="px-4 pb-28 text-center sm:px-8">
		<h2 class="text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">Still have questions?</h2>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<Button href={to('enterprise')} size="lg" class="h-12 rounded-full px-6 text-base">Read the FAQ</Button>
			<Button href={to('contact')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Contact sales <ArrowUpRight class="lucide" /></Button>
		</div>
	</section>

	<SiteFooter cta={null} />
</div>
