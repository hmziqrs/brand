<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import PosterHero from '$moves/site-framer/poster-hero.svelte';
	import InlinePoster from '$moves/site-framer/inline-poster.svelte';
	import BuildSteps from '$moves/site-framer/build-steps.svelte';
	import PromptBox from '$moves/site-framer/prompt-box.svelte';
	import ProofStrip from '$moves/site-framer/proof-strip.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import BentoCell from '$moves/site-framer/bento-cell.svelte';
	import CmsTable from '$moves/site-framer/cms-table.svelte';
	import AgentTerminal from '$moves/site-framer/agent-terminal.svelte';
	import MaterialFan from '$moves/site-framer/material-fan.svelte';
	import UiPanel from '$moves/site-framer/ui-panel.svelte';
	import SiteCard from '$moves/site-framer/site-card.svelte';
	import StoryRail from '$moves/site-framer/story-rail.svelte';
	import CommunityWindow from '$moves/site-framer/community-window.svelte';
	import { sites, to } from '$moves/site-framer/site';

	let variant = $state(0);
	const variants = [sites[0], { ...sites[0], layout: 'split' as const, line: 'Made slowly in Lisbon.' }, { ...sites[0], layout: 'centre' as const, line: 'Furniture for the long run', preset: 'creased-paper', ink: 'dark' as const }];
	const wrap = 'mx-auto max-w-[1320px] px-4 sm:px-8';
	const heroSites = [sites[1], sites[3], sites[5], sites[0], sites[2], sites[4], sites[8]];
</script>

<svelte:head><title>kiln — the site builder with a design agent</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="home" />

	<PosterHero sites={heroSites} class="pt-16 md:pt-24">
		<a href={to('feature')} class="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 py-1 pr-3 pl-1 text-[0.9375rem] backdrop-blur hover:border-primary"><span class="rounded-full bg-primary px-2 py-0.5 font-mono text-[0.625rem] text-primary-foreground uppercase">New</span>kiln MCP for your coding agent<ArrowRight class="lucide size-4" /></a>
		<h1 class="text-[clamp(3.5rem,10.4vw,10rem)] leading-[0.86] font-semibold tracking-[-0.065em]">Describe a site.<br />Ship it<InlinePoster sites={sites.slice(0, 6)} />today<span class="ml-[0.04em] inline-block size-[0.14em] bg-primary"></span></h1>
		<p class="mt-8 max-w-[34ch] text-xl leading-snug text-foreground md:text-2xl">A design agent with taste drafts every page. A canvas that never locks lets you change every pixel.</p>
		<PromptBox glow={false} class="mt-10" />
	</PosterHero>

	<section class="{wrap} py-24"><ProofStrip /></section>

	<section class="{wrap} pb-28">
		<SectionHead title="From one sentence to a live site" lede="Three steps, one surface. Scroll, or click a step to try it." />
		<BuildSteps site={sites[0]} class="mt-12" />
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Build your site together with agents" action="Start with agents" href={to('feature')} />
		<div class="mt-12 grid gap-4 lg:grid-cols-3">
			<BentoCell class="lg:col-span-2" title="Design with an agent" href={to('feature')} body="A design agent that lives on the canvas. It drafts and refines in place, and every change stays visible, editable and yours.">
				{#snippet art()}
					<div class="w-full">
						<div class="mb-3 flex gap-1.5">
							{#each ['Original', 'Big intro', 'Side nav'] as v, i (v)}
								<button type="button" onclick={() => (variant = i)} class="rounded-full px-3 py-1 text-sm transition-colors" class:bg-primary={variant === i} class:text-primary-foreground={variant === i} class:bg-muted={variant !== i}>{v}</button>
							{/each}
						</div>
						<div class="grid grid-cols-3 gap-3">
							{#each variants as v, i (i)}
								<button type="button" onclick={() => (variant = i)} class="rounded-2xl text-left ring-offset-4 ring-offset-background transition-all" class:ring-2={variant === i} class:ring-primary={variant === i} class:opacity-50={variant !== i} aria-label="Variation {i + 1}">
									<SiteCard site={v} tall caption={false} />
								</button>
							{/each}
						</div>
					</div>
				{/snippet}
			</BentoCell>
			<BentoCell title="Code with an agent" href={to('feature')} body="Ask for an effect or an interaction and get a real component you can keep editing.">
				{#snippet art()}<MaterialFan />{/snippet}
			</BentoCell>
			<BentoCell class="lg:col-span-2" title="Run your CMS with an agent" href={to('feature')} body="The CMS agent sets up collections, fills them and keeps them in step with the design.">
				{#snippet art()}<CmsTable compact class="w-full" />{/snippet}
			</BentoCell>
			<BentoCell title="Connect your AI with MCP" href={to('feature')} body="Work on your site from the coding agent you already use, then review on the canvas before you publish." artClass="px-4">
				{#snippet art()}<AgentTerminal class="w-full" />{/snippet}
			</BentoCell>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Not just a vibe. A whole platform." lede="Everything a site needs after the first draft: CMS, hosting, analytics, SEO and testing, already built in." />
		<div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<BentoCell title="Performance" href={to('enterprise')}>{#snippet art()}<UiPanel kind="vitals" />{/snippet}</BentoCell>
			<BentoCell class="lg:col-span-2" title="Analytics" href={to('feature')}>{#snippet art()}<UiPanel kind="analytics" class="max-w-[620px]" />{/snippet}</BentoCell>
			<BentoCell title="SEO" href={to('feature')}>{#snippet art()}<UiPanel kind="seo" />{/snippet}</BentoCell>
			<BentoCell title="Collaboration" href={to('enterprise')}>{#snippet art()}<UiPanel kind="branches" />{/snippet}</BentoCell>
			<BentoCell tone="oxide" title="Hosting" href={to('enterprise')} body="A global edge network, in 300+ cities.">
				{#snippet art()}<p class="text-[clamp(4rem,8vw,6.5rem)] leading-[0.8] font-semibold tracking-[-0.06em]">99.99<span class="text-[0.5em]">%</span><span class="block text-[0.42em] tracking-[-0.03em]">uptime</span></p>{/snippet}
			</BentoCell>
			<BentoCell title="Localization" href={to('feature')}>{#snippet art()}<UiPanel kind="locales" />{/snippet}</BentoCell>
			<BentoCell title="Security" href={to('enterprise')}>{#snippet art()}<UiPanel kind="security" />{/snippet}</BentoCell>
			<BentoCell title="A/B testing" href={to('feature')}>{#snippet art()}<UiPanel kind="abtest" />{/snippet}</BentoCell>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Shipped with kiln" action="See kiln sites" href={to('templates')} />
		<div class="mt-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each sites.slice(0, 6) as s (s.name)}
				<SiteCard site={s} />
			{/each}
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Trusted by teams shipping big sites" action="Read stories" href={to('blog')} class="mb-12" />
		<StoryRail />
	</section>

	<section class="{wrap} pb-8">
		<SectionHead title="Built on a community that is here to stay" meta="26,000+ resources" action="Browse the community" href={to('templates')} />
		<CommunityWindow class="mt-12" />
	</section>

	<SiteFooter>
		{#snippet cta()}
			<div class="flex flex-col items-center text-center">
				<h2 class="text-[clamp(2.75rem,7vw,6rem)] leading-[0.9] font-semibold tracking-[-0.055em]">Your next idea starts here<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h2>
				<PromptBox glow={false} class="mt-10" />
				<a href={to('templates')} class="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] hover:text-primary">Start from a blank page<ArrowRight class="lucide size-4" /></a>
			</div>
		{/snippet}
	</SiteFooter>
</div>
