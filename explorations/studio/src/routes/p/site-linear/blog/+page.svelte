<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import NowBar from '$moves/site-linear/now-bar.svelte';
	import PostCard from '$moves/site-linear/post-card.svelte';
	import ChangelogRail from '$moves/site-linear/changelog-rail.svelte';
	import { posts, press, to } from '$moves/site-linear/content';

	const kinds: Record<string, string> = { Launches: 'Product launch', 'From the team': 'From the team', Community: 'Community', Stories: 'Customer story' };
	const tabs = [
		{ label: 'All' },
		{ label: 'Changelog', href: to('changelog') },
		{ label: 'Launches' },
		{ label: 'From the team' },
		{ label: 'Stories' },
		{ label: 'Community' },
		{ label: 'Press' }
	];

	let active = $state('All');
	let query = $state('');
	let more = $state(false);

	const list = $derived(
		posts.filter((p) => (active === 'All' || active === 'Press' || p.kind === kinds[active]) && (!query.trim() || `${p.title} ${p.dek}`.toLowerCase().includes(query.trim().toLowerCase())))
	);
	const filtering = $derived(active !== 'All' || !!query.trim());

	const archive = ['Teaching an agent to read a codebase', 'Why we rewrote the sync client twice', 'A field guide to triage', 'How we run a two-week cycle', 'Designing for keyboard first', 'What a good spec looks like'];
</script>

<svelte:head><title>Plumb · Now</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="blog" />

	<NowBar class="pt-20 md:pt-28" {tabs} {active} bind:query onpick={(l) => (active = l)} />

	{#if active !== 'Press'}
		<section class="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6">
			<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
				{#each filtering ? list : list.slice(0, 6) as p (p.title)}<PostCard post={p} href={to('post')} />{/each}
			</div>
			{#if !list.length}<p class="py-12 text-xl text-foreground">Nothing matches yet. Try another tab or word.</p>{/if}
		</section>
	{/if}

	{#if !filtering}
		<ChangelogRail class="pt-28 md:pt-36" />
		<section class="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 md:pt-36">
			<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
				{#each list.slice(6) as p (p.title)}<PostCard post={p} href={to('post')} />{/each}
			</div>
		</section>
	{/if}

	{#if active === 'All' || active === 'Press'}
		<section class="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 md:pt-36">
			<h2 class="text-[clamp(2.5rem,5vw,4rem)] leading-none font-medium tracking-[-0.04em] text-foreground">Press</h2>
			<ul class="mt-10 border-t border-border">
				{#each press as p (p.title)}
					<li>
						<a href={to('blog')} class="group grid items-center gap-1 border-b border-border py-5 transition-colors hover:bg-primary/[0.06] sm:grid-cols-[minmax(0,1fr)_160px_120px_32px] sm:gap-6 motion-reduce:transition-none">
							<span class="text-xl font-medium tracking-[-0.01em] text-foreground group-hover:text-primary">{p.title}</span>
							<span class="font-mono text-xs tracking-wide text-foreground uppercase">{p.outlet}</span>
							<span class="text-base text-foreground/85">{p.date}</span>
							<ArrowUpRight class="lucide hidden size-5 text-primary sm:block" />
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if !filtering}
		<section class="mx-auto max-w-[1320px] px-4 pt-28 pb-28 sm:px-6 md:pt-36">
			<h2 class="text-[clamp(2.5rem,5vw,4rem)] leading-none font-medium tracking-[-0.04em] text-foreground">Archive</h2>
			{#if more}
				<ul class="mt-10 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each archive as t (t)}<li><a href={to('blog')} class="flex items-start gap-3 text-lg text-foreground hover:text-primary"><span class="mt-2.5 size-2 shrink-0 bg-primary"></span>{t}</a></li>{/each}
				</ul>
			{/if}
			<Button variant="outline" size="lg" class="mt-10 rounded-full" onclick={() => (more = !more)}>{more ? 'Show less' : 'Load more'}</Button>
		</section>
	{:else}
		<div class="pb-28"></div>
	{/if}

	<SiteFooter />
</div>
