<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		items,
		label = 'On this page',
		class: className
	}: {
		items: { id: string; label: string }[];
		label?: string;
		class?: string;
	} = $props();

	let current = $state('');

	$effect(() => {
		let raf = 0;
		const spy = () => {
			raf = 0;
			const line = innerHeight * 0.3;
			let id = items[0]?.id ?? '';
			for (const i of items) {
				const el = document.getElementById(i.id);
				if (el && el.getBoundingClientRect().top <= line) id = i.id;
			}
			current = id;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(spy);
		};
		spy();
		addEventListener('scroll', onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			removeEventListener('scroll', onScroll);
		};
	});

	function go(id: string) {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
		current = id;
	}
</script>

<nav aria-label={label} class={cn('section-toc', className)}>
	<p class="mb-3 font-mono text-xs text-muted-foreground uppercase">{label}</p>
	<ul class="flex flex-col border-l border-border">
		{#each items as item (item.id)}
			{@const on = item.id === current}
			<li>
				<button
					type="button"
					aria-current={on ? 'location' : undefined}
					onclick={() => go(item.id)}
					class={cn('relative -ml-px block w-full border-l py-1.5 pr-2 pl-4 text-left text-[0.9rem] leading-snug transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50', on ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}
				>{item.label}</button>
			</li>
		{/each}
	</ul>
</nav>
