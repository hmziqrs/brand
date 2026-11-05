<script lang="ts">
	import { cn } from '$brand/utils.js';
	import GlyphRain from '$moves/review/parts/specimens/glyph-rain.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<div class={cn('absolute inset-0 overflow-hidden opacity-80 [mask-image:linear-gradient(to_right,rgb(0_0_0/0.18)_0%,rgb(0_0_0/0.35)_38%,black_78%)]', className)}><GlyphRain size={14} density={0.3} /></div>
