<script lang="ts">
	import Scene from '$brand/components/scene.svelte';
	import Rings from '$brand/components/rings.svelte';

	let { kind = 'lattice', seed = 'claude-multi' }: { kind?: 'lattice' | 'network' | 'layers'; seed?: string } = $props();
</script>

<div class="absolute inset-0 overflow-hidden">
	<Scene {kind} {seed} class="absolute top-[-6%] right-[-16%] h-[112%] w-[92%]">
		{#snippet fallback()}<Rings {seed} class="absolute inset-0" />{/snippet}
	</Scene>
</div>
