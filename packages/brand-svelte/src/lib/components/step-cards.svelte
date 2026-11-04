<!-- Numbered steps as outline cards side by side: a big number and word, a live demo of the step in
     the middle, then what happens in it. -->
<script lang="ts" module>
	export type StepCard = {
		/** The step's number; two digits from the order when left out. */
		n?: string;
		/** One word for the step, beside its number. */
		word: string;
		title: string;
		body: string;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";

	let {
		steps,
		/** The step's demo, by index: real UI, never a material. */
		demo,
		class: className,
	}: { steps: StepCard[]; demo?: Snippet<[number]>; class?: string } = $props();
</script>

<div data-slot="step-cards" class={cn("grid gap-3 md:grid-cols-3", className)}>
	{#each steps as s, i (s.word)}
		<article class="flex min-h-[26rem] min-w-0 flex-col overflow-hidden rounded-2xl ring-1 ring-foreground/10 md:min-h-[32rem]">
			<h3 class="px-6 pt-6 text-[clamp(2.5rem,4vw,3.75rem)] leading-none font-medium tracking-[-0.045em]">
				<span class="text-muted-foreground">{s.n ?? String(i + 1).padStart(2, "0")}</span> <span class="text-foreground">{s.word}</span>
			</h3>
			<div class="relative flex flex-1 items-center justify-center px-6 py-8">{@render demo?.(i)}</div>
			<div class="px-6 pb-6">
				<p class="text-xl font-medium tracking-[-0.015em] text-foreground">{s.title}</p>
				<p class="mt-1.5 text-[15px] leading-snug text-foreground/80">{s.body}</p>
			</div>
		</article>
	{/each}
</div>
