<script lang="ts">
	import { siApple, siLinux, siDocker, siPython, siNodedotjs, siRust, siDeno, siBun, siGit } from 'simple-icons';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Undo2 from '@lucide/svelte/icons/undo-2';
	import Network from '@lucide/svelte/icons/network';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import StatusRing from '$brand/components/status-ring.svelte';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';
	import ProductScope from '$moves/new/product-scope.svelte';
	import ProductLockup from '$moves/new/product-lockup.svelte';
	import TerminalHero from '$moves/new/terminal-hero.svelte';
	import SpecCounters from '$moves/new/spec-counters.svelte';
	import AccentSlab from '$moves/new/accent-slab.svelte';
	import FamilyFooter from '$moves/new/family-footer.svelte';

	const lines: TerminalLineData[] = [
		['cmd', 'oxbox run --net none --mount ./repo:/work -- claude-agent fix-tests'],
		['step', 'booting microVM', '118 ms'],
		['step', 'mounting /work', 'copy-on-write'],
		['kv', 'limits', '2 vCPU · 1 GiB · no network'],
		['note', 'agent tried to read ~/.ssh/id_ed25519 — not in the box, nothing there'],
		['ok', 'exit 0 · 3m 12s · 0 bytes left the box'],
		['cmd', 'oxbox diff'],
		['step', '4 files changed in /work', 'src/parser.rs, tests/parse.rs, +2'],
		['cmd', 'oxbox keep src/ tests/ && oxbox rm --all'],
		['ok', 'kept 4 files · box destroyed']
	];

	const boxes = [
		{ name: 'fix-tests', state: 'on' as const, meta: '3m · claude-agent' },
		{ name: 'pr-1432-review', state: 'on' as const, meta: '41s · node 22' },
		{ name: 'scrape-sandbox', state: 'stale' as const, meta: 'paused · python 3.13' },
		{ name: 'npm-postinstall', state: 'off' as const, meta: 'destroyed · 2m ago' }
	];

	const layers = [
		{ label: 'Your laptop', note: 'macOS · Linux · Windows (WSL2)' },
		{ label: 'oxbox', note: 'one binary, no daemon' },
		{ label: 'microVM', note: 'own kernel, own memory' },
		{ label: '/work', note: 'copy-on-write view of your folder' }
	];

	const policy = `# oxbox.toml — checked into the repo, read on every run
[box]
image   = "debian-slim"
cpus    = 2
memory  = "1GiB"
timeout = "15m"

[network]
allow = ["registry.npmjs.org", "crates.io"]   # everything else is dropped

[files]
mount  = ["./:/work"]        # copy-on-write; nothing touches disk until you keep it
secret = ["NPM_TOKEN"]       # injected per run, never written`;

	const runtimes = [siDocker, siPython, siNodedotjs, siRust, siDeno, siBun, siGit, siLinux, siApple];
</script>

<svelte:head><title>oxbox — a hmziq sandbox CLI</title></svelte:head>

<ProductScope hue="purple" tweak="oxbox">
	<ProductLockup
		name="oxbox"
		kind="CLI"
		links={[
			{ label: 'Docs', href: '#/p/new/oxbox' },
			{ label: 'Policy file', href: '#/p/new/oxbox' },
			{ label: 'Changelog', href: '#/p/new/oxbox' }
		]}
		secondary={{ label: 'GitHub', href: '#/p/new/oxbox' }}
		cta={{ label: 'Install', href: '#/p/new/oxbox' }}
	/>

	<TerminalHero preset="optical-field" kicker="oxbox 0.9 · local microVMs" session="~/code/parser — oxbox" {lines}>
		{#snippet title()}Run what you <span class="whitespace-nowrap">don't trust.<span class="ml-[0.06em] inline-block size-[0.5em] bg-primary align-baseline"></span></span>{/snippet}
		{#snippet lede()}
			<p>Agents, install scripts, that repo from a stranger's PR. oxbox boots each one in a throwaway microVM on your own laptop in about a tenth of a second — and nothing leaves the box unless you say so.</p>
		{/snippet}
		{#snippet actions()}
			<CommandBox command="curl -fsSL oxbox.sh | sh" class="w-full max-w-md bg-background" />
		{/snippet}
		{#snippet aside()}
			<div class="flex h-full flex-col rounded-xl border border-border bg-background/90 p-5 backdrop-blur-xl">
				<p class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">oxbox ls</p>
				<ul class="mt-4 flex flex-col">
					{#each boxes as b (b.name)}
						<li class="flex items-center gap-3 border-t border-border py-3">
							<StatusRing state={b.state} color="var(--primary)" />
							<div class="min-w-0">
								<p class="truncate font-mono text-[0.8rem]">{b.name}</p>
								<p class="text-xs text-muted-foreground">{b.meta}</p>
							</div>
						</li>
					{/each}
				</ul>
				<p class="mt-auto border-t border-border pt-4 text-sm leading-snug">Two boxes running, using <span class="text-primary">1.8 GiB</span> of 16.</p>
			</div>
		{/snippet}
	</TerminalHero>

	<SpecCounters
		variant="invert"
		kicker="Measured on an M3 MacBook Air, cold start"
		items={[
			{ value: '118', unit: 'ms', label: 'from command to a running VM', note: 'p50 · 200 runs' },
			{ value: '0', unit: 'bytes', label: 'leave the box unless the policy allows it' },
			{ value: '1', unit: 'binary', label: 'no daemon, no account, no cloud' },
			{ value: '4', unit: 'MB', label: 'memory overhead per idle box' }
		]}
	/>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<div class="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
			<div>
				<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">How a box is built</p>
				<h2 class="mt-5 text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] font-medium tracking-[-0.04em]">A box inside a box inside your laptop.</h2>
				<p class="mt-6 max-w-lg text-xl leading-relaxed">Every run gets its own kernel and its own memory, not a shared one with a namespace drawn around it. When the run ends, the VM is gone. Your folder only changes when you type <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">oxbox keep</code>.</p>
				<ul class="mt-10 flex flex-col gap-5">
					{#each [[ShieldCheck, 'Hardware isolation', 'KVM on Linux, Hypervisor.framework on macOS.'], [Network, 'Network off by default', 'Allow hosts one by one in the policy file.'], [Undo2, 'Copy-on-write by default', 'Review a diff, keep what you want, drop the rest.']] as [I, t, c] (t)}
						{@const Icon = I as typeof ShieldCheck}
						<li class="flex gap-4">
							<span class="grid size-10 shrink-0 place-items-center rounded-lg border border-border"><Icon class="lucide size-5 text-primary" /></span>
							<div><p class="text-lg font-medium">{t as string}</p><p class="text-foreground/80">{c as string}</p></div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="relative mx-auto aspect-square w-full max-w-[34rem]" role="img" aria-label="Nested squares: your laptop contains oxbox, which contains a microVM, which contains the /work folder">
				{#each layers as l, i (l.label)}
					<div
						class="nest absolute flex flex-col justify-between rounded-[0.35rem] border p-3 sm:p-4"
						style:inset={`${i * 12}%`}
						style:--d={i}
						class:core={i === layers.length - 1}
					>
						<span class="font-mono text-[0.65rem] uppercase tracking-[0.18em] sm:text-xs">{l.label}</span>
						{#if i < layers.length - 1}<span class="hidden self-end text-right font-mono text-[0.65rem] opacity-70 sm:block">{l.note}</span>{/if}
						{#if i === layers.length - 1}<span class="text-sm leading-snug font-medium sm:text-base">{l.note}</span>{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-t border-border bg-band">
		<div class="mx-auto grid max-w-[1320px] gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-start">
			<div class="lg:sticky lg:top-24">
				<p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">Policy as a file</p>
				<h2 class="mt-5 text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[0.95] font-medium tracking-[-0.04em]">Decide once. Every run obeys.</h2>
				<p class="mt-6 max-w-lg text-xl leading-relaxed">Check <code class="font-mono text-[0.9em]">oxbox.toml</code> into the repo and every teammate, script and agent gets the same walls — no flags to forget.</p>
				<div class="mt-10 flex flex-wrap items-center gap-5 text-muted-foreground">
					{#each runtimes as icon (icon.slug)}<BrandIcon {icon} label={icon.title} class="size-6" />{/each}
				</div>
				<p class="mt-3 text-sm text-muted-foreground">Any OCI image runs. These are the ones with tested presets.</p>
			</div>
			<CodeBlock code={policy} lang="toml" label="oxbox.toml" langChip class="min-w-0" />
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<AccentSlab grain={0} seed="oxbox-agents" kicker="Built for coding agents">
			<p class="max-w-[18ch] text-[clamp(2.2rem,5.2vw,4.75rem)] leading-[0.98] font-medium tracking-[-0.04em]">Give the agent a whole computer. Then throw it away.</p>
			<div class="mt-10 grid max-w-3xl gap-6 text-lg leading-relaxed sm:grid-cols-2">
				<p>Agents work best with real shells, real package managers and room to make a mess. oxbox gives them all three without your SSH keys, your browser cookies or your home folder.</p>
				<p>Run ten in parallel, each on its own branch of the repo. Keep the diff from the one that got it right.</p>
			</div>
			{#snippet footer()}
				<div class="flex flex-wrap items-center justify-between gap-4">
					<code class="font-mono text-sm">oxbox run -n 10 --each branch -- your-agent</code>
					<span class="font-mono text-xs uppercase tracking-wider">MCP server included</span>
				</div>
			{/snippet}
		</AccentSlab>
	</section>

	<FamilyFooter
		name="oxbox"
		preset="optical-field"
		line="Free and open source. Apache-2.0. Paid support for teams that need a contract."
		columns={[
			{ title: 'Use', links: ['Install', 'Quick start', 'Policy reference', 'MCP server'] },
			{ title: 'Source', links: ['GitHub', 'Releases', 'Security model'] },
			{ title: 'hmziq', links: ['About', 'Other tools', 'Contact'] }
		]}
	/>
</ProductScope>

<style>
	.nest {
		border-color: color-mix(in oklab, var(--foreground) calc(18% + var(--d) * 10%), transparent);
		background: color-mix(in oklab, var(--pa) calc(var(--d) * 5%), var(--background));
	}
	.nest.core {
		background: var(--pa-fill);
		color: var(--on-pa);
		border-color: transparent;
	}
</style>
