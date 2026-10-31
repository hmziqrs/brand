<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Search from '@lucide/svelte/icons/search';
	import House from '@lucide/svelte/icons/house';
	import Heart from '@lucide/svelte/icons/heart';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import { sites } from './site';

	let { class: className }: { class?: string } = $props();

	const people = [
		{ n: 'Aya Okafor', h: '@aya.builds', c: 'bg-orange' },
		{ n: 'Ruben Kask', h: '@rubenk', c: 'bg-teal' },
		{ n: 'Mira Sol', h: '@mirasol', c: 'bg-purple' },
		{ n: 'Tomás Ivo', h: '@tomasivo', c: 'bg-blue' }
	];
	let following = $state<Record<string, boolean>>({ '@rubenk': true });
	let tab = $state('Feed');
	let likes = $state<Record<number, boolean>>({});
	const posts = [
		{ who: people[0], text: 'Rebuilt my portfolio over a weekend. The agent did the first pass, I spent Sunday on the type.', site: sites[2] },
		{ who: people[2], text: 'New free template: a menu site for small restaurants, with CMS-driven specials.', site: sites[6] }
	];
</script>

<div class={cn('overflow-hidden rounded-[20px] border border-border bg-card text-sm text-foreground', className)}>
	<div class="flex items-center gap-2 border-b border-border px-4 py-3">
		<span class="size-2.5 rounded-full bg-red"></span><span class="size-2.5 rounded-full bg-yellow"></span><span class="size-2.5 rounded-full bg-green"></span>
		<House class="lucide ml-3 size-4 opacity-60" />
	</div>
	<div class="flex items-center gap-3 border-b border-border px-4 py-2.5">
		<span class="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-medium"><span class="size-3 rounded-[3px] bg-primary"></span>Community</span>
		<div class="mx-auto hidden gap-1 sm:flex">
			{#each ['Experts', 'Gallery', 'Feed'] as t (t)}
				<button type="button" onclick={() => (tab = t)} class="rounded-md px-2.5 py-1 transition-colors" class:bg-muted={tab === t} class:opacity-60={tab !== t}>{t}</button>
			{/each}
		</div>
		<span class="ml-auto hidden items-center gap-2 rounded-md bg-muted px-2 py-1 text-foreground/50 md:flex"><Search class="lucide size-3.5" />Search posts…</span>
	</div>
	<div class="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_280px]">
		<div class="space-y-4">
			{#each posts as p, i (p.text)}
				<article class="rounded-xl border border-border bg-background/50 p-4">
					<div class="flex items-center gap-2"><span class="grid size-7 place-items-center rounded-full text-[0.625rem] font-semibold text-background {p.who.c}">{p.who.n.split(' ').map((w) => w[0]).join('')}</span><span class="font-medium">{p.who.n}</span><span class="text-foreground/50">{p.who.h} · 2h</span></div>
					<p class="mt-3 text-[0.9375rem] leading-snug">{p.text}</p>
					<div class="relative mt-3 aspect-[16/7] overflow-hidden rounded-lg"><ShaderMaterial preset={p.site.preset} rendering="image" controls={false} sizes="600px" class="absolute inset-0 h-full w-full" /><span class="absolute bottom-2 left-3 rounded bg-background/85 px-2 py-0.5 text-xs">{p.site.name} · {p.site.by}</span></div>
					<div class="mt-3 flex gap-4 text-foreground/60">
						<button type="button" onclick={() => (likes[i] = !likes[i])} class="inline-flex items-center gap-1.5" class:text-primary={likes[i]}><Heart class="lucide size-4 {likes[i] ? 'fill-current' : ''}" />{(likes[i] ? 1 : 0) + 128 + i * 41}</button>
						<span class="inline-flex items-center gap-1.5"><MessageCircle class="lucide size-4" />{12 + i * 5}</span>
					</div>
				</article>
			{/each}
		</div>
		<div class="hidden space-y-4 md:block">
			<div class="rounded-xl border border-border p-3">
				<p class="flex justify-between"><span class="font-medium">Trending templates</span><span class="text-foreground/50">See all</span></p>
				<ul class="mt-2 space-y-2">
					{#each sites.slice(3, 8) as s (s.name)}
						<li class="flex items-center gap-2.5"><span class="relative h-7 w-10 overflow-hidden rounded"><ShaderMaterial preset={s.preset} rendering="image" controls={false} sizes="60px" class="absolute inset-0 h-full w-full" /></span><span><span class="block leading-tight">{s.name}</span><span class="block text-xs text-foreground/50">{s.price} · {s.by}</span></span></li>
					{/each}
				</ul>
			</div>
			<div class="rounded-xl border border-border p-3">
				<p class="font-medium">Suggested for you</p>
				<ul class="mt-2 space-y-2">
					{#each people as p (p.h)}
						<li class="flex items-center gap-2.5">
							<span class="grid size-7 place-items-center rounded-full text-[0.625rem] font-semibold text-background {p.c}">{p.n.split(' ').map((w) => w[0]).join('')}</span>
							<span class="min-w-0"><span class="block truncate leading-tight">{p.n}</span><span class="block text-xs text-foreground/50">{p.h}</span></span>
							<button type="button" onclick={() => (following[p.h] = !following[p.h])} class="ml-auto rounded-md px-2.5 py-1 text-xs font-medium transition-colors" class:bg-primary={!following[p.h]} class:text-primary-foreground={!following[p.h]} class:bg-muted={following[p.h]}>{following[p.h] ? 'Following' : 'Follow'}</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
