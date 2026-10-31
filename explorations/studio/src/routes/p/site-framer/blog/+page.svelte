<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import PostFeature from '$moves/site-framer/post-feature.svelte';
	import PostList from '$moves/site-framer/post-list.svelte';
	import PromptBox from '$moves/site-framer/prompt-box.svelte';
	import { posts, cats, updates } from '$moves/site-framer/posts';
	import { to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
</script>

<svelte:head><title>kiln blog</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="blog" />

	<section class="{wrap} pt-16 pb-20 md:pt-24">
		<SectionHead as="h1" size="xl" title="News, stories and resources" class="mb-12" />
		<PostFeature lead={posts[0]} side={posts.slice(1, 5)} />
	</section>

	<section class="{wrap} pb-24">
		<PostList {posts} {cats} />
	</section>

	<section class="{wrap} pb-8">
		<div class="mb-8 flex items-end justify-between gap-6">
			<h2 class="text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em]">Updates<span class="ml-[0.05em] inline-block size-[0.16em] bg-primary"></span></h2>
			<a href={to('blog')} class="inline-flex items-center gap-1.5 text-[0.9375rem] hover:text-primary">See what’s new<ArrowRight class="lucide size-4" /></a>
		</div>
		<div class="grid gap-px overflow-hidden rounded-[20px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
			{#each updates as [t, d], i (t)}
				<a href={to('blog')} class="group flex items-center justify-between gap-4 bg-background px-5 py-5 transition-colors hover:bg-card">
					<span><span class="block text-lg font-medium">{t}</span><span class="font-mono text-xs text-foreground/60">{d}, 2026</span></span>
					{#if i === 0}<span class="bg-primary px-1.5 py-0.5 font-mono text-[0.625rem] text-primary-foreground uppercase">New</span>{:else}<ArrowRight class="lucide size-4 opacity-0 transition-opacity group-hover:opacity-100" />{/if}
				</a>
			{/each}
		</div>
		<div class="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-border bg-border md:grid-cols-2">
			{#each [['Customer stories', 'How teams of every size ship and run their sites.'], ['Guides', 'Step-by-step help, from a first page to a 40,000-item CMS.']] as [t, b] (t)}
				<a href={to('blog')} class="group flex items-end justify-between gap-6 bg-background p-6 transition-colors hover:bg-card md:p-8">
					<span><span class="block text-2xl font-medium tracking-[-0.02em]">{t}</span><span class="mt-1 block text-lg text-foreground/75">{b}</span></span>
					<ArrowRight class="lucide size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
				</a>
			{/each}
		</div>
	</section>

	<SiteFooter preset="oxide-ink">
		{#snippet cta()}
			<div class="flex flex-col items-center text-center">
				<h2 class="text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.055em]">Your next idea starts here<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h2>
				<PromptBox glow={false} class="mt-10" chips={['Company blog', 'Changelog', 'Newsletter archive', 'Docs hub']} />
			</div>
		{/snippet}
	</SiteFooter>
</div>
