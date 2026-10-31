<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Palette from '@lucide/svelte/icons/palette';
	import Megaphone from '@lucide/svelte/icons/megaphone';
	import Building2 from '@lucide/svelte/icons/building-2';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Code from '@lucide/svelte/icons/code';
	import Briefcase from '@lucide/svelte/icons/briefcase';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Globe from '@lucide/svelte/icons/globe';
	import Laptop from '@lucide/svelte/icons/laptop';
	import Tent from '@lucide/svelte/icons/tent';
	import PieChart from '@lucide/svelte/icons/chart-pie';
	import SiteHeader from '$moves/site-framer/site-header.svelte';
	import SiteFooter from '$moves/site-framer/site-footer.svelte';
	import SectionHead from '$moves/site-framer/section-head.svelte';
	import HeroStage from '$moves/site-framer/hero-stage.svelte';
	import MarkTile from '$moves/site-framer/mark-tile.svelte';
	import YearStack from '$moves/site-framer/year-stack.svelte';
	import ProofStrip from '$moves/site-framer/proof-strip.svelte';
	import OpenRoles from '$moves/site-framer/open-roles.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import { to } from '$moves/site-framer/site';

	const wrap = 'mx-auto max-w-[1280px] px-4 sm:px-8';
	const founders = [
		{ n: 'Ines Varga', r: 'Co-founder, design', m: 'IV', p: 'woven-linen' },
		{ n: 'Dario Okoye', r: 'Co-founder, engineering', m: 'DO', p: 'brushed-alloy' }
	];
	const roles = [
		{ i: Palette, t: 'Designers', b: 'Explore and refine visual ideas with the agent' },
		{ i: Megaphone, t: 'Marketers', b: 'Launch and run campaign sites on your own' },
		{ i: Building2, t: 'Site teams', b: 'One shared platform for the company site' },
		{ i: TrendingUp, t: 'Growth', b: 'Grow organic reach with the CMS and agents' },
		{ i: Code, t: 'Engineers', b: 'Motion, live data and custom code' },
		{ i: Briefcase, t: 'Agencies', b: 'Ship client sites faster, without cutting craft' },
		{ i: Rocket, t: 'Founders', b: 'Launch the startup site and keep it growing' }
	];
</script>

<svelte:head><title>About kiln</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader />

	<section class="{wrap} pt-16 md:pt-24">
		<div class="flex flex-wrap items-end justify-between gap-8">
			<h1 class="max-w-[17ch] text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[0.92] font-semibold tracking-[-0.055em]">kiln is one canvas for designing, publishing and growing websites<span class="ml-[0.05em] inline-block size-[0.15em] bg-primary"></span></h1>
			<dl class="flex gap-6 divide-x divide-border text-right">
				{#each [['2019', 'Founded'], ['64', 'People'], ['3', 'Offices']] as [v, k] (k)}
					<div class="pl-6 first:pl-0"><dt class="text-sm text-foreground/60">{k}</dt><dd class="text-3xl font-semibold tracking-[-0.04em]">{v}</dd></div>
				{/each}
			</dl>
		</div>
		<HeroStage class="mt-12" preset="oxide-bloom" corner="move the cursor · stand-in mark">
			<MarkTile />
		</HeroStage>
	</section>

	<section class="{wrap} py-28">
		<div class="grid gap-12 lg:grid-cols-[1fr_1fr]">
			<div>
				<p class="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.03em]">kiln started in 2019, but the idea is older: two people who kept rebuilding the same marketing site for every team they joined.</p>
				<p class="mt-6 max-w-[52ch] text-xl leading-snug">They wanted design and publishing on the same surface, so the person with the idea could also ship it. The first version was a canvas that exported pages. Everything since has been about removing the export.</p>
			</div>
			<div class="grid grid-cols-2 gap-4">
				{#each founders as f (f.n)}
					<figure>
						<div class="dark relative isolate grid aspect-[4/5] place-items-center overflow-hidden rounded-2xl border border-border">
							<ShaderMaterial preset={f.p} rendering="image" controls={false} sizes="300px" class="absolute inset-0 -z-10 h-full w-full" />
							<span class="grid size-24 place-items-center rounded-full bg-background/85 text-3xl font-semibold tracking-[-0.04em] text-foreground backdrop-blur">{f.m}</span>
						</div>
						<figcaption class="mt-3"><span class="block text-lg font-medium">{f.n}</span><span class="text-foreground/65">{f.r}</span></figcaption>
					</figure>
				{/each}
				<p class="col-span-2 text-sm text-foreground/60">People on this page are invented for the study.</p>
			</div>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<YearStack
			items={[
				{ year: '2019', title: 'A canvas that moved', body: 'The first kiln let designers animate ideas and show how a page should feel.' },
				{ year: '2022', title: 'From mock-up to live site', body: 'We rebuilt the product so the canvas publishes, hosts and updates real websites.' },
				{ year: '2025', title: 'A CMS on the canvas', body: 'Content moved into the same place as design, with collections anyone could edit.' },
				{ year: '2026', title: 'An agent with taste', body: 'The agent designs, writes and builds on the canvas, and every change stays editable.' }
			]}
		/>
	</section>

	<section class="{wrap} pb-28">
		<div class="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
			<OxideTile size="lg" eyebrow="Independent" big="0" title="investors who get a vote on the roadmap." body="We are profitable and plan to stay that way, so we answer to the people who build sites here." seed="kiln-about" class="min-h-[420px]" />
			<div class="flex flex-col justify-center rounded-2xl border border-border p-8">
				<ProofStrip label="Teams that run their sites here (names invented for this study)" />
			</div>
		</div>
	</section>

	<section class="{wrap} pb-28">
		<SectionHead title="Explore kiln for your role" class="mb-12" />
		<div class="grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
			{#each roles as r (r.t)}
				<a href={to('home')} class="group flex min-h-48 flex-col bg-background p-6 transition-colors hover:bg-primary hover:text-primary-foreground">
					<r.i class="lucide size-5 text-primary transition-colors group-hover:text-primary-foreground" />
					<span class="mt-auto flex items-center gap-1.5 pt-10 text-xl font-medium tracking-[-0.02em]">{r.t}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
					<span class="mt-1 text-[1.0625rem] leading-snug opacity-80">{r.b}</span>
				</a>
			{/each}
			<a href={to('contact')} class="flex min-h-48 flex-col justify-end bg-card p-6"><span class="text-xl font-medium tracking-[-0.02em]">Something else?</span><span class="mt-1 text-[1.0625rem] opacity-80">Tell us what you are building.</span></a>
		</div>
	</section>

	<section class="{wrap} pb-8">
		<SectionHead title="Do the best work of your career here" lede="We build the agent and the canvas that people use to ship ambitious sites. Small teams, long runways, high standards." class="mb-12" />
		<div class="mb-16 grid gap-px overflow-hidden rounded-[20px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
			{#each [{ i: Globe, t: 'Remote first, flexible hours, real time off' }, { i: Laptop, t: 'Hardware you choose and a workspace budget' }, { i: Tent, t: 'Everyone meets twice a year to plan and reset' }, { i: PieChart, t: 'Meaningful equity in what you help build' }] as p (p.t)}
				<div class="bg-background p-6"><p.i class="lucide size-5 text-primary" /><p class="mt-8 text-lg leading-snug">{p.t}</p></div>
			{/each}
		</div>
		<h3 class="mb-6 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.04em]">Open roles</h3>
		<OpenRoles />
	</section>

	<SiteFooter preset="hammered-copper" />
</div>
