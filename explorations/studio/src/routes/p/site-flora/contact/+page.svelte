<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Activity from '@lucide/svelte/icons/activity';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import SiteNav from '$moves/site-flora/site-nav.svelte';
	import SiteFooter from '$moves/site-flora/site-footer.svelte';
	import ContactForm from '$moves/site-flora/contact-form.svelte';
	import CursorTag from '$moves/site-flora/cursor-tag.svelte';
	import { to } from '$moves/site-flora/site';

	const routes = [
		{ Icon: LifeBuoy, t: 'Help centre', b: 'Answers on boards, billing and models, searchable.', href: to('techniques') },
		{ Icon: BookOpen, t: 'Docs & API', b: 'Run the canvas from your own tools and agents.', href: to('enterprise') },
		{ Icon: Activity, t: 'Status', b: 'All systems normal. Rendering queue under 2 seconds.', href: to('contact'), live: true }
	];
</script>

<svelte:head><title>Contact — canvasworks</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteNav />

	<section class="mx-auto grid max-w-[1200px] gap-12 px-4 pt-16 pb-24 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_1.05fr]">
		<div>
			<h1 class="text-[clamp(3.25rem,8vw,7rem)] leading-[0.92] font-medium tracking-[-0.045em] text-foreground">Contact us</h1>
			<p class="mt-6 max-w-[34ch] text-xl leading-snug text-foreground">Tell us about your team and what you want to make. We usually reply within one working day.</p>
			<div class="relative isolate mt-10 aspect-[4/3] overflow-hidden rounded-3xl border border-border">
				<ShaderMaterial preset="copper-sweep" rendering="image" loading="eager" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0 -z-20 h-full w-full" />
				<RustGridField mode="reveal" cell={36} veil={0.55} fade="none" gap={0} class="-z-10" />
				<div class="absolute inset-0 grid place-items-center p-6">
					<Glass variant="smoke" class="w-full max-w-[320px] rounded-2xl p-4">
						<p class="font-mono text-[10px] tracking-[0.14em] text-foreground uppercase">Inbox · sales</p>
						<div class="mt-3 space-y-2">
							<p class="rounded-xl rounded-tl-sm bg-background/80 px-3 py-2 text-[14px] text-foreground">Forty of us, mostly packaging. Can we pilot with one brand first?</p>
							<p class="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-sm bg-primary px-3 py-2 text-[14px] text-primary-foreground">Yes. Two weeks, one brand, your lead on the call Monday.</p>
						</div>
						<p class="mt-3 flex items-center gap-2 text-[12px] text-foreground"><span class="size-2 rounded-full bg-green motion-safe:animate-pulse"></span>Median first reply: 3h 40m</p>
					</Glass>
				</div>
				<CursorTag name="Mira" tone="teal" drift="a" class="absolute top-[12%] left-[10%]" />
			</div>
		</div>
		<div class="lg:pt-4">
			<ContactForm />
		</div>
	</section>

	<section class="mx-auto max-w-[1200px] px-4 pb-24 sm:px-8">
		<p class="mb-6 text-lg text-foreground">Not a sales question?</p>
		<div class="grid gap-3 md:grid-cols-3">
			{#each routes as r (r.t)}
				<a href={r.href} class="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary">
					<span class="flex items-center justify-between">
						<r.Icon class="lucide size-5 text-primary" />
						<ArrowUpRight class="lucide size-4 text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
					</span>
					<span class="mt-6 text-xl font-medium text-foreground">{r.t}</span>
					<span class="mt-1 flex items-center gap-2 text-[15px] leading-snug text-foreground/80">
						{#if r.live}<span class="size-2 shrink-0 rounded-full bg-green"></span>{/if}{r.b}
					</span>
				</a>
			{/each}
		</div>
	</section>

	<SiteFooter cta={null} />
</div>
