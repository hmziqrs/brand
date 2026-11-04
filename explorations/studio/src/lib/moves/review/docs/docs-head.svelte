<script lang="ts">
	import DocsTitle from '$brand/blocks/content/docs-title.svelte';
	import Tag from '$brand/components/tag.svelte';
	import ThinRings from './thin-rings.svelte';
	import type { DocsPage } from './content';

	let { page, seed, class: className }: { page: DocsPage; seed: string; class?: string } = $props();
</script>

<div class={['relative', className]}>
	<ThinRings {seed} class="pointer-events-none absolute -top-10 -right-4 w-60 max-w-[40%] opacity-90" />
	<DocsTitle title={page.title} lede={page.desc} trail={['Docs', ...(page.group ? [page.group] : [])]} />
	{#if page.applies}<Tag marker tone="orange" class="relative mt-5">{page.applies}</Tag>{/if}
</div>
