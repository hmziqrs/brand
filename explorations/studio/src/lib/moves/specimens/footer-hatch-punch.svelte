<script lang="ts">
	import DiagonalHatch from './diagonal-hatch.svelte';
	import FooterLinks from './footer-links.svelte';
</script>

<footer data-pointer-host class="relative isolate flex flex-col gap-10 overflow-hidden px-6 pt-12 pb-8 @3xl:px-10">
	<div class="absolute inset-0 -z-10"><DiagonalHatch from="bottom-right" reach={200} /></div>
	<div class="panel rounded-2xl border p-6 @3xl:p-8">
		<FooterLinks />
	</div>
	<div class="@container">
		<span class="punch block pb-[0.1em] leading-[0.74] font-semibold tracking-[-0.055em] whitespace-nowrap" aria-label="hmziq">hmziq<i class="sq" aria-hidden="true"></i></span>
	</div>
	<p class="panel self-start rounded-md border px-3 py-1.5 text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
</footer>

<style>
	.panel {
		background: color-mix(in oklab, var(--background) 92%, transparent);
		backdrop-filter: blur(10px);
	}
	.punch {
		font-size: 33cqw;
		color: var(--background);
		-webkit-text-stroke: 1.5px var(--mark-square);
		paint-order: stroke fill;
	}
	.sq {
		display: inline-block;
		width: 0.36em;
		height: 0.36em;
		margin-left: 0.07em;
		background: var(--mark-square);
	}
</style>
