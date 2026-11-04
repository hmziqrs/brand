<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import SummaryBox from '$brand/blocks/site/summary-box.svelte';
	import PostMeta from '$brand/blocks/content/post-meta.svelte';
	import ShareBar from '$brand/blocks/content/share-bar.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import { scrollSpy } from '@hmziq/brand-core/scroll-spy';
	import Byline from './byline.svelte';
	import EndLinks from './end-links.svelte';
	import PostCard from './post-card.svelte';
	import StackFigure from './stack-figure.svelte';
	import { intro, item, postUrl, real, related, scrollToId, sections, tldr, topicTone } from './posts';
	import { display, heading, kicker, para, sectionTitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const uid = $props.id();
	const titles = Object.fromEntries(sections.map((s) => [s.id, s.title]));
	let active = $state(sections[0].id);

	$effect(() => scrollSpy(sections.map((s) => `${uid}-${s.id}`), (id) => (active = id.slice(uid.length + 1))));

	function go(e: MouseEvent, id: string) {
		e.preventDefault();
		scrollToId(`${uid}-${id}`);
	}
</script>

<article data-slot="blog-post-drawn" class={cn('pb-28 md:pb-36', className)}>
	<Container size="wide" class="pt-12 md:pt-20">
		<div class="xl:grid xl:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] xl:gap-x-20">
			<header>
				<PostMeta post={item(real, true)} tone={topicTone} />
				<h1 class={cn(display, 'mt-6 text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.02]')}>{real.title}</h1>
				<p class="mt-6 text-xl leading-snug text-foreground md:text-[1.375rem]">{real.summary}</p>
				<div class="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
					<Byline />
					<p class="flex flex-wrap gap-1.5">
						{#each real.tags as t (t)}<Tag href={here}>#{t}</Tag>{/each}
					</p>
				</div>
			</header>

			<div class="mt-12 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-0">
				<div class="max-w-[36rem] xl:sticky xl:top-24 xl:max-w-none">
					<StackFigure {active} {titles} onpick={(s) => scrollToId(`${uid}-${s}`)} />
				</div>
			</div>

			<div class="mt-12 min-w-0 xl:col-start-1 xl:row-start-2">
				<nav aria-label="On this page" class="flex flex-wrap items-center gap-x-1 gap-y-2 border-y border-border py-3">
					<span class={cn(kicker, 'mr-2 text-muted-foreground')}>On this page</span>
					{#each sections as s (s.id)}
						<a
							href={here}
							onclick={(e) => go(e, s.id)}
							aria-current={active === s.id ? 'location' : undefined}
							class="rounded-full px-2.5 py-1 text-sm text-foreground/75 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=location]:text-primary motion-reduce:transition-none"
						>{s.title}</a>
					{/each}
				</nav>
				<p class={cn(para, 'mt-10')}>{intro}</p>
				<SummaryBox label="TL;DR" class="mt-8 text-[1.0625rem] text-foreground">{tldr}</SummaryBox>
				{#each sections as s (s.id)}
					<h2 id={`${uid}-${s.id}`} class={cn(heading, 'mt-14')}>{s.title}</h2>
					{#each s.blocks as b, i (i)}
						{#if b.kind === 'p'}
							<p class={cn(para, 'mt-5')}>{b.text}</p>
						{:else}
							<EndLinks items={b.items} class="mt-6" />
						{/if}
					{/each}
				{/each}
				<ShareBar url={postUrl} title={real.title} class="mt-16" />
				<div class="mt-10 border-t border-border pt-8"><Byline links /></div>
			</div>
		</div>
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<h2 class={sectionTitle}>Read next</h2>
		<div class="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
			{#each related.slice(0, 3) as p (p.slug)}<PostCard post={p} href={here} />{/each}
		</div>
	</Container>
</article>
