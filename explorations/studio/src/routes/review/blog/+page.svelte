<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import ReviewVerdict from '$studio/review-verdict.svelte';
	import { blogs } from '$studio/blog-candidates';

	const groups = [
		{ kind: 'main', title: 'Main blog · blog.hmziq.rs', note: 'A blog of its own, with its own header, footer and changelog page. The live blog has one post; the other seven are placeholders built from what that post and its changelog name.' },
		{ kind: 'product', title: 'Product blog · part of a product', note: 'A blog inside a product site, under that product’s header and footer: claude-multi here, with its live posts. Same post template as the main blog.' }
	] as const;

	let open = $state<Record<string, boolean>>({});
</script>

<svelte:head><title>Blog · review</title></svelte:head>

<main class="min-h-screen bg-background pb-24 text-foreground">
	<div class="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-4 pt-10 pb-8 sm:px-8">
		<div>
			<a href="#/" class="font-mono text-xs text-muted-foreground hover:text-foreground">← studio</a>
			<h1 class="mt-2 text-4xl font-medium tracking-tight">Blog</h1>
			<p class="mt-2 max-w-2xl text-foreground/80">Two kinds of blog, one post template: the main blog at blog.hmziq.rs, and the blog inside a product. Each shows its top part first and runs live. Open one alone to see it under its own site’s header and footer.</p>
		</div>
		<button type="button" aria-label="Toggle theme" class="grid size-9 shrink-0 place-items-center rounded-md border border-border" onclick={() => prefs.toggleTheme()}>
			{#if prefs.dark}<Sun class="lucide size-4" />{:else}<Moon class="lucide size-4" />{/if}
		</button>
	</div>

	{#each groups as g (g.kind)}
		{@const list = blogs.filter((b) => b.kind === g.kind)}
		{#if list.length}
			<div class="mx-auto max-w-[1400px] px-4 pt-6 pb-4 sm:px-8">
				<h2 class="font-mono text-xs tracking-widest text-primary uppercase">{g.title}</h2>
				<p class="mt-1 text-sm text-foreground/75">{g.note}</p>
			</div>
		{/if}
		{#each list as b (b.id)}
			{@const id = `review:blog/${b.id}`}
			<section aria-label={b.name} class={cn('relative mb-10 border-t border-border [transform:translateZ(0)] focus-within:z-10 hover:z-10', verdicts.all[id] === 'remove' && 'opacity-50')}>
				<div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-2.5 sm:px-8">
					<div class="min-w-0 flex-1 basis-80">
						<p class="text-sm"><span class="font-medium">{b.name}</span> <span class="text-foreground/75">— {b.line}</span></p>
						<p class="mt-0.5 text-sm text-foreground/75">From {b.from}.</p>
						<p class="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{b.src}</p>
					</div>
					<ReviewVerdict {id} />
					<a href={`#/c/blog/${b.id}`} class="text-sm whitespace-nowrap text-primary hover:underline">Open alone ↗</a>
				</div>
				<div class={cn('overflow-clip bg-background', !open[b.id] && 'max-h-[1150px]')}>
					<b.component {...b.props} />
				</div>
				<div class="flex justify-center border-t border-border py-3">
					<button type="button" aria-expanded={!!open[b.id]} onclick={() => (open[b.id] = !open[b.id])} class="h-8 rounded-md border border-border px-3 text-sm text-foreground/80 hover:text-foreground">
						{open[b.id] ? 'Show the top part only ↑' : 'Show the whole page ↓'}
					</button>
				</div>
			</section>
		{/each}
	{/each}
</main>
