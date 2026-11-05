<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toast } from 'svelte-sonner';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import SwapControls from '$studio/swap-controls.svelte';

	async function copy() {
		const text = verdicts.report();
		if (!text) return toast('Nothing rated yet');
		try {
			await navigator.clipboard.writeText(text);
			toast('Verdicts copied — paste them in the chat');
		} catch {
			toast('Copy failed; the list is in the box below');
		}
	}
</script>

<svelte:head><title>hmziq studio</title></svelte:head>

<main class="mx-auto max-w-[1400px] px-4 py-10 sm:px-8">
	<header class="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
		<div class="max-w-2xl">
			<h1 class="text-5xl font-medium tracking-tight">hmziq studio</h1>
			<p class="mt-4 text-lg text-foreground/80">Review pages for the kit's candidate pieces. Pick what stays and what goes on each page; verdicts sync to Claude when you're signed in (or copy them into the chat).</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<button type="button" class="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm" onclick={() => prefs.toggleTheme()}>
				{#if prefs.dark}<Sun class="lucide size-4" /> Light{:else}<Moon class="lucide size-4" /> Dark{/if}
			</button>
			<button type="button" class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground" onclick={copy}>
				<Copy class="lucide size-4" /> Copy verdicts
			</button>
		</div>
	</header>

	<section class="mb-8 rounded-xl border border-primary/40 bg-card p-4" aria-label="Review">
		<h2 class="font-mono text-xs tracking-widest text-primary uppercase">Review</h2>
		<a href="#/review/header" class="mt-2 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Header — pick what stays →</a>
		<br /><a href="#/review/hero" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Hero — pick what stays →</a>
		<br /><a href="#/review/stages" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Stages — hero backgrounds →</a>
		<br /><a href="#/review/footer" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Footer — pick what stays →</a>
		<br /><a href="#/review/bento" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Feature sections — pick what stays →</a>
		<br /><a href="#/review/blog" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Blog — pick what stays →</a>
		<br /><a href="#/review/changelog" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Changelog — pick what stays →</a>
		<br /><a href="#/review/docs" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Product docs — pick what stays →</a>
		<br /><a href="#/review/pricing" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Pricing — pick what stays →</a>
		<br /><a href="#/review/company" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Company pages: contact and about — pick what stays →</a>
		<br /><a href="#/review/pages" class="mt-1 inline-flex items-center gap-2 text-lg font-medium hover:text-primary">Remaining pages: 404, legal, FAQ, CV — pick what stays →</a>
	</section>

	<section class="mt-6 rounded-xl border border-border bg-card p-4" aria-label="Global swaps">
		<p class="mb-3 text-sm text-foreground/80">Swaps apply to every page and stick between visits: light treatment, accent hue, primary face, and the face behind every secondary class.</p>
		<SwapControls layout="inline" />
	</section>

	<section class="mt-16 border-t border-border pt-8">
		<h2 class="text-lg font-medium">Verdict report</h2>
		<pre class="mt-3 max-h-80 overflow-auto rounded-lg border border-border bg-card p-4 font-mono text-xs whitespace-pre-wrap">{verdicts.report() || 'Nothing rated yet.'}</pre>
	</section>
</main>
