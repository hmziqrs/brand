<script lang="ts">
	import Rss from '@lucide/svelte/icons/rss';
	import { Button } from '$brand/ui/button/index.js';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import OxideClipWord from '$moves/content/oxide-clip-word.svelte';
	import OxideTimeline from '$moves/content/oxide-timeline.svelte';
	import MaterialSignoff from '$moves/content/material-signoff.svelte';
	import { releases } from '$moves/content/releases';

	const products = [...new Set(releases.map((r) => r.product))];
	let only = $state('All');
	const shown = $derived(only === 'All' ? releases : releases.filter((r) => r.product === only));
	const changes = releases.reduce((n, r) => n + r.groups.reduce((m, [, items]) => m + items.length, 0), 0);
</script>

<svelte:head><title>Changelog · freeoxide</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<ReadingHeader
		site="freeoxide"
		maker="by hmziq"
		links={[
			{ label: 'Tools', href: '#/p/content/changelog-1' },
			{ label: 'Docs', href: '#/p/content/docs-1' },
			{ label: 'Changelog', href: '#/p/content/changelog-1', current: true }
		]}
	/>

	<section class="mx-auto max-w-[82rem] px-4 pt-14 pb-16 sm:px-6 md:pt-20 md:pb-24">
		<div class="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4 text-sm">
			<span class="font-medium">Changelog</span>
			<span class="text-muted-foreground">{releases.length} releases · {changes} changes since July</span>
		</div>
		<SerifMixHeadline text="What changed, in the order it [*]" size="xl" class="mt-10 max-w-[15ch] md:mt-14">
			{#snippet object()}<OxideClipWord text="shipped." preset="copper-sweep" />{/snippet}
		</SerifMixHeadline>
		<div class="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
			<p class="max-w-[38ch] text-[1.375rem] leading-[1.45] md:text-[1.5rem]">Every freeoxide tool, every release, written for the people who use them. Each one went through five rounds of review before it got its number.</p>
			<div class="flex flex-wrap items-center gap-2">
				<div role="group" aria-label="Product" class="flex rounded-full border p-1">
					{#each ['All', ...products] as p (p)}
						<button
							type="button"
							aria-pressed={only === p}
							onclick={() => (only = p)}
							class="h-8 rounded-full px-3.5 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-background"
						>{p}</button>
					{/each}
				</div>
				<Button variant="outline" size="lg" href="https://freeoxide.com/changelog.xml"><Rss class="lucide" />Follow by RSS</Button>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-[82rem] px-4 sm:px-6">
		<OxideTimeline entries={shown} preset="folded-foil" />
	</section>

	<section class="mx-auto mt-24 max-w-[82rem] px-4 sm:px-6">
		<div class="grid gap-6 rounded-2xl border p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
			<div>
				<h2 class="text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-medium tracking-[-0.03em]">Older releases live in each tool’s repository.</h2>
				<p class="mt-3 max-w-[56ch] text-[1.0625rem] text-foreground">This page starts in July 2026, when freeoxide moved to one shared changelog.</p>
			</div>
			<Button size="lg" href="https://github.com/hmziqrs">See the repositories</Button>
		</div>
	</section>

	<MaterialSignoff site="freeoxide" preset="hammered-copper" />
</div>
