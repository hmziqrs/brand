<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import DotMatrixWord from '$moves/northflank/dot-matrix-word.svelte';
	import BrandHero from '$brand/blocks/sections/brand-hero.svelte';
	import SceneStage from '$brand/components/scene-stage.svelte';

	const here = '#/c/hero/brand-freeoxide';
	const stats = [
		{ v: '4–5×', k: 'audit passes / project' },
		{ v: '5', k: 'AI edge-case rounds' },
		{ v: '>90%', k: 'coverage floor' },
		{ v: '100%', k: 'open · MIT / Apache-2.0' }
	];
</script>

<BrandHero
	title="Open-source Rust, built to a standard."
	lede="Open-source Rust, one person at the keyboard. I build the tools I wish existed and release them. Every project gets real tests, real audits. What ships is finished."
	scrim
	titleClass="max-w-[17ch] text-[clamp(34px,4.4vw,60px)] leading-[1.02] tracking-[-0.035em]"
>
	{#snippet stage()}<SceneStage seed="freeoxide" />{/snippet}
	{#snippet eyebrow()}
		<div class="font-mono text-xs leading-[1.8] text-muted-foreground">
			<div><span class="text-primary">$</span> <span class="text-foreground">freeoxide --init</span></div>
			<div>[ <span class="text-success">ok</span> ] running audit passes (5/5)</div>
			<div>[ <span class="text-success">ok</span> ] all checks green: ready.</div>
		</div>
	{/snippet}
	{#snippet wordmark()}
		<DotMatrixWord word="freeoxide" tone="accent" scatter={0} grid={false} label="freeoxide" class="w-[min(100%,540px)]" />
	{/snippet}
	{#snippet actions()}
		<Button href={here} size="lg">Browse the projects<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href="https://github.com/freeoxide" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
	{/snippet}
	{#snippet meta()}
		<ul class="grid max-w-[46rem] grid-cols-2 gap-3 sm:grid-cols-4">
			{#each stats as s (s.k)}
				<li class="rounded-xl border border-border bg-background/85 px-4 py-3.5 backdrop-blur-sm">
					<p class="font-mono text-2xl font-medium tracking-tight text-primary tabular-nums">{s.v}</p>
					<p class="mt-1 font-mono text-[11px] leading-snug text-muted-foreground">{s.k}</p>
				</li>
			{/each}
		</ul>
	{/snippet}
</BrandHero>
