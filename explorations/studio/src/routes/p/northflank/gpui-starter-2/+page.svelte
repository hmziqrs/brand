<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import IsoCubeGlyph from '$moves/northflank/iso-cube-glyph.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import MaterialStage from '$moves/northflank/material-stage.svelte';
	import DesktopWindow from '$moves/northflank/desktop-window.svelte';
	import OxideSlab from '$moves/northflank/oxide-slab.svelte';
	import DotMatrixWord from '$moves/northflank/dot-matrix-word.svelte';
	import BigCounters from '$moves/northflank/big-counters.svelte';
	import LoopDiagram from '$moves/northflank/loop-diagram.svelte';
	import DitherFooter from '$moves/northflank/dither-footer.svelte';
	import { footer, starterFiles, CMD } from '../shared';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
	const self = '#/p/northflank/gpui-starter-2';
	const platforms = [
		{ id: 'mac', label: 'macOS' },
		{ id: 'windows', label: 'Windows' },
		{ id: 'linux', label: 'Linux' }
	] as const;
	let platform = $state<'mac' | 'windows' | 'linux'>('mac');

	const counters = [
		{ value: '1', label: 'command to scaffold' },
		{ value: '3', label: 'native window chromes' },
		{ value: '5', label: 'installers per tag' },
		{ value: '6', unit: 'h', label: 'between update checks' }
	];
</script>

<svelte:head><title>gpui-starter · northflank 2</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<header class="{wrap} flex h-16 items-center gap-8">
		<a href={self} class="text-[18px] text-foreground"><Wordmark name="gpui-starter" /></a>
		<nav class="hidden items-center gap-7 text-[14px] text-foreground/75 md:flex" aria-label="Main">
			<a href={self} class="hover:text-foreground">Guide</a>
			<a href={self} class="hover:text-foreground">Examples</a>
			<a href={self} class="hover:text-foreground">Changelog</a>
		</nav>
		<Button href={self} class="ml-auto">Start a project</Button>
	</header>

	<section class="{wrap} pt-14 pb-16 lg:pt-24">
		<MonoLabel text="The desktop starter for GPUI" />
		<h1 class="mt-8 text-[clamp(56px,11.6vw,170px)] leading-[0.88] font-medium tracking-[-0.055em] text-foreground">
			Desktop apps,<br />
			<IsoCubeGlyph stack={2} spin class="mr-[0.08em] h-[0.78em] align-[-0.02em]" />cast in
			<span class="text-orange">Rust.</span>
		</h1>
		<div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end [&>*]:min-w-0">
			<p class="max-w-[36rem] text-[clamp(19px,1.8vw,24px)] leading-[1.45] text-foreground">
				A GPUI app with window chrome, theming, routing, settings and auto-update already in place. Rename it, write your screens, tag a release.
			</p>
			<div class="flex flex-col gap-3 lg:items-end">
				<CommandBox command={CMD} class="w-full max-w-[30rem] bg-background" />
				<div class="flex gap-3">
					<Button href={self} size="lg">Start a project <ArrowRight class="lucide" /></Button>
					<Button href={self} size="lg" variant="outline">See the guide</Button>
				</div>
			</div>
		</div>
	</section>

	<section class="{wrap} pb-24">
		<MaterialStage preset="hammered-copper" class="px-4 pt-6 pb-8 sm:px-10 sm:pt-8 sm:pb-14">
			<div class="flex flex-wrap items-center justify-between gap-3">
				<p class="rounded-full bg-background px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">One codebase · three window chromes</p>
				<div role="tablist" aria-label="Platform" class="flex rounded-full bg-background p-1">
					{#each platforms as p (p.id)}
						<button
							type="button"
							role="tab"
							aria-selected={platform === p.id}
							onclick={() => (platform = p.id)}
							class="rounded-full px-3.5 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground aria-selected:bg-foreground aria-selected:text-background"
						>{p.label}</button>
					{/each}
				</div>
			</div>
			<div class="mx-auto mt-8 max-w-[880px] sm:mt-12">
				<DesktopWindow screen="settings" {platform} class="shadow-2xl" />
			</div>
		</MaterialStage>
	</section>

	<section class="bg-(--band)">
		<div class="{wrap} py-20">
			<h2 class="max-w-[20ch] text-[clamp(36px,5vw,68px)] leading-[1] font-medium tracking-[-0.04em]">The parts you would write twice, written once.</h2>
			<BigCounters items={counters} class="mt-14" />
		</div>
	</section>

	<OxideSlab texture={false} class="border-y">
		<div class="{wrap} grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center [&>*]:min-w-0">
			<div>
				<p class="font-mono text-[11px] tracking-[0.14em] uppercase">01 · scaffold</p>
				<h3 class="mt-4 max-w-[14ch] text-[clamp(36px,5vw,72px)] leading-[0.98] font-medium tracking-[-0.045em]">One command. Six systems wired.</h3>
				<p class="mt-5 max-w-[32rem] text-[19px] leading-[1.45]">Window chrome, theming, routing, settings, auto-update and packaging arrive as plain Rust you can read and change.</p>
			</div>
			<DotMatrixWord word="build" tone="ink" markTone="ink" padX={1} padY={1} dim={0.1} />
		</div>
	</OxideSlab>

	<section>
		<div class="{wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center [&>*]:min-w-0">
			<div>
				<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">02 · theme</p>
				<h3 class="mt-4 text-[clamp(32px,4vw,56px)] leading-[1] font-medium tracking-[-0.04em]">Tokens, stacked.</h3>
				<p class="mt-5 max-w-[28rem] text-[19px] leading-[1.45] text-foreground">Light, dark and system as layers, your accent on top. Every view reads the same tokens, and switching never needs a restart.</p>
			</div>
			<DesktopWindow screen="palette" platform="linux" class="shadow-2xl" />
		</div>
	</section>

	<section class="border-y bg-(--band)">
		<div class="{wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center [&>*]:min-w-0">
			<CodeBlock code={starterFiles[1].code} lang="toml" label="starter.toml" class="order-2 bg-background lg:order-1" />
			<div class="order-1 lg:order-2">
				<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">03 · config</p>
				<h3 class="mt-4 text-[clamp(32px,4vw,56px)] leading-[1] font-medium tracking-[-0.04em]">One file decides the release.</h3>
				<p class="mt-5 max-w-[28rem] text-[19px] leading-[1.45] text-foreground">App id, targets, signing and the update channel live in <code class="font-mono text-[0.9em] text-orange">starter.toml</code>. CI reads the same file you do.</p>
			</div>
		</div>
	</section>

	<section>
		<div class="{wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center [&>*]:min-w-0">
			<div>
				<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">04 · update</p>
				<h3 class="mt-4 text-[clamp(32px,4vw,56px)] leading-[1] font-medium tracking-[-0.04em]">Updates that ask once, then get out of the way.</h3>
				<p class="mt-5 max-w-[28rem] text-[19px] leading-[1.45] text-foreground">Signed delta patches download in the background. One prompt to restart, never a modal on launch.</p>
			</div>
			<DesktopWindow screen="update" platform="windows" class="shadow-2xl" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-2 lg:items-end">
				<h2 class="text-[clamp(44px,7vw,104px)] leading-[0.92] font-medium tracking-[-0.05em]">Build. Test.<br />Package. <span class="text-orange">Repeat.</span></h2>
				<p class="max-w-[30rem] text-[20px] leading-[1.45] text-foreground lg:justify-self-end">The included workflow runs the whole loop on every tag, and your app's updater closes it.</p>
			</div>
			<LoopDiagram class="mt-16" counterClass="font-sans font-medium tracking-[-0.05em]" />
		</div>
	</section>

	<OxideSlab from="top" class="border-y">
		<div class="{wrap} grid gap-10 py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end [&>*]:min-w-0">
			<h2 class="text-[clamp(56px,10vw,150px)] leading-[0.88] font-medium tracking-[-0.055em]">Start<br />tonight.</h2>
			<div class="flex flex-col gap-4">
				<p class="max-w-[28rem] text-[20px] leading-[1.45]">MIT licensed. Clone it, rename it, keep every line.</p>
				<CommandBox command={CMD} class="dark w-full bg-background text-foreground" />
				<div><Button href={self} size="lg">Start a project <ArrowRight class="lucide" /></Button></div>
			</div>
		</div>
	</OxideSlab>

	<DitherFooter {...footer} field="ink" shape="round" />
</div>
