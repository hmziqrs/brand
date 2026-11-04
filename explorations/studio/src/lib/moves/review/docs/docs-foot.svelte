<script lang="ts">
	import Pencil from '@lucide/svelte/icons/pencil';
	import DocsPager from '$brand/blocks/content/docs-pager.svelte';
	import { neighbours, type DocsPage, type DocsSite } from './content';

	let { site, page, go }: { site: DocsSite; page: DocsPage; go: (key: string) => string } = $props();

	const near = $derived(neighbours(site, page.key));
	const edit = $derived(page.edit ?? `${site.github}`);
	const stamp = $derived([page.reviewed, page.updated && `Last updated ${page.updated}`].filter(Boolean).join(' · '));
</script>

<div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t pt-5 text-[0.8125rem] text-muted-foreground">
	<a href={edit} target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 transition-colors hover:text-foreground">
		<Pencil class="lucide size-3.5" />
		{page.edit ? 'Edit this page on GitHub' : `${site.product} on GitHub`}
	</a>
	{#if stamp}<span>{stamp}</span>{/if}
</div>

<DocsPager class="mt-8" prev={near.prev && { title: near.prev.title, href: go(near.prev.key) }} next={near.next && { title: near.next.title, href: go(near.next.key) }} />
