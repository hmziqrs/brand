<script lang="ts">
	import Question from '$brand/components/question.svelte';
	import Questions from '$brand/components/questions.svelte';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import CursorDither from '$moves/site-northflank/cursor-dither.svelte';
	import PlanSheets, { type PlanSheet } from '$moves/site-northflank/plan-sheets.svelte';
	import RateSheet from '$moves/site-northflank/rate-sheet.svelte';
	import BillEstimator from '$moves/site-northflank/bill-estimator.svelte';
	import PriceCompare from '$moves/site-northflank/price-compare.svelte';
	import PlanMatrix, { type MatrixGroup } from '$moves/site-northflank/plan-matrix.svelte';
	import EnterprisePanel from '$moves/site-northflank/enterprise-panel.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';
	import MonoLabel from '$moves/northflank/mono-label.svelte';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
	const h2 = 'text-[clamp(38px,5vw,68px)] leading-[1.0] font-medium tracking-[-0.035em] text-foreground';

	const plansheets: PlanSheet[] = [
		{
			name: 'Sandbox', tag: 'No card needed', price: '$0', unit: '/ month, forever', key: 'S', cta: 'Start free', href: to('home'),
			line: 'A real project on real compute, for side projects and first agents.',
			specs: [['Resource credit', '$20 / month'], ['Services · jobs · DBs', '2 · 2 · 1'], ['Your own cloud', '1 cluster · 12 vCPU'], ['Support', 'Community']],
			points: ['Always on. Nothing sleeps.', 'Preview environments per pull request'],
			art: [{ at: [0, 0], size: [3, 3], height: 1, tone: 'steel', rust: true, bumps: 2 }, { at: [1, -2], size: [1, 1], height: 2, tone: 'oxide' }]
		},
		{
			name: 'Pay as you go', tag: 'Most teams', price: '$0.016', unit: '/ vCPU · hour', key: 'D', cta: 'Deploy now', href: to('home'), hot: true,
			line: 'Billed by the second for exactly what runs. No seats, no minimum.',
			specs: [['Memory', '$0.008 / GB · hour'], ['Services · jobs · DBs', 'Unlimited'], ['Your own cloud', '$0.02 / node vCPU'], ['Support', 'Email, next business day']],
			points: ['GPUs, autoscaling and pipelines', 'RBAC and the full platform SDK'],
			art: [{ at: [0, 0], size: [5, 4], height: 1, tone: 'ink', bumps: 0 }, { at: [0, -3], size: [2, 2], height: 2, tone: 'steel' }, { at: [3, -3], size: [1, 1], height: 3, tone: 'ink' }]
		},
		{
			name: 'Enterprise', tag: 'Annual contract', price: 'Custom', unit: 'platform fee + usage', key: 'T', cta: 'Talk to us', href: to('contact'),
			line: 'Your VPC, your keys and an SLA your procurement team signs off on.',
			specs: [['Uptime SLA', '99.99%'], ['Deploy to', 'VPC · on-prem · air gap'], ['Identity', 'SAML · SCIM · audit export'], ['Support', 'Named engineers, shared channel']],
			points: ['Volume and term discounts', 'White-label and your own tooling'],
			art: [{ at: [0, 0], size: [7, 5], height: 1, tone: 'steel', rust: true, bumps: 8 }, { at: [0, -4], size: [2, 2], height: 3, tone: 'oxide' }, { at: [3, -4], size: [2, 2], height: 2, tone: 'ink' }, { at: [5, -2], size: [1, 1], height: 2, tone: 'glass' }]
		}
	];

	const plans = [
		{ name: 'Sandbox', sub: 'Free', cta: 'Start free', href: to('home') },
		{ name: 'Pay as you go', sub: 'Usage-based', cta: 'Deploy now', href: to('home') },
		{ name: 'Enterprise', sub: 'Custom', cta: 'Talk to us', href: to('contact') }
	];
	const groups: MatrixGroup[] = [
		{
			group: 'Resources',
			rows: [
				{ name: 'Projects', line: 'Group everything a team owns', cells: ['2', 'Unlimited', 'Unlimited'] },
				{ name: 'Services', line: 'Build and run code or images', cells: ['2', 'Unlimited', 'Unlimited'] },
				{ name: 'Jobs', line: 'Cron or one-off runs', cells: ['2', 'Unlimited', 'Unlimited'] },
				{ name: 'Databases', line: 'Managed stateful addons', cells: ['1', 'Unlimited', 'Unlimited'] },
				{ name: 'Custom compute shapes', line: 'Any vCPU and memory mix', cells: [false, true, true] }
			]
		},
		{
			group: 'Release',
			rows: [
				{ name: 'Preview environments', line: 'A stack per pull request', cells: [true, true, true] },
				{ name: 'Pipelines and promotions', line: 'Staged releases with approvals', cells: [false, true, true] },
				{ name: 'Canary and blue/green', line: 'Shift traffic in steps', cells: [false, true, true] }
			]
		},
		{
			group: 'Security',
			rows: [
				{ name: 'RBAC', line: 'Roles per team and project', cells: [false, true, true] },
				{ name: 'SAML SSO and SCIM', line: 'Your identity provider', cells: [false, false, true] },
				{ name: 'Audit log export', line: 'Stream to your SIEM', cells: [false, false, true] },
				{ name: 'Air-gapped control plane', line: 'Nothing leaves your network', cells: [false, false, true] }
			]
		},
		{
			group: 'Support',
			rows: [
				{ name: 'Community and docs', line: 'Forum, guides and examples', cells: [true, true, true] },
				{ name: 'Email support', line: 'Next business day', cells: [false, true, true] },
				{ name: 'Uptime SLA', line: 'Contracted availability', cells: [false, false, '99.99%'] }
			]
		}
	];

	const faqs = [
		{ q: 'What does billed per second mean?', a: 'A sandbox that lives for 40 seconds costs 40 seconds of its plan. There is no hourly rounding and no minimum.' },
		{ q: 'Do I pay per seat?', a: 'No. Invite the whole company. You pay for resources and, on Enterprise, a platform fee.' },
		{ q: 'How does bring-your-own-cloud billing work?', a: 'Your provider bills the machines at your rates and credits. We bill a fee per managed node vCPU.' },
		{ q: 'Can I set a spending cap?', a: 'Yes. Set a monthly limit per project; we alert at 80% and pause non-production workloads at 100%.' },
		{ q: 'Is there a discount for committing?', a: 'Volume and term discounts start once spend is steady. Talk to us when you get there.' }
	];
</script>

<svelte:head><title>Ferrous · pricing</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="pricing" notice={null} />

	<section class="relative overflow-hidden">
		<CursorDither from="top" strength={0.55} lift={0.9} lens={200} class="[mask-image:linear-gradient(to_bottom,black,transparent_50%)] opacity-60" />
		<div class="{wrap} relative pt-20 pb-24 lg:pt-28">
			<MonoLabel text="Pricing · billed per second" />
			<h1 class="mt-6 max-w-[14ch] text-[clamp(52px,7.4vw,112px)] leading-[0.94] font-medium tracking-[-0.045em]">Pay for what actually runs.</h1>
			<p class="mt-7 max-w-[36rem] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-foreground/90">Per-second billing and no seat fees. Start free, then pay as you go on our cloud or inside your own.</p>
			<PlanSheets plans={plansheets} class="mt-14" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<div><MonoLabel index="01" text="Usage" /><h2 class="{h2} mt-5">Usage rates.</h2></div>
				<p class="max-w-[28rem] text-[19px] text-foreground/85 lg:justify-self-end">Every resource, billed by the second, on our cloud or yours.</p>
			</div>
			<RateSheet class="mt-12" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<div><MonoLabel index="02" text="Estimate" /><h2 class="{h2} mt-5">Estimate your bill.</h2></div>
				<p class="max-w-[28rem] text-[19px] text-foreground/85 lg:justify-self-end">Pick an app shaped like yours, then resize the parts.</p>
			</div>
			<BillEstimator class="mt-12" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<div><MonoLabel index="03" text="Compare" /><h2 class="{h2} mt-5">How we compare.</h2></div>
				<p class="max-w-[28rem] text-[19px] text-foreground/85 lg:justify-self-end">Like-for-like shapes beside the usual alternatives.</p>
			</div>
			<PriceCompare class="mt-12" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<div><MonoLabel index="04" text="Plans" /><h2 class="{h2} mt-5">Compare plans.</h2></div>
				<p class="max-w-[28rem] text-[19px] text-foreground/85 lg:justify-self-end">Everything in each plan, side by side.</p>
			</div>
			<PlanMatrix {plans} {groups} class="mt-12" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<MonoLabel index="05" text="Enterprise" />
			<h2 class="{h2} mt-5">Ready for enterprise.</h2>
			<EnterprisePanel class="mt-12" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} grid gap-10 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
			<div>
				<MonoLabel index="06" text="FAQ" />
				<h2 class="{h2} mt-5">Questions.</h2>
				<p class="mt-5 text-[17px] text-foreground/85">Something else? <a href={to('contact')} class="text-orange underline-offset-4 hover:underline">Contact us</a>.</p>
			</div>
			<Questions class="max-w-none">
				{#each faqs as f, n (f.q)}
					<Question number={n + 1} open={n === 0}>
						{#snippet question()}<span class="text-[17px] text-foreground">{f.q}</span>{/snippet}
						<p class="pb-5 pl-11 text-[16px] leading-relaxed text-foreground/85">{f.a}</p>
					</Question>
				{/each}
			</Questions>
		</div>
	</section>

	<CtaBand title="Start free." second="Scale when ready." />
	<SiteFooter />
</div>
