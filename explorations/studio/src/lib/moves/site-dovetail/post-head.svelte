<script lang="ts">
	import Link from '@lucide/svelte/icons/link';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';
	import { to, social } from './site';
	import type { Post } from './posts';

	type Author = { name: string; role: string; preset: string };

	let {
		post,
		authors,
		read = '7 min read',
		dek,
		preset = 'hammered-copper',
		stat,
		class: className
	}: {
		post: Post;
		authors: Author[];
		read?: string;
		dek?: string;
		preset?: string;
		stat?: { value: string; label: string };
		class?: string;
	} = $props();

	const src = (p: string) => (shaderPosters[p] ?? shaderPosters['hammered-copper']).src;
	let copied = $state(false);
	const copy = () => {
		navigator.clipboard?.writeText(location.href).catch(() => {});
		copied = true;
		setTimeout(() => (copied = false), 1600);
	};
</script>

<header class={cn('w-full px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10', className)}>
	<div class="flex flex-wrap items-center gap-2">
		<a href={to('blog')} class="inline-flex h-8 items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] pr-3.5 pl-2.5 text-[0.85rem] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><ArrowLeft class="lucide size-3.5" />Blog</a>
		{#each post.tags as t, i (t)}
			<span class={cn('inline-flex h-8 items-center rounded-full px-3.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase', i === 0 ? 'bg-orange text-[var(--on-orange)]' : 'bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] text-foreground')}>{t}</span>
		{/each}
	</div>

	<h1 class="mt-10 max-w-[16ch] text-[clamp(2.8rem,7.4vw,7rem)] leading-[0.94] font-medium tracking-[-0.055em] text-balance text-foreground">{post.title}</h1>
	{#if dek}<p class="mt-8 max-w-[46rem] text-[clamp(1.25rem,1.9vw,1.55rem)] leading-[1.4] tracking-[-0.015em] text-foreground">{dek}</p>{/if}

	<div class="mt-12 flex flex-col gap-6 border-y border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] py-5 md:flex-row md:items-center md:justify-between">
		<div class="flex items-center gap-4">
			<span class="flex -space-x-2.5">
				{#each authors as a (a.name)}
					<span class="relative grid size-11 place-items-center overflow-hidden rounded-full ring-2 ring-background">
						<img src={src(a.preset)} alt="" class="absolute inset-0 size-full object-cover" />
						<span class="relative font-mono text-[0.72rem] font-semibold text-white">{a.name.split(' ').map((w) => w[0]).join('')}</span>
					</span>
				{/each}
			</span>
			<div>
				<p class="text-[1.02rem] font-medium text-foreground">{authors.map((a) => a.name).join(' & ')}</p>
				<p class="text-[0.9rem] text-foreground/75">{authors.map((a) => a.role).join(' · ')}</p>
			</div>
			<span class="mx-2 hidden h-9 w-px bg-[color-mix(in_oklab,var(--foreground)_12%,transparent)] sm:block"></span>
			<p class="hidden font-mono text-[0.72rem] leading-relaxed tracking-[0.12em] text-foreground uppercase sm:block">{post.date}<br /><span class="text-muted-foreground">{read}</span></p>
		</div>
		<div class="flex items-center gap-2">
			<button type="button" onclick={copy} aria-label="Copy link" class="inline-flex h-9 items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] px-3.5 text-[0.85rem] whitespace-nowrap text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><Link class="lucide size-3.5" />{copied ? 'Copied' : 'Copy link'}</button>
			{#each social as s (s.name)}<a href={to('post')} aria-label="Share on {s.name}" class="grid size-9 place-items-center rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]"><BrandIcon icon={s.icon} class="size-3.5" /></a>{/each}
			<button type="button" class="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-3.5 text-[0.85rem] font-medium text-background"><Sparkles class="lucide size-3.5" />Summarize</button>
		</div>
	</div>

	<figure class="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[21/9]">
		<img src={src(preset)} alt="" class="absolute inset-0 size-full object-cover" />
		{#if stat}
			<figcaption class="absolute bottom-4 left-4 max-w-[min(26rem,calc(100%-2rem))] rounded-xl bg-background p-5 sm:bottom-6 sm:left-6 sm:p-6">
				<span class="block font-dot text-[clamp(3rem,6vw,4.6rem)] leading-none font-extrabold text-primary">{stat.value}</span>
				<span class="mt-3 block text-[1rem] leading-snug text-foreground">{stat.label}</span>
			</figcaption>
		{/if}
	</figure>
</header>
