<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import Pause from '@lucide/svelte/icons/pause';
	import Play from '@lucide/svelte/icons/play';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import RustGridField from '$moves/review/parts/flora/rust-grid-field.svelte';
	import SerifItalicHeadline from '$moves/review/parts/flora/serif-italic-headline.svelte';

	const here = '#';
	let playing = $state(true);
</script>

<section class="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-10">
	<ShaderMaterial preset="oxide-bloom" rendering="live" animated={playing} controls={false} loading="eager" fetchpriority="high" class="absolute inset-0 -z-20 h-full w-full" />
	<RustGridField mode="reveal" cell={56} veil={0.8} fade="none" gap={0} line="--muted-foreground" class="-z-10" />

	<div class="mx-auto w-full max-w-[82rem] px-6">
		<p class="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 font-mono text-xs tracking-wide text-foreground uppercase">
			<span class="size-2 bg-primary motion-safe:animate-pulse"></span>oxlabs · app studio · booking now
		</p>
		<SerifItalicHeadline lead="From brief to" accent="binary." size="hero" tone="oxide" class="mt-6 max-w-[11ch] [text-shadow:0_2px_40px_var(--background)]" />
		<div class="mt-10 flex flex-wrap items-end justify-between gap-6">
			<Glass variant="smoke" class="max-w-[540px] p-6 sm:p-7">
				<p class="text-xl leading-snug text-foreground sm:text-2xl">We design and build apps for phones, desktops, the web and the terminal, then ship them signed. Between projects we publish free Rust tools.</p>
				<div class="mt-6 flex flex-wrap gap-3">
					<Button href={here} size="lg">Start a project</Button>
					<Button href={here} size="lg" variant="outline">How we work<ArrowRight class="lucide" data-icon="inline-end" /></Button>
				</div>
			</Glass>
			<span class="rounded-md bg-background">
				<Button variant="outline" onclick={() => (playing = !playing)} aria-pressed={!playing}>
					{#if playing}<Pause class="lucide" data-icon="inline-start" />Pause the material{:else}<Play class="lucide" data-icon="inline-start" />Play the material{/if}
				</Button>
			</span>
		</div>
	</div>
</section>
