<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import RippleRings from './ripple-rings.svelte';
	import FooterLinks from './footer-links.svelte';
</script>

<footer data-pointer-host class="relative isolate overflow-hidden">
	<div class="absolute inset-0 -z-10"><RippleRings every={44} /></div>
	<div class="flex min-h-[420px] flex-col items-center justify-center gap-7 px-6 pt-20 pb-14 text-center">
		<span class="flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-foreground uppercase"><i class="sq-sm"></i>claude-multi · free and open source</span>
		<h2 class="max-w-[16ch] text-[clamp(2.5rem,8cqw,6rem)] leading-[0.92] font-medium tracking-[-0.045em] text-foreground">One command away from any provider.</h2>
		<div class="flex flex-wrap justify-center gap-2">
			<Button size="lg">Install claude-multi</Button>
			<Button size="lg" variant="outline" class="bg-background">Read the guide <ArrowRight class="lucide" /></Button>
		</div>
	</div>
	<div class="panel mx-4 mb-4 rounded-2xl border p-6 @3xl:mx-8 @3xl:mb-8 @3xl:p-8">
		<FooterLinks family={false} />
	</div>
</footer>

<style>
	.panel {
		background: color-mix(in oklab, var(--background) 90%, transparent);
		backdrop-filter: blur(12px);
	}
	.sq-sm {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--mark-square);
	}
</style>
