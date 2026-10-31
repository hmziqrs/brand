<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		heading,
		body,
		preset = 'copper-sweep',
		variant = 'split',
		live = false,
		symbol = 'Fx',
		class: className
	}: {
		heading: string;
		body?: string;
		preset?: string;
		variant?: 'split' | 'over';
		live?: boolean;
		symbol?: string;
		class?: string;
	} = $props();

	const uid = $props.id();

	function submit(e: SubmitEvent) {
		e.preventDefault();
		toast('Example form. Nothing was sent.');
	}
</script>

{#snippet form()}
	<form class="flex w-full max-w-md flex-col gap-3" onsubmit={submit}>
		<label for={`${uid}-email`} class="text-[0.95rem] font-medium">Get one email when a tool ships</label>
		<div class="flex gap-2">
			<Input id={`${uid}-email`} type="email" required placeholder="you@example.com" autocomplete="email" class="h-10 bg-background/60" />
			<Button type="submit" size="lg" class="h-10 px-4">Subscribe</Button>
		</div>
		<p class="text-xs text-muted-foreground">About once a month. Unsubscribe from any email.</p>
	</form>
{/snippet}

{#snippet strip(tall: boolean)}
	<div class={cn('relative isolate grid place-items-center overflow-hidden', tall ? 'min-h-[30rem] py-16' : 'h-56 sm:h-72')}>
		<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={live} loading="eager" sizes="100vw" class="absolute inset-0 -z-10" />
		{#if !tall}
			<span class="dark inline-flex items-baseline rounded-[22%] bg-background px-5 py-4 text-4xl leading-none font-semibold tracking-[-0.02em] text-foreground shadow-2xl sm:text-5xl">{symbol}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.3em] bg-mark-square"></i></span>
		{:else}
			<div class="mx-4 flex max-w-2xl flex-col items-center gap-6 rounded-2xl bg-background/88 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
				<h2 class="text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-6xl">{heading}</h2>
				{#if body}<p class="max-w-[42ch] text-lg text-foreground/85">{body}</p>{/if}
				<div class="flex w-full justify-center text-left">{@render form()}</div>
			</div>
		{/if}
	</div>
{/snippet}

<div class={cn('material-strip-cta', className)}>
	{#if variant === 'split'}
		<div class="mx-auto grid w-full max-w-[1280px] items-end gap-10 px-6 py-16 sm:px-10 md:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
			<div class="flex flex-col gap-4">
				<h2 class="max-w-[16ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-6xl">{heading}</h2>
				{#if body}<p class="max-w-[44ch] text-lg text-foreground/85">{body}</p>{/if}
			</div>
			<div class="lg:justify-self-end">{@render form()}</div>
		</div>
		{@render strip(false)}
	{:else}
		{@render strip(true)}
	{/if}
</div>
