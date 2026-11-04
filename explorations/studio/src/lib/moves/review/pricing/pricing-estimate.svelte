<script lang="ts">
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import ProductHero from '$brand/blocks/sections/product-hero.svelte';
	import MaterialGrid from '$brand/components/material-grid.svelte';
	import MaterialWash from '$brand/components/material-wash.svelte';
	import ProductWindow from '$brand/components/product-window.svelte';
	import TerminalWindow from '$brand/components/terminal-window.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import ScopeEstimate from './scope-estimate.svelte';
	import SeatEstimate from './seat-estimate.svelte';
	import RequestSketch from './request-sketch.svelte';
	import CompareTable from './compare-table.svelte';
	import FaqBlock from './faq-block.svelte';
	import type { Pricing } from './content';

	let { content, here = '#', class: className }: { content: Pricing; here?: string; class?: string } = $props();

	let period = $state('0');
	let table: HTMLElement | undefined = $state();
	const alt = $derived(period === '1');
	const studio = $derived(content.kind === 'studio');

	const dayOne: [string, string?][] = [
		['git clone your-repo && pnpm install'],
		['pnpm test', 'green'],
		['pnpm typecheck', 'no errors'],
		['pnpm build', 'passing'],
		['pnpm deploy', 'production']
	];
</script>

<div data-slot="pricing-estimate" class={cn('pb-24 md:pb-32', className)}>
	<ProductHero title={content.alt.title} accent={content.alt.accent} lede={content.alt.lede}>
		{#snippet eyebrow()}<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{content.hero.kicker}</p>{/snippet}
		{#snippet stage()}{#if studio}<MaterialGrid />{:else}<MaterialWash preset="brushed-alloy" />{/if}{/snippet}
		{#snippet actions()}
			<ButtonLink href={here} size="lg">{content.alt.cta}</ButtonLink>
			<Button size="lg" variant="outline" class="bg-background" onclick={() => table?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{content.compare.title}<ArrowDown class="lucide" data-icon="inline-end" /></Button>
		{/snippet}
		{#snippet visual()}
			{#if studio}
				<TerminalWindow title="discovery.sh" class="shadow-[0_30px_70px_-28px_color-mix(in_oklab,black_55%,transparent)] lg:ml-auto lg:max-w-[36rem]">
					<div class="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-[2]">
						<p class="text-muted-foreground"># what "done" looks like on day one</p>
						{#each dayOne as [cmd, out] (cmd)}
							<p class="whitespace-pre"><span class="text-primary select-none">{'$ '}</span>{out ? cmd.padEnd(15) : cmd}{#if out}<span class="text-muted-foreground">{' → '}</span><span class="text-(--code-token-string)">{out}</span>{/if}</p>
						{/each}
						<p class="mt-2 text-muted-foreground"># the boring stuff, done first.</p>
					</div>
				</TerminalWindow>
			{:else}
				<ProductWindow title="torii.tools" class="lg:ml-auto lg:max-w-[40rem]" chrome>
					<div class="-mx-4 -my-6 sm:-mx-6 sm:-my-8"><RequestSketch /></div>
				</ProductWindow>
			{/if}
		{/snippet}
	</ProductHero>

	<Container size="wide" class="mt-16 md:mt-24">
		{#if studio}<ScopeEstimate {content} bind:period />{:else}<SeatEstimate {content} bind:period />{/if}
	</Container>

	<div bind:this={table} class="scroll-mt-[calc(var(--pricing-top,0px)+1rem)]">
		<Container size="wide" class="mt-24 md:mt-32">
			<CompareTable {content} {alt} href={here} />
		</Container>
	</div>

	<Container size="wide" class="mt-24 md:mt-32">
		<FaqBlock faq={content.faq} />
	</Container>
</div>
