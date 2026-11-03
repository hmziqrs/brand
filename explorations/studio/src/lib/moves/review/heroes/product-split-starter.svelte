<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siApple, siLinux } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Tag from '$brand/components/tag.svelte';
	import ProductHero from './product-hero.svelte';
	import StarterTerminal from './starter-terminal.svelte';

	const here = '#/c/hero/product-split-starter';
</script>

<ProductHero
	title="One repo for the whole desktop app."
	accent="whole"
	lede="Routing, 24 themes, Fluent i18n, SQLite, keyring, tray, signed updates and a Cmd+K launcher are already wired. Run cargo run, then start deleting what you don't need."
	installLabel="Clone gpui-starter v0.3.0"
	install="git clone https://github.com/freeoxide/gpui-starter.git"
>
	{#snippet eyebrow()}
		<a href={here} class="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary">
			<Tag tone="orange" class="font-mono uppercase">New</Tag>v0.3.0 released<ArrowRight class="lucide size-3.5" />
		</a>
	{/snippet}
	{#snippet actions()}
		<Button href={here} size="lg">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href={here} size="lg" variant="outline">Read the docs</Button>
	{/snippet}
	{#snippet note()}
		<div class="flex flex-wrap items-center gap-2">
			<Tag><BrandIcon icon={siApple} class="size-3" />macOS</Tag>
			<Tag><BrandIcon icon={siLinux} class="size-3" />Linux</Tag>
			<Tag>Windows</Tag>
			<Button href={here} variant="link" size="sm" class="px-1">Build requirements<ArrowUpRight class="lucide" data-icon="inline-end" /></Button>
		</div>
	{/snippet}
	{#snippet visual()}<StarterTerminal />{/snippet}
</ProductHero>
