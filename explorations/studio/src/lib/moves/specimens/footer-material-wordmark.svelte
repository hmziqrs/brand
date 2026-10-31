<script lang="ts">
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import FooterLinks from './footer-links.svelte';

	let { preset = 'oxide-bloom' }: { preset?: string } = $props();
	const src = $derived((shaderPosters[preset] ?? shaderPosters['oxide-bloom']).src);
</script>

<footer class="flex flex-col gap-10 px-6 pt-12 pb-8 @3xl:px-10">
	<FooterLinks />
	<div class="@container overflow-hidden border-t pt-8">
		<span class="mat block pb-[0.16em] leading-[0.74] font-semibold tracking-[-0.05em] whitespace-nowrap" style:background-image={`url(${src})`} aria-label="hmziq">hmziq<i class="sq" aria-hidden="true"></i></span>
	</div>
	<p class="text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
</footer>

<style>
	.mat {
		font-size: 33cqw;
		background-size: cover;
		background-position: 30% 40%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.sq {
		display: inline-block;
		width: 0.36em;
		height: 0.36em;
		margin-left: 0.07em;
		background: var(--mark-square);
	}
	:global(.light) .mat {
		filter: saturate(1.15) contrast(1.05);
	}
</style>
