<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { Post } from './site';

	let {
		cover,
		size = 'md',
		zoom = true,
		loading = 'lazy',
		class: className
	}: {
		cover: Post['cover'];
		size?: 'sm' | 'md' | 'lg';
		zoom?: boolean;
		loading?: 'eager' | 'lazy';
		class?: string;
	} = $props();

	const sizes = { sm: '(min-width: 768px) 20vw, 40vw', md: '(min-width: 1024px) 33vw, 90vw', lg: '(min-width: 1024px) 60vw, 100vw' };
</script>

{#snippet tile(text: string, cls: string)}
	<span class={cn('inline-flex items-baseline rounded-[22%] bg-background leading-none font-semibold tracking-[-0.03em] text-foreground shadow-[0_18px_40px_-14px_color-mix(in_oklab,black_80%,transparent)]', cls)}>{text}<i aria-hidden="true" class="ml-[0.07em] inline-block size-[0.3em] bg-mark-square"></i></span>
{/snippet}

<div class={cn('post-cover dark @container relative isolate overflow-hidden bg-background text-foreground', className)}>
	{#if cover.style === 'recap'}
		<div class="grid h-full grid-cols-2">
			<div class="flex flex-col justify-center gap-[3cqw] px-[6cqw]">
				<p class="font-mono text-[max(0.55rem,2.2cqw)] text-muted-foreground uppercase">{cover.sub}</p>
				<p class="text-[max(0.9rem,6.4cqw)] leading-[0.98] font-medium tracking-[-0.035em]">{cover.label}</p>
				<span class="w-fit rounded-sm bg-primary px-[1.4cqw] py-[0.4cqw] font-mono text-[max(0.5rem,1.8cqw)] text-primary-foreground uppercase">new</span>
			</div>
			<div class="relative grid place-items-center overflow-hidden">
				<div class={cn('absolute inset-0 -z-10', zoom && 'zoom')}>
					<ShaderMaterial preset={cover.preset} rendering="image" {loading} controls={false} sizes={sizes[size]} class="absolute inset-0" />
				</div>
				{@render tile(cover.symbol ?? 'Bl', 'px-[3cqw] py-[2.4cqw] text-[max(1rem,7cqw)]')}
			</div>
		</div>
	{:else}
		<div class={cn('absolute inset-0 -z-10', zoom && 'zoom')}>
			<ShaderMaterial preset={cover.preset} rendering="image" {loading} controls={false} sizes={sizes[size]} class="absolute inset-0" />
		</div>
		<div aria-hidden="true" class="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklab,black_45%,transparent),transparent)]"></div>
		<div class="grid h-full place-items-center">
			<div class="flex flex-col items-center gap-[2cqw]">
				<div class="flex items-center gap-[2.4cqw]">
					{@render tile(cover.symbol ?? 'Bl', 'px-[2cqw] py-[1.6cqw] text-[max(0.8rem,4.6cqw)]')}
					<span class="text-[max(1.1rem,8cqw)] leading-none font-semibold tracking-[-0.045em] text-white">{cover.label}</span>
				</div>
				{#if cover.sub}<span class="rounded-full bg-background/80 px-[2cqw] py-[0.6cqw] font-mono text-[max(0.55rem,2cqw)] text-foreground backdrop-blur-md">{cover.sub}</span>{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.zoom {
		transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	:global(.group:hover) .zoom,
	:global(.group:focus-visible) .zoom {
		transform: scale(1.06);
	}
	@media (prefers-reduced-motion: reduce) {
		.zoom {
			transition: none;
		}
		:global(.group:hover) .zoom {
			transform: none;
		}
	}
</style>
