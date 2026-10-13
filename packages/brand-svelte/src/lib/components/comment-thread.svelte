<!-- A conversation under a post: each comment with who wrote it and when, replies indented under
     a thin line, the post's author marked, and a box to add yours. -->
<script lang="ts" module>
	export type ThreadComment = { id: string; name: string; at: string; body: string; author?: boolean; replies?: ThreadComment[] };
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import * as Avatar from "$brand/ui/avatar/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Textarea } from "$brand/ui/textarea/index.js";
	import Tag from "./tag.svelte";

	let {
		comments,
		label = "Comments",
		onpost,
		class: className,
	}: {
		comments: ThreadComment[];
		label?: string;
		onpost?: (body: string, replyTo?: ThreadComment) => void;
		class?: string;
	} = $props();

	const uid = $props.id();
	let draft = $state("");
	let replyTo = $state<ThreadComment | undefined>();
	const count = $derived(comments.reduce((n, c) => n + 1 + (c.replies?.length ?? 0), 0));
	const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
</script>

{#snippet comment(c: ThreadComment, nested: boolean)}
	<li class="flex gap-3">
		<Avatar.Root size={nested ? "sm" : "default"}><Avatar.Fallback class="bg-transparent text-xs font-medium ring-1 ring-foreground/15">{initials(c.name)}</Avatar.Fallback></Avatar.Root>
		<div class="flex min-w-0 flex-1 flex-col gap-1.5">
			<p class="flex flex-wrap items-center gap-2 text-sm"><span class="font-medium">{c.name}</span>{#if c.author}<Tag>Author</Tag>{/if}<span class="text-muted-foreground">{c.at}</span></p>
			<p class="text-[0.9375rem] leading-relaxed">{c.body}</p>
			<div><button type="button" onclick={() => { replyTo = c; document.getElementById(`${uid}-box`)?.focus(); }} class="rounded-sm text-[0.8125rem] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">Reply</button></div>
			{#if c.replies?.length}
				<ul class="mt-3 flex flex-col gap-5 border-l pl-4">{#each c.replies as r (r.id)}{@render comment(r, true)}{/each}</ul>
			{/if}
		</div>
	</li>
{/snippet}

<section data-slot="comment-thread" aria-labelledby={`${uid}-title`} class={cn("flex flex-col gap-6", className)}>
	<h2 id={`${uid}-title`} class="text-lg font-medium">{label} <span class="text-muted-foreground tabular-nums">{count}</span></h2>
	<ul class="flex flex-col gap-7">{#each comments as c (c.id)}{@render comment(c, false)}{/each}</ul>
	<form class="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10" onsubmit={(e) => { e.preventDefault(); if (draft.trim()) { onpost?.(draft.trim(), replyTo); draft = ""; replyTo = undefined; } }}>
		<label for={`${uid}-box`} class="text-sm font-medium">
			{#if replyTo}Replying to {replyTo.name} <button type="button" onclick={() => (replyTo = undefined)} class="ml-1 text-[0.8125rem] font-normal text-muted-foreground underline-offset-4 hover:underline">Cancel</button>{:else}Add a comment{/if}
		</label>
		<Textarea id={`${uid}-box`} bind:value={draft} rows={3} placeholder="Say something kind and useful" />
		<div class="flex items-center justify-between gap-3"><span class="text-xs text-muted-foreground">Markdown works.</span><Button type="submit" size="sm" disabled={!draft.trim()}>Post</Button></div>
	</form>
</section>
