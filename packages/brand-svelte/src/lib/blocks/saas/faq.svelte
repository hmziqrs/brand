<!-- Questions and answers, the first one open. Two columns on wide screens with `columns`. -->
<script lang="ts">
	import Question from "$brand/components/question.svelte";
	import Questions from "$brand/components/questions.svelte";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		items,
		columns,
		numbered,
		class: className,
	}: { items: { q: string; a: Snippet; topic?: string }[]; columns?: boolean; numbered?: boolean; class?: string } = $props();

	const half = $derived(Math.ceil(items.length / 2));
</script>

{#if columns}
	<div class={cn("grid gap-x-10 md:grid-cols-2", className)}>
		{#each [items.slice(0, half), items.slice(half)] as col, c (c)}
			<Questions class={cn(c === 1 && "border-t-0 md:border-t")}>
				{#each col as f, i (f.q)}
					{#snippet q()}
						{f.q}
					{/snippet}
					<Question question={q} open={c === 0 && i === 0}>
						{@render f.a()}
					</Question>
				{/each}
			</Questions>
		{/each}
	</div>
{:else}
	<Questions {className}>
		{#each items as f, i (f.q)}
			{#snippet q()}
				{f.q}
			{/snippet}
			<Question question={q} number={numbered ? i + 1 : undefined} topic={f.topic} open={i === 0}>
				{@render f.a()}
			</Question>
		{/each}
	</Questions>
{/if}
