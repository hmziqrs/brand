<script lang="ts">
	// The landing page, built from the kit's site blocks the way the lab's site
	// pages are (apps/lab/src/sites). Every word here is example copy: replace
	// it with the project's own before shipping.
	import { siGithub } from 'simple-icons';
	import BookOpenText from '@lucide/svelte/icons/book-open-text';
	import FolderTree from '@lucide/svelte/icons/folder-tree';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import ScanSearch from '@lucide/svelte/icons/scan-search';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Rings from '$brand/components/rings.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import CtaBand from '$brand/blocks/site/cta-band.svelte';
	import ElementCard from '$brand/blocks/site/element-card.svelte';
	import FeatureGrid from '$brand/blocks/site/feature-grid.svelte';
	import Hero from '$brand/blocks/site/hero.svelte';
	import HeroNote from '$brand/blocks/site/hero-note.svelte';
	import RingStats from '$brand/blocks/site/ring-stats.svelte';
	import Section from '$brand/blocks/site/section.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import type { Tone } from '@hmziq/brand-core/tones';

	// Example content, in the shape the lab's site pages use.
	const kinds = {
		library: { label: 'Library', color: 'var(--blue)', tone: 'blue' as Tone },
		cli: { label: 'Command-line tool', color: 'var(--teal)', tone: 'teal' as Tone },
		app: { label: 'Desktop app', color: 'var(--purple)', tone: 'purple' as Tone },
	};

	const projects = [
		{ n: 1, symbol: 'Ex', name: 'Example one', kind: kinds.library, status: { label: 'Shipped', tone: 'success' as Tone }, body: 'One line on what it does and who it is for. Example copy.' },
		{ n: 2, symbol: 'Tw', name: 'Example two', kind: kinds.cli, status: { label: 'In progress', tone: 'warning' as Tone }, body: 'One line on what it does and who it is for. Example copy.' },
		{ n: 3, symbol: 'Th', name: 'Example three', kind: kinds.app, status: { label: 'Planned' }, body: 'One line on what it does and who it is for. Example copy.' },
	];

	const facts = [
		{ value: '100%', label: 'example number, filled ring', ring: 1 },
		{ value: '90%+', label: 'example number, most of a ring', ring: 0.9 },
		{ value: '5', label: 'example count, five segments', ring: 5 },
	];
</script>

{#snippet folderIcon()}<FolderTree class="lucide" />{/snippet}
{#snippet scanIcon()}<ScanSearch class="lucide" />{/snippet}
{#snippet checksIcon()}<ListChecks class="lucide" />{/snippet}
{#snippet bookIcon()}<BookOpenText class="lucide" />{/snippet}
{#snippet gitIcon()}<GitBranch class="lucide" />{/snippet}

<!-- The page head for the landing page. The placeholder site id is
     "freeoxide"; swap it and the copy when the project gets its own name. -->
<SiteHead
	site="freeoxide"
	title="svelte-app — a hmziq site"
	description="The SvelteKit starter for hmziq sites: the theme, the brand kit, a landing page built from the site blocks, and the content pages."
	url="https://example.com/"
/>

<SiteShell
	site="example"
	maker="by hmziq"
	nav={['Projects', 'How it works', 'About']}
	current="Projects"
	cta={{ label: 'Browse projects' }}
>
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<Hero>
			{#snippet title()}Example headline, finished before it ships.{/snippet}
			{#snippet lede()}One sentence on what this is and who it is for. Replace every word on this page with the project's own.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#projects" size="lg" class="px-5">Browse the projects</ButtonLink>
				<ButtonLink href="https://github.com" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
			{#snippet note()}<HeroNote>Example note under the buttons, with an orange ring.</HeroNote>{/snippet}
			{#snippet aside()}<Rings seed="example" />{/snippet}
		</Hero>

		<RingStats items={facts} />

		<Section>
			{#snippet caption()}Example section · with a caption{/snippet}
			{#snippet title()}The projects{/snippet}
			{#snippet intro()}A short list on purpose. Each one ships only when it meets every standard below.{/snippet}
			<div id="projects" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each projects as p (p.name)}
					<ElementCard n={p.n} symbol={p.symbol} name={p.name} kind={p.kind} status={p.status} body={p.body} />
				{/each}
			</div>
		</Section>

		<Section>
			{#snippet title()}How every project is made{/snippet}
			{#snippet intro()}Example copy for the second section, with the quieter feature grid under it.{/snippet}
			<FeatureGrid
				items={[
					{ icon: folderIcon, title: 'Structure by hand', body: 'Example copy for a feature.' },
					{ icon: scanIcon, title: 'Five review rounds', body: 'Example copy for a feature.' },
					{ icon: checksIcon, title: 'Five rounds of tests', body: 'Example copy for a feature.' },
					{ icon: bookIcon, title: 'Clean and documented', body: 'Example copy for a feature.' },
					{ icon: gitIcon, title: 'Open by default', body: 'Example copy for a feature.' },
				]}
			/>
		</Section>

		<CtaBand title="One person. All of it.">
			{#snippet body()}Example closing copy: who is behind this and how to get in touch.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Read the full story</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">Get in touch</ButtonLink>
			{/snippet}
		</CtaBand>
	{/snippet}
</SiteShell>
