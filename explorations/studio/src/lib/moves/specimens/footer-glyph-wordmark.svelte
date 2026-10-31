<script lang="ts">
	import FooterLinks from './footer-links.svelte';
	import RasterWordmark from './raster-wordmark.svelte';
</script>

<footer data-pointer-host class="flex flex-col gap-8 px-6 pt-12 pb-8 @3xl:px-10">
	<FooterLinks />
	<div class="border-t pt-6">
		<RasterWordmark look="glyphs" pitch={13} reach={110} class="aspect-[3.3/1]" />
	</div>
	<div class="flex flex-wrap items-center justify-between gap-3 font-mono text-[12px] text-foreground">
		<span>© 2026 hmziq</span>
		<span>Run the cursor through the name</span>
	</div>
</footer>
