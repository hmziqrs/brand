<script lang="ts">
	import Rss from '@lucide/svelte/icons/rss';
	import { cn } from '$brand/utils.js';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import ResourceSwitch from '$moves/site-northflank/resource-switch.svelte';
	import PostCard, { type Post } from '$moves/site-northflank/post-card.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';

	const rel = (seed: string, title: string, coverTitle: string, date: string, excerpt: string, tag: string): Post => ({ seed, title, coverTitle, date, excerpt, tag, author: 'Release team', cover: 'release' });
	const posts: Post[] = [
		rel('2026-aug-sep', 'August and September 2026', 'Aug & Sep 2026', '24 Sep 2026', 'Harnesses for coding agents, self-service microVMs in your own cloud, bring-your-own-key encryption, org access controls, container snapshots and scheduled volume backups.', 'Platform'),
		rel('2026-may-jun', 'May and June 2026', 'May & Jun 2026', '22 Jul 2026', 'Self-hosted Git integrations, managed object storage, a network policy editor and short-lived workload tokens.', 'Platform'),
		rel('2026-mar-apr', 'March and April 2026', 'Mar & Apr 2026', '27 Apr 2026', 'A faster console for large teams, cross-project builds, sturdier bring-your-own-cloud and sandbox improvements.', 'Platform'),
		rel('2026-jan-feb', 'January and February 2026', 'Jan & Feb 2026', '28 Feb 2026', 'Upgrades across observability, networking and developer workflows.', 'Platform'),
		rel('network-pricing', 'Cheaper networking, two new regions', '60% cheaper egress', '11 Dec 2025', 'Egress drops to $0.05 per GB, and two new regions open in Asia-Pacific.', 'Pricing'),
		rel('2025-nov', 'November 2025', 'Nov 2025', '27 Nov 2025', 'Unified jobs, pipeline-free workflows, dynamic storage, faster compute plans with new GPUs, smarter autoscaling.', 'Platform'),
		rel('2025-sep', 'September 2025', 'Sep 2025', '7 Oct 2025', 'Faster workloads, smarter templates and new integrations across the platform.', 'Platform'),
		rel('2025-aug', 'August 2025', 'Aug 2025', '2 Sep 2025', 'Preview environment TTLs, secret rotation and a quieter notification centre.', 'Platform'),
		rel('regions-us', 'New regions: US East and US West', 'US East & West', '14 Aug 2025', 'Two more US regions for latency-sensitive workloads and data residency.', 'Regions')
	];
	const years = ['All', '2026', '2025'];
	let year = $state('All');
	const rest = $derived(posts.slice(1).filter((p) => year === 'All' || p.date.endsWith(year)));
</script>

<svelte:head><title>Ferrous · changelog</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="changelog" notice={null} />

	<main class="mx-auto max-w-[1320px] px-4 pt-12 pb-24 sm:px-8">
		<ResourceSwitch active="changelog" />
		<div class="mt-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h1 class="text-[clamp(56px,8vw,120px)] leading-[0.9] font-medium tracking-[-0.05em]">Changelog</h1>
				<p class="mt-4 flex items-center gap-2 text-[14px] text-muted-foreground"><Rss class="lucide size-3.5 text-orange" />A release roundup every two months · subscribe to the feed</p>
			</div>
			<div class="flex gap-1.5" role="group" aria-label="Filter by year">
				{#each years as y (y)}
					<button type="button" aria-pressed={year === y} class={cn('rounded-full border px-3 py-1 font-mono text-[12px] transition-colors motion-reduce:transition-none', year === y ? 'border-orange bg-orange text-(--on-orange)' : 'text-foreground/75 hover:border-foreground/40 hover:text-foreground')} onclick={() => (year = y)}>{y}</button>
				{/each}
			</div>
		</div>

		<PostCard post={posts[0]} href={to('changelog')} featured class="mt-14" />

		<div class="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
			{#each rest as p (p.seed)}
				<PostCard post={p} href={to('changelog')} />
			{/each}
		</div>
	</main>

	<CtaBand title="See it live." second="Ship it today." />
	<SiteFooter />
</div>
