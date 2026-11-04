<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import MaterialStage from '$brand/components/material-stage.svelte';
	import MixedHeadline from '$moves/dovetail/mixed-headline.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { providers } from '$moves/dovetail/providers';
	import ProviderCard from './provider-card.svelte';
	import InstanceSwitch from './instance-switch.svelte';
	import { outline } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	let picked = $state('ds');

	const digits = 'font-dot text-[clamp(3.5rem,6.5vw,5.75rem)] leading-[0.85] font-bold tracking-[-0.04em]';
</script>

<section data-slot="multi-metal" class={cn('overflow-x-clip py-24 sm:py-32', className)}>
	<Container size="wide">
		<MixedHeadline size="xl" alt="dot" tint="primary">Pick your <em>provider</em></MixedHeadline>
		<div class="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
			<div class="flex flex-wrap gap-2">
				<Tag tone="orange">claude-multi</Tag>
				<Tag>8 templates</Tag>
				<Tag>One instance per key</Tag>
			</div>
			<p class="max-w-[30rem] text-[1.15rem] leading-snug text-foreground">Every template maps a provider's models into Claude Code's Opus and fast slots. Bring a key, get an instance. Click a provider, then find it in the switcher below.</p>
		</div>

		<div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each providers as p (p.id)}
				<ProviderCard provider={p} picked={picked === p.id} onpick={(id) => (picked = id)} />
			{/each}
		</div>

		<div class="mt-24 flex flex-col gap-8 sm:mt-32 lg:flex-row lg:items-end lg:justify-between">
			<MixedHeadline size="lg" alt="dot" tint="primary" class="max-w-[16ch]">Switch without <em class="whitespace-nowrap">re-exporting</em> a key</MixedHeadline>
			<p class="max-w-[27rem] text-[1.15rem] leading-snug text-foreground">Each claude-&lt;name&gt; runs the normal claude binary with its own config directory, so history, login and bill stay apart.</p>
		</div>

		<MaterialStage preset="lava-fissures" window="none" padding="lg" class="mt-12 rounded-[1.75rem]">
			<InstanceSwitch {providers} bind:picked />
		</MaterialStage>

		<div class="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
			<article class="band-orange col-span-2 flex min-h-[12rem] flex-col justify-between gap-6 rounded-2xl p-5 sm:col-span-1 sm:min-h-[15rem] sm:gap-8 sm:p-7">
				<span class={digits}>0</span>
				<div class="flex flex-col gap-1">
					<span class="text-[0.95rem] font-medium">Changes to your ~/.claude</span>
					<span class="text-[0.8125rem] leading-snug opacity-85">Remove claude-multi and everything is as it was.</span>
				</div>
			</article>
			<article class={cn(outline, 'flex min-h-[12rem] flex-col justify-between gap-6 p-5 sm:min-h-[15rem] sm:gap-8 sm:p-7')}>
				<span class={cn(digits, 'text-foreground')}>1</span>
				<div class="flex flex-col gap-1">
					<span class="text-[0.95rem] font-medium">Command per provider</span>
					<span class="text-[0.8125rem] leading-snug text-muted-foreground">claude-glm, claude-ds, claude-kimi, each with its own folder.</span>
				</div>
			</article>
			<article class={cn(outline, 'flex min-h-[12rem] flex-col justify-between gap-6 p-5 sm:min-h-[15rem] sm:gap-8 sm:p-7')}>
				<span class={cn(digits, 'text-primary')} data-display>8</span>
				<div class="flex flex-col gap-1">
					<span class="text-[0.95rem] font-medium">Provider templates</span>
					<span class="text-[0.8125rem] leading-snug text-muted-foreground">Anthropic, GLM, Kimi, DeepSeek, Qwen, MiniMax, MiMo and local.</span>
				</div>
			</article>
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
	</Container>
</section>
