<!-- Picture cards in a grid of one, two or three columns. With `filter` set, pills above it narrow the
     cards to one group (each item's `group`), counting what each pill holds, and the cards slide to
     their new places. -->
<script lang="ts">
	import { flip } from "svelte/animate";
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import PictureCard, { type PictureItem } from "./picture-card.svelte";

	let {
		items,
		/** The link for items without their own. */
		href = "#",
		/** The pills' label for screen readers ("Where it runs"); set it to show the pills. */
		filter,
		/** The pill that shows everything. */
		all = "All",
		class: className,
	}: { items: PictureItem[]; href?: string; filter?: string; all?: string; class?: string } = $props();

	let picked = $state("");
	let still = $state(false);

	$effect(() => {
		still = reducedMotion();
	});

	const current = $derived(picked || all);
	const groups = $derived([all, ...new Set(items.map((p) => p.group).filter((g): g is string => !!g))]);
	const shown = $derived(current === all ? items : items.filter((p) => p.group === current));
	const count = (g: string) => (g === all ? items.length : items.filter((p) => p.group === g).length);
</script>

<div data-slot="picture-grid" class={cn("flex min-w-0 flex-col gap-8", className)}>
	{#if filter}
		<div role="radiogroup" aria-label={filter} class="flex flex-wrap gap-1.5">
			{#each groups as g (g)}
				<button
					type="button"
					role="radio"
					aria-checked={current === g}
					onclick={() => (picked = g)}
					class="group/pill inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] text-foreground ring-1 ring-foreground/15 transition-colors outline-none not-aria-checked:hover:ring-foreground/35 focus-visible:ring-3 focus-visible:ring-ring/50 aria-checked:bg-primary aria-checked:text-primary-foreground aria-checked:ring-primary"
				>
					{g}<span class="font-mono text-[11px] text-muted-foreground group-aria-checked/pill:text-inherit group-aria-checked/pill:opacity-80">{count(g)}</span>
				</button>
			{/each}
		</div>
	{/if}
	<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as p (p.title)}
			<div animate:flip={{ duration: still ? 0 : 300 }} class="flex min-w-0">
				<PictureCard title={p.title} dek={p.dek} meta={p.meta} tag={p.tag} art={p.art} href={p.href ?? href} class="w-full" />
			</div>
		{/each}
	</div>
</div>
