<script lang="ts">
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Smile from '@lucide/svelte/icons/smile';
	import Code from '@lucide/svelte/icons/code';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import UsersRound from '@lucide/svelte/icons/users-round';
	import SiteHeader from '$moves/site-northflank/site-header.svelte';
	import SiteFooter from '$moves/site-northflank/site-footer.svelte';
	import ContourField from '$moves/site-northflank/contour-field.svelte';
	import ConsoleMock from '$moves/site-northflank/console-mock.svelte';
	import CtaBand from '$moves/site-northflank/cta-band.svelte';
	import { to } from '$moves/site-northflank/site';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
	import OxideSlab from '$moves/northflank/oxide-slab.svelte';

	const wrap = 'mx-auto w-full max-w-[1320px] px-4 sm:px-8';
	const principles = [
		{ icon: MapPin, title: 'Workloads go where they are needed', line: 'Developers should be free to run their code on any cloud or any rack without being locked in. Portability is not a feature; it is the point.' },
		{ icon: Smile, title: 'Developer experience is not optional', line: 'Nobody should need to be an infrastructure expert to ship on day one. That goes for the operators beside them too: self-service, with control intact.' },
		{ icon: Code, title: 'Workloads over infrastructure', line: 'Time spent wrestling clusters is time not spent on the product. Infrastructure should work for you, not the other way round.' }
	];
	const team = [
		{ name: 'Ada Whitlock', role: 'Co-founder · CEO', from: 'Leeds', bio: 'Ran platform teams at two scale-ups before deciding nobody should build that platform a third time.' },
		{ name: 'Jonas Brekke', role: 'Co-founder · CTO', from: 'Bergen', bio: 'Wrote schedulers for a living. Still reviews every change to the control plane.' }
	];
	const rounds = [
		{ year: '2019', stage: 'Pre-seed', line: 'Two founders, one cluster, a waiting list.' },
		{ year: '2021', stage: 'Seed', line: 'Managed cloud opens to everyone.' },
		{ year: '2023', stage: 'Series A', line: 'Bring-your-own-cloud ships; first regulated customers.' },
		{ year: '2025', stage: 'Series B', line: 'Sandboxes, agents and GPUs join the platform.' }
	];
	const initials = (n: string) => n.split(' ').map((p) => p[0]).join('');
</script>

<svelte:head><title>Ferrous · about</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader notice={null} />

	<section class="relative overflow-hidden border-b">
		<ContourField />
		<div class="{wrap} relative py-24 lg:py-36">
			<MonoLabel text="About us" />
			<h1 class="mt-6 max-w-[16ch] text-[clamp(48px,6.8vw,100px)] leading-[0.95] font-medium tracking-[-0.045em]">Ship workloads, <span class="text-orange">not infrastructure.</span></h1>
			<div class="mt-10 max-w-[40rem] rounded-xl border bg-background/85 p-5 backdrop-blur-sm sm:p-6">
				<p class="text-[clamp(17px,1.5vw,21px)] leading-[1.5] text-foreground/90">Our job is to take infrastructure off your plate. When the workload is the priority, teams ship sooner and spend more of their week on the code their customers actually pay for.</p>
			</div>
		</div>
	</section>

	<section>
		<div class="{wrap} grid gap-14 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:py-32 [&>*]:min-w-0">
			<div>
				<MonoLabel text="What we stand for" />
				<h2 class="mt-5 text-[clamp(38px,5vw,68px)] leading-[1.0] font-medium tracking-[-0.035em]">Our principles.</h2>
				<p class="mt-6 max-w-[34rem] text-[19px] leading-[1.5] text-foreground/85">Deploying an app should be simple, consistent and affordable, whether it lands on AWS, Azure, Google Cloud or a rack in your basement.</p>
				<ol class="mt-12 space-y-8">
					{#each principles as p, n (p.title)}
						<li class="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
							<span class="grid size-11 place-items-center rounded-lg border text-orange"><p.icon class="lucide size-5" /></span>
							<div>
								<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">0{n + 1}</p>
								<h3 class="mt-1 text-[21px] font-medium text-foreground">{p.title}</h3>
								<p class="mt-2 text-[16px] leading-[1.55] text-foreground/80">{p.line}</p>
							</div>
						</li>
					{/each}
				</ol>
			</div>
			<ConsoleMock cluster="acme-platform" provider="GCP" region="europe-west2" class="lg:sticky lg:top-24" />
		</div>
	</section>

	<section class="border-t bg-(--band)">
		<div class="{wrap} py-24 lg:py-32">
			<div class="text-center">
				<MonoLabel text="Leadership" class="justify-center" />
				<h2 class="mt-5 text-[clamp(38px,5vw,68px)] leading-[1.0] font-medium tracking-[-0.035em]">The people steering.</h2>
				<p class="mt-4 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">example founders for this study</p>
			</div>
			<ul class="mt-14 grid gap-4 md:grid-cols-3">
				{#each team as t (t.name)}
					<li class="flex flex-col rounded-2xl border bg-card p-7">
						<div class="flex items-start justify-between">
							<span class="grid size-16 place-items-center rounded-full bg-foreground font-mono text-[18px] text-background">{initials(t.name)}</span>
							<span class="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{t.from}</span>
						</div>
						<p class="mt-6 text-[21px] font-medium text-foreground">{t.name}</p>
						<p class="font-mono text-[11px] tracking-[0.12em] text-orange uppercase">{t.role}</p>
						<p class="mt-4 text-[15.5px] leading-[1.55] text-foreground/80">{t.bio}</p>
					</li>
				{/each}
				<li>
					<OxideSlab class="flex h-full flex-col rounded-2xl p-7">
						<UsersRound class="lucide size-8" />
						<p class="mt-6 text-[22px] leading-tight font-medium">Want to build this with us?</p>
						<p class="mt-3 text-[15.5px] leading-[1.55]">We hire engineers, operators and writers, remote across Europe.</p>
						<a href={to('contact')} class="mt-auto inline-flex w-max items-center gap-2 pt-8 font-mono text-[13px] underline-offset-4 hover:underline">Open positions<ArrowRight class="lucide size-3.5" /></a>
					</OxideSlab>
				</li>
			</ul>
		</div>
	</section>

	<section class="border-t">
		<div class="{wrap} py-24 lg:py-32">
			<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
				<div>
					<MonoLabel text="Backing" />
					<h2 class="mt-5 text-[clamp(38px,5vw,68px)] leading-[1.0] font-medium tracking-[-0.035em]">Venture-backed, engineer-run.</h2>
				</div>
				<p class="max-w-[30rem] text-[18px] text-foreground/85 lg:justify-self-end">A small group of investors who back infrastructure for the long haul. Names withheld in this study.</p>
			</div>
			<ol class="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
				<span class="absolute top-[7px] right-0 left-0 hidden h-px bg-border lg:block" aria-hidden="true"></span>
				{#each rounds as r, n (r.year)}
					<li class="relative">
						<span class="relative block size-[15px] rounded-[3px] border-2 {n === rounds.length - 1 ? 'border-orange bg-orange' : 'border-foreground/60 bg-background'}"></span>
						<p class="mt-6 text-[clamp(44px,5vw,64px)] leading-none font-medium tracking-[-0.04em] text-foreground">{r.year}</p>
						<p class="mt-3 font-mono text-[11px] tracking-[0.14em] text-orange uppercase">{r.stage}</p>
						<p class="mt-2 text-[15.5px] text-foreground/80">{r.line}</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<CtaBand title="Ship workloads." second="We run the rest." />
	<SiteFooter />
</div>
