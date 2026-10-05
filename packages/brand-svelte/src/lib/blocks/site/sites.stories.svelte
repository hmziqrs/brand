<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'

	const { Story } = defineMeta({
		title: 'Sites/Landing pages',
		parameters: { layout: 'fullscreen' },
	})
</script>

<!--
	Every hmziq site's landing page (the lab's Sites.stories), composed from
	the kit's blocks with the sites' real words. The words live in
	content/stories-data.ts, named after the lab file they came from.
-->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Star from "@lucide/svelte/icons/star";
	import { siGithub } from "simple-icons";
	import { cn } from "$brand/utils.js";
	import SiteShell from "./site-shell.svelte";
	import Container from "./container.svelte";
	import Hero from "./hero.svelte";
	import HeroNote from "./hero-note.svelte";
	import Section from "./section.svelte";
	import CtaBand from "./cta-band.svelte";
	import ButtonLink from "./button-link.svelte";
	import OutlineCard from "./outline-card.svelte";
	import BigNumbers from "./big-numbers.svelte";
	import EmptyNote from "./empty-note.svelte";
	import SearchBox from "./search-box.svelte";
	import TopicChips from "./topic-chips.svelte";
	import PageIntro from "./page-intro.svelte";
	import NewsletterBand from "../content/newsletter-band.svelte";
	import BlogLayout from "../content/blog-layout.svelte";
	import Rings from "$brand/components/rings.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import { Badge } from "$brand/ui/badge/index.js";
	import { initiatives, projects, experience, tools, homePost, labStats, activity, postTone } from "../content/stories-data.js";

	let blogTopic = $state("All");
	let blogQuery = $state("");
	const blogShown = $derived(
		(blogTopic === "All" || blogTopic === homePost.category) &&
			(!blogQuery.trim() || `${homePost.title} ${homePost.summary}`.toLowerCase().includes(blogQuery.trim().toLowerCase())),
	);
</script>

<Story name="hmziq.rs" asChild>
	<SiteShell site="hmziq" nav={["Work", "Writing", "Labs", "About"]} cta={{ label: "Get in touch" }}>
		<Hero>
			{#snippet title()}I build apps for phones, computers, the web and the terminal.{/snippet}
			{#snippet lede()}Senior software engineer with nine years of experience. I make things people use every day, and I keep them working long after launch.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">See my work</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Read my CV</ButtonLink>
			{/snippet}
			{#snippet note()}
				{#each ["GitHub", "LinkedIn", "X", "Email"] as l (l)}<a href="#" class="hover:text-foreground">{l}</a>{/each}
			{/snippet}
			{#snippet aside()}
				<!-- Rings are the words' neighbour, never a stacked block: below md there is no room beside the words, so they sit out entirely. -->
				<div class="hidden md:block">
					<Rings seed="hmziq" />
				</div>
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}What I'm working on{/snippet}
			{#snippet children()}
				<div class="grid gap-4 md:grid-cols-3">
					{#each initiatives as i (i.name)}
						<OutlineCard>
							<CornerRings seed={i.name} quiet class="w-1/2" />
							<Tag tone={i.status === "Active" ? "success" : undefined} marker={i.status === "Active"} class="relative">{i.status}</Tag>
							<h3 class="relative text-lg font-medium">{i.name}</h3>
							<p class="relative text-[0.9rem] leading-relaxed text-muted-foreground">{i.body}</p>
						</OutlineCard>
					{/each}
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Things I've made{/snippet}
			{#snippet intro()}Open source, with the number of people who starred them on GitHub.{/snippet}
			{#snippet children()}
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each projects as p (p.name)}
						<OutlineCard href="#">
							<div class="flex items-start justify-between gap-3">
								<h3 class="text-lg font-medium">{p.name}</h3>
								{#if p.stars !== null}
									<span class="flex shrink-0 items-center gap-1 text-sm text-muted-foreground tabular-nums">
										<Star class="lucide size-3.5" aria-hidden="true" />
										{p.stars}
										<span class="sr-only">stars</span>
									</span>
								{/if}
							</div>
							<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{p.body}</p>
							<p class="mt-auto flex items-center gap-2 pt-2 text-[0.8125rem] text-muted-foreground">
								<Marker class="text-primary" />
								{p.tools}
							</p>
						</OutlineCard>
					{/each}
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Experience{/snippet}
			{#snippet children()}
				<ol class="border-t">
					{#each experience as e (e.company)}
						<li class="grid gap-2 border-b py-6 md:grid-cols-[12rem_1fr] md:gap-8">
							<div class="flex flex-col gap-0.5">
								<span class="font-medium">{e.company}</span>
								<span class="text-sm text-muted-foreground">{e.dates}</span>
							</div>
							<div class="flex flex-col gap-1">
								<span class="text-sm font-medium">{e.role}</span>
								<p class="text-sm leading-relaxed text-muted-foreground">{e.body}</p>
							</div>
						</li>
					{/each}
				</ol>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Tools I use{/snippet}
			{#snippet intro()}Across phones, the web, desktops and servers.{/snippet}
			{#snippet children()}
				<ul class="flex flex-wrap gap-2">
					{#each tools as t (t)}
						<li><Badge variant="outline" class="px-2.5 py-1 text-sm">{t}</Badge></li>
					{/each}
				</ul>
			{/snippet}
		</Section>

		<CtaBand title="Have something to build?">
			{#snippet body()}Email is the most direct line. GitHub and the socials work too, and every message gets a real reply.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Get in touch</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Read my CV</ButtonLink>
			{/snippet}
		</CtaBand>
	</SiteShell>
</Story>

<Story name="blog.hmziq.rs" asChild>
	<BlogLayout current="Posts">
		<Container>
			<PageIntro>
				{#snippet title()}Notes from building software.{/snippet}
				{#snippet lede()}Rust, TypeScript, Flutter, and what I learned the hard way shipping real things.{/snippet}
			</PageIntro>
		</Container>

		<Container class="pb-16">
			<div class="mb-7 flex flex-wrap items-center gap-3">
				<SearchBox label="Search posts" value={blogQuery} onChange={(v) => (blogQuery = v)} class="w-auto min-w-64" />
				<TopicChips items={["All", "Engineering"]} value={blogTopic} onChange={(v) => (blogTopic = v)} tone={(t) => (t === "All" ? undefined : postTone(t))} />
			</div>
			{#if blogShown}
				<OutlineCard href="#" class="p-6 sm:p-10">
					<CornerRings seed={homePost.title} color="var(--blue)" quiet class="w-[38%]" />
					<p class="relative flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted-foreground">
						<Tag tone={postTone(homePost.category)}>{homePost.category}</Tag>
						<span>{homePost.date} · 4 min read</span>
					</p>
					<h2 class="relative max-w-xl text-2xl leading-[1.15] font-medium tracking-[-0.03em] sm:text-[2.1rem]">{homePost.title}</h2>
					<p class="relative max-w-[34rem] text-base leading-relaxed text-muted-foreground">{homePost.summary}</p>
					<span class="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
						Read the post
						<ArrowRight class="lucide size-3.75" />
					</span>
				</OutlineCard>
			{:else}
				<EmptyNote>No posts match that. Try another word or topic.</EmptyNote>
			{/if}
			<p class="mt-6 text-sm text-muted-foreground">This is the first post. Subscribe below to get the next ones by email.</p>
		</Container>

		<NewsletterBand />
	</BlogLayout>
</Story>

<Story name="hmziq.xyz (labs)" asChild>
	<SiteShell site="Labs" maker="by hmziq" nav={["Experiments", "Activity", "About"]} cta={{ label: "Follow on GitHub" }}>
		<Hero>
			{#snippet title()}Experiments, in the open.{/snippet}
			{#snippet lede()}Things I build to see if they work. Some grow into real projects, most stay here. Everything is public on GitHub.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Explore the experiments</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					Follow on GitHub
				</ButtonLink>
			{/snippet}
			{#snippet aside()}
				<div class="hidden md:block">
					<Rings seed="Labs" />
				</div>
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}This year so far{/snippet}
			{#snippet children()}
				<BigNumbers items={labStats} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Recent activity{/snippet}
			{#snippet intro()}What changed lately, straight from GitHub.{/snippet}
			{#snippet children()}
				<!-- A timeline: a ring for each change, joined by a line. -->
				<ol class="flex max-w-2xl flex-col">
					{#each activity as a, i (a.repo + a.when)}
						<li
							class={cn(
								"relative grid gap-x-6 gap-y-0.5 pb-8 pl-9 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto]",
								"before:absolute before:top-[0.42rem] before:left-0 before:z-10 before:size-3.25 before:rounded-full before:border-[1.75px] before:border-primary before:bg-background",
								i < activity.length - 1 && "after:absolute after:top-[1.45rem] after:bottom-1 after:left-[calc(0.4rem-0.5px)] after:w-px after:bg-border",
							)}
						>
							<span class="font-medium">{a.repo}</span>
							<span class="text-sm text-muted-foreground sm:row-span-2 sm:pt-0.5">{a.when}</span>
							<span class="text-sm text-muted-foreground">{a.what}</span>
						</li>
					{/each}
				</ol>
			{/snippet}
		</Section>

		<CtaBand title="Follow along">
			{#snippet body()}Everything here is public. Follow on GitHub to see new experiments as they land.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					Follow on GitHub
				</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Explore the experiments</ButtonLink>
			{/snippet}
		</CtaBand>
	</SiteShell>
</Story>
