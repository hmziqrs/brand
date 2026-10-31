<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';

	type Value = { title: string; body: string; preset: string };

	let { values, class: className }: { values: Value[]; class?: string } = $props();

	let rail: HTMLDivElement | undefined = $state();
	let progress = $state(0);
	const src = (p: string) => (shaderPosters[p] ?? shaderPosters['hammered-copper']).src;
	const onscroll = () => {
		if (!rail) return;
		const max = rail.scrollWidth - rail.clientWidth;
		progress = max > 0 ? rail.scrollLeft / max : 1;
	};
</script>

<div class={cn('w-full', className)}>
	<div bind:this={rail} {onscroll} class="flex snap-x gap-4 overflow-x-auto pb-6 [scrollbar-width:none]" style:padding-inline="max(1rem, calc((100vw - 82rem) / 2 + 1.5rem))" style:scroll-padding-inline="max(1rem, calc((100vw - 82rem) / 2 + 1.5rem))">
		{#each values as v, i (v.title)}
			<article class="w-[80vw] shrink-0 snap-start sm:w-[24rem]">
				<div class="relative aspect-[4/3] overflow-hidden rounded-2xl">
					<img src={src(v.preset)} alt="" loading="lazy" class="absolute inset-0 size-full object-cover" />
					<span class="absolute bottom-3 left-3 rounded-lg bg-background px-3 py-2 text-[clamp(2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.05em] text-foreground">{String(i + 1).padStart(2, '0')}</span>
				</div>
				<h3 class="mt-5 text-[1.25rem] font-medium tracking-[-0.015em] text-foreground">{v.title}</h3>
				<p class="mt-2 text-[1rem] leading-relaxed text-foreground/85">{v.body}</p>
			</article>
		{/each}
	</div>
	<div class="mx-auto mt-4 w-full max-w-[82rem] px-4 sm:px-6" aria-hidden="true">
		<div class="relative h-px bg-[color-mix(in_oklab,var(--foreground)_18%,transparent)]">
			<span class="absolute top-1/2 size-2.5 -translate-y-1/2 bg-primary" style:left="calc({progress * 100}% - {progress * 10}px)"></span>
		</div>
	</div>
</div>
