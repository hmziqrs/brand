<script lang="ts">
	import Rss from '@lucide/svelte/icons/rss';
	import { cn } from '$brand/utils.js';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import ResourceSwitch from '$moves/site-northflank/resource-switch.svelte';
	import PostCard, { type Post } from '$moves/site-northflank/post-card.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';

	const posts: Post[] = [
		{ seed: 'ci-fast-cheap', title: 'Fast, cheap CI in 2026: what we measured', coverTitle: 'Fast, cheap CI', excerpt: 'We ran the same monorepo through eight hosted runners and timed cold builds, warm builds and the invoice. The cheapest was not the slowest.', author: 'Maren Holt', date: '29 Oct 2026', tag: 'Comparisons' },
		{ seed: 'cicd-2026', title: 'Picking a CI/CD tool without regretting it', excerpt: 'Hosted runners, self-managed servers and GitOps controllers solve different halves of the problem. A map of which half you have.', author: 'Kofi Asante', date: '22 Oct 2026', tag: 'Guides' },
		{ seed: 'managed-hosting', title: 'What managed cloud hosting really buys you', excerpt: 'Cloud power without a platform team: what you give up, what you keep, and the questions to ask before you sign.', author: 'Kofi Asante', date: '22 Oct 2026', tag: 'Guides' },
		{ seed: 'migrate-paas', title: 'Leaving your old PaaS in one weekend', excerpt: 'Apps, databases, env vars and volumes, moved in order, with a DNS cutover that nobody noticed.', author: 'Maren Holt', date: '22 Oct 2026', tag: 'Engineering' },
		{ seed: 'cd-tools', title: 'Ten continuous deployment tools, side by side', excerpt: 'App platforms, automation servers and Kubernetes controllers, scored on features, price and where they run.', author: 'Kofi Asante', date: '20 Oct 2026', tag: 'Comparisons' },
		{ seed: 'autoscale-queues', title: 'Autoscaling workers on queue depth', excerpt: 'Our new integration scales job workers on how much is waiting, not on CPU. Here is how it behaves under a spike.', author: 'Lina Duarte', date: '18 Oct 2026', tag: 'Product' },
		{ seed: 'self-host-models', title: 'Self-hosting open models: privacy, control and cost', excerpt: 'Choosing GPUs and runtimes, keeping weights in your account, and the point where it beats paying per token.', author: 'Ada Whitlock', date: '16 Oct 2026', tag: 'AI' },
		{ seed: 'sandbox-latency', title: 'How we boot a microVM in 180 milliseconds', excerpt: 'Snapshotting, lazy memory and a scheduler that knows where the image already lives.', author: 'Jonas Brekke', date: '9 Oct 2026', tag: 'Engineering' },
		{ seed: 'agents-in-prod', title: 'Letting coding agents near production, safely', excerpt: 'Isolation, short-lived credentials and preview environments: the guardrails we ask every team to set first.', author: 'Lina Duarte', date: '2 Oct 2026', tag: 'AI' }
	];
	const tags = ['All', 'Guides', 'Comparisons', 'Engineering', 'AI', 'Product'];
	let tag = $state('All');
	const rest = $derived(posts.slice(1).filter((p) => tag === 'All' || p.tag === tag));
</script>

<svelte:head><title>Ferrous · blog</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader active="blog" notice={null} />

	<main class="mx-auto max-w-[1320px] px-4 pt-12 pb-24 sm:px-8">
		<ResourceSwitch active="blog" />
		<div class="mt-10 flex flex-wrap items-end justify-between gap-6">
			<div>
				<h1 class="text-[clamp(56px,8vw,120px)] leading-[0.9] font-medium tracking-[-0.05em]">Blog</h1>
				<p class="mt-4 flex items-center gap-2 text-[14px] text-muted-foreground"><Rss class="lucide size-3.5 text-orange" />Follow along · subscribe to the feed</p>
			</div>
			<div class="flex flex-wrap gap-1.5" role="group" aria-label="Filter by topic">
				{#each tags as t (t)}
					<button type="button" aria-pressed={tag === t} class={cn('rounded-full border px-3 py-1 font-mono text-[12px] transition-colors motion-reduce:transition-none', tag === t ? 'border-orange bg-orange text-(--on-orange)' : 'text-foreground/75 hover:border-foreground/40 hover:text-foreground')} onclick={() => (tag = t)}>{t}</button>
				{/each}
			</div>
		</div>

		<PostCard post={posts[0]} href={to('blog')} featured class="mt-14" />

		<div class="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
			{#each rest as p (p.seed)}
				<PostCard post={p} href={to('blog')} />
			{:else}
				<p class="text-[17px] text-foreground/80">Nothing tagged {tag} yet.</p>
			{/each}
		</div>
	</main>

	<CtaBand title="Read less." second="Ship more." />
	<SiteFooter />
</div>
