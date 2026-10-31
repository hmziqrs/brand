<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import FloatNav from '$moves/flora/float-nav.svelte';
	import SerifItalicHeadline from '$moves/flora/serif-italic-headline.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import AppWindow from '$moves/flora/app-window.svelte';
	import LiftCard from '$moves/flora/lift-card.svelte';
	import NodeFlow from '$moves/flora/node-flow.svelte';
	import SwatchTile from '$moves/flora/swatch-tile.svelte';
	import GlassStage from '$moves/flora/glass-stage.svelte';
	import DitherFooter from '$moves/flora/dither-footer.svelte';

	const here = '#/p/flora/oxlabs-2';
	const links = [
		{ label: 'Work', href: here },
		{ label: 'Services', href: here },
		{ label: 'Process', href: here },
		{ label: 'Open source', href: here }
	];

	const services = [
		{ title: 'Phone apps', body: 'iPhone and Android apps that feel native and keep working in a basement with no signal.', tags: ['Swift', 'Kotlin', 'Flutter', 'React Native'] },
		{ title: 'Desktop apps', body: 'Fast to open, small to download, at home on Mac, Windows and Linux.', tags: ['Rust', 'GPUI', 'Tauri'] },
		{ title: 'Web apps and sites', body: 'Interfaces that still hold up after the second and third feature lands.', tags: ['Svelte', 'React', 'Postgres'] },
		{ title: 'Terminal tools', body: 'Command-line tools and TUIs your team reaches for without being asked.', tags: ['Rust', 'clap', 'ratatui'] }
	];

	const columns = [
		{ title: 'Studio', links: [{ label: 'Work', href: here }, { label: 'Services', href: here }, { label: 'Process', href: here }, { label: 'Contact', href: here }] },
		{ title: 'Open source', links: [{ label: 'gpui-starter', href: here }, { label: 'gpui-query', href: here }, { label: 'tunnel', href: here }, { label: 'vps-harden', href: here }] },
		{ title: 'Family', links: [{ label: 'hmziq.rs', href: 'https://hmziq.rs' }, { label: 'freeoxide', href: 'https://freeoxide.com' }, { label: 'Labs', href: here }, { label: 'Blog', href: here }] },
		{ title: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/hmziqrs' }, { label: 'X', href: here }, { label: 'Bluesky', href: here }, { label: 'LinkedIn', href: here }] }
	];
</script>

<svelte:head><title>oxlabs — apps that wear in</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<FloatNav variant="bar" {links} href={here} />

	<section class="mx-auto max-w-[1320px] px-4 pt-16 sm:px-8 sm:pt-24">
		<div class="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/80 pb-4 font-mono text-xs tracking-[0.14em] text-foreground uppercase">
			<span>oxlabs · a small app studio</span>
			<span>Phones · Desktops · Web · Terminal</span>
		</div>
		<SerifItalicHeadline lead="Apps that" accent="wear in," tail="not out." size="hero" face="newsreader" tone="underline" class="mt-10 sm:mt-14" />
		<div class="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
			<p class="max-w-[38ch] text-2xl leading-snug text-foreground sm:text-[1.75rem]">
				We design and build software for phones, desktops, the web and the terminal, and we look after it once it’s live. Between projects we publish free Rust tools.
			</p>
			<div class="flex flex-wrap gap-3 lg:justify-end">
				<Button href={here} size="lg" class="h-12 px-6 text-base">Start a project</Button>
				<Button href={here} size="lg" variant="outline" class="h-12 px-6 text-base">See the work <ArrowRight class="lucide" /></Button>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pt-16 sm:px-8">
		<div class="relative isolate h-[520px] overflow-hidden rounded-3xl border border-border bg-[var(--band)] sm:h-[600px]">
			<RustGridField cell={30} fade="none" fresh="--oxide-vivid" stain="--teal" class="-z-10" />
			<div class="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
				<div class="absolute top-[12%] left-[6%] w-[44%] max-w-[520px]"><AppWindow kind="desktop" preset="oxide-bloom" title="Ledgerline" /></div>
				<div class="absolute right-[24%] bottom-[-6%] w-[30%] max-w-[360px]"><AppWindow kind="web" preset="sediment" /></div>
				<div class="absolute top-[8%] right-[6%] w-[210px]"><AppWindow kind="phone" preset="copper-sweep" title="Site visits" /></div>
				<div class="absolute bottom-[8%] left-[10%] w-[30%] max-w-[340px]"><AppWindow kind="terminal" /></div>
			</div>
			<div class="pointer-events-none absolute inset-0 flex items-center justify-center p-6 sm:hidden" aria-hidden="true">
				<AppWindow kind="phone" preset="copper-sweep" title="Site visits" class="w-[200px]" />
			</div>
			<p class="absolute bottom-4 left-4 rounded-full bg-background px-3 py-1 font-mono text-[11px] text-foreground sm:right-4 sm:left-auto">Move across the board. It rusts where you’ve been.</p>
		</div>
	</section>

	<section class="mx-auto grid max-w-[1320px] gap-10 px-4 py-28 sm:px-8 lg:grid-cols-[1fr_2fr]">
		<div class="lg:sticky lg:top-24 lg:self-start">
			<p class="font-mono text-xs tracking-[0.14em] text-foreground uppercase">01 — Services</p>
			<SerifItalicHeadline as="h2" lead="What we" accent="make." size="lg" face="newsreader" class="mt-4" />
			<p class="mt-5 max-w-[30ch] text-xl leading-snug text-foreground">Four surfaces, one team. Nothing gets lost between handoffs because there aren’t any.</p>
		</div>
		<div class="border-b border-foreground/80">
			{#each services as s, i (s.title)}
				<LiftCard variant="editorial" title={s.title} body={s.body} tags={s.tags} index={`0${i + 1}`} href={here} />
			{/each}
		</div>
	</section>

	<section class="bg-primary text-primary-foreground">
		<div class="mx-auto grid max-w-[1320px] gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
			<p class="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
				The engineer on your first call is the one <em class="font-newsreader font-[380] italic">writing</em> your code.
			</p>
			<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[color-mix(in_oklab,currentColor_30%,transparent)]">
				{#each [['Where', 'Remote, written updates'], ['How', 'Fixed scope or retainer'], ['Cadence', 'Demo every Friday'], ['After', 'We stay on call']] as [k, v] (k)}
					<div class="bg-primary p-5">
						<dt class="font-mono text-[11px] tracking-wider uppercase">{k}</dt>
						<dd class="mt-1.5 text-lg leading-snug">{v}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 py-28 sm:px-8">
		<div class="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
			<div>
				<p class="font-mono text-xs tracking-[0.14em] text-foreground uppercase">02 — Process</p>
				<SerifItalicHeadline as="h2" lead="How a project" accent="runs." size="lg" face="newsreader" class="mt-4" />
			</div>
			<p class="max-w-[40ch] text-xl leading-snug text-foreground lg:justify-self-end">Brief, design, build, ship. Each step ends with something you can hold: a page, a clickable prototype, a build on your phone, a signed release.</p>
		</div>
		<NodeFlow layout="line" preset="copper-sweep" pulse={false} />
	</section>

	<section class="bg-[var(--band)]">
		<div class="mx-auto max-w-[1320px] px-4 py-28 sm:px-8">
			<div class="mb-12 flex flex-wrap items-end justify-between gap-6">
				<div>
					<p class="font-mono text-xs tracking-[0.14em] text-foreground uppercase">03 — Open source</p>
					<SerifItalicHeadline as="h2" lead="Tools we" accent="give away." size="lg" face="newsreader" class="mt-4" />
				</div>
				<p class="max-w-[34ch] text-xl leading-snug text-foreground">Published under freeoxide. Built, tested and reviewed like client work.</p>
			</div>
			<div class="grid gap-5 md:grid-cols-2">
				<SwatchTile frame="mat" preset="white-sweep" title="gpui-starter" kind="Desktop app" body="A desktop app with windows, themes, settings and updates already built." aspect="aspect-[16/10]" href={here}>
					{#snippet art()}<AppWindow kind="desktop" preset="oxide-bloom" title="gpui-starter" class="max-w-[400px]" />{/snippet}
				</SwatchTile>
				<SwatchTile frame="mat" preset="creased-paper" title="tunnel" kind="CLI" body="Share a folder at a public web address in a few seconds. No account needed." aspect="aspect-[16/10]" href={here}>
					{#snippet art()}<AppWindow kind="terminal" class="max-w-[380px]" />{/snippet}
				</SwatchTile>
				<SwatchTile frame="mat" preset="terrazzo" title="gpui-query" kind="Library" body="Load data in desktop apps. Fetching, caching and retries handled." aspect="aspect-[16/9]" href={here} />
				<SwatchTile frame="mat" preset="fibrous-paper" title="wake" kind="CLI" body="Keeps your computer awake for as long as you ask, and tells you when it can’t." aspect="aspect-[16/9]" href={here} />
			</div>
		</div>
	</section>

	<GlassStage preset="sediment" glass="frost" align="center">
		<p class="font-mono text-xs tracking-[0.16em] text-foreground uppercase">Working from day one</p>
		<SerifItalicHeadline as="h2" lead="The boring parts come" accent="first." size="md" face="newsreader" class="mt-4" />
		<p class="mt-5 text-xl leading-snug text-foreground">Every project starts with automated checks already passing and a deploy command anyone on your team can run. Then we make it beautiful.</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<Button href={here} size="lg" class="h-12 px-6 text-base">Start a project</Button>
		</div>
	</GlassStage>

	<DitherFooter preset="lava-fissures" {columns} line="Apps for phones, desktops, the web and the terminal. Built to wear in.">
		{#snippet cta()}
			<SerifItalicHeadline as="h2" lead="Tell us what you’re" accent="building." size="md" face="newsreader" />
			<div class="flex flex-wrap gap-3">
				<Button href={here} size="lg" class="h-12 px-6 text-base">Start a project</Button>
				<Button href={here} size="lg" variant="outline" class="h-12 px-6 text-base">See past work</Button>
			</div>
		{/snippet}
	</DitherFooter>
</div>
