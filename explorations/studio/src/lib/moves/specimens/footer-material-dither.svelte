<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import FooterLinks from './footer-links.svelte';
	import RasterWordmark from './raster-wordmark.svelte';

	let { mode }: { mode: 'dark' | 'light' } = $props();
</script>

<footer data-pointer-host class="relative isolate overflow-hidden">
	<ShaderMaterial preset={mode === 'dark' ? 'cast-iron' : 'fibrous-paper'} rendering="image" loading="eager" controls={false} class="absolute inset-0 -z-20" />
	<div class="scrim absolute inset-0 -z-10"></div>
	<div class="flex flex-col gap-6 p-4 @3xl:p-8">
		<div class="panel rounded-2xl border p-6 @3xl:p-8">
			<FooterLinks />
		</div>
		<RasterWordmark look="dither" pitch={3} />
		<p class="panel self-start rounded-md border px-3 py-1.5 text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
	</div>
</footer>

<style>
	.scrim {
		background: linear-gradient(to bottom, color-mix(in oklab, var(--background) 10%, transparent) 30%, color-mix(in oklab, var(--background) 68%, transparent));
	}
	.panel {
		background: color-mix(in oklab, var(--background) 88%, transparent);
		backdrop-filter: blur(16px);
	}
</style>
