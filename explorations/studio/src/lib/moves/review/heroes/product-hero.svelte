<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import CommandBox from '$brand/components/command-box.svelte';
	import AccentTitle from './accent-title.svelte';

	let {
		title,
		accent,
		lede,
		eyebrow,
		actions,
		install,
		installLabel,
		note,
		layout = 'split',
		visual,
		stage,
		class: className
	}: {
		title: string;
		accent?: string;
		lede: string;
		eyebrow?: Snippet;
		actions?: Snippet;
		install?: string;
		installLabel?: string;
		note?: Snippet;
		layout?: 'split' | 'centered';
		visual?: Snippet;
		stage?: Snippet;
		class?: string;
	} = $props();

	const centered = $derived(layout === 'centered');
</script>

<section data-pointer-host class={cn('relative isolate overflow-hidden', className)}>
	{#if stage}
		<div class="absolute inset-0 -z-10">{@render stage()}</div>
		<div
			aria-hidden="true"
			class={cn(
				'pointer-events-none absolute inset-0 -z-[5]',
				centered
					? 'bg-[radial-gradient(ellipse_46%_44%_at_50%_34%,color-mix(in_oklab,var(--background)_84%,transparent)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_55%,transparent_100%)]'
					: 'bg-[linear-gradient(to_right,color-mix(in_oklab,var(--background)_86%,transparent)_0%,color-mix(in_oklab,var(--background)_74%,transparent)_34%,color-mix(in_oklab,var(--background)_30%,transparent)_52%,transparent_64%)]'
			)}
		></div>
	{/if}
	<div
		class={cn(
			'mx-auto w-full max-w-[82rem] px-6',
			centered ? 'pt-16 pb-16 lg:pt-20' : 'grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-16 lg:py-28'
		)}
	>
		<div class={cn('min-w-0', centered && 'mx-auto flex max-w-[52rem] flex-col items-center text-center')}>
			{#if eyebrow}<div class="mb-7">{@render eyebrow()}</div>{/if}
			<AccentTitle
				{title}
				{accent}
				class={cn('font-semibold tracking-[-0.04em] text-foreground', stage && '[text-shadow:0_2px_40px_var(--background),0_0_14px_var(--background)]', centered ? 'max-w-[18ch] text-[clamp(44px,6.4vw,84px)]' : 'max-w-[13ch] text-[clamp(44px,5.8vw,80px)]', 'leading-[0.98]')}
			/>
			<p class={cn('mt-7 text-[clamp(18px,1.6vw,21px)] text-pretty text-foreground/90 [line-height:1.5]', stage && 'text-foreground [text-shadow:0_1px_24px_var(--background),0_0_10px_var(--background)]', centered ? 'max-w-[44rem]' : 'max-w-[34rem]')}>{lede}</p>
			{#if actions}<div class={cn('mt-9 flex flex-wrap gap-3', centered && 'justify-center')}>{@render actions()}</div>{/if}
			{#if install}
				<div class={cn('mt-8 w-full max-w-[30rem]', centered && 'mx-auto')}>
					{#if installLabel}<p class={cn('mb-2 text-sm font-medium text-foreground', centered && 'text-center')}>{installLabel}</p>{/if}
					<CommandBox command={install} class="bg-background text-left" />
				</div>
			{/if}
			{#if note}<div class={cn('mt-5', centered && 'flex justify-center')}>{@render note()}</div>{/if}
		</div>
		{#if visual}
			<div class={cn('relative min-w-0', centered && 'mx-auto mt-12 max-w-[1120px] lg:mt-14')}>{@render visual()}</div>
		{/if}
	</div>
</section>
