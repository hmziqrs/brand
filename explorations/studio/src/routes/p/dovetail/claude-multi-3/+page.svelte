<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import Glass from '$brand/components/glass.svelte';
	import MaterialStage from '$brand/components/material-stage.svelte';
	import CommandBar from '$brand/components/command-bar.svelte';
	import LiveOxideStage from '$moves/dovetail/live-oxide-stage.svelte';
	import GlyphNav from '$moves/dovetail/glyph-nav.svelte';
	import MixedHeadline from '$moves/dovetail/mixed-headline.svelte';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import SquareRatingRow from '$moves/dovetail/square-rating-row.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import MaterialProviderTile from '$moves/dovetail/material-provider-tile.svelte';
	import InstanceConsole from '$moves/dovetail/instance-console.svelte';
	import StatSlab from '$moves/dovetail/stat-slab.svelte';
	import OxideQuoteCard from '$moves/dovetail/oxide-quote-card.svelte';
	import ProviderOrbit from '$moves/dovetail/provider-orbit.svelte';
	import CrowdPrefooter from '$moves/dovetail/crowd-prefooter.svelte';
	import { providers } from '$moves/dovetail/providers';

	const metals = ['copper-sweep', 'hammered-copper', 'lava-fissures', 'mica-flakes', 'sediment', 'folded-foil', 'brushed-alloy', 'cast-iron'];
	const trust = [
		{ label: 'GitHub stars', value: '1.2k', score: 4.5, example: true },
		{ label: 'Proxy in the path', value: 'None' },
		{ label: 'Keys leave your machine', value: 'Never' }
	];
	const columns = [
		{ title: 'Product', links: [{ label: 'Providers', href: '#/p/dovetail/claude-multi-3' }, { label: 'Changelog', href: '#/p/dovetail/claude-multi-3' }, { label: 'FAQ', href: '#/p/dovetail/claude-multi-3' }] },
		{ title: 'Docs', links: [{ label: 'Install', href: '#/p/dovetail/claude-multi-3' }, { label: 'Templates', href: '#/p/dovetail/claude-multi-3' }] },
		{ title: 'Legal', links: [{ label: 'Privacy', href: '#/p/dovetail/claude-multi-3' }, { label: 'Terms', href: '#/p/dovetail/claude-multi-3' }] }
	];
</script>

<svelte:head><title>claude-multi · Many Claudes, one command bar</title></svelte:head>

<div id="top" class="min-h-screen overflow-x-clip bg-background text-foreground">
	<LiveOxideStage preset="lava-fissures" scrim="none" class="min-h-[100svh]">
		<GlyphNav home="#/p/dovetail/claude-multi-3" surface="glass" />
		<div class="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[82rem] flex-col justify-between gap-10 px-3 pt-6 pb-3 sm:px-6 sm:pb-6">
			<Glass variant="frost" class="self-end rounded-xl px-5 py-4">
				<SquareRatingRow items={trust} />
			</Glass>
			<div class="rounded-[1.75rem] bg-background p-6 sm:p-10 lg:p-12">
				<div class="mb-8 flex flex-wrap gap-2">
					<MonoChip tone="oxide" mark="square">claude-multi</MonoChip>
					<MonoChip mark="plus">8 templates</MonoChip>
					<MonoChip mark="plus">Bun · Node · Deno</MonoChip>
				</div>
				<MixedHeadline as="h1" size="xl" alt="crt" tint="primary" class="lg:text-[8.25rem]">
					Many <InlineGlyph kind="tile" preset="lava-fissures" /> Claudes,<br /><em>one</em> command bar
				</MixedHeadline>
				<div class="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<p class="max-w-[38rem] text-[1.2rem] leading-[1.5] text-foreground sm:text-[1.35rem]">
						Launch a separate Claude Code for every provider you pay for. Its own config, its own history, its own bill, one keystroke apart.
					</p>
					<div class="flex flex-wrap gap-2.5">
						<Button size="lg" href="#/p/dovetail/claude-multi-3">Install</Button>
						<Button size="lg" variant="outline" href="#/p/dovetail/claude-multi-3">See the providers</Button>
					</div>
				</div>
			</div>
		</div>
	</LiveOxideStage>

	<section id="providers" class="mx-auto w-full max-w-[82rem] px-4 py-20 sm:px-6 sm:py-28">
		<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<MixedHeadline size="xl" alt="crt" tint="primary">Pick your <em>metal</em></MixedHeadline>
			<p class="max-w-[26rem] text-[1.1rem] leading-relaxed text-foreground">Every template maps a provider’s models into Claude Code’s Opus and fast slots. Bring a key, get an instance.</p>
		</div>
		<div class="grid gap-3 md:grid-cols-2">
			{#each providers.slice(0, 2) as p, i (p.id)}<MaterialProviderTile provider={p} preset={metals[i]} size="lg" />{/each}
		</div>
		<div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each providers.slice(2) as p, i (p.id)}<MaterialProviderTile provider={p} preset={metals[i + 2]} />{/each}
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 pb-20 sm:px-6 sm:pb-28">
		<MixedHeadline size="lg" alt="crt" tint="primary" class="mb-10 max-w-[60rem]">Switch <InlineGlyph kind="stack" preset="lava-fissures" /> without <em>re-exporting</em> a single key</MixedHeadline>
		<MaterialStage preset="oxide-bloom" window="none" padding="lg" class="rounded-[1.75rem]">
			<InstanceConsole {providers} start="ds" />
		</MaterialStage>
	</section>

	<section class="mx-auto grid w-full max-w-[82rem] gap-3 px-4 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-4">
		<StatSlab value="8" label="Templates" detail="Provider env bundles, synced by doctor." face="dot" tone="oxide" class="lg:col-span-1" />
		<OxideQuoteCard
			texture="shader"
			preset="oxide-chalk"
			quote="DeepSeek for the grind, GLM for long context, Anthropic for the client. Three instances, three receipts, zero exported variables."
			name="Ilya Marchetti"
			role="Platform engineer (invented example)"
			class="lg:col-span-2"
		/>
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
			<StatSlab value="1M" label="Context, big slot" detail="GLM-5.3, V4-Pro, MiMo." face="dot" />
			<StatSlab value="0" label="Daemons" detail="Wrapper scripts only." face="dot" tone="ink" arrow={false} />
		</div>
	</section>

	<section class="relative overflow-hidden border-y border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] py-20 sm:py-28">
		<div class="mx-auto mb-4 w-full max-w-[82rem] px-4 text-center sm:px-6">
			<MixedHeadline size="lg" alt="crt" tint="primary">Everything <em>orbits</em> one CLI</MixedHeadline>
		</div>
		<ProviderOrbit {providers} glyph="square" preset="lava-fissures" caption="Wrappers · no proxy" />
	</section>

	<CrowdPrefooter {providers} spread="wide" tones={['material', 'oxide', 'ink', 'material', 'card']} preset="lava-fissures">
		<MixedHeadline size="mega" alt="crt" tint="primary">Stop <em>juggling</em><br />API keys</MixedHeadline>
		{#snippet after()}
			<div id="install" class="flex flex-col items-center gap-3">
				<CommandBar command="bun add -g claude-multi" class="bg-background" />
				<span class="font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">or npm · yarn · deno</span>
			</div>
		{/snippet}
	</CrowdPrefooter>

	<SiteFooter site="claude-multi" tagline="Run a separate Claude Code for every provider." {columns} github="https://github.com/hmziqrs" />
</div>
