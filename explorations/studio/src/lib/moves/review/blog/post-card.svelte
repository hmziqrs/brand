<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import PostMeta from '$brand/blocks/content/post-meta.svelte';
	import { cn } from '$brand/utils.js';
	import BlogArt from './blog-art.svelte';
	import { item, topicTone, type BlogPost } from './posts';

	let {
		post,
		href,
		size = 'md',
		layout = 'stack',
		kicker,
		summary = true,
		heading = 'h3',
		class: className
	}: {
		post: BlogPost;
		href: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		layout?: 'stack' | 'split' | 'row';
		kicker?: string;
		summary?: boolean;
		heading?: 'h2' | 'h3';
		class?: string;
	} = $props();

	let px = $state(0.5);
	let py = $state(0.5);
	let on = $state(false);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
		py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
		on = true;
	}

	const big = $derived(size === 'xl');
	const row = $derived(layout === 'row' && !big);
	const wideRow = $derived(layout === 'row' && big);

	const titles = {
		sm: 'text-lg leading-snug tracking-[-0.01em]',
		md: 'text-xl leading-snug tracking-[-0.015em]',
		lg: 'text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.08] tracking-[-0.03em]',
		xl: 'text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[1.02] tracking-[-0.04em]'
	};
	const summaries = {
		sm: 'line-clamp-2 text-[0.9375rem] leading-snug text-foreground/85',
		md: 'line-clamp-3 text-base leading-snug text-foreground/85',
		lg: 'max-w-[52ch] text-lg leading-snug text-foreground/85',
		xl: 'max-w-[40ch] text-xl leading-snug text-foreground'
	};
	const title = $derived(row ? 'text-xl leading-snug tracking-[-0.02em] sm:text-2xl md:text-[1.75rem] md:leading-[1.15]' : titles[size]);
	const dek = $derived(row ? 'max-w-[56ch] text-base leading-snug text-foreground/85 md:text-lg' : summaries[size]);
</script>

<a
	{href}
	data-slot="blog-post-card"
	data-layout={layout}
	class={cn(
		'group flex min-w-0 flex-col gap-4 outline-none',
		layout === 'split' && 'lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-14',
		row && 'grid grid-cols-[minmax(0,1fr)_7rem] items-start gap-x-5 sm:grid-cols-[minmax(0,1fr)_12rem] md:grid-cols-[minmax(0,1fr)_16rem] md:gap-x-12',
		wideRow && 'md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-14',
		className
	)}
	onpointermove={move}
	onpointerleave={() => (on = false)}
>
	<div
		class={cn(
			'relative isolate block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-300 group-hover:ring-foreground/25 group-focus-visible:ring-3 group-focus-visible:ring-ring/60 motion-reduce:transition-none',
			big && 'rounded-2xl',
			(row || wideRow) && 'md:col-start-2 md:row-start-1',
			row && 'col-start-2 row-start-1'
		)}
	>
		<BlogArt kind={post.art} x={px} y={py} {on} {still} />
	</div>
	<div class={cn('flex min-w-0 flex-col gap-3', (row || wideRow) && 'md:col-start-1 md:row-start-1', row && 'col-start-1 row-start-1 md:gap-3.5', big && 'gap-5')}>
		{#if kicker}<span class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{kicker}</span>{/if}
		<PostMeta post={item(post, big)} tone={topicTone} />
		<svelte:element this={heading} class={cn('font-medium text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:decoration-1 group-hover:underline-offset-4', title)}>{post.title}</svelte:element>
		{#if summary}<p class={dek}>{post.summary}</p>{/if}
		{#if big}
			<span class="mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary">Read the post <ArrowRight class="lucide size-4" /></span>
		{/if}
	</div>
</a>
