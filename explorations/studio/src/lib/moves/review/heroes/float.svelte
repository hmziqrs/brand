<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siClaude, siFigma, siNotion, siGoogledrive, siDropbox } from 'simple-icons';
	import SerifItalicHeadline from '$moves/flora/serif-italic-headline.svelte';
	import FloatHero, { type Float } from '$moves/site-flora/float-hero.svelte';
	import { to } from '$moves/site-flora/site';

	const floats: Float[] = [
		{ preset: 'etched-silk', x: 2, y: 8, w: 170, depth: 0.9, label: 'Halide 3 · still' },
		{ preset: 'copper-sweep', x: 16, y: 54, w: 150, depth: 1.4, label: 'Reel 2 · 6s', hide: true },
		{ preset: 'creased-paper', x: 20, y: 4, w: 130, depth: 0.5, aspect: 'aspect-[4/3]', hide: true },
		{ preset: 'lava-fissures', x: 74, y: 3, w: 230, depth: 0.7, aspect: 'aspect-[16/10]', label: 'Moodboard · 12 frames' },
		{ preset: 'interference-film', x: 84, y: 44, w: 170, depth: 1.2, label: 'Vellum · vector', hide: true },
		{ preset: 'mineral-fault', x: 62, y: 66, w: 190, depth: 0.9, aspect: 'aspect-[4/3]', hide: true },
		{ preset: 'woven-linen', x: 0, y: 70, w: 160, depth: 0.6, aspect: 'aspect-square', hide: true }
	];

	const works = [
		[siClaude, 'Claude'],
		[siFigma, 'Figma'],
		[siNotion, 'Notion'],
		[siGoogledrive, 'Google Drive'],
		[siDropbox, 'Dropbox']
	] as const;
</script>

<FloatHero {floats} class="flex min-h-[calc(100svh-6.5rem)] flex-col items-center justify-center px-4 pt-20 pb-16 text-center sm:px-8">
	<div class="relative max-w-[980px] rounded-[2rem] bg-[radial-gradient(closest-side,var(--background)_55%,transparent)] px-2 py-8 sm:px-10">
		<SerifItalicHeadline lead="The" accent="creative" tail="canvas for teams" face="fraunces" size="xl" class="mx-auto max-w-[12ch]" />
		<p class="mx-auto mt-6 max-w-[34ch] text-xl leading-snug text-foreground sm:text-2xl">Every model, made for each stage of the work, on one board your whole team can touch.</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<Button href={to('pricing')} size="lg" class="h-12 rounded-full px-6 text-base">Start free</Button>
			<Button href={to('enterprise')} size="lg" variant="outline" class="h-12 gap-2 rounded-full bg-background px-5 text-base"><BrandIcon icon={siClaude} />Connect to Claude</Button>
		</div>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground">
			<span class="font-mono text-[11px] tracking-[0.14em] uppercase">Works with</span>
			{#each works as [icon, label] (label)}
				<span title={label} class="text-foreground/85"><BrandIcon {icon} /></span>
			{/each}
		</div>
	</div>
</FloatHero>
