<script lang="ts">
	import { siGithub, siX } from 'simple-icons';
	import Mark from '$brand/components/mark.svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { cn } from '$brand/utils.js';
	import { author } from './posts';

	let { links = false, class: className }: { links?: boolean; class?: string } = $props();
</script>

<div data-slot="blog-byline" class={cn('flex items-center gap-3', className)}>
	<Mark symbol={author.symbol} size={36} />
	<div class="flex min-w-0 flex-col leading-tight">
		<span class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Written by</span>
		<span class="mt-1 text-[0.9375rem] font-medium text-foreground">{author.name}</span>
	</div>
	{#if links}
		<span class="mx-1 h-6 w-px bg-border" aria-hidden="true"></span>
		<a href={author.x} target="_blank" rel="noopener" aria-label="hmziqrs on X" class="grid size-8 place-items-center rounded-full text-foreground/75 hover:text-foreground"><BrandIcon icon={siX} class="size-3.5" /></a>
		<a href={author.github} target="_blank" rel="noopener" aria-label="hmziqrs on GitHub" class="grid size-8 place-items-center rounded-full text-foreground/75 hover:text-foreground"><BrandIcon icon={siGithub} class="size-4" /></a>
	{/if}
</div>
