<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Button } from '$brand/ui/button/index.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import Pause from '@lucide/svelte/icons/pause';
	import Play from '@lucide/svelte/icons/play';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import FloatNav from '$moves/flora/float-nav.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import SerifItalicHeadline from '$moves/flora/serif-italic-headline.svelte';
	import WordStack from '$moves/flora/word-stack.svelte';
	import AppWindow from '$moves/flora/app-window.svelte';
	import NodeFlow from '$moves/flora/node-flow.svelte';
	import SwatchTile from '$moves/flora/swatch-tile.svelte';
	import GlassStage from '$moves/flora/glass-stage.svelte';
	import DitherFooter from '$moves/flora/dither-footer.svelte';

	const here = '#/p/flora/oxlabs-3';
	const links = [
		{ label: 'Surfaces', href: here },
		{ label: 'Process', href: here },
		{ label: 'Tools', href: here },
		{ label: 'Studio', href: here }
	];

	let playing = $state(true);

	const surfaces = [
		{ word: 'Phones', body: 'iPhone and Android apps that feel native and keep working with no signal.', kind: 'phone', preset: 'sediment' },
		{ word: 'Desktops', body: 'Mac, Windows and Linux apps that open fast and download small.', kind: 'desktop', preset: 'copper-sweep' },
		{ word: 'The web', body: 'Sites and web apps that still hold up after the third feature.', kind: 'web', preset: 'ink-diffusion' },
		{ word: 'Terminals', body: 'Command-line tools your team keeps using after the first week.', kind: 'terminal', preset: 'oxide-bloom' }
	] as const;

	const stack = ['Swift', 'Kotlin', 'Rust', 'GPUI', 'Tauri', 'Svelte', 'React', 'Postgres', 'Flutter', 'ratatui'];

	const columns = [
		{ title: 'Studio', links: [{ label: 'Surfaces', href: here }, { label: 'Process', href: here }, { label: 'Studio', href: here }, { label: 'Start a project', href: here }] },
		{ title: 'Open source', links: [{ label: 'gpui-starter', href: here }, { label: 'gpui-query', href: here }, { label: 'tunnel', href: here }, { label: 'wake', href: here }] },
		{ title: 'Family', links: [{ label: 'hmziq.rs', href: 'https://hmziq.rs' }, { label: 'freeoxide', href: 'https://freeoxide.com' }, { label: 'claude-multi', href: here }, { label: 'Blog', href: here }] },
		{ title: 'Elsewhere', links: [{ label: 'GitHub', href: 'https://github.com/hmziqrs' }, { label: 'X', href: here }, { label: 'Bluesky', href: here }, { label: 'LinkedIn', href: here }] }
	];
</script>

<svelte:head><title>oxlabs — from brief to binary</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<FloatNav {links} href={here} />

	<section class="relative isolate -mt-[60px] flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-10">
		<ShaderMaterial preset="oxide-bloom" rendering="live" animated={playing} controls={false} loading="eager" fetchpriority="high" class="absolute inset-0 -z-20 h-full w-full" />
		<RustGridField mode="reveal" cell={56} veil={0.8} fade="none" gap={0} class="-z-10" />

		<div class="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
			<p class="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-mono text-xs tracking-wide text-foreground uppercase">
				<span class="size-2 bg-primary motion-safe:animate-pulse"></span>oxlabs · app studio · booking now
			</p>
			<SerifItalicHeadline lead="From brief to" accent="binary." size="hero" tone="oxide" class="mt-6 max-w-[11ch] [text-shadow:0_2px_40px_var(--background)]" />
			<div class="mt-10 flex flex-wrap items-end justify-between gap-6">
				<Glass variant="smoke" class="max-w-[540px] p-6 sm:p-7">
					<p class="text-xl leading-snug text-foreground sm:text-2xl">We design and build apps for phones, desktops, the web and the terminal, then ship them signed. Between projects we publish free Rust tools.</p>
					<div class="mt-6 flex flex-wrap gap-3">
						<Button href={here} size="lg" class="h-12 rounded-full px-6 text-base">Start a project</Button>
						<Button href={here} size="lg" variant="outline" class="h-12 rounded-full px-6 text-base">How we work <ArrowRight class="lucide" /></Button>
					</div>
				</Glass>
				<button
					type="button"
					onclick={() => (playing = !playing)}
					aria-pressed={!playing}
					class="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm text-foreground hover:text-primary"
				>
					{#if playing}<Pause class="lucide size-4" />Pause the material{:else}<Play class="lucide size-4" />Play the material{/if}
				</button>
			</div>
		</div>
	</section>

	<div class="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground" aria-hidden="true">
		<div class="marquee flex w-max gap-10 font-mono text-sm tracking-[0.14em] uppercase">
			{#each [0, 1] as copy (copy)}
				{#each stack as s (s + copy)}
					<span class="flex items-center gap-10">{s}<span class="size-2 bg-current"></span></span>
				{/each}
			{/each}
		</div>
	</div>

	<section class="mx-auto max-w-[1320px] px-4 py-28 sm:px-8">
		<p class="mb-8 font-mono text-xs tracking-[0.16em] text-primary uppercase">Four surfaces, one team</p>
		<WordStack items={[...surfaces]}>
			{#snippet aside(active)}
				{@const s = surfaces[active]}
				<div class="relative grid h-[400px] place-items-center overflow-hidden rounded-3xl border border-border sm:h-[440px]">
					<ShaderMaterial preset="lava-fissures" rendering="image" loading="eager" controls={false} sizes="600px" class="absolute inset-0 h-full w-full" />
					{#key active}
						<div in:fly={{ y: 40, duration: 500 }} class="relative w-full px-8">
							<div class="mx-auto" class:max-w-[220px]={s.kind === 'phone'} class:max-w-[420px]={s.kind !== 'phone'}>
								<AppWindow kind={s.kind} preset={s.preset} />
							</div>
						</div>
					{/key}
				</div>
			{/snippet}
		</WordStack>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-28 sm:px-8">
		<div class="mb-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
			<SerifItalicHeadline as="h2" lead="Four nodes," accent="always" tail="in this order." size="lg" tone="oxide" />
			<p class="max-w-[38ch] text-xl leading-snug text-foreground">Hover a node to see what it hands to the next one. Every step ends with something you can hold.</p>
		</div>
		<NodeFlow preset="folded-foil" />
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-28 sm:px-8">
		<div class="mb-12 flex flex-wrap items-end justify-between gap-6">
			<SerifItalicHeadline as="h2" lead="Rust tools, free" accent="forever." size="lg" />
			<p class="max-w-[34ch] text-xl leading-snug text-foreground">Built between client projects and published under freeoxide.</p>
		</div>
		<div class="grid gap-4 md:grid-cols-4">
			<SwatchTile frame="bare" preset="hammered-copper" title="gpui-starter" kind="Desktop app" body="A desktop app with windows, themes, settings and updates already built." aspect="aspect-[4/3] md:aspect-auto md:h-[520px]" class="md:col-span-2 md:row-span-2" href={here}>
				{#snippet art()}<AppWindow kind="desktop" preset="oxide-bloom" title="gpui-starter" class="max-w-[420px]" />{/snippet}
			</SwatchTile>
			<div class="flex flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground md:col-span-2">
				<p class="font-mono text-xs tracking-[0.16em] uppercase">freeoxide</p>
				<div class="mt-10 flex items-end justify-between gap-6">
					<p class="text-[clamp(5rem,12vw,9rem)] leading-[0.8] font-medium tracking-[-0.06em]">5</p>
					<p class="max-w-[24ch] text-xl leading-snug">open-source tools shipped or in progress, each tested like client work.</p>
				</div>
			</div>
			<SwatchTile frame="bare" preset="caustic-glass" title="tunnel" kind="CLI" body="Share a folder at a public address in seconds." href={here} />
			<SwatchTile frame="bare" preset="mineral-fault" title="gpui-query" kind="Library" body="Fetching, caching and retries for desktop apps." href={here} />
		</div>
	</section>

	<GlassStage preset="etched-silk" glass="liquid" align="right">
		<p class="font-mono text-xs tracking-[0.16em] text-primary uppercase">Working from day one</p>
		<SerifItalicHeadline as="h2" lead="Boring in production," accent="loud" tail="on screen." size="md" class="mt-4" />
		<p class="mt-5 text-xl leading-snug text-foreground">Automated checks pass before the first feature, and anyone on your team can deploy. That’s what lets the interface take risks.</p>
		<ul class="mt-7 space-y-3 text-lg text-foreground">
			{#each ['A demo every Friday', 'A deploy every week', 'Written updates, no status meetings'] as l (l)}
				<li class="flex items-center gap-3"><span class="size-2.5 bg-primary"></span>{l}</li>
			{/each}
		</ul>
	</GlassStage>

	<DitherFooter preset="folded-foil" giant="hmziq" animate {columns} line="An app studio by hmziq. Phones, desktops, the web and the terminal.">
		{#snippet cta()}
			<SerifItalicHeadline as="h2" lead="Bring the" accent="brief." tail="We’ll bring the binary." size="md" />
			<Button href={here} size="lg" class="h-12 rounded-full px-6 text-base">Start a project</Button>
		{/snippet}
	</DitherFooter>
</div>

<style>
	.marquee {
		animation: marquee 40s linear infinite;
	}
	.marquee:hover {
		animation-play-state: paused;
	}
	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			animation: none;
		}
	}
</style>
