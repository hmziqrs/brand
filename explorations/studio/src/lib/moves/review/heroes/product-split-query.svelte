<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Tag from '$brand/components/tag.svelte';
	import ProductHero from './product-hero.svelte';
	import QueryPath from './query-path.svelte';
</script>

<ProductHero
	title="Cache, fetch, render. One path."
	accent="One path."
	lede="gpui-query wires network, cache, retry, and revalidation into one small API for GPUI applications."
	install="cargo add gpui-query"
>
	{#snippet eyebrow()}<Tag tone="orange" marker class="font-mono uppercase">Async state for GPUI</Tag>{/snippet}
	{#snippet actions()}
		<Button href="#/c/hero/product-split-query" size="lg">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href="https://github.com/freeoxide/gpui-query" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
	{/snippet}
	{#snippet visual()}<QueryPath />{/snippet}
</ProductHero>
