<script lang="ts">
	import Book3d from './book-3d.svelte';
	import { cn } from '$brand/utils.js';

	let { title = 'The economics of customer context', note = 'An independent-style impact study · example', class: className }: { title?: string; note?: string; class?: string } = $props();
</script>

<div class={cn('relative grid aspect-[5/4] place-items-center overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card', className)}>
	<svg aria-hidden="true" viewBox="0 0 500 400" class="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
		{#each [70, 140, 210, 280] as r (r)}<circle cx="250" cy="200" {r} fill="none" stroke="color-mix(in oklab, var(--foreground) 16%, transparent)" stroke-width="1" />{/each}
		<line x1="0" y1="200" x2="500" y2="200" stroke="color-mix(in oklab, var(--foreground) 16%, transparent)" stroke-dasharray="4 6" />
	</svg>
	<Book3d {title} {note} eyebrow="contextline■" class="w-[42%]">
		{#snippet art()}
			<svg aria-hidden="true" viewBox="0 0 100 50" class="w-full">
				<circle cx="34" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="66" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="0.8" />
				<line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" stroke-width="0.6" stroke-dasharray="2 2" />
				<rect x="47" y="10" width="6" height="6" fill="currentColor" />
				<rect x="47" y="34" width="6" height="6" fill="currentColor" />
			</svg>
		{/snippet}
	</Book3d>
</div>
