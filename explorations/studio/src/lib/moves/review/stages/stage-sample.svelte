<script lang="ts">
	import type { Component } from 'svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import BrandHero from '$brand/blocks/sections/brand-hero.svelte';

	let { stage, stageProps = {}, panel = false, align = 'left', href = '#/review/stages' }: { stage: Component<any>; stageProps?: Record<string, unknown>; panel?: boolean; align?: 'left' | 'center'; href?: string } = $props();
	const Stage = $derived(stage);
</script>

<BrandHero title="Free Rust tools, finished before they ship." accent="finished" lede="Open-source building blocks for desktop apps and the command line. Each one ships with docs, tests and five rounds of review, or it waits." {panel} {align}>
	{#snippet stage()}<Stage {...stageProps} />{/snippet}
	{#snippet actions()}
		<Button {href} size="lg">Browse the tools<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href="https://github.com/freeoxide" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
	{/snippet}
</BrandHero>
