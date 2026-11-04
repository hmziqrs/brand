<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PictureCard from './picture-card.svelte'
	import PostMeta from '$brand/blocks/content/post-meta.svelte'
	import { blogPosts, blogTone, productPosts } from '$brand/blocks/content/stories-data-blog.js'

	const { Story } = defineMeta({
		title: 'Custom/Picture card',
		component: PictureCard,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-x-6 gap-y-14 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
		<PictureCard title="gpui-query" tag="Library" dek="Data loading for GPUI apps: typed keys, one shared cache and refetch in the background." meta="freeoxide · Rust" art="lanes" />
		<PictureCard title="Command-line tool" tag="Terminal" dek="A Rust binary your team installs with one command." meta="Rust" art="terminal" />
	</div>
</Story>

<Story name="Post" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-x-6 gap-y-12 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each blogPosts.slice(2, 5) as p (p.title)}
			<PictureCard title={p.title} dek={p.summary} art={p.art} as="h3">
				{#snippet head()}<PostMeta post={{ ...p, updated: undefined }} tone={blogTone} />{/snippet}
			</PictureCard>
		{/each}
	</div>
</Story>

<Story name="Lead" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<PictureCard title={blogPosts[7].title} dek={blogPosts[7].summary} art={blogPosts[7].art} as="h2" size="xl" layout="split" more="Read the post">
			{#snippet head()}<span class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">Start here</span><PostMeta post={blogPosts[7]} tone={blogTone} />{/snippet}
		</PictureCard>
	</div>
</Story>

<Story name="Pair" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-x-8 gap-y-14 px-6 py-12 md:grid-cols-2">
		{#each blogPosts.slice(0, 2) as p (p.title)}
			<PictureCard title={p.title} dek={p.summary} art={p.art} as="h3" size="lg">
				{#snippet head()}<PostMeta post={p} tone={blogTone} />{/snippet}
			</PictureCard>
		{/each}
	</div>
</Story>

<Story name="Without a drawing" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-x-6 gap-y-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each productPosts.slice(1, 4) as p (p.title)}
			<PictureCard title={p.title} dek={p.summary} as="h3">
				{#snippet head()}<PostMeta post={p} tone={blogTone} />{/snippet}
			</PictureCard>
		{/each}
	</div>
</Story>
