<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';

	let {
		sections,
		label = 'On this page',
		foot,
		children,
		class: className
	}: {
		sections: { id: string; label: string; n?: string }[];
		label?: string;
		foot?: Snippet;
		children: Snippet;
		class?: string;
	} = $props();

	let current = $state('');

	$effect(() => {
		const ids = sections.map((s) => s.id);
		let frame = 0;
		const measure = () => {
			frame = 0;
			const line = innerHeight * 0.35;
			let pick = ids[0] ?? '';
			for (const id of ids) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= line) pick = id;
			}
			current = pick;
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		measure();
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll);
		return () => {
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	});

	function go(id: string) {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
	}
</script>

<div data-slot="spec-rail" class={cn('mx-auto grid max-w-[1320px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12', className)}>
	<aside class="sticky top-0 z-20 -mx-4 border-b bg-background/90 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:top-6 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
		<p class="mb-3 hidden font-mono text-[0.6875rem] tracking-wide text-muted-foreground uppercase lg:block">{label}</p>
		<nav aria-label={label} class="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
			{#each sections as s, i (s.id)}
				<button
					type="button"
					onclick={() => go(s.id)}
					aria-current={current === s.id ? 'true' : undefined}
					class={cn(
						'flex shrink-0 items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:border-l-2 lg:rounded-l-none',
						current === s.id ? 'bg-primary/12 text-foreground lg:border-primary' : 'text-muted-foreground hover:text-foreground lg:border-transparent'
					)}
				>
					<span class={cn('font-mono text-[0.6875rem]', current === s.id ? 'text-primary' : '')}>{s.n ?? String(i + 1).padStart(2, '0')}</span>{s.label}
				</button>
			{/each}
		</nav>
		{#if foot}<div class="mt-6 hidden lg:block">{@render foot()}</div>{/if}
	</aside>
	<div class="flex min-w-0 flex-col">{@render children()}</div>
</div>
