<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Download from '@lucide/svelte/icons/download';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import MousePointer2 from '@lucide/svelte/icons/mouse-pointer-2';
	import Rocket from '@lucide/svelte/icons/rocket';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import HeroStage from '$moves/site-framer/hero-stage.svelte';
	import PromptBox from '$moves/site-framer/prompt-box.svelte';
	import ProofStrip from '$moves/site-framer/proof-strip.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import EditorWindow from '$moves/site-framer/editor-window.svelte';
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
	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
</script>

<svelte:head><title>kiln — the site builder with a design agent</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader active="home" />

	<section class="{wrap} pt-16 md:pt-24">
		<h1 class="max-w-[13ch] text-[clamp(3.25rem,8.6vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.06em]">The site builder with a design agent that has taste<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h1>
		<div class="mt-8 flex flex-wrap items-end justify-between gap-6">
			<div>
				<p class="max-w-[40ch] text-xl leading-snug md:text-2xl">Describe the site, let the agent draft it, then make every pixel yours on a canvas that never locks.</p>
				<div class="mt-7 flex flex-wrap gap-3">
					<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Start for free</Button>
					<Button href={to('pricing')} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Download the app<Download class="lucide" /></Button>
				</div>
			</div>
			<a href={to('feature')} class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.9375rem] hover:border-primary"><span class="bg-primary px-1.5 font-mono text-[0.625rem] text-primary-foreground uppercase">New</span>kiln MCP<ArrowRight class="lucide size-4" /></a>
		</div>
		<HeroStage class="mt-12" corner="live material · move the cursor">
			<PromptBox />
		</HeroStage>
	</section>

	<section class="{wrap} py-24"><ProofStrip /></section>

	<section class="{wrap} pb-28">
		<SectionHead title="The site builder for shipping standout sites" />
		<EditorWindow class="mt-12" />
		<div class="mt-4 grid gap-px overflow-hidden rounded-[20px] border border-border bg-border md:grid-cols-3">
			{#each [{ I: Sparkles, t: 'Start with the agent', b: 'Say what you need. The agent lays out pages, sections and components in seconds.' }, { I: MousePointer2, t: 'Refine on the canvas', b: 'Nothing is frozen. Change type, breakpoints, motion and effects until it reads like you.' }, { I: Rocket, t: 'Publish the whole thing', b: 'Hosting, CMS, analytics and SEO are already wired, so there is no build step between you and live.' }] as c (c.t)}
				<div class="bg-background p-6 md:p-7">
					<c.I class="lucide size-5 text-primary" />
					<h3 class="mt-10 text-xl font-medium tracking-[-0.02em]">{c.t}</h3>
					<p class="mt-1.5 text-[1.0625rem] leading-snug text-foreground/75">{c.b}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Build your site together with agents" action="Start with agents" href={to('feature')} />
		<div class="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-border bg-border lg:grid-cols-3">
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
		<div class="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
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
