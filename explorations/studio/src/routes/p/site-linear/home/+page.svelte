<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import HeroStage from '$moves/site-linear/hero-stage.svelte';
	import AppShellMock from '$moves/site-linear/app-shell-mock.svelte';
	import IntegrationStrip from '$moves/site-linear/integration-strip.svelte';
	import IsoFig from '$moves/site-linear/iso-fig.svelte';
	import SectionHead from '$moves/site-linear/section-head.svelte';
	import FeatureLinks from '$moves/site-linear/feature-links.svelte';
	import TriageBoard from '$moves/site-linear/triage-board.svelte';
	import RoadmapMock from '$moves/site-linear/roadmap-mock.svelte';
	import AgentWindows from '$moves/site-linear/agent-windows.svelte';
	import DiffReview from '$moves/site-linear/diff-review.svelte';
	import ChangelogRail from '$moves/site-linear/changelog-rail.svelte';
	import QuotePair from '$moves/site-linear/quote-pair.svelte';
	import OxideMarkHeadline from '$moves/bento/oxide-mark-headline.svelte';
	import { to } from '$moves/site-linear/content';
</script>

<svelte:head><title>Plumb · the product system for teams and agents</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="home" />

	<HeroStage preset="oxide-bloom">
		{#snippet title()}The product system for teams <span class="text-primary">and their agents</span>{/snippet}
		{#snippet lede()}Made for planning and shipping software, now that half the work is done by agents.{/snippet}
		{#snippet aside()}
			<a href={to('changelog')} class="group inline-flex items-center gap-2 rounded-full bg-background py-1.5 pr-3 pl-1.5 text-base text-foreground ring-1 ring-border hover:ring-primary">
				<span class="rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-primary-foreground">New</span>Routines<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
			</a>
		{/snippet}
		<AppShellMock />
	</HeroStage>

	<IntegrationStrip class="pt-4" />

	<section class="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 md:pt-40">
		<OxideMarkHeadline as="h2" before="" mark="A new kind of product tool." after=" Built around agents from day one, Plumb resets what planning and shipping software should feel like." class="max-w-[30ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] font-medium tracking-[-0.035em]" />
		<div class="mt-16 grid divide-border border-y border-border md:grid-cols-3 md:divide-x">
			<IsoFig kind="layers" fig="Fig 0.1" title="Made on purpose" body="Shaped by how the best product teams already plan, decide and ship." />
			<IsoFig kind="cluster" fig="Fig 0.2" title="Run by agents too" body="Workflows people and agents share, from the first spec to the last PR." class="border-t border-border md:border-t-0" />
			<IsoFig kind="bars" fig="Fig 0.3" title="Fast on purpose" body="Less noise, more momentum. Teams keep their pace and their focus." class="border-t border-border md:border-t-0" />
		</div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead index="1.0 Intake" title="Intake and integrations" lede="Turn conversations and customer feedback into issues that are routed, labelled and ranked for the right team before anyone reads them." href={to('product')} />
		<div class="mx-auto mt-16 max-w-[1320px] px-4 sm:px-6"><TriageBoard /></div>
		<FeatureLinks class="mt-14" items={[
			{ name: 'Plumb Agent', body: 'Mention it in any thread and it files, links and assigns the work.' },
			{ name: 'Customer requests', body: 'Attach every ask to an issue so you can rank by who actually needs it.' },
			{ name: 'Triage', body: 'One inbox per team where new work waits for a yes, a merge or a no.' },
			{ name: 'Asks', body: 'Let anyone in the company file a request from chat without learning the tracker.' }
		]} />
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead index="2.0 Plan" title="Planning and monitoring" lede="Go from idea to launch with initiatives, roadmaps and specs that stay current because they live next to the work." href={to('product')} />
		<div class="mx-auto mt-16 max-w-[1320px] px-4 sm:px-6"><RoadmapMock /></div>
		<FeatureLinks class="mt-14" items={[
			{ name: 'Projects', body: 'Specs, issues, updates and feedback for one piece of work, in one place.' },
			{ name: 'Documents', body: 'Multiplayer specs that turn bullet points into issues.' },
			{ name: 'Pulse', body: 'A feed of the updates that matter to you, with a daily summary.' },
			{ name: 'Initiatives', body: 'Group projects into the few efforts the company actually cares about.' },
			{ name: 'Timeline', body: 'Drag projects across weeks and see what collides.' },
			{ name: 'Insights', body: 'Charts for any slice of work, built in seconds.' }
		]} />
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead index="3.0 Agents" title="AI and automations" lede="Put agents on the team. Pair with them on hard problems or hand them whole issues and review what comes back." href={to('product')} />
		<div class="mx-auto mt-16 max-w-[1320px] px-4 sm:px-6"><AgentWindows /></div>
		<FeatureLinks class="mt-14" items={[
			{ name: 'Plumb Agent', body: 'Asks, ranks, files and updates work across the whole workspace.' },
			{ name: 'Coding sessions', body: 'Hand an issue to a cloud agent and get a tested PR back.' },
			{ name: 'Routines', body: 'Recurring agent jobs that run on a schedule or on an event.' },
			{ name: 'MCP server', body: 'Let the editor or agent you already use read and write Plumb.' }
		]} />
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead index="4.0 Build" title="Build, review and ship" lede="Code review with clear diffs, the context behind them, and fewer rounds of comments. PRs keep moving without lowering the bar." href={to('product')} />
		<div class="mx-auto mt-16 max-w-[1320px] px-4 sm:px-6"><DiffReview /></div>
		<FeatureLinks class="mt-14" items={[
			{ name: 'Issues', body: 'Fast, keyboard-first issues that link straight to branches and PRs.' },
			{ name: 'Guided reviews', body: 'An agent walks you through a PR in the order that makes sense.' },
			{ name: 'Diffs', body: 'Read and comment on code without leaving the issue.' },
			{ name: 'Git automations', body: 'Statuses move themselves when branches open, merge or revert.' },
			{ name: 'Cycles', body: 'Two-week rhythms that roll unfinished work forward on their own.' },
			{ name: 'Releases', body: 'Know which issues shipped in which build.' }
		]} />
	</section>

	<ChangelogRail class="pt-28 md:pt-40" />

	<QuotePair
		class="py-28 md:py-40"
		main={{ text: 'You end up building a better product, just from the care that using Plumb rubs off on you.', name: 'Rhea Calloway', role: 'Staff engineer, example company' }}
		side={{ text: 'We move fast on purpose. Plumb keeps us biased to action.', name: 'Jonah Pike', role: 'Head of engineering, example company' }}
	/>

	<SiteFooter />
</div>
