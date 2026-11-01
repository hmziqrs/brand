<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import PatinaRain from '$moves/dovetail/patina-rain.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import PostCover from '$moves/site-dovetail/post-cover.svelte';
	import PostTile from '$moves/site-dovetail/post-tile.svelte';
	import { posts, blogTags } from '$moves/site-dovetail/posts';
	import { to } from '$moves/site-dovetail/site';
	import { cn } from '$brand/utils.js';

	let tag = $state('All');
	let shown = $state(12);
	const list = $derived(posts.filter((p) => tag === 'All' || p.tags.includes(tag)));
	const lead = $derived(list[0]);
</script>

<svelte:head><title>Blog — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="blog" />

	<section class="relative isolate overflow-hidden">
		<PatinaRain mode="rain" cell={16} opacity={0.4} mask="fade-bottom" seed="contextline-blog" class="-z-10 text-foreground" />
		<div class="w-full px-4 pt-20 pb-14 sm:px-6 sm:pt-28 lg:px-10">
			<h1 class="inline-block rounded-2xl bg-background pr-5 text-[clamp(6rem,22vw,20rem)] leading-[0.8] font-semibold tracking-[-0.07em] text-foreground">Blog<span class="ml-[0.04em] inline-block size-[0.17em] bg-primary"></span></h1>
			<div class="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<p class="max-w-[38rem] rounded-xl bg-background py-1 pr-3 text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.35] tracking-[-0.015em] text-foreground">Field notes on customer evidence, agents and the craft of building with both — from the team behind Contextline.</p>
				<div class="flex flex-wrap gap-1.5 self-start rounded-xl bg-background p-1.5 lg:self-auto" role="group" aria-label="Filter posts">
					{#each blogTags as t (t)}
						<button type="button" aria-pressed={tag === t} onclick={() => ((tag = t), (shown = 12))} class={cn('rounded-lg px-3.5 py-2 text-[0.9rem] transition-colors', tag === t ? 'bg-orange text-[var(--on-orange)]' : 'bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]')}>{t}</button>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="w-full px-4 pt-10 pb-24 sm:px-6 lg:px-10">
		{#if lead}
			<a href={to('post')} class="group grid items-center gap-8 border-b border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] pb-16 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
				<PostCover cover={lead.cover} seed={3} class="ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)] transition-[box-shadow] group-hover:ring-primary" />
				<div>
					<p class="flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.14em] text-foreground uppercase"><span class="size-2 bg-primary"></span>Latest · {lead.date}</p>
					<h2 class="mt-5 text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance text-foreground group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.12em]">{lead.title}</h2>
					<p class="mt-6 font-mono text-[0.72rem] tracking-[0.1em] text-muted-foreground uppercase">{lead.tags.map((t) => `[${t}]`).join(' ')}</p>
					<span class="mt-8 inline-flex items-center gap-2 text-[1.05rem] font-medium text-foreground">Read the post <ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
				</div>
			</a>
		{/if}
		<div class="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
			{#each list.slice(1, shown + 1) as p, i (p.title)}<PostTile post={p} seed={i + 7} />{/each}
		</div>
		{#if !list.length}<p class="py-16 text-[1.1rem] text-foreground">Nothing under that tag yet.</p>{/if}
		{#if list.length > shown + 1}
			<div class="mt-16 flex justify-center"><Button variant="outline" size="lg" onclick={() => (shown += 6)}>Load more</Button></div>
		{/if}
	</section>

	<ProofCrowd lines={['Read', 'less', 'hype,', 'more', 'proof']} accent={4}>
		{#snippet after()}
			<div class="flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('pricing')} class="bg-background">Start free</Button>
			</div>
		{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
