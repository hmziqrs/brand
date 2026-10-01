<!--
  A FAQ page's questions (the lab's FAQ page): one numbered list (01, 02…
  in orange), each with its topic as a grey tag, built on the Question's
  details row so it works without JavaScript and with find-in-page.

  The list holds no state of its own: the page keeps the search and passes
  the questions that survive it, the way the lab's FAQ page filters in
  React — an empty list draws the empty note.
-->
<script lang="ts">
	import Question from "$brand/components/question.svelte";
	import Questions from "$brand/components/questions.svelte";
	import EmptyNote from "$brand/blocks/site/empty-note.svelte";
	import type { FaqItem } from "./types.js";

	let {
		items,
		/** The empty note's words, when a search finds nothing. */
		empty = "No questions match that. Try another word.",
		class: className,
	}: { items: FaqItem[]; empty?: string; class?: string } = $props();
</script>

<div data-slot="faq-list" class={className}>
	{#if items.length === 0}
		<EmptyNote>{empty}</EmptyNote>
	{:else}
		<Questions>
			{#each items as [topic, questionText, answer], i (questionText)}
				<Question number={i + 1} {topic}>
					{#snippet question()}
						{questionText}
					{/snippet}
					{answer}
				</Question>
			{/each}
		</Questions>
	{/if}
</div>
