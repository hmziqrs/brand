<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import MaterialCover from '$moves/content/material-cover.svelte';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import StoryList from '$moves/site-flora/story-list.svelte';
	import { cover, posts, postHref } from '$moves/site-flora/site';

	const lead = posts[0];
	const next = posts.slice(1, 4);
</script>

<svelte:head><title>Journal — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav />

	<section class="mx-auto max-w-[1320px] px-4 pt-14 sm:px-8 sm:pt-20">
		<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">Journal</p>
		<div class="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
			<div>
				<h1 class="text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-foreground">{lead.title}</h1>
				<p class="mt-6 max-w-[44ch] text-xl leading-snug text-foreground">{lead.dek}</p>
				<p class="mt-4 text-[14px] text-muted-foreground">{lead.cat} · {lead.date}</p>
				<Button href={postHref(lead)} size="lg" class="mt-8 h-12 rounded-full px-6 text-base">Read the story <ArrowRight class="lucide" /></Button>
			</div>
			<a href={postHref(lead)} class="relative block aspect-[4/3] overflow-hidden rounded-3xl border border-border">
				<MaterialCover seed={lead.title} preset={cover(lead)} number="01" tilt sizes="(min-width: 1024px) 55vw, 100vw" class="!absolute inset-0" />
			</a>
		</div>

		<div class="mt-16 grid gap-x-4 gap-y-8 md:grid-cols-3">
			{#each next as p, i (p.title)}
				<a href={postHref(p)} class="group">
					<div class="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
						<MaterialCover seed={p.title} preset={cover(p)} number={String(i + 2).padStart(2, '0')} tilt sizes="(min-width: 768px) 33vw, 100vw" class="!absolute inset-0" />
					</div>
					<p class="mt-3 text-lg leading-snug font-medium text-foreground group-hover:text-primary">{p.title}</p>
					<p class="mt-1 text-[14px] text-muted-foreground">{p.cat} · {p.date}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="px-4 py-24 sm:px-8">
		<StoryList items={posts.slice(4)} />
	</section>

	<SiteFooter cta={null} />
</div>
