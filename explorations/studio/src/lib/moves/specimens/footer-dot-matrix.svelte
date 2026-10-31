<script lang="ts">
	import FooterLinks from './footer-links.svelte';
	import RasterWordmark from './raster-wordmark.svelte';
</script>

<footer data-pointer-host class="flex flex-col gap-8 px-6 pt-12 pb-8 @3xl:px-10">
	<FooterLinks />
	<div class="field border-t pt-6">
		<RasterWordmark look="dots" pitch={9} class="aspect-[3.4/1]" />
	</div>
	<div class="flex flex-wrap items-center justify-between gap-3 font-mono text-[12px] text-foreground">
		<span>© 2026 hmziq</span>
		<span>■ All systems switching</span>
	</div>
</footer>
