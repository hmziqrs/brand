<!-- A blog's topics as cards that filter its posts: each one's Tag, how many posts and minutes of
     reading it holds, and its newest title. The picked one rings in oxide and says Showing; the page
     keeps the topic, so picking it again can clear it. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Tag from "$brand/components/tag.svelte";
	import type { TopicShelf, TopicTone } from "./types.js";

	let {
		items,
		/** The picked topic. */
		value,
		onChange,
		/** The topic's color, for its Tag. */
		tone,
		class: className,
	}: { items: TopicShelf[]; value?: string; onChange: (topic: string) => void; tone?: TopicTone; class?: string } = $props();
</script>

<div data-slot="topic-cards" class={cn("grid gap-4 md:grid-cols-3", className)}>
	{#each items as s (s.topic)}
		<button
			type="button"
			aria-pressed={value === s.topic}
			onclick={() => onChange(s.topic)}
			class="group flex min-h-52 flex-col gap-5 rounded-2xl p-6 text-left ring-1 ring-foreground/10 transition-shadow outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-primary/70 motion-reduce:transition-none"
		>
			<span class="flex items-center justify-between gap-3">
				<Tag tone={tone?.(s.topic)}>{s.topic}</Tag>
				{#if value === s.topic}<span class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">Showing</span>{/if}
			</span>
			<span class="mt-auto flex items-baseline gap-2.5">
				<span class="text-6xl leading-none font-medium tracking-[-0.05em] text-foreground tabular-nums">{s.count}</span>
				<span class="text-sm text-foreground/75">{s.count === 1 ? "post" : "posts"}{s.minutes === undefined ? "" : ` · ${s.minutes} min of reading`}</span>
			</span>
			{#if s.latest}<span class="line-clamp-2 min-h-[2.6em] text-[0.9375rem] leading-[1.3] text-foreground/85">Latest: {s.latest}</span>{/if}
		</button>
	{/each}
</div>
