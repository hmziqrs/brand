<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		label = 'Sites built by teams like these (names invented for this study)',
		marks = [
			{ n: 'Northvane', f: 'font-space font-semibold tracking-[-0.04em]' },
			{ n: 'tallow&co', f: 'font-fraunces font-semibold' },
			{ n: 'QUAYSIDE', f: 'font-inter-tight font-bold tracking-[0.18em] text-[0.8em]' },
			{ n: 'halden', f: 'font-newsreader font-medium text-[1.1em]' },
			{ n: 'pellet', f: 'font-dot font-bold' },
			{ n: 'Okra', f: 'font-bricolage font-extrabold tracking-[-0.05em]' },
			{ n: 'Lumen/ops', f: 'font-geist-mono font-medium tracking-[-0.03em] text-[0.85em]' },
			{ n: 'Brightwell', f: 'font-sans font-semibold tracking-[-0.04em]' }
		],
		class: className
	}: { label?: string; marks?: { n: string; f: string }[]; class?: string } = $props();
</script>

<div class={cn('text-center', className)}>
	<p class="text-sm text-foreground/60">{label}</p>
	<ul class="mx-auto mt-8 grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-8 text-[1.625rem] sm:grid-cols-4">
		{#each marks as m (m.n)}
			<li class={cn('text-foreground/55 transition-colors hover:text-primary', m.f)}>{m.n}</li>
		{/each}
	</ul>
</div>
