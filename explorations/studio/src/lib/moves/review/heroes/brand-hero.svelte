<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import Glass from '$brand/components/glass.svelte';
	import AccentTitle from './accent-title.svelte';

	let {
		title,
		accent,
		lede,
		eyebrow,
		actions,
		meta,
		align = 'left',
		panel = false,
		scrim,
		wordmark,
		heading,
		stage,
		titleClass,
		class: className
	}: {
		title: string;
		accent?: string;
		lede: string;
		eyebrow?: Snippet;
		actions?: Snippet;
		meta?: Snippet;
		align?: 'left' | 'center';
		panel?: boolean;
		scrim?: boolean;
		wordmark?: Snippet;
		heading?: Snippet;
		stage?: Snippet;
		titleClass?: string;
		class?: string;
	} = $props();

	const center = $derived(align === 'center');
</script>

{#snippet body()}
	<p class={cn('text-[clamp(18px,1.7vw,22px)] text-pretty text-foreground [line-height:1.5]', center ? 'mx-auto max-w-[40rem]' : 'max-w-[36rem]')}>{lede}</p>
	{#if actions}<div class={cn('mt-8 flex flex-wrap gap-3', center && 'justify-center')}>{@render actions()}</div>{/if}
{/snippet}

<section data-pointer-host class={cn('relative isolate flex min-h-[min(88svh,820px)] flex-col justify-center overflow-hidden', className)}>
	{#if stage}
		<div class="absolute inset-0 -z-10">{@render stage()}</div>
		{#if !center}
			<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(to_right,color-mix(in_oklab,var(--background)_78%,transparent)_0%,color-mix(in_oklab,var(--background)_62%,transparent)_36%,color-mix(in_oklab,var(--background)_22%,transparent)_56%,transparent_68%)]"></div>
		{/if}
	{/if}
	<div class={cn('pointer-events-none relative mx-auto w-full max-w-[82rem] px-6 py-24 lg:py-32 [&>*]:pointer-events-auto', center && 'flex flex-col items-center text-center')}>
		{#if eyebrow}<div class="mb-7">{@render eyebrow()}</div>{/if}
		{#if wordmark}<div data-display class={cn('mb-8 w-full', center && 'flex justify-center')}>{@render wordmark()}</div>{/if}
		{#if heading}{@render heading()}{:else}<AccentTitle
			{title}
			{accent}
			class={cn(
				'font-semibold tracking-[-0.045em] text-foreground',
				(scrim ?? panel) && '[text-shadow:0_2px_40px_var(--background),0_0_12px_var(--background)]',
				center ? 'max-w-[15ch] text-[clamp(44px,6.8vw,100px)]' : 'max-w-[14ch] text-[clamp(48px,8.4vw,132px)]',
				'leading-[0.95]',
				titleClass
			)}
		/>{/if}
		{#if panel}
			<Glass variant="smoke" class={cn('mt-10 rounded-2xl p-6 sm:p-7', center ? 'mx-auto max-w-[44rem]' : 'max-w-[40rem]')}>{@render body()}</Glass>
		{:else}
			<div class="mt-8">{@render body()}</div>
		{/if}
		{#if meta}<div class="mt-10 w-full">{@render meta()}</div>{/if}
	</div>
</section>
