<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import PlateStack from '$moves/review/parts/voidzero/plate-stack.svelte';
	import ModeBand from '$moves/review/parts/voidzero/mode-band.svelte';

	const plates = [
		{ label: 'five review rounds', side: 'left' as const },
		{ label: 'tests', side: 'right' as const },
		{ label: 'docs', side: 'left' as const },
		{ label: 'the tool', side: 'right' as const, preset: 'copper-sweep', symbol: 'Fx' },
		{ label: 'your app', side: 'left' as const }
	];
</script>

<ModeBand frame inner="px-6 pt-12 pb-6 sm:px-10 md:pt-14">
	<div class="flex flex-col items-center text-center">
		<p class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"><span aria-hidden="true" class="size-1.5 bg-mark-square"></span>4 tools · all finished</p>
		<h1 class="mt-6 max-w-[14ch] text-[clamp(3rem,7.6vw,7rem)] leading-[0.98] font-medium tracking-[-0.045em] text-balance">Free Rust tools, finished before they ship.</h1>
		<p class="mt-6 max-w-[46ch] text-xl leading-relaxed text-foreground/85">Open-source building blocks for desktop apps and the command line. Each one ships with docs, tests and five rounds of review, or it waits.</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<Button href="#/p/voidzero/freeoxide-1" size="lg" class="px-5">Browse the tools<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			<Button href="https://github.com/freeoxide" size="lg" variant="outline" class="px-5"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
		</div>
	</div>
	<PlateStack {plates} class="mx-auto mt-6 max-w-[920px]" />
</ModeBand>
