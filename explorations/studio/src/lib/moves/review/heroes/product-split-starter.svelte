<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { siApple, siLinux } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import Tag from '$brand/components/tag.svelte';
	import Glass from '$brand/components/glass.svelte';
	import ProductHero from './product-hero.svelte';
	import StarterTerminal from './starter-terminal.svelte';

	const here = '#/c/hero/product-split-starter';
	const siWindows = { path: 'M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801' };
	const platforms = [
		{ name: 'macOS', icon: siApple },
		{ name: 'Windows', icon: siWindows },
		{ name: 'Linux', icon: siLinux }
	];
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
		<div class="flex flex-wrap items-center gap-2.5">
			<ul aria-label="Platforms" class="flex flex-wrap gap-2.5">
				{#each platforms as p (p.name)}
					<Glass as="li" variant="clear" class="flex h-10 items-center gap-2.5 rounded-full px-4 text-[15px] font-medium text-foreground">
						<BrandIcon icon={p.icon} class="size-4" />{p.name}
					</Glass>
				{/each}
			</ul>
			<Button href={here} variant="link" size="sm" class="px-1">Build requirements<ArrowUpRight class="lucide" data-icon="inline-end" /></Button>
		</div>
	{/snippet}
	{#snippet visual()}<StarterTerminal />{/snippet}
</ProductHero>
