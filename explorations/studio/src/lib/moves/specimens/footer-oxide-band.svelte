<script lang="ts">
	import FooterLinks from './footer-links.svelte';
	import BandArcs from '$brand/components/band-arcs.svelte';
</script>

<footer class="band-orange relative isolate flex flex-col gap-10 overflow-hidden px-6 pt-12 pb-8 @3xl:px-10" style="--fl-accent: var(--on-orange)">
	<BandArcs class="absolute top-0 right-[-25%] -z-10 h-[70%] w-auto opacity-80" />
	<FooterLinks />
	<div class="@container overflow-hidden border-t pt-8">
		<span class="block pb-[0.16em] leading-[0.74] font-semibold tracking-[-0.05em] whitespace-nowrap" style="font-size: 33cqw">hmziq<i class="sq" aria-hidden="true"></i></span>
	</div>
	<p class="text-[14px]">© 2026 hmziq. Free and open source where it says so.</p>
</footer>

<style>
	.sq {
		display: inline-block;
		width: 0.36em;
		height: 0.36em;
		margin-left: 0.07em;
		background: var(--on-orange);
	}
</style>
