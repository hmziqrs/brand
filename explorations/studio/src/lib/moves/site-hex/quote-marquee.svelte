<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		rows,
		class: className
	}: { rows: { text: string; who: string; stat?: string }[][]; class?: string } = $props();
</script>

<div class={cn('grid gap-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]', className)}>
	{#each rows as row, r (r)}
		<div class="marquee flex w-max gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none" style:animation-duration="{70 + r * 18}s" style:animation-direction={r % 2 ? 'reverse' : 'normal'}>
			{#each [0, 1] as copy (copy)}
				{#each row as q, i (copy + '-' + i)}
					<figure aria-hidden={copy === 1} class="flex w-[340px] shrink-0 flex-col border border-border bg-background p-5">
						{#if q.stat}
							<p class="text-5xl font-semibold tracking-[-0.04em] text-foreground">{q.stat}</p>
							<blockquote class="mt-2 text-lg leading-snug text-foreground">{q.text}</blockquote>
						{:else}
							<blockquote class="text-lg leading-snug text-foreground"><span class="mr-1 inline-block size-2 translate-y-[-2px] bg-[var(--orange)]"></span>{q.text}</blockquote>
						{/if}
						<figcaption class="mt-auto pt-5 font-mono text-[11px] text-muted-foreground">{q.who}</figcaption>
					</figure>
				{/each}
			{/each}
		</div>
	{/each}
</div>

<style>
	.marquee {
		animation: slide linear infinite;
	}
	@keyframes slide {
		to {
			transform: translateX(calc(-50% - 0.5rem));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			animation: none;
		}
	}
</style>
