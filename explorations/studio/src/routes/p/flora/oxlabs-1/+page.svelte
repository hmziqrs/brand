<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siApple, siAndroid, siLinux, siRust } from 'simple-icons';
	import Smartphone from '@lucide/svelte/icons/smartphone';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Globe from '@lucide/svelte/icons/globe';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import FloatNav from '$moves/flora/float-nav.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import SerifItalicHeadline from '$moves/flora/serif-italic-headline.svelte';
	import AppWindow from '$moves/flora/app-window.svelte';
	import LiftCard from '$moves/flora/lift-card.svelte';
	import NodeFlow from '$moves/flora/node-flow.svelte';
	import SwatchTile from '$moves/flora/swatch-tile.svelte';
	import GlassStage from '$moves/flora/glass-stage.svelte';
	import DitherFooter from '$moves/flora/dither-footer.svelte';

	const here = '#/p/flora/oxlabs-1';
	const links = [
		{ label: 'Services', href: here },
		{ label: 'Process', href: here },
		{ label: 'Open source', href: here },
		{ label: 'About', href: here }
	];

	const services = [
		{ icon: Smartphone, title: 'Phones', body: 'Apps for iPhone and Android that feel native, from one codebase when it fits and two when it doesn’t.', tags: ['Swift', 'Kotlin', 'Flutter'] },
		{ icon: Monitor, title: 'Desktops', body: 'Apps at home on Mac, Windows and Linux. Quick to open, small to download.', tags: ['Rust', 'GPUI', 'Tauri'] },
		{ icon: Globe, title: 'The web', body: 'Sites and web apps that still hold up after the second and third feature.', tags: ['Svelte', 'React', 'Postgres'] },
		{ icon: SquareTerminal, title: 'Terminals', body: 'Command-line tools your team keeps using after the first week.', tags: ['Rust', 'clap', 'ratatui'] }
	];

	const columns = [
		{ title: 'Studio', links: [{ label: 'Services', href: here }, { label: 'Process', href: here }, { label: 'About', href: here }, { label: 'Start a project', href: here }] },
		{ title: 'Open source', links: [{ label: 'gpui-starter', href: here }, { label: 'gpui-query', href: here }, { label: 'tunnel', href: here }, { label: 'wake', href: here }] },
		{ title: 'Family', links: [{ label: 'hmziq.rs', href: 'https://hmziq.rs' }, { label: 'freeoxide', href: 'https://freeoxide.com' }, { label: 'claude-multi', href: here }, { label: 'Blog', href: here }] },
		{ title: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/hmziqrs' }, { label: 'X', href: here }, { label: 'Bluesky', href: here }, { label: 'LinkedIn', href: here }] }
	];
</script>

<svelte:head><title>oxlabs — software that ages well</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<FloatNav {links} href={here} />

	<section class="relative isolate -mt-[60px] flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20">
		<RustGridField cell={40} fade="radial" class="-z-10" />

		<div class="pointer-events-none absolute inset-0 -z-10 hidden xl:block" aria-hidden="true">
			<div class="absolute top-[16%] left-[3%] w-[300px]">
				<p class="mb-2 font-mono text-[11px] text-foreground">Web · booking flow</p>
				<AppWindow kind="web" preset="ink-diffusion" />
			</div>
			<div class="absolute bottom-[8%] left-[7%] w-[210px] -rotate-2">
				<p class="mb-2 font-mono text-[11px] text-foreground">Phone · offline first</p>
				<AppWindow kind="phone" preset="sediment" />
			</div>
			<div class="absolute top-[13%] right-[3%] w-[340px]">
				<p class="mb-2 font-mono text-[11px] text-foreground">Desktop · Mac, Windows, Linux</p>
				<AppWindow kind="desktop" preset="copper-sweep" />
			</div>
			<div class="absolute right-[6%] bottom-[10%] w-[300px] rotate-1">
				<p class="mb-2 font-mono text-[11px] text-foreground">Terminal · open source</p>
				<AppWindow kind="terminal" />
			</div>
		</div>

		<div class="relative mx-auto flex w-full max-w-[880px] flex-col items-center px-4 text-center">
			<div aria-hidden="true" class="absolute inset-[-10%_-6%] -z-10 bg-[radial-gradient(closest-side,var(--background)_55%,transparent)]"></div>
			<p class="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground">
				<span class="size-2 rounded-full bg-green"></span>Taking on two new projects this season
			</p>
			<SerifItalicHeadline lead="Software that" accent="ages" tail="well." size="xl" class="mt-7" />
			<p class="mt-7 max-w-[34ch] text-xl leading-snug text-foreground sm:text-2xl">
				oxlabs designs and builds apps for phones, desktops, the web and the terminal. The engineer on your first call writes your code.
			</p>
			<div class="mt-9 flex flex-wrap justify-center gap-3">
				<Button href={here} size="lg" class="h-12 rounded-full px-6 text-base">Start a project</Button>
				<Button href={here} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">See how we work <ArrowRight class="lucide" /></Button>
			</div>
			<div class="mt-10 flex items-center gap-4 text-sm text-foreground">
				<span>Ships to</span>
				{#each [[siApple, 'Apple'], [siAndroid, 'Android'], [siLinux, 'Linux'], [siRust, 'Rust']] as const as [icon, label] (label)}
					<BrandIcon {icon} {label} class="size-4" />
				{/each}
			</div>
			<div class="mt-14 grid w-full max-w-[560px] grid-cols-[1fr_auto] items-end gap-4 xl:hidden" aria-hidden="true">
				<AppWindow kind="desktop" preset="copper-sweep" class="text-left" />
				<AppWindow kind="phone" preset="sediment" class="w-[130px] text-left [&_ul]:hidden" />
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 py-28 sm:px-8">
		<div class="flex flex-wrap items-end justify-between gap-6">
			<SerifItalicHeadline as="h2" lead="Four surfaces," accent="one" tail="studio." size="lg" />
			<p class="max-w-[36ch] text-xl leading-snug text-foreground">We build the whole thing end to end, so nothing gets lost between teams.</p>
		</div>
		<div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as s, i (s.title)}
				<LiftCard icon={s.icon} title={s.title} body={s.body} tags={s.tags} index={`0${i + 1}`} href={here} />
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-28 sm:px-8">
		<div class="mb-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
			<SerifItalicHeadline as="h2" lead="From brief to" accent="binary." size="lg" />
			<p class="max-w-[38ch] text-xl leading-snug text-foreground">Four nodes, always in this order. You can see where your project sits on any day, because it’s written down and it’s live.</p>
		</div>
		<NodeFlow />
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-28 sm:px-8">
		<div class="mb-12 flex flex-wrap items-end justify-between gap-6">
			<SerifItalicHeadline as="h2" lead="Our own tools, out in the" accent="open." size="lg" class="max-w-[16ch]" />
			<p class="max-w-[34ch] text-xl leading-snug text-foreground">Between client work we publish Rust tools under freeoxide. Free, tested, and kept up.</p>
		</div>
		<div class="grid gap-4 md:grid-cols-6">
			<SwatchTile preset="folded-foil" title="gpui-starter" kind="Desktop app" body="Start a desktop app with windows, themes, settings and updates already built." index="Gs" aspect="aspect-[16/10]" class="md:col-span-3" href={here}>
				{#snippet art()}<AppWindow kind="desktop" preset="oxide-bloom" title="gpui-starter" class="max-w-[380px]" />{/snippet}
			</SwatchTile>
			<SwatchTile preset="caustic-glass" title="tunnel" kind="CLI" body="Share a folder at a public web address in a few seconds. No account needed." index="Tn" aspect="aspect-[16/10]" class="md:col-span-3" href={here}>
				{#snippet art()}<AppWindow kind="terminal" class="max-w-[360px]" />{/snippet}
			</SwatchTile>
			<SwatchTile preset="mineral-fault" title="gpui-query" kind="Library" body="Load data in desktop apps; fetching, caching and retries handled." index="Gq" class="md:col-span-2" href={here} />
			<SwatchTile preset="hammered-silver" title="wake" kind="CLI" body="Keeps your computer awake as long as you ask, and says so when it can’t." index="Wk" class="md:col-span-2" href={here} />
			<SwatchTile preset="lava-fissures" title="vps-harden" kind="In progress" body="Lock down a new server with one command you can read first." index="Vh" class="md:col-span-2" href={here} />
		</div>
	</section>

	<GlassStage preset="hammered-copper" glass="smoke">
		<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">Working from day one</p>
		<SerifItalicHeadline as="h2" lead="Boring in" accent="production," tail="on purpose." size="md" class="mt-4" />
		<p class="mt-5 text-xl leading-snug text-foreground">Every project starts with automated checks already passing and a deploy command anyone on your team can run. The boring parts come first.</p>
		<dl class="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
			{#each [['Where', 'Remote, with written updates'], ['How', 'Fixed scope or a monthly retainer'], ['Who', 'The engineer you meet writes the code'], ['When', 'Demo every Friday, deploy every week']] as [k, v] (k)}
				<div class="bg-background/80 p-4">
					<dt class="font-mono text-[11px] tracking-wider text-primary uppercase">{k}</dt>
					<dd class="mt-1 text-[17px] leading-snug text-foreground">{v}</dd>
				</div>
			{/each}
		</dl>
	</GlassStage>

	<DitherFooter face="serif" preset="mica-flakes" {columns} line="A small studio for apps on phones, desktops, the web and the terminal.">
		{#snippet cta()}
			<SerifItalicHeadline as="h2" lead="Got an app" accent="in mind?" size="md" />
			<div class="flex flex-wrap gap-3">
				<Button href={here} size="lg" class="h-12 rounded-full px-6 text-base">Start a project</Button>
				<Button href="https://github.com/hmziqrs" size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">Read our code</Button>
			</div>
		{/snippet}
	</DitherFooter>
</div>
