<script lang="ts">
	import StatTile from '$brand/components/stat-tile.svelte';
	import { facts } from './content';

	let { class: className }: { class?: string } = $props();
</script>

<section data-slot="fact-tiles" aria-label="Working with us" class={className}>
	<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">{facts.kicker}</p>
	<div class="mt-6 grid gap-4 md:grid-cols-3">
		{#each facts.items as f (f.value)}
			<StatTile value={f.value} label={f.label} tone={f.oxide ? 'oxide' : 'outline'} rings={f.oxide ? 'oxlabs taking new work' : undefined} class="[&>p:first-of-type]:text-[clamp(2.25rem,4.2vw,3.5rem)] [&>p:first-of-type]:leading-[0.98]" />
		{/each}
	</div>
</section>
