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
	import AppWindow from "@lucide/svelte/icons/app-window";
	import Archive from "@lucide/svelte/icons/archive";
	import Ban from "@lucide/svelte/icons/ban";
	import Bell from "@lucide/svelte/icons/bell";
	import Blocks from "@lucide/svelte/icons/blocks";
	import BookOpenText from "@lucide/svelte/icons/book-open-text";
	import Command from "@lucide/svelte/icons/command";
	import Database from "@lucide/svelte/icons/database";
	import FolderLock from "@lucide/svelte/icons/folder-lock";
	import FolderTree from "@lucide/svelte/icons/folder-tree";
	import GitBranch from "@lucide/svelte/icons/git-branch";
	import InfinityIcon from "@lucide/svelte/icons/infinity";
	import KeyRound from "@lucide/svelte/icons/key-round";
	import Languages from "@lucide/svelte/icons/languages";
	import ListChecks from "@lucide/svelte/icons/list-checks";
	import ListRestart from "@lucide/svelte/icons/list-restart";
	import Palette from "@lucide/svelte/icons/palette";
	import Puzzle from "@lucide/svelte/icons/puzzle";
	import RefreshCw from "@lucide/svelte/icons/refresh-cw";
	import ScanSearch from "@lucide/svelte/icons/scan-search";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
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
	import ElementCard from "./element-card.svelte";
	import FeatureGrid from "./feature-grid.svelte";
	import FeatureCards from "./feature-cards.svelte";
	import RingStats from "./ring-stats.svelte";
	import Steps from "./steps.svelte";
	import BeforeAfter from "./before-after.svelte";
	import ProvidersTable from "./providers-table.svelte";
	import CodeEditor from "../content/code-editor.svelte";
	import MenuDemo from "../content/menu-demo.svelte";
	import InstallBlock from "../content/install-block.svelte";
	import InstanceGraph from "../content/instance-graph.svelte";
	import Rings from "$brand/components/rings.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Tag from "$brand/components/tag.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import InlineCode from "$brand/components/inline-code.svelte";
	import CommandBar from "$brand/components/command-bar.svelte";
	import Questions from "$brand/components/questions.svelte";
	import Question from "$brand/components/question.svelte";
	import TerminalWindow from "$brand/components/terminal-window.svelte";
	import TerminalBody from "$brand/components/terminal-body.svelte";
	import TerminalLine from "$brand/components/terminal-line.svelte";
	import { Badge } from "$brand/ui/badge/index.js";
	import { Kbd } from "$brand/ui/kbd/index.js";
	import { initiatives, projects, experience, tools, homePost, labStats, activity, postTone } from "../content/stories-data.js";
	import {
		addInstance,
		claudeSetup,
		comparison,
		editorFiles,
		features,
		freeoxideFacts,
		freeoxideProjects,
		freeoxideStandards,
		gpuiFaq,
		inside,
		installChecks,
		installs,
		instances,
		listed,
		menu,
		previewNav,
		previewThemes,
		providers,
		queryFeatures,
		queryFooterLinks,
		querySamples,
		settingsJson,
		starterFeatures,
		starterFooterLinks,
		starterPages,
		starterRoute,
	} from "../content/stories-data.js";

	let blogTopic = $state("All");
	let blogQuery = $state("");
	const blogShown = $derived(
		(blogTopic === "All" || blogTopic === homePost.category) &&
			(!blogQuery.trim() || `${homePost.title} ${homePost.summary}`.toLowerCase().includes(blogQuery.trim().toLowerCase())),
	);
	</script>

{#snippet appWindowIcon()}<AppWindow class="lucide" />{/snippet}
{#snippet archiveIcon()}<Archive class="lucide" />{/snippet}
{#snippet banIcon()}<Ban class="lucide" />{/snippet}
{#snippet bellIcon()}<Bell class="lucide" />{/snippet}
{#snippet blocksIcon()}<Blocks class="lucide" />{/snippet}
{#snippet bookOpenTextIcon()}<BookOpenText class="lucide" />{/snippet}
{#snippet commandIcon()}<Command class="lucide" />{/snippet}
{#snippet databaseIcon()}<Database class="lucide" />{/snippet}
{#snippet folderLockIcon()}<FolderLock class="lucide" />{/snippet}
{#snippet folderTreeIcon()}<FolderTree class="lucide" />{/snippet}
{#snippet gitBranchIcon()}<GitBranch class="lucide" />{/snippet}
{#snippet infinityIcon()}<InfinityIcon class="lucide" />{/snippet}
{#snippet keyRoundIcon()}<KeyRound class="lucide" />{/snippet}
{#snippet languagesIcon()}<Languages class="lucide" />{/snippet}
{#snippet listChecksIcon()}<ListChecks class="lucide" />{/snippet}
{#snippet listRestartIcon()}<ListRestart class="lucide" />{/snippet}
{#snippet paletteIcon()}<Palette class="lucide" />{/snippet}
{#snippet puzzleIcon()}<Puzzle class="lucide" />{/snippet}
{#snippet refreshCwIcon()}<RefreshCw class="lucide" />{/snippet}
{#snippet scanSearchIcon()}<ScanSearch class="lucide" />{/snippet}
{#snippet shieldCheckIcon()}<ShieldCheck class="lucide" />{/snippet}
{#snippet sparklesIcon()}<Sparkles class="lucide" />{/snippet}
{#snippet squareTerminalIcon()}<SquareTerminal class="lucide" />{/snippet}
{#snippet launcherBody()}Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to jump to any page or action in the app.{/snippet}
{#snippet runBody()}Type <InlineCode>cargo run</InlineCode>. The app builds and opens with every page working.{/snippet}
{#snippet testBody()}<InlineCode>cargo test</InlineCode> runs every check, including one that rejects fake updates.{/snippet}
{#snippet releaseBody()}<InlineCode>just release</InlineCode> signs the update and publishes it on GitHub.{/snippet}

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

<Story name="freeoxide.com" asChild>
	<SiteShell site="freeoxide" maker="by hmziq" nav={["Projects", "How I work", "About"]} cta={{ label: "Browse projects" }}>
		<Hero>
			{#snippet title()}Free Rust tools, finished before they ship.{/snippet}
			{#snippet lede()}Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
			{#snippet note()}<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>{/snippet}
			{#snippet aside()}
				<!-- Rings are beside-the-words decoration: below md they sit out rather than stack. -->
				<div class="hidden md:block"><Rings seed="freeoxide" /></div>
			{/snippet}
		</Hero>

		<RingStats items={freeoxideFacts} />

		<Section>
			{#snippet title()}The projects{/snippet}
			{#snippet intro()}A short list on purpose. Each one ships only when it meets every standard below.{/snippet}
			{#snippet children()}
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each freeoxideProjects as p (p.name)}
						<ElementCard {...p} />
					{/each}
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}How every project is made{/snippet}
			{#snippet intro()}I handle the architecture myself. For reviews and testing I use AI across several separate sessions, because each one catches different things.{/snippet}
			{#snippet children()}
				<FeatureGrid
					items={freeoxideStandards.map(([title, body], i) => ({ title, body, icon: [folderTreeIcon, scanSearchIcon, listChecksIcon, bookOpenTextIcon, gitBranchIcon][i] }))}
				/>
			{/snippet}
		</Section>

		<CtaBand title="One person. All of it.">
			{#snippet body()}I'm hmziq. I write Rust, ship the tools and open-source the results. Everything under freeoxide is built, tested and reviewed by me.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Read the full story</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Get in touch</ButtonLink>
			{/snippet}
		</CtaBand>
	</SiteShell>
</Story>

<Story name="gpui-starter" asChild>
	<SiteShell site="gpui-starter" maker="by freeoxide" nav={["Docs", "Blog", "FAQ", "Changelog"]} cta={{ label: "Get started" }} footerLinks={starterFooterLinks}>
		<Hero>
			{#snippet title()}Start your desktop app with the boring parts done.{/snippet}
			{#snippet lede()}A ready-made starting point for Mac, Windows and Linux apps built with GPUI, the framework behind the Zed editor. Windows, themes, translations, settings and updates already work. Delete what you don't need.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Get started</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
			{#snippet note()}<HeroNote>Free and open source. Works on macOS, Windows and Linux.</HeroNote>{/snippet}
			{#snippet aside()}
				<div class="overflow-hidden rounded-xl border" role="img" aria-label="Preview of the starter app: a sidebar, a welcome page and a theme picker">
					<div class="flex h-9 items-center gap-2 border-b px-3">
						<span class="flex gap-1.5" aria-hidden="true">
							<span class="size-2.5 rounded-full bg-muted-foreground/40"></span>
							<span class="size-2.5 rounded-full bg-muted-foreground/40"></span>
							<span class="size-2.5 rounded-full bg-muted-foreground/40"></span>
						</span>
						<span class="mx-auto text-xs text-muted-foreground">gpui-starter</span>
					</div>
					<div class="grid grid-cols-[8.5rem_1fr]">
						<ul class="flex flex-col gap-0.5 border-r p-2 text-sm">
							{#each previewNav as item, i (item)}
								<li class={i === 0 ? "rounded-md bg-primary/10 px-2.5 py-1.5 text-primary dark:bg-primary/20" : "px-2.5 py-1.5 text-muted-foreground"}>{item}</li>
							{/each}
						</ul>
						<div class="flex flex-col gap-4 p-5">
							<div class="flex flex-col gap-1">
								<p class="font-medium">Welcome to GPUI Starter</p>
								<p class="text-sm text-muted-foreground">A starting point for desktop apps.</p>
							</div>
							<div class="flex flex-wrap gap-1.5">
								<Badge variant="outline">24 themes</Badge>
								<Badge variant="outline">2 languages</Badge>
								<Badge variant="outline">100% Rust</Badge>
							</div>
							<div class="flex flex-col gap-2 rounded-lg border p-3">
								<p class="text-xs text-muted-foreground">Theme</p>
								<div class="grid grid-cols-2 gap-1.5 text-xs">
									{#each previewThemes as t, i (t)}
										<span class={i === 1 ? "rounded-md border border-primary/60 bg-primary/10 px-2 py-1.5" : "rounded-md border px-2 py-1.5 text-muted-foreground"}>{t}</span>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}Everything a real app needs, already connected{/snippet}
			{#snippet intro()}Each part lives in its own folder. Take out the ones you don't want and nothing else breaks.{/snippet}
			{#snippet children()}
				<FeatureGrid
					items={starterFeatures.map(([title, body], i) => ({ title, body: body ?? launcherBody, icon: [appWindowIcon, databaseIcon, bellIcon, paletteIcon, languagesIcon, shieldCheckIcon, refreshCwIcon, commandIcon][i] }))}
				/>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Six working pages on the first run{/snippet}
			{#snippet intro()}Not a hello-world. Every page is live the first time you open the app, so you can see how the parts fit together.{/snippet}
			{#snippet children()}
				<div class="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{#each starterPages as [name, body] (name)}
						<div class="flex flex-col gap-2 bg-background p-6">
							<h3 class="font-medium">{name}</h3>
							<p class="text-sm leading-relaxed text-muted-foreground">{body}</p>
						</div>
					{/each}
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}From first run to release{/snippet}
			{#snippet intro()}Every step is a real command in the project.{/snippet}
			{#snippet children()}
				<Steps
					items={[
						{ title: "Run it", body: runBody },
						{ title: "Make it yours", body: "Copy a theme file and edit it. The app picks up the change without restarting." },
						{ title: "Test it", body: testBody },
						{ title: "Package it", body: "One script builds a signed Mac app you can open straight away." },
						{ title: "Release it", body: releaseBody },
					]}
				/>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Adding a page takes one line{/snippet}
			{#snippet intro()}Register it once, and the sidebar, the launcher and links to it all update.{/snippet}
			{#snippet children()}
				<CodeBlock label="src/shell/route.rs" code={starterRoute} lang="rust" />
			{/snippet}
		</Section>

		<CtaBand title="Clone it and run it">
			{#snippet body()}Clone the repository from GitHub, run <InlineCode>cargo run</InlineCode>, and follow the quickstart from there.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Read the quickstart</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
		</CtaBand>
	</SiteShell>
</Story>

<Story name="gpui-query" asChild>
	<SiteShell site="gpui-query" maker="by freeoxide" nav={["Docs", "Blog", "FAQ"]} cta={{ label: "Get started" }} footerLinks={queryFooterLinks}>
		<Hero>
			{#snippet title()}Load data in GPUI apps without writing the plumbing.{/snippet}
			{#snippet lede()}gpui-query fetches, caches and refreshes data for you, tries again when the connection drops, and stops work when a view closes. It brings the ideas behind TanStack Query to GPUI, the framework behind the Zed editor.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Get started</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
			{#snippet note()}<HeroNote>Free and open source, MIT licensed.</HeroNote>{/snippet}
			{#snippet aside()}
				<!-- Rings are beside-the-words decoration: below md they sit out rather than stack. -->
				<div class="hidden md:block"><Rings seed="gpui-query" /></div>
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}Add it to your app{/snippet}
			{#snippet intro()}One command in your crate. The hook feature gives you use_query and use_mutation.{/snippet}
			{#snippet children()}
				<CommandBar command="cargo add gpui-query --features hook" />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Everything loading data needs{/snippet}
			{#snippet intro()}The full set of TanStack Query ideas, rebuilt around how GPUI works.{/snippet}
			{#snippet children()}
				<FeatureGrid
					items={queryFeatures.map(([title, body], i) => ({ title, body, icon: [sparklesIcon, databaseIcon, listRestartIcon, infinityIcon, banIcon, archiveIcon][i] }))}
				/>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Three functions. That's the whole API.{/snippet}
			{#snippet intro()}Loading, saving and paging all work the same way: a name for the data, a function that gets it, and your context.{/snippet}
			{#snippet children()}
				<CodeBlock files={querySamples.map((s) => ({ label: s.label, code: s.code, lang: "rust" as const }))} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}The same view, both ways{/snippet}
			{#snippet intro()}A view that loads one user. By hand it has no cache and no retry, and it still has a bug. With gpui-query it has all of that, in fewer lines.{/snippet}
			{#snippet children()}
				<CodeEditor files={editorFiles} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}What gpui-query takes off your plate{/snippet}
			{#snippet intro()}Everything a data-loading view needs, written by hand or handled for you.{/snippet}
			{#snippet children()}
				<BeforeAfter rows={comparison} before="By hand" after="With gpui-query" />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Questions people ask{/snippet}
			{#snippet intro()}Straight answers, grouped by topic.{/snippet}
			{#snippet children()}
				<Questions>
					{#each gpuiFaq as [, question, answer], i (question)}
						<Question open={i === 0}>
							{#snippet question()}{question}{/snippet}
							{answer}
						</Question>
					{/each}
				</Questions>
			{/snippet}
		</Section>

		<CtaBand title="Add it to your app">
			{#snippet body()}Run <InlineCode>cargo add gpui-query</InlineCode>, keep your views small, and let gpui-query handle the rest.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Read the guide</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
		</CtaBand>
	</SiteShell>
</Story>

<Story name="claude-multi" asChild>
	<SiteShell site="claude-multi" nav={["Docs", "Providers", "Blog", "Changelog", "FAQ", "About"]} cta={{ label: "Get started" }}>
		{#snippet extra()}<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>{/snippet}
		<Hero>
			{#snippet title()}Run a separate Claude Code for every provider.{/snippet}
			{#snippet lede()}Trying a new model means hand-editing settings.json, swapping keys, and keeping a pile of shell aliases alive. claude-multi gives each provider its own claude-&lt;name&gt; command and its own config directory. All of them run the normal, unmodified claude binary.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Get started</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View source
				</ButtonLink>
			{/snippet}
			{#snippet note()}
				<HeroNote>MIT licensed</HeroNote>
				<HeroNote>Works with claude-code 2.x</HeroNote>
				<HeroNote>Instances share nothing</HeroNote>
			{/snippet}
			{#snippet below()}
				<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
			{/snippet}
		</Hero>

		<Section>
			{#snippet title()}It installs like any npm package{/snippet}
			{#snippet intro()}Install it globally with whatever manager the machine already has. There is no shell script to pipe and no platform binary to match.{/snippet}
			{#snippet children()}
				<InstallBlock commands={installs} items={installChecks} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Switching models shouldn't rewrite ~/.claude{/snippet}
			{#snippet intro()}Add as many instances as you want. claude-multi never writes to the setup you already have.{/snippet}
			{#snippet children()}
				<FeatureCards items={features.map(([title, body], i) => ({ title, body, icon: [squareTerminalIcon, folderLockIcon, puzzleIcon, blocksIcon, keyRoundIcon][i] }))} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Seven providers, already wired up{/snippet}
			{#snippet intro()}Each template already knows the endpoint, the model names and sensible defaults. Pick one, paste a key, and what lands on disk is plain config you can read.{/snippet}
			{#snippet children()}
				<ProvidersTable {providers} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}One folder per instance{/snippet}
			{#snippet intro()}Every instance is a real directory under ~/.claude-multi. Open it, edit it, or delete it. Nothing is hidden from you.{/snippet}
			{#snippet children()}
				<InstanceGraph {instances} {inside} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Add a provider, get a command{/snippet}
			{#snippet intro()}The whole flow lives in the menu. There are no subcommands to learn.{/snippet}
			{#snippet children()}
				<div class="flex flex-col gap-8">
					<Steps
						items={[
							{ title: "Launch the menu", body: "Type claude-multi and hit enter. The menu walks you through naming the instance, picking a provider, pasting the key, and choosing what to carry over from your default Claude setup." },
							{ title: "Run the new alias", body: "The wizard prints something like claude-glm. Run it. Every flag and slash command from claude works as expected." },
						]}
					/>
					<TerminalWindow title="setup">
						<TerminalBody>
							{#each claudeSetup as line, i (i)}
								<TerminalLine {line} />
							{/each}
						</TerminalBody>
					</TerminalWindow>
				</div>
			{/snippet}
		</Section>

		<CtaBand title="Ready to try it?">
			{#snippet body()}One npm install, two commands, and you have your first provider running.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Get started</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Browse providers</ButtonLink>
			{/snippet}
		</CtaBand>
	</SiteShell>
</Story>
