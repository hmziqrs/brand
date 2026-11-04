<script lang="ts">
	import PictureCard from '$brand/components/picture-card.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import { about } from './content';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();
	const s = about.stack;
</script>

<section data-slot="stack-cards" class={className}>
	<SectionHead kicker={s.kicker} title={s.title} lede={s.aside} />
	<div class="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
		{#each s.items as d (d.n)}
			<PictureCard href={here} art={d.art} tag={`${d.n} / ${d.name}`} title={d.title} dek={d.dek} meta={d.tools.map((t) => t.label).join(' · ')} as="h3" />
		{/each}
	</div>
	<p class="mt-12 max-w-[46rem] text-lg leading-snug text-foreground/85">{s.foot}</p>
</section>
