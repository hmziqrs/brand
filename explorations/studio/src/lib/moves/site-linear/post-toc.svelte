<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Item = { id: string; label: string };

	let { items, class: className }: { items: Item[]; class?: string } = $props();

	let current = $state('');
	let progress = $state(0);

	$effect(() => {
		const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) current = e.target.id;
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);
		els.forEach((e) => io.observe(e));
		const on = () => {
			const h = document.documentElement.scrollHeight - innerHeight;
			progress = h > 0 ? Math.min(1, scrollY / h) : 0;
		};
		on();
		addEventListener('scroll', on, { passive: true });
		return () => {
			io.disconnect();
			removeEventListener('scroll', on);
		};
	});

	function go(e: MouseEvent, id: string) {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
	}
</script>

<div aria-hidden="true" class="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary" style:transform="scaleX({progress})"></div>
<nav data-slot="post-toc" aria-label="On this page" class={cn('flex flex-col gap-1', className)}>
	<p class="mb-2 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">On this page</p>
	{#each items as it (it.id)}
		<a
			href="#/p/site-linear/post"
			onclick={(e) => go(e, it.id)}
			aria-current={current === it.id ? 'true' : undefined}
			class="flex items-center gap-2.5 border-l border-border py-1.5 pl-3 text-[15px] text-foreground/85 transition-colors hover:text-foreground aria-[current=true]:border-primary aria-[current=true]:text-foreground motion-reduce:transition-none"
		>
			{it.label}
		</a>
	{/each}
</nav>
