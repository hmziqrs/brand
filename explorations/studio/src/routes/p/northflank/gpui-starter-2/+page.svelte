<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import Scene from '$brand/components/scene.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import IsoCubeGlyph from '$moves/northflank/iso-cube-glyph.svelte';
	import IsoTileStack from '$moves/northflank/iso-tile-stack.svelte';
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
			<span class="font-serif tracking-[-0.02em] text-orange italic">Rust.</span>
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
		<MaterialStage preset="hammered-copper" caption="One codebase · three window chromes" class="px-4 pt-16 pb-6 sm:px-8 md:h-[min(62vw,720px)] md:p-0">
			<div class="md:hidden">
				<DesktopWindow screen="settings" platform="mac" />
			</div>
			<div class="hidden md:block">
				<DesktopWindow screen="update" platform="windows" class="absolute top-[12%] left-[4%] w-[50%] opacity-95" />
				<DesktopWindow screen="palette" platform="linux" class="absolute top-[7%] right-[4%] w-[46%] opacity-95" />
				<DesktopWindow screen="settings" platform="mac" class="absolute top-[30%] left-1/2 w-[54%] -translate-x-1/2" />
			</div>
		</MaterialStage>
	</section>

	<section class="bg-(--band)">
		<div class="{wrap} py-20">
			<h2 class="max-w-[20ch] text-[clamp(36px,5vw,68px)] leading-[1] font-medium tracking-[-0.04em]">The parts you would write twice, written once.</h2>
			<BigCounters items={counters} class="mt-14" />
		</div>
	</section>

	<section class="{wrap} py-24">
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 [&>*]:min-w-0">
			<OxideSlab texture={false} class="rounded-[28px] p-7 sm:p-10 lg:col-span-2">
				<p class="font-mono text-[11px] tracking-[0.14em] uppercase">01 · scaffold</p>
				<h3 class="mt-4 max-w-[16ch] text-[clamp(32px,4vw,56px)] leading-[1] font-medium tracking-[-0.04em]">One command. Six systems wired.</h3>
				<p class="mt-4 max-w-[34rem] text-[18px] leading-[1.45]">Window chrome, theming, routing, settings, auto-update and packaging arrive as plain Rust you can read and change.</p>
				<DotMatrixWord word="build" tone="ink" markTone="ink" padX={1} padY={1} dim={0.1} class="mt-10" />
			</OxideSlab>
			<div class="flex flex-col overflow-hidden rounded-[28px] border">
				<Scene kind="layers" seed="gpui-starter" class="aspect-[4/3] w-full">
					{#snippet fallback()}
						<IsoTileStack clusters={[{ at: [0, 0], size: [5, 3], height: 1, tone: 'steel' }, { at: [0, 0], size: [5, 3], height: 1, lift: 2, tone: 'oxide' }, { at: [0, 0], size: [5, 3], height: 1, lift: 4, tone: 'ink' }]} floor={3} labels={false} class="p-6" />
					{/snippet}
				</Scene>
				<div class="border-t p-7">
					<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">02 · theme</p>
					<h3 class="mt-3 text-[24px] leading-tight font-medium tracking-[-0.02em]">Tokens, stacked.</h3>
					<p class="mt-2 text-[16px] text-foreground/80">Light, dark and system as layers, your accent on top. Every view reads the same tokens.</p>
				</div>
			</div>
			<div class="flex flex-col gap-4 rounded-[28px] border p-4">
				<div class="px-3 pt-3">
					<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">03 · config</p>
					<h3 class="mt-3 text-[24px] leading-tight font-medium tracking-[-0.02em]">One file decides the release.</h3>
				</div>
				<CodeBlock code={starterFiles[1].code} lang="toml" label="starter.toml" class="mt-auto bg-background" />
			</div>
			<div class="grid items-center gap-6 rounded-[28px] border p-4 sm:p-6 lg:col-span-2 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
				<div class="px-3">
					<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">04 · update</p>
					<h3 class="mt-3 text-[clamp(26px,3vw,40px)] leading-[1.05] font-medium tracking-[-0.03em]">Updates that ask once, then get out of the way.</h3>
					<p class="mt-3 text-[16px] text-foreground/80">Signed delta patches download in the background. One prompt to restart, never a modal on launch.</p>
				</div>
				<DesktopWindow screen="update" platform="mac" sidebar={false} />
			</div>
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-2 lg:items-end">
				<h2 class="text-[clamp(44px,7vw,104px)] leading-[0.92] font-medium tracking-[-0.05em]">Build. Test.<br />Package. <span class="font-serif tracking-[-0.02em] text-orange italic">Repeat.</span></h2>
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
