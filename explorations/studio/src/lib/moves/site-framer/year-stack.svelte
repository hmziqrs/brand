<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { items, class: className }: { items: { year: string; title: string; body: string }[]; class?: string } = $props();

	let active = $state(0);
	let rows: HTMLElement[] = $state([]);

	$effect(() => {
		const io = new IntersectionObserver(
			(es) => {
				for (const e of es) if (e.isIntersecting) active = Number((e.target as HTMLElement).dataset.i);
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);
		rows.forEach((r) => r && io.observe(r));
		return () => io.disconnect();
	});
</script>

<ol class={cn('min-w-0', className)}>
	{#each items as it, i (it.year)}
		<li bind:this={rows[i]} data-i={i} class="grid items-center gap-4 py-6 md:grid-cols-[1.2fr_1fr] md:gap-10 md:py-10">
			<p
				class={cn('text-[clamp(5.5rem,17vw,15rem)] leading-[0.8] font-semibold tracking-[-0.07em] tabular-nums transition-colors duration-500 motion-reduce:transition-none', active === i ? 'text-primary' : 'text-foreground/15')}
				style:padding-left={`${(i % 3) * 8}%`}
			>
				{it.year}
			</p>
			<div class={cn('max-w-[36ch] transition-opacity duration-500 motion-reduce:transition-none', active === i ? 'opacity-100' : 'opacity-45')}>
				<p class="text-2xl font-medium tracking-[-0.025em]">{it.title}</p>
				<p class="mt-2 text-xl leading-snug">{it.body}</p>
			</div>
		</li>
	{/each}
</ol>
