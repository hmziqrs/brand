<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import DeskWindow from '$moves/review/parts/site-clicky/desk-window.svelte';
	import DotDesk from '$moves/review/parts/site-clicky/dot-desk.svelte';

	let { class: className }: { class?: string } = $props();

	const wins = [
		{ pos: 'top-[8%] left-[1.5%] w-[130px] rotate-[-2deg]', preset: 'copper-sweep', file: 'patina.mov', ratio: 'aspect-[3/4]' },
		{ pos: 'top-[5%] right-[1.5%] w-[180px] rotate-[1.5deg]', preset: 'liquid-ink', file: 'release-notes.mov', ratio: 'aspect-[16/10]' },
		{ pos: 'bottom-[8%] left-[4%] w-[190px]', preset: 'hammered-copper', file: 'build-log.mov', ratio: 'aspect-[16/11]' },
		{ pos: 'bottom-[10%] right-[3%] w-[150px] rotate-[-1deg]', preset: 'sediment', file: 'sketch.png', ratio: 'aspect-[3/4]' }
	];
</script>

<div class={cn('absolute inset-0 isolate overflow-hidden', className)}>
	<DotDesk />
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_44%_42%_at_50%_52%,var(--background)_45%,transparent_100%)] max-md:hidden"></div>
	<div class="pointer-events-none absolute inset-0 hidden lg:block">
		{#each wins as w (w.file)}
			<div class={cn('pointer-events-auto absolute', w.pos)}>
				<DeskWindow drag caption={w.file} body={cn('overflow-hidden', w.ratio)}>
					<ShaderMaterial preset={w.preset} rendering="image" controls={false} sizes="260px" class="pointer-events-none absolute inset-0 h-full w-full" />
				</DeskWindow>
			</div>
		{/each}
	</div>
</div>
