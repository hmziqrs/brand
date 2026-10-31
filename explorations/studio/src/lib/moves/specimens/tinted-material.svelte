<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { cn } from '$brand/utils.js';

	let {
		preset,
		mode,
		source = 'light-on-dark',
		native = false,
		opacity = 1,
		class: className
	}: {
		preset: string;
		mode: 'dark' | 'light';
		source?: 'light-on-dark' | 'dark-on-light';
		native?: boolean;
		opacity?: number;
		class?: string;
	} = $props();

	const invert = $derived((mode === 'dark') !== (source === 'light-on-dark'));
	const keepNative = $derived(native);
</script>

<div class={cn('tint absolute inset-0', keepNative && 'native', className)}>
	{#if keepNative}
		<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} class={cn('absolute inset-0', mode === 'light' && '[&_img]:invert [&_img]:hue-rotate-180 [&_img]:saturate-150')} {opacity} />
	{:else}
		<ShaderMaterial
			{preset}
			rendering="image"
			loading="eager"
			controls={false}
			transparent
			blend={mode === 'dark' ? 'multiply' : 'screen'}
			{opacity}
			class={cn('absolute inset-0 [&_img]:grayscale [&_img]:contrast-125', invert && '[&_img]:invert')}
		/>
	{/if}
</div>

<style>
	.tint {
		background: var(--orange);
	}
	.tint.native {
		background: var(--background);
	}
</style>
