<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import ReviewVerdict from '$studio/review-verdict.svelte';
	import { pagesCandidates } from '$studio/pages-candidates';

	let open = $state<Record<string, boolean>>({});
</script>

<svelte:head><title>Remaining pages · review</title></svelte:head>

<main class="min-h-screen bg-background pb-24 text-foreground">
	<div class="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-4 pt-10 pb-8 sm:px-8">
		<div>
			<a href="#/" class="font-mono text-xs text-muted-foreground hover:text-foreground">← studio</a>
			<h1 class="mt-2 text-4xl font-medium tracking-tight">Remaining pages · 404, legal, FAQ, CV and Labs</h1>
			<p class="mt-2 max-w-2xl text-foreground/80">The last five page types, one recommended design each, no alternatives. Words come from the live claude-multi.hmziq.xyz, cv.hmziq.rs and hmziq.xyz; anything invented is named on its row. Each shows its top part first and runs live; open one alone to see it under its site’s sticky header and approved footer.</p>
		</div>
		<button type="button" aria-label="Toggle theme" class="grid size-9 shrink-0 place-items-center rounded-md border border-border" onclick={() => prefs.toggleTheme()}>
			{#if prefs.dark}<Sun class="lucide size-4" />{:else}<Moon class="lucide size-4" />{/if}
		</button>
	</div>

	{#each pagesCandidates as c (c.id)}
		{@const id = `review:pages/${c.id}`}
		<div class="mx-auto max-w-[1400px] px-4 pt-6 pb-4 sm:px-8">
			<h2 class="font-mono text-xs tracking-widest text-primary uppercase">{c.name} · {c.site.label}</h2>
			<p class="mt-1 text-sm text-foreground"><span class="font-medium">Recommended: {c.name}.</span> {c.why}</p>
		</div>
		<section aria-label={c.name} class={cn('relative mb-10 border-t border-border [transform:translateZ(0)] focus-within:z-10 hover:z-10', verdicts.all[id] === 'remove' && 'opacity-50')}>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-2.5 sm:px-8">
				<div class="min-w-0 flex-1 basis-80">
					<p class="text-sm">
						<Tag tone="orange" class="mr-1.5 align-[1px]">Recommended</Tag>
						<span class="font-medium">{c.name}</span> <span class="text-foreground/75">— {c.line}</span>
					</p>
					<p class="mt-0.5 text-sm text-foreground/75">From {c.from}.</p>
					<p class="mt-0.5 text-sm text-foreground/75"><span class="text-foreground">Invented:</span> {c.invented}</p>
					<p class="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{c.src}</p>
				</div>
				<ReviewVerdict {id} />
				<a href={`#/c/pages/${c.id}`} class="text-sm whitespace-nowrap text-primary hover:underline">Open alone ↗</a>
			</div>
			<div class={cn('overflow-clip bg-background', !open[c.id] && 'max-h-[1150px]')}>
				<c.component {...c.props} />
			</div>
			<div class="flex justify-center border-t border-border py-3">
				<button type="button" aria-expanded={!!open[c.id]} onclick={() => (open[c.id] = !open[c.id])} class="h-8 rounded-md border border-border px-3 text-sm text-foreground/80 hover:text-foreground">
					{open[c.id] ? 'Show the top part only ↑' : 'Show the whole page ↓'}
				</button>
			</div>
		</section>
	{/each}
</main>
