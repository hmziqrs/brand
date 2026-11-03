<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Glass from '$brand/components/glass.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import BrandHero from './brand-hero.svelte';
	import MaterialGrid from '../stages/material-grid.svelte';

	const here = '#/c/hero/brand-oxlabs';
	const stack = ['Svelte', 'TypeScript', 'Rust', 'Node', 'Postgres', 'Flutter', 'Tauri', 'Cloudflare'];
</script>

<BrandHero
	title="Software that ships. Not demos."
	accent="ships. Not demos."
	lede="A small studio. We build web, mobile, and desktop software, carefully."
	panel
>
	{#snippet stage()}<MaterialGrid />{/snippet}
	{#snippet eyebrow()}
		<span class="inline-flex items-center gap-2 rounded-md bg-background px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-foreground uppercase"><span class="text-primary">›</span>oxlabs.dev · engineering studio</span>
	{/snippet}
	{#snippet actions()}
		<Button href={here} size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href={here} size="lg" variant="outline">What we do</Button>
	{/snippet}
	{#snippet meta()}
		<Glass variant="smoke" class="inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-xl px-4 py-3 font-mono text-xs text-foreground">
			<span class="flex items-center gap-2"><span class="size-1.5 rounded-full bg-success"></span>Available for new projects</span>
			<span class="text-foreground/75">Remote · async-first</span>
			<span class="hidden h-4 w-px bg-border sm:block"></span>
			<span class="flex flex-wrap gap-x-3 gap-y-1 text-foreground/75">{#each stack as s (s)}<span>{s}</span>{/each}</span>
		</Glass>
	{/snippet}
</BrandHero>
