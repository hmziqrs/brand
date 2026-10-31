<script lang="ts">
	import { cn } from '$brand/utils.js';
	import PostCover from './post-cover.svelte';
	import { to, type Post } from './site';

	let {
		post,
		layout = 'stack',
		size = 'md',
		class: className
	}: {
		post: Post;
		layout?: 'stack' | 'row';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	} = $props();
</script>

<a
	href={to('post')}
	class={cn(
		'post-card group relative isolate flex w-full overflow-hidden rounded-xl bg-card text-card-foreground outline-none',
		'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-border after:transition-colors hover:after:border-primary/70 focus-visible:after:border-2 focus-visible:after:border-ring',
		layout === 'stack' ? 'flex-col' : 'flex-col sm:flex-row sm:items-stretch',
		className
	)}
>
	<PostCover cover={post.cover} {size} class={cn(layout === 'stack' ? 'aspect-[16/9] w-full' : 'aspect-[16/9] w-full sm:aspect-auto sm:w-[38%] sm:min-h-[9.5rem] sm:shrink-0')} />
	<div class={cn('flex flex-1 flex-col gap-2.5', layout === 'stack' ? 'p-5' : 'p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-6')}>
		<div class="flex flex-col gap-2.5">
			<p class="font-mono text-xs text-muted-foreground uppercase">// {post.kind}</p>
			<p class={cn('leading-snug font-medium tracking-[-0.015em] text-balance', size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg')}>{post.title}</p>
			{#if layout === 'row'}
				<p class="flex items-center gap-2 text-sm text-muted-foreground">
					<span class="flex -space-x-1.5">{#each post.authors as a (a)}<span class="grid size-6 place-items-center rounded-full bg-muted text-[0.6rem] font-medium text-foreground ring-2 ring-card">{a.split(' ').map((w) => w[0]).join('')}</span>{/each}</span>
					{post.authors.join(', ')}
				</p>
			{/if}
		</div>
		<p class={cn('font-mono text-xs text-muted-foreground uppercase', layout === 'stack' ? 'mt-auto pt-2' : 'shrink-0')}>{post.date}</p>
	</div>
</a>
