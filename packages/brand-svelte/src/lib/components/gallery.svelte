<!-- A grid of pictures that open large in a viewer: arrows or the arrow keys move through them,
     with the caption and "3 of 12" under the picture. Escape closes it. -->
<script lang="ts">
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import X from "@lucide/svelte/icons/x";
	import { Dialog } from "bits-ui";
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";

	type Picture = { src: string; srcset?: string; alt: string; caption?: string };

	let {
		label,
		pictures,
		/** Columns from md up; two on phones. */
		columns = 4,
		aspect = "aspect-[4/3]",
		class: className,
	}: {
		label: string;
		pictures: Picture[];
		columns?: 2 | 3 | 4;
		aspect?: string;
		class?: string;
	} = $props();

	let open = $state(false);
	let index = $state(0);
	const current = $derived(pictures[index]);
	const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" } as const;

	function show(i: number) {
		index = (i + pictures.length) % pictures.length;
	}

	function onkey(event: KeyboardEvent) {
		if (event.key === "ArrowRight") show(index + 1);
		else if (event.key === "ArrowLeft") show(index - 1);
	}
</script>

<ul data-slot="gallery" aria-label={label} class={cn("grid grid-cols-2 gap-2", cols[columns], className)}>
	{#each pictures as p, i (p.src)}
		<li>
			<button type="button" onclick={() => { index = i; open = true; }} class={cn("group relative block w-full overflow-hidden rounded-lg ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/50", aspect)}>
				<img src={p.src} srcset={p.srcset} sizes="(min-width: 768px) 25vw, 50vw" alt={p.alt} loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover" />
				<span class="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/15"></span>
				<span class="sr-only">Open {p.alt}</span>
			</button>
		</li>
	{/each}
</ul>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-background/90 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
		<Dialog.Content onkeydown={onkey} class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 outline-none sm:p-10">
			<Dialog.Title class="sr-only">{label}</Dialog.Title>
			{#if current}
				<figure class="flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center gap-3">
					<img src={current.src} srcset={current.srcset} sizes="90vw" alt={current.alt} class="max-h-full min-h-0 w-auto max-w-full rounded-lg object-contain ring-1 ring-foreground/10" />
					<figcaption class="flex w-full max-w-5xl items-center justify-between gap-4 text-sm">
						<span class="text-muted-foreground">{current.caption ?? current.alt}</span>
						<span class="shrink-0 text-muted-foreground tabular-nums" aria-live="polite">{index + 1} of {pictures.length}</span>
					</figcaption>
				</figure>
			{/if}
			<div class="flex gap-2">
				<Button variant="outline" size="icon" aria-label="Previous picture" onclick={() => show(index - 1)}><ArrowLeft class="lucide" /></Button>
				<Button variant="outline" size="icon" aria-label="Next picture" onclick={() => show(index + 1)}><ArrowRight class="lucide" /></Button>
			</div>
			<Dialog.Close>
				{#snippet child({ props })}<Button {...props} variant="ghost" size="icon" aria-label="Close" class="absolute top-4 right-4"><X class="lucide" /></Button>{/snippet}
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
