<!-- A tile for one kind of product: a material stage with the product on it (an AppMock), then its name,
     a line and a Tag on a plain panel. The whole tile is the link. Under the cursor the material
     shifts and the product tips toward it; still for reduced motion. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import ShaderMaterial from "./shader-material.svelte";
	import Tag from "./tag.svelte";

	let {
		/** The material behind the product. */
		preset,
		title,
		body,
		/** The Tag beside the arrow: the kind of product. */
		tag,
		href = "#",
		/** The product: an AppMock, a window, a terminal. */
		art,
		class: className,
	}: { preset: string; title: string; body: string; tag?: string; href?: string; art: Snippet; class?: string } = $props();

	let x = $state(0);
	let y = $state(0);
	let on = $state(false);
	let still = $state(false);

	$effect(() => {
		still = reducedMotion();
	});

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		x = ((e.clientX - r.left) / r.width - 0.5) * 2;
		y = ((e.clientY - r.top) / r.height - 0.5) * 2;
		on = !still;
	}
</script>

<a
	{href}
	data-slot="surface-tile"
	class={cn("group/surface relative isolate flex min-w-0 flex-col overflow-hidden rounded-2xl p-2 ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/60", className)}
	onpointermove={move}
	onpointerleave={() => (on = false)}
>
	<span aria-hidden="true" data-surface-material class="absolute -inset-[8%] -z-10 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]" style:transform={on ? `translate3d(${(-x * 2.5).toFixed(2)}%, ${(-y * 2.5).toFixed(2)}%, 0) scale(1.05)` : "none"}>
		<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0" />
	</span>
	<span class="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 [perspective:900px] sm:px-8">
		<span data-surface-art class="block w-full transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]" style:transform={on ? `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)` : "none"}>
			{@render art()}
		</span>
	</span>
	<span class="relative flex items-start justify-between gap-4 rounded-xl bg-background p-4">
		<span class="min-w-0">
			<span class="block text-lg font-medium tracking-tight text-foreground">{title}</span>
			<span class="mt-1 block text-[15px] leading-snug text-foreground/80">{body}</span>
		</span>
		<span class="flex shrink-0 items-center gap-2">
			{#if tag}<Tag class="hidden sm:inline-flex">{tag}</Tag>{/if}
			<span class="grid size-8 place-items-center rounded-full text-foreground ring-1 ring-foreground/15 transition-[background-color,color] duration-500 group-hover/surface:bg-primary group-hover/surface:text-primary-foreground motion-reduce:transition-none"><ArrowUpRight class="lucide size-4" /></span>
		</span>
	</span>
</a>
