<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import NotebookPen from '@lucide/svelte/icons/notebook-pen';
	import Check from '@lucide/svelte/icons/check';
	import { siApple, siIos, siLinux, siAndroid } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import IconTile from '$brand/components/icon-tile.svelte';
	import Tag from '$brand/components/tag.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import type { TerminalLineData } from '$brand/components/terminal-line.js';
	import RustGridField from '$moves/review/parts/flora/rust-grid-field.svelte';
	import SerifItalicHeadline from '$moves/review/parts/flora/serif-italic-headline.svelte';
	import ForgeAppWindow from '$moves/review/parts/bento/forge-app-window.svelte';
	import MaterialCover from '$moves/review/parts/content/material-cover.svelte';
	import PhoneFrame from '$moves/review/parts/new/phone-frame.svelte';

	type Kind = 'app' | 'terminal' | 'project' | 'post' | 'phone';
	type Card = { kind: Kind; x: number; y: number; w: number; depth: number; aspect: string; zoom: number; label?: string; hide?: boolean; bare?: boolean };

	const cards: Card[] = [
		{ kind: 'app', x: 0, y: 7, w: 380, depth: 0.8, aspect: 'aspect-[16/10]', zoom: 2.2, label: 'fieldnotes · macOS' },
		{ kind: 'terminal', x: 76, y: 5, w: 300, depth: 1.1, aspect: 'aspect-[16/10]', zoom: 1.35, label: 'install · 12s' },
		{ kind: 'project', x: 2, y: 62, w: 240, depth: 1.3, aspect: 'aspect-[5/4]', zoom: 1.15, label: 'Project', hide: true },
		{ kind: 'post', x: 68, y: 64, w: 210, depth: 0.7, aspect: 'aspect-[4/5]', zoom: 1.2, label: 'Journal', hide: true },
		{ kind: 'phone', x: 85, y: 40, w: 140, depth: 1.5, aspect: 'aspect-[300/623]', zoom: 2.15, hide: true, bare: true }
	];

	const install: TerminalLineData[] = [
		['cmd', 'cargo install fieldnotes'],
		['step', 'Resolving', '42 crates'],
		['ok', 'Compiled fieldnotes v1.3.0 in 11.8s'],
		['cmd', 'fieldnotes new standup'],
		['ok', 'Opened standup.md']
	];

	const notes = [
		{ title: 'Standup', time: '9:30', tag: 'team' },
		{ title: 'Release checklist', time: 'Mon', tag: 'v1.3' },
		{ title: 'Cache key notes', time: 'Sun', tag: 'infra' },
		{ title: 'Reading list', time: 'Oct 28', tag: 'later' }
	];

	const platforms = [
		[siApple, 'macOS'],
		[siIos, 'iOS'],
		[siLinux, 'Linux'],
		[siAndroid, 'Android']
	] as const;

	let host: HTMLElement | undefined = $state();
	let mx = $state(0);
	let my = $state(0);

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches || !host) return;
		const el = host;
		let raf = 0;
		let tx = 0;
		let ty = 0;
		const on = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
			ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
		};
		const loop = () => {
			mx += (tx - mx) * 0.06;
			my += (ty - my) * 0.06;
			raf = requestAnimationFrame(loop);
		};
		addEventListener('pointermove', on, { passive: true });
		raf = requestAnimationFrame(loop);
		return () => {
			removeEventListener('pointermove', on);
			cancelAnimationFrame(raf);
		};
	});
</script>

{#snippet content(kind: Kind)}
	{#if kind === 'app'}
		<ForgeAppWindow devtools={false} live={false} class="h-full rounded-none border-0 shadow-none" />
	{:else if kind === 'terminal'}
		<TerminalWindow title="~/notes — zsh" class="h-full rounded-none border-0">
			<TerminalBody>
				{#each install as line, i (i)}<TerminalLine {line} />{/each}
			</TerminalBody>
		</TerminalWindow>
	{:else if kind === 'project'}
		<div class="flex h-full flex-col p-4">
			<div class="flex items-center gap-3">
				<IconTile><NotebookPen class="lucide" /></IconTile>
				<div class="min-w-0">
					<p class="truncate font-medium">fieldnotes</p>
					<p class="truncate font-mono text-[11px] text-muted-foreground">hmziqrs/fieldnotes</p>
				</div>
				<Tag tone="success" marker class="ml-auto">Shipped</Tag>
			</div>
			<p class="mt-3 text-sm leading-snug text-foreground/80">Markdown notes with runnable snippets, synced through git.</p>
			<div class="mt-auto flex items-end justify-between gap-3 border-t border-border pt-3">
				<p><span class="block text-3xl font-medium tracking-tight tabular-nums">2.4k</span><span class="font-mono text-[11px] text-muted-foreground">stars</span></p>
				<p class="text-right font-mono text-[11px] text-muted-foreground">v1.3.0<br />MIT · Rust</p>
			</div>
		</div>
	{:else if kind === 'post'}
		<div class="flex h-full flex-col">
			<MaterialCover seed="five-review-rounds" notch={false} sizes="260px" class="aspect-[16/10] shrink-0 rounded-none" />
			<div class="flex flex-1 flex-col p-4">
				<p class="font-mono text-[11px] text-muted-foreground">Oct 28 · 6 min read</p>
				<p class="mt-1.5 leading-snug font-medium">Why every tool waits for five review rounds</p>
				<p class="mt-2 line-clamp-3 text-sm leading-snug text-foreground/75">Shipping late beats shipping twice. What each round catches, and the one it never does.</p>
			</div>
		</div>
	{:else}
		<PhoneFrame label="fieldnotes on iOS" class="w-full">
			<div class="px-5 pt-3">
				<p class="text-[1.65rem] font-semibold tracking-tight">Today</p>
				<ul class="mt-3 divide-y divide-border">
					{#each notes as n (n.title)}
						<li class="flex items-center gap-3 py-3">
							<span class="grid size-5 place-items-center rounded-sm border border-border text-primary"><Check class="lucide size-3" /></span>
							<span class="min-w-0 flex-1">
								<span class="block truncate text-[0.95rem] font-medium">{n.title}</span>
								<span class="font-mono text-[0.7rem] text-muted-foreground">{n.time} · #{n.tag}</span>
							</span>
						</li>
					{/each}
				</ul>
			</div>
		</PhoneFrame>
	{/if}
{/snippet}

<section bind:this={host} class="relative isolate flex min-h-[calc(100svh-6.5rem)] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 text-center sm:px-8">
	<RustGridField mode="paint" cell={40} radius={1.4} gap={2} fade="radial" class="-z-10" />
	<div aria-hidden="true" inert class="pointer-events-none absolute inset-0 -z-10 text-left">
		{#each cards as c (c.kind)}
			<figure
				class={cn('absolute', c.hide && 'hidden md:block')}
				style:left="{c.x}%"
				style:top="{c.y}%"
				style:width="clamp({Math.round(c.w * 0.55)}px, {(c.w / 14.4).toFixed(2)}vw, {c.w}px)"
				style:transform="translate3d({(-mx * c.depth * 28).toFixed(1)}px, {(-my * c.depth * 22).toFixed(1)}px, 0)"
			>
				<div class={cn('relative overflow-hidden', c.aspect, !c.bare && 'rounded-xl border border-border bg-card shadow-[0_40px_60px_-30px_color-mix(in_oklab,black_75%,transparent)]')}>
					<div class="absolute top-0 left-0 origin-top-left" style:width="{c.zoom * 100}%" style:height="{c.zoom * 100}%" style:transform="scale({(1 / c.zoom).toFixed(4)})">
						{@render content(c.kind)}
					</div>
				</div>
				{#if c.label}
					<figcaption class="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
						<span>{c.label}</span><span class="text-primary">■</span>
					</figcaption>
				{/if}
			</figure>
		{/each}
	</div>

	<div class="relative max-w-[980px] rounded-[2rem] bg-[radial-gradient(closest-side,var(--background)_55%,transparent)] px-2 py-8 sm:px-10">
		<SerifItalicHeadline lead="The" accent="notebook" tail="for code" face="fraunces" size="xl" class="mx-auto max-w-[12ch]" />
		<p class="mx-auto mt-6 max-w-[36ch] text-xl leading-snug text-foreground sm:text-2xl">Write in Markdown, run the snippets, publish the page. One app on your Mac, your phone and the terminal.</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<Button href="#/c/hero/float-real" size="lg"><BrandIcon icon={siApple} data-icon="inline-start" />Download for Mac</Button>
			<Button href="#/c/hero/float-real" size="lg" variant="outline">Read the docs<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		</div>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground">
			<span class="font-mono text-[11px] tracking-[0.14em] uppercase">Runs on</span>
			{#each platforms as [icon, label] (label)}
				<span title={label} class="text-foreground/85"><BrandIcon {icon} /></span>
			{/each}
		</div>
	</div>
</section>
