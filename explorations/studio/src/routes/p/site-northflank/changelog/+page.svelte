<script lang="ts">
	import Rss from '@lucide/svelte/icons/rss';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import ResourceSwitch from '$moves/site-northflank/resource-switch.svelte';
	import ReleaseLog, { type Release } from '$moves/site-northflank/release-log.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';

	const releases: Release[] = [
		{
			period: 'Aug–Sep',
			year: '2026',
			cover: 'Agent harnesses',
			date: '24 Sep 2026',
			version: 'v26.9',
			title: 'Coding agents get a home, and microVMs come to your cloud.',
			lede: 'Harnesses run as first-class workloads with their own disks, sandboxes boot inside your own VPC, and every encryption key can now live in your KMS.',
			cmd: 'fe agent start claude-code --repo acme/checkout',
			features: [
				{ h: 'Agent harnesses', p: 'Start Codex, Claude Code or OpenCode against a repository with one command. The session keeps a 200 GB disk between runs and appears beside your services with logs and metrics.' },
				{ h: 'MicroVMs in your cloud', p: 'Bring-your-own-cloud clusters can now run sandboxes with the same 180 ms boot as ours. Nothing an agent runs leaves your account.' }
			],
			groups: [
				{ kind: 'Added', items: ['Bring-your-own-key encryption for volumes and backups', 'Container snapshots you can restore into a new sandbox', 'Scheduled volume backups with retention rules'] },
				{ kind: 'Changed', items: ['Org access controls moved to one page per team', 'Build logs stream twice as fast on large images'] },
				{ kind: 'Fixed', items: ['Preview URLs no longer 404 for a few seconds after redeploy', 'Autoscaler respected min instances during a region failover'] }
			]
		},
		{
			period: 'May–Jun',
			year: '2026',
			cover: 'Object storage',
			date: '22 Jul 2026',
			version: 'v26.6',
			title: 'Self-hosted Git, object storage and a network policy editor.',
			lede: 'Connect the Git server you already run, keep files in managed object storage next to your services, and draw who may talk to whom instead of writing YAML.',
			cmd: 'fe addon create objects --type s3 --size 500GB',
			groups: [
				{ kind: 'Added', items: ['GitLab and Gitea self-hosted integrations', 'Managed S3-compatible object storage', 'Visual network policy editor'] },
				{ kind: 'Changed', items: ['Workload tokens are short-lived by default'] },
				{ kind: 'Fixed', items: ['Secret groups refresh without a restart', 'Cron jobs keep their timezone after edits'] }
			]
		},
		{
			period: 'Mar–Apr',
			year: '2026',
			cover: 'Console at scale',
			date: '27 Apr 2026',
			version: 'v26.4',
			title: 'A faster console for teams with thousands of services.',
			lede: 'The console now opens large projects in under a second, builds can pull from other projects, and bring-your-own-cloud clusters recover on their own after a node loss.',
			groups: [
				{ kind: 'Added', items: ['Cross-project builds and image reuse', 'Sandbox pause and resume'] },
				{ kind: 'Changed', items: ['Project lists virtualised; search across all teams', 'Node replacement without draining the pool'] },
				{ kind: 'Fixed', items: ['Rare double-billing of stopped GPU jobs', 'Dark mode contrast in the metrics view'] }
			]
		}
	];

	const older = [
		{ date: '28 Feb 2026', title: 'January and February 2026', line: 'Observability, networking and developer workflow upgrades.' },
		{ date: '11 Dec 2025', title: 'Cheaper networking, two new regions', line: 'Egress drops to $0.05 per GB; two regions open in Asia-Pacific.' },
		{ date: '27 Nov 2025', title: 'November 2025', line: 'Unified jobs, dynamic storage, new GPUs and smarter autoscaling.' },
		{ date: '14 Aug 2025', title: 'New regions: US East and US West', line: 'Two more US regions for latency and data residency.' }
	];

	const years = ['All', '2026', '2025'];
	let year = $state('All');
</script>

<svelte:head><title>Ferrous · changelog</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="changelog" notice={null} />

	<main class="mx-auto max-w-[1320px] px-4 pt-12 pb-24 sm:px-8">
		<ResourceSwitch active="changelog" />
		<div class="mt-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h1 class="text-[clamp(56px,8vw,120px)] leading-[0.9] font-medium tracking-[-0.05em]">Changelog</h1>
				<p class="mt-5 max-w-[38rem] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-foreground/90">Everything that shipped, rounded up every two months with the commands to try it.</p>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<div class="flex gap-1.5" role="group" aria-label="Filter by year">
					{#each years as y (y)}
						<button type="button" aria-pressed={year === y} class={cn('rounded-full border px-3 py-1 font-mono text-[12px] transition-colors motion-reduce:transition-none', year === y ? 'border-orange bg-orange text-(--on-orange)' : 'text-foreground/75 hover:border-foreground/40 hover:text-foreground')} onclick={() => (year = y)}>{y}</button>
					{/each}
				</div>
				<a href={to('changelog')} class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[12px] text-foreground hover:border-foreground/40"><Rss class="lucide size-3.5 text-orange" />RSS</a>
			</div>
		</div>

		{#if year !== '2025'}
			<ReleaseLog {releases} class="mt-20" />
		{/if}

		<section class="mt-24">
			<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Earlier roundups</p>
			<ul class="mt-5 grid gap-3 md:grid-cols-2">
				{#each older.filter((o) => year === 'All' || o.date.endsWith(year)) as o (o.title)}
					<li>
						<a href={to('changelog')} class="group flex h-full items-start justify-between gap-6 rounded-xl border bg-card p-5 transition-colors hover:border-orange/60 motion-reduce:transition-none">
							<span>
								<span class="font-mono text-[11px] text-muted-foreground">{o.date}</span>
								<span class="mt-1.5 block text-[19px] font-medium text-foreground">{o.title}</span>
								<span class="mt-1 block text-[15px] text-foreground/80">{o.line}</span>
							</span>
							<ArrowRight class="lucide mt-1 size-4 shrink-0 text-orange transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</main>

	<CtaBand title="See it live." second="Ship it today." />
	<SiteFooter />
</div>
