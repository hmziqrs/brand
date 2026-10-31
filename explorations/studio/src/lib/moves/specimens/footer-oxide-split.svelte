<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import FooterLinks from './footer-links.svelte';
</script>

<footer class="grid @3xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
	<div class="slab relative isolate flex min-h-[360px] flex-col justify-between gap-10 overflow-hidden p-6 @3xl:p-10">
		<i class="giant" aria-hidden="true"></i>
		<p class="font-mono text-[12px] tracking-[0.14em] uppercase">Made by one person</p>
		<div class="flex flex-col gap-4">
			<span class="text-[clamp(3rem,10cqw,7.5rem)] leading-[0.8] font-semibold tracking-[-0.055em]">hmziq</span>
			<a href="mailto:hello@hmziq.rs" class="mail inline-flex items-center gap-1.5 self-start text-[18px] font-medium">hello@hmziq.rs <ArrowUpRight class="lucide size-4" /></a>
		</div>
	</div>
	<div class="flex flex-col justify-between gap-10 p-6 @3xl:p-10">
		<FooterLinks />
		<p class="text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
	</div>
</footer>

<style>
	.slab {
		background: var(--orange);
		color: var(--on-orange);
	}
	.giant {
		position: absolute;
		right: -6%;
		bottom: -14%;
		z-index: -1;
		width: 58%;
		aspect-ratio: 1;
		background: color-mix(in oklab, var(--on-orange) 12%, var(--orange));
	}
	.mail {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}
</style>
