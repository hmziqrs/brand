<!-- A closed book standing in the page, drawn in 3D: a cover with its title, a spine, page edges, and a back. A mouse over it
     turns it toward the pointer; a click or tap turns it over. Touch never tilts it, and nothing moves for visitors who ask
     for reduced motion. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import "@hmziq/brand-core/book.css";
	import { cn } from "$brand/utils.js";
	import { bookPose, bookRest, bookTilt } from "@hmziq/brand-core/motion/book";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import type { BookTone } from "$brand/blocks/site/company-types.js";

	let {
		title,
		/** The small line at the top of the cover. */
		eyebrow,
		/** The fine print at the foot of the cover. */
		note,
		tone = "oxide",
		/** The thickness, as a share of the book's width. */
		depth = 11,
		/** How it sits with the pointer away: turned this many degrees down, then across. */
		rest = [bookRest[0], bookRest[1]],
		/** Whether the back is showing. */
		turned = $bindable(false),
		/** What the button does, for screen readers. */
		label = "Turn the book over",
		/** A picture above the note on the cover. */
		art,
		/** The back of the book. */
		back,
		class: className,
	}: {
		title: string;
		eyebrow?: string;
		note?: string;
		tone?: BookTone;
		depth?: number;
		rest?: [number, number];
		turned?: boolean;
		label?: string;
		art?: Snippet;
		back?: Snippet;
		class?: string;
	} = $props();

	const tones = { oxide: "band-orange", ink: "dark", paper: "light" } as const;
	const face = $derived(tones[tone]);
	const faceData = $derived(tone === "oxide" ? undefined : tone);

	let host: HTMLButtonElement | undefined = $state();
	let live = $state<{ rx: number; ry: number } | null>(null);
	const pose = $derived(bookPose(live, turned, rest));

	const move = (e: PointerEvent) => {
		if (e.pointerType !== "mouse" || !host || reducedMotion()) return;
		const r = host.getBoundingClientRect();
		live = bookTilt((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
	};
</script>

<button
	bind:this={host}
	type="button"
	onpointermove={move}
	onpointerleave={() => (live = null)}
	onclick={() => (turned = !turned)}
	aria-pressed={turned}
	aria-label={`${title}. ${label}`}
	data-slot="book"
	class={cn("relative mx-auto block w-full cursor-pointer rounded-md outline-none [perspective:1400px] focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-8 focus-visible:ring-offset-background", className)}
	style:--d="{depth}cqw"
>
	<span aria-hidden="true" data-part="shadow" class="absolute -bottom-[6%] left-[10%] block h-[6%] w-[80%] rounded-[50%] blur-lg transition-transform duration-500 ease-out motion-reduce:transition-none" style:transform="translateX({pose.shadowX}%) scaleX({pose.shadowScale})"></span>
	<span class="relative block aspect-[3/4] transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none" style:transform="rotateX({pose.x}deg) rotateY({pose.y}deg)">
		<span aria-hidden="true" data-face={faceData} class={cn("absolute inset-0 block overflow-hidden rounded-l-md rounded-r-sm p-[9%] text-left [backface-visibility:hidden]", face)} style:transform="rotateY(180deg) translateZ(calc(var(--d) / 2))">
			<span data-part="back-edge" class="absolute inset-y-0 right-0 block w-[4%]"></span>
			<span class="relative flex h-full flex-col">{@render back?.()}</span>
		</span>
		<span aria-hidden="true" data-part="pages" class="absolute top-[1.2%] right-[calc(var(--d)/-2)] bottom-[1.2%] block w-[var(--d)]" style:transform="rotateY(90deg) translateZ(-0.6cqw)"></span>
		<span aria-hidden="true" data-part="pages-h" class="absolute top-[calc(var(--d)/-2)] right-[1.2%] left-[1%] block h-[var(--d)]" style:transform="rotateX(90deg) translateZ(-0.4cqw)"></span>
		<span aria-hidden="true" data-part="pages-h" class="absolute right-[1.2%] bottom-[calc(var(--d)/-2)] left-[1%] block h-[var(--d)]" style:transform="rotateX(-90deg) translateZ(-0.4cqw)"></span>
		<span aria-hidden="true" data-face={faceData} class={cn("absolute top-0 bottom-0 left-[calc(var(--d)/-2)] block w-[var(--d)] rounded-sm", face)} style:transform="rotateY(-90deg)">
			<span data-part="spine" class="absolute inset-0 block"></span>
		</span>
		<span data-face={faceData} class={cn("absolute inset-0 block overflow-hidden rounded-l-sm rounded-r-md p-[9%] text-left [backface-visibility:hidden]", face)} style:transform="translateZ(calc(var(--d) / 2))">
			<span aria-hidden="true" data-part="crease" class="absolute inset-y-0 left-[4%] block w-px"></span>
			<span aria-hidden="true" data-part="hinge" class="absolute inset-y-0 left-0 block w-[4%]"></span>
			<span aria-hidden="true" data-part="gloss" class="absolute inset-0 block opacity-70"></span>
			<span class="relative flex h-full flex-col">
				{#if eyebrow}<span class="block font-mono text-[max(0.5rem,3.4cqw)] leading-none tracking-[0.14em] uppercase">{eyebrow}</span>{/if}
				<span class="mt-[14%] block text-[max(1rem,10cqw)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">{title}</span>
				{#if art}<span class="mt-auto block">{@render art()}</span>{/if}
				{#if note}<span class={cn("block font-mono text-[max(0.45rem,2.8cqw)] leading-snug tracking-[0.1em] uppercase opacity-80", art ? "mt-[8%]" : "mt-auto")}>{note}</span>{/if}
			</span>
		</span>
	</span>
</button>
