<script lang="ts">
	import TopNav from '$moves/site-hex/top-nav.svelte';
	import GridHero from '$moves/site-hex/grid-hero.svelte';
	import PlanCards from '$moves/site-hex/plan-cards.svelte';
	import ComputePicker from '$moves/site-hex/compute-picker.svelte';
	import CompareTable from '$moves/site-hex/compare-table.svelte';
	import FaqSplit from '$moves/site-hex/faq-split.svelte';
	import OxideCta from '$moves/site-hex/oxide-cta.svelte';
	import TerrainFooter from '$moves/site-hex/terrain-footer.svelte';
	import { href } from '$moves/site-hex/site';

	const plans = [
		{ name: 'Community', for: 'For hobby projects and showing your work in public.', month: 0, year: 0, unit: 'forever', cta: 'Start free', href: href('contact'), kind: 'cube', items: ['Unlimited public projects', 'Small compute', 'SQL, Python and charts', '20 agent questions a month'] },
		{ name: 'Professional', for: 'For one person who wants answers faster than their backlog.', month: 36, year: 30, unit: 'per month', cta: 'Start free', href: href('contact'), kind: 'stack', items: ['Unlimited private projects', 'Medium compute', 'Scheduled runs', '300 agent questions a month'] },
		{ name: 'Team', for: 'For teams sharing data, apps and definitions.', month: 75, year: 62, unit: 'per editor / month', cta: 'Try 14 days free', href: href('contact'), kind: 'branch', hot: true, items: ['Everything in Professional', 'Shared semantic models', 'Context studio and evals', 'Unlimited viewers'] },
		{ name: 'Enterprise', for: 'For orgs that need strict security, governance and support.', month: null, year: null, unit: '', cta: 'Talk to sales', href: href('contact'), kind: 'lock', items: ['SSO, SCIM and audit logs', 'Single-tenant option', 'Bring your own model', 'Named customer engineer'] }
	] as const;

	const groups: { name: string; rows: [string, ...(boolean | string)[]][] }[] = [
		{ name: 'Data', rows: [['Warehouse connections', '1', '3', 'Unlimited', 'Unlimited'], ['Compute', 'Small', 'Medium', 'Medium + add-ons', 'Custom'], ['Scheduled runs', false, true, true, true], ['Write back to warehouse', false, false, true, true]] },
		{ name: 'AI', rows: [['Agent questions / month', '20', '300', '1,500 / editor', 'Custom'], ['Semantic model grounding', false, true, true, true], ['Context studio + evals', false, false, true, true], ['Bring your own model', false, false, false, true]] },
		{ name: 'Collaboration', rows: [['Private projects', false, true, true, true], ['Comments and reviews', true, true, true, true], ['Shared workspaces', false, false, true, true], ['Viewer seats', 'Public only', '5', 'Unlimited', 'Unlimited']] },
		{ name: 'Security', rows: [['SSO', false, false, true, true], ['SCIM provisioning', false, false, false, true], ['Audit logs', false, false, '30 days', 'Unlimited'], ['Single tenant', false, false, false, true]] },
		{ name: 'Support', rows: [['Docs and community', true, true, true, true], ['Live onboarding', false, false, true, true], ['Named customer engineer', false, false, false, true]] }
	];

	const faqs = [
		{ q: 'How does the free trial work?', a: 'Anyone can try Team for 14 days, no card needed. When it ends you pick a plan, or drop back to Community and keep your public work.' },
		{ q: 'Can I change or cancel my plan?', a: 'Yes, any time from Settings → Plan. Downgrades take effect at the end of the billing period; upgrades start now and are prorated.' },
		{ q: 'How do agent questions get counted?', a: 'One question you send counts once, however many queries the agent runs to answer it. Follow-ups in the same thread are free for ten minutes.' },
		{ q: 'Where does my data live?', a: 'Queries run against your warehouse; results are cached in your chosen region and wiped on your schedule. Details are in the trust center.' },
		{ q: 'Do you discount for students, teachers or non-profits?', a: 'Yes. Write to us from a school or charity address and we will set you up with Team for free or at half price.' }
	];
</script>

<svelte:head><title>Quarry pricing</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<TopNav active="pricing" />

	<GridHero lead="Pricing that grows" mark="with the team" lede="Start free on your own. Not sure what you need? Ask us." size="lg" class="pb-10 lg:pb-14" />

	<section class="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
		<PlanCards {plans} />
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 pt-20 sm:px-8">
		<ComputePicker />
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 pt-24 sm:px-8">
		<CompareTable plans={plans.map((p) => p.name)} {groups} />
	</section>

	<FaqSplit class="pt-24" items={faqs} contactHref={href('contact')} />

	<OxideCta class="mt-20" title="Still weighing it up?" body="Bring your warehouse and a real question. We will answer it live." primary="Book 30 minutes" secondary="Read the docs" href={href('contact')} altHref={href('home')} preset="hammered-copper" />

	<TerrainFooter />
</div>
