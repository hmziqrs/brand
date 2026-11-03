<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';

	let { preset = 'oxide-bloom', live = true, veil = 0.8, cell = 56, class: className }: { preset?: string; live?: boolean; veil?: number; cell?: number; class?: string } = $props();
</script>

<div class={cn('absolute inset-0 isolate overflow-hidden', className)}>
	<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} loading="eager" class="absolute inset-0 -z-20 h-full w-full" />
	<RustGridField mode="reveal" {cell} {veil} fade="none" gap={0} line="--border" class="-z-10" />
</div>
