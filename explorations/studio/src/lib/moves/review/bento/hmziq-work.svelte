<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import PictureSection from '$brand/blocks/sections/picture-section.svelte';
	import type { PictureItem } from '$brand/components/picture-card.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const work: PictureItem[] = [
		{ title: 'gpui-query', tag: 'Library', dek: 'Data loading for GPUI apps: typed keys, one shared cache and refetch in the background.', meta: 'freeoxide · Rust', art: 'lanes' },
		{ title: 'claude-multi', tag: 'CLI', dek: 'A separate Claude Code for each provider, with its own command and config directory.', meta: 'Open source · npm', art: 'rings' },
		{ title: 'gpui-starter', tag: 'Starter', dek: 'One repo for the whole desktop app, from routing and themes to signed updates.', meta: 'freeoxide · Rust', art: 'window' },
		{ title: 'tunnel', tag: 'CLI', dek: 'Share a folder on your computer at a public link, and take it down with Ctrl+C.', meta: 'freeoxide · Rust', art: 'fan' },
		{ title: 'oxlabs', tag: 'Studio', dek: 'Apps for phones, desktops and the web, for teams who want the code and the people who wrote it.', meta: 'Client work', art: 'surfaces' },
		{ title: 'The blog', tag: 'Writing', dek: 'Long notes on how things were built: Rust, desktop apps, small tools and the process behind them.', meta: 'blog.hmziq.rs', art: 'bars' }
	];
</script>

<PictureSection kicker="Work" title="Things I've built lately." lede="Open-source tools, client apps and long notes on how they were made. Run the cursor across a card, then pick a thread and follow it." items={work} href={here} class={className}>
	{#snippet actions()}
		<Button href={here} variant="outline" size="lg">All work<ArrowRight class="lucide" data-icon="inline-end" /></Button>
	{/snippet}
</PictureSection>
