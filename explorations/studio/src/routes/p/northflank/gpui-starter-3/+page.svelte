<script lang="ts">
	import Wordmark from '$brand/components/wordmark.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import TypingTerminal from '$brand/blocks/content/typing-terminal.svelte';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';
	import CrtPanel from '$moves/northflank/crt-panel.svelte';
	import TerminalChip from '$moves/northflank/terminal-chip.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import BootLog from '$moves/northflank/boot-log.svelte';
	import DesktopWindow from '$moves/northflank/desktop-window.svelte';
	import DotMatrixWord from '$moves/northflank/dot-matrix-word.svelte';
	import LoopDiagram from '$moves/northflank/loop-diagram.svelte';
	import ArtifactMatrix from '$moves/northflank/artifact-matrix.svelte';
	import DitherFooter from '$moves/northflank/dither-footer.svelte';
	import { footer, CMD } from '../shared';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
	const self = '#/p/northflank/gpui-starter-3';

	const session: TerminalLineData[] = [
		['cmd', 'cargo generate gh:hmziqrs/gpui-starter --name fieldnotes'],
		['step', 'Project name', 'fieldnotes'],
		['step', 'Bundle id', 'app.fieldnotes'],
		['ok', 'Wrote 46 files: window, theme, router, settings, updater'],
		['cmd', 'cd fieldnotes && cargo run'],
		['ok', 'Fieldnotes is running · 120 fps · 38 MB']
	];

	const boot = [
		{ name: 'window chrome', detail: 'native title bars, restored size + position' },
		{ name: 'theme', detail: 'light / dark / system, accent tokens' },
		{ name: 'router', detail: 'enum screens, history, deep links' },
		{ name: 'settings', detail: 'typed struct, saved per platform' },
		{ name: 'command palette', detail: 'every route and action, cmd-k', status: 'new' as const },
		{ name: 'auto-update', detail: 'signed feed, background delta' },
		{ name: 'packaging', detail: 'dmg · msi · AppImage · deb' },
		{ name: 'crash reports', detail: 'off until the user opts in', status: 'opt' as const }
	];
</script>

<svelte:head><title>gpui-starter · northflank 3</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<header class="{wrap} flex h-16 items-center gap-8">
		<a href={self} class="text-[17px] text-foreground"><Wordmark name="gpui-starter" /></a>
		<nav class="hidden items-center gap-7 font-pixel text-[11px] tracking-[0.06em] text-muted-foreground uppercase md:flex" aria-label="Main">
			<a href={self} class="hover:text-foreground">Manual</a>
			<a href={self} class="hover:text-foreground">Examples</a>
			<a href={self} class="hover:text-foreground">Releases</a>
		</nav>
		<span class="ml-auto hidden font-crt text-[20px] text-muted-foreground sm:inline">tty1 · 80×24</span>
	</header>

	<section class="{wrap} pt-4 pb-20">
		<CrtPanel class="min-h-[min(82vh,820px)]">
			<div class="grid h-full grid-cols-1 gap-10 p-5 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:p-14 [&>*]:min-w-0">
				<div>
					<p class="font-crt text-[20px] text-muted-foreground">GPUI-STARTER 0.9.0 · READY<span class="text-orange"> ▮</span></p>
					<h1 class="mt-6 font-crt text-[clamp(60px,8.9vw,134px)] leading-[0.84] tracking-[-0.01em] text-foreground">
						Desktop apps<br />from one<br /><span class="text-orange">command_</span>
					</h1>
					<p class="mt-8 max-w-[32rem] text-[clamp(18px,1.6vw,21px)] leading-[1.5] text-foreground">
						A GPUI starter with window chrome, theming, routing, settings and auto-update wired in, packaged for macOS, Windows and Linux.
					</p>
					<div class="mt-8 flex flex-wrap gap-3">
						<KeyButton label="Run it" key="R" href={self} />
						<KeyButton label="Read the manual" key="M" variant="outline" href={self} />
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<TerminalChip prompt="~/code ›" text="cargo generate gpui-starter" class="self-start" />
					<TypingTerminal lines={session} title="fieldnotes — zsh" rows={8} class="max-w-none" />
					<p class="font-pixel text-[10px] tracking-[0.08em] text-muted-foreground uppercase">fig.0 · the whole setup</p>
				</div>
			</div>
		</CrtPanel>
	</section>

	<section class="{wrap} grid grid-cols-1 gap-12 py-20 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] [&>*]:min-w-0">
		<div>
			<MonoLabel face="pixel" index="01" text="Boot sequence" />
			<h2 class="mt-6 font-crt text-[clamp(48px,6vw,88px)] leading-[0.88]">Everything a desktop app needs, checked.</h2>
			<p class="mt-6 max-w-[26rem] text-[18px] leading-[1.5] text-foreground/90">Eight systems start with your first <code class="font-mono text-[16px] text-orange">cargo run</code>. Each one is plain Rust in your repo.</p>
		</div>
		<BootLog rows={boot} class="lg:pt-4" />
	</section>

	<section class="{wrap} pb-24">
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] [&>*]:min-w-0">
			<figure>
				<DesktopWindow screen="palette" platform="mac" />
				<figcaption class="mt-3 font-pixel text-[10px] tracking-[0.08em] text-muted-foreground uppercase">fig.1 · command palette, macOS chrome</figcaption>
			</figure>
			<figure>
				<DesktopWindow screen="settings" platform="windows" sidebar={false} />
				<figcaption class="mt-3 font-pixel text-[10px] tracking-[0.08em] text-muted-foreground uppercase">fig.2 · settings, Windows chrome</figcaption>
			</figure>
		</div>
	</section>

	<section class="border-y bg-(--band)">
		<div class="{wrap} py-16">
			<DotMatrixWord word="build" shape="square" padX={6} padY={2} scatter={0.05} dim={0.08} />
		</div>
	</section>

	<section class="{wrap} py-24">
		<CrtPanel flicker={false}>
			<div class="p-5 sm:p-12">
				<div class="flex flex-wrap items-end justify-between gap-6">
					<div>
						<MonoLabel face="pixel" index="02" text="Release loop" />
						<h2 class="mt-5 font-crt text-[clamp(44px,5.6vw,80px)] leading-[0.9]">build → test → package → update</h2>
					</div>
					<TerminalChip prompt="$" text="git tag v0.9.0 && git push --tags" type={false} />
				</div>
				<LoopDiagram class="mt-14" labelClass="font-pixel" counterClass="font-crt text-[clamp(56px,8vw,112px)]" />
			</div>
		</CrtPanel>
	</section>

	<section class="{wrap} grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] [&>*]:min-w-0">
		<div>
			<MonoLabel face="pixel" index="03" text="Output" />
			<h2 class="mt-6 font-crt text-[clamp(48px,6vw,88px)] leading-[0.88]">One tag. Five installers.</h2>
			<p class="mt-6 max-w-[26rem] text-[18px] leading-[1.5] text-foreground/90">Built on native runners, signed with your keys, published to the feed your app already checks.</p>
		</div>
		<ArtifactMatrix labelClass="font-pixel" />
	</section>

	<section class="{wrap} pb-28">
		<CrtPanel flicker={false} class="text-center">
			<div class="flex flex-col items-center px-5 py-16 sm:py-24">
				<p class="font-pixel text-[11px] tracking-[0.1em] text-muted-foreground uppercase">press any key to continue</p>
				<h2 class="mt-6 font-crt text-[clamp(56px,9vw,136px)] leading-[0.85]">Ship it tonight<span class="caret text-orange motion-reduce:animate-none">_</span></h2>
				<CommandBox command={CMD} class="mt-10 w-full max-w-[34rem] bg-background text-left" />
				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<KeyButton label="Run it" key="R" href={self} />
					<KeyButton label="Browse examples" key="E" variant="outline" href={self} />
				</div>
			</div>
		</CrtPanel>
	</section>

	<DitherFooter {...footer} mark="dot" shape="round" labelClass="font-pixel" />
</div>

<style>
	.caret {
		animation: blink 1.1s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
