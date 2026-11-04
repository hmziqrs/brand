<!-- A bento of four surfaces a product or a studio ships to (a tall phone, a wide desktop, then web and
     the terminal), each a SurfaceTile with a real AppMock on its material, beside one oxide card with
     a status, a statement and the call to action. A SectionHead leads it on the wide Container. -->
<script lang="ts" module>
	export type Surface = {
		title: string;
		body: string;
		/** The Tag on the tile: the kind of product. */
		tag?: string;
		/** The material the app stands on. */
		preset: string;
		mock: { kind: "phone" | "desktop" | "web" | "terminal"; title?: string };
		href?: string;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import AppMock from "$brand/components/app-mock.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import SurfaceTile from "$brand/components/surface-tile.svelte";
	import SectionHead from "./section-head.svelte";

	let {
		kicker,
		title,
		/** The part of the title in oxide. */
		accent,
		lede,
		/** md makes the head a part of a bigger section: smaller, an h3. */
		size = "lg",
		/** Exactly four, in order: the tall one, the wide one, then two small ones. */
		surfaces,
		/** The oxide card: a status line with a pulse, a statement and a line; its rings are drawn from `seed`. */
		card,
		/** The oxide card's button. */
		cardActions,
		/** The link for surfaces without their own. */
		href = "#",
		class: className,
	}: {
		kicker?: string;
		title: string;
		accent?: string;
		lede?: string;
		size?: "lg" | "md";
		surfaces: Surface[];
		card?: { status?: string; title: string; body?: string; seed?: string };
		cardActions?: Snippet;
		href?: string;
		class?: string;
	} = $props();

	const place = [
		"sm:row-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1",
		"sm:col-span-1 lg:col-span-2 lg:col-start-2 lg:row-start-1",
		"lg:col-start-2 lg:row-start-2",
		"lg:col-start-3 lg:row-start-2",
	];
	const fit = { phone: "mx-auto max-w-[220px] bg-background", desktop: "mx-auto max-w-[440px] bg-background", web: "mx-auto max-w-[300px] bg-background", terminal: "mx-auto max-w-[300px]" };
</script>

{#snippet tile(s: Surface, i: number)}
	<SurfaceTile href={s.href ?? href} preset={s.preset} title={s.title} body={s.body} tag={s.tag} class={place[i]}>
		{#snippet art()}<AppMock kind={s.mock.kind} title={s.mock.title} class={fit[s.mock.kind]} />{/snippet}
	</SurfaceTile>
{/snippet}

<section data-slot="surface-bento" class={cn("py-24 sm:py-32", className)}>
	<Container size="wide">
		<SectionHead {kicker} {title} {accent} {lede} {size} />
		<div class={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(19rem,auto))]", size === "md" ? "mt-10" : "mt-12 md:mt-16")}>
			{#each surfaces.slice(0, 2) as s, i (s.title)}{@render tile(s, i)}{/each}
			{#if card}
				<article class="band-orange relative isolate flex min-h-72 flex-col justify-between gap-8 overflow-hidden rounded-2xl p-6 sm:p-7 lg:col-start-4 lg:row-span-2 lg:row-start-1">
					<CornerRings seed={card.seed ?? card.title} color="var(--on-orange)" class="pointer-events-none -z-10 w-3/4 opacity-60 [&_circle]:[stroke-width:0.5]" />
					{#if card.status}<p class="flex items-center gap-2 font-mono text-xs tracking-wide uppercase"><span class="size-2 rounded-full bg-current motion-safe:animate-pulse"></span>{card.status}</p>{/if}
					<div class="flex flex-col gap-5">
						<p class="text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.92] font-medium tracking-[-0.05em]">{card.title}</p>
						{#if card.body}<p class="text-lg leading-snug">{card.body}</p>{/if}
						{#if cardActions}<div class="flex flex-wrap gap-3">{@render cardActions()}</div>{/if}
					</div>
				</article>
			{/if}
			{#each surfaces.slice(2, 4) as s, i (s.title)}{@render tile(s, i + 2)}{/each}
		</div>
	</Container>
</section>
