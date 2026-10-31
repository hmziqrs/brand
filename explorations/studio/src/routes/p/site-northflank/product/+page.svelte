<script lang="ts">
	import Layers from '@lucide/svelte/icons/layers';
	import Shuffle from '@lucide/svelte/icons/shuffle';
	import MonitorSmartphone from '@lucide/svelte/icons/monitor-smartphone';
	import RefreshCcw from '@lucide/svelte/icons/refresh-ccw';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Landmark from '@lucide/svelte/icons/landmark';
	import Users from '@lucide/svelte/icons/users';
	import Gauge from '@lucide/svelte/icons/gauge';
	import Wrench from '@lucide/svelte/icons/wrench';
	import PiggyBank from '@lucide/svelte/icons/piggy-bank';
	import Question from '$brand/components/question.svelte';
	import Questions from '$brand/components/questions.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import ProductRail from '$moves/site-northflank/product-rail.svelte';
	import ConsoleMock from '$moves/site-northflank/console-mock.svelte';
	import FeatureQuad, { type QuadItem } from '$moves/site-northflank/feature-quad.svelte';
	import PrimitiveTabs from '$moves/site-northflank/primitive-tabs.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';

	const regions = ['us-west', 'us-central', 'us-east', 'eu-west', 'asia-east'];

	const paas: QuadItem[] = [
		{ icon: Layers, title: 'Same experience everywhere', line: 'One UI, CLI and API on every cloud, with pipelines, stateful workloads and previews included.' },
		{ icon: Shuffle, title: 'Real portability', line: 'Built on Kubernetes and Dockerfiles. Move between EKS, GKE, AKS or any cluster without rewrites.' },
		{ icon: MonitorSmartphone, title: 'One cloud console', line: 'Provision, deploy and watch the whole estate from a single, friendly place.' },
		{ icon: RefreshCcw, title: 'Cross-cloud failover', line: 'Shift workloads to another provider when a region has a bad day.' }
	];
	const security: QuadItem[] = [
		{ icon: MapPin, title: 'Data residency', line: 'Databases, storage and backups stay inside your own cloud boundary.' },
		{ icon: Landmark, title: 'Data sovereignty', line: 'Pin projects to the jurisdictions your lawyers already approved.' },
		{ icon: Users, title: 'Multi-tenancy built in', line: 'Isolate teams and customers with projects, quotas and network policy.' }
	];
	const costs: QuadItem[] = [
		{ icon: Gauge, title: 'Efficient by default', line: 'Bin-packing and autoscaling keep nodes busy instead of idle.' },
		{ icon: Wrench, title: 'Less to manage', line: 'We run upgrades, add-ons and observability so your team does not have to.' },
		{ icon: PiggyBank, title: 'Use what you bought', line: 'Committed spend, reservations and credits still apply.' }
	];
	const quotes = [
		{ q: 'We moved forty services out of a legacy PaaS into our own account in three weeks, and nobody had to learn Helm.', who: 'Priya Navarro', role: 'Platform lead, example logistics company' },
		{ q: 'Preview environments in our own VPC were the thing security had said no to for two years.', who: 'Tomasz Ferreira', role: 'Staff engineer, example fintech' },
		{ q: 'The console is the same on every cloud, so the on-call rota finally covers all of them.', who: 'Ines Okafor', role: 'SRE manager, example health app' }
	];
	const problems = [
		{ q: 'Stuck on a traditional PaaS?', a: 'Keep the push-to-deploy feel and gain control of the network, the data and the bill.' },
		{ q: 'Daunted by containers on your own cloud?', a: 'We stand up and run the clusters; your developers only see projects and services.' },
		{ q: 'Your platform is a product', a: 'Ship it like one: versioned templates, golden paths and a changelog your teams can read.' },
		{ q: 'One abstraction for every workload', a: 'Services, jobs, databases, GPUs and sandboxes share the same model and tooling.' },
		{ q: 'Compliance keeps getting harder', a: 'Audit logs, residency controls and evidence exports come built in, not bolted on.' }
	];
</script>

<svelte:head><title>Ferrous · bring your own cloud</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="product" notice={null} />

	<div class="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_230px]">
		<main class="min-w-0">
			<section class="relative isolate -mx-4 overflow-hidden border-x border-b border-dashed px-4 sm:mx-0 sm:px-10">
				<RustGridField cell={44} mode="paint" fade="radial" class="-z-10 opacity-80" />
				<div class="flex justify-between gap-2 border-b border-dashed py-3 font-mono text-[10.5px] tracking-[0.16em] text-muted-foreground uppercase">
					{#each regions as r (r)}<span class="hidden first:inline last:inline sm:inline">{r}</span>{/each}
				</div>
				<div class="py-20 text-center sm:py-28">
					<span class="inline-flex rounded-full border bg-background px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-foreground uppercase">Bring your own cloud</span>
					<h1 class="mx-auto mt-6 max-w-[12ch] text-[clamp(50px,7vw,100px)] leading-[0.94] font-medium tracking-[-0.045em]">Your cloud. Our platform.</h1>
					<div class="mx-auto mt-7 max-w-[34rem] rounded-xl bg-background/80 p-3 backdrop-blur-sm">
						<p class="text-[clamp(17px,1.5vw,21px)] leading-[1.45] text-foreground/90">Run workloads in your own AWS, Google Cloud, Azure, on-premises or bare-metal accounts, with the whole platform managed for you.</p>
					</div>
					<div class="mt-8 flex flex-wrap justify-center gap-3">
						<KeyButton label="Try it now" key="T" href={to('pricing')} />
						<KeyButton label="Book a demo" key="B" variant="outline" href={to('contact')} />
					</div>
					<p class="mt-10 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">drag the cursor across the grid</p>
				</div>
			</section>

			<section class="py-24">
				<FeatureQuad label="Fits your infrastructure" title="A platform-as-a-service, inside your cloud." line="We manage the cluster lifecycle, deployments and day-two operations on any cloud. Already have clusters? Import them." items={paas} layout="stack">
					<ConsoleMock cluster="acme-eu" provider="Azure" region="uksouth" />
				</FeatureQuad>
			</section>

			<section class="border-t py-24">
				<FeatureQuad label="Secure and compliant" title="Security and control." line="Your data and workloads stay inside your boundary. Meet the standard without giving up flexibility." items={security} layout="stack">
					<ConsoleMock cluster="acme-us" provider="AWS" region="us-east-1" tab="Observe" />
				</FeatureQuad>
			</section>

			<section class="border-t py-24">
				<FeatureQuad label="Lower the bill" title="Optimise costs." line="Pay your provider at your rates, and stop paying people to babysit clusters." items={costs} layout="stack" />
			</section>

			<section class="border-t py-24">
				<MonoLabel text="Everything where you expect it" />
				<h2 class="mt-5 max-w-[18ch] text-[clamp(32px,3.8vw,52px)] leading-[1.03] font-medium tracking-[-0.03em]">Built for developer happiness.</h2>
				<PrimitiveTabs class="mt-12" />
			</section>

			<section class="border-t py-24">
				<MonoLabel text="In good company" />
				<h2 class="mt-5 text-[clamp(32px,3.8vw,52px)] leading-[1.03] font-medium tracking-[-0.03em]">What teams tell us.</h2>
				<ul class="mt-12 grid gap-4 md:grid-cols-3">
					{#each quotes as t, n (t.who)}
						<li class={n === 1 ? 'dark band-orange relative flex flex-col rounded-2xl p-7' : 'flex flex-col rounded-2xl border bg-card p-7'}>
							<span class="font-mono text-[10px] tracking-[0.14em] uppercase opacity-70">Example quote</span>
							<p class="mt-4 text-[19px] leading-[1.4] font-medium tracking-[-0.01em]">“{t.q}”</p>
							<p class="mt-auto pt-8 text-[14px]">{t.who}<span class="block opacity-70">{t.role}</span></p>
						</li>
					{/each}
				</ul>
			</section>

			<section class="border-t py-24">
				<div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
					<div>
						<MonoLabel text="Challenges" />
						<h2 class="mt-5 text-[clamp(32px,3.8vw,52px)] leading-[1.03] font-medium tracking-[-0.03em]">Containers on your own cloud, without the pain.</h2>
					</div>
					<Questions class="max-w-none">
						{#each problems as p, n (p.q)}
							<Question number={n + 1} open={n === 0}>
								{#snippet question()}<span class="text-[17px] text-foreground">{p.q}</span>{/snippet}
								<p class="pb-5 pl-11 text-[16px] leading-relaxed text-foreground/85">{p.a}</p>
							</Question>
						{/each}
					</Questions>
				</div>
			</section>
		</main>
		<aside class="hidden lg:block">
			<ProductRail class="sticky top-24 border-l border-dashed py-8 pl-8" />
		</aside>
	</div>

	<CtaBand title="Make Kubernetes" second="boring again." line="Start free in your own account, or talk to us about a managed install." />
	<SiteFooter />
</div>
