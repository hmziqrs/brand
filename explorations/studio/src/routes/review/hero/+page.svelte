<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import ReviewVerdict from '$studio/review-verdict.svelte';
	import { heroes, heroGroups } from '$studio/hero-candidates';
</script>

<svelte:head><title>Hero · review</title></svelte:head>

<main class="min-h-screen bg-background pb-24 text-foreground">
	<div class="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-4 pt-10 pb-8 sm:px-8">
		<div>
			<a href="#/" class="font-mono text-xs text-muted-foreground hover:text-foreground">← studio</a>
			<h1 class="mt-2 text-4xl font-medium tracking-tight">Hero</h1>
			<p class="mt-2 max-w-2xl text-foreground/80">Three hero components, seven candidates with real copy from the live sites. Everything is live: hover, click the demos, open one alone to scroll it. Backgrounds for Brand heroes live on <a href="#/review/stages" class="text-primary hover:underline">Stages</a>.</p>
		</div>
		<button type="button" aria-label="Toggle theme" class="grid size-9 shrink-0 place-items-center rounded-md border border-border" onclick={() => prefs.toggleTheme()}>
			{#if prefs.dark}<Sun class="lucide size-4" />{:else}<Moon class="lucide size-4" />{/if}
		</button>
	</div>

	{#each heroGroups as g (g.id)}
		<div class="mx-auto max-w-[1400px] px-4 pt-10 pb-6 sm:px-8">
			<h2 class="text-3xl font-medium tracking-tight">{g.name}</h2>
			<p class="mt-1.5 max-w-3xl text-foreground/85">{g.when}</p>
			<p class="mt-1 font-mono text-[11px] text-muted-foreground">{g.src}</p>
		</div>
		{#each heroes.filter((h) => h.group === g.id) as h (h.id)}
			{@const id = `review:hero/${h.id}`}
			<section aria-label={h.name} class={cn('relative mb-10 border-t border-border [transform:translateZ(0)] focus-within:z-10 hover:z-10', verdicts.all[id] === 'remove' && 'opacity-50')}>
				<div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-2.5 sm:px-8">
					<div class="min-w-0 flex-1 basis-80">
						<p class="text-sm"><span class="font-medium">{h.name}</span> <span class="text-foreground/75">— {h.line}</span></p>
						<p class="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{h.src}</p>
					</div>
					<ReviewVerdict {id} />
					<a href={`#/c/hero/${h.id}`} class="text-sm whitespace-nowrap text-primary hover:underline">Open alone ↗</a>
				</div>
				<div class="overflow-x-clip bg-background">
					<h.component {...h.props} />
				</div>
			</section>
		{/each}
	{/each}
</main>
