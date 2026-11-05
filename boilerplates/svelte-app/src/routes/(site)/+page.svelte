<script lang="ts">
	// The landing page for a product site: ProductHero centered over a
	// MaterialWash, a catalog, the steps and the stat tiles. Every word is
	// example copy (lib/example.ts): replace it with the project's own.
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import ProductHero from '$brand/blocks/sections/product-hero.svelte';
	import CatalogSection from '$brand/blocks/sections/catalog-section.svelte';
	import StepsSection from '$brand/blocks/sections/steps-section.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import MaterialWash from '$brand/components/material-wash.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import Tag from '$brand/components/tag.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import TerminalBody from '$brand/components/terminal-body.svelte';
	import TerminalLine from '$brand/components/terminal-line.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import StepDemo from '#lib/step-demo.svelte';
	import { landing, site } from '#lib/example.js';

	let picked = $state(landing.catalog.picked);
</script>

<SiteHead
	site="freeoxide"
	title="svelte-app — a hmziq site"
	description="The SvelteKit starter for hmziq sites: the theme, the brand kit, a product landing page and the content pages."
	url="https://example.com/"
/>

<ProductHero layout="centered" title={landing.hero.title} accent={landing.hero.accent} lede={landing.hero.lede} install={site.install}>
	{#snippet eyebrow()}<Tag tone="orange" marker class="font-mono uppercase">{landing.hero.eyebrow}</Tag>{/snippet}
	{#snippet actions()}
		<Button href="/docs/installation" size="lg">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href="https://github.com" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
	{/snippet}
	{#snippet stage()}<MaterialWash preset="white-sweep" />{/snippet}
	{#snippet visual()}
		<TerminalWindow title="example-tool setup">
			<TerminalBody>
				{#each landing.terminal as line, i (i)}<TerminalLine {line} />{/each}
			</TerminalBody>
		</TerminalWindow>
	{/snippet}
</ProductHero>

<CatalogSection
	title={landing.catalog.title}
	accent={landing.catalog.accent}
	tags={landing.catalog.tags}
	lede={landing.catalog.lede}
	items={landing.catalog.items}
	bind:picked
>
	<div class="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
		{#each landing.stats as s, i (s.label)}
			<StatTile {...s} class={i === 0 ? 'col-span-2 lg:col-span-1' : ''} />
		{/each}
	</div>
</CatalogSection>

<StepsSection kicker={landing.steps.kicker} title={landing.steps.title} lede={landing.steps.lede} steps={landing.steps.items}>
	{#snippet actions()}<Button href="/docs/quick-start" size="lg">Quick start<ArrowRight class="lucide" data-icon="inline-end" /></Button>{/snippet}
	{#snippet demo(i)}<StepDemo {i} />{/snippet}
</StepsSection>

<section class="pb-24 sm:pb-32">
	<Container size="wide">
		<SectionHead layout="center" kicker={landing.closing.kicker} title={landing.closing.title} lede={landing.closing.lede} />
		<div class="mt-9 flex flex-wrap justify-center gap-3">
			<Button href="/docs/installation" size="lg">Read the docs</Button>
			<Button href="/contact" size="lg" variant="outline">Get in touch</Button>
		</div>
	</Container>
</section>
