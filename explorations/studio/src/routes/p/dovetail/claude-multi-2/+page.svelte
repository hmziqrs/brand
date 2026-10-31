<script lang="ts">
	import SiteFooter from '$brand/components/site-footer.svelte';
	import CommandBar from '$brand/components/command-bar.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import GlyphNav from '$moves/dovetail/glyph-nav.svelte';
	import MixedHeadline from '$moves/dovetail/mixed-headline.svelte';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import PatinaRain from '$moves/dovetail/patina-rain.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import InstanceConsole from '$moves/dovetail/instance-console.svelte';
	import OxideQuoteCard from '$moves/dovetail/oxide-quote-card.svelte';
	import StatSlab from '$moves/dovetail/stat-slab.svelte';
	import ProviderOrbit from '$moves/dovetail/provider-orbit.svelte';
	import SquareRatingRow from '$moves/dovetail/square-rating-row.svelte';
	import CrowdPrefooter from '$moves/dovetail/crowd-prefooter.svelte';
	import { providers } from '$moves/dovetail/providers';

	const chapters = [
		{
			n: 'I',
			glyph: 'rings' as const,
			title: 'Isolation',
			lead: 'Each instance lives in its own folder.',
			body: 'Settings, history, MCP servers and the API key sit in ~/.claude-<name>. Nothing bleeds between them, so the client repo never sees your experiment.'
		},
		{
			n: 'II',
			glyph: 'term' as const,
			title: 'Switching',
			lead: 'One command bar, every instance.',
			body: 'Run claude-multi for the menu, or type claude-glm, claude-kimi, claude-work. Two terminals can run two providers side by side.'
		},
		{
			n: 'III',
			glyph: 'square' as const,
			title: 'Billing',
			lead: 'Every bill lands where you expect.',
			body: 'A Coding Plan here, pay-per-token there, your Anthropic plan for work. Each instance carries its own key, so spend stays legible.'
		}
	];
	const facts = [
		{ label: 'GitHub stars', value: '1.2k', score: 4.5, example: true },
		{ label: 'Runtime', value: 'Bun, Node or Deno' },
		{ label: 'Backend', value: 'None' },
		{ label: 'Fork of Claude Code', value: 'No' }
	];
	const columns = [
		{ title: 'Product', links: [{ label: 'Providers', href: '#/p/dovetail/claude-multi-2' }, { label: 'Changelog', href: '#/p/dovetail/claude-multi-2' }, { label: 'FAQ', href: '#/p/dovetail/claude-multi-2' }] },
		{ title: 'Read', links: [{ label: 'GLM-5.3 notes', href: '#/p/dovetail/claude-multi-2' }, { label: 'Kimi K2.7 notes', href: '#/p/dovetail/claude-multi-2' }] },
		{ title: 'Legal', links: [{ label: 'Privacy', href: '#/p/dovetail/claude-multi-2' }, { label: 'Terms', href: '#/p/dovetail/claude-multi-2' }] }
	];
</script>

<svelte:head><title>claude-multi · Every provider gets its own Claude</title></svelte:head>

<div id="top" class="min-h-screen overflow-x-clip bg-background text-foreground">
	<GlyphNav home="#/p/dovetail/claude-multi-2" surface="line" />

	<section class="mx-auto w-full max-w-[82rem] px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
		<div class="mb-10 flex flex-wrap items-center gap-2 border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] pb-5">
			<MonoChip tone="oxide" mark="square">claude-multi</MonoChip>
			<MonoChip tone="ghost">A command-line tool</MonoChip>
			<MonoChip tone="ghost" class="ml-auto hidden sm:inline-flex">Release 0.12 · Aug 2026</MonoChip>
		</div>
		<MixedHeadline as="h1" size="mega" base="newsreader" alt="sans">
			Every provider gets <em>its own</em> Claude<InlineGlyph kind="square" />
		</MixedHeadline>
		<div class="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
			<p class="font-newsreader text-[clamp(1.4rem,2.3vw,1.85rem)] leading-[1.3] font-light tracking-[-0.01em] text-foreground">
				claude-multi is a small CLI that sets up isolated Claude Code instances, one per model provider. Same tool you know, a separate config, history and bill for each.
			</p>
			<div class="flex flex-col gap-5 md:items-start md:pt-2">
				<CommandBar command="bun add -g claude-multi" />
				<p class="text-[0.9375rem] leading-relaxed text-foreground/80">Needs Claude Code, Bun 1+, Node 18+ or Deno 1+, and a key for at least one provider.</p>
				<SquareRatingRow items={facts} class="mt-2" />
			</div>
		</div>
	</section>

	<section class="band-orange relative isolate overflow-hidden">
		<PatinaRain mode="patina" cell={14} opacity={0.4} digits={false} mask="none" seed="v2-band" class="-z-10 text-[var(--on-orange)]" />
		<div class="mx-auto grid w-full max-w-[82rem] gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-end">
			<div class="flex flex-col gap-5 rounded-2xl bg-[var(--orange)] p-1 lg:pb-6">
				<MonoChip tone="solid" mark="square" class="w-fit">The instance list</MonoChip>
				<MixedHeadline size="md" base="newsreader" alt="sans">Pick a Claude, <em>not a dotfile</em></MixedHeadline>
				<p class="text-[1.05rem] leading-relaxed">Click through the instances. Each one shows the endpoint, the model in every slot, where its history lives and who bills it.</p>
			</div>
			<InstanceConsole {providers} start="kimi" />
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-20 sm:px-6 sm:py-28">
		<div class="grid gap-x-12 gap-y-16 md:grid-cols-3">
			{#each chapters as c (c.n)}
				<article class="flex flex-col gap-5 border-t border-foreground pt-6">
					<div class="flex items-baseline justify-between">
						<span class="font-newsreader text-[4.5rem] leading-none font-light tracking-[-0.04em]">{c.n}.</span>
						<span class="text-[3.25rem] leading-none"><InlineGlyph kind={c.glyph} /></span>
					</div>
					<MonoChip tone="ghost" mark="square" class="px-0">{c.title}</MonoChip>
					<h3 class="font-newsreader text-[1.85rem] leading-[1.1] tracking-[-0.02em]">{c.lead}</h3>
					<p class="text-[1.05rem] leading-[1.6] text-foreground/85">{c.body}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 pb-20 sm:px-6 sm:pb-28">
		<OxideQuoteCard
			face="serif"
			texture="shader"
			preset="halftone-print"
			label="Example reader note"
			quote="The work instance bills the company, the GLM one bills me, and I stopped exporting keys in .zshrc. It feels like having two laptops in one terminal."
			name="Teodora Vance"
			role="Independent developer (invented example)"
			class="min-h-[26rem]"
		/>
		<div class="mt-4 grid gap-4 md:grid-cols-3">
			<StatSlab value="8" label="Provider templates" detail="Base URL, model slots and defaults, merged into each new instance." tone="oxide" />
			<StatSlab value="1M" label="Context on the big slots" detail="GLM-5.3, DeepSeek V4-Pro and MiMo map their [1m] models into the Opus slot." />
			<StatSlab value="0" label="Telemetry" detail="No backend. The CLI makes no network calls of its own." tone="ink" arrow={false} />
		</div>
	</section>

	<section class="band-orange relative isolate overflow-hidden py-20 sm:py-28">
		<div class="mx-auto w-full max-w-[82rem] px-4 sm:px-6">
			<div class="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
				<MixedHeadline size="xl" base="newsreader" alt="sans">Eight templates,<br /><em>one</em> orbit</MixedHeadline>
				<p class="max-w-[24rem] text-[1.1rem] leading-relaxed">A template is a bundle of base URL and model mapping. You bring the key; claude-multi does the rest, and <code class="font-mono text-[0.85em]">doctor</code> keeps it current.</p>
			</div>
		</div>
		<ProviderOrbit {providers} glow={false} preset="copper-sweep" class="mt-10" />
	</section>

	<CrowdPrefooter {providers} spread="wide" tones={['ink', 'oxide', 'card', 'material']}>
		<MixedHeadline size="mega" base="newsreader" alt="sans">Your keys.<br />Your bills.<br /><em>Your</em> Claudes.</MixedHeadline>
		{#snippet after()}
			<div id="install" class="flex flex-wrap justify-center gap-3">
				<Button size="lg" href="#/p/dovetail/claude-multi-2">Install claude-multi</Button>
				<Button size="lg" variant="outline" href="#/p/dovetail/claude-multi-2">Read the provider notes</Button>
			</div>
		{/snippet}
	</CrowdPrefooter>

	<SiteFooter site="claude-multi" tagline="Run a separate Claude Code for every provider." {columns} github="https://github.com/hmziqrs" />
</div>
