<script lang="ts">
	import Link from '@lucide/svelte/icons/link';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import PostCover from './post-cover.svelte';
	import { cn } from '$brand/utils.js';
	import { to, social, sinks } from './site';
	import type { Post } from './posts';

	let { post, authors, class: className }: { post: Post; authors: string; class?: string } = $props();

	const ai = sinks.filter((s) => s.name === 'Claude');
	const rows = $derived([
		['Tags', post.tags.map((t) => `[${t}]`).join(' ')],
		['Published', post.date],
		['Written by', authors]
	]);
</script>

<header class={cn('mx-auto w-full max-w-[82rem] px-4 pt-16 sm:px-6 sm:pt-24', className)}>
	<a href={to('blog')} class="font-mono text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase hover:text-foreground">← Blog</a>
	<h1 class="mt-6 max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] font-medium tracking-[-0.05em] text-balance text-foreground">{post.title}</h1>
	<div class="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
		<div>
			<dl class="border-t border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
				{#each rows as [k, v] (k)}
					<div class="grid grid-cols-[8rem_1fr] border-b border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] py-3.5 font-mono text-[0.72rem] tracking-[0.12em] uppercase">
						<dt class="text-muted-foreground">{k}</dt>
						<dd class="text-foreground">{v}</dd>
					</div>
				{/each}
			</dl>
			<div class="mt-10 flex flex-wrap gap-10">
				<div>
					<p class="text-[0.85rem] font-medium text-foreground">Share</p>
					<div class="mt-3 flex gap-2">
						<button type="button" aria-label="Copy link" class="grid size-9 place-items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><Link class="lucide size-4" /></button>
						{#each social as s (s.name)}<a href={to('post')} aria-label="Share on {s.name}" class="grid size-9 place-items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><BrandIcon icon={s.icon} class="size-3.5" /></a>{/each}
					</div>
				</div>
				<div>
					<p class="text-[0.85rem] font-medium text-foreground">Summarize with AI</p>
					<div class="mt-3 flex gap-2">
						<button type="button" class="inline-flex h-9 items-center gap-2 rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] px-3 text-[0.8rem] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><Sparkles class="lucide size-4 text-primary" />Ask Contextline</button>
						{#each ai as s (s.name)}<a href={to('post')} aria-label="Summarize in {s.name}" class="grid size-9 place-items-center rounded-md border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><BrandIcon icon={s.icon} class="size-4" /></a>{/each}
					</div>
				</div>
			</div>
		</div>
		<PostCover cover={post.cover} class="ring-1 ring-[color-mix(in_oklab,var(--foreground)_12%,transparent)]" />
	</div>
</header>
