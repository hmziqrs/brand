<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import ReviewVerdict from '$studio/review-verdict.svelte';
	import { footers } from '$studio/footer-candidates';
</script>

<svelte:head><title>Footer · review</title></svelte:head>

<main class="min-h-screen bg-background pb-24 text-foreground">
	<div class="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-4 pt-10 pb-8 sm:px-8">
		<div>
			<a href="#/" class="font-mono text-xs text-muted-foreground hover:text-foreground">← studio</a>
			<h1 class="mt-2 text-4xl font-medium tracking-tight">Footer</h1>
			<p class="mt-2 max-w-2xl text-foreground/80">Eight live footers, each filled with the real links of the site it suits: run the cursor over the names, and open one alone to judge it at the end of a page.</p>
		</div>
		<button type="button" aria-label="Toggle theme" class="grid size-9 shrink-0 place-items-center rounded-md border border-border" onclick={() => prefs.toggleTheme()}>
			{#if prefs.dark}<Sun class="lucide size-4" />{:else}<Moon class="lucide size-4" />{/if}
		</button>
	</div>

	{#each footers as f (f.id)}
		{@const id = `review:footer/${f.id}`}
		<section aria-label={f.name} class={cn('relative mb-10 border-t border-border [transform:translateZ(0)] focus-within:z-10 hover:z-10', verdicts.all[id] === 'remove' && 'opacity-50')}>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-2.5 sm:px-8">
				<div class="min-w-0 flex-1 basis-80">
					<p class="text-sm"><span class="font-medium">{f.name}</span> <span class="text-foreground/75">— {f.line}</span></p>
					<p class="mt-0.5 text-sm text-foreground/75">{f.use}</p>
					<p class="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{f.src}</p>
				</div>
				<ReviewVerdict {id} />
				<a href={`#/c/footer/${f.id}`} class="text-sm whitespace-nowrap text-primary hover:underline">Open alone ↗</a>
			</div>
			<div class="overflow-x-clip bg-background">
				<f.component {...f.props} />
			</div>
		</section>
	{/each}
</main>
