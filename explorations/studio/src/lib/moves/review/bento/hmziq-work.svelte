<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import SectionHead from './section-head.svelte';
	import WorkCard, { type Work } from './work-card.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const work: Work[] = [
		{ name: 'gpui-query', kind: 'Library', dek: 'Data loading for GPUI apps: typed keys, one shared cache and refetch in the background.', meta: 'freeoxide · Rust', art: 'lanes' },
		{ name: 'claude-multi', kind: 'CLI', dek: 'A separate Claude Code for each provider, with its own command and config directory.', meta: 'Open source · npm', art: 'rings' },
		{ name: 'gpui-starter', kind: 'Starter', dek: 'One repo for the whole desktop app, from routing and themes to signed updates.', meta: 'freeoxide · Rust', art: 'window' },
		{ name: 'tunnel', kind: 'CLI', dek: 'Share a folder on your computer at a public link, and take it down with Ctrl+C.', meta: 'freeoxide · Rust', art: 'fan' },
		{ name: 'oxlabs', kind: 'Studio', dek: 'Apps for phones, desktops and the web, for teams who want the code and the people who wrote it.', meta: 'Client work', art: 'surfaces' },
		{ name: 'The blog', kind: 'Writing', dek: 'Long notes on how things were built: Rust, desktop apps, small tools and the process behind them.', meta: 'blog.hmziq.rs', art: 'bars' }
	];
</script>

<section data-slot="hmziq-work" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead kicker="Work" title="Things I've built lately." lede="Open-source tools, client apps and long notes on how they were made. Run the cursor across a card, then pick a thread and follow it.">
			{#snippet aside()}
				<Button href={here} variant="outline" size="lg">All work<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			{/snippet}
		</SectionHead>
		<div class="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
			{#each work as w (w.name)}<WorkCard work={w} href={here} />{/each}
		</div>
	</Container>
</section>
