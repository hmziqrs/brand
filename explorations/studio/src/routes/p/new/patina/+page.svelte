<script lang="ts">
	import { siApple, siGoogleplay } from 'simple-icons';
	import Plus from '@lucide/svelte/icons/plus';
	import Camera from '@lucide/svelte/icons/camera';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import Moon from '@lucide/svelte/icons/moon';
	import Timer from '@lucide/svelte/icons/timer';
	import Lock from '@lucide/svelte/icons/lock';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import Image from '@lucide/svelte/icons/image';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ProductScope from '$moves/new/product-scope.svelte';
	import ProductLockup from '$moves/new/product-lockup.svelte';
	import MaterialWord from '$moves/new/material-word.svelte';
	import InlineRing from '$moves/new/inline-ring.svelte';
	import PhoneFrame from '$moves/new/phone-frame.svelte';
	import AccentSlab from '$moves/new/accent-slab.svelte';
	import FamilyFooter from '$moves/new/family-footer.svelte';

	const projects = [
		{ name: "Restore the '72 Vespa", meta: 'Year 3 · 412 sessions', last: 'Today' },
		{ name: 'Learn the cello', meta: 'Year 2 · 318 sessions', last: 'Yesterday' },
		{ name: 'Novel, draft two', meta: 'Month 9 · 141 sessions', last: '3 days ago' },
		{ name: 'South garden bed', meta: 'Resting since June', last: 'Resting' }
	];

	const months = [3, 5, 2, 8, 9, 6, 4, 0, 0, 7, 10, 12, 9, 11];

	const growth = [
		{ when: 'Week one', rings: 3, seed: 'cello-w1', copy: 'Three short sessions. A thin ring, barely there. That is fine — every long project looks like this at the start.' },
		{ when: 'Month four', rings: 8, seed: 'cello-m4', copy: 'The rings start to crowd. Gaps show the weeks you were away, and they stay — honest, not punished.' },
		{ when: 'Year two', rings: 15, seed: 'cello-y2', copy: 'Dense, uneven, yours. The fingerprint of a thing you kept coming back to, drawn from nothing but your own logs.' }
	];

	const features = [
		{ icon: Timer, title: 'Ten-second logs', copy: 'A duration, one line, maybe a photo. Logging is faster than unlocking your notes app.' },
		{ icon: Image, title: 'Photos that age with it', copy: 'Every photo is pinned to its ring, so scrolling back through a project is scrolling back through time.' },
		{ icon: Lock, title: 'On your phone, not ours', copy: 'Everything stays on device. Backups go to your own iCloud or Google Drive. No account to make.' },
		{ icon: LayoutGrid, title: 'A widget that only shows up', copy: 'Your most-touched project, its ring, and the date you last showed up. Nothing to tap, nothing to clear.' }
	];
</script>

<svelte:head><title>patina — a hmziq app for long projects</title></svelte:head>

<ProductScope hue="teal">
	<ProductLockup
		name="patina"
		kind="iOS & Android"
		links={[
			{ label: 'How rings grow', href: '#/p/new/patina' },
			{ label: 'Privacy', href: '#/p/new/patina' },
			{ label: 'Widgets', href: '#/p/new/patina' }
		]}
		cta={{ label: 'Get the app', href: '#/p/new/patina' }}
	/>

	<section class="relative mx-auto max-w-[1320px] px-4 pt-16 sm:px-8 lg:pt-24">
		<p class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary"><span class="inline-block size-2 bg-primary"></span>For projects measured in years</p>
		<h1 class="mt-6 text-[clamp(3.4rem,10.5vw,10rem)] leading-[0.86] font-medium tracking-[-0.055em]">
			Long projects<br />earn a <MaterialWord preset="embossed-labyrinth" class="font-fraunces font-normal italic tracking-[-0.03em]">patina.</MaterialWord>
		</h1>
		<div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
			<p class="max-w-2xl text-xl leading-relaxed text-foreground sm:text-[1.45rem]">
				Ten minutes on the boat you are restoring. An hour of cello. A page of the novel. Patina layers every session into a ring, so the project you keep returning to finally looks like it.
			</p>
			<div class="flex flex-wrap gap-3">
				<a href="#/p/new/patina" class="inline-flex h-14 items-center gap-3 rounded-xl bg-foreground px-5 text-background">
					<BrandIcon icon={siApple} class="size-6" />
					<span class="flex flex-col leading-tight"><span class="text-[0.65rem] opacity-75">Download on the</span><span class="text-base font-medium">App Store</span></span>
				</a>
				<a href="#/p/new/patina" class="inline-flex h-14 items-center gap-3 rounded-xl border border-border px-5">
					<BrandIcon icon={siGoogleplay} class="size-5" />
					<span class="flex flex-col leading-tight"><span class="text-[0.65rem] text-muted-foreground">Get it on</span><span class="text-base font-medium">Google Play</span></span>
				</a>
			</div>
		</div>
	</section>

	<section class="relative mt-16 lg:mt-20">
		<div class="absolute inset-x-0 top-[22%] bottom-0 overflow-hidden">
			<ShaderMaterial preset="embossed-labyrinth" rendering="image" controls={false} class="h-full w-full" sizes="100vw" />
			<div class="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background"></div>
		</div>
		<div class="relative mx-auto flex max-w-[1320px] items-end justify-center gap-6 overflow-hidden px-4 pb-20 sm:px-8 lg:gap-12">
			<PhoneFrame label="patina Today screen: four projects with their rings" class="hidden w-[270px] translate-y-10 md:block">
				<div class="flex h-full flex-col px-4 pt-2">
					<p class="text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">Saturday, Oct 31</p>
					<p class="mt-1 text-[1.75rem] font-semibold tracking-tight">Today</p>
					<div class="mt-4 flex flex-col gap-2.5">
						{#each projects as p (p.name)}
							<div class="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
								<InlineRing seed={p.name} rings={p.last === 'Resting' ? 4 : 8} class="size-11" />
								<div class="min-w-0 flex-1">
									<p class="truncate text-[0.85rem] font-medium">{p.name}</p>
									<p class="truncate text-[0.7rem] text-muted-foreground">{p.meta}</p>
								</div>
								{#if p.last === 'Resting'}<Moon class="lucide size-3.5 text-muted-foreground" />{:else}<span class="text-[0.65rem] text-primary">{p.last}</span>{/if}
							</div>
						{/each}
					</div>
					<button type="button" class="mt-auto mb-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground"><Plus class="lucide size-4" />Log a session</button>
				</div>
			</PhoneFrame>

			<PhoneFrame label="patina project screen: the cello project's ring after two years" class="z-10 w-[310px]">
				<div class="flex h-full flex-col px-5 pt-1">
					<div class="flex items-center justify-between text-primary"><ChevronLeft class="lucide size-5" /><span class="text-xs font-medium">Edit</span></div>
					<p class="mt-2 text-[0.7rem] tracking-wider text-muted-foreground uppercase">Since July 2024</p>
					<p class="text-[1.6rem] leading-tight font-semibold tracking-tight">Learn the cello</p>
					<div class="relative mx-auto my-4 aspect-square w-[88%]">
						<InlineRing seed="cello-y2" rings={15} label="Two years of cello sessions as rings" class="size-full" />
						<div class="absolute inset-0 grid place-items-center">
							<div class="rounded-full bg-background/85 px-3 py-1.5 text-center backdrop-blur">
								<p class="text-xl leading-none font-semibold tabular-nums">318</p>
								<p class="text-[0.6rem] tracking-wider text-muted-foreground uppercase">sessions</p>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-3 gap-2 text-center">
						{#each [['2y 4m', 'running'], ['94 h', 'played'], ['41', 'photos']] as [v, l] (l)}
							<div class="rounded-xl bg-muted/70 py-2"><p class="text-sm font-semibold">{v}</p><p class="text-[0.6rem] text-muted-foreground">{l}</p></div>
						{/each}
					</div>
					<div class="mt-4 flex h-12 items-end gap-1" aria-hidden="true">
						{#each months as m, i (i)}
							<span class="flex-1 rounded-sm {m ? 'bg-primary' : 'bg-muted'}" style:height={`${m ? 18 + m * 7 : 10}%`}></span>
						{/each}
					</div>
					<p class="mt-1 mb-2 flex justify-between text-[0.6rem] text-muted-foreground"><span>Sep 2025</span><span>Oct 2026</span></p>
				</div>
			</PhoneFrame>

			<PhoneFrame platform="android" time="21:07" label="patina on Android: logging a session" class="hidden w-[270px] translate-y-16 sm:block">
				<div class="flex h-full flex-col px-4 pt-2">
					<p class="text-[1.35rem] font-medium tracking-tight">Log a session</p>
					<p class="text-xs text-muted-foreground">Restore the '72 Vespa</p>
					<div class="mt-4 flex gap-2">
						{#each ['10 m', '30 m', '1 h', '2 h'] as d, i (d)}
							<span class="flex-1 rounded-full border py-1.5 text-center text-xs {i === 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}">{d}</span>
						{/each}
					</div>
					<div class="mt-3 rounded-2xl border border-border bg-card p-3 text-[0.85rem] leading-snug">
						Stripped the old wiring loom. Labelled every connector before it came out — future me will be grateful.
					</div>
					<div class="mt-3 grid grid-cols-3 gap-2">
						<ShaderMaterial preset="hammered-copper" rendering="image" controls={false} class="aspect-square rounded-xl" sizes="90px" />
						<ShaderMaterial preset="cast-iron" rendering="image" controls={false} class="aspect-square rounded-xl" sizes="90px" />
						<span class="grid aspect-square place-items-center rounded-xl border border-dashed border-border text-muted-foreground"><Camera class="lucide size-5" /></span>
					</div>
					<div class="mt-auto mb-3 flex items-center gap-3 rounded-2xl bg-muted/70 p-3">
						<InlineRing seed="vespa-new" rings={9} class="size-10" />
						<p class="text-[0.72rem] leading-snug">This becomes ring <strong>413</strong>. The Vespa project is in its third year.</p>
					</div>
					<span class="mb-3 inline-flex h-11 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">Add the ring</span>
				</div>
			</PhoneFrame>
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 py-24 sm:px-8 sm:py-32">
		<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end">
			<h2 class="text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em]">How a project <span class="font-fraunces font-normal text-primary italic">ages</span> in patina.</h2>
			<p class="max-w-xl text-xl leading-relaxed text-foreground lg:justify-self-end">There is no goal to set and no streak to protect. Each session adds a ring; time away leaves a gap. That is the whole system.</p>
		</div>
		<div class="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
			{#each growth as g, i (g.when)}
				<article class="flex flex-col">
					<div class="flex aspect-square items-center justify-center rounded-3xl border border-border bg-card p-8">
						<InlineRing seed={g.seed} rings={g.rings} spin={i === 2} label={`${g.when}: ${g.rings} rings`} class="size-full" style="max-width: {50 + i * 25}%" />
					</div>
					<p class="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">0{i + 1} · {g.when}</p>
					<p class="mt-3 text-lg leading-relaxed">{g.copy}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pb-24 sm:px-8 sm:pb-32">
		<div class="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
			<AccentSlab preset="powder-coat" seed="patina-rule" kicker="The one rule we built it on">
				<p class="max-w-[22ch] text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.035em]">Nothing in patina nags.</p>
				<p class="mt-6 max-w-xl text-xl leading-relaxed">No red badges, no broken streaks, no guilt at 11pm. A project that rests for a season simply stops gaining rings — and picks up exactly where you left it.</p>
				{#snippet footer()}
					<p class="font-mono text-xs uppercase tracking-wider">Resting projects fade to grey. They never disappear.</p>
				{/snippet}
			</AccentSlab>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
				{#each features.slice(0, 2) as ft (ft.title)}
					<article class="rounded-2xl border border-border p-7">
						<ft.icon class="lucide size-6 text-primary" />
						<h3 class="mt-6 text-2xl font-medium tracking-tight">{ft.title}</h3>
						<p class="mt-2 text-[1.05rem] leading-relaxed text-foreground/85">{ft.copy}</p>
					</article>
				{/each}
			</div>
		</div>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			{#each features.slice(2) as ft (ft.title)}
				<article class="rounded-2xl border border-border p-7">
					<ft.icon class="lucide size-6 text-primary" />
					<h3 class="mt-6 text-2xl font-medium tracking-tight">{ft.title}</h3>
					<p class="mt-2 text-[1.05rem] leading-relaxed text-foreground/85">{ft.copy}</p>
				</article>
			{/each}
		</div>
	</section>

	<FamilyFooter
		name="patina"
		preset="embossed-labyrinth"
		line="Free for three projects. $14 once for as many as you'll ever start."
		columns={[
			{ title: 'App', links: ['iPhone', 'iPad', 'Android', 'Widgets'] },
			{ title: 'Trust', links: ['Privacy', 'Backups', 'Export to JSON'] },
			{ title: 'hmziq', links: ['About', 'Changelog', 'Contact'] }
		]}
	/>
</ProductScope>
