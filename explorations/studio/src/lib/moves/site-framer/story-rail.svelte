<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	type Story = { name: string; face: string; stat: string; line: string; preset?: string; oxide?: boolean };
	let {
		stories = [
			{ name: 'Northvane', face: 'font-space font-semibold tracking-[-0.04em]', stat: '0', line: 'engineers needed to relaunch the whole marketing site.' },
			{ name: 'Tallow & Co', face: 'font-fraunces font-medium tracking-[-0.02em]', stat: '85%', line: 'of site edits now ship without a developer handoff.', oxide: true },
			{ name: 'quayside', face: 'font-bricolage font-extrabold lowercase tracking-[-0.06em]', stat: '10×', line: 'faster campaign pages, from brief to live.', preset: 'black-ice' },
			{ name: 'FIELDNOTE', face: 'font-inter-tight font-semibold tracking-[0.12em] text-[1.6rem]!', stat: '35%', line: 'more sign-ups after testing two homepages.' },
			{ name: 'Halden', face: 'font-newsreader font-medium tracking-[-0.01em]', stat: '9', line: 'locales published from one CMS, kept in sync.', preset: 'chalk-dunes' }
		],
		class: className
	}: { stories?: Story[]; class?: string } = $props();

	let rail: HTMLDivElement | undefined = $state();
	const nudge = (d: number) => rail?.scrollBy({ left: d * 340, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
</script>

<div class={cn('min-w-0', className)}>
	<div bind:this={rail} class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8">
		{#each stories as s (s.name)}
			<a
				href="#/p/site-framer/blog"
				class={cn(
					'group relative isolate flex aspect-[4/5] w-[78vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border p-6 transition-colors',
					s.oxide ? 'band-orange border-transparent' : s.preset ? 'dark bg-background text-foreground' : 'bg-card hover:border-primary'
				)}
			>
				{#if s.preset}
					<ShaderMaterial preset={s.preset} rendering="image" controls={false} sizes="320px" class="absolute inset-0 -z-20 h-full w-full" />
					<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--background)_25%,color-mix(in_oklab,var(--background)_30%,transparent))]"></div>
				{/if}
				<span class="font-mono text-[0.6875rem] tracking-wide uppercase opacity-70">Example story</span>
				<p class={cn('my-auto text-center text-4xl', s.face)}>{s.name}</p>
				<p class="text-6xl font-medium tracking-[-0.05em]">{s.stat}</p>
				<p class="mt-2 text-lg leading-snug">{s.line}</p>
				<span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">Read story<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
			</a>
		{/each}
	</div>
	<div class="mt-5 flex gap-2">
		<button type="button" aria-label="Previous" onclick={() => nudge(-1)} class="grid size-10 place-items-center rounded-full border border-border hover:border-primary"><ArrowLeft class="lucide size-4" /></button>
		<button type="button" aria-label="Next" onclick={() => nudge(1)} class="grid size-10 place-items-center rounded-full border border-border hover:border-primary"><ArrowRight class="lucide size-4" /></button>
		<span class="ml-auto self-center text-sm text-foreground/60">Names are invented for this study.</span>
	</div>
</div>
