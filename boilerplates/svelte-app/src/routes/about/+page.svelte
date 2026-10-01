<script lang="ts">
	// The about page, which needs no block of its own: PageIntro, prose,
	// outline cards, the real command with what it does, big numbers and the
	// author in an outline card (docs/content-blocks.md). The words are example
	// copy.
	import { siGithub } from 'simple-icons';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import Section from '$brand/blocks/site/section.svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import BigNumbers from '$brand/blocks/site/big-numbers.svelte';
	import CtaBand from '$brand/blocks/site/cta-band.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import CommandBar from '$brand/components/command-bar.svelte';
	import StepNumber from '$brand/components/step-number.svelte';
	import Mark from '$brand/components/mark.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import SiteShell from '$brand/blocks/site/site-shell.svelte';
	import { Card } from '$brand/ui/card/index.js';
	import ThemeToggle from '$lib/theme-toggle.svelte';

	// Example content, in the shape the lab's about page uses.
	const principles = [
		['Zero magic', 'Example copy: one line on a principle. Everything is a file you can open.'],
		['Native passthrough', 'Example copy: whatever you wrap keeps working exactly as it did.'],
		['Templates over docs', 'Example copy: the right defaults, drop a key in and go.'],
		['Reversible everything', 'Example copy: rename before delete, back up before rename.']
	];

	const howItWorks = [
		'Example copy: the first thing that happens when you run the command.',
		'Example copy: the second thing, in the order it happens.',
		'Example copy: the third thing, and what you end up with.',
		'Example copy: the last thing, which is usually a symlink.'
	];

	const glance: readonly (readonly [value: string, label: string])[] = [
		['0.4.0', 'Current version'],
		['5', 'Releases shipped'],
		['MIT', 'License'],
		['4', 'Platforms']
	];
</script>

<SiteShell site="example" maker="by hmziq" nav={['Projects', 'How it works', 'About']} current="About">
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead
			site="freeoxide"
			title="About — svelte-app"
			description="Why this exists and who is behind it. Example content."
			url="https://example.com/about"
		/>

		<Container>
			<PageIntro>
				{#snippet kicker()}About{/snippet}
				{#snippet title()}About the example{/snippet}
				{#snippet lede()}Example copy: one sentence on what this is and who it is for, written to be replaced.{/snippet}
			</PageIntro>
		</Container>

		<Section>
			{#snippet title()}Why it exists{/snippet}
			{#snippet intro()}The problem, in the lab's words. Example copy.{/snippet}
			<Prose class="max-w-2xl">
				{#snippet children()}
					<p>Example copy: two or three paragraphs on the problem this solves. Replace every word with the project's own.</p>
					<p>Example copy: the second paragraph. Say plainly what the tool does about it.</p>
				{/snippet}
			</Prose>
		</Section>

		<Section>
			{#snippet title()}What I optimize for{/snippet}
			{#snippet intro()}The principles. Example copy.{/snippet}
			<div class="grid gap-4 md:grid-cols-2">
				{#each principles as [title, body] (title)}
					<Card class="gap-3 bg-transparent px-6 shadow-none">
						{#snippet children()}
							<h3 class="text-[1.0625rem] font-medium">{title}</h3>
							<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
						{/snippet}
					</Card>
				{/each}
			</div>
		</Section>

		<Section>
			{#snippet title()}How it works{/snippet}
			{#snippet intro()}Example copy: when you run the command below, four things happen.{/snippet}
			<div class="flex flex-col gap-5">
				<!-- An example to read, not to paste: no copy button. -->
				<CommandBar command="example run --once" copy={false} />
				<ol class="grid max-w-[52rem] gap-3">
					{#each howItWorks as text, i (i)}
						<li class="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4">
							<StepNumber n={i + 1} done />
							<p class="pt-1.5 text-[0.9375rem] leading-relaxed">{text}</p>
						</li>
					{/each}
				</ol>
				<p class="mt-1 max-w-2xl leading-relaxed text-muted-foreground">Example copy: the closing line under the steps.</p>
			</div>
		</Section>

		<Section>
			{#snippet title()}At a glance{/snippet}
			<BigNumbers items={glance} />
		</Section>

		<Section>
			{#snippet title()}Built by hmziqrs{/snippet}
			<Card class="max-w-3xl flex-row items-start gap-6 bg-transparent px-6 shadow-none sm:px-9 sm:py-9">
				{#snippet children()}
					<Mark symbol="Hq" size={64} />
					<div class="flex flex-col gap-3">
						<h3 class="text-xl font-medium">Built by hmziqrs</h3>
						<p class="text-[0.9375rem] leading-relaxed text-muted-foreground">Example copy: who is behind this, in their own words.</p>
						<div class="flex flex-wrap gap-2">
							<ButtonLink href="https://github.com" variant="outline" size="sm">
								<BrandIcon icon={siGithub} data-icon="inline-start" />
								Source on GitHub
							</ButtonLink>
							<ButtonLink href="/" variant="outline" size="sm">hmziq.rs</ButtonLink>
							<ButtonLink href="/changelog" variant="outline" size="sm">See releases</ButtonLink>
						</div>
					</div>
				{/snippet}
			</Card>
		</Section>

		<CtaBand title="Ready to try it?">
			{#snippet body()}Example copy: one command, and you are running.{/snippet}
			{#snippet actions()}
				<ButtonLink href="/docs/installation" size="lg" class="px-5">Get started</ButtonLink>
				<ButtonLink href="/blog" size="lg" variant="outline" class="px-5">Read the blog</ButtonLink>
			{/snippet}
		</CtaBand>
	{/snippet}
</SiteShell>
