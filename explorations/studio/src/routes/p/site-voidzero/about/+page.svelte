<script lang="ts">
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Check from '@lucide/svelte/icons/check';
	import { Button } from '$brand/ui/button/index.js';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import MaterialInk from '$moves/voidzero/material-ink.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import GridHero from '$moves/site-voidzero/grid-hero.svelte';
	import BracketStatement from '$moves/site-voidzero/bracket-statement.svelte';
	import TeamGrid from '$moves/site-voidzero/team-grid.svelte';
	import MaterialWindow from '$moves/site-voidzero/material-window.svelte';
	import BackerGrid from '$moves/site-voidzero/backer-grid.svelte';
	import { team, company } from '$moves/site-voidzero/site';

	const hiring = {
		kind: 'code' as const,
		title: 'team.ts',
		lang: 'typescript' as const,
		code: `const team = ['bloomery'];
team.push('you');

// what the work looks like
await kiln.check({ fast: true, kind: true });
await smelt.build({ target: 'the whole web' });`
	};
	const fit = ['You care about tools that are fast and kind to the people using them.', 'You want to work in the open and argue in public issues.', 'You are comfortable in Rust and TypeScript, or want to be.'];

	function meet() {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.getElementById('team')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
	}
</script>

<svelte:head><title>About · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader current="about" tone="ink" />

	<GridHero tone="ink" chip="about" lede="People who started and still run some of the most used open-source build tools.">
		{#snippet title()}A team of web <MaterialInk preset="copper-sweep">tooling</MaterialInk> specialists{/snippet}
		{#snippet actions()}<Button size="lg" class="px-5" onclick={meet}>Meet the team<ArrowDown class="lucide" data-icon="inline-end" /></Button>{/snippet}
		{#snippet art()}
			<div class="flex justify-center pt-8 pb-10">
				<MaterialTile preset="copper-sweep" size={200} frame={0.06} class="shadow-[0_40px_90px_-30px_color-mix(in_oklab,black_90%,transparent)]">
					<span class="text-[3.6rem] font-semibold tracking-[-0.04em]">{company.symbol}<i aria-hidden="true" class="ml-[0.06em] inline-block size-[0.3em] bg-mark-square"></i></span>
				</MaterialTile>
			</div>
		{/snippet}
	</GridHero>

	<ModeBand tone="ink" frame>
		<BracketStatement heading="We are here to make web developers faster than they have ever been." name="Ines Varga" role="Founder and CEO, example person">
			<p>The web began as a place for small scripts. Today it runs software used by billions of people, and the tooling has not kept up: every project glues together a dozen tools that disagree with each other and slow everyone down.</p>
			<p>We think the answer is one toolchain, designed together from the parser up, that is fast by default and stays out of your way.</p>
		</BracketStatement>
	</ModeBand>

	<ModeBand frame id="team" inner="pt-20 md:pt-28">
		<div class="flex flex-col items-center px-6 pb-14 text-center">
			<h2 class="text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Meet the team</h2>
			<p class="mt-5 max-w-[40ch] text-xl text-foreground/85">Authors and core maintainers of the tools in the stack. Names here are invented for this study.</p>
		</div>
		<TeamGrid people={team} class="border-l-0 min-[1300px]:border-l-0" />
	</ModeBand>

	<ModeBand frame inner="py-20 md:py-28">
		<div class="grid grid-cols-[minmax(0,1fr)] border-y border-border lg:grid-cols-2">
			<div class="flex flex-col gap-5 p-6 sm:p-10">
				<h2 class="max-w-[16ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-5xl">Want to build the next layer with us?</h2>
				<p class="max-w-[40ch] text-lg text-foreground/85">We hire a few people a year, mostly from the people who already send us fixes.</p>
				<div class="mt-auto pt-10"><Button href="https://example.com" size="lg" class="px-5">See open roles<ArrowUpRight class="lucide" data-icon="inline-end" /></Button></div>
			</div>
			<div class="flex flex-col border-t border-border lg:border-t-0 lg:border-l">
				<MaterialWindow preset="optical-field" panel={hiring} height="min-h-[20rem]" />
				<div class="border-t border-border p-6 sm:p-10">
					<p class="font-medium">You are probably a good fit if</p>
					<ul class="mt-4 flex flex-col gap-3">
						{#each fit as f (f)}<li class="flex gap-3 text-foreground/90"><Check class="lucide mt-1 size-4 shrink-0 text-primary" />{f}</li>{/each}
					</ul>
				</div>
			</div>
		</div>
	</ModeBand>

	<ModeBand frame inner="pb-20 md:pb-28">
		<div class="px-6 pb-12 sm:px-10">
			<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] sm:text-5xl">Backed by people who build dev tools</h2>
			<p class="mt-4 max-w-[46ch] text-lg text-foreground/85">Funds and founders who have shipped tools developers use. All names below are examples.</p>
		</div>
		<BackerGrid variant="grid" />
	</ModeBand>

	<SiteFooter />
</div>
