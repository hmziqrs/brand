<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siGithub } from 'simple-icons';
	import IsoTileStack from '$moves/northflank/iso-tile-stack.svelte';
	import TerminalChip from '$moves/northflank/terminal-chip.svelte';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import FeatureStrip from '$moves/northflank/feature-strip.svelte';
	import DesktopWindow from '$moves/northflank/desktop-window.svelte';
	import LoopDiagram from '$moves/northflank/loop-diagram.svelte';
	import ArtifactMatrix from '$moves/northflank/artifact-matrix.svelte';
	import DotMatrixWord from '$moves/northflank/dot-matrix-word.svelte';
	import DitherFooter from '$moves/northflank/dither-footer.svelte';
	import { footer, heroStack, primitives, starterFiles, strip, CMD } from '../shared';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
</script>

<svelte:head><title>gpui-starter · northflank 1</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<header class="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
		<div class="{wrap} flex h-14 items-center gap-6">
			<a href="#/p/northflank/gpui-starter-1" class="text-[17px] text-foreground"><Wordmark name="gpui-starter" /></a>
			<nav class="hidden items-center gap-6 font-mono text-[12.5px] text-muted-foreground md:flex" aria-label="Main">
				<a href="#/p/northflank/gpui-starter-1" class="hover:text-foreground">Docs</a>
				<a href="#/p/northflank/gpui-starter-1" class="hover:text-foreground">Examples</a>
				<a href="#/p/northflank/gpui-starter-1" class="hover:text-foreground">Changelog</a>
				<a href="https://github.com/zed-industries/zed/tree/main/crates/gpui" class="hover:text-foreground">GPUI</a>
			</nav>
			<div class="ml-auto flex items-center gap-2">
				<a href="https://github.com/hmziqrs/gpui-starter" class="hidden h-9 items-center gap-2 rounded-md border px-3 font-mono text-[12px] text-foreground hover:bg-foreground/5 sm:inline-flex"><BrandIcon icon={siGithub} />GitHub</a>
				<KeyButton label="Get started" key="G" href="#/p/northflank/gpui-starter-1" class="h-9" />
			</div>
		</div>
	</header>

	<section class="{wrap} grid grid-cols-1 items-center gap-10 pt-16 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-24">
		<div>
			<MonoLabel text="Rust · GPUI · desktop starter" />
			<h1 class="mt-6 text-[clamp(48px,7.2vw,92px)] leading-[0.98] font-medium tracking-[-0.035em] text-foreground">
				Native Rust apps, shipped from one command.
			</h1>
			<p class="mt-7 max-w-[34rem] text-[clamp(18px,1.6vw,21px)] leading-[1.5] text-foreground/90">
				Window chrome, theming, routing, settings and auto-update, wired into a GPUI app on day one. Then packaged for macOS, Windows and Linux.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<KeyButton label="Start a project" key="S" href="#/p/northflank/gpui-starter-1" />
				<KeyButton label="Read the docs" key="D" variant="outline" href="#/p/northflank/gpui-starter-1" />
			</div>
			<CommandBox command={CMD} class="mt-6 max-w-[30rem] bg-background" />
		</div>
		<div class="relative min-w-0">
			<TerminalChip prompt="gpui ›" text="new fieldnotes --theme oxide" class="absolute top-0 left-0 z-10" />
			<IsoTileStack clusters={heroStack} class="mx-auto max-w-[620px] pt-8" />
			<div class="mt-2 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
				<span class="flex items-center gap-1.5"><i class="size-2 bg-orange"></i><span class="text-foreground">your app</span></span>
				<span class="flex items-center gap-1.5"><i class="size-2 bg-foreground"></i>starter crate</span>
				<span class="flex items-center gap-1.5"><i class="size-2 bg-teal"></i>update feed</span>
				<span class="flex items-center gap-1.5"><i class="size-2 border border-foreground/40"></i>macOS · Windows · Linux</span>
			</div>
		</div>
	</section>

	<div class="{wrap} pb-24">
		<FeatureStrip items={strip} />
	</div>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<div>
					<MonoLabel index="01" text="What you get" />
					<h2 class="mt-5 text-[clamp(36px,4.6vw,60px)] leading-[1.02] font-medium tracking-[-0.03em]">Everything a desktop app needs, already wired.</h2>
				</div>
				<p class="max-w-[30rem] text-[19px] leading-[1.5] text-foreground/85 lg:justify-self-end">
					GPUI draws fast. The starter adds the parts every real app writes twice: a window that remembers itself, a theme that follows the OS, and a settings screen people can find.
				</p>
			</div>
			<div class="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
				<DesktopWindow screen="palette" />
				<DesktopWindow screen="settings" platform="linux" sidebar={false} />
			</div>
			<div class="mt-5 grid overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-3">
				{#each primitives as p, n (p.title)}
					<div class="border-b p-6 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0">
						<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">0{n + 1} · {p.tag}</p>
						<h3 class="mt-3 text-[19px] font-medium text-foreground">{p.title}</h3>
						<p class="mt-1.5 text-[15px] leading-[1.5] text-foreground/75">{p.line}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-t bg-(--band)">
		<div class="{wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
			<div>
				<MonoLabel index="02" text="The code" />
				<h2 class="mt-5 text-[clamp(36px,4.6vw,60px)] leading-[1.02] font-medium tracking-[-0.03em]">Your app is one struct. The starter is the rest.</h2>
				<ul class="mt-8 space-y-4 text-[17px] text-foreground/90">
					<li class="flex gap-3"><i class="mt-2.5 size-1.5 shrink-0 bg-orange"></i>Routes are an enum. Add a variant, get a sidebar entry and a deep link.</li>
					<li class="flex gap-3"><i class="mt-2.5 size-1.5 shrink-0 bg-orange"></i>Settings are a serde struct, saved per user, live-reloaded.</li>
					<li class="flex gap-3"><i class="mt-2.5 size-1.5 shrink-0 bg-orange"></i><span>Release config lives in one <code class="font-mono text-[15px] text-orange">starter.toml</code>.</span></li>
				</ul>
			</div>
			<CodeBlock files={starterFiles} class="bg-background" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24">
			<div class="text-center">
				<MonoLabel index="03" text="Release loop" class="justify-center" />
				<h2 class="mx-auto mt-5 max-w-[16ch] text-[clamp(36px,4.6vw,60px)] leading-[1.02] font-medium tracking-[-0.03em]">The desktop release cycle, on a loop.</h2>
			</div>
			<LoopDiagram class="mt-16" />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} grid gap-12 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
			<div>
				<MonoLabel index="04" text="Packaging" />
				<h2 class="mt-5 text-[clamp(36px,4.6vw,60px)] leading-[1.02] font-medium tracking-[-0.03em]">Push a tag. Get five installers.</h2>
				<p class="mt-6 max-w-[28rem] text-[18px] leading-[1.5] text-foreground/85">
					The included workflow builds on native runners, signs with your keys, notarizes on macOS and publishes an update feed your app already reads.
				</p>
			</div>
			<ArtifactMatrix />
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} pt-20 pb-24">
			<DotMatrixWord word="ship" padX={20} padY={3} scatter={0.035} dim={0.07} />
			<div class="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end [&>*]:min-w-0">
				<div>
					<h2 class="text-[clamp(44px,6vw,80px)] leading-[0.98] font-medium tracking-[-0.035em]">Build it tonight.<br />Ship it tomorrow.</h2>
					<p class="mt-6 max-w-[30rem] text-[18px] text-foreground/85">MIT licensed. Clone it, rename it, keep every line.</p>
					<div class="mt-8 flex flex-wrap gap-3">
						<KeyButton label="Start a project" key="S" href="#/p/northflank/gpui-starter-1" />
						<KeyButton label="Browse examples" key="E" variant="outline" href="#/p/northflank/gpui-starter-1" />
					</div>
				</div>
				<div class="rounded-xl border bg-card p-2">
					<CommandBox command={CMD} class="max-w-none border-0" />
					<CommandBox command="cd fieldnotes && cargo run" class="max-w-none border-0" />
				</div>
			</div>
		</div>
	</section>

	<DitherFooter {...footer} />
</div>
