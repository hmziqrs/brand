<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import NowBar from '$moves/site-linear/now-bar.svelte';
	import ReleaseEntry, { type Entry } from '$moves/site-linear/release-entry.svelte';
	import { to } from '$moves/site-linear/content';

	const tabs = [
		{ label: 'All', href: to('blog') },
		{ label: 'Changelog', href: to('changelog') },
		{ label: 'Launches', href: to('blog') },
		{ label: 'From the team', href: to('blog') },
		{ label: 'Community', href: to('blog') },
		{ label: 'Press', href: to('blog') }
	];

	const entries: Entry[] = [
		{
			date: 'Oct 22, 2026',
			title: 'More ways to start and share routines',
			lede: 'Routines run product work on their own when something changes in Plumb or a connected tool. Now chat and Git events can start them, you can share them as templates, and you choose how hard each one thinks.',
			prompt: 'make a routine that runs whenever a PR merges',
			preset: 'oxide-bloom',
			sections: [
				{ h: 'Chat and Git triggers', p: ['A message in a channel or a label on a pull request can now start a routine, so work moves without anyone watching for it.', 'Answer product questions in a support channel, or draft a QA plan the moment a PR is marked ready for testing.'] },
				{ h: 'Routine templates', p: ['Save any routine as a template for the rest of the workspace. Share your bug-triage routine and other teams adapt it instead of starting from zero.'] },
				{ h: 'Reasoning levels', p: ['Pick how much reasoning each routine spends. Keep routine chores fast and cheap; save deep reasoning for the hard ones. Auto follows your workspace default.'] }
			],
			lists: [
				{ name: 'Fixes', items: ['Routine runs no longer stall when a linked issue is archived mid-run.', 'Template previews show the right trigger icon.', 'Fixed a race where two routines could claim the same issue.'] },
				{ name: 'Improvements', items: ['Run history loads twice as fast on large workspaces.', 'Routines can now post to private channels they are invited to.'] },
				{ name: 'API', items: ['New routineRun webhook with status and duration.', 'routines query accepts a trigger filter.'] }
			]
		},
		{
			date: 'Oct 06, 2026',
			title: 'Stacked pull requests in Diffs',
			lede: 'Diffs now understands stacks. Move through a stack and see review, CI and merge state for every layer at a glance; related PRs collapse into one row in Reviews, next to their issue.',
			preset: 'brushed-alloy',
			sections: [{ h: 'Merge from the bottom up', p: ['For stacks your Git host manages natively, preview every affected PR and merge the current one plus everything below it without leaving Plumb.'] }],
			lists: [
				{ name: 'Fixes', items: ['Rename-only files no longer show as full deletions.', 'Comment threads keep their place after a force-push.'] },
				{ name: 'Keyboard shortcuts', items: ['J / K moves through the stack.', 'Shift + M merges the selected layer and below.'] }
			]
		},
		{
			date: 'Sep 24, 2026',
			title: 'More control over coding sessions',
			lede: 'Coding sessions are the shortest path from issue to diff: hand a task to the agent and it writes and tests the code in a secure cloud environment before opening a PR. Now you control more of how each session runs.',
			prompt: 'take PLB-2140 and open a draft PR',
			preset: 'ink-diffusion',
			sections: [
				{ h: 'Adaptive routing', p: ['Simpler tasks route to a faster model on their own, saving time and credits. If a task turns out harder, restart it on the stronger model in one click.'] },
				{ h: 'Environment secrets', p: ['Sessions can read secrets during setup to fetch private packages and config safely.'] },
				{ h: 'Open-weight models', p: ['Admins can now offer open-weight models alongside the defaults, and choose which ones each team sees.'] }
			]
		},
		{
			date: 'Sep 10, 2026',
			title: 'Agent credit explorer and spend limits',
			lede: 'Admins can see what drives agent credit use and cap it. Break spend down by team, feature, person or routine over any period, then set limits at the workspace, person or routine level.',
			preset: 'mineral-fault',
			lists: [{ name: 'Improvements', items: ['Usage charts export to CSV.', 'Owners get an email at 80% of any limit.'] }]
		}
	];

	let query = $state('');
	const filtered = $derived(
		query.trim()
			? entries.filter((e) => [e.title, e.lede, ...(e.sections ?? []).flatMap((s) => [s.h, ...s.p])].join(' ').toLowerCase().includes(query.trim().toLowerCase()))
			: entries
	);
</script>

<svelte:head><title>Plumb · Changelog</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="changelog" />

	<NowBar class="pt-20 md:pt-28" {tabs} active="Changelog" bind:query />

	<section class="mx-auto flex max-w-[1320px] flex-col gap-16 px-4 pt-14 pb-28 sm:px-6">
		{#each filtered as e, i (e.title)}
			<ReleaseEntry entry={e} first={i === 0 && !query} />
		{/each}
		{#if !filtered.length}
			<p class="text-xl text-foreground">Nothing matches “{query}”. Try a feature name like routines or diffs.</p>
		{/if}
		{#if !query}
			<div class="md:pl-[268px]">
				<Button variant="outline" size="lg" class="rounded-full" href={to('blog')}>Older releases</Button>
			</div>
		{/if}
	</section>

	<SiteFooter />
</div>
