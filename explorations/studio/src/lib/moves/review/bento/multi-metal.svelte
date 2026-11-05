<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import MaterialStage from '$brand/components/material-stage.svelte';
	import StatTile from '$brand/components/stat-tile.svelte';
	import type { CatalogItem } from '$brand/components/catalog-card.svelte';
	import CatalogSection from '$brand/blocks/sections/catalog-section.svelte';
	import MixedHeadline from '$moves/review/parts/dovetail/mixed-headline.svelte';
	import { providers } from '$moves/review/parts/dovetail/providers';
	import InstanceSwitch from './instance-switch.svelte';
	import { outline } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	let picked = $state('ds');

	const items: CatalogItem[] = providers.map((p) => ({
		id: p.id,
		title: p.name,
		line: p.pay,
		tag: `claude-${p.id}`,
		rows: [
			{ label: 'Opus slot', value: p.opus },
			{ label: 'Fast slot', value: p.fast }
		],
		icon: p.icon,
		letter: p.letter,
		label: `${p.name}: show claude-${p.id} in the switcher`
	}));
</script>

<CatalogSection
	title="Pick your provider"
	accent="provider"
	tags={[{ label: 'claude-multi', tone: 'orange' }, { label: '8 templates' }, { label: 'One instance per key' }]}
	lede="Every template maps a provider's models into Claude Code's Opus and fast slots. Bring a key, get an instance. Click a provider, then find it in the switcher below."
	{items}
	bind:picked
	class={className}
>
	<div class="mt-24 flex flex-col gap-8 sm:mt-32 lg:flex-row lg:items-end lg:justify-between">
		<MixedHeadline size="lg" alt="dot" tint="primary" class="max-w-[16ch]">Switch without <em class="whitespace-nowrap">re-exporting</em> a key</MixedHeadline>
		<p class="max-w-[27rem] text-[1.15rem] leading-snug text-foreground">Each claude-&lt;name&gt; runs the normal claude binary with its own config directory, so history, login and bill stay apart.</p>
	</div>

	<MaterialStage preset="lava-fissures" window="none" padding="lg" class="mt-12 rounded-[1.75rem]">
		<InstanceSwitch {providers} bind:picked />
	</MaterialStage>

	<div class="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
		<StatTile tone="oxide" digits="dot" value="0" label="Changes to your ~/.claude" detail="Remove claude-multi and everything is as it was." class="col-span-2 sm:col-span-1" />
		<StatTile digits="dot" value="1" label="Command per provider" detail="claude-glm, claude-ds, claude-kimi, each with its own folder." />
		<StatTile digits="dot" accent value="8" label="Provider templates" detail="Anthropic, GLM, Kimi, DeepSeek, Qwen, MiniMax, MiMo and local." />
		<article class={cn(outline, 'col-span-2 flex min-h-[12rem] flex-col justify-end gap-4 p-5 sm:col-span-1 sm:min-h-[15rem] sm:p-7')}>
			<div class="flex flex-col gap-1">
				<span class="text-[0.95rem] font-medium">Per-project overrides</span>
				<span class="text-[0.8125rem] leading-snug text-muted-foreground">Pin a repo to the provider it should use.</span>
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-[0.95rem] font-medium">Your own gateway</span>
				<span class="text-[0.8125rem] leading-snug text-muted-foreground">Point an instance at your gateway or a local model.</span>
			</div>
		</article>
	</div>

	<div class="mt-10 flex flex-wrap items-center gap-3">
		<Button href={here} size="lg">Add a provider<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		<Button href={here} size="lg" variant="outline">See all templates</Button>
	</div>
</CatalogSection>
