<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BandArcs from '$brand/components/band-arcs.svelte';
	import { Button } from '$brand/ui/button/index.js';
</script>

<div class="band-orange relative isolate overflow-hidden px-6 py-14 @2xl:px-10 @2xl:py-20">
	<BandArcs class="absolute top-0 right-[-20%] -z-10 h-full w-auto" />
	<div class="flex max-w-[600px] flex-col gap-6">
		<span class="font-mono text-[11px] tracking-[0.14em] uppercase">■ Closing band</span>
		<h2 class="text-[clamp(2.6rem,8.5cqw,4.6rem)] leading-[0.92] font-medium tracking-[-0.045em]">Bring the provider you already pay for.</h2>
		<p class="max-w-[40ch] text-[18px] leading-relaxed">Install in fourteen seconds. Switch back just as fast.</p>
		<div class="flex flex-wrap gap-2">
			<Button size="lg" class="px-4">Install claude-multi</Button>
			<Button size="lg" variant="outline" class="px-4">Read the source <ArrowRight class="lucide" /></Button>
		</div>
	</div>
</div>
