<script lang="ts" module>
	import type { LineArtKind } from './line-art.svelte';

	export type Work = { name: string; kind: string; dek: string; meta: string; art: LineArtKind };
</script>

<script lang="ts">
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import LineArt from './line-art.svelte';

	let { work, href, class: className }: { work: Work; href: string; class?: string } = $props();

	let px = $state(0.5);
	let py = $state(0.5);
	let on = $state(false);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
		py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
		on = true;
	}
</script>

<a {href} data-slot="work-card" class={cn('group flex min-w-0 flex-col gap-4 outline-none', className)} onpointermove={move} onpointerleave={() => (on = false)}>
	<span class="relative isolate block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-300 group-hover:ring-foreground/25 group-focus-visible:ring-3 group-focus-visible:ring-ring/60">
		<LineArt kind={work.art} x={px} y={py} {on} {still} />
		<Tag class="absolute bottom-3 left-3">{work.kind}</Tag>
	</span>
	<span class="text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">{work.name}</span>
	<span class="line-clamp-3 text-base leading-snug text-foreground/85">{work.dek}</span>
	<span class="mt-auto text-sm text-foreground/75">{work.meta}</span>
</a>
