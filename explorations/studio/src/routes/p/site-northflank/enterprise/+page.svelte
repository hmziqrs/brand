<script lang="ts">
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import HeartPulse from '@lucide/svelte/icons/heart-pulse';
	import Cloud from '@lucide/svelte/icons/cloud';
	import Network from '@lucide/svelte/icons/network';
	import Users from '@lucide/svelte/icons/users';
	import Layers from '@lucide/svelte/icons/layers';
	import Scale from '@lucide/svelte/icons/scale';
	import FileCode from '@lucide/svelte/icons/file-code';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import Building2 from '@lucide/svelte/icons/building-2';
	import Palette from '@lucide/svelte/icons/palette';
	import Container from '@lucide/svelte/icons/container';
	import ServerOff from '@lucide/svelte/icons/server-off';
	import UserCheck from '@lucide/svelte/icons/user-check';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import Waypoints from '@lucide/svelte/icons/waypoints';
	import DatabaseBackup from '@lucide/svelte/icons/database-backup';
	import SplitSquareHorizontal from '@lucide/svelte/icons/columns-2';
	import Cpu from '@lucide/svelte/icons/cpu';
	import HardDrive from '@lucide/svelte/icons/hard-drive';
	import ScanSearch from '@lucide/svelte/icons/scan-search';
	import GitCommitVertical from '@lucide/svelte/icons/git-commit-vertical';
	import Activity from '@lucide/svelte/icons/activity';
	import PackagePlus from '@lucide/svelte/icons/package-plus';
	import Route from '@lucide/svelte/icons/route';
	import LayoutTemplate from '@lucide/svelte/icons/layout-template';
	import Gavel from '@lucide/svelte/icons/gavel';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import RingNodeField from '$moves/site-northflank/ring-node-field.svelte';
	import ConsoleMock from '$moves/site-northflank/console-mock.svelte';
	import FeatureQuad, { type QuadItem } from '$moves/site-northflank/feature-quad.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import BigCounters from '$moves/northflank/big-counters.svelte';
	import OxideSlab from '$moves/northflank/oxide-slab.svelte';
	import IsoTileStack from '$moves/northflank/iso-tile-stack.svelte';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';

	const marks = [
		{ icon: ShieldCheck, label: 'SOC 2 Type II' },
		{ icon: HeartPulse, label: 'HIPAA' },
		{ icon: Cloud, label: 'Your own cloud' },
		{ icon: Network, label: 'Control plane on your side' }
	];

	const sections: { label: string; title: string; line: string; items: QuadItem[]; console?: boolean; band?: boolean }[] = [
		{
			label: 'Enterprise platform',
			title: 'Deploy in your cloud, with complete control.',
			line: 'Bring your own cloud, bring your own Kubernetes, or keep the control plane on your side. Built for hybrid estates and regulators.',
			console: true,
			items: [
				{ icon: Cloud, title: 'Bring your own cloud', line: 'Managed clusters in your accounts on AWS, Google Cloud, Azure, Oracle or bare metal.' },
				{ icon: Users, title: 'Fifty thousand developers', line: 'Tenants, projects and quotas that hold up at the size of a whole company.' },
				{ icon: Layers, title: 'Hybrid by design', line: 'Mix our cloud, your clouds and your racks behind one interface.' },
				{ icon: Scale, title: 'Regulated workloads', line: 'Data residency per project, region pinning and evidence for audits.' }
			]
		},
		{
			label: 'Automation and control',
			title: 'Templates, secrets and enterprise features.',
			line: 'Everything you click can be written down, versioned and applied again.',
			band: true,
			items: [
				{ icon: FileCode, title: 'IaC with OpenTofu', line: 'Provision clusters and cloud resources from the same templates as your apps.' },
				{ icon: KeyRound, title: 'Global secrets', line: 'One secret group, injected into every project that is allowed to read it.' },
				{ icon: Building2, title: 'Organisation API', line: 'Automate across every team from a single scoped token.' },
				{ icon: Palette, title: 'White label', line: 'Your names, logos and domains on the platform your developers see.' }
			]
		},
		{
			label: 'Advanced deployment',
			title: 'Your keys, your Kubernetes, your air gap.',
			line: 'For estates where nothing is allowed to phone home.',
			items: [
				{ icon: Container, title: 'Bring your own Kubernetes', line: 'Import an existing cluster and keep your own upgrade cadence.' },
				{ icon: Network, title: 'Forward-deployed control plane', line: 'The brains run next to your workloads, not ours.' },
				{ icon: ServerOff, title: 'Air-gapped installs', line: 'Offline bundles, private registries and signed upgrades.' },
				{ icon: KeyRound, title: 'Bring your own keys', line: 'Encryption at rest with keys held in your KMS.' }
			]
		}
	];

	const more: { label: string; title: string; line: string; items: QuadItem[] }[] = [
		{
			label: 'Security and identity',
			title: 'SSO, RBAC and access controls.',
			line: 'Plug in your identity provider and set permissions down to the project.',
			items: [
				{ icon: UserCheck, title: 'SSO and directory sync', line: 'SAML or OIDC with Okta, Entra ID or Google, and SCIM provisioning.' },
				{ icon: ScrollText, title: 'RBAC and audit logs', line: 'Map groups to roles; ship immutable audit logs to your SIEM.' },
				{ icon: Waypoints, title: 'Advanced networking', line: 'Network policies, mesh with mutual TLS and private tailnet access.' },
				{ icon: Palette, title: 'Branded platform', line: 'Custom domains, logos and notifications under your name.' }
			]
		},
		{
			label: 'Infrastructure and reliability',
			title: 'Recovery, rollout patterns and infrastructure control.',
			line: 'Backups you have restored before, and releases you can take back.',
			items: [
				{ icon: DatabaseBackup, title: 'Backup and DR', line: 'Frequent backups replicated across regions and to your own buckets.' },
				{ icon: SplitSquareHorizontal, title: 'Canary and blue/green', line: 'Shift traffic in steps with automatic rollback on bad health.' },
				{ icon: Cpu, title: 'Custom images and scheduling', line: 'Hardened node images, reservations and org-wide defaults.' },
				{ icon: HardDrive, title: 'Managed storage', line: 'Replicated block storage for stateful workloads.' }
			]
		},
		{
			label: 'Platform features',
			title: 'Observability, versioning and developer experience.',
			line: 'Scan, pin, observe and extend.',
			items: [
				{ icon: ScanSearch, title: 'Build scanning and policy', line: 'Block images by CVE severity before they reach a cluster.' },
				{ icon: GitCommitVertical, title: 'Platform versioning', line: 'Pin platform versions, draft changes and roll them back.' },
				{ icon: Activity, title: 'OpenTelemetry', line: 'Export traces, logs and metrics to the tools you already pay for.' },
				{ icon: PackagePlus, title: 'Bring your own addon', line: 'Wrap a Helm chart as a first-class addon with overrides.' }
			]
		},
		{
			label: 'Developer experience',
			title: 'Golden paths and self-service infrastructure.',
			line: 'Platform teams set the road; everyone else drives on it.',
			items: [
				{ icon: Route, title: 'Golden paths', line: 'Opinionated starting points that already pass review.' },
				{ icon: LayoutTemplate, title: 'Stack templates', line: 'One click for a service, its database and its pipeline.' },
				{ icon: Gavel, title: 'Policy enforcement', line: 'Guardrails on resources, regions and images.' },
				{ icon: LifeBuoy, title: 'Around-the-clock support', line: 'Named engineers, a shared channel and a real escalation path.' }
			]
		}
	];
</script>

<svelte:head><title>Ferrous · enterprise</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="enterprise" notice={null} />

	<section class="relative overflow-hidden border-b">
		<div class="{wrap} grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-20 [&>*]:min-w-0">
			<div>
				<span class="inline-flex rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-foreground uppercase">Enterprise</span>
				<h1 class="mt-6 text-[clamp(52px,7.2vw,104px)] leading-[0.94] font-medium tracking-[-0.045em]">Ferrous for<br />enterprise.</h1>
				<p class="mt-7 max-w-[32rem] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-foreground/90">Run inside your own VPC. Bring your own cloud, your own keys, and a control plane that never leaves your network.</p>
				<div class="mt-9 flex flex-wrap gap-3">
					<KeyButton label="Try it now" key="T" href={to('pricing')} />
					<KeyButton label="Book a demo" key="B" variant="outline" href={to('contact')} />
				</div>
			</div>
			<div class="relative -mx-4 sm:mx-0">
				<RingNodeField />
				<p class="mt-1 text-right font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">point at a cluster</p>
			</div>
		</div>
	</section>

	<section class="{wrap} py-16">
		<div class="grid overflow-hidden rounded-2xl border lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
			<div class="p-7 sm:p-9">
				<p class="text-[clamp(24px,2.4vw,32px)] leading-tight font-medium tracking-[-0.02em] text-foreground">Peace of mind, at enterprise grade.</p>
				<p class="mt-3 text-[16px] text-foreground/80">No guessing games on compliance or security.</p>
			</div>
			<ul class="grid grid-cols-2 border-t sm:grid-cols-4 lg:border-t-0 lg:border-l">
				{#each marks as m, n (m.label)}
					<li class="flex flex-col items-center justify-center gap-3 p-6 text-center [&:not(:last-child)]:border-r max-sm:[&:nth-child(2)]:border-r-0 max-sm:[&:nth-child(-n+2)]:border-b">
						<m.icon class="lucide size-8 text-orange" />
						<span class="font-mono text-[11px] tracking-[0.1em] text-foreground uppercase">{m.label}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="mt-4 grid gap-4 lg:grid-cols-2">
			<div class="overflow-hidden rounded-2xl border bg-card p-7 sm:p-9">
				<p class="text-[22px] font-medium text-foreground">Infrastructure capacity</p>
				<p class="mt-3 max-w-[34rem] text-[16px] leading-[1.55] text-foreground/85">50,000+ developers per tenant · 1,000+ services per project · up to 288 vCPU and 2.2 TB memory per dedicated node · custom plans · GPUs in several regions.</p>
				<IsoTileStack clusters={[{ at: [0, 0], size: [6, 4], height: 1, tone: 'steel', rust: true, bumps: 6 }, { at: [7, 1], size: [2, 2], height: 3, tone: 'oxide' }, { at: [1, -4], size: [2, 2], height: 2, tone: 'ink' }]} labels={false} floor={3} class="mx-auto mt-6 max-w-[420px]" />
			</div>
			<OxideSlab class="flex flex-col rounded-2xl p-7 sm:p-9">
				<p class="text-[22px] font-medium">Multi-cloud deployment</p>
				<p class="mt-3 max-w-[34rem] text-[16px] leading-[1.55]">Deploy on our managed cloud or connect your own EKS, GKE, AKS or bare-metal clusters. 100+ regions and 300+ availability zones behind one interface.</p>
				<ul class="mt-auto grid grid-cols-3 gap-2 pt-10 font-mono text-[11px] uppercase">
					{#each ['AWS', 'Google Cloud', 'Azure', 'Oracle', 'CoreWeave', 'Bare metal'] as c (c)}
						<li class="rounded-md border border-current/25 px-2 py-2 text-center">{c}</li>
					{/each}
				</ul>
			</OxideSlab>
		</div>
	</section>

	{#each sections as s (s.label)}
		<section class={s.band ? 'border-t bg-(--band)' : 'border-t'}>
			<div class="{wrap} py-24">
				<FeatureQuad label={s.label} title={s.title} line={s.line} items={s.items}>
					{#if s.console}<ConsoleMock />{/if}
				</FeatureQuad>
			</div>
		</section>
	{/each}

	<section class="border-t">
		<div class="{wrap} py-24">
			<MonoLabel text="Built for scale" />
			<div class="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<h2 class="text-[clamp(38px,5vw,68px)] leading-[1.0] font-medium tracking-[-0.035em]">In serious company.</h2>
				<p class="max-w-[30rem] text-[18px] text-foreground/85 lg:justify-self-end">Since 2019 teams have run everything from one container to fleets of AI infrastructure here. Figures below are stand-ins for this study.</p>
			</div>
			<BigCounters class="mt-12" items={[{ value: '130', unit: 'B+', label: 'requests served' }, { value: '100', unit: 'k+', label: 'developers in production' }, { value: '330', unit: '+', label: 'availability zones' }, { value: '24', unit: 'M', label: 'raised to date' }]} />
		</div>
	</section>

	{#each more as s, n (s.label)}
		<section class={n % 2 ? 'border-t bg-(--band)' : 'border-t'}>
			<div class="{wrap} py-24">
				<FeatureQuad label={s.label} title={s.title} line={s.line} items={s.items} layout={n % 2 ? 'stack' : 'side'} />
			</div>
		</section>
	{/each}

	<CtaBand title="Make Kubernetes" second="boring again." line="Talk to the people who will run it with you, or start a trial in your own account today." />
	<SiteFooter />
</div>
