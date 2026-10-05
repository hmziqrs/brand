<script lang="ts">
	// The changelog: big numbers, the latest release in its own card, then the
	// timeline of past ones (the lab's claude-multi changelog). The words are
	// example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import OutlineCard from '$brand/blocks/site/outline-card.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import Section from '$brand/blocks/site/section.svelte';
	import BigNumbers from '$brand/blocks/site/big-numbers.svelte';
	import Kicker from '$brand/blocks/site/kicker.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import ReleaseHead from '$brand/blocks/content/release-head.svelte';
	import ReleaseNotes from '$brand/blocks/content/release-notes.svelte';
	import ReleaseTimeline from '$brand/blocks/content/release-timeline.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { releases } from '$lib/example';

	const [latest, ...past] = $derived(releases);
	const changes = $derived(releases.reduce((n, r) => n + r.groups.reduce((m, [, items]) => m + items.length, 0), 0));
	const added = $derived(releases.reduce((n, r) => n + (r.groups.find(([kind]) => kind === 'Added')?.[1].length ?? 0), 0));
</script>

<SiteShell site="example" maker="by hmziq" nav={['Docs', 'Changelog', 'Blog']} current="Changelog" layout="page">
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title="Changelog — svelte-app"
			description="Every release, every change. Example content."
			url="https://example.com/changelog"
		/>

		<Container>
			<PageIntro>
				{#snippet kicker()}Changelog{/snippet}
				{#snippet title()}Release history{/snippet}
				{#snippet lede()}Every release, every change. Example content, from v0.1 to today.{/snippet}
			</PageIntro>
		</Container>

		<Container>
			<BigNumbers items={[[String(releases.length), 'releases'], [String(added), 'features added'], [String(changes - added), 'fixes and changes']]} />
		</Container>

		<Container>
			<OutlineCard class="p-6 ring-primary/50 sm:p-9">
				{#snippet children()}
					<CornerRings seed={`v${latest.v}`} quiet />
					<div class="relative flex flex-col gap-2">
						<Kicker>Latest release</Kicker>
						<div>
							<ReleaseHead release={latest} level={2} />
							<ReleaseNotes release={latest} />
						</div>
					</div>
				{/snippet}
			</OutlineCard>
		</Container>

		<Section>
			{#snippet title()}Past releases{/snippet}
			{#snippet intro()}{past.length} more, newest first. Example content.{/snippet}
			<ReleaseTimeline releases={releases} skip={1} />
		</Section>
	{/snippet}
</SiteShell>
