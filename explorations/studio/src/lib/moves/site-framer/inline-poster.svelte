<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { SiteMock } from './site';

	let { sites, every = 1600, class: className }: { sites: SiteMock[]; every?: number; class?: string } = $props();

	let i = $state(0);
	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches || sites.length < 2) return;
		const id = setInterval(() => (i = (i + 1) % sites.length), every);
		return () => clearInterval(id);
	});
	const faces = { sans: 'font-sans', bricolage: 'font-bricolage', fraunces: 'font-fraunces', space: 'font-space', 'inter-tight': 'font-inter-tight', newsreader: 'font-newsreader', dot: 'font-dot' };
</script>

<span aria-hidden="true" class={cn('relative mx-[0.06em] inline-block h-[0.74em] w-[1.12em] -rotate-3 overflow-hidden rounded-[0.12em] border border-border align-[-0.04em] shadow-[0_0.2em_0.4em_-0.15em_color-mix(in_oklab,black_70%,transparent)]', className)}>
	{#each sites as s, k (s.name)}
		<span class="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none" style:opacity={k === i ? 1 : 0}>
			<ShaderMaterial preset={s.preset} rendering="image" controls={false} loading="eager" sizes="200px" class="absolute inset-0 h-full w-full" />
			<span class={cn('absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,color-mix(in_oklab,black_75%,transparent),transparent)] px-[0.08em] pt-[0.1em] pb-[0.04em] text-left text-[0.16em] leading-none font-semibold tracking-[-0.02em] text-white', faces[s.face ?? 'sans'])}>{s.name}</span>
		</span>
	{/each}
</span>
