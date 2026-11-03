<script lang="ts">
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import BrandHero from './brand-hero.svelte';
	import Rings from '../stages/rings.svelte';
</script>

<BrandHero
	align="center"
	title="HMZIQ LABS"
	lede="Experiments in Flutter, React Native, Rust and Go: UI challenges, small games, CLIs, and the tools that grew out of them."
	titleClass="max-w-none text-[clamp(34px,8.6vw,128px)] leading-[1] font-light tracking-[0.16em] uppercase [text-indent:0.16em]"
>
	{#snippet stage()}<Rings />{/snippet}
	{#snippet eyebrow()}<span class="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">Experiments</span>{/snippet}
	{#snippet actions()}
		<Button href="#/c/hero/brand-labs" size="lg">Explore<ArrowDown class="lucide" data-icon="inline-end" /></Button>
		<Button href="https://github.com/hmziqrs" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
	{/snippet}
</BrandHero>
