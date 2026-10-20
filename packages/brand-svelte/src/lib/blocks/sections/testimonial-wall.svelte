<!-- What people say, as the kit's quote cards: a slow marquee that walks the cards past once
     around and back, pausable through its own control, or a plain grid. Under reduced motion
     the marquee stands still. -->
<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import Pause from "@lucide/svelte/icons/pause";
	import Play from "@lucide/svelte/icons/play";
	import { Button } from "$brand/ui/button/index.js";
	import Container from "$brand/blocks/site/container.svelte";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import Person from "$brand/blocks/saas/person.svelte";
	import { cn } from "$brand/utils.js";

	let {
		kicker,
		title,
		intro,
		quotes,
		variant = "marquee",
		controls = true,
		duration = 72,
		class: className,
	}: {
		kicker?: string;
		title: string;
		intro?: string;
		quotes: { quote: string; name: string; role: string }[];
		/** "grid" lines the cards up instead of walking them past. */
		variant?: "marquee" | "grid";
		/** The marquee's pause and play control. */
		controls?: boolean;
		/** Seconds for one lap of the marquee. */
		duration?: number;
		class?: string;
	} = $props();

	const reduced = new MediaQuery("prefers-reduced-motion: reduce");
	let paused = $state(false);
	const walking = $derived(variant === "marquee" && !reduced.current && !paused);
</script>

{#snippet card(q: { quote: string; name: string; role: string })}
	<OutlineCard class="h-full gap-5">
		<blockquote class="text-[0.95rem] leading-[1.7]">{q.quote}</blockquote>
		<Person name={q.name} role={q.role} />
	</OutlineCard>
{/snippet}

<section data-slot="testimonial-wall" data-variant={variant} class={cn("relative flex flex-col gap-10", className)}>
	<Container class="flex flex-wrap items-end justify-between gap-6">
		<div class="flex max-w-2xl flex-col gap-3">
			{#if kicker}<p class="text-[0.8125rem] text-muted-foreground">{kicker}</p>{/if}
			<h2 class="text-3xl font-medium tracking-tight text-balance">{title}</h2>
			{#if intro}<p class="leading-relaxed text-muted-foreground">{intro}</p>{/if}
		</div>
		{#if controls && variant === "marquee" && !reduced.current}
			<Button variant="secondary" size="sm" class="bg-background text-foreground" aria-label={paused ? "Play the quotes" : "Pause the quotes"} aria-pressed={paused} onclick={() => (paused = !paused)}>
				{#if paused}<Play class="lucide" />{:else}<Pause class="lucide" />{/if}
				{paused ? "Play" : "Pause"}
			</Button>
		{/if}
	</Container>
	{#if variant === "marquee"}
		<!-- Padding inside the clip keeps the cards' top and bottom lines whole; the negative
		     margin hands the space back to the section's rhythm. -->
		<div class="marquee-mask -my-3 overflow-hidden py-3" class:held={!walking}>
			<ul class="track flex w-max" style="--duration: {duration}s;">
				{#each [...quotes, ...quotes] as q, i (i)}
					<li aria-hidden={i >= quotes.length || undefined} class="w-[21rem] shrink-0 pr-4">
						{@render card(q)}
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<Container>
			<ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each quotes as q (q.name)}<li>{@render card(q)}</li>{/each}
			</ul>
		</Container>
	{/if}
</section>

<style>
	@keyframes wall {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.track {
			animation: wall var(--duration, 72s) linear infinite;
		}
	}
	.held .track {
		animation-play-state: paused;
	}
	.marquee-mask {
		mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
	}
</style>
