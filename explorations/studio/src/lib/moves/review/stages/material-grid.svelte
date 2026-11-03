<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';

	let {
		preset = 'oxide-bloom',
		live = true,
		veil = 0.8,
		veilLight = 0.95,
		presetLight = 'copper-sweep',
		stain = '--teal',
		stainLight = '--orange',
		cell = 56,
		class: className
	}: {
		preset?: string;
		live?: boolean;
		veil?: number;
		veilLight?: number;
		presetLight?: string;
		stain?: string;
		stainLight?: string;
		cell?: number;
		class?: string;
	} = $props();

	let dark = $state(true);
	$effect(() => {
		const root = document.documentElement;
		const read = () => (dark = root.classList.contains('dark'));
		read();
		const watch = new MutationObserver(read);
		watch.observe(root, { attributes: true, attributeFilter: ['class'] });
		return () => watch.disconnect();
	});
</script>

<div class={cn('absolute inset-0 isolate overflow-hidden', className)}>
	<ShaderMaterial preset={dark ? preset : presetLight} rendering={live ? 'live' : 'image'} animated={live} controls={false} loading="eager" class="absolute inset-0 -z-20 h-full w-full" />
	<RustGridField mode="reveal" {cell} veil={dark ? veil : veilLight} stain={dark ? stain : stainLight} fade="none" gap={0} line="--border" class="-z-10" />
</div>
