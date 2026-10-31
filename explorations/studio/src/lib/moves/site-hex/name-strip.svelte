<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		label = 'Example teams · names invented for this study',
		names = ['Halden', 'orbit/dental', 'MIRO FARMS', 'Tessel', 'northwind', 'Kestrel Bank', 'lumen&co', 'PARCEL9', 'Sable', 'fjordline', 'Quill', 'Marrow'],
		class: className
	}: { label?: string; names?: string[]; class?: string } = $props();

	const looks = ['font-sans font-bold tracking-tight', 'font-mono tracking-tight', 'font-space font-semibold uppercase tracking-[0.12em] text-[0.8em]', 'font-bricolage font-extrabold', 'font-inter-tight font-medium lowercase', 'font-sans font-semibold uppercase tracking-[0.2em] text-[0.75em]'];
</script>

<section class={cn('mx-auto w-full max-w-[1320px] border-y border-border px-4 py-8 sm:px-8', className)}>
	<p class="mb-6 text-center font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
	<ul class="grid grid-cols-3 items-center gap-x-6 gap-y-6 text-center text-xl text-foreground sm:grid-cols-4 lg:grid-cols-6">
		{#each names as n, i (n)}
			<li class={cn('truncate opacity-90 transition-opacity hover:opacity-100', looks[i % looks.length])}>{n}</li>
		{/each}
	</ul>
</section>
