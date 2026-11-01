<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import TopNav from '$moves/site-hex/top-nav.svelte';
	import PlotGrid from '$moves/site-hex/plot-grid.svelte';
	import SpotFrame from '$moves/site-hex/spot-frame.svelte';
	import SpotMini from '$moves/site-hex/spot-mini.svelte';
	import ContactForm from '$moves/site-hex/contact-form.svelte';
	import TerrainFooter from '$moves/site-hex/terrain-footer.svelte';
	import { href } from '$moves/site-hex/site';

	const channels = [
		{ label: 'Sales', line: 'Pricing, pilots and procurement', to: 'sales@quarry.example' },
		{ label: 'Support', line: 'Something broke or confused you', to: 'help@quarry.example' },
		{ label: 'Security', line: 'Questionnaires and the trust center', to: 'trust@quarry.example' },
		{ label: 'Press', line: 'Stories, talks and podcasts', to: 'press@quarry.example' }
	];
</script>

<svelte:head><title>Contact Quarry</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<TopNav active="contact" />

	<section class="relative isolate w-full px-4 pt-16 pb-16 sm:px-8 lg:pt-24">
		<PlotGrid class="-z-10" />
		<div class="mx-auto grid w-full max-w-[1320px] items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
		<div>
			<p class="mb-6 font-mono text-xs tracking-[0.16em] uppercase"><span class="mr-2 inline-block size-2 bg-[var(--orange)]"></span>Contact</p>
			<h1 class="text-[56px] leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[112px]">Get in <span class="bg-[var(--orange)] px-[0.1em] text-[var(--on-orange)]">touch</span></h1>
			<p class="mt-8 max-w-[34ch] bg-background text-xl leading-snug sm:text-2xl">Tell us a little about your team and the question that keeps coming back. A real person replies, usually the same day.</p>
			<ul class="mt-10 grid gap-3 sm:grid-cols-2">
				{#each channels as c (c.label)}
					<li>
						<a href="mailto:{c.to}" class="group flex h-full flex-col border border-border bg-background p-5 transition-colors hover:border-foreground">
							<span class="flex items-center justify-between text-lg font-semibold">{c.label}<ArrowUpRight class="lucide size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" /></span>
							<span class="mt-1 text-[15px] text-foreground/85">{c.line}</span>
							<span class="mt-3 font-mono text-xs text-muted-foreground">{c.to}</span>
						</a>
					</li>
				{/each}
			</ul>
			<SpotFrame ticks={false} class="mt-10 hidden max-w-[320px] lg:block"><SpotMini kind="mail" /></SpotFrame>
		</div>
		<ContactForm />
		</div>
	</section>

	<section class="mx-auto w-full max-w-[1320px] px-4 pt-10 sm:px-8">
		<p class="text-center text-lg">Prefer to look around first? <a href={href('pricing')} class="underline decoration-[var(--orange)] decoration-2 underline-offset-4">Start free</a> or <a href={href('customers')} class="underline decoration-[var(--orange)] decoration-2 underline-offset-4">read customer stories</a>.</p>
	</section>

	<TerrainFooter />
</div>
