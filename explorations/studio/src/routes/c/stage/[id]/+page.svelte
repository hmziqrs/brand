<script lang="ts">
	import { page } from '$app/state';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import { stage } from '$studio/stage-candidates';
	import StageSample from '$moves/review/stages/stage-sample.svelte';

	const s = $derived(stage(page.params.id ?? ''));
	const self = $derived(`#/c/stage/${page.params.id ?? ''}`);

	const sections = [
		{ kicker: 'Why', title: 'Built for the second year, not the first demo', body: 'Most tools feel fast on day one. The test is month fourteen, when the codebase has three owners and nobody remembers why the cache key looks like that. Every default here is picked for that month.' },
		{ kicker: 'How', title: 'One small core, everything else optional', body: 'The core does one job and does it in the open. Plugins sit beside it, not inside it, so you can read the whole path from request to render in an afternoon and swap any piece without a rewrite.' }
	];
</script>

<svelte:head><title>{s ? `${s.name} · stage` : 'Stage not found'}</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<header class="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
		<div class="mx-auto flex h-14 w-full max-w-[1320px] items-center gap-6 px-4 sm:px-8">
			<a href={self} class="text-[17px]"><Wordmark name="freeoxide" /></a>
			<nav class="hidden items-center gap-6 text-sm text-foreground/80 md:flex" aria-label="Main">
				<a href={self} class="hover:text-foreground">Tools</a>
				<a href={self} class="hover:text-foreground">Docs</a>
				<a href={self} class="hover:text-foreground">Changelog</a>
			</nav>
			<Button href={self} size="sm" class="ml-auto">Get started</Button>
		</div>
	</header>

	{#if s}
		<StageSample stage={s.component} stageProps={s.props} panel={s.panel} align={s.align} href={self} />
		{#each sections as x (x.title)}
			<section class="border-t border-border">
				<div class="mx-auto grid max-w-[1320px] gap-8 px-4 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
					<div>
						<p class="font-mono text-xs tracking-widest text-primary uppercase">{x.kicker}</p>
						<h2 class="mt-3 max-w-[20ch] text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{x.title}</h2>
					</div>
					<p class="text-lg leading-relaxed text-foreground/85">{x.body}</p>
				</div>
			</section>
		{/each}
		<footer class="border-t border-border px-4 py-16 text-center text-sm text-muted-foreground sm:px-8">End of page.</footer>
	{:else}
		<p class="p-10">No stage “{page.params.id}”.</p>
	{/if}

	<span class="fixed bottom-4 left-4 z-50 rounded-md bg-background shadow-lg"><Button href="#/review/stages" variant="outline" size="sm">← back to stages</Button></span>
</div>
