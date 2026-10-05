<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'

	const { Story } = defineMeta({
		title: 'Sites/Pages',
		parameters: { layout: 'fullscreen' },
	})
</script>

<!--
	Every other kind of page behind the hmziq sites (the lab's Pages.stories):
	the claude-multi inner pages, oxlabs' contact page and hmziq.rs' component
	catalog, composed from the kit's blocks with the sites' real words. The
	docs page and the blog post land in the next round of the port.
-->
<script lang="ts">
	import { siGithub } from "simple-icons";
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
	import ProvidersTable from "../site/providers-table.svelte";
	import ProvidersPage from "../site/providers-page.svelte";
	import PricingPlans from "../site/pricing-plans.svelte";
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

<Story name="404 - claude-multi" asChild>
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
