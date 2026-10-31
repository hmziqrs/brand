<script lang="ts">
	import MaterialCover from './material-cover.svelte';
	import Marker from '$brand/components/marker.svelte';
	import { topicColor, type Post } from './copy';
	import { cn } from '$brand/utils.js';

	let { items, href = '#/p/content/post-1', class: className }: { items: (Post & { n: string })[]; href?: string; class?: string } = $props();

	let box: HTMLElement | undefined = $state();
	let active = $state<string | null>(null);
	let x = $state(0);
	let y = $state(0);
	let still = $state(false);
	let fine = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
	});

	function move(e: PointerEvent) {
		if (!box || e.pointerType === 'touch') return;
		const r = box.getBoundingClientRect();
		x = e.clientX - r.left;
		y = e.clientY - r.top;
	}
	const current = $derived(items.find((p) => p.slug === active));
</script>

<div bind:this={box} role="presentation" data-move="hover-preview-list" class={cn('relative', className)} onpointermove={move} onpointerleave={() => (active = null)}>
	<ul class="border-t">
		{#each items as p (p.slug)}
			<li>
				<a
					{href}
					onpointerenter={() => (active = p.slug)}
					onfocus={() => (active = p.slug)}
					onblur={() => (active = null)}
					class="group grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 border-b py-5 no-underline transition-[padding] duration-300 ease-out hover:pl-2 motion-reduce:transition-none motion-reduce:hover:pl-0 sm:grid-cols-[4rem_minmax(0,1fr)_8rem_7rem]"
				>
					<span class="font-mono text-sm text-primary tabular-nums">{p.n}</span>
					<span class="text-[1.25rem] leading-snug font-medium tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary sm:text-[1.5rem]">{p.title}</span>
					<span class="col-start-2 hidden items-center gap-2 text-sm font-medium sm:col-start-3 sm:inline-flex" style:color={topicColor[p.topic]}><Marker class="size-2" />{p.topic}</span>
					<span class="col-start-2 text-sm text-muted-foreground sm:col-start-4 sm:text-right">{p.date}</span>
				</a>
			</li>
		{/each}
	</ul>
	{#if fine && current}
		<div
			aria-hidden="true"
			class="pointer-events-none absolute top-0 left-0 z-10 hidden w-72 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-foreground/10 md:block"
			style:transform={`translate3d(${x + 28}px, ${y - 110}px, 0) rotate(${still ? 0 : -3}deg)`}
			style:transition={still ? 'none' : 'transform 260ms cubic-bezier(0.2, 0.7, 0.1, 1)'}
		>
			{#key current.slug}
				<MaterialCover seed={current.slug} number={current.n} sizes="18rem" class="aspect-[4/3]" />
			{/key}
		</div>
	{/if}
</div>
