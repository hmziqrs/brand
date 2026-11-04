<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import SummaryBox from '$brand/blocks/site/summary-box.svelte';
	import PostMeta from '$brand/blocks/content/post-meta.svelte';
	import ShareBar from '$brand/blocks/content/share-bar.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import Byline from './byline.svelte';
	import EndLinks from './end-links.svelte';
	import OxideQuote from './oxide-quote.svelte';
	import PostCard from './post-card.svelte';
	import PostToc from './post-toc.svelte';
	import { fixes, intro, item, postUrl, pulled, real, related, sections, tldr, toc, topicTone } from './posts';
	import { display, heading, kicker, para } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const uid = $props.id();
	const items = toc(uid);
	const next = related.slice(0, 2);
</script>

<article data-slot="blog-post-margins" class={cn('pb-28 md:pb-36', className)}>
	<Container size="wide" class="pt-12 md:pt-20">
		<div class="xl:grid xl:grid-cols-[13rem_minmax(0,42rem)_16rem] xl:justify-between xl:gap-x-10">
			<header class="mx-auto max-w-[42rem] xl:col-start-2 xl:mx-0 xl:max-w-none">
				<PostMeta post={item(real, true)} tone={topicTone} />
				<h1 class={cn(display, 'mt-6 text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.02]')}>{real.title}</h1>
				<p class="mt-6 text-xl leading-snug text-foreground md:text-[1.375rem]">{real.summary}</p>
				<div class="mt-9 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
					<Byline />
					<ShareBar url={postUrl} title={real.title} variant="rings" />
				</div>
			</header>

			<aside class="hidden xl:col-start-1 xl:row-start-2 xl:block">
				<PostToc {items} {here} numbered class="sticky top-24 mt-14" />
			</aside>

			<div class="mx-auto mt-12 max-w-[42rem] min-w-0 xl:col-start-2 xl:row-start-2 xl:mx-0 xl:max-w-none">
				<p class={para}>{intro}</p>
				<SummaryBox label="TL;DR" class="mt-8 text-[1.0625rem] text-foreground">{tldr}</SummaryBox>
				{#each sections as s, si (s.id)}
					<p class={cn(kicker, 'mt-16')}>{String(si + 1).padStart(2, '0')}</p>
					<h2 id={`${uid}-${s.id}`} class={cn(heading, 'mt-3')}>{s.title}</h2>
					{#each s.blocks as b, i (i)}
						{#if b.kind === 'links'}
							<EndLinks items={b.items} class="mt-6" />
						{:else if s.id === 'vibe-coding' && i === 1}
							<p class={cn(para, 'mt-5')}>{fixes.lead}</p>
							<ol class="mt-5 flex flex-col border-t border-border">
								{#each fixes.items as f, k (f)}
									<li class="flex gap-4 border-b border-border py-3.5 text-[1.0625rem] leading-snug text-foreground">
										<span class="pt-0.5 font-mono text-xs text-primary tabular-nums">{String(k + 1).padStart(2, '0')}</span>
										<span>{f}</span>
									</li>
								{/each}
							</ol>
						{:else}
							<p class={cn(para, 'mt-5')}>{b.text}</p>
						{/if}
						{#if s.id === 'vibe-coding' && i === 3}<OxideQuote text={pulled} class="my-10" />{/if}
					{/each}
				{/each}
				<div class="mt-16 flex flex-wrap items-center gap-1.5 border-t border-border pt-6">
					<span class="mr-2 text-sm text-foreground/75">Filed under</span>
					<Tag tone={topicTone(real.category)} href={here}>{real.category}</Tag>
					{#each real.tags as t (t)}<Tag href={here}>#{t}</Tag>{/each}
				</div>
			</div>

			<aside class="mx-auto mt-20 max-w-[42rem] xl:col-start-3 xl:row-start-2 xl:mx-0 xl:mt-0 xl:max-w-none">
				<div class="xl:sticky xl:top-24 xl:mt-14">
					<p class={kicker}>Read next</p>
					<div class="mt-5 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-1">
						{#each next as p (p.slug)}<PostCard post={p} href={here} size="sm" summary={false} />{/each}
					</div>
				</div>
			</aside>
		</div>
	</Container>
</article>
