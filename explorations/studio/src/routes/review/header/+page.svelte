<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import ReviewVerdict from '$studio/review-verdict.svelte';
	import { headers } from '$studio/header-candidates';
</script>

<svelte:head><title>Header · review</title></svelte:head>

<main class="min-h-screen bg-background pb-24 text-foreground">
	<div class="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-4 pt-10 pb-8 sm:px-8">
		<div>
			<a href="#/" class="font-mono text-xs text-muted-foreground hover:text-foreground">← studio</a>
			<h1 class="mt-2 text-4xl font-medium tracking-tight">Header</h1>
			<p class="mt-2 max-w-2xl text-foreground/80">Pick what stays. Every header below is live — hover the menus, resize the window, open one alone to scroll it.</p>
		</div>
		<button type="button" aria-label="Toggle theme" class="grid size-9 shrink-0 place-items-center rounded-md border border-border" onclick={() => prefs.toggleTheme()}>
			{#if prefs.dark}<Sun class="lucide size-4" />{:else}<Moon class="lucide size-4" />{/if}
		</button>
	</div>

	{#each headers as h (h.id)}
		{@const id = `review:header/${h.id}`}
		<section aria-label={h.name} class={cn('relative mb-10 border-t border-border [transform:translateZ(0)] focus-within:z-10 hover:z-10', verdicts.all[id] === 'remove' && 'opacity-50')}>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2 bg-muted/40 px-4 py-2.5 sm:px-8">
				<div class="min-w-0 flex-1 basis-80">
					<p class="text-sm"><span class="font-medium">{h.name}</span> <span class="text-foreground/75">— {h.line}</span></p>
					<p class="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{h.src}</p>
				</div>
				<ReviewVerdict {id} />
				<a href={`#/c/header/${h.id}`} class="text-sm whitespace-nowrap text-primary hover:underline">Open alone ↗</a>
			</div>
			<div class="overflow-x-clip bg-background">
				<h.component {...h.props} />
				<div class="mx-auto flex h-60 max-w-[1320px] flex-col justify-center gap-4 px-4 sm:px-8" aria-hidden="true">
					<p class="font-mono text-xs tracking-widest text-primary uppercase">Page content</p>
					<p class="max-w-[18ch] text-4xl leading-tight font-medium tracking-tight text-foreground/85 sm:text-5xl">The page starts here.</p>
					<div class="flex gap-2">
						<span class="h-2.5 w-48 rounded-full bg-foreground/10"></span>
						<span class="h-2.5 w-24 rounded-full bg-foreground/10"></span>
						<span class="hidden h-2.5 w-64 rounded-full bg-foreground/10 sm:block"></span>
					</div>
				</div>
			</div>
		</section>
	{/each}
</main>
