<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import ProductHero from './product-hero.svelte';
	import MultiTerminal from './multi-terminal.svelte';
	import MaterialGrid from '../stages/material-grid.svelte';
</script>

<ProductHero
	layout="centered"
	title="A separate Claude Code for each provider."
	accent="for each provider."
	lede="Each provider gets its own claude-<name> command and config directory. That command runs the normal claude binary, and your existing ~/.claude stays untouched."
	install="npm install -g claude-multi"
>
	{#snippet actions()}
		<Button href="#/c/hero/product-centered-multi" size="lg">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href="https://github.com/hmziqrs/claude-multi" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
	{/snippet}
	{#snippet stage()}<MaterialGrid preset="white-sweep" presetLight="white-sweep" />{/snippet}
	{#snippet visual()}<MultiTerminal />{/snippet}
</ProductHero>
