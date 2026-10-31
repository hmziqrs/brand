<script lang="ts">
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Wordmark from '$brand/components/wordmark.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import MonoChip from './mono-chip.svelte';

	let {
		links = ['Providers', 'How it works', 'Changelog', 'FAQ'],
		version = 'v0.12.0',
		cta = 'Install',
		surface = 'plain',
		home = '#/',
		class: className
	}: {
		links?: string[];
		version?: string;
		cta?: string;
		surface?: 'plain' | 'glass' | 'line';
		home?: string;
		class?: string;
	} = $props();
</script>

<header
	data-slot="glyph-nav"
	class={cn(
		'relative z-20',
		surface === 'glass' && 'bg-[color-mix(in_oklab,var(--background)_55%,transparent)] backdrop-blur-md',
		surface === 'line' && 'border-b',
		className
	)}
>
	<div class="mx-auto flex h-16 w-full max-w-[82rem] items-center gap-6 px-4 sm:px-6">
		<a href={home} class="flex items-baseline gap-1.5 text-foreground">
			<Wordmark name="claude-multi" class="text-[1.05rem]" />
			<span class="hidden text-[0.8125rem] text-muted-foreground sm:inline">by hmziq</span>
		</a>
		<nav aria-label="Main" class="hidden items-center gap-6 text-[0.875rem] lg:flex">
			{#each links as l (l)}<a href={home} class="text-foreground/80 transition-colors hover:text-foreground">{l}</a>{/each}
		</nav>
		<div class="ml-auto flex items-center gap-2">
			<MonoChip class="hidden md:inline-flex" mark="square">{version}</MonoChip>
			<Button variant="ghost" size="sm" href="https://github.com/hmziqrs" class="hidden sm:inline-flex"><BrandIcon icon={siGithub} />GitHub</Button>
			<Button size="sm" href={home}>{cta}</Button>
		</div>
	</div>
</header>
