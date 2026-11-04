<script lang="ts">
	import PostMeta from '$brand/blocks/content/post-meta.svelte';
	import { cn } from '$brand/utils.js';
	import BlogArt from './blog-art.svelte';
	import { item, posts, topicTone, type BlogPost } from './posts';

	let { items, here, class: className }: { items: BlogPost[]; here: string; class?: string } = $props();

	let box = $state<HTMLElement>();
	let active = $state<string | null>(null);
	let x = $state(0);
	let y = $state(0);
	let rx = $state(0.5);
	let ry = $state(0.5);
	let still = $state(false);
	let fine = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
	});

	function move(e: PointerEvent) {
		if (!box || e.pointerType === 'touch') return;
		const r = box.getBoundingClientRect();
		x = Math.min(e.clientX - r.left + 28, r.width - 300);
		y = e.clientY - r.top - 196;
		rx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
		ry = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
	}

	const number = (p: BlogPost) => String(posts.length - posts.indexOf(p)).padStart(2, '0');
	const current = $derived(items.find((p) => p.slug === active));
</script>

<div bind:this={box} role="presentation" data-slot="blog-hover-list" class={cn('relative', className)} onpointermove={move} onpointerleave={() => (active = null)}>
	<ul class="border-t border-border">
		{#each items as p (p.slug)}
			<li>
				<a
					href={here}
					onpointerenter={() => (active = p.slug)}
					onfocus={() => (active = p.slug)}
					onblur={() => (active = null)}
					class="group grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-border py-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:gap-x-8"
				>
					<span class="font-mono text-sm text-primary tabular-nums">{number(p)}</span>
					<span class="text-[1.25rem] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:decoration-1 group-hover:underline-offset-4 sm:text-[1.5rem]">{p.title}</span>
					<PostMeta post={item(p)} tone={topicTone} class="col-start-2 md:col-start-3 md:justify-end md:self-center" />
				</a>
			</li>
		{/each}
	</ul>
	{#if fine && current && current.art}
		<div
			aria-hidden="true"
			class="pointer-events-none absolute top-0 left-0 z-10 hidden aspect-[16/10] w-72 overflow-hidden rounded-xl bg-background shadow-xl ring-1 ring-foreground/15 md:block"
			style:transform={`translate3d(${x}px, ${y}px, 0)`}
			style:transition={still ? 'none' : 'transform 240ms cubic-bezier(0.2, 0.7, 0.1, 1)'}
		>
			{#key current.slug}<BlogArt kind={current.art} x={rx} y={ry} on {still} />{/key}
		</div>
	{/if}
</div>
