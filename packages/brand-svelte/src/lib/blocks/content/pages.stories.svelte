<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'

	const { Story } = defineMeta({
		title: 'Sites/Pages',
		parameters: { layout: 'fullscreen' },
	})
</script>

<!--
	Every other kind of page behind the hmziq sites (the lab's Pages.stories):
	the claude-multi inner pages, gpui-query's docs page, the blog's post,
	oxlabs' contact page and hmziq.rs' component catalog, composed from the
	kit's blocks with the sites' real words.
-->
<script lang="ts">
	import { siGithub } from "simple-icons";
	import { slug } from "@hmziq/brand-core/scroll-spy";
	import Pencil from "@lucide/svelte/icons/pencil";
	import SiteShell from "../site/site-shell.svelte";
	import Container from "../site/container.svelte";
	import PageIntro from "../site/page-intro.svelte";
	import Section from "../site/section.svelte";
	import CtaBand from "../site/cta-band.svelte";
	import ButtonLink from "../site/button-link.svelte";
	import OutlineCard from "../site/outline-card.svelte";
	import SearchBox from "../site/search-box.svelte";
	import TopicChips from "../site/topic-chips.svelte";
	import Prose from "../site/prose.svelte";
	import Kicker from "../site/kicker.svelte";
	import BigNumbers from "../site/big-numbers.svelte";
	import BeforeAfter from "../site/before-after.svelte";
	import Bullets from "../site/bullets.svelte";
	import SummaryBox from "../site/summary-box.svelte";
	import ProvidersTable from "../site/providers-table.svelte";
	import ProvidersPage from "../site/providers-page.svelte";
	import PricingPlans from "../site/pricing-plans.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import InlineCode from "$brand/components/inline-code.svelte";
	import DataTable from "$brand/components/data-table.svelte";
	import Notice from "$brand/components/notice.svelte";
	import FaqList from "./faq-list.svelte";
	import PostList from "./post-list.svelte";
	import ReleaseHead from "./release-head.svelte";
	import ReleaseNotes from "./release-notes.svelte";
	import ReleaseTimeline from "./release-timeline.svelte";
	import LegalLayout from "./legal-layout.svelte";
	import LegalSection from "./legal-section.svelte";
	import LegalBlock from "./legal-block.svelte";
	import NotFound from "./not-found.svelte";
	import ContactChannels from "./contact-channels.svelte";
	import InstallSteps from "./install-steps.svelte";
	import TypingTerminal from "./typing-terminal.svelte";
	import CodeEditor from "./code-editor.svelte";
	import MenuDemo from "./menu-demo.svelte";
	import InstanceGraph from "./instance-graph.svelte";
	import BlogLayout from "./blog-layout.svelte";
	import DocsLayout from "./docs-layout.svelte";
	import DocsTitle from "./docs-title.svelte";
	import DocsPager from "./docs-pager.svelte";
	import PostHeader from "./post-header.svelte";
	import PostContents from "./post-contents.svelte";
	import ShareBar from "./share-bar.svelte";
	import NewsletterBand from "./newsletter-band.svelte";
	import CommandBar from "$brand/components/command-bar.svelte";
	import StepNumber from "$brand/components/step-number.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import Tag from "$brand/components/tag.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Mark from "$brand/components/mark.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import BandArcs from "$brand/components/band-arcs.svelte";
	import Questions from "$brand/components/questions.svelte";
	import Question from "$brand/components/question.svelte";
	import * as Card from "$brand/ui/card/index.js";
	import type { Plan } from "../site/plan.js";
	import {
		principles,
		howItWorks,
		glance,
		faq,
		releases,
		posts,
		topicTone,
		privacy,
		terms,
		channels,
		installSteps,
		session,
		editorFiles,
		comparison,
		gpuiFaq,
		providers,
		instances,
		inside,
		providerPages,
		templates,
		payTemplates,
		providerNotes,
		menu,
		addInstance,
		listed,
		settingsJson,
		post,
		postTone,
		headings,
		sideProjects,
		docsHeadings,
		docsMenu,
	} from "./stories-data.js";

	const nav = ["Docs", "Providers", "Blog", "Changelog", "FAQ", "About"];
	const topics = ["All", "Models", "MCP", "Routing", "Deep dive"];
	const changelogNumbers: readonly (readonly [string, string])[] = [
		["27", "releases"],
		["57", "features added"],
		["34", "bugs fixed"],
	];

	const tiers: Plan[] = [
		{ name: "Free", price: 0, blurb: "For trying it out.", features: ["One project", "Help from the community", "Every core feature"], cta: "Choose Free" },
		{ name: "Pro", price: 12, yearly: 120, blurb: "For one person shipping real work.", features: ["Unlimited projects", "Email help within a day", "Everything in Free"], cta: "Choose Pro", pick: true },
		{ name: "Team", price: 39, yearly: 390, blurb: "For a small team working together.", features: ["Up to 10 people", "Shared settings", "Everything in Pro"], cta: "Choose Team" },
	];

	let faqQuery = $state("");
	const faqItems = $derived(faq.filter(([, question, answer]) => !faqQuery.trim() || `${question} ${answer}`.toLowerCase().includes(faqQuery.trim().toLowerCase())));

	let blogTopic = $state("All");
	let blogQuery = $state("");
	const blogList = $derived(
		posts.filter((p) => (blogTopic === "All" || p.topic === blogTopic) && (!blogQuery.trim() || `${p.title} ${p.summary}`.toLowerCase().includes(blogQuery.trim().toLowerCase()))),
	);

	const postToc = headings.map((h) => ({ id: slug(h), label: h }));
	const docsToc = docsHeadings.map((h) => ({ id: slug(h), label: h }));
	const goal = "My personal goal is to never outsource the thinking.";
</script>

<Story name="About - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} current="About" cta={{ label: "Get started" }} layout="page">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<Container>
			<PageIntro>
				{#snippet kicker()}About{/snippet}
				{#snippet title()}About <span class="whitespace-nowrap">claude-multi</span>{/snippet}
				{#snippet lede()}claude-multi is a CLI that runs multiple Claude Code instances side by side. Each one talks to a different AI provider and keeps its own config directory.{/snippet}
			</PageIntro>
		</Container>

		<Section>
			{#snippet title()}A config directory is a single shared state{/snippet}
			{#snippet intro()}Why it exists.{/snippet}
			{#snippet children()}
				<Prose class="max-w-2xl">
					<p>Claude Code stores everything in ~/.claude: settings, MCP servers, plugins, skills, history. Try a second model and that one directory becomes a problem. I ended up editing settings by hand, swapping keys, and keeping shell aliases nobody asked for. Sessions and context get overwritten and you find out later.</p>
					<p>claude-multi gives every provider its own alias and config directory. One alias per provider (claude-glm, claude-deepseek, claude-anthropic), each rooted under ~/.claude-multi/. Plugins and skills symlink from your primary install, so you still maintain them in one place.</p>
					<p>There are no daemons and no background services. Nothing phones home. Every instance is a real directory you can cd into and inspect with the tools you already use.</p>
				</Prose>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}What I optimize for{/snippet}
			{#snippet intro()}The principles.{/snippet}
			{#snippet children()}
				<div class="grid gap-4 md:grid-cols-2">
					{#each principles as [title, body] (title)}
						<Card.Root class="gap-3 bg-transparent px-6 shadow-none">
							<h3 class="text-[1.0625rem] font-medium">{title}</h3>
							<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
						</Card.Root>
					{/each}
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}A wrapper, not a fork{/snippet}
			{#snippet intro()}When you run claude-multi add glm --provider glm, four things happen.{/snippet}
			{#snippet children()}
				<div class="flex flex-col gap-5">
					<CommandBar command="claude-multi add glm --provider glm" copy={false} />
					<ol class="grid max-w-[52rem] gap-3">
						{#each howItWorks as text, i (text)}
							<li class="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4">
								<StepNumber n={i + 1} done />
								<p class="pt-1.5 text-[0.9375rem] leading-relaxed">{text}</p>
							</li>
						{/each}
					</ol>
					<p class="mt-1 max-w-2xl leading-relaxed text-muted-foreground">
						That's the whole trick. One environment variable pointing at a config directory, plus a few symlinks. Nothing proxies your traffic and nothing patches the binary.
					</p>
				</div>
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}At a glance{/snippet}
			{#snippet children()}
				<BigNumbers items={glance} />
			{/snippet}
		</Section>

		<Section>
			{#snippet title()}Built by hmziqrs{/snippet}
			{#snippet children()}
				<Card.Root class="max-w-3xl flex-row items-start gap-6 bg-transparent px-6 shadow-none sm:px-9 sm:py-9">
					<Mark symbol="Hq" size={64} />
					<div class="flex flex-col gap-3">
						<h3 class="text-xl font-medium">Built by hmziqrs</h3>
						<p class="text-[0.9375rem] leading-relaxed text-muted-foreground">
							I'm an independent developer and I build open-source tooling for my own workflow first. claude-multi exists because switching providers halfway through a day kept breaking my setup, and every alternative meant learning a new CLI I did not want to learn.
						</p>
						<div class="flex flex-wrap gap-2">
							<ButtonLink href="#" variant="outline" size="sm">
								<BrandIcon icon={siGithub} data-icon="inline-start" />
								Source on GitHub
							</ButtonLink>
							<ButtonLink href="#" variant="outline" size="sm">hmziq.rs</ButtonLink>
							<ButtonLink href="#" variant="outline" size="sm">See releases</ButtonLink>
						</div>
					</div>
				</Card.Root>
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

<Story name="Providers - claude-multi" asChild>
	<ProvidersPage {providerPages} {templates} {payTemplates} {providerNotes} />
</Story>

<Story name="FAQ - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} current="FAQ" cta={{ label: "Get started" }} layout="page">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<Container>
			<PageIntro>
				{#snippet kicker()}FAQ{/snippet}
				{#snippet title()}Frequently asked questions{/snippet}
				{#snippet lede()}Straight answers with links to the docs, blog posts and source code, all on one page.{/snippet}
				{#snippet children()}
					<SearchBox label="Search questions" value={faqQuery} onChange={(v) => (faqQuery = v)} class="mt-2" />
				{/snippet}
			</PageIntro>
		</Container>

		<Container>
			<FaqList items={faqItems} />
		</Container>

		<Container>
			<Card.Root class="flex-row flex-wrap items-center justify-between gap-6 bg-transparent px-6 shadow-none sm:px-10 sm:py-10">
				<div>
					<h2 class="text-2xl font-medium tracking-[-0.02em]">Still have questions?</h2>
					<p class="mt-1.5 text-muted-foreground">Open an issue on GitHub. It's the fastest channel and it leaves a public record.</p>
				</div>
				<div class="flex flex-wrap gap-3">
					<ButtonLink href="#" size="lg" class="px-5">
						<BrandIcon icon={siGithub} data-icon="inline-start" />
						Open an issue
					</ButtonLink>
					<ButtonLink href="#" size="lg" variant="outline" class="px-5">Read the docs</ButtonLink>
				</div>
			</Card.Root>
		</Container>
	</SiteShell>
</Story>

<Story name="Changelog - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} current="Changelog" cta={{ label: "Get started" }} layout="page">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<Container>
			<PageIntro>
				{#snippet kicker()}Changelog{/snippet}
				{#snippet title()}Release history{/snippet}
				{#snippet lede()}Every release, every change. From v0.1 to today.{/snippet}
			</PageIntro>
		</Container>

		<Container>
			<BigNumbers items={changelogNumbers} />
		</Container>

		<Container>
			<OutlineCard class="p-6 ring-primary/50 sm:p-9">
				<CornerRings seed={`v${releases[0].v}`} quiet />
				<div class="relative flex flex-col gap-2">
					<Kicker>Latest release</Kicker>
					<div>
						<ReleaseHead release={releases[0]} level={2} />
						<ReleaseNotes release={releases[0]} />
					</div>
				</div>
			</OutlineCard>
		</Container>

		<Section>
			{#snippet title()}Past releases{/snippet}
			{#snippet intro()}26 more, newest first. The latest five are shown here.{/snippet}
			{#snippet children()}
				<ReleaseTimeline {releases} skip={1} />
			{/snippet}
		</Section>
	</SiteShell>
</Story>

<Story name="Blog index - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} current="Blog" cta={{ label: "Get started" }} layout="page">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<Container>
			<PageIntro class="max-w-2xl">
				{#snippet title()}Writing about <span class="whitespace-nowrap">claude-multi</span>{/snippet}
				{#snippet lede()}Build notes, deep dives, and the occasional rant. New posts whenever there's something worth saying.{/snippet}
			</PageIntro>
		</Container>
		<Container>
			<div class="mb-7 flex flex-wrap items-center gap-3">
				<SearchBox label="Search posts" value={blogQuery} onChange={(v) => (blogQuery = v)} class="w-auto min-w-64" />
				<TopicChips items={topics} value={blogTopic} onChange={(v) => (blogTopic = v)} tone={(t) => (t === "All" ? undefined : topicTone(t))} />
			</div>
			<PostList posts={blogList} tone={topicTone} />
		</Container>
	</SiteShell>
</Story>

{#snippet legalFoot(other)}
	<a href="#" class="inline-flex items-center gap-2 hover:text-foreground">
		<BrandIcon icon={siGithub} />
		Every change is in the GitHub history
	</a>
	·
	<a href="#" class="hover:text-foreground">Read the {other}</a>
{/snippet}

<Story name="Privacy - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} cta={{ label: "Get started" }} layout="page">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<LegalLayout doc={privacy}>
			{#snippet children()}
				{#each privacy.sections as [title, ...blocks], i (title)}
					<LegalSection n={i + 1} {title}>
						{#snippet children()}
							{#each blocks as block, j (j)}
								<LegalBlock {block} />
							{/each}
						{/snippet}
					</LegalSection>
				{/each}
			{/snippet}
			{#snippet foot()}
				{@render legalFoot("terms of use")}
			{/snippet}
		</LegalLayout>
	</SiteShell>
</Story>

<Story name="Terms - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} cta={{ label: "Get started" }} layout="page">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<LegalLayout doc={terms}>
			{#snippet children()}
				{#each terms.sections as [title, ...blocks], i (title)}
					<LegalSection n={i + 1} {title}>
						{#snippet children()}
							{#each blocks as block, j (j)}
								<LegalBlock {block} />
							{/each}
						{/snippet}
					</LegalSection>
				{/each}
			{/snippet}
			{#snippet foot()}
				{@render legalFoot("privacy policy")}
			{/snippet}
		</LegalLayout>
	</SiteShell>
</Story>

<Story name="Not found - claude-multi" asChild>
	<SiteShell site="claude-multi" {nav} cta={{ label: "Get started" }} layout="page" mainClassName="pb-24">
		{#snippet extra()}
			<Tag class="hidden font-mono lg:inline-flex">v0.12.0</Tag>
		{/snippet}
		<NotFound title="Page not found" lede="This URL doesn't point to anything. The page probably moved, or the link was wrong.">
			<ButtonLink href="#" size="lg" class="px-5">Back to home</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">Read the docs</ButtonLink>
		</NotFound>
	</SiteShell>
</Story>

{#snippet coreCell()}<InlineCode>core</InlineCode>{/snippet}
{#snippet clientCell()}<InlineCode>client</InlineCode>{/snippet}
{#snippet hookCell()}<InlineCode>hook</InlineCode>{/snippet}
{#snippet persistCell()}<InlineCode>persist</InlineCode>{/snippet}
{#snippet yesDefault()}
	<span class="inline-flex items-center gap-2 text-success">
		<Marker filled />
		Yes
	</span>
{/snippet}
{#snippet clientPulls()}<span><InlineCode>core</InlineCode> + <InlineCode>gpui</InlineCode></span>{/snippet}
{#snippet persistPulls()}<span><InlineCode>client</InlineCode> + <InlineCode>hook</InlineCode> + <InlineCode>serde_json</InlineCode> + <InlineCode>thiserror</InlineCode></span>{/snippet}
{#snippet coreGives()}<span>The transport-agnostic state machine (<InlineCode>QueryResource</InlineCode>, <InlineCode>CachePolicy</InlineCode>, …) with no GPUI dependency. Usable in non-GPUI code or tests.</span>{/snippet}
{#snippet clientGives()}<span>The <InlineCode>QueryClient</InlineCode> registry and its type-partitioned buckets.</span>{/snippet}
{#snippet hookGives()}<span>The <InlineCode>use_query</InlineCode> / <InlineCode>use_mutation</InlineCode> hooks you call from views.</span>{/snippet}
{#snippet persistGives()}<span>Async persistence: the <InlineCode>Persister</InlineCode> trait, <InlineCode>QueryClient::persist_with</InlineCode>, the free <InlineCode>hydrate</InlineCode> function, and the typed (de)serializer registries.</span>{/snippet}
{#snippet persistCrate()}<span><b><InlineCode>gpui-query-persist</InlineCode></b> is a reference disk adapter. <InlineCode>FilePersister</InlineCode> atomically writes a <InlineCode>PersistSnapshot</InlineCode> to disk (JSON or bincode) with a tolerant load.</span>{/snippet}
{#snippet httpCrate()}<span><b><InlineCode>gpui-query-http</InlineCode></b> turns a server's <InlineCode>Cache-Control</InlineCode> header into a <InlineCode>CachePolicy</InlineCode> ("server wins") and layers an in-memory <InlineCode>HttpCache</InlineCode> over any HTTP backend.</span>{/snippet}
{#snippet quickStart()}<span><a href="#">Quick Start</a>: define a fetcher, call <InlineCode>use_query</InlineCode>, render data.</span>{/snippet}
{#snippet queriesGuide()}<span><a href="#">Queries</a>: the full <InlineCode>use_query</InlineCode> surface and <InlineCode>QueryResource</InlineCode> accessors.</span>{/snippet}
{#snippet cachingGuide()}<span><a href="#">Caching</a>: <InlineCode>CachePolicy</InlineCode>, deduplication, and GC in depth.</span>{/snippet}

<Story name="Docs - gpui-query" asChild>
	<DocsLayout site="gpui-query" menu={docsMenu} page="Installation" toc={docsToc}>
		{#snippet extra()}
			<a href="#" aria-label="gpui-query on GitHub" class="hidden rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground md:inline-flex">
				<BrandIcon icon={siGithub} class="size-4.5" />
			</a>
		{/snippet}
		<DocsTitle title="Installation" lede="Install gpui-query in a Rust GPUI app: add the crate, register the global QueryClient, and verify your setup with a first query." trail={["Docs", "Getting Started"]} seed="gpui-query" />
		<Prose class="mt-9">
			<p>
				gpui-query is a Cargo crate. This page covers adding it to a GPUI project, choosing the right <a href="#feature-flags">feature flags</a>, and installing a <InlineCode>QueryClient</InlineCode> as a GPUI <InlineCode>Global</InlineCode> so the hooks can share a single cache.
			</p>

			<h2 id={slug("Add the dependency")}>Add the dependency</h2>
			<p>Run <InlineCode>cargo add</InlineCode> in your crate, or add it by hand to <InlineCode>Cargo.toml</InlineCode>:</p>
			<CodeBlock files={[{ label: "Terminal", lang: "bash", code: "cargo add gpui-query" }, { label: "Cargo.toml", lang: "toml", code: '[dependencies]\ngpui-query = "0.2.1"' }]} />
			<Notice title="Note">
				<InlineCode>gpui-query</InlineCode> depends on <InlineCode>gpui</InlineCode> as a workspace dependency. It does not ship <InlineCode>gpui</InlineCode> itself. Your app already brings <InlineCode>gpui</InlineCode> in, and gpui-query links against the same version.
			</Notice>

			<h2 id={slug("Feature flags")}>Feature flags</h2>
			<p>The crate is split into four layers, each behind a feature flag:</p>
			<DataTable
				variant="lines"
				names={2}
				columns={["Feature", "Default", "Pulls in", "What it gives you"]}
				rows={[
					[coreCell, "No", "serde only", coreGives],
					[clientCell, yesDefault, clientPulls, clientGives],
					[hookCell, "No", clientCell, hookGives],
					[persistCell, "No", persistPulls, persistGives],
				]}
			/>
			<p>
				<InlineCode>client</InlineCode> is on by default, so <InlineCode>cargo add gpui-query</InlineCode> is enough to get the registry. To use the hooks from your components, enable the <InlineCode>hook</InlineCode> feature:
			</p>
			<CodeBlock files={[{ label: "Terminal", lang: "bash", code: "cargo add gpui-query --features hook" }, { label: "Cargo.toml", lang: "toml", code: '[dependencies]\ngpui-query = { version = "0.2.1", features = ["hook"] }' }]} />
			<p>
				You almost always want <InlineCode>hook</InlineCode> in an application. Reach for <InlineCode>core</InlineCode> alone when you need the state machine without a GPUI dependency (a library, a CLI that reasons about cached state, or unit tests). Add <InlineCode>persist</InlineCode> when you want to save and restore the cache across restarts.
			</p>

			<h2 id={slug("Companion crates")}>Companion crates</h2>
			<p>Two standalone crates extend gpui-query without adding dependencies to the core:</p>
			<Bullets items={[persistCrate, httpCrate]} />

			<h2 id={slug("Set up the QueryClient")}>Set up the QueryClient</h2>
			<p>
				<InlineCode>QueryClient</InlineCode> is a GPUI <InlineCode>Global</InlineCode>. Install it once during app setup. From then on, every hook routes resource creation through it for shared caching, deduplication, and garbage collection.
			</p>
			<CodeBlock label="Rust" lang="rust" code={"use gpui_query::client::QueryClient;\n\nfn setup_app(cx: &mut gpui::App) {\n    cx.set_global(QueryClient::new());\n}"} />
			<p><InlineCode>QueryClient::new()</InlineCode> uses the default policies. Override them with <InlineCode>with_policies</InlineCode> and tune the garbage-collection window with <InlineCode>with_gc_time</InlineCode>:</p>
			<CodeBlock
				label="Rust"
				lang="rust"
				code={"use gpui_query::client::QueryClient;\nuse gpui_query::{CachePolicy, core::RequestPolicy};\n\nlet client = QueryClient::with_policies(\n    CachePolicy::Ttl { ttl_ms: 60_000 },\n    RequestPolicy::LatestWins,\n)\n.with_gc_time(600_000); // 10 minutes (default is 5)\n\ncx.set_global(client);"}
			/>
			<Notice tone="warning" title="Warning">
				If a hook runs before a <InlineCode>QueryClient</InlineCode> is installed, it falls back to creating a standalone entity. There is no shared cache, deduplication, or GC. Always install the client during app startup.
			</Notice>

			<h2 id={slug("Verify it is reachable")}>Verify it is reachable</h2>
			<p>From any context, read the client back to confirm the global is set:</p>
			<CodeBlock label="Rust" lang="rust" code="let _client = cx.global::<QueryClient>();" />
			<p>
				That is the entire setup: add the crate, enable <InlineCode>hook</InlineCode>, install a <InlineCode>QueryClient</InlineCode> global. With that in place, the <a href="#">Quick Start</a> shows your first end-to-end query.
			</p>

			<h2 id={slug("Next steps")}>Next steps</h2>
			<Bullets items={[quickStart, queriesGuide, cachingGuide]} />
		</Prose>

		<p class="mt-12 text-[0.8125rem]">
			<a href="#" class="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
				<Pencil class="lucide size-3.5" />
				Edit this page on GitHub
			</a>
		</p>

		<DocsPager class="mt-8" prev={{ title: "Introduction", href: "#" }} next={{ title: "Quick Start", href: "#" }} />
	</DocsLayout>
</Story>

<Story name="Blog post - blog-hmziq-rs" asChild>
	<BlogLayout>
		<PostHeader
			title={post.title}
			summary={post.summary}
			date={post.date}
			readingTime={post.readingTime}
			updated={post.updated}
			topic={post.topic}
			tone={postTone}
			author={{ name: "hmziq", symbol: "Hq" }}
			cover={{ src: "/covers/example.svg", alt: "Monochrome line art of a person working late at a laptop in a dark, minimal room", lineArt: true }}
		/>
		<Container size="narrow" class="pb-16">
			<article>
				<Prose class="text-[1.0625rem] [&_h2]:mt-8 [&_h2]:text-2xl [&_p]:leading-[1.8]">
					<PostContents items={postToc} />
					<p>Third attempt at a personal blog. The first was Next.js on GitHub Pages. The second was full-stack Rust in Dioxus. Burned out, parked it permanently. Finally got this one built.</p>
					<SummaryBox label="TL;DR">
						Zero-admin blog on Astro + Cloudflare Pages. Hono worker for newsletters with D1, KV, Queues, and an R2 media pipeline. AI handled implementation, I handled architecture. No JS bloat, free tier everything, auto-deploys on content changes.
					</SummaryBox>

					<h2 id={slug("Framework")}>Framework</h2>
					<p>I wanted this to be absolutely minimal. React wasn't an option because of its huge bundle size, and Astro feels close to React. I didn't want to use Svelte because I wanted to try Cloudflare, and Astro has first-class support for it.</p>

					<h2 id={slug("Architecture")}>Architecture</h2>
					<p>No admin panel. Managing one is useless work and mentally taxing for a simple blog at initial stage. Local markdown files, managed by Git. Edit and preview in my IDE. Any change auto publishes via GitHub Actions.</p>
					<p>Newsletter backend runs on a Hono worker. D1 stores subscribers. KV handles rate limiting. Queues send in batches of 100. Dead letter queue catches permanent failures and auto-blacklists. Unsubscribe is a soft-delete. Row stays, status changes. No email enumeration. Turnstile CAPTCHA with a honeypot field. Set up so I never have to babysit it.</p>

					<h2 id={slug("Deployment")}>Deployment</h2>
					<p>I really wanted to self-host this on my VPS. Cloudflare's email offering changed that. I mean, $0.35 for 1,000 emails is a no brainer. AWS SES is 3x cheaper, but navigating their console and getting rejected by Lord Bezos isn't worth the cheap cost. Cloudflare's console is simple, actually looks nice, and domain security is one click if your domain is already there.</p>
					<p>I used D1, R2, Workers, Queues, KV, and Pages. They have a generous free tier across all of them. I also just wanted to use Cloudflare services for once, and this seemed like the right occasion.</p>
					<p>Media pipeline: images upload to R2 with content-hash dedup. A script rewrites local paths to CDN URLs. Generates a manifest with dimensions. OG images get proper size automatically. Zero manual URL work.</p>

					<h2 id={slug("CI/CD")}>CI/CD</h2>
					<p>Obviously GitHub Actions, since it's free for open source. Staging deploys on every push to master. Production only deploys when content or changelog files change. No wasted builds.</p>

					<h2 id={slug("Vibe coding")}>Vibe coding</h2>
					<p>Is it vibe coded? Yes and no.</p>
					<p>Everything was planned and fixed by me. Nothing was one shotted. The layout had mismatched container widths on every page, which made the site look hideous. The theme toggle needed inverted images for light and dark. CI/CD had to distinguish staging from prod. Rate limiting belonged on KV, not D1. The AI had me use D1, which worked but wasn't optimal.</p>
					<p>I basically worked as Senior Lead / Project Manager and used AI as my junior engineer.</p>
					<p class="relative">
						<span
							aria-hidden="true"
							class="relative mb-4 block pl-5 text-[1.0625rem] leading-normal font-medium before:absolute before:top-[0.45em] before:left-0 before:size-2.25 before:rounded-full before:border-[1.75px] before:border-primary xl:absolute xl:top-1.5 xl:-right-62 xl:mb-0 xl:w-50 xl:border-t xl:pt-3.5 xl:pl-0 xl:text-[0.95rem] xl:before:static xl:before:mb-2.5 xl:before:block"
						>
							{goal}
						</span>
						AI is fast at prototyping and testing, but it gets some obvious things very wrong. {goal} I work through the core decisions myself and use AI to implement them.
					</p>
					<p>AI tools I used: Claude Code (GLM-5.1), Opencode (Kimi-2.6, when it was 3x :D, and DeepSeek v4 Pro)</p>

					<h2 id={slug("Goal and roadmap")}>Goal and roadmap</h2>
					<p>Originally I wanted this blog modular and pluggable into other projects. I semi-pivoted. I'm also building a SvelteKit fullstack boilerplate. If that succeeds, this stays standalone.</p>
					<p>My end goal is a dedicated admin panel later on, no more markdown files, proper database migrations. Tags, categories, author info. All normalized.</p>

					<h2 id={slug("End notes")}>End notes</h2>
					<p>Also building these projects on the side.</p>
					<div class="grid gap-3">
						{#each sideProjects as p (p.name)}
							<OutlineCard href="#" class="flex-row items-center gap-4 px-4.5 py-4 text-foreground! no-underline!">
								<Mark symbol={p.symbol} size={40} />
								<span>
									<b class="block font-medium">{p.name}</b>
									<span class="text-sm leading-normal text-muted-foreground">{p.note}</span>
								</span>
							</OutlineCard>
						{/each}
					</div>
				</Prose>
				<ShareBar url={post.url} title={post.title} class="mt-10" />
			</article>
		</Container>
		<NewsletterBand />
	</BlogLayout>
</Story>

<Story name="Components - hmziq-rs" asChild>
	<SiteShell site="hmziq" maker="Components" nav={["Install", "Code", "Pricing", "Questions"]}>
		<h1 class="sr-only">Interactive components</h1>
		<Section>
			{#snippet caption()}Menu demo · claude-multi{/snippet}
			{#snippet title()}Try the menu{/snippet}
			{#snippet intro()}Click the menu, then use the arrow keys, enter and esc. What it does shows in the panes beside it.{/snippet}
			{#snippet children()}
				<MenuDemo {menu} addLines={addInstance} {listed} {settingsJson} />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Install steps · claude-multi{/snippet}
			{#snippet title()}Up and running in three steps{/snippet}
			{#snippet intro()}You need Claude Code, a recent Bun, Node or Deno, and an API key for one provider. Copy a step and its ring fills in.{/snippet}
			{#snippet children()}
				<InstallSteps steps={installSteps} />
			{/snippet}
		</Section>

		<section class="band-orange relative overflow-hidden py-16 md:py-24">
			<BandArcs />
			<div class="relative">
				<Section>
					{#snippet caption()}Terminal · claude-multi{/snippet}
					{#snippet title()}Three commands, start to finish{/snippet}
					{#snippet intro()}From nothing installed to Claude Code on a new provider.{/snippet}
					{#snippet children()}
						<TypingTerminal lines={session} />
					{/snippet}
				</Section>
			</div>
		</section>

		<Section>
			{#snippet caption()}Copy a command · gpui-query{/snippet}
			{#snippet title()}Add it to your app{/snippet}
			{#snippet intro()}One command in your crate. The hook feature gives you use_query and use_mutation.{/snippet}
			{#snippet children()}
				<CommandBar command="cargo add gpui-query --features hook" />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Code editor · gpui-query{/snippet}
			{#snippet title()}The same view, both ways{/snippet}
			{#snippet intro()}A view that loads one user. By hand it has no cache and no retry, and it still has a bug. With gpui-query it has all of that, in fewer lines.{/snippet}
			{#snippet children()}
				<CodeEditor files={editorFiles} />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Comparison · gpui-query{/snippet}
			{#snippet title()}What gpui-query takes off your plate{/snippet}
			{#snippet intro()}Everything a data-loading view needs, written by hand or handled for you.{/snippet}
			{#snippet children()}
				<BeforeAfter rows={comparison} before="By hand" after="With gpui-query" />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Providers · claude-multi{/snippet}
			{#snippet title()}Seven providers, already wired up{/snippet}
			{#snippet intro()}Each template already knows the endpoint, the model names and sensible defaults. Pick one, paste a key, and what lands on disk is plain config you can read.{/snippet}
			{#snippet children()}
				<ProvidersTable {providers} />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Instance graph · claude-multi{/snippet}
			{#snippet title()}One folder per instance{/snippet}
			{#snippet intro()}Each instance is a real directory under ~/.claude-multi with its own settings, pointed at its own provider.{/snippet}
			{#snippet children()}
				<InstanceGraph {instances} {inside} />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Pricing · example content{/snippet}
			{#snippet title()}
				<span class="flex flex-wrap items-center gap-3">Simple pricing <Tag class="tracking-normal">Example prices</Tag></span>
			{/snippet}
			{#snippet intro()}Made-up numbers to show the layout. None of your sites sell anything yet.{/snippet}
			{#snippet children()}
				<PricingPlans plans={tiers} />
			{/snippet}
		</Section>

		<Section>
			{#snippet caption()}Questions · gpui-query{/snippet}
			{#snippet title()}Questions people ask{/snippet}
			{#snippet intro()}Straight answers, grouped by topic.{/snippet}
			{#snippet children()}
				<Questions>
					{#each gpuiFaq as [, question, answer], i (question)}
						<Question open={i === 0}>
							{#snippet question()}
								{question}
							{/snippet}
							{answer}
						</Question>
					{/each}
				</Questions>
			{/snippet}
		</Section>
	</SiteShell>
</Story>

<Story name="Contact - oxlabs-dev" asChild>
	<SiteShell site="oxlabs" maker="studio" nav={["Services", "Work", "About", "Contact"]} current="Contact" cta={{ label: "Start a project" }} layout="page">
		<Container>
			<div class="grid items-start gap-12 md:grid-cols-2">
				<PageIntro>
					{#snippet kicker()}Contact{/snippet}
					{#snippet title()}Get in touch{/snippet}
					{#snippet lede()}No form to fill out. Pick a channel below. Email is the most direct line, and GitHub and the socials work too. Every message gets a real human reply.{/snippet}
					{#snippet children()}
						<OutlineCard class="flex-row items-center gap-4 px-5 py-4.5">
							<Mark symbol="Hq" size={56} />
							<div class="flex flex-col gap-1">
								<b class="font-medium">hmziqrs</b>
								<span class="text-[0.8125rem] text-muted-foreground">
									Senior software engineer · 9 years ·
									<a href="#" class="text-primary underline underline-offset-3">CV</a>
								</span>
								<span class="inline-flex items-center gap-2 text-[0.8125rem]">
									<Marker filled class="text-success" />
									Available · taking new projects
								</span>
							</div>
						</OutlineCard>
					{/snippet}
				</PageIntro>

				<ContactChannels {channels} note="Replies from a person, on weekdays. It comes straight to the engineer writing your code." />
			</div>
		</Container>

		<Container>
			<dl class="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
				{#each [["Remote", "async-first"], ["Fixed projects", "or a retainer"], ["Taking new work", "right now"]] as [value, label] (value)}
					<div class="flex flex-col gap-1 bg-background p-6">
						<dt class="order-2 text-sm text-muted-foreground">{label}</dt>
						<dd class="order-1 text-[1.35rem] font-medium tracking-[-0.03em]">{value}</dd>
					</div>
				{/each}
			</dl>
		</Container>
	</SiteShell>
</Story>
