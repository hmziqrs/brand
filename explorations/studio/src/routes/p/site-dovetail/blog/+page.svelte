<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import PatinaRain from '$moves/dovetail/patina-rain.svelte';
	import SiteHeader from '$moves/site-dovetail/site-header.svelte';
	import SiteFooter from '$moves/site-dovetail/site-footer.svelte';
	import ProofCrowd from '$moves/site-dovetail/proof-crowd.svelte';
	import PostTile from '$moves/site-dovetail/post-tile.svelte';
	import { posts, blogTags } from '$moves/site-dovetail/posts';
	import { to } from '$moves/site-dovetail/site';
	import { cn } from '$brand/utils.js';

	const featured = posts.slice(0, 2);
	const rest = posts.slice(2);
	let tag = $state('All');
	let shown = $state(12);
	const list = $derived(rest.filter((p) => tag === 'All' || p.tags.includes(tag)));
</script>

<svelte:head><title>Blog — Contextline</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="blog" />

	<section class="relative isolate overflow-hidden">
		<PatinaRain mode="rain" cell={16} opacity={0.4} mask="fade-bottom" seed="contextline-blog" class="-z-10 text-foreground" />
		<div class="mx-auto grid w-full max-w-[66rem] gap-10 px-4 pt-16 pb-10 sm:px-6 sm:pt-20 md:grid-cols-2">
			{#each featured as p, i (p.title)}
				<div class={cn('rounded-2xl bg-background p-3', i === 1 && 'md:mt-16')}>
					<PostTile post={p} seed={i + 3} />
				</div>
			{/each}
		</div>
		<div class="mx-auto flex w-full max-w-[82rem] flex-wrap items-end justify-between gap-6 px-4 pt-10 pb-14 sm:px-6">
			<h1 class="rounded-xl bg-background pr-4 text-[clamp(5rem,15vw,11rem)] leading-[0.82] font-semibold tracking-[-0.065em] text-foreground">Blog<span class="ml-2 inline-block size-[0.18em] bg-primary"></span></h1>
			<div class="flex flex-wrap gap-1.5 rounded-lg bg-background p-1" role="group" aria-label="Filter posts">
				{#each blogTags as t (t)}
					<button type="button" aria-pressed={tag === t} onclick={() => ((tag = t), (shown = 12))} class={cn('rounded-md px-3 py-1.5 text-[0.85rem] transition-colors', tag === t ? 'bg-foreground text-background' : 'bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]')}>{t}</button>
				{/each}
			</div>
		</div>
	</section>

	<section class="mx-auto w-full max-w-[82rem] px-4 pt-6 pb-24 sm:px-6">
		<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
			{#each list.slice(0, shown) as p, i (p.title)}<PostTile post={p} seed={i + 7} />{/each}
		</div>
		{#if !list.length}<p class="py-16 text-[1.1rem] text-foreground">Nothing under that tag yet.</p>{/if}
		{#if list.length > shown}
			<div class="mt-16 flex justify-center"><Button variant="outline" size="lg" onclick={() => (shown += 6)}>Load more</Button></div>
		{/if}
	</section>

	<ProofCrowd lines={['Read', 'less', 'hype,', 'more', 'proof']} accent={4}>
		{#snippet after()}
			<div class="flex flex-wrap justify-center gap-2.5">
				<Button size="lg" href={to('contact')}>Book a demo</Button>
				<Button size="lg" variant="outline" href={to('pricing')} class="bg-background">Start free</Button>
			</div>
		{/snippet}
	</ProofCrowd>

	<SiteFooter />
</div>
