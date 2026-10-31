<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import SiteFooter from '$brand/components/site-footer.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import CommandBar from '$brand/components/command-bar.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import GlyphNav from '$moves/dovetail/glyph-nav.svelte';
	import MixedHeadline from '$moves/dovetail/mixed-headline.svelte';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import PatinaRain from '$moves/dovetail/patina-rain.svelte';
	import SquareRatingRow from '$moves/dovetail/square-rating-row.svelte';
	import MonoChip from '$moves/dovetail/mono-chip.svelte';
	import InstanceConsole from '$moves/dovetail/instance-console.svelte';
	import OxideQuoteCard from '$moves/dovetail/oxide-quote-card.svelte';
	import StatSlab from '$moves/dovetail/stat-slab.svelte';
	import ProviderOrbit from '$moves/dovetail/provider-orbit.svelte';
	import CrowdPrefooter from '$moves/dovetail/crowd-prefooter.svelte';
	import ProviderMark from '$moves/dovetail/provider-mark.svelte';
	import { providers } from '$moves/dovetail/providers';

	const trust = [
		{ label: 'GitHub stars', value: '1.2k', score: 4.5, example: true },
		{ label: 'npm weekly', value: '3.4k', score: 4, example: true },
		{ label: 'Telemetry', value: 'None' },
		{ label: 'Network calls of its own', value: 'Zero' }
	];
	const reasons = [
		'Stop one provider’s settings leaking into another',
		'Keep a separate history and bill per instance',
		'Switch from one command bar, not a dotfile edit'
	];
	const session = [
		['cmd', 'claude-multi add'],
		['step', 'Step 1 / 8 · instance name', 'glm'],
		['step', 'Step 2 / 8 · provider', 'GLM Coding Plan'],
		['step', 'Step 3 / 8 · api key', '••••••••••••'],
		['step', 'Step 7 / 8 · link plugins & skills', 'Y'],
		['ok', "instance 'glm' created"],
		['kv', 'binary', '/usr/local/bin/claude-glm'],
		['kv', 'config', '~/.claude-glm']
	] as const;
	const columns = [
		{ title: 'Product', links: [{ label: 'Providers', href: '#/p/dovetail/claude-multi-1' }, { label: 'Changelog', href: '#/p/dovetail/claude-multi-1' }, { label: 'FAQ', href: '#/p/dovetail/claude-multi-1' }] },
		{ title: 'Docs', links: [{ label: 'Install', href: '#/p/dovetail/claude-multi-1' }, { label: 'Templates', href: '#/p/dovetail/claude-multi-1' }, { label: 'Doctor', href: '#/p/dovetail/claude-multi-1' }] },
		{ title: 'Legal', links: [{ label: 'Privacy', href: '#/p/dovetail/claude-multi-1' }, { label: 'Terms', href: '#/p/dovetail/claude-multi-1' }] }
	];
</script>

<svelte:head><title>claude-multi · Run a separate Claude Code for every provider</title></svelte:head>

<div id="top" class="min-h-screen overflow-x-clip bg-background text-foreground">
	<section class="relative isolate">
		<PatinaRain mode="rain" cell={17} opacity={0.5} mask="hero" class="-z-10" />
		<div aria-hidden="true" class="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-background"></div>
		<GlyphNav home="#/p/dovetail/claude-multi-1" />
		<div class="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[82rem] flex-col justify-between gap-16 px-4 pt-10 pb-10 sm:px-6 sm:pt-14">
			<div class="grid gap-10 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-start">
				<div class="flex flex-col gap-6">
					<p class="text-[1.15rem] leading-[1.45] text-foreground sm:text-[1.3rem]">
						<span class="font-medium">The switchboard for Claude Code.</span>
						One CLI launches an isolated Claude Code for every provider you pay for, each with its own config, history and bill.
					</p>
					<div class="flex flex-wrap gap-2.5">
						<Button size="lg" href="#/p/dovetail/claude-multi-1">Install claude-multi</Button>
						<Button size="lg" variant="outline" href="#/p/dovetail/claude-multi-1">See how it works</Button>
					</div>
				</div>
				<SquareRatingRow items={trust} class="w-fit rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-background/90 px-5 py-4 backdrop-blur-sm lg:justify-self-end" />
			</div>
			<div class="flex flex-col gap-10">
				<MixedHeadline as="h1" size="mega" alt="accent">
					Run a <InlineGlyph kind="term" /> Claude<br />for <em>every</em> provider
				</MixedHeadline>
				<div class="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] pt-6">
					<span class="font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">Templates for</span>
					{#each providers as p (p.id)}
						<span class="flex items-center gap-2 text-[0.95rem] text-foreground/75"><ProviderMark provider={p} class="text-[1.05rem]" />{p.name}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 py-20 sm:px-6 sm:py-28">
		<div class="mb-8 flex flex-wrap gap-2">
			<MonoChip mark="square">Instances</MonoChip>
			<MonoChip mark="plus">Command bar</MonoChip>
			<MonoChip mark="plus">Per-instance billing</MonoChip>
		</div>
		<InstanceConsole {providers} />
	</section>

	<section id="how" class="mx-auto w-full max-w-[82rem] px-4 py-16 sm:px-6 sm:py-24">
		<MixedHeadline size="xl" alt="accent">Keep every <em>context</em> <InlineGlyph kind="rings" /> apart</MixedHeadline>
		<div class="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
			<div class="flex flex-col gap-10">
				<p class="max-w-[34rem] text-[1.2rem] leading-[1.5] text-foreground">
					Every instance is a tiny wrapper that points Claude Code at its own folder, <code class="font-mono text-[0.85em] text-primary">~/.claude-&lt;name&gt;</code>, then runs the real <code class="font-mono text-[0.85em]">claude</code>. No fork, no proxy, no background process.
				</p>
				<ul class="flex flex-col border-t border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]">
					{#each reasons as r, i (r)}
						<li class="flex items-baseline gap-4 border-b border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] py-4 text-[1.15rem] text-foreground">
							<span class="font-mono text-[0.75rem] text-primary">0{i + 1}</span>{r}
						</li>
					{/each}
				</ul>
			</div>
			<TerminalWindow title="claude-multi add" class="self-start shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--orange)_45%,transparent)]">
				<TerminalBody>
					{#each session as line, i (i)}<TerminalLine line={[...line] as never} />{/each}
				</TerminalBody>
			</TerminalWindow>
		</div>
	</section>

	<section class="mx-auto grid w-full max-w-[82rem] gap-4 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
		<OxideQuoteCard
			quote="I had three shells with three sets of exported keys and kept billing the wrong one. Now it’s claude-glm for the big refactor and claude-work for the client repo, and they never touch."
			name="Rana Okafor"
			role="Staff engineer (invented example)"
		/>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
			<StatSlab value="8" label="Provider templates" detail="Base URL, model slots and defaults merged in for you. You bring the key." face="sans" />
			<StatSlab value="0" label="Proxies or patches" detail="Each instance is a shell wrapper that sets CLAUDE_CONFIG_DIR and execs claude." face="sans" arrow={false} />
		</div>
	</section>

	<section class="relative py-20 sm:py-28">
		<ProviderOrbit {providers} />
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 pb-20 sm:px-6">
		<div class="flex flex-col items-center text-center">
			<MixedHeadline size="xl" alt="accent">Switch <InlineGlyph kind="orbit" /> in <em>one</em> command</MixedHeadline>
			<p class="mt-8 max-w-[40rem] text-[1.2rem] leading-[1.5] text-foreground">
				Open the TUI with <code class="font-mono text-[0.85em] text-primary">claude-multi</code>, or skip it and type the instance you want. Two terminals, two providers, side by side.
			</p>
		</div>
		<div class="mt-16 grid gap-4 md:grid-cols-3">
			{#each [
				{ t: 'Plugins synced once', d: 'Each instance links plugins/ and skills/ back to ~/.claude. Install once, every synced instance has it.', code: ['plugins → ~/.claude/plugins', 'skills  → ~/.claude/skills', 'mcp     → per instance'] },
				{ t: 'Keys stay on your machine', d: 'No backend and no telemetry. Each key lives in its instance’s own settings.json.', code: ['{', '  "provider": "glm",', '  "baseUrl": "https://api.z.ai"', '}'] },
				{ t: 'Doctor keeps templates fresh', d: 'claude-multi doctor spots model values that drifted from the current template.', code: ['$ claude-multi doctor', '✓ work   up to date', '! glm    sonnet slot differs'] }
			] as c (c.t)}
				<article class="flex flex-col gap-5 rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card p-6">
					<pre class="overflow-x-auto rounded-lg border bg-background p-4 font-mono text-[0.75rem] leading-[1.7] text-foreground/85">{c.code.join('\n')}</pre>
					<h3 class="text-[1.1rem] font-medium">{c.t}</h3>
					<p class="-mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">{c.d}</p>
				</article>
			{/each}
		</div>
	</section>

	<CrowdPrefooter {providers}>
		<MixedHeadline size="mega" alt="accent" class="leading-[0.95]">Bring<br /><em>every</em> model<br />home</MixedHeadline>
		{#snippet after()}
			<div id="install" class="flex flex-col items-center gap-4">
				<CommandBar command="bun add -g claude-multi" class="bg-background" />
				<a href="#/p/dovetail/claude-multi-1" class="inline-flex items-center gap-1.5 text-[0.875rem] text-foreground/80 hover:text-foreground">npm, yarn and deno work too <ArrowRight class="lucide size-3.5" /></a>
			</div>
		{/snippet}
	</CrowdPrefooter>

	<SiteFooter site="claude-multi" tagline="Run a separate Claude Code for every provider." {columns} github="https://github.com/hmziqrs" />
</div>
